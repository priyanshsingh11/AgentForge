import logging
from typing import TypedDict, List, Dict, Any, Optional
from langgraph.graph import StateGraph, END
from app.agents.business_tools import (
    local_search_tool, 
    competitor_analysis_tool, 
    review_sentiment_tool, 
    strategy_generator_tool, 
    web_search_tool
)

logger = logging.getLogger(__name__)

# 1. Define the State
class BusinessAnalysisState(TypedDict):
    query: str
    location: str
    businesses: List[Dict[str, Any]]
    analysis: Dict[str, Any]
    reviews: List[str]
    sentiments: Dict[str, Any]
    strategies: Dict[str, Any]
    trends: Dict[str, Any]

# 2. Define the Nodes (each tool wrap is a node)
async def local_search_node(state: BusinessAnalysisState):
    businesses = await local_search_tool.ainvoke({"query": state["query"], "location": state["location"]})
    return {"businesses": businesses}

def competitor_analysis_node(state: BusinessAnalysisState):
    analysis = competitor_analysis_tool.invoke({"businesses": state["businesses"]})
    return {"analysis": analysis}

async def review_sentiment_node(state: BusinessAnalysisState):
    # Requirement: (Optional) Generate mock reviews for testing
    # If no reviews exist, we generate some mock ones to ensure the pipeline works
    reviews = state.get("reviews", [])
    if not reviews:
        reviews = [
            "The coffee was great but the service was slow.",
            "Amazing ambience and friendly staff!",
            "Expensive and not worth the price.",
            "Best place for a quiet work session.",
            "The food took forever to arrive."
        ]
    sentiments = await review_sentiment_tool.ainvoke({"reviews": reviews})
    return {"sentiments": sentiments, "reviews": reviews}

async def strategy_generator_node(state: BusinessAnalysisState):
    strategies = await strategy_generator_tool.ainvoke({
        "analysis": state["analysis"], 
        "sentiments": state["sentiments"]
    })
    return {"strategies": strategies}

async def web_search_node(state: BusinessAnalysisState):
    trends = await web_search_tool.ainvoke({"query": f"latest trends in {state['query']} industry"})
    return {"trends": trends}

# 3. Build the Graph
workflow = StateGraph(BusinessAnalysisState)

# Add Nodes
workflow.add_node("local_search", local_search_node)
workflow.add_node("competitor_analysis", competitor_analysis_node)
workflow.add_node("sentiment_analysis", review_sentiment_node)
workflow.add_node("strategy_generation", strategy_generator_node)
workflow.add_node("trend_analysis", web_search_node)

# Set Entry Point
workflow.set_entry_point("local_search")

# Add Edges (sequential pipeline)
workflow.add_edge("local_search", "competitor_analysis")
workflow.add_edge("competitor_analysis", "sentiment_analysis")
workflow.add_edge("sentiment_analysis", "strategy_generation")
workflow.add_edge("strategy_generation", "trend_analysis")
workflow.add_edge("trend_analysis", END)

# Compile Graph
business_graph = workflow.compile()

async def run_business_analysis(query: str, location: str) -> Dict[str, Any]:
    """
    Main entry point for the business analysis pipeline.
    """
    initial_state = {
        "query": query,
        "location": location,
        "businesses": [],
        "analysis": {},
        "reviews": [],
        "sentiments": {},
        "strategies": {},
        "trends": {}
    }
    
    final_output = await business_graph.ainvoke(initial_state)
    return {
        "businesses": final_output["businesses"],
        "analysis": final_output["analysis"],
        "sentiments": final_output["sentiments"],
        "strategies": final_output["strategies"],
        "trends": final_output["trends"]
    }
