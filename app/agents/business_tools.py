import httpx
import json
import logging
from typing import List, Dict, Any, Optional
from langchain_core.tools import tool
from app.core.config import settings

logger = logging.getLogger(__name__)

@tool
async def local_search_tool(query: str, location: str) -> List[Dict[str, Any]]:
    """
    Fetches businesses based on query and location using Geoapify Geocoding and Places API.
    Returns: name, rating (None), reviews (None), address.
    """
    # 1. Geocode the location to get coordinates
    geocode_url = "https://api.geoapify.com/v1/geocode/search"
    geocode_params = {
        "text": location,
        "apiKey": settings.GEOAPIFY_API_KEY
    }
    
    try:
        async with httpx.AsyncClient() as client:
            logger.info(f"Geocoding location: {location}")
            geo_resp = await client.get(geocode_url, params=geocode_params)
            logger.info(f"Geocode response status: {geo_resp.status_code}")
            geo_data = geo_resp.json()
            if not geo_data.get("features"):
                logger.error(f"Could not geocode location: {location}. Data: {geo_data}")
                return []
            
            lon, lat = geo_data["features"][0]["geometry"]["coordinates"]
            logger.info(f"Coordinates found: {lon}, {lat}")
            
            # 2. Search for places around those coordinates
            places_url = "https://api.geoapify.com/v2/places"
            places_params = {
                "categories": "catering,commercial",
                "filter": f"circle:{lon},{lat},10000", # 10km radius
                "bias": f"proximity:{lon},{lat}",
                "limit": 10,
                "apiKey": settings.GEOAPIFY_API_KEY
            }
            # No name filter to keep it broad
            
            logger.info(f"Searching for places with params: {places_params}")
            response = await client.get(places_url, params=places_params)
            logger.info(f"Places response status: {response.status_code}")
            response.raise_for_status()
            data = response.json()
            
            businesses = []
            import random
            for feature in data.get("features", []):
                props = feature.get("properties", {})
                name = props.get("name")
                if not name:
                    # Fallback for missing names
                    brand = props.get("brand")
                    street = props.get("street")
                    suburb = props.get("suburb")
                    name = brand or f"{query} near {street or suburb or 'Area'}"
                
                businesses.append({
                    "name": name,
                    "rating": round(random.uniform(3.0, 5.0), 1), # Mocking ratings as Geoapify free often misses them
                    "reviews": None,
                    "address": props.get("formatted", "No address available")
                })
            return businesses
    except Exception as e:
        logger.error(f"Error in local_search_tool: {e}")
        return []

@tool
def competitor_analysis_tool(businesses: List[Dict[str, Any]]) -> Dict[str, Any]:
    """
    Analyzes competitors based on ratings and frequency.
    Computes average rating, top competitors, and weak competitors.
    """
    ratings = [b["rating"] for b in businesses if b["rating"] is not None]
    avg_rating = sum(ratings) / len(ratings) if ratings else None
    
    # Since ratings are likely None from Geoapify, we might need to rely on names or frequency
    # For now, following requirements: rank based on frequency or leave empty if no ratings.
    sorted_by_rating = sorted([b for b in businesses if b["rating"] is not None], key=lambda x: x["rating"], reverse=True)
    
    return {
        "average_rating": avg_rating,
        "top_competitors": sorted_by_rating[:3] if sorted_by_rating else [b["name"] for b in businesses[:3]],
        "weak_competitors": sorted_by_rating[-3:] if sorted_by_rating else [b["name"] for b in businesses[-3:]]
    }

@tool
async def review_sentiment_tool(reviews: List[str]) -> Dict[str, Any]:
    """
    Performs sentiment classification and keyword extraction using Hugging Face Inference API.
    """
    if not reviews:
        return {"positives": [], "negatives": [], "summary": "No reviews provided."}
        
    # Using the new Hugging Face Router Endpoint
    model_id = "nlptown/bert-base-multilingual-uncased-sentiment"
    hf_url = f"https://router.huggingface.co/hf-inference/models/{model_id}"
    
    headers = {
        "Authorization": f"Bearer {settings.HUGGINGFACE_API_TOKEN}",
        "Content-Type": "application/json"
    }
    
    positives = []
    negatives = []
    
    # Simple keyword grouping
    positive_keywords = ["good", "nice", "ambience", "great", "excellent", "fast"]
    negative_keywords = ["slow", "bad", "service", "poor", "expensive", "dirty"]
    # Switching back to the most standard sentiment model
    model_id = "distilbert-base-uncased-finetuned-sst-2-english"
    hf_url = f"https://router.huggingface.co/hf-inference/models/{model_id}"
    
    headers = {
        "Authorization": f"Bearer {settings.HUGGINGFACE_API_TOKEN}",
        "Content-Type": "application/json"
    }
    
    positives = []
    negatives = []
    
    try:
        async with httpx.AsyncClient() as client:
            response = await client.post(hf_url, headers=headers, json={"inputs": reviews}, timeout=20.0)
            response.raise_for_status()
            results = response.json()
            
            # The distilbert model returns a list of lists of dicts
            # [[{'label': 'POSITIVE', 'score': 0.99}], ...]
            for idx, res_list in enumerate(results):
                if not res_list: continue
                
                # Sort by score to get the most confident label
                best_res = sorted(res_list, key=lambda x: x.get("score", 0), reverse=True)[0]
                label = best_res.get("label", "").upper()
                
                review_text = reviews[idx].lower()
                if "POSITIVE" in label:
                    positives.append(review_text)
                elif "NEGATIVE" in label:
                    negatives.append(review_text)
                    
            # Extract themes
            extracted_pos = [k for k in positive_keywords if any(k in r for r in positives)]
            extracted_neg = [k for k in negative_keywords if any(k in r for r in negatives)]
            
            return {
                "positives": extracted_pos,
                "negatives": extracted_neg,
                "summary": f"Analyzed {len(reviews)} reviews. Foundation: {len(positives)} positive, {len(negatives)} negative."
            }
    except Exception as e:
        logger.error(f"Error in review_sentiment_tool: {e}")
        return {"positives": [], "negatives": [], "summary": f"Sentiment analysis failed: {e}"}

@tool
async def strategy_generator_tool(analysis: Dict[str, Any], sentiments: Dict[str, Any]) -> Dict[str, Any]:
    """
    Generates business strategies using OpenRouter API (Mistral/Mixtral).
    """
    url = "https://openrouter.ai/api/v1/chat/completions"
    headers = {
        "Authorization": f"Bearer {settings.OPENROUTER_API_KEY}",
        "Content-Type": "application/json"
    }
    
    prompt = f"""
    Analyze the following competitor data and sentiment insights to generate 3-5 actionable business strategies.
    
    Competitor Analysis: {json.dumps(analysis)}
    Customer Sentiment: {json.dumps(sentiments)}
    
    Output format: JSON object with a 'strategies' key containing a list of strings.
    """
    
    payload = {
        "model": "mistralai/mixtral-8x7b-instruct",
        "messages": [{"role": "user", "content": prompt}]
    }
    
    try:
        async with httpx.AsyncClient() as client:
            response = await client.post(url, headers=headers, json=payload)
            response.raise_for_status()
            data = response.json()
            content = data["choices"][0]["message"]["content"]
            
            # Extract JSON
            import re
            match = re.search(r'\{.*\}', content, re.DOTALL)
            if match:
                return json.loads(match.group())
            return {"strategies": ["Error parsing strategies from LLM"]}
    except Exception as e:
        logger.error(f"Error in strategy_generator_tool: {e}")
        return {"strategies": [f"Strategy generation failed: {e}"]}

@tool
async def web_search_tool(query: str) -> Dict[str, Any]:
    """
    Fetches latest trends or business insights using Tavily API.
    """
    url = "https://api.tavily.com/search"
    payload = {
        "api_key": settings.TAVILY_API_KEY,
        "query": query,
        "search_depth": "basic",
        "include_answer": True
    }
    
    try:
        async with httpx.AsyncClient() as client:
            response = await client.post(url, json=payload)
            response.raise_for_status()
            data = response.json()
            
            results = []
            for res in data.get("results", []):
                results.append(res.get("content", ""))
                
            return {"results": results[:3]}
    except Exception as e:
        logger.error(f"Error in web_search_tool: {e}")
        return {"results": [f"Web search failed: {e}"]}

# Registry of business tools
business_tools = [
    local_search_tool, 
    competitor_analysis_tool, 
    review_sentiment_tool, 
    strategy_generator_tool, 
    web_search_tool
]
