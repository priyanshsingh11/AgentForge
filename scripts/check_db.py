import asyncio
from app.db.connection import engine
from sqlalchemy import text

async def check_db():
    try:
        async with engine.connect() as conn:
            result = await conn.execute(text("SELECT table_name FROM information_schema.tables WHERE table_schema='public'"))
            tables = result.all()
            print("Tables found in Supabase:")
            for table in tables:
                print(f"- {table[0]}")
    except Exception as e:
        print(f"Error connecting to DB: {e}")

if __name__ == "__main__":
    asyncio.run(check_db())
