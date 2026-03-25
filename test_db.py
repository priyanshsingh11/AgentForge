import asyncio
import os
from sqlalchemy.ext.asyncio import create_async_engine
from sqlalchemy import text
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")
print("Using DB URL:", DATABASE_URL)

engine = create_async_engine(DATABASE_URL, echo=True)

async def test_connection():
    print("Testing connection to database...")
    try:
        async with engine.connect() as conn:
            result = await conn.execute(text("SELECT 1"))
            print("✅ Connected!")
            print("Result:", result.scalar())
    except Exception as e:
        print("❌ Error:", e)

asyncio.run(test_connection())