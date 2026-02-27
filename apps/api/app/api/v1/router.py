"""V1 API router — aggregates all sub-routers."""

from fastapi import APIRouter

from app.api.v1.agreements import router as agreements_router
from app.api.v1.auth import router as auth_router
from app.api.v1.claims import router as claims_router
from app.api.v1.events import router as events_router
from app.api.v1.graph import router as graph_router
from app.api.v1.narratives import router as narratives_router
from app.api.v1.predictions import router as predictions_router
from app.api.v1.search import router as search_router

v1_router = APIRouter()

v1_router.include_router(events_router, prefix="/events", tags=["events"])
v1_router.include_router(claims_router, prefix="/claims", tags=["claims"])
v1_router.include_router(agreements_router, prefix="/agreements", tags=["agreements"])
v1_router.include_router(narratives_router, prefix="/narratives", tags=["narratives"])
v1_router.include_router(graph_router, prefix="/graph", tags=["graph"])
v1_router.include_router(predictions_router, prefix="/predictions", tags=["predictions"])
v1_router.include_router(search_router, prefix="/search", tags=["search"])
v1_router.include_router(auth_router, prefix="/auth", tags=["auth"])
