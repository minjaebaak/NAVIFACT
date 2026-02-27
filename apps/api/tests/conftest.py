"""Shared pytest fixtures for the NAVIFACT API test suite."""

from collections.abc import AsyncGenerator

import pytest
from httpx import ASGITransport, AsyncClient

from app.main import app


@pytest.fixture
async def client() -> AsyncGenerator[AsyncClient]:
    """Yield an httpx AsyncClient wired to the FastAPI app.

    The lifespan context manager is *not* invoked here so that tests
    do not require real database connections.  Individual tests should
    mock the DB layer as needed.
    """
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        yield ac
