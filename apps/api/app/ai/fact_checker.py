"""Placeholder for LangChain / Anthropic-powered fact-checking integration.

This module will eventually:
- Accept a claim statement
- Search for corroborating / contradicting evidence
- Return a structured verdict with confidence and supporting URLs
"""

from dataclasses import dataclass

from app.config import settings


@dataclass
class FactCheckResult:
    verdict: str  # "true" | "false" | "partially_true" | "unverified"
    confidence: float
    explanation: str
    evidence_urls: list[str]


async def check_claim(statement: str) -> FactCheckResult:
    """Run AI-assisted fact-checking on the given claim.

    Currently returns a stub result. Replace with a real LangChain /
    Anthropic pipeline once the integration is ready.
    """
    _ = settings.anthropic_api_key  # Will be used when LangChain pipeline is wired up

    # TODO: Implement LangChain fact-checking chain:
    #   1. Embed the claim
    #   2. Retrieve relevant evidence from Meilisearch
    #   3. Send evidence + claim to Claude for evaluation
    #   4. Parse structured response

    return FactCheckResult(
        verdict="unverified",
        confidence=0.0,
        explanation="Fact-checking pipeline not yet implemented.",
        evidence_urls=[],
    )
