from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy.orm import selectinload
from app.db.models import Task, Step, User, StatusEnum, Log, Output, Cost
from typing import List, Optional, Dict, Any
import logging

logger = logging.getLogger(__name__)

class DatabaseCRUD:
    @staticmethod
    async def create_task(db: AsyncSession, user_id: int, goal: str) -> Task:
        new_task = Task(user_id=user_id, goal=goal, status=StatusEnum.PENDING)
        db.add(new_task)
        await db.commit()
        await db.refresh(new_task)
        return new_task

    @staticmethod
    async def create_steps(db: AsyncSession, task_id: int, steps_data: List[Dict[str, Any]]):
        for data in steps_data:
            step = Step(
                task_id=task_id,
                step_number=data["step_number"],
                agent_type=data.get("agent_type", "executor"),
                description=data["description"],
                status=StatusEnum.PENDING
            )
            db.add(step)
        await db.commit()

    @staticmethod
    async def update_task_status(db: AsyncSession, task_id: int, status: StatusEnum):
        result = await db.execute(select(Task).where(Task.id == task_id))
        task = result.scalars().first()
        if task:
            task.status = status
            await db.commit()

    @staticmethod
    async def save_output(db: AsyncSession, task_id: int, content: str, version: int = 1):
        output = Output(task_id=task_id, content=content, version=version)
        db.add(output)
        await db.commit()

    @staticmethod
    async def log_event(db: AsyncSession, task_id: int, step_id: Optional[int], tool_used: str, 
                        input_data: Any, output_data: Any, status: str, error_message: str = None):
        log = Log(
            task_id=task_id,
            step_id=step_id,
            tool_used=tool_used,
            input_data=str(input_data),
            output_data=str(output_data),
            status=status,
            error_message=error_message
        )
        db.add(log)
        await db.commit()

    @staticmethod
    async def track_cost(db: AsyncSession, task_id: int, model: str, tokens: int, cost: float):
        cost_entry = Cost(task_id=task_id, model_used=model, tokens_used=tokens, cost_amount=cost)
        db.add(cost_entry)
        await db.commit()

    @staticmethod
    async def get_task_with_details(db: AsyncSession, task_id: int) -> Optional[Task]:
        result = await db.execute(
            select(Task)
            .options(
                selectinload(Task.steps),
                selectinload(Task.outputs),
                selectinload(Task.logs),
                selectinload(Task.costs)
            )
            .where(Task.id == task_id)
        )
        return result.scalars().first()

crud = DatabaseCRUD()
