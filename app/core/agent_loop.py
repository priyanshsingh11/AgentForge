import logging
from sqlalchemy.ext.asyncio import AsyncSession
from app.agents.planner import planner_agent
from app.agents.executor import executor_agent
from app.agents.critic import critic_agent
from app.db.crud import crud
from app.db.models import StatusEnum
from app.core.redis_client import redis_memory
from app.core.config import settings

logger = logging.getLogger(__name__)

async def run_agent(db: AsyncSession, task_id: int, goal: str):
    """
    Agent Control Controller:
    1. Initialize Redis state
    2. Loop (max iterations):
        - Planner -> store steps (DB + Redis)
        - Executor -> execute (use Redis + Vector DB)
        - Critic -> evaluate
        - Update Redis state
    3. Mark final output in DB
    4. Clear Redis state after completion
    """
    logger.info(f"Starting agent loop for task {task_id}: {goal}")
    
    # Initialize Redis State
    await redis_memory.set_state(task_id, "iteration", 1)
    await redis_memory.set_state(task_id, "status", "starting")
    
    # 1. Plan-Execute-Critic Loop
    for i in range(1, settings.MAX_ITERATIONS + 1):
        await redis_memory.set_state(task_id, "iteration", i)
        logger.info(f"Iteration {i} for task {task_id}")
        
        # 1a. Planning
        try:
            steps = await planner_agent.plan(goal)
            await crud.create_steps(db, task_id, steps)
            await redis_memory.set_state(task_id, "current_plan", steps)
            await crud.log_event(db, task_id, None, "planner", goal, steps, "success")
        except Exception as e:
            await crud.log_event(db, task_id, None, "planner", goal, str(e), "failed", error_message=str(e))
            break

        # 1b. Execution (simplified for MVP: execute all planned steps)
        all_outputs = []
        try:
            for step_data in steps:
                step_desc = step_data["description"]
                await crud.log_event(db, task_id, None, "executor", step_desc, "starting", "running")
                
                result = await executor_agent.execute_step(task_id, step_desc)
                all_outputs.append(result["output"])
                
                # Log usage costs
                usage = result["usage"]
                await crud.track_cost(db, task_id, usage["model"], usage["total_tokens"], usage["total_tokens"] * 0.000001)
                await crud.log_event(db, task_id, None, "executor", step_desc, result["output"], "success")

        except Exception as e:
            await crud.log_event(db, task_id, None, "executor", "step_execution", str(e), "failed", error_message=str(e))
            break

        # 1c. Critique & Evaluation
        final_iteration_output = "\n".join(all_outputs)
        try:
            critique = await critic_agent.evaluate(goal, final_iteration_output)
            await crud.log_event(db, task_id, None, "critic", final_iteration_output, critique, "success")
            
            # Save iteration output
            await crud.save_output(db, task_id, final_iteration_output, version=i)

            if critique.get("score", 0) >= settings.CRITIC_THRESHOLD:
                logger.info(f"Task {task_id} completed successfully with score {critique['score']}")
                await crud.update_task_status(db, task_id, StatusEnum.COMPLETED)
                break
            else:
                logger.info(f"Task {task_id} score {critique['score']} below threshold. Re-iterating.")
                # Feed critique feedback back into Redis state for the next executor iteration
                current_state = await redis_memory.get_state(task_id, "state") or {}
                current_state["feedback"] = critique.get("feedback")
                await redis_memory.set_state(task_id, "state", current_state)
                
        except Exception as e:
            await crud.log_event(db, task_id, None, "critic", final_iteration_output, str(e), "failed", error_message=str(e))
            break

    # 4. Finalize
    await crud.update_task_status(db, task_id, StatusEnum.COMPLETED) # Ensure status is set
    await redis_memory.clear_state(task_id)
    logger.info(f"Finished agent loop for task {task_id}")

async def orchestrate_task(db: AsyncSession, user_id: int, goal: str):
    """
    Orchestrator called by API:
    - Creates initial DB record
    - Triggers the agent loop
    """
    task = await crud.create_task(db, user_id, goal)
    # In a real production system, you'd trigger run_agent in a background task (e.g. Celery or BackgroundTasks)
    # For this MVP, we run it directly or can be called as a background task by FastAPI.
    return task
