import {
  BarChart3,
  TrendingUp,
  CheckCircle2,
  Clock,
  PlusCircle,
} from "lucide-react";

export default function ContributePage() {
  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">기여자 대시보드</h1>
        <p className="mt-1 text-muted">
          이벤트를 추가하고, 주장을 검증하며 NAVIFACT에 기여합니다.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          {
            icon: BarChart3,
            label: "총 기여",
            value: "--",
            change: "+-- 이번 주",
          },
          {
            icon: CheckCircle2,
            label: "승인됨",
            value: "--",
            change: "--% 승인율",
          },
          {
            icon: Clock,
            label: "검토 대기",
            value: "--",
            change: "평균 -- 시간",
          },
          {
            icon: TrendingUp,
            label: "신뢰도 점수",
            value: "--",
            change: "+-- 이번 달",
          },
        ].map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="p-5 rounded-xl border border-border bg-card"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-muted">{stat.label}</span>
                <Icon className="h-4 w-4 text-muted" />
              </div>
              <div className="text-2xl font-bold text-foreground">
                {stat.value}
              </div>
              <div className="text-xs text-muted mt-1">{stat.change}</div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-foreground mb-4">
          빠른 작업
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            {
              icon: PlusCircle,
              title: "새 이벤트 추가",
              description: "새로운 역사적 사건을 등록합니다",
            },
            {
              icon: CheckCircle2,
              title: "주장 검증",
              description: "미검증 주장에 대한 팩트체크를 수행합니다",
            },
            {
              icon: TrendingUp,
              title: "인과관계 추가",
              description: "사건 간 인과관계를 제안합니다",
            },
          ].map((action) => {
            const Icon = action.icon;
            return (
              <button
                key={action.title}
                className="p-5 rounded-xl border border-dashed border-border bg-card text-left hover:border-accent/30 hover:bg-card/80 transition-all group"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent mb-3 group-hover:bg-accent/20 transition-colors">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="font-medium text-foreground">{action.title}</h3>
                <p className="text-sm text-muted mt-1">{action.description}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Recent Contributions Placeholder */}
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-4">
          최근 기여
        </h2>
        <div className="rounded-xl border border-border bg-card overflow-hidden">
          <div className="px-5 py-3 border-b border-border bg-background/50">
            <div className="grid grid-cols-4 text-xs font-medium text-muted">
              <span>유형</span>
              <span>제목</span>
              <span>상태</span>
              <span>날짜</span>
            </div>
          </div>
          <div className="divide-y divide-border">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="px-5 py-3">
                <div className="grid grid-cols-4 items-center">
                  <div className="h-3 w-12 rounded bg-border/30" />
                  <div className="h-3 w-24 rounded bg-border/30" />
                  <div className="h-3 w-16 rounded bg-border/30" />
                  <div className="h-3 w-20 rounded bg-border/30" />
                </div>
              </div>
            ))}
          </div>
        </div>
        <p className="text-xs text-muted mt-3 text-center">
          API 서버 연결 후 기여 기록이 표시됩니다.
        </p>
      </div>
    </div>
  );
}
