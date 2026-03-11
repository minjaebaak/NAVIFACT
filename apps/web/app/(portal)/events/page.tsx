import { Search, Filter, SlidersHorizontal } from "lucide-react";
import EventCard from "@/components/shared/EventCard";
import ScenarioSelector from "@/components/shared/ScenarioSelector";
import {
  getEventsForScenario,
  getLinksForScenario,
  type ScenarioId,
  SCENARIOS,
} from "@/lib/data";

export default async function EventsPage({
  searchParams,
}: {
  searchParams: Promise<{ scenario?: string }>;
}) {
  const { scenario: scenarioParam } = await searchParams;
  const scenarioId: ScenarioId =
    scenarioParam === "iran" ? "iran" : scenarioParam === "ukraine" ? "ukraine" : scenarioParam === "techwar" ? "techwar" : scenarioParam === "nkorea" ? "nkorea" : scenarioParam === "taiwan" ? "taiwan" : scenarioParam === "syria" ? "syria" : scenarioParam === "brexit" ? "brexit" : scenarioParam === "afghan" ? "afghan" : scenarioParam === "iraq" ? "iraq" : scenarioParam === "arabspring" ? "arabspring" : "tariff";

  const [events, links] = await Promise.all([
    getEventsForScenario(scenarioId),
    getLinksForScenario(scenarioId),
  ]);

  function getLinkCount(eventId: string): number {
    return links.filter(
      (l) => l.source === eventId || l.target === eventId
    ).length;
  }

  const categories = ["전체", ...new Set(events.map((e) => e.category))];
  const currentScenario = SCENARIOS.find((s) => s.id === scenarioId)!;

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">이벤트 탐색</h1>
        <p className="mt-2 text-muted">
          역사적 사건을 검색하고, 인과관계를 탐색합니다.
        </p>
      </div>

      {/* Scenario Selector */}
      <ScenarioSelector current={scenarioId} />

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
          <input
            type="text"
            placeholder="이벤트 검색..."
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border bg-card text-foreground placeholder:text-muted text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-colors"
          />
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-border bg-card text-sm text-muted hover:text-foreground hover:bg-white/5 transition-colors">
          <Filter className="h-4 w-4" />
          필터
        </button>
        <button className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-border bg-card text-sm text-muted hover:text-foreground hover:bg-white/5 transition-colors">
          <SlidersHorizontal className="h-4 w-4" />
          정렬
        </button>
      </div>

      {/* Category Tabs */}
      <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
        {categories.map((category, i) => (
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
        ))}
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {events.map((event) => (
          <EventCard
            key={event.id}
            id={event.id}
            title={event.title}
            description={event.description}
            date={event.date}
            category={event.category}
            confidence={event.confidence}
            status={event.status as "verified" | "disputed" | "unverified" | "false"}
            linkCount={getLinkCount(event.id)}
          />
        ))}
      </div>

      {/* Summary */}
      <div className="mt-8 text-center">
        <p className="text-muted text-sm">
          {currentScenario.flag} {currentScenario.title} · {events.length}개 이벤트 · {links.length}개 인과관계 링크
        </p>
      </div>
    </div>
  );
}
