"use client";

import VerificationBadge from "../shared/VerificationBadge";

interface ScorecardClaim {
  id: string;
  text: string;
  status: "verified" | "false" | "misleading" | "unverified" | "partly_true";
  confidence: number;
  sourcesFor?: number;
  sourcesAgainst?: number;
}

export interface TruthScorecardProps {
  claims: ScorecardClaim[];
  title?: string;
}

function getBarColor(confidence: number): string {
  if (confidence >= 70) return "bg-success";
  if (confidence >= 40) return "bg-warning";
  return "bg-destructive";
}

function getTextColor(confidence: number): string {
  if (confidence >= 70) return "text-success";
  if (confidence >= 40) return "text-warning";
  return "text-destructive";
}

export default function TruthScorecard({
  claims,
  title = "주장별 신뢰도 스코어카드",
}: TruthScorecardProps) {
  const sorted = [...claims].sort((a, b) => b.confidence - a.confidence);

  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      {title && (
        <div className="px-5 py-3 border-b border-border">
          <h3 className="text-sm font-semibold text-foreground">{title}</h3>
        </div>
      )}

      <div className="divide-y divide-border">
        {sorted.map((claim) => (
          <div key={claim.id} className="px-5 py-3.5 flex items-center gap-4">
            {/* Claim text */}
            <div className="flex-1 min-w-0">
              <p className="text-sm text-foreground leading-tight mb-1.5">
                &ldquo;{claim.text}&rdquo;
              </p>
              <div className="flex items-center gap-2">
                <VerificationBadge status={claim.status} size="sm" />
                {claim.sourcesFor !== undefined && (
                  <span className="text-[10px] text-muted">
                    {claim.sourcesFor}건 지지 / {claim.sourcesAgainst ?? 0}건 반박
                  </span>
                )}
              </div>
            </div>

            {/* Confidence gauge */}
            <div className="flex items-center gap-2 shrink-0 w-32">
              <div className="flex-1 h-2.5 rounded-full bg-border/50 overflow-hidden">
                <div
                  className={`h-full rounded-full ${getBarColor(claim.confidence)} transition-all duration-500`}
                  style={{ width: `${claim.confidence}%` }}
                />
              </div>
              <span
                className={`text-sm font-bold tabular-nums w-10 text-right ${getTextColor(claim.confidence)}`}
              >
                {claim.confidence}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
