import uvicorn
from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from routes import task_routes
from database.connection import engine
from database.models import Base
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(
    title="AgentForge AI Backend",
    description="Autonomous multi-agent platform backend using FastAPI + PostgreSQL (Supabase)",
    version="1.0.0"
)

# Global Exception Handler
@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    logger.error(f"Global exception: {exc}")
    return JSONResponse(
        status_code=500,
        content={"message": "An internal server error occurred.", "detail": str(exc)},
    )

# Include Routes
app.include_router(task_routes.router, prefix="/api")

@app.on_event("startup")
async def startup_event():
    # Attempt to create tables on startup (optional if using migrations)
    # Be careful with asyncpg/Supabase in production
    try:
        async with engine.begin() as conn:
            await conn.run_sync(Base.metadata.create_all)
        logger.info("Database tables created successfully")
    except Exception as e:
        logger.error(f"Error creating database tables: {e}")

@app.get("/")
async def root():
    return {"message": "AgentForge AI API is running"}

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
