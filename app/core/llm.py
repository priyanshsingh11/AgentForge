import logging
import httpx
from typing import Dict, Any, List, Optional
from app.core.config import settings

logger = logging.getLogger(__name__)

class GroqClient:
    def __init__(self, api_key: str = None):
        self.api_key = api_key or settings.GROQ_API_KEY
        self.url = "https://api.groq.com/openai/v1/chat/completions"
        self.headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json"
        }

    async def call_llm(self, messages: List[Dict[str, str]], model: str = "llama3-8b-8192") -> Dict[str, Any]:
        """
        Calls the Groq API and returns the completion and token stats.
        """
        payload = {
            "model": model,
            "messages": messages,
            "temperature": 0.7,
            # For brevity in this agentic implementation
            "max_tokens": 1024
        }
        
        async with httpx.AsyncClient(timeout=60.0) as client:
            try:
                response = await client.post(self.url, headers=self.headers, json=payload)
                response.raise_for_status()
                data = response.json()
                
                content = data["choices"][0]["message"]["content"]
                usage = data.get("usage", {})
                
                logger.info(f"LLM call successful: {usage}")
                
                return {
                    "content": content,
                    "model": model,
                    "prompt_tokens": usage.get("prompt_tokens", 0),
                    "completion_tokens": usage.get("completion_tokens", 0),
                    "total_tokens": usage.get("total_tokens", 0)
                }
            except Exception as e:
                logger.error(f"Error calling Groq API: {e}")
                raise e

# Global instance
groq_client = GroqClient()
