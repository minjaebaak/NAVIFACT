"""Meilisearch client wrapper."""

import meilisearch

from app.config import settings

_client: meilisearch.Client | None = None


def get_meilisearch_client() -> meilisearch.Client:
    """Return (or lazily create) the Meilisearch client."""
    global _client
    if _client is None:
        _client = meilisearch.Client(
            settings.meilisearch_url,
            settings.meilisearch_key or None,
        )
    return _client
