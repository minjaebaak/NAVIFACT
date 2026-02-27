"""FastAPI dependency injection providers."""

from typing import Annotated, AsyncGenerator

from fastapi import Depends
from neo4j import AsyncDriver
from redis.asyncio import Redis
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.neo4j import get_driver
from app.db.postgres import async_session_factory
from app.db.redis import get_redis


async def get_db_session() -> AsyncGenerator[AsyncSession]:
    """Yield a SQLAlchemy async session, auto-closed after use."""
    async with async_session_factory() as session:
        yield session


async def get_neo4j_driver() -> AsyncDriver:
    """Return the shared Neo4j async driver."""
    return get_driver()


async def get_redis_client() -> Redis:
    """Return the shared Redis async client."""
    return get_redis()


# Annotated convenience aliases for use in endpoint signatures.
DbSession = Annotated[AsyncSession, Depends(get_db_session)]
Neo4jDriver = Annotated[AsyncDriver, Depends(get_neo4j_driver)]
RedisClient = Annotated[Redis, Depends(get_redis_client)]
