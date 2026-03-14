import ScenarioSelector from "@/components/shared/ScenarioSelector";
import FlagDisplay from "@/components/shared/FlagDisplay";
import EventsClient from "./EventsClient";
import {
  getEventsForScenario,
  getLinksForScenario,
  parseScenarioParam,
  SCENARIOS,
} from "@/lib/data";

export default async function EventsPage({
  searchParams,
}: {
  searchParams: Promise<{ scenario?: string }>;
}) {
  const { scenario: scenarioParam } = await searchParams;
  const scenarioId = parseScenarioParam(scenarioParam);

  const [events, links] = await Promise.all([
    getEventsForScenario(scenarioId),
    getLinksForScenario(scenarioId),
  ]);

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

      {/* Interactive Search/Filter/Sort/Grid */}
      <EventsClient
        events={events}
        links={links}
        categories={categories}
      />

      {/* Summary */}
      <div className="mt-8 text-center">
        <p className="text-muted text-sm">
          <FlagDisplay flag={currentScenario.flag} size="sm" /> {currentScenario.title} · {events.length}개 이벤트 · {links.length}개 인과관계 링크
        </p>
      </div>
    </div>
  );
}
