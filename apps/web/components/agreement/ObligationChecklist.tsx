"use client";

import { CheckCircle2, XCircle, Clock, AlertCircle } from "lucide-react";
import ConfidenceMeter from "../shared/ConfidenceMeter";

interface Party {
  id: string;
  name: string;
  flag?: string;
}

interface ObligationItem {
  id: string;
  description: string;
  deadline: string;
  status: "fulfilled" | "violated" | "pending" | "partial";
  assignedTo: Party;
  consequenceEventId?: string;
}

export interface ObligationChecklistProps {
  agreementTitle: string;
  agreementDate: string;
  parties: Party[];
  obligations: ObligationItem[];
  onObligationClick?: (obligationId: string, consequenceEventId?: string) => void;
}

const statusIcon: Record<string, { icon: typeof CheckCircle2; color: string }> = {
  fulfilled: { icon: CheckCircle2, color: "text-success" },
  violated: { icon: XCircle, color: "text-destructive" },
  pending: { icon: Clock, color: "text-muted" },
  partial: { icon: AlertCircle, color: "text-warning" },
};

const statusLabel: Record<string, string> = {
  fulfilled: "이행",
  violated: "위반",
  pending: "진행중",
  partial: "부분이행",
};

function getComplianceRate(obligations: ObligationItem[], partyId: string): number {
  const partyObs = obligations.filter((o) => o.assignedTo.id === partyId);
  if (partyObs.length === 0) return 0;
  const fulfilled = partyObs.filter((o) => o.status === "fulfilled").length;
  const partial = partyObs.filter((o) => o.status === "partial").length;
  return Math.round(((fulfilled + partial * 0.5) / partyObs.length) * 100);
}

export default function ObligationChecklist({
  agreementTitle,
  agreementDate,
  parties,
  obligations,
  onObligationClick,
}: ObligationChecklistProps) {
  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-border bg-card">
        <div className="flex items-center gap-2 mb-1">
          {parties.map((p) => (
            <span key={p.id} className="text-lg">{p.flag ?? ""}</span>
          ))}
          <h2 className="text-lg font-bold text-foreground">{agreementTitle}</h2>
        </div>
        <p className="text-xs text-muted">{agreementDate}</p>
      </div>

      {/* Compliance Summary */}
      <div className="grid grid-cols-2 gap-4 px-6 py-4 border-b border-border">
        {parties.map((party) => {
          const rate = getComplianceRate(obligations, party.id);
          return (
            <div key={party.id}>
              <div className="text-sm font-medium text-foreground mb-2">
                {party.flag ?? ""} {party.name}
              </div>
              <ConfidenceMeter value={rate} label="이행률" size="sm" />
            </div>
          );
        })}
      </div>

      {/* Obligations by Party */}
      <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border">
        {parties.map((party) => {
          const partyObs = obligations.filter((o) => o.assignedTo.id === party.id);
          return (
            <div key={party.id} className="p-4">
              <h3 className="text-sm font-semibold text-foreground mb-3">
                {party.flag ?? ""} {party.name}의 의무
              </h3>
              <ul className="space-y-2">
                {partyObs.map((ob) => {
                  const { icon: Icon, color } = statusIcon[ob.status] ?? statusIcon.pending;
                  const clickable = ob.status === "violated" && ob.consequenceEventId;
                  return (
                    <li
                      key={ob.id}
                      className={`flex items-start gap-2 p-2.5 rounded-lg border border-border/50 bg-background/30 ${
                        clickable ? "cursor-pointer hover:bg-accent/5 hover:border-accent/30 transition-colors" : ""
                      }`}
                      onClick={() => clickable && onObligationClick?.(ob.id, ob.consequenceEventId)}
                    >
                      <Icon className={`h-4 w-4 mt-0.5 shrink-0 ${color}`} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-foreground leading-tight">{ob.description}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className={`text-[10px] font-medium ${color}`}>
                            {statusLabel[ob.status]}
                          </span>
                          <span className="text-[10px] text-muted">기한: {ob.deadline}</span>
                        </div>
                        {clickable && (
                          <span className="text-[10px] text-accent mt-0.5 block">
                            클릭하여 결과 인과관계 보기 →
                          </span>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}
