from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from database.connection import get_db
from services.task_service import TaskService
from pydantic import BaseModel, EmailStr
from typing import List, Optional

router = APIRouter()

class TaskCreate(BaseModel):
    user_id: int
    goal: str

class UserCreate(BaseModel):
    name: str
    email: EmailStr

@router.post("/users")
async def create_user(user_data: UserCreate, db: AsyncSession = Depends(get_db)):
    try:
        user = await TaskService.create_user_if_not_exists(db, user_data.name, user_data.email)
        return {"id": user.id, "name": user.name, "email": user.email}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/tasks")
async def create_task(task_data: TaskCreate, db: AsyncSession = Depends(get_db)):
    try:
        task = await TaskService.create_task(db, task_data.user_id, task_data.goal)
        return {"task_id": task.id, "status": task.status}
    except HTTPException as he:
        raise he
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/tasks/{user_id}")
async def get_user_tasks(user_id: int, db: AsyncSession = Depends(get_db)):
    try:
        tasks = await TaskService.get_tasks_by_user(db, user_id)
        return [{"id": t.id, "goal": t.goal, "status": t.status} for t in tasks]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/task/{task_id}")
async def get_task_details(task_id: int, db: AsyncSession = Depends(get_db)):
    try:
        task = await TaskService.get_task_details(db, task_id)
        return {
            "id": task.id,
            "user_id": task.user_id,
            "goal": task.goal,
            "status": task.status,
            "steps": [{"id": s.id, "step_number": s.step_number, "agent_type": s.agent_type, "description": s.description, "status": s.status} for s in task.steps],
            "outputs": [{"id": o.id, "content": o.content, "version": o.version} for o in task.outputs]
        }
    except HTTPException as he:
        raise he
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/logs/{task_id}")
async def get_task_logs(task_id: int, db: AsyncSession = Depends(get_db)):
    try:
        logs = await TaskService.get_task_logs(db, task_id)
        return [{"id": l.id, "step_id": l.step_id, "tool_used": l.tool_used, "output_data": l.output_data, "status": l.status} for l in logs]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
