import asyncio
import sys
import os
import time

# Add the current directory to sys.path
sys.path.append(os.getcwd())

from app.core.llm import groq_client
from app.core.redis_client import redis_memory

async def verify():
    print("--- 🧠 Verifying LLM Redis Caching ---")
    
    messages = [
        {"role": "user", "content": "Tell me a joke about Redis."}
    ]
    
    print("\n1. First call (Should be a CACHE MISS)...")
    start_time = time.time()
    try:
        response1 = await groq_client.call_llm(messages)
        end_time = time.time()
        print(f"✅ Received in {end_time - start_time:.2f}s")
        print(f"Content: {response1['content'][:50]}...")
        
        print("\n2. Second call (Should be a CACHE HIT!)...")
        start_time = time.time()
        response2 = await groq_client.call_llm(messages)
        end_time = time.time()
        print(f"🚀 Received in {end_time - start_time:.4f}s")
        print(f"Content matches: {response1['content'] == response2['content']}")
        
        if (end_time - start_time) < 0.1:
            print("\n🎉 CACHE SUCCESS: The second call was served instantly from Redis!")
        else:
            print("\n⚠️ CACHE FAILED: The second call took longer than expected.")

    except Exception as e:
        print(f"\n❌ Error during verification: {e}")
        print("💡 Ensure your .env file has a valid GROQ_API_KEY and Redis is running.")

    finally:
        await redis_memory.close()

if __name__ == "__main__":
    asyncio.run(verify())
