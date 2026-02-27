"use client";

import { AlertTriangle, CheckCircle2, BookOpen, XCircle } from "lucide-react";
import VerificationBadge from "../shared/VerificationBadge";
import ConfidenceMeter from "../shared/ConfidenceMeter";

interface NarrativeClaim {
  text: string;
  status: "verified" | "false" | "misleading" | "unverified" | "partly_true";
  confidence: number;
}

interface Narrative {
  id: string;
  title: string;
  source: string;
  sourceType: "media" | "verified";
  framing: string;
  claims: NarrativeClaim[];
  missingContext?: string[];
  sources?: string[];
}

export interface NarrativeComparisonProps {
  narratives: Narrative[];
}

export default function NarrativeComparison({
  narratives,
}: NarrativeComparisonProps) {
  const mediaNarrative = narratives.find((n) => n.sourceType === "media");
  const factNarrative = narratives.find((n) => n.sourceType === "verified");

  if (!mediaNarrative || !factNarrative) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Media Narrative */}
      <div className="rounded-xl border border-destructive/30 bg-card overflow-hidden">
        <div className="px-5 py-3 border-b border-destructive/20 bg-destructive/5 flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 text-destructive" />
          <h3 className="text-sm font-semibold text-foreground">미디어 서사</h3>
        </div>

        <div className="p-5 space-y-4">
          <div>
            <div className="text-xs text-muted mb-1">출처: {mediaNarrative.source}</div>
            <h4 className="text-base font-bold text-foreground">
              &ldquo;{mediaNarrative.title}&rdquo;
            </h4>
          </div>

          {/* Claims */}
          <div className="space-y-3">
            {mediaNarrative.claims.map((claim, i) => (
              <div
                key={i}
                className="p-3 rounded-lg border border-border/50 bg-background/30"
              >
                <div className="flex items-start gap-2 mb-2">
                  <XCircle className="h-3.5 w-3.5 text-destructive mt-0.5 shrink-0" />
                  <p className="text-sm text-foreground leading-tight">
                    {claim.text}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <VerificationBadge status={claim.status} size="sm" />
                  <ConfidenceMeter
                    value={claim.confidence}
                    size="sm"
                    showPercentage
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Missing Context */}
          {mediaNarrative.missingContext && mediaNarrative.missingContext.length > 0 && (
            <div className="p-3 rounded-lg border border-warning/30 bg-warning/5">
              <div className="flex items-center gap-1.5 mb-2">
                <AlertTriangle className="h-3.5 w-3.5 text-warning" />
                <span className="text-xs font-semibold text-warning">
                  누락된 맥락
                </span>
              </div>
              <ul className="space-y-1">
                {mediaNarrative.missingContext.map((ctx, i) => (
                  <li key={i} className="flex items-start gap-1.5 text-xs text-muted">
                    <span className="text-warning mt-0.5">-</span>
                    {ctx}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Fact Chain */}
      <div className="rounded-xl border border-success/30 bg-card overflow-hidden">
        <div className="px-5 py-3 border-b border-success/20 bg-success/5 flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-success" />
          <h3 className="text-sm font-semibold text-foreground">사실 체인</h3>
        </div>

        <div className="p-5 space-y-4">
          <div>
            <div className="text-xs text-muted mb-1">출처: {factNarrative.source}</div>
            <h4 className="text-base font-bold text-foreground">
              {factNarrative.title}
            </h4>
          </div>

          {/* Claims */}
          <div className="space-y-3">
            {factNarrative.claims.map((claim, i) => (
              <div
                key={i}
                className="p-3 rounded-lg border border-border/50 bg-background/30"
              >
                <div className="flex items-start gap-2 mb-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-success mt-0.5 shrink-0" />
                  <p className="text-sm text-foreground leading-tight">
                    {claim.text}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <VerificationBadge status={claim.status} size="sm" />
                  <ConfidenceMeter
                    value={claim.confidence}
                    size="sm"
                    showPercentage
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Sources */}
          {factNarrative.sources && factNarrative.sources.length > 0 && (
            <div className="p-3 rounded-lg border border-success/30 bg-success/5">
              <div className="flex items-center gap-1.5 mb-2">
                <BookOpen className="h-3.5 w-3.5 text-success" />
                <span className="text-xs font-semibold text-success">
                  출처 ({factNarrative.sources.length}건)
                </span>
              </div>
              <ul className="space-y-1">
                {factNarrative.sources.map((src, i) => (
                  <li key={i} className="flex items-start gap-1.5 text-xs text-muted">
                    <span className="text-success mt-0.5">-</span>
                    {src}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
