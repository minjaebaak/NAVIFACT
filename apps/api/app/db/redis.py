"""Redis async client wrapper."""

from redis.asyncio import Redis, from_url

from app.config import settings

_redis: Redis | None = None


async def init_redis() -> Redis:
    """Create and ping the Redis async client (called at startup)."""
    global _redis
    _redis = from_url(settings.redis_url, decode_responses=True)
    await _redis.ping()
    return _redis


def get_redis() -> Redis:
    """Return the current Redis client. Raises if not initialised."""
    if _redis is None:
        raise RuntimeError("Redis client has not been initialised. Call init_redis() first.")
    return _redis


async def close_redis() -> None:
    """Close the Redis connection (called at shutdown)."""
    global _redis
    if _redis is not None:
        await _redis.aclose()
        _redis = None
