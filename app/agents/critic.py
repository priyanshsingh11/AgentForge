import logging
import json
from typing import Dict, Any
from app.core.llm import groq_client

logger = logging.getLogger(__name__)

class CriticAgent:
    def __init__(self):
        self.groq = groq_client

    async def evaluate(self, goal: str, output: str) -> Dict[str, Any]:
        """
        Input: goal, output
        Output: score (0–10), feedback, decision (continue/stop)
        """
        prompt = f"""
        You are a Critic Agent. Your task is to evaluate the provided output based on the user's original goal.
        
        Original Goal: "{goal}"
        Current Output:
        "{output}"
        
        Evaluate the output and provide a score between 0 and 10.
        If the score is 8 or higher, consider the task successfully completed.
        If lower, provide clear feedback on what needs to be improved in the next iteration.
        
        Your response MUST be in JSON format:
        {{
            "score": 7,
            "feedback": "The audience analysis is missing...",
            "decision": "continue",
            "is_complete": false
        }}
        """
        
        messages = [{"role": "user", "content": prompt}]
        
        try:
            response = await self.groq.call_llm(messages)
            content = response["content"]
            
            # Simple JSON extraction
            start = content.find("{")
            end = content.rfind("}") + 1
            if start != -1 and end != -1:
                json_data = json.loads(content[start:end])
                logger.info(f"Critique results: Score={json_data.get('score')}, Decision={json_data.get('decision')}")
                return json_data
            else:
                logger.error(f"Failed to find JSON in critic response: {content}")
                raise ValueError("Invalid critic output format")
                
        except Exception as e:
            logger.error(f"Execution error in CriticAgent: {e}")
            raise e

# Global instance
critic_agent = CriticAgent()
