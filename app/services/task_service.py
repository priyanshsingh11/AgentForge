from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import delete
from sqlalchemy.future import select
from sqlalchemy.orm import selectinload
from app.db.models import Task, Step, User, StatusEnum, Log, Output
from fastapi import HTTPException
from typing import List, Optional
import datetime

class TaskService:
    @staticmethod
    async def _get_or_create_user(db: AsyncSession, supabase_uid: str) -> int:
        """Finds internal user ID by Supabase UUID, or creates a stub if missing."""
        result = await db.execute(select(User).where(User.supabase_uid == supabase_uid))
        user = result.scalars().first()
        if not user:
            # Create a local shadow record for relations
            user = User(
                supabase_uid=supabase_uid, 
                name="User", 
                email=f"{supabase_uid}@supabase.com"
            )
            db.add(user)
            await db.flush() # Populate the SERIAL id
        return user.id

    @staticmethod
    async def create_task(db: AsyncSession, supabase_uid: str, goal: str) -> Task:
        # Resolve internal integer ID
        internal_user_id = await TaskService._get_or_create_user(db, supabase_uid)

        # Create Task
        new_task = Task(user_id=internal_user_id, goal=goal, status="pending")
        db.add(new_task)
        await db.flush() # Get task ID without committing yet

        # Create initial steps
        steps = [
            Step(task_id=new_task.id, step_number=1, agent_type="planner", description=f"Analyze goal: {goal}", status="pending"),
            Step(task_id=new_task.id, step_number=2, agent_type="executor", description="Execute preliminary research", status="pending"),
            Step(task_id=new_task.id, step_number=3, agent_type="executor", description="Finalize output", status="pending")
        ]
        db.add_all(steps)
        
        await db.commit()
        await db.refresh(new_task)
        return new_task

    @staticmethod
    async def update_task_status(db: AsyncSession, task_id: int, status: str) -> Task:
        result = await db.execute(select(Task).where(Task.id == task_id))
        task = result.scalars().first()
        if not task:
            raise HTTPException(status_code=404, detail="Task not found")
        
        task.status = status
        await db.commit()
        await db.refresh(task)
        return task

    @staticmethod
    async def save_task_output(db: AsyncSession, task_id: int, content: str) -> Output:
        """Saves final agent output to the database."""
        result = await db.execute(select(Task).where(Task.id == task_id))
        task = result.scalars().first()
        if not task:
            raise HTTPException(status_code=404, detail="Task not found")

        # Save output
        new_output = Output(task_id=task_id, content=content)
        db.add(new_output)
        
        # Update task status to completed
        task.status = "completed"
        
        await db.commit()
        await db.refresh(new_output)
        return new_output

    @staticmethod
    async def get_tasks_by_user(db: AsyncSession, supabase_uid: str) -> List[Task]:
        """Fetch tasks using the Supabase UUID by joining with the User table."""
        result = await db.execute(
            select(Task)
            .join(User)
            .where(User.supabase_uid == supabase_uid)
        )
        return result.scalars().all()

    @staticmethod
    async def get_task_details(db: AsyncSession, task_id: int) -> Task:
        result = await db.execute(
            select(Task)
            .options(
                selectinload(Task.steps), 
                selectinload(Task.outputs),
                selectinload(Task.user)
            )
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

    @staticmethod
    async def delete_tasks_by_user(db: AsyncSession, supabase_uid: str) -> bool:
        """Deletes all tasks for a given user through joining with User table."""
        # Find user first
        user_id = await TaskService._get_or_create_user(db, supabase_uid)
        
        # All associated records (steps, outputs, logs, costs) will be deleted due to cascade
        await db.execute(delete(Task).where(Task.user_id == user_id))
        await db.commit()
        return True
