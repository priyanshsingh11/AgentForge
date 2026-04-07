import asyncio
import sys
import os

# Add the current directory to sys.path so we can import app
sys.path.append(os.getcwd())

from app.core.redis_client import redis_memory

async def test():
    print("--- 🚀 Connecting to Redis ---")
    try:
        # 1. Set a value (The Post-it Note) 
        # We'll use Task ID 999 and key "learning"
        await redis_memory.set_state(999, "learning", "Redis is awesome!")
        print("✅ Saved: 'Redis is awesome!' to key 'agent:999:learning'")

        # 2. Get the value back
        result = await redis_memory.get_state(999, "learning")
        print(f"✅ Retrieved: '{result}'")

    except Exception as e:
        print(f"❌ Error: {e}")
        print("\n💡 TIP: Make sure your Docker container 'agentforge' is running!")
    finally:
        await redis_memory.close()

if __name__ == "__main__":
    asyncio.run(test())
