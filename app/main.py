import uvicorn
import logging
from fastapi import FastAPI, Request, BackgroundTasks, Depends, HTTPException
from fastapi.responses import JSONResponse
from app.core.config import settings
from app.db.connection import get_db, engine
from app.db.models import Base
from app.db.crud import crud
from app.core.agent_loop import run_agent, orchestrate_task
from sqlalchemy.ext.asyncio import AsyncSession
from pydantic import BaseModel

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s"
)
logger = logging.getLogger(__name__)

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    description="Autonomous multi-agent platform with full memory architecture"
)

# Request Schemas
class StartTaskRequest(BaseModel):
    user_id: int
    goal: str

# Global Exception Handler
@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    logger.error(f"Unhandled exception: {exc}", exc_info=True)
    return JSONResponse(
        status_code=500,
        content={"message": "An internal server error occurred.", "detail": str(exc)},
    )

@app.on_event("startup")
async def startup_event():
    try:
        async with engine.begin() as conn:
            await conn.run_sync(Base.metadata.create_all)
        logger.info("Database initialized successfully")
    except Exception as e:
        logger.error(f"Error during database initialization: {e}")

@app.post("/start-task", tags=["Agents"])
async def start_task(request: StartTaskRequest, background_tasks: BackgroundTasks, db: AsyncSession = Depends(get_db)):
    """
    1. Create task record in DB
    2. Respond with task_id
    3. Run agentic loop in background
    """
    try:
        # 1. Create task entry
        task = await crud.create_task(db, request.user_id, request.goal)
        
        # 2. Trigger agent loop in the background
        # Note: We need a fresh session for the background task
        async def run_in_bg():
            async with AsyncSession(engine) as bg_session:
                await run_agent(bg_session, task.id, request.goal)
        
        background_tasks.add_task(run_in_bg)
        
        return {"task_id": task.id}
    except Exception as e:
        logger.error(f"Failed to start task: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/task/{task_id}", tags=["Agents"])
async def get_task(task_id: int, db: AsyncSession = Depends(get_db)):
    """
    Returns full task details: goal, steps, outputs, logs, costs.
    """
    task = await crud.get_task_with_details(db, task_id)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
        
    return {
        "id": task.id,
        "goal": task.goal,
        "status": task.status,
        "steps": task.steps,
        "outputs": task.outputs,
        "logs": task.logs,
        "costs": task.costs
    }

@app.get("/", tags=["Health"])
async def health_check():
    return {
        "status": "online",
        "project": settings.PROJECT_NAME,
        "version": settings.VERSION
    }

if __name__ == "__main__":
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
