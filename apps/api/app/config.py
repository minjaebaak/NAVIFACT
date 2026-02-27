"""Application configuration via pydantic-settings."""

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Application settings loaded from environment variables."""

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=False,
    )

    # --- Neo4j ---
    neo4j_uri: str = "bolt://localhost:7687"
    neo4j_user: str = "neo4j"
    neo4j_password: str = "password"

    # --- PostgreSQL ---
    postgres_url: str = "postgresql+asyncpg://postgres:postgres@localhost:5432/navifact"

    # --- Redis ---
    redis_url: str = "redis://localhost:6379/0"

    # --- Meilisearch ---
    meilisearch_url: str = "http://localhost:7700"
    meilisearch_key: str = ""

    # --- JWT ---
    jwt_secret: str = "change-me-in-production"
    jwt_algorithm: str = "HS256"
    jwt_expiration_minutes: int = 60

    # --- External AI (optional) ---
    anthropic_api_key: str | None = None

    # --- Application ---
    app_name: str = "NAVIFACT API"
    debug: bool = False
    allowed_origins: list[str] = ["http://localhost:3000"]


settings = Settings()
