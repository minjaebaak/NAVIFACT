"""NAVIFACT API — FastAPI application entry point."""

from contextlib import asynccontextmanager
from typing import AsyncGenerator

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.v1.router import v1_router
from app.config import settings
from app.core.exceptions import register_exception_handlers
from app.db.neo4j import close_driver, init_driver
from app.db.postgres import dispose_engine, init_engine
from app.db.redis import close_redis, init_redis


@asynccontextmanager
async def lifespan(app: FastAPI) -> AsyncGenerator[None]:
    """Manage startup / shutdown of external connections."""
    import logging

    logger = logging.getLogger(__name__)

    # Startup — graceful: DB 연결 실패해도 서버는 시작
    try:
        await init_engine()
    except Exception as e:
        logger.warning(f"PostgreSQL connection failed (non-fatal): {e}")

    try:
        await init_driver()
    except Exception as e:
        logger.warning(f"Neo4j connection failed (non-fatal): {e}")

    try:
        await init_redis()
    except Exception as e:
        logger.warning(f"Redis connection failed (non-fatal): {e}")

    yield

    # Shutdown
    try:
        await close_driver()
    except Exception:
        pass
    try:
        await dispose_engine()
    except Exception:
        pass
    try:
        await close_redis()
    except Exception:
        pass


app = FastAPI(
    title=settings.app_name,
    version="0.1.0",
    description="Fact-based historical event tracking portal — REST API",
    lifespan=lifespan,
)

# --- CORS ---
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Exception handlers ---
register_exception_handlers(app)

# --- Routers ---
app.include_router(v1_router, prefix="/api/v1")


@app.get("/health", tags=["health"])
async def healthcheck() -> dict[str, str]:
    return {"status": "ok"}
