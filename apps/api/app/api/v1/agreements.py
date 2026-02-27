"""Agreement endpoints — treaties, obligations, and compliance scorecards."""

from uuid import UUID

from fastapi import APIRouter, HTTPException, status

from app.models.agreement import (
    AgreementResponse,
    ComplianceScorecard,
    ObligationResponse,
)
from app.services import agreement_service

router = APIRouter()


@router.get("/{agreement_id}", response_model=AgreementResponse)
async def get_agreement(agreement_id: UUID) -> AgreementResponse:
    """Return an agreement with its obligations."""
    result = await agreement_service.get_agreement(agreement_id)
    if result is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Agreement not found",
        )
    return result


@router.get("/{agreement_id}/obligations", response_model=list[ObligationResponse])
async def get_obligations(agreement_id: UUID) -> list[ObligationResponse]:
    """Return the obligation checklist for an agreement."""
    return await agreement_service.get_obligations(agreement_id)


@router.get("/{agreement_id}/compliance", response_model=ComplianceScorecard)
async def get_compliance(agreement_id: UUID) -> ComplianceScorecard:
    """Return the compliance scorecard for an agreement."""
    return await agreement_service.get_compliance_scorecard(agreement_id)
