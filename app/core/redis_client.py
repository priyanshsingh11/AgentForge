import json
import logging
import redis.asyncio as redis
from typing import Optional, Any
from app.core.config import settings

logger = logging.getLogger(__name__)

class RedisMemory:
    def __init__(self, url: str = None):
        self.url = url or settings.REDIS_URL
        self._redis = None

    async def connect(self):
        if self._redis is None:
            try:
                self._redis = await redis.from_url(self.url, decode_responses=True)
                logger.info(f"Connected to Redis at {self.url}")
            except Exception as e:
                logger.error(f"Failed to connect to Redis: {e}")
                # We might want to allow running without Redis or raise error
                raise e

    async def get_state(self, task_id: int, key: str) -> Optional[Any]:
        """
        Retrieves a state value for a task.
        """
        if not self._redis: await self.connect()
        full_key = f"agent:{task_id}:{key}"
        val = await self._redis.get(full_key)
        return json.loads(val) if val else None

    async def set_state(self, task_id: int, key: str, value: Any):
        """
        Sets a state value for a task.
        """
        if not self._redis: await self.connect()
        full_key = f"agent:{task_id}:{key}"
        await self._redis.set(full_key, json.dumps(value))

    async def clear_state(self, task_id: int):
        """
        Clears all temporary data for a task.
        """
        if not self._redis: await self.connect()
        pattern = f"agent:{task_id}:*"
        keys = await self._redis.keys(pattern)
        if keys:
            await self._redis.delete(*keys)
            logger.info(f"Cleared Redis state for task {task_id}")

    async def set_cache(self, key: str, value: Any, ttl: int = 86400):
        """
        Sets a general cache value with an expiration (TTL).
        Default is 24 hours.
        """
        if not self._redis: await self.connect()
        full_key = f"cache:{key}"
        await self._redis.set(full_key, json.dumps(value), ex=ttl)

    async def get_cache(self, key: str) -> Optional[Any]:
        """
        Retrieves a value from the general cache.
        """
        if not self._redis: await self.connect()
        full_key = f"cache:{key}"
        val = await self._redis.get(full_key)
        return json.loads(val) if val else None

    async def close(self):
        if self._redis:
            await self._redis.close()

# Global instance
redis_memory = RedisMemory()
