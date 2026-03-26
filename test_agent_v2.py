import asyncio
import sys
import os
import logging

# Add the project root to sys.path
sys.path.append(os.getcwd())

logging.basicConfig(level=logging.INFO)

try:
    from app.core.lang_graph_agent import run_lang_graph_agent
except ImportError as e:
    print(f"Error importing lang_graph_agent: {e}")
    sys.exit(1)

async def main():
    print("--- LangGraph Agent Test ---")
    goal = "What time is it now, and what is 125 * 8? Also search for autonomous agents."
    print(f"Goal: {goal}")
    
    try:
        result = await run_lang_graph_agent(goal)
        print("\n--- Final Result ---")
        print(result)
    except Exception as e:
        print(f"❌ Error: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    asyncio.run(main())
