import logging
import chromadb
from chromadb.config import Settings
from typing import List, Dict, Any

logger = logging.getLogger(__name__)

class SemanticMemory:
    def __init__(self, persist_directory: str = "db_vector"):
        self.client = chromadb.PersistentClient(path=persist_directory)
        self.collection = self.client.get_or_create_collection(name="agent_forge_memory")
        logger.info(f"Initialized ChromaDB at {persist_directory}")

    async def add_to_memory(self, text: str, metadata: Dict[str, Any] = None):
        """
        Adds a single piece of knowledge to the vector store.
        """
        # For simplicity, id could be based on hash or timestamp
        import hashlib
        doc_id = hashlib.md5(text.encode()).hexdigest()
        
        self.collection.add(
            documents=[text],
            metadatas=[metadata or {}],
            ids=[doc_id]
        )
        logger.info(f"Added to semantic memory: {doc_id}")

    async def retrieve_similar_context(self, query: str, n_results: int = 3) -> List[str]:
        """
        Fetches similar past knowledge for a query.
        """
        results = self.collection.query(
            query_texts=[query],
            n_results=n_results
        )
        
        docs = results.get("documents", [])
        return docs[0] if docs else []

# Global instance
semantic_memory = SemanticMemory()
