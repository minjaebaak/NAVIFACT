import { TrendingUp, Clock, Users, BarChart3 } from "lucide-react";
import PredictClient from "./PredictClient";
import ScenarioSelector from "@/components/shared/ScenarioSelector";
import {
  getPredictionsForScenario,
  type ScenarioId,
  SCENARIOS,
} from "@/lib/data";

export default async function PredictPage({
  searchParams,
}: {
  searchParams: Promise<{ scenario?: string }>;
}) {
  const { scenario: scenarioParam } = await searchParams;
  const scenarioId: ScenarioId =
    scenarioParam === "iran" ? "iran" : scenarioParam === "ukraine" ? "ukraine" : scenarioParam === "techwar" ? "techwar" : scenarioParam === "nkorea" ? "nkorea" : scenarioParam === "taiwan" ? "taiwan" : scenarioParam === "syria" ? "syria" : scenarioParam === "brexit" ? "brexit" : scenarioParam === "afghan" ? "afghan" : scenarioParam === "iraq" ? "iraq" : scenarioParam === "arabspring" ? "arabspring" : scenarioParam === "yugo" ? "yugo" : scenarioParam === "rwanda" ? "rwanda" : scenarioParam === "cuba" ? "cuba" : scenarioParam === "soviet" ? "soviet" : scenarioParam === "vietnam" ? "vietnam" : "tariff";

  const predictions = await getPredictionsForScenario(scenarioId);
  const currentScenario = SCENARIOS.find((s) => s.id === scenarioId)!;

  const activePredictions = predictions.filter((p) => p.status === "active");
  const totalPool = predictions.reduce(
    (sum, p) => sum + p.yesPool + p.noPool,
    0
  );

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">예측 시장</h1>
        <p className="mt-1 text-xl text-muted">과연 할까?</p>
        <p className="mt-2 text-sm text-muted">
          커뮤니티의 집단 지성으로 미래 사건의 가능성을 예측합니다.
        </p>
      </div>

      {/* Scenario Selector */}
      <ScenarioSelector current={scenarioId} />

      {/* Stats Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          {
            icon: BarChart3,
            label: "활성 예측",
            value: activePredictions.length.toString(),
          },
          {
            icon: Users,
            label: "총 풀",
            value: `${(totalPool / 10000).toFixed(1)}만 P`,
          },
          { icon: TrendingUp, label: "정확도", value: "-- %" },
          {
            icon: Clock,
            label: "마감 임박",
            value: activePredictions.length.toString(),
          },
        ].map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="p-4 rounded-xl border border-border bg-card"
            >
              <div className="flex items-center gap-2 mb-2">
                <Icon className="h-4 w-4 text-accent" />
                <span className="text-xs text-muted">{stat.label}</span>
              </div>
              <span className="text-2xl font-bold text-foreground">
                {stat.value}
              </span>
            </div>
          );
        })}
      </div>

      {/* Scenario Info */}
      <div className="mb-6 p-3 rounded-lg bg-accent/5 border border-accent/10">
        <span className="text-sm text-muted">
          {currentScenario.flag} <span className="font-medium text-foreground">{currentScenario.title}</span> · {currentScenario.dateRange}
        </span>
      </div>

      {/* Prediction Cards */}
      <PredictClient predictions={predictions as any} />
    </div>
  );
}
