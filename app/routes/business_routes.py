from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from sqlalchemy.ext.asyncio import AsyncSession
import json
import logging

from app.db.connection import get_db
from app.services.task_service import TaskService
from app.core.business_graph import run_business_analysis

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/business", tags=["Business Intelligence"])

class BusinessAnalysisRequest(BaseModel):
    user_id: str
    query: str
    location: str

@router.post("/analyze")
async def analyze_business(request: BusinessAnalysisRequest, db: AsyncSession = Depends(get_db)):
    """
    Performs a complete business analysis, saves the process as a Task,
    and persists the final result in Supabase.
    """
    task = None
    try:
        # 1. Initialize Task in Database
        goal = f"Business Analysis for '{request.query}' in '{request.location}'"
        # Bridge the Supabase UUID string to our internal integer ID
        task = await TaskService.create_task(db, request.user_id, goal)
        
        # 2. Update status to Running
        await TaskService.update_task_status(db, task.id, "running")
        logger.info(f"Started analysis task {task.id} for user {request.user_id}")

        # 3. Run the Multi-Agent Graph
        result = await run_business_analysis(request.query, request.location)
        
        # 4. Persist result to "outputs" table
        await TaskService.save_task_output(db, task.id, json.dumps(result))
        
        logger.info(f"Finished analysis task {task.id}. Data persisted to Supabase.")
        
        return {
            "task_id": task.id,
            "status": "completed",
            "data": result
        }
    except Exception as e:
        logger.error(f"Business analysis failed: {e}")
        if task:
            await TaskService.update_task_status(db, task.id, "failed")
        raise HTTPException(status_code=500, detail=str(e))
