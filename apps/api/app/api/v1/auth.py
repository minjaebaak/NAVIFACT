"""Auth endpoints — registration and login."""

from uuid import UUID

from fastapi import APIRouter, HTTPException, status

from app.core.auth import create_access_token, hash_password, verify_password
from app.db.neo4j import execute_query
from app.models.user import LoginRequest, TokenPair, UserCreate, UserResponse
from app.services.activity_service import log_activity
from app.services.point_service import add_points

router = APIRouter()


@router.post("/register", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
async def register(payload: UserCreate) -> UserResponse:
    """Register a new user account."""
    # Check uniqueness
    existing = await execute_query(
        "MATCH (u:User) WHERE u.email = $email OR u.username = $username RETURN u LIMIT 1",
        {"email": payload.email, "username": payload.username},
    )
    if existing:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="A user with that email or username already exists",
        )

    hashed = hash_password(payload.password)
    query = """
        CREATE (u:User {
            id: randomUUID(),
            email: $email,
            username: $username,
            hashed_password: $hashed_password,
            role: 'viewer',
            points: 0,
            created_at: datetime()
        })
        RETURN u
    """
    records = await execute_query(
        query,
        {
            "email": payload.email,
            "username": payload.username,
            "hashed_password": hashed,
        },
    )
    props = dict(records[0]["u"])
    user_id = UUID(props["id"]) if isinstance(props["id"], str) else props["id"]

    # Signup bonus: +100 points
    await add_points(user_id, 100, "signup_bonus")
    await log_activity(user_id, "signup", f"{payload.username} 가입")

    return UserResponse(
        id=props["id"],
        email=props["email"],
        username=props["username"],
        role=props.get("role", "viewer"),
        points=100,
        created_at=props["created_at"],
    )


@router.post("/login", response_model=TokenPair)
async def login(payload: LoginRequest) -> TokenPair:
    """Authenticate and return a JWT access token."""
    records = await execute_query(
        "MATCH (u:User {email: $email}) RETURN u",
        {"email": payload.email},
    )
    if not records:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials",
        )

    props = dict(records[0]["u"])
    if not verify_password(payload.password, props["hashed_password"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials",
        )

    token = create_access_token(
        data={
            "sub": str(props["id"]),
            "role": props.get("role", "viewer"),
        }
    )
    return TokenPair(access_token=token)
