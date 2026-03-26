from typing import Annotated, TypedDict, List, Union
from langchain_groq import ChatGroq
from langchain_core.messages import BaseMessage, HumanMessage, ToolMessage
from langgraph.graph import StateGraph, END
from langgraph.prebuilt import ToolNode
from app.core.config import settings
from app.agents.tools import tools
import logging

logger = logging.getLogger(__name__)

# 1. Define the State
class AgentState(TypedDict):
    messages: Annotated[List[BaseMessage], "The messages in the conversation"]
    # We can add more state here if needed, like task_id or context

# 2. Define the LLM with Tools
llm = ChatGroq(
    api_key=settings.GROQ_API_KEY,
    model_name="llama-3.1-8b-instant",
    temperature=0
).bind_tools(tools)

# 3. Define the Nodes
def call_model(state: AgentState):
    """Calls the LLM to get the next action or final answer."""
    messages = state["messages"]
    response = llm.invoke(messages)
    return {"messages": [response]}

# 4. Define the Logic for conditional edges
def should_continue(state: AgentState):
    """Determine if we should continue to tools or stop."""
    last_message = state["messages"][-1]
    if last_message.tool_calls:
        return "tools"
    return END

# 5. Build the Graph
workflow = StateGraph(AgentState)

# Add Nodes
workflow.add_node("agent", call_model)
workflow.add_node("tools", ToolNode(tools))

# Set Entry Point
workflow.set_entry_point("agent")

# Add Edges
workflow.add_edge("tools", "agent")
workflow.add_conditional_edges(
    "agent",
    should_continue,
    {
        "tools": "tools",
        END: END
    }
)

# Compile Graph
app_graph = workflow.compile()

async def run_lang_graph_agent(goal: str):
    """Runs the LangGraph agent for a given goal."""
    initial_state = {
        "messages": [HumanMessage(content=goal)]
    }
    
    # Run the graph
    # Note: For async execution in a real app, use .ainvoke
    async for event in app_graph.astream(initial_state):
        for value in event.values():
            last_msg = value["messages"][-1]
            if hasattr(last_msg, "content"):
                logger.info(f"Agent update: {last_msg.content}")
            
    final_state = await app_graph.ainvoke(initial_state)
    return final_state["messages"][-1].content
