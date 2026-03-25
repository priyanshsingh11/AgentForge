import os
from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker, AsyncSession
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

if not DATABASE_URL:
    raise ValueError("DATABASE_URL environment variable is not set")

# Create async engine
engine = create_async_engine(
    DATABASE_URL,
    echo=True
)

# Create session maker
async_session = async_sessionmaker(
    engine,
    expire_on_commit=False,
    class_=AsyncSession
)

# Dependency
async def get_db():
    async with async_session() as session:
        yield session