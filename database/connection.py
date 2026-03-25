import os
from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker, AsyncSession
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

if not DATABASE_URL:
    raise ValueError("DATABASE_URL environment variable is not set")

# SQLAlchemy asyncpg requires 'ssl' in connect_args instead of 'sslmode' in the URL
engine = create_async_engine(
    DATABASE_URL.replace("?sslmode=require", "").replace("&sslmode=require", ""),
    connect_args={"ssl": True},
    echo=True
)

async_session = async_sessionmaker(
    engine, expire_on_commit=False, class_=AsyncSession
)

async def get_db():
    async with async_session() as session:
        try:
            yield session
        finally:
            await session.close()
