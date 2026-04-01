import uvicorn
import logging
from fastapi import FastAPI, Request, BackgroundTasks, Depends, HTTPException
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.db.connection import get_db, engine
from app.db.models import Base
from app.routes import business_routes, task_routes
from sqlalchemy.ext.asyncio import AsyncSession
from contextlib import asynccontextmanager
from sqlalchemy import text
from pydantic import BaseModel

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s"
)
logger = logging.getLogger(__name__)

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    description="Autonomous multi-agent platform with full memory architecture"
)

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request Schemas
class StartTaskRequest(BaseModel):
    user_id: int
    goal: str

# Include Routes
app.include_router(business_routes.router, prefix="/api")
app.include_router(task_routes.router, prefix="/api")

# Global Exception Handler
@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    logger.error(f"Unhandled exception: {exc}", exc_info=True)
    return JSONResponse(
        status_code=500,
        content={"message": "An internal server error occurred.", "detail": str(exc)},
    )

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: Initialize the database
    try:
        async with engine.begin() as conn:
            # 1. First, try to add the supabase_uid column if it's missing (self-healing)
            try:
                await conn.execute(text("ALTER TABLE users ADD COLUMN IF NOT EXISTS supabase_uid VARCHAR(255) UNIQUE;"))
                logger.info("Checked/Added supabase_uid column to users table.")
            except Exception as e:
                logger.warning(f"Self-healing column addition skipped or failed: {e}")

            # 2. Run standard metadata creation (for new tables)
            await conn.run_sync(Base.metadata.create_all)
            
        logger.info("Database connection and schema verified successfully.")
    except Exception as e:
        logger.error(f"Error during database initialization: {e}")
    
    yield
    # Shutdown logic (if any) can go here
    logger.info("Backend server shutting down.")

app.router.lifespan_context = lifespan

@app.get("/", tags=["Health"])
async def health_check():
    return {
        "status": "online",
        "project": settings.PROJECT_NAME,
        "version": settings.VERSION
    }

if __name__ == "__main__":
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
