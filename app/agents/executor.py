import logging
import json
from typing import Dict, Any, List
from app.core.llm import groq_client
from app.core.redis_client import redis_memory
from app.memory.vector_store import semantic_memory

logger = logging.getLogger(__name__)

class ExecutorAgent:
    def __init__(self):
        self.groq = groq_client
        self.redis = redis_memory
        self.vector_store = semantic_memory

    async def execute_step(self, task_id: int, step_desc: str) -> Dict[str, Any]:
        """
        Executes a step using semantic memory (Vector DB) and short-term state (Redis).
        """
        # 1. Fetch similar past knowledge from Semantic Memory
        past_context = await self.vector_store.retrieve_similar_context(step_desc)
        context_str = "\n".join(past_context) if past_context else "No prior knowledge available."

        # 2. Get current state from Redis (short-term memory)
        current_state = await self.redis.get_state(task_id, "state") or {}
        iteration = await self.redis.get_state(task_id, "iteration") or 1

        prompt = f"""
        You are an Executor Agent. Your goal is to complete the following step:
        
        Step: "{step_desc}"
        
        Here is some semantic context from past tasks:
        {context_str}
        
        Current Iteration: {iteration}
        Working State (Memory): {json.dumps(current_state)}
        
        Perform the task and provide a detailed output. If this is a later iteration, improve upon the previous results.
        Respond with just the result content.
        """
        
        messages = [{"role": "user", "content": prompt}]
        
        try:
            response = await self.groq.call_llm(messages)
            content = response["content"]
            
            # Update Redis with intermediate output or updated state if needed
            # For now, we'll just store the latest result in state
            current_state[f"step_output_{step_desc[:20]}"] = content
            await self.redis.set_state(task_id, "state", current_state)
            
            # Save to semantic memory for future retrieval
            await self.vector_store.add_to_memory(content, {"task_id": task_id, "step": step_desc})
            
            logger.info(f"Step executed successfully: {step_desc[:50]}...")
            
            return {
                "output": content,
                "usage": response
            }
            
        except Exception as e:
            logger.error(f"Execution error in ExecutorAgent: {e}")
            raise e

# Global instance
executor_agent = ExecutorAgent()
