import asyncio
import logging
import sys
import os

# Add the project root to sys.path to allow importing app modules
sys.path.append(os.getcwd())

try:
    from app.core.redis_client import redis_memory
    from app.core.config import settings
except ImportError as e:
    print(f"Error importing modules: {e}")
    sys.exit(1)

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

async def test_redis():
    print(f"--- Redis Connection Test ---")
    print(f"Target URL: {settings.REDIS_URL}")
    
    try:
        # 1. Connect
        print("Connecting to Redis...")
        await redis_memory.connect()
        print("✅ Connection successful!")
        
        # 2. Ping
        print("Pinging Redis...")
        is_alive = await redis_memory._redis.ping()
        if is_alive:
            print("✅ Ping successful!")
        else:
            print("❌ Ping failed.")
        
        # 3. Set/Get test key
        print("Testing Set/Get...")
        task_id = 9999
        test_key = "test_connection"
        test_value = {"status": "ok", "message": "Redis is working!"}
        
        await redis_memory.set_state(task_id, test_key, test_value)
        retrieved_value = await redis_memory.get_state(task_id, test_key)
        
        if retrieved_value == test_value:
            print(f"✅ Set/Get successful! Retrieved: {retrieved_value}")
        else:
            print(f"❌ Set/Get failed. Sent: {test_value}, Got: {retrieved_value}")
            
        # 4. Cleanup
        print("Cleaning up...")
        await redis_memory.clear_state(task_id)
        print("✅ Cleanup successful!")
        
        # 5. Close
        await redis_memory.close()
        print("--- Test Completed Successfully ---")
        
    except Exception as e:
        print(f"❌ Test failed with error: {e}")
        import traceback
        traceback.print_exc()
    finally:
        await redis_memory.close()

if __name__ == "__main__":
    asyncio.run(test_redis())
