import { Calendar } from "lucide-react";
import InteractiveTimeline from "@/components/timeline/InteractiveTimeline";
import ScenarioSelector from "@/components/shared/ScenarioSelector";
import {
  getEventsForScenario,
  getLinksForScenario,
  type ScenarioId,
  SCENARIOS,
} from "@/lib/data";

// Side assignment per scenario
const SIDE_CONFIG: Record<ScenarioId, {
  topIds: string[];
  centerIds: string[];
  topLabel: string;
  bottomLabel: string;
}> = {
  tariff: {
    topIds: ["evt-002", "evt-003"],
    centerIds: ["evt-001"],
    topLabel: "한국측 행동",
    bottomLabel: "미국측 행동",
  },
  iran: {
    topIds: ["ievt-001", "ievt-004", "ievt-007", "ievt-010", "ievt-013"],
    centerIds: [],
    topLabel: "이란/프록시 행동",
    bottomLabel: "이스라엘/미국 행동",
  },
};

export default async function TimelinePage({
  searchParams,
}: {
  searchParams: Promise<{ scenario?: string }>;
}) {
  const { scenario: scenarioParam } = await searchParams;
  const scenarioId: ScenarioId =
    scenarioParam === "iran" ? "iran" : "tariff";

  const [events, links] = await Promise.all([
    getEventsForScenario(scenarioId),
    getLinksForScenario(scenarioId),
  ]);

  const config = SIDE_CONFIG[scenarioId];
  const currentScenario = SCENARIOS.find((s) => s.id === scenarioId)!;

  const eventsWithSides = events.map((e) => ({
    ...e,
    status: e.status as "verified" | "disputed" | "unverified" | "false",
    side: (config.centerIds.includes(e.id)
      ? undefined
      : config.topIds.includes(e.id)
        ? "top"
        : "bottom") as "top" | "bottom" | undefined,
  }));

  // Category colors per scenario
  const categoryLegend = scenarioId === "iran"
    ? [
        { color: "bg-red-500", label: "군사" },
        { color: "bg-blue-500", label: "외교" },
      ]
    : [
        { color: "bg-blue-500", label: "외교" },
        { color: "bg-green-500", label: "경제" },
      ];

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">타임라인</h1>
        <p className="mt-2 text-muted">
          시간순으로 사건의 흐름을 확인하고, 인과관계를 추적합니다.
        </p>
      </div>

      {/* Scenario Selector */}
      <ScenarioSelector current={scenarioId} />

      {/* Timeline Visualization */}
      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <div className="px-6 py-3 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-accent" />
            <span className="text-sm font-medium text-foreground">
              {currentScenario.flag} {currentScenario.title} 타임라인
            </span>
          </div>
          <span className="text-xs text-muted">
            {currentScenario.dateRange} · {events.length}개 이벤트
          </span>
        </div>
        <div className="p-4">
          <InteractiveTimeline
            events={eventsWithSides}
            links={links}
            className="h-[400px]"
          />
        </div>
      </div>

      {/* Legend */}
      <div className="mt-6 flex flex-wrap gap-6">
        <div className="flex flex-wrap gap-4 text-xs text-muted">
          <span className="font-medium text-foreground">검증 상태:</span>
          {[
            { color: "bg-success", label: "검증됨" },
            { color: "bg-warning", label: "논쟁중" },
            { color: "bg-destructive", label: "거짓" },
            { color: "bg-[#71717a]", label: "미검증" },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-1.5">
              <div className={`h-2.5 w-2.5 rounded-full ${item.color}`} />
              <span>{item.label}</span>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-4 text-xs text-muted">
          <span className="font-medium text-foreground">카테고리:</span>
          {categoryLegend.map((item) => (
            <div key={item.label} className="flex items-center gap-1.5">
              <div className={`h-2.5 w-2.5 rounded-full ${item.color}`} />
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Event List */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold text-foreground mb-4">이벤트 상세</h2>
        <div className="space-y-3">
          {events.map((event, i) => (
            <a
              key={event.id}
              href={`/events/${event.id}`}
              className="flex items-center gap-4 p-4 rounded-lg border border-border bg-card hover:border-accent/30 transition-colors"
            >
              <div className="flex items-center justify-center h-8 w-8 rounded-full bg-accent/10 text-accent text-sm font-bold shrink-0">
                {i + 1}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-foreground">{event.title}</div>
                <div className="text-xs text-muted mt-0.5">{event.date} · {event.category}</div>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <div className="w-8 h-1.5 rounded-full bg-border/50 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      event.confidence >= 80 ? "bg-success" : event.confidence >= 50 ? "bg-warning" : "bg-destructive"
                    }`}
                    style={{ width: `${event.confidence}%` }}
                  />
                </div>
                <span className="text-[10px] text-muted">{event.confidence}%</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
