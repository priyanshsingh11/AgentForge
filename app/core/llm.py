import json
import hashlib
import logging
import httpx
from typing import Dict, Any, List, Optional
from app.core.config import settings
from app.core.redis_client import redis_memory

logger = logging.getLogger(__name__)

class GroqClient:
    def __init__(self, api_key: str = None):
        self.api_key = api_key or settings.GROQ_API_KEY
        self.url = "https://api.groq.com/openai/v1/chat/completions"
        self.headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json"
        }

    async def call_llm(self, messages: List[Dict[str, str]], model: str = "llama-3.1-8b-instant") -> Dict[str, Any]:
        """
        Calls the Groq API and returns the completion and token stats.
        Includes a Redis caching layer to avoid duplicate calls.
        """
        # 1. Create a unique cache key based on the model and messages
        cache_data = json.dumps({"model": model, "messages": messages}, sort_keys=True)
        cache_key = hashlib.sha256(cache_data.encode()).hexdigest()

        # 2. Check if we have a cached response in Redis
        try:
            cached_response = await redis_memory.get_cache(cache_key)
            if cached_response:
                logger.info(f"LLM Cache Hit for key: {cache_key[:10]}...")
                return cached_response
        except Exception as e:
            logger.warning(f"Failed to check LLM cache: {e}")

        # 3. Cache Miss: Call the Groq API
        payload = {
            "model": model,
            "messages": messages,
            "temperature": 0.7,
            "max_tokens": 1024
        }
        
        async with httpx.AsyncClient(timeout=60.0) as client:
            try:
                response = await client.post(self.url, headers=self.headers, json=payload)
                response.raise_for_status()
                data = response.json()
                
                content = data["choices"][0]["message"]["content"]
                usage = data.get("usage", {})
                
                result = {
                    "content": content,
                    "model": model,
                    "prompt_tokens": usage.get("prompt_tokens", 0),
                    "completion_tokens": usage.get("completion_tokens", 0),
                    "total_tokens": usage.get("total_tokens", 0)
                }

                # 4. Save the result to Redis cache (expires in 24 hours)
                try:
                    await redis_memory.set_cache(cache_key, result)
                    logger.info(f"LLM Cache Miss. Saved result to key: {cache_key[:10]}...")
                except Exception as e:
                    logger.warning(f"Failed to save LLM cache: {e}")

                return result
            except Exception as e:
                if 'response' in locals():
                    logger.error(f"Error calling Groq API: {e}. Response: {response.text}")
                else:
                    logger.error(f"Error calling Groq API: {e}")
                raise e

# Global instance
groq_client = GroqClient()
