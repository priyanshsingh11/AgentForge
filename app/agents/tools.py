from langchain_core.tools import tool
import json
import logging

logger = logging.getLogger(__name__)

@tool
def calculator(expression: str) -> str:
    """Useful for mathematical calculations. Input should be a valid python expression string."""
    try:
        # Using eval is generally unsafe, but for a demo/controlled environment it's fine.
        # In production, use a safe math parser.
        result = eval(expression, {"__builtins__": {}}, {})
        return str(result)
    except Exception as e:
        return f"Error: {e}"

@tool
def web_search(query: str) -> str:
    """Useful for searching the internet for real-time information. Input is the search query."""
    # Mocking search for now since we don't have an API key like Tavily or Google Search.
    # In a real app, this would use a Search API client.
    logger.info(f"Mocking search for: {query}")
    return f"Search result for '{query}': AI agents are becoming increasingly autonomous using frameworks like LangGraph."

@tool
def get_current_time() -> str:
    """Returns the current date and time."""
    from datetime import datetime
    return datetime.now().strftime("%Y-%m-%d %H:%M:%S")

# List of tools to be used by the agent
tools = [calculator, web_search, get_current_time]
