from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.core.business_graph import run_business_analysis
import logging

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/business", tags=["Business Intelligence"])

class BusinessAnalysisRequest(BaseModel):
    query: str
    location: str

@router.post("/analyze")
async def analyze_business(request: BusinessAnalysisRequest):
    """
    Performs a complete business analysis for a given query and location.
    Steps:
    1. Find local competitors
    2. Analyze market
    3. Sentiment analysis (with mock reviews if needed)
    4. Strategy generation
    5. Web search for trends
    """
    try:
        result = await run_business_analysis(request.query, request.location)
        return result
    except Exception as e:
        logger.error(f"Business analysis failed: {e}")
        raise HTTPException(status_code=500, detail=str(e))
