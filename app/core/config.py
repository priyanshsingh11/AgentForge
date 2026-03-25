import os
from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    PROJECT_NAME: str = "AgentForge AI"
    VERSION: str = "1.0.0"
    
    # API Keys & Strings
    GROQ_API_KEY: str
    DATABASE_URL: str
    REDIS_URL: str = "redis://localhost:6379/0"
    
    # Agent settings
    MAX_ITERATIONS: int = 5
    CRITIC_THRESHOLD: int = 8

    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

settings = Settings()
