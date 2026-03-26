import asyncio
import sys
import os
import logging

# Add the project root to sys.path to allow importing app modules
sys.path.append(os.getcwd())

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

try:
    from app.agents.planner import planner_agent
    from app.core.config import settings
except ImportError as e:
    print(f"Error importing modules: {e}")
    sys.exit(1)

async def test_planner():
    print("--- Planner Agent Test ---")
    
    # Check if API key is present
    if not settings.GROQ_API_KEY:
        print("❌ Error: GROQ_API_KEY not found in settings/.env")
        return

    sample_goal = "Write a short blog post about the benefits of autonomous AI agents."
    print(f"Goal: {sample_goal}")
    print("Requesting plan from PlannerAgent...")
    
    try:
        steps = await planner_agent.plan(sample_goal)
        print("\n✅ Plan Generated Successfully:")
        import json
        print(json.dumps(steps, indent=4))
        
        if isinstance(steps, list) and len(steps) > 0:
            print(f"\n✅ Received {len(steps)} steps.")
        else:
            print("\n❌ Received invalid steps format.")
            
    except Exception as e:
        print(f"❌ Test failed with error: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    asyncio.run(test_planner())
