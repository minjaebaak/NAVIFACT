import { TrendingUp, Clock, Users, BarChart3 } from "lucide-react";
import PredictClient from "./PredictClient";
import { getPredictions } from "@/lib/data";

export default async function PredictPage() {
  const predictions = await getPredictions();

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

      {/* Category Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {["전체", "정치", "경제", "국제", "기술", "사회"].map(
          (category, i) => (
            <button
              key={category}
              className={`whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                i === 0
                  ? "bg-accent text-accent-foreground"
                  : "bg-card border border-border text-muted hover:text-foreground hover:bg-white/5"
              }`}
            >
              {category}
            </button>
          )
        )}
      </div>

      {/* Prediction Cards */}
      <PredictClient predictions={predictions as any} />
    </div>
  );
}
