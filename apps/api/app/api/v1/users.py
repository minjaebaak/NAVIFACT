"""User endpoints — profile and account management."""

from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, Query, status

from app.core.auth import get_current_user
from app.db.neo4j import execute_query
from app.models.common import PaginatedResponse
from app.models.activity import ActivityResponse
from app.models.user import UserProfileUpdate, UserPublicProfile, UserResponse
from app.services.event_service import _neo4j_to_python_datetime

router = APIRouter()


def _props_to_user_response(props: dict) -> UserResponse:
    return UserResponse(
        id=props["id"],
        email=props["email"],
        username=props["username"],
        role=props.get("role", "viewer"),
        points=props.get("points", 0),
        bio=props.get("bio"),
        active_title=props.get("active_title"),
        accuracy_rate=props.get("accuracy_rate"),
        total_bets=props.get("total_bets", 0) or 0,
        correct_bets=props.get("correct_bets", 0) or 0,
        created_at=_neo4j_to_python_datetime(props["created_at"]),
    )


def _props_to_public(props: dict) -> UserPublicProfile:
    return UserPublicProfile(
        id=props["id"],
        username=props["username"],
        role=props.get("role", "viewer"),
        points=props.get("points", 0),
        bio=props.get("bio"),
        active_title=props.get("active_title"),
        accuracy_rate=props.get("accuracy_rate"),
        total_bets=props.get("total_bets", 0) or 0,
        correct_bets=props.get("correct_bets", 0) or 0,
        created_at=_neo4j_to_python_datetime(props["created_at"]),
    )


@router.get("/me", response_model=UserResponse)
async def get_me(
    current_user: dict = Depends(get_current_user),
) -> UserResponse:
    """Return the authenticated user's profile."""
    records = await execute_query(
        "MATCH (u:User {id: $id}) RETURN u",
        {"id": current_user["sub"]},
    )
    if not records:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found",
        )
    return _props_to_user_response(dict(records[0]["u"]))


@router.put("/me", response_model=UserResponse)
async def update_me(
    payload: UserProfileUpdate,
    current_user: dict = Depends(get_current_user),
) -> UserResponse:
    """Update the authenticated user's profile."""
    sets = []
    params: dict = {"id": current_user["sub"]}
    if payload.bio is not None:
        sets.append("u.bio = $bio")
        params["bio"] = payload.bio

    if not sets:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="No fields to update")

    query = f"MATCH (u:User {{id: $id}}) SET {', '.join(sets)} RETURN u"
    records = await execute_query(query, params)
    if not records:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    return _props_to_user_response(dict(records[0]["u"]))


@router.get("/{user_id}/profile", response_model=UserPublicProfile)
async def get_public_profile(user_id: UUID) -> UserPublicProfile:
    """Return a user's public profile."""
    records = await execute_query(
        "MATCH (u:User {id: $id}) RETURN u",
        {"id": str(user_id)},
    )
    if not records:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    return _props_to_public(dict(records[0]["u"]))


@router.get("/{user_id}/activities", response_model=PaginatedResponse[ActivityResponse])
async def get_user_activities(
    user_id: UUID,
    page: int = Query(1, ge=1),
    page_size: int = Query(20, ge=1, le=100),
) -> PaginatedResponse[ActivityResponse]:
    """Return a user's activity feed."""
    skip = (page - 1) * page_size

    count_records = await execute_query(
        "MATCH (u:User {id: $uid})-[:DID]->(a:Activity) RETURN count(a) AS total",
        {"uid": str(user_id)},
    )
    total = count_records[0]["total"] if count_records else 0

    records = await execute_query(
        """
        MATCH (u:User {id: $uid})-[:DID]->(a:Activity)
        RETURN a ORDER BY a.created_at DESC SKIP $skip LIMIT $limit
        """,
        {"uid": str(user_id), "skip": skip, "limit": page_size},
    )

    import json
    items = []
    for r in records:
        props = dict(r["a"])
        meta_raw = props.get("metadata_json")
        items.append(ActivityResponse(
            id=props["id"],
            user_id=props["user_id"],
            action=props["action"],
            summary=props["summary"],
            metadata=json.loads(meta_raw) if meta_raw else None,
            created_at=_neo4j_to_python_datetime(props["created_at"]),
        ))

    total_pages = max(1, -(-total // page_size))
    return PaginatedResponse(
        items=items, total=total, page=page, page_size=page_size, total_pages=total_pages
    )
