import asyncio
import sys
import os
import logging
import json

# Add the project root to sys.path
sys.path.append(os.getcwd())

logging.basicConfig(level=logging.INFO)

try:
    from app.core.business_graph import run_business_analysis
except ImportError as e:
    print(f"Error importing business_graph: {e}")
    sys.exit(1)

async def main():
    print("--- Local Business Intelligence System Test ---")
    query = "Coffee Shop"
    location = "Greater Noida"
    print(f"Starting analysis for '{query}' in '{location}'...")
    
    try:
        result = await run_business_analysis(query, location)
        print("\n--- Complete Analysis Result ---")
        print(json.dumps(result, indent=2))
        
        # Verify specific fields
        if result.get("strategies"):
            print("\n✅ Strategies generated successfully!")
        if result.get("trends"):
            print("✅ Trend analysis completed!")
            
    except Exception as e:
        print(f"❌ Error during analysis: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    asyncio.run(main())
