"use client";

import { useState } from "react";
import { Target, Clock, TrendingUp, Users } from "lucide-react";

export interface PredictionCardProps {
  id: string;
  question: string;
  yesPool: number;
  noPool: number;
  deadline: string;
  status: "active" | "settled" | "expired";
  settlementCriteria?: string;
  userBet?: { side: "yes" | "no"; amount: number } | null;
  onBet?: (predictionId: string, side: "yes" | "no", amount: number) => void;
}

function formatPoints(n: number): string {
  if (n >= 10000) return `${(n / 10000).toFixed(1)}만`;
  if (n >= 1000) return `${(n / 1000).toFixed(1)}천`;
  return n.toLocaleString();
}

export default function PredictionCard({
  id,
  question,
  yesPool,
  noPool,
  deadline,
  status,
  settlementCriteria,
  userBet,
  onBet,
}: PredictionCardProps) {
  const [betAmount, setBetAmount] = useState(100);
  const [selectedSide, setSelectedSide] = useState<"yes" | "no" | null>(null);

  const totalPool = yesPool + noPool;
  const yesPercent = totalPool > 0 ? Math.round((yesPool / totalPool) * 100) : 50;
  const noPercent = 100 - yesPercent;

  const estimatedReturn = (side: "yes" | "no") => {
    const pool = side === "yes" ? yesPool : noPool;
    if (pool === 0) return betAmount * 2;
    return Math.round((betAmount / (pool + betAmount)) * (totalPool + betAmount));
  };

  const isActive = status === "active";

  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 border-b border-border">
        <div className="flex items-start gap-2">
          <Target className="h-5 w-5 text-accent mt-0.5 shrink-0" />
          <h3 className="text-sm font-semibold text-foreground leading-tight">{question}</h3>
        </div>
      </div>

      {/* Ratio Bar */}
      <div className="px-5 py-4">
        <div className="flex justify-between text-xs font-medium mb-2">
          <span className="text-success">할 것이다 {yesPercent}%</span>
          <span className="text-destructive">안 할 것이다 {noPercent}%</span>
        </div>
        <div className="w-full h-3 rounded-full overflow-hidden flex bg-border/30">
          <div
            className="h-full bg-success transition-all duration-300"
            style={{ width: `${yesPercent}%` }}
          />
          <div
            className="h-full bg-destructive transition-all duration-300"
            style={{ width: `${noPercent}%` }}
          />
        </div>
        <div className="flex justify-between text-[10px] text-muted mt-1">
          <span>{formatPoints(yesPool)} P</span>
          <span>{formatPoints(noPool)} P</span>
        </div>
      </div>

      {/* Betting UI */}
      {isActive && (
        <div className="px-5 py-4 border-t border-border bg-background/30">
          <div className="flex gap-2 mb-3">
            <button
              className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-all border ${
                selectedSide === "yes"
                  ? "bg-success/20 border-success text-success"
                  : "border-border text-muted hover:border-success/50 hover:text-success"
              }`}
              onClick={() => setSelectedSide("yes")}
            >
              할 것이다
            </button>
            <button
              className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-all border ${
                selectedSide === "no"
                  ? "bg-destructive/20 border-destructive text-destructive"
                  : "border-border text-muted hover:border-destructive/50 hover:text-destructive"
              }`}
              onClick={() => setSelectedSide("no")}
            >
              안 할 것이다
            </button>
          </div>

          {selectedSide && (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min={10}
                  step={10}
                  value={betAmount}
                  onChange={(e) => setBetAmount(Math.max(10, Number(e.target.value)))}
                  className="flex-1 h-8 px-3 rounded-lg bg-background border border-border text-sm text-foreground outline-none focus:border-accent"
                />
                <span className="text-xs text-muted">P</span>
              </div>
              <div className="flex items-center gap-1 text-[10px] text-muted">
                <TrendingUp className="h-3 w-3" />
                <span>
                  예상 수익: {formatPoints(estimatedReturn(selectedSide))} P
                  <span className="text-success ml-1">
                    (+{formatPoints(estimatedReturn(selectedSide) - betAmount)})
                  </span>
                </span>
              </div>
              <button
                className="w-full py-2 rounded-lg bg-accent text-accent-foreground text-xs font-semibold hover:bg-accent/90 transition-colors"
                onClick={() => onBet?.(id, selectedSide, betAmount)}
              >
                베팅하기
              </button>
            </div>
          )}
        </div>
      )}

      {/* User's existing bet */}
      {userBet && (
        <div className="px-5 py-3 border-t border-border bg-accent/5">
          <div className="flex items-center gap-2 text-xs">
            <span className="text-muted">내 베팅:</span>
            <span className={userBet.side === "yes" ? "text-success font-semibold" : "text-destructive font-semibold"}>
              {userBet.side === "yes" ? "할 것이다" : "안 할 것이다"}
            </span>
            <span className="text-foreground font-medium">{formatPoints(userBet.amount)} P</span>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="px-5 py-3 border-t border-border flex items-center justify-between text-[10px] text-muted">
        <div className="flex items-center gap-1">
          <Clock className="h-3 w-3" />
          <span>마감: {deadline}</span>
        </div>
        <div className="flex items-center gap-1">
          <Users className="h-3 w-3" />
          <span>{formatPoints(totalPool)} P 풀</span>
        </div>
      </div>

      {/* Settlement Criteria */}
      {settlementCriteria && (
        <div className="px-5 py-2.5 border-t border-border bg-background/30 text-[10px] text-muted">
          판정 기준: {settlementCriteria}
        </div>
      )}
    </div>
  );
}
