import ssl
from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker, AsyncSession
from app.core.config import settings

DATABASE_URL = settings.DATABASE_URL

if not DATABASE_URL:
    # Fallback to os.getenv if settings fails for some reason
    import os
    from dotenv import load_dotenv
    load_dotenv()
    DATABASE_URL = os.getenv("DATABASE_URL")

if not DATABASE_URL:
    raise ValueError("DATABASE_URL environment variable is not set")

# Create a custom SSL context to bypass verification (needed for some Supabase setups)
ssl_context = ssl.create_default_context()
ssl_context.check_hostname = False
ssl_context.verify_mode = ssl.CERT_NONE

# Strip 'sslmode' as asyncpg handles SSL via connect_args
clean_url = DATABASE_URL.split('?')[0]
query_params = DATABASE_URL.split('?')[1] if '?' in DATABASE_URL else ""
filtered_params = "&".join([p for p in query_params.split('&') if not p.startswith('sslmode=')])
if filtered_params:
    clean_url = f"{clean_url}?{filtered_params}"

# Create async engine
engine = create_async_engine(
    clean_url,
    connect_args={"ssl": ssl_context}, 
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