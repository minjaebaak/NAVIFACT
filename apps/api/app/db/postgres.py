"""SQLAlchemy async engine and session factory for PostgreSQL."""

from sqlalchemy.ext.asyncio import (
    AsyncSession,
    async_sessionmaker,
    create_async_engine,
)
from sqlalchemy.orm import DeclarativeBase

from app.config import settings

_engine = None
async_session_factory: async_sessionmaker[AsyncSession] = None  # type: ignore[assignment]


class Base(DeclarativeBase):
    """Declarative base for all ORM models."""


async def init_engine() -> None:
    """Create the async engine and session factory (called at startup)."""
    global _engine, async_session_factory

    _engine = create_async_engine(
        settings.postgres_url,
        echo=settings.debug,
        pool_size=20,
        max_overflow=10,
    )
    async_session_factory = async_sessionmaker(
        bind=_engine,
        class_=AsyncSession,
        expire_on_commit=False,
    )


async def dispose_engine() -> None:
    """Dispose of the engine's connection pool (called at shutdown)."""
    global _engine, async_session_factory
    if _engine is not None:
        await _engine.dispose()
        _engine = None
        async_session_factory = None  # type: ignore[assignment]
