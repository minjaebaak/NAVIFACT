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
    # Startup
    await init_driver()
    await init_engine()
    await init_redis()

    yield

    # Shutdown
    await close_driver()
    await dispose_engine()
    await close_redis()


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
