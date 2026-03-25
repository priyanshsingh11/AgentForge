import asyncio
import os
from sqlalchemy import text
from sqlalchemy.ext.asyncio import create_async_engine
from dotenv import load_dotenv

load_dotenv()

async def test_conn(url, ssl_mode=True):
    print(f"\nTesting connection with SSL={ssl_mode}")
    print(f"URL: {url.replace(':', ':***').replace('@', '@***')}") # redact for safety in logs
    try:
        # For asyncpg, we might need a proper ssl context or just True/False
        connect_args = {}
        if ssl_mode:
            # Simple way to enable SSL for asyncpg in SQLAlchemy
            connect_args["ssl"] = True
        else:
            connect_args["ssl"] = False
            
        engine = create_async_engine(url, connect_args=connect_args)
        async with engine.connect() as conn:
            result = await conn.execute(text("SELECT 1"))
            print("✅ Success!")
            return True
    except Exception as e:
        print(f"❌ Failed: {e}")
        return False

async def main():
    original_url = os.getenv("DATABASE_URL")
    if not original_url:
        print("DATABASE_URL not found")
        return

    # 1. Test original URL with SSL=True
    # First clean it like in connection.py
    clean_url = original_url.replace("?sslmode=require", "").replace("&sslmode=require", "")
    await test_conn(clean_url, ssl_mode=True)

    # 2. Test with port 5432 (Direct Connection)
    # Most Supabase projects have the same host but port 5432 for direct access.
    # Note: Direct connection usually uses username 'postgres' without the project ref suffix.
    parts = original_url.split("@")
    if len(parts) == 2:
        auth = parts[0] # postgresql+asyncpg://user:pass
        host_part = parts[1] # host:6543/db...
        
        # Try to extract the project ref from user
        user_parts = auth.split("://")[1].split(":")
        username = user_parts[0]
        password = user_parts[1] if len(user_parts) > 1 else ""
        
        if "." in username:
            real_username, project_ref = username.split(".")
            direct_host = f"db.{project_ref}.supabase.co"
            direct_url = f"postgresql+asyncpg://{real_username}:{password}@{direct_host}:5432/postgres"
            print("\nTrying direct connection to port 5432...")
            await test_conn(direct_url, ssl_mode=True)

if __name__ == "__main__":
    asyncio.run(main())
