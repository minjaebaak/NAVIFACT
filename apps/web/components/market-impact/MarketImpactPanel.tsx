"use client";

import { useState } from "react";
import {
  TrendingUp,
  TrendingDown,
  Minus,
  ChevronDown,
  ChevronUp,
  BarChart3,
  LineChart,
  Scale,
  CheckCircle2,
  XCircle,
  Clock,
} from "lucide-react";

interface StockImpact {
  ticker: string;
  name: string;
  exchange: string;
  direction: "positive" | "negative" | "neutral";
  reasoning: string;
  actualChange?: number;
  actualPeriod?: string;
  actualReasoning?: string;
}

interface SectorImpact {
  sector: string;
  direction: "positive" | "negative" | "neutral";
  magnitude: "high" | "medium" | "low";
  reasoning: string;
  region: "KR" | "US" | "GLOBAL";
  stocks: StockImpact[];
  actualDirection?: "positive" | "negative" | "neutral";
  actualMagnitude?: "high" | "medium" | "low";
  actualReasoning?: string;
}

interface MarketImpact {
  id: string;
  eventId: string;
  summary: string;
  analysisDate: string;
  sectors: SectorImpact[];
  actualSummary?: string;
  actualDate?: string;
  predictionAccuracy?: number;
}

interface MarketImpactPanelProps {
  marketImpacts: MarketImpact[];
}

type TabId = "prediction" | "actual" | "comparison";

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
  KR: "\u{1F1F0}\u{1F1F7}",
  US: "\u{1F1FA}\u{1F1F8}",
  GLOBAL: "\u{1F310}",
};

// ---------------------------------------------------------------------------
// Prediction-only SectorCard (기존)
// ---------------------------------------------------------------------------

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

// ---------------------------------------------------------------------------
// Actual-result SectorCard
// ---------------------------------------------------------------------------

function ActualSectorCard({ sector }: { sector: SectorImpact }) {
  const [expanded, setExpanded] = useState(false);
  const actualDir = sector.actualDirection
    ? directionConfig[sector.actualDirection]
    : null;
  const actualMag = sector.actualMagnitude
    ? magnitudeConfig[sector.actualMagnitude]
    : null;

  if (!actualDir) {
    return (
      <div className="rounded-lg border border-border/30 bg-muted/5 p-4">
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-muted" />
          <span className="font-semibold text-foreground">{sector.sector}</span>
          <span className="text-sm">{regionFlag[sector.region]}</span>
        </div>
        <p className="text-sm text-muted mt-2">결과 대기 중</p>
      </div>
    );
  }

  const ActualIcon = actualDir.icon;

  return (
    <div className={`rounded-lg border ${actualDir.border} ${actualDir.bg} overflow-hidden`}>
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full p-4 text-left"
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <ActualIcon className={`h-4 w-4 ${actualDir.color}`} />
            <span className="font-semibold text-foreground">{sector.sector}</span>
            {actualMag && (
              <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium ${actualMag.bg} ${actualMag.color}`}>
                {actualMag.label}
              </span>
            )}
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
        <p className="text-sm text-muted leading-relaxed">
          {sector.actualReasoning || "실제 결과 분석 없음"}
        </p>
      </button>

      {expanded && sector.stocks.length > 0 && (
        <div className="px-4 pb-4 space-y-2">
          <div className="border-t border-border/50 pt-3">
            {sector.stocks.map((stock) => {
              const hasActual = stock.actualChange !== undefined;
              const changeColor =
                hasActual && stock.actualChange! > 0
                  ? "text-success"
                  : hasActual && stock.actualChange! < 0
                    ? "text-destructive"
                    : "text-muted";
              const changeBg =
                hasActual && stock.actualChange! > 0
                  ? "bg-success/5"
                  : hasActual && stock.actualChange! < 0
                    ? "bg-destructive/5"
                    : "bg-muted/5";

              return (
                <div
                  key={stock.ticker}
                  className={`flex items-start gap-3 p-2.5 rounded-lg ${changeBg} mb-1.5 last:mb-0`}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-sm font-medium text-foreground">
                        {stock.name}
                      </span>
                      <span className="text-[10px] text-muted font-mono">
                        {stock.ticker}
                      </span>
                      {hasActual && (
                        <span className={`text-sm font-semibold ${changeColor}`}>
                          {stock.actualChange! > 0 ? "+" : ""}
                          {stock.actualChange}%
                        </span>
                      )}
                      {stock.actualPeriod && (
                        <span className="text-[10px] text-muted">
                          ({stock.actualPeriod})
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-muted leading-relaxed">
                      {stock.actualReasoning || stock.reasoning}
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

// ---------------------------------------------------------------------------
// Comparison SectorCard (예측 vs 실제)
// ---------------------------------------------------------------------------

function HitBadge({ hit }: { hit: "hit" | "miss" | "partial" | "pending" }) {
  const config = {
    hit: { icon: CheckCircle2, label: "적중", color: "text-success", bg: "bg-success/10" },
    miss: { icon: XCircle, label: "빗나감", color: "text-destructive", bg: "bg-destructive/10" },
    partial: { icon: CheckCircle2, label: "부분 적중", color: "text-amber-500", bg: "bg-amber-500/10" },
    pending: { icon: Clock, label: "대기 중", color: "text-muted", bg: "bg-muted/10" },
  };
  const c = config[hit];
  const Icon = c.icon;
  return (
    <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-medium ${c.bg} ${c.color}`}>
      <Icon className="h-3 w-3" />
      {c.label}
    </span>
  );
}

function judgeSector(sector: SectorImpact): "hit" | "miss" | "partial" | "pending" {
  if (!sector.actualDirection) return "pending";
  if (sector.direction === sector.actualDirection) {
    if (sector.actualMagnitude && sector.magnitude !== sector.actualMagnitude) {
      return "partial";
    }
    return "hit";
  }
  return "miss";
}

function judgeStock(stock: StockImpact): "hit" | "miss" | "pending" {
  if (stock.actualChange === undefined) return "pending";
  const predictedPositive = stock.direction === "positive";
  const actualPositive = stock.actualChange > 0;
  const actualNeutral = stock.actualChange === 0;
  if (actualNeutral) return stock.direction === "neutral" ? "hit" : "miss";
  return predictedPositive === actualPositive ? "hit" : "miss";
}

function ComparisonSectorCard({ sector }: { sector: SectorImpact }) {
  const [expanded, setExpanded] = useState(false);
  const sectorHit = judgeSector(sector);
  const predDir = directionConfig[sector.direction];
  const actualDir = sector.actualDirection
    ? directionConfig[sector.actualDirection]
    : null;
  const predMag = magnitudeConfig[sector.magnitude];
  const actualMag = sector.actualMagnitude
    ? magnitudeConfig[sector.actualMagnitude]
    : null;

  const PredIcon = predDir.icon;
  const ActualIcon = actualDir?.icon || Clock;

  return (
    <div className="rounded-lg border border-border/40 bg-card overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full p-4 text-left"
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-foreground">{sector.sector}</span>
            <span className="text-sm">{regionFlag[sector.region]}</span>
            <HitBadge hit={sectorHit} />
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

        {/* 예측 vs 실제 방향 비교 */}
        <div className="grid grid-cols-2 gap-3">
          <div className={`p-2.5 rounded-lg ${predDir.bg} border ${predDir.border}`}>
            <div className="text-[10px] text-muted mb-1">예측</div>
            <div className="flex items-center gap-1.5">
              <PredIcon className={`h-3.5 w-3.5 ${predDir.color}`} />
              <span className={`text-sm font-medium ${predDir.color}`}>
                {predDir.label}
              </span>
              <span className={`px-1 py-0.5 rounded text-[9px] ${predMag.bg} ${predMag.color}`}>
                {predMag.label}
              </span>
            </div>
          </div>
          <div
            className={`p-2.5 rounded-lg ${actualDir ? `${actualDir.bg} border ${actualDir.border}` : "bg-muted/5 border border-border/30"}`}
          >
            <div className="text-[10px] text-muted mb-1">실제</div>
            {actualDir ? (
              <div className="flex items-center gap-1.5">
                <ActualIcon className={`h-3.5 w-3.5 ${actualDir.color}`} />
                <span className={`text-sm font-medium ${actualDir.color}`}>
                  {actualDir.label}
                </span>
                {actualMag && (
                  <span className={`px-1 py-0.5 rounded text-[9px] ${actualMag.bg} ${actualMag.color}`}>
                    {actualMag.label}
                  </span>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 text-muted" />
                <span className="text-sm text-muted">대기 중</span>
              </div>
            )}
          </div>
        </div>
      </button>

      {expanded && sector.stocks.length > 0 && (
        <div className="px-4 pb-4">
          <div className="border-t border-border/50 pt-3 space-y-1.5">
            {sector.stocks.map((stock) => {
              const stockHit = judgeStock(stock);
              const hasActual = stock.actualChange !== undefined;
              const changeColor =
                hasActual && stock.actualChange! > 0
                  ? "text-success"
                  : hasActual && stock.actualChange! < 0
                    ? "text-destructive"
                    : "text-muted";

              return (
                <div
                  key={stock.ticker}
                  className="flex items-center justify-between p-2.5 rounded-lg bg-muted/5"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="text-sm font-medium text-foreground">
                      {stock.name}
                    </span>
                    <span className="text-[10px] text-muted font-mono">
                      {stock.ticker}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    {/* 예측 방향 */}
                    <span className={`text-xs ${directionConfig[stock.direction].color}`}>
                      {directionConfig[stock.direction].label}
                    </span>
                    <span className="text-xs text-muted">&rarr;</span>
                    {/* 실제 결과 */}
                    {hasActual ? (
                      <span className={`text-sm font-semibold ${changeColor}`}>
                        {stock.actualChange! > 0 ? "+" : ""}
                        {stock.actualChange}%
                      </span>
                    ) : (
                      <span className="text-xs text-muted">-</span>
                    )}
                    {stockHit !== "pending" && (
                      <HitBadge hit={stockHit} />
                    )}
                    {stockHit === "pending" && (
                      <HitBadge hit="pending" />
                    )}
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

// ---------------------------------------------------------------------------
// Accuracy Bar
// ---------------------------------------------------------------------------

function AccuracyBar({ accuracy }: { accuracy: number }) {
  const color =
    accuracy >= 80
      ? "bg-success"
      : accuracy >= 60
        ? "bg-amber-500"
        : "bg-destructive";

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm font-medium text-foreground">예측 적중률</span>
      <div className="flex-1 h-2.5 rounded-full bg-muted/20 overflow-hidden">
        <div
          className={`h-full rounded-full ${color} transition-all`}
          style={{ width: `${accuracy}%` }}
        />
      </div>
      <span className={`text-sm font-bold ${accuracy >= 80 ? "text-success" : accuracy >= 60 ? "text-amber-500" : "text-destructive"}`}>
        {accuracy}%
      </span>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Sectors list renderer (grouped by direction)
// ---------------------------------------------------------------------------

function SectorList({
  sectors,
  mode,
}: {
  sectors: SectorImpact[];
  mode: "prediction" | "actual" | "comparison";
}) {
  if (mode === "comparison") {
    return (
      <div className="space-y-3">
        {sectors.map((s, i) => (
          <ComparisonSectorCard key={`cmp-${i}`} sector={s} />
        ))}
      </div>
    );
  }

  const dirKey = mode === "actual" ? "actualDirection" : "direction";
  const getDir = (s: SectorImpact) =>
    mode === "actual" ? s.actualDirection || null : s.direction;

  const positive = sectors.filter((s) => getDir(s) === "positive");
  const negative = sectors.filter((s) => getDir(s) === "negative");
  const neutral = sectors.filter((s) => getDir(s) === "neutral");
  const pending =
    mode === "actual"
      ? sectors.filter((s) => !s.actualDirection)
      : [];

  const CardComponent = mode === "actual" ? ActualSectorCard : SectorCard;

  return (
    <div className="space-y-4">
      {positive.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="h-4 w-4 text-success" />
            <span className="text-sm font-medium text-success">긍정적 영향</span>
          </div>
          <div className="space-y-3">
            {positive.map((s, i) => (
              <CardComponent key={`pos-${i}`} sector={s} />
            ))}
          </div>
        </div>
      )}

      {negative.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-2">
            <TrendingDown className="h-4 w-4 text-destructive" />
            <span className="text-sm font-medium text-destructive">부정적 영향</span>
          </div>
          <div className="space-y-3">
            {negative.map((s, i) => (
              <CardComponent key={`neg-${i}`} sector={s} />
            ))}
          </div>
        </div>
      )}

      {neutral.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Minus className="h-4 w-4 text-muted" />
            <span className="text-sm font-medium text-muted">중립적 영향</span>
          </div>
          <div className="space-y-3">
            {neutral.map((s, i) => (
              <CardComponent key={`neu-${i}`} sector={s} />
            ))}
          </div>
        </div>
      )}

      {pending.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Clock className="h-4 w-4 text-muted" />
            <span className="text-sm font-medium text-muted">결과 대기 중</span>
          </div>
          <div className="space-y-3">
            {pending.map((s, i) => (
              <ActualSectorCard key={`pen-${i}`} sector={s} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------

export default function MarketImpactPanel({ marketImpacts }: MarketImpactPanelProps) {
  const hasActual = marketImpacts.some((mi) => mi.actualSummary);
  const [activeTab, setActiveTab] = useState<TabId>(
    hasActual ? "comparison" : "prediction"
  );

  if (marketImpacts.length === 0) {
    return (
      <div className="p-6 rounded-xl border border-border bg-card text-center">
        <p className="text-sm text-muted">
          이 이벤트에 대한 시장 영향 분석이 아직 없습니다.
        </p>
      </div>
    );
  }

  const impact = marketImpacts[0];

  const tabs: { id: TabId; label: string; icon: typeof BarChart3 }[] = [
    { id: "prediction", label: "예측 분석", icon: BarChart3 },
    { id: "actual", label: "실제 결과", icon: LineChart },
    { id: "comparison", label: "예측 vs 실제", icon: Scale },
  ];

  return (
    <div className="space-y-4">
      {/* Tab bar */}
      {hasActual && (
        <div className="flex gap-1 p-1 rounded-lg bg-muted/10 border border-border/30">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-md text-xs font-medium transition-colors ${
                  isActive
                    ? "bg-card text-foreground shadow-sm border border-border/50"
                    : "text-muted hover:text-foreground"
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                {tab.label}
              </button>
            );
          })}
        </div>
      )}

      {/* Summary */}
      <div className="p-4 rounded-lg border border-border bg-card">
        {activeTab === "comparison" && impact.predictionAccuracy !== undefined && (
          <div className="mb-3">
            <AccuracyBar accuracy={impact.predictionAccuracy} />
          </div>
        )}

        {activeTab === "actual" && impact.actualSummary ? (
          <>
            <p className="text-sm text-foreground leading-relaxed">
              {impact.actualSummary}
            </p>
            <p className="text-[10px] text-muted mt-2">
              결과 측정일: {impact.actualDate}
            </p>
          </>
        ) : activeTab === "comparison" ? (
          <div className="grid grid-cols-2 gap-3">
            <div>
              <div className="text-[10px] text-muted mb-1">예측</div>
              <p className="text-xs text-foreground leading-relaxed">
                {impact.summary}
              </p>
              <p className="text-[10px] text-muted mt-1">
                분석일: {impact.analysisDate}
              </p>
            </div>
            <div>
              <div className="text-[10px] text-muted mb-1">실제</div>
              {impact.actualSummary ? (
                <>
                  <p className="text-xs text-foreground leading-relaxed">
                    {impact.actualSummary}
                  </p>
                  <p className="text-[10px] text-muted mt-1">
                    결과일: {impact.actualDate}
                  </p>
                </>
              ) : (
                <p className="text-xs text-muted">결과 대기 중</p>
              )}
            </div>
          </div>
        ) : (
          <>
            <p className="text-sm text-foreground leading-relaxed">
              {impact.summary}
            </p>
            <p className="text-[10px] text-muted mt-2">
              분석일: {impact.analysisDate}
            </p>
          </>
        )}
      </div>

      {/* Sectors */}
      <SectorList sectors={impact.sectors} mode={activeTab} />
    </div>
  );
}
