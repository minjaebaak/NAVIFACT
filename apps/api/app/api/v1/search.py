"""Search endpoints — full-text search via Meilisearch."""

from fastapi import APIRouter, Query

from app.db.meilisearch import get_meilisearch_client

router = APIRouter()


@router.get("")
async def search(
    q: str = Query(..., min_length=1, description="Search query string"),
    index: str = Query("events", description="Meilisearch index to search"),
    page: int = Query(1, ge=1),
    page_size: int = Query(20, ge=1, le=100),
) -> dict:
    """Full-text search across NAVIFACT content via Meilisearch."""
    client = get_meilisearch_client()
    result = client.index(index).search(
        q,
        {
            "offset": (page - 1) * page_size,
            "limit": page_size,
        },
    )
    return {
        "query": q,
        "index": index,
        "hits": result.get("hits", []),
        "total": result.get("estimatedTotalHits", 0),
        "page": page,
        "page_size": page_size,
    }
