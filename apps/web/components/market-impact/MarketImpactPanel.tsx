"use client";

import { useState } from "react";
import {
  TrendingUp,
  TrendingDown,
  Minus,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

interface StockImpact {
  ticker: string;
  name: string;
  exchange: string;
  direction: "positive" | "negative" | "neutral";
  reasoning: string;
}

interface SectorImpact {
  sector: string;
  direction: "positive" | "negative" | "neutral";
  magnitude: "high" | "medium" | "low";
  reasoning: string;
  region: "KR" | "US" | "GLOBAL";
  stocks: StockImpact[];
}

interface MarketImpact {
  id: string;
  eventId: string;
  summary: string;
  analysisDate: string;
  sectors: SectorImpact[];
}

interface MarketImpactPanelProps {
  marketImpacts: MarketImpact[];
}

const directionConfig = {
  positive: {
    icon: TrendingUp,
    label: "긍정적",
    color: "text-success",
    bg: "bg-success/10",
    border: "border-success/20",
    stockBg: "bg-success/5",
  },
  negative: {
    icon: TrendingDown,
    label: "부정적",
    color: "text-destructive",
    bg: "bg-destructive/10",
    border: "border-destructive/20",
    stockBg: "bg-destructive/5",
  },
  neutral: {
    icon: Minus,
    label: "중립",
    color: "text-muted",
    bg: "bg-muted/10",
    border: "border-muted/20",
    stockBg: "bg-muted/5",
  },
};

const magnitudeConfig = {
  high: { label: "높음", color: "text-foreground", bg: "bg-foreground/10" },
  medium: { label: "중간", color: "text-muted", bg: "bg-muted/10" },
  low: { label: "낮음", color: "text-muted/70", bg: "bg-muted/5" },
};

const regionFlag: Record<string, string> = {
  KR: "🇰🇷",
  US: "🇺🇸",
  GLOBAL: "🌐",
};

function SectorCard({ sector }: { sector: SectorImpact }) {
  const [expanded, setExpanded] = useState(false);
  const dir = directionConfig[sector.direction];
  const mag = magnitudeConfig[sector.magnitude];
  const DirIcon = dir.icon;

  return (
    <div className={`rounded-lg border ${dir.border} ${dir.bg} overflow-hidden`}>
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full p-4 text-left"
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <DirIcon className={`h-4 w-4 ${dir.color}`} />
            <span className="font-semibold text-foreground">{sector.sector}</span>
            <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium ${mag.bg} ${mag.color}`}>
              {mag.label}
            </span>
            <span className="text-sm">{regionFlag[sector.region]}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted">
              {sector.stocks.length}개 종목
            </span>
            {expanded ? (
              <ChevronUp className="h-4 w-4 text-muted" />
            ) : (
              <ChevronDown className="h-4 w-4 text-muted" />
            )}
          </div>
        </div>
        <p className="text-sm text-muted leading-relaxed">{sector.reasoning}</p>
      </button>

      {expanded && sector.stocks.length > 0 && (
        <div className="px-4 pb-4 space-y-2">
          <div className="border-t border-border/50 pt-3">
            {sector.stocks.map((stock) => {
              const stockDir = directionConfig[stock.direction];
              const StockIcon = stockDir.icon;
              return (
                <div
                  key={stock.ticker}
                  className={`flex items-start gap-3 p-2.5 rounded-lg ${stockDir.stockBg} mb-1.5 last:mb-0`}
                >
                  <StockIcon className={`h-3.5 w-3.5 mt-0.5 ${stockDir.color}`} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-sm font-medium text-foreground">
                        {stock.name}
                      </span>
                      <span className="text-[10px] text-muted font-mono">
                        {stock.ticker}
                      </span>
                      <span className="text-[10px] text-muted">
                        {stock.exchange}
                      </span>
                    </div>
                    <p className="text-xs text-muted leading-relaxed">
                      {stock.reasoning}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default function MarketImpactPanel({ marketImpacts }: MarketImpactPanelProps) {
  if (marketImpacts.length === 0) {
    return (
      <div className="p-6 rounded-xl border border-border bg-card text-center">
        <p className="text-sm text-muted">
          이 이벤트에 대한 시장 영향 분석이 아직 없습니다.
        </p>
      </div>
    );
  }

  // Use the first (most relevant) market impact
  const impact = marketImpacts[0];

  // Group sectors by direction
  const positive = impact.sectors.filter((s) => s.direction === "positive");
  const negative = impact.sectors.filter((s) => s.direction === "negative");
  const neutral = impact.sectors.filter((s) => s.direction === "neutral");

  return (
    <div className="space-y-4">
      {/* Summary */}
      <div className="p-4 rounded-lg border border-border bg-card">
        <p className="text-sm text-foreground leading-relaxed">
          {impact.summary}
        </p>
        <p className="text-[10px] text-muted mt-2">
          분석일: {impact.analysisDate}
        </p>
      </div>

      {/* Positive */}
      {positive.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="h-4 w-4 text-success" />
            <span className="text-sm font-medium text-success">긍정적 영향</span>
          </div>
          <div className="space-y-3">
            {positive.map((s, i) => (
              <SectorCard key={`pos-${i}`} sector={s} />
            ))}
          </div>
        </div>
      )}

      {/* Negative */}
      {negative.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-2">
            <TrendingDown className="h-4 w-4 text-destructive" />
            <span className="text-sm font-medium text-destructive">부정적 영향</span>
          </div>
          <div className="space-y-3">
            {negative.map((s, i) => (
              <SectorCard key={`neg-${i}`} sector={s} />
            ))}
          </div>
        </div>
      )}

      {/* Neutral */}
      {neutral.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Minus className="h-4 w-4 text-muted" />
            <span className="text-sm font-medium text-muted">중립적 영향</span>
          </div>
          <div className="space-y-3">
            {neutral.map((s, i) => (
              <SectorCard key={`neu-${i}`} sector={s} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
