import { Calendar } from "lucide-react";
import InteractiveTimeline from "@/components/timeline/InteractiveTimeline";
import ScenarioSelector from "@/components/shared/ScenarioSelector";
import FlagDisplay from "@/components/shared/FlagDisplay";
import {
  getEventsForScenario,
  getLinksForScenario,
  parseScenarioParam,
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
  ukraine: {
    topIds: ["uevt-002", "uevt-004", "uevt-005", "uevt-008", "uevt-012"],
    centerIds: ["uevt-001", "uevt-003"],
    topLabel: "우크라이나/서방 행동",
    bottomLabel: "러시아 행동",
  },
  techwar: {
    topIds: ["twevt-001", "twevt-003", "twevt-002", "twevt-011", "twevt-012"],
    centerIds: ["twevt-007"],
    topLabel: "중국측 행동",
    bottomLabel: "미국측 행동",
  },
  nkorea: {
    topIds: ["nkevt-001", "nkevt-006", "nkevt-007", "nkevt-008", "nkevt-011"],
    centerIds: ["nkevt-005"],
    topLabel: "북한 행동",
    bottomLabel: "국제사회/미국 행동",
  },
  taiwan: {
    topIds: ["taievt-001", "taievt-002", "taievt-005", "taievt-009", "taievt-012"],
    centerIds: ["taievt-004"],
    topLabel: "중국측 행동",
    bottomLabel: "대만/미국측 행동",
  },
  syria: {
    topIds: ["syevt-001", "syevt-002", "syevt-006", "syevt-008", "syevt-009"],
    centerIds: ["syevt-004"],
    topLabel: "아사드 정권/러시아",
    bottomLabel: "반군/국제사회",
  },
  brexit: {
    topIds: ["bxevt-001", "bxevt-002", "bxevt-003", "bxevt-007", "bxevt-010"],
    centerIds: ["bxevt-005"],
    topLabel: "EU/잔류파",
    bottomLabel: "영국/탈퇴파",
  },
  afghan: {
    topIds: ["afevt-001", "afevt-003", "afevt-004", "afevt-011", "afevt-012"],
    centerIds: ["afevt-006"],
    topLabel: "탈레반/테러조직",
    bottomLabel: "미국/연합군",
  },
  iraq: {
    topIds: ["iqevt-001", "iqevt-004", "iqevt-010", "iqevt-008", "iqevt-011"],
    centerIds: ["iqevt-003"],
    topLabel: "이라크/테러조직",
    bottomLabel: "미국/연합군",
  },
  arabspring: {
    topIds: ["asevt-001", "asevt-002", "asevt-003", "asevt-009", "asevt-012"],
    centerIds: ["asevt-006"],
    topLabel: "시민/반정부",
    bottomLabel: "정부/군부",
  },
  yugo: {
    topIds: ["ygevt-001", "ygevt-003", "ygevt-009", "ygevt-006", "ygevt-012"],
    centerIds: ["ygevt-005"],
    topLabel: "독립세력/NATO",
    bottomLabel: "세르비아/유고연방",
  },
  rwanda: {
    topIds: ["rwevt-001", "rwevt-003", "rwevt-006", "rwevt-009", "rwevt-011"],
    centerIds: ["rwevt-004"],
    topLabel: "RPF/투치족",
    bottomLabel: "후투 정권/인테라함웨",
  },
  cuba: {
    topIds: ["cbevt-001", "cbevt-004", "cbevt-005", "cbevt-008", "cbevt-011"],
    centerIds: ["cbevt-010"],
    topLabel: "미국",
    bottomLabel: "소련/쿠바",
  },
  soviet: {
    topIds: ["svevt-001", "svevt-004", "svevt-005", "svevt-009", "svevt-012"],
    centerIds: ["svevt-003"],
    topLabel: "개혁/민주화",
    bottomLabel: "보수/체제유지",
  },
  vietnam: {
    topIds: ["vnevt-001", "vnevt-003", "vnevt-005", "vnevt-008", "vnevt-011"],
    centerIds: ["vnevt-007"],
    topLabel: "미국/남베트남",
    bottomLabel: "북베트남/베트콩",
  },
  korea: {
    topIds: ["krevt-003", "krevt-005", "krevt-007", "krevt-008", "krevt-009"],
    centerIds: ["krevt-004"],
    topLabel: "북한/중국",
    bottomLabel: "유엔군/한국",
  },
  iranrev: {
    topIds: ["irvevt-001", "irvevt-002", "irvevt-004", "irvevt-009", "irvevt-012"],
    centerIds: ["irvevt-007"],
    topLabel: "팔레비/미국",
    bottomLabel: "혁명세력/호메이니",
  },
  palest: {
    topIds: ["plevt-001", "plevt-003", "plevt-005", "plevt-006", "plevt-012"],
    centerIds: ["plevt-009"],
    topLabel: "이스라엘/서방",
    bottomLabel: "팔레스타인/아랍",
  },
  tiananmen: {
    topIds: ["tnevt-003", "tnevt-004", "tnevt-006", "tnevt-007", "tnevt-011"],
    centerIds: ["tnevt-009"],
    topLabel: "민주화/개혁",
    bottomLabel: "당 보수파/군부",
  },
  indpak: {
    topIds: ["ipevt-001", "ipevt-004", "ipevt-006", "ipevt-007", "ipevt-012"],
    centerIds: ["ipevt-005"],
    topLabel: "인도",
    bottomLabel: "파키스탄",
  },
  falklands: {
    topIds: ["fkevt-001", "fkevt-007", "fkevt-008", "fkevt-010", "fkevt-012"],
    centerIds: ["fkevt-002"],
    topLabel: "영국",
    bottomLabel: "아르헨티나",
  },
  safrica: {
    topIds: ["saevt-001", "saevt-003", "saevt-005", "saevt-006", "saevt-010"],
    centerIds: ["saevt-008"],
    topLabel: "아파르트헤이트 체제",
    bottomLabel: "저항·해방 운동",
  },
  mexico: {
    topIds: ["mxevt-001", "mxevt-004", "mxevt-005", "mxevt-008", "mxevt-009"],
    centerIds: ["mxevt-006"],
    topLabel: "정부·제도",
    bottomLabel: "카르텔·마약 전쟁",
  },
};

export default async function TimelinePage({
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
    : scenarioId === "ukraine"
    ? [
        { color: "bg-red-500", label: "군사" },
        { color: "bg-blue-500", label: "외교" },
        { color: "bg-purple-500", label: "사회" },
      ]
    : scenarioId === "techwar"
    ? [
        { color: "bg-cyan-500", label: "기술" },
        { color: "bg-green-500", label: "경제" },
        { color: "bg-blue-500", label: "외교" },
      ]
    : scenarioId === "nkorea"
    ? [
        { color: "bg-red-500", label: "군사" },
        { color: "bg-blue-500", label: "외교" },
      ]
    : scenarioId === "taiwan"
    ? [
        { color: "bg-red-500", label: "군사" },
        { color: "bg-blue-500", label: "외교" },
      ]
    : scenarioId === "syria"
    ? [
        { color: "bg-red-500", label: "군사" },
        { color: "bg-purple-500", label: "사회" },
      ]
    : scenarioId === "brexit"
    ? [
        { color: "bg-blue-500", label: "외교" },
        { color: "bg-green-500", label: "경제" },
        { color: "bg-purple-500", label: "사회" },
      ]
    : scenarioId === "afghan"
    ? [
        { color: "bg-red-500", label: "군사" },
        { color: "bg-blue-500", label: "외교" },
        { color: "bg-purple-500", label: "사회" },
      ]
    : scenarioId === "iraq"
    ? [
        { color: "bg-red-500", label: "군사" },
        { color: "bg-blue-500", label: "외교" },
        { color: "bg-purple-500", label: "사회" },
      ]
    : scenarioId === "arabspring"
    ? [
        { color: "bg-red-500", label: "군사" },
        { color: "bg-blue-500", label: "외교" },
        { color: "bg-purple-500", label: "사회" },
      ]
    : scenarioId === "yugo"
    ? [
        { color: "bg-red-500", label: "군사" },
        { color: "bg-blue-500", label: "외교" },
        { color: "bg-purple-500", label: "사회" },
      ]
    : scenarioId === "rwanda"
    ? [
        { color: "bg-red-500", label: "군사" },
        { color: "bg-blue-500", label: "외교" },
        { color: "bg-purple-500", label: "사회" },
      ]
    : scenarioId === "cuba"
    ? [
        { color: "bg-red-500", label: "군사" },
        { color: "bg-blue-500", label: "외교" },
        { color: "bg-purple-500", label: "사회" },
      ]
    : scenarioId === "soviet"
    ? [
        { color: "bg-red-500", label: "군사" },
        { color: "bg-blue-500", label: "외교" },
        { color: "bg-purple-500", label: "사회" },
      ]
    : scenarioId === "vietnam"
    ? [
        { color: "bg-red-500", label: "군사" },
        { color: "bg-blue-500", label: "외교" },
        { color: "bg-purple-500", label: "사회" },
      ]
    : scenarioId === "korea"
    ? [
        { color: "bg-red-500", label: "군사" },
        { color: "bg-blue-500", label: "외교" },
        { color: "bg-purple-500", label: "사회" },
      ]
    : scenarioId === "iranrev"
    ? [
        { color: "bg-red-500", label: "군사" },
        { color: "bg-blue-500", label: "외교" },
        { color: "bg-purple-500", label: "사회" },
      ]
    : scenarioId === "palest"
    ? [
        { color: "bg-red-500", label: "군사" },
        { color: "bg-blue-500", label: "외교" },
        { color: "bg-purple-500", label: "사회" },
      ]
    : scenarioId === "tiananmen"
    ? [
        { color: "bg-red-500", label: "군사" },
        { color: "bg-blue-500", label: "외교" },
        { color: "bg-purple-500", label: "사회" },
      ]
    : scenarioId === "indpak"
    ? [
        { color: "bg-red-500", label: "군사" },
        { color: "bg-blue-500", label: "외교" },
      ]
    : scenarioId === "falklands"
    ? [
        { color: "bg-red-500", label: "군사" },
        { color: "bg-blue-500", label: "외교" },
        { color: "bg-green-500", label: "경제" },
      ]
    : scenarioId === "safrica"
    ? [
        { color: "bg-red-500", label: "군사" },
        { color: "bg-blue-500", label: "외교" },
        { color: "bg-purple-500", label: "사회" },
      ]
    : scenarioId === "mexico"
    ? [
        { color: "bg-red-500", label: "군사" },
        { color: "bg-green-500", label: "경제" },
        { color: "bg-purple-500", label: "사회" },
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
              <FlagDisplay flag={currentScenario.flag} size="sm" /> {currentScenario.title} 타임라인
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
