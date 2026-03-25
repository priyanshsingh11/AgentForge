import logging
import json
from typing import List, Dict, Any
from app.core.llm import groq_client

logger = logging.getLogger(__name__)

class PlannerAgent:
    def __init__(self):
        self.groq = groq_client

    async def plan(self, goal: str) -> List[Dict[str, Any]]:
        """
        Input: goal
        Output: list of steps
        """
        prompt = f"""
        You are a highly efficient Planner Agent for an autonomous multi-agent platform.
        Your task is to break down the user's goal into a clear, logical, and actionable list of 3-5 steps.

        Goal: "{goal}"

        Output your plan in a JSON array format like this:
        [
            {{"step_number": 1, "description": "Step 1 description", "agent_type": "executor"}},
            {{"step_number": 2, "description": "Step 2 description", "agent_type": "executor"}}
        ]
        Respond ONLY with the JSON array.
        """
        
        messages = [{"role": "user", "content": prompt}]
        
        try:
            response = await self.groq.call_llm(messages)
            content = response["content"]
            
            # Basic JSON extraction in case the LLM adds markdown or extra text
            start = content.find("[")
            end = content.rfind("]") + 1
            if start != -1 and end != -1:
                json_str = content[start:end]
                steps = json.loads(json_str)
                logger.info(f"Planned {len(steps)} steps for goal: {goal}")
                return steps
            else:
                logger.error(f"Failed to find JSON array in planner response: {content}")
                raise ValueError("Invalid planner output format")
                
        except Exception as e:
            logger.error(f"Execution error in PlannerAgent: {e}")
            raise e

# Global instance
planner_agent = PlannerAgent()
