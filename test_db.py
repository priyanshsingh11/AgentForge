import asyncio
from sqlalchemy import text
from database.connection import engine

async def test_connection():
    print("Testing connection to database...")
    try:
        async with engine.connect() as conn:
            result = await conn.execute(text("SELECT 1"))
            print("Successfully connected to the database!")
            print(f"Result: {result.fetchone()}")
    except Exception as e:
        print(f"Failed to connect to the database: {e}")
    finally:
        await engine.dispose()

if __name__ == "__main__":
    asyncio.run(test_connection())