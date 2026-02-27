"""Custom exceptions and FastAPI exception handlers."""

from fastapi import FastAPI, HTTPException, Request, status
from fastapi.responses import JSONResponse


class NavifactError(Exception):
    """Base application error."""

    def __init__(self, detail: str, code: str | None = None) -> None:
        self.detail = detail
        self.code = code
        super().__init__(detail)


class NotFoundError(NavifactError):
    """Raised when a requested resource does not exist."""

    def __init__(self, resource: str, resource_id: str) -> None:
        super().__init__(
            detail=f"{resource} with id '{resource_id}' not found",
            code="NOT_FOUND",
        )


class ConflictError(NavifactError):
    """Raised on uniqueness constraint violations."""

    def __init__(self, detail: str) -> None:
        super().__init__(detail=detail, code="CONFLICT")


class ForbiddenError(NavifactError):
    """Raised when the user lacks permission."""

    def __init__(self, detail: str = "Forbidden") -> None:
        super().__init__(detail=detail, code="FORBIDDEN")


class BadRequestError(NavifactError):
    """Raised on invalid input that does not fit validation."""

    def __init__(self, detail: str) -> None:
        super().__init__(detail=detail, code="BAD_REQUEST")


def register_exception_handlers(app: FastAPI) -> None:
    """Attach custom exception handlers to the FastAPI app."""

    @app.exception_handler(NotFoundError)
    async def not_found_handler(_request: Request, exc: NotFoundError) -> JSONResponse:
        return JSONResponse(
            status_code=status.HTTP_404_NOT_FOUND,
            content={"detail": exc.detail, "code": exc.code},
        )

    @app.exception_handler(ConflictError)
    async def conflict_handler(_request: Request, exc: ConflictError) -> JSONResponse:
        return JSONResponse(
            status_code=status.HTTP_409_CONFLICT,
            content={"detail": exc.detail, "code": exc.code},
        )

    @app.exception_handler(ForbiddenError)
    async def forbidden_handler(_request: Request, exc: ForbiddenError) -> JSONResponse:
        return JSONResponse(
            status_code=status.HTTP_403_FORBIDDEN,
            content={"detail": exc.detail, "code": exc.code},
        )

    @app.exception_handler(BadRequestError)
    async def bad_request_handler(_request: Request, exc: BadRequestError) -> JSONResponse:
        return JSONResponse(
            status_code=status.HTTP_400_BAD_REQUEST,
            content={"detail": exc.detail, "code": exc.code},
        )

    @app.exception_handler(HTTPException)
    async def http_exception_handler(_request: Request, exc: HTTPException) -> JSONResponse:
        return JSONResponse(
            status_code=exc.status_code,
            content={"detail": exc.detail},
        )
