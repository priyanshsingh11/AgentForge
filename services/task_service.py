from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy.orm import selectinload
from database.models import Task, Step, User, StatusEnum, Log, Output
from fastapi import HTTPException
from typing import List, Optional
import datetime

class TaskService:
    @staticmethod
    async def create_user_if_not_exists(db: AsyncSession, name: str, email: str) -> User:
        result = await db.execute(select(User).where(User.email == email))
        user = result.scalars().first()
        if not user:
            user = User(name=name, email=email)
            db.add(user)
            await db.commit()
            await db.refresh(user)
        return user

    @staticmethod
    async def create_task(db: AsyncSession, user_id: int, goal: str) -> Task:
        # Check if user exists
        result = await db.execute(select(User).where(User.id == user_id))
        user = result.scalars().first()
        if not user:
            raise HTTPException(status_code=404, detail="User not found")

        # Create Task
        new_task = Task(user_id=user_id, goal=goal, status=StatusEnum.PENDING)
        db.add(new_task)
        await db.flush() # Get task ID without committing yet

        # Mock Planner Logic: Create initial steps
        steps = [
            Step(task_id=new_task.id, step_number=1, agent_type="planner", description=f"Analyze goal: {goal}", status=StatusEnum.PENDING),
            Step(task_id=new_task.id, step_number=2, agent_type="executor", description="Execute preliminary research", status=StatusEnum.PENDING),
            Step(task_id=new_task.id, step_number=3, agent_type="executor", description="Finalize output", status=StatusEnum.PENDING)
        ]
        db.add_all(steps)
        
        await db.commit()
        await db.refresh(new_task)
        return new_task

    @staticmethod
    async def get_tasks_by_user(db: AsyncSession, user_id: int) -> List[Task]:
        result = await db.execute(select(Task).where(Task.user_id == user_id))
        return result.scalars().all()

    @staticmethod
    async def get_task_details(db: AsyncSession, task_id: int) -> Task:
        result = await db.execute(
            select(Task)
            .options(selectinload(Task.steps), selectinload(Task.outputs))
            .where(Task.id == task_id)
        )
        task = result.scalars().first()
        if not task:
            raise HTTPException(status_code=404, detail="Task not found")
        return task

    @staticmethod
    async def get_task_logs(db: AsyncSession, task_id: int) -> List[Log]:
        result = await db.execute(select(Log).where(Log.task_id == task_id))
        return result.scalars().all()
