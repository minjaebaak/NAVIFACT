import Link from "next/link";
import {
  ArrowLeft,
  ExternalLink,
  GitBranch,
  Clock,
  Shield,
  Users,
  FileCheck,
  Target,
  Newspaper,
  BarChart3,
  LineChart,
} from "lucide-react";
import EventDetailClient from "./EventDetailClient";
import DiscussionThread from "@/components/discussion/DiscussionThread";
import FlagDisplay from "@/components/shared/FlagDisplay";

import {
  getEventsForScenario,
  getLinksForScenario,
  getAgreementForScenario,
  getPredictionsForScenario,
  getNarrativesForScenario,
  getClaimsForScenario,
  getMarketImpactsForEvent,
  detectScenario,
  SCENARIOS,
  type ScenarioId,
} from "@/lib/data";

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  let scenarioId = detectScenario(id);

  // If id looks like a UUID (not a short ID), try resolving via API
  const isUuid = id.length > 20 && id.includes("-");
  let resolvedShortId: string | null = null;

  if (isUuid) {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";
      const res = await fetch(`${apiUrl}/events/${id}`, {
        next: { revalidate: 60 },
        signal: AbortSignal.timeout(3_000),
      });
      if (res.ok) {
        const apiEvt = await res.json();
        resolvedShortId = apiEvt.short_id || null;
        if (resolvedShortId) {
          scenarioId = detectScenario(resolvedShortId);
        }
      }
    } catch {
      // API unavailable — will try matching by UUID against loaded data
    }
  }

  const currentScenario = SCENARIOS.find((s) => s.id === scenarioId)!;

  const [allEvents, allLinks, agreement, predictions, narratives, claims] =
    await Promise.all([
      getEventsForScenario(scenarioId),
      getLinksForScenario(scenarioId),
      getAgreementForScenario(scenarioId),
      getPredictionsForScenario(scenarioId),
      getNarrativesForScenario(scenarioId),
      getClaimsForScenario(scenarioId),
    ]);

  // Find event — try direct match, then resolved short ID
  const effectiveId = resolvedShortId || id;
  let event = allEvents.find((e) => e.id === effectiveId);
  if (!event) {
    // Fallback: try the original id (covers UUID-in-data case)
    event = allEvents.find((e) => e.id === id);
  }

  const matchId = event?.id ?? effectiveId;
  const marketImpacts = await getMarketImpactsForEvent(matchId);
  const relatedLinks = allLinks.filter(
    (l) => l.source === matchId || l.target === matchId
  );

  // Gather all event IDs connected to this event
  const connectedIds = new Set<string>();
  connectedIds.add(matchId);
  for (const link of relatedLinks) {
    connectedIds.add(link.source);
    connectedIds.add(link.target);
  }
  const connectedEvents = allEvents.filter((e) => connectedIds.has(e.id));

  const statusColor: Record<string, { bg: string; text: string; border: string; label: string }> = {
    verified: { bg: "bg-success/10", text: "text-success", border: "border-success/20", label: "검증됨" },
    disputed: { bg: "bg-warning/10", text: "text-warning", border: "border-warning/20", label: "논쟁중" },
    unverified: { bg: "bg-muted/10", text: "text-muted", border: "border-muted/20", label: "미검증" },
    false: { bg: "bg-destructive/10", text: "text-destructive", border: "border-destructive/20", label: "거짓" },
  };

  const sc = event ? statusColor[event.status] ?? statusColor.unverified : statusColor.unverified;

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Link */}
      <Link
        href={`/events?scenario=${scenarioId}`}
        className="inline-flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        <FlagDisplay flag={currentScenario.flag} size="sm" /> {currentScenario.title} 이벤트 목록으로
      </Link>

      {/* Event Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-accent/10 text-accent border border-accent/20">
            {event?.category ?? "카테고리"}
          </span>
          <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${sc.bg} ${sc.text} border ${sc.border}`}>
            {sc.label}
          </span>
        </div>
        <h1 className="text-3xl font-bold text-foreground mb-2">
          {event?.title ?? `이벤트 상세 (ID: ${id})`}
        </h1>
        <p className="text-muted">
          {event?.description ?? "API 서버 연결 후 이벤트 상세 정보가 표시됩니다."}
        </p>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Causal Graph */}
          <section className="p-6 rounded-xl border border-border bg-card">
            <div className="flex items-center gap-2 mb-4">
              <GitBranch className="h-5 w-5 text-accent" />
              <h2 className="text-lg font-semibold text-foreground">
                인과관계 그래프
              </h2>
            </div>
            <div className="h-[420px] rounded-lg border border-border overflow-hidden">
              <EventDetailClient
                events={connectedEvents as any}
                links={relatedLinks as any}
                agreement={agreement as any}
                predictions={predictions as any}
                currentEventId={matchId}
              />
            </div>
          </section>

          {/* Agreement Obligations */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <FileCheck className="h-5 w-5 text-accent" />
              <h2 className="text-lg font-semibold text-foreground">
                관련 협정 의무 이행 현황
              </h2>
            </div>
            <EventDetailClient
              events={connectedEvents as any}
              links={relatedLinks as any}
              agreement={agreement as any}
              predictions={predictions as any}
              currentEventId={matchId}
              section="agreement"
            />
          </section>

          {/* Predictions */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Target className="h-5 w-5 text-accent" />
              <h2 className="text-lg font-semibold text-foreground">
                예측 시장
              </h2>
            </div>
            <EventDetailClient
              events={connectedEvents as any}
              links={relatedLinks as any}
              agreement={agreement as any}
              predictions={predictions as any}
              currentEventId={matchId}
              section="predictions"
            />
          </section>

          {/* Market Impact */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <LineChart className="h-5 w-5 text-accent" />
              <h2 className="text-lg font-semibold text-foreground">
                시장 영향 분석
              </h2>
            </div>
            <EventDetailClient
              events={connectedEvents as any}
              links={relatedLinks as any}
              agreement={agreement as any}
              predictions={predictions as any}
              marketImpacts={marketImpacts as any}
              currentEventId={matchId}
              section="market-impact"
            />
          </section>

          {/* Narrative Comparison */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Newspaper className="h-5 w-5 text-accent" />
              <h2 className="text-lg font-semibold text-foreground">
                서사 비교: 미디어 vs 사실
              </h2>
            </div>
            <EventDetailClient
              events={connectedEvents as any}
              links={relatedLinks as any}
              agreement={agreement as any}
              predictions={predictions as any}
              narratives={narratives as any}
              claims={claims as any}
              currentEventId={matchId}
              section="narratives"
            />
          </section>

          {/* Truth Scorecard */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <BarChart3 className="h-5 w-5 text-accent" />
              <h2 className="text-lg font-semibold text-foreground">
                주장별 신뢰도 스코어카드
              </h2>
            </div>
            <EventDetailClient
              events={connectedEvents as any}
              links={relatedLinks as any}
              agreement={agreement as any}
              predictions={predictions as any}
              narratives={narratives as any}
              claims={claims as any}
              currentEventId={matchId}
              section="scorecard"
            />
          </section>

          {/* Discussion */}
          <section className="p-6 rounded-xl border border-border bg-card">
            <DiscussionThread targetType="event" targetId={id} />
          </section>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Metadata */}
          <section className="p-6 rounded-xl border border-border bg-card">
            <h3 className="text-sm font-semibold text-foreground mb-4">
              메타데이터
            </h3>
            <dl className="space-y-3">
              {[
                { icon: Clock, label: "날짜", value: event?.date ?? "--" },
                { icon: Shield, label: "신뢰도", value: event ? `${event.confidence}%` : "--%" },
                { icon: Users, label: "관련 이벤트", value: `${connectedEvents.length}개` },
                { icon: ExternalLink, label: "인과 링크", value: `${relatedLinks.length}개` },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="flex items-center gap-3">
                    <Icon className="h-4 w-4 text-muted" />
                    <dt className="text-sm text-muted">{item.label}</dt>
                    <dd className="ml-auto text-sm font-medium text-foreground">
                      {item.value}
                    </dd>
                  </div>
                );
              })}
            </dl>
          </section>

          {/* Related Events */}
          <section className="p-6 rounded-xl border border-border bg-card">
            <h3 className="text-sm font-semibold text-foreground mb-4">
              연결된 이벤트
            </h3>
            <div className="space-y-2">
              {connectedEvents
                .filter((e) => e.id !== matchId)
                .map((e) => {
                  const esc = statusColor[e.status] ?? statusColor.unverified;
                  return (
                    <Link
                      key={e.id}
                      href={`/events/${e.id}`}
                      className="block p-3 rounded-lg border border-border bg-background/50 hover:border-accent/30 hover:bg-accent/5 transition-colors"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`w-1.5 h-1.5 rounded-full ${esc.bg.replace("/10", "")}`} />
                        <span className="text-[10px] text-muted">{e.date}</span>
                      </div>
                      <p className="text-sm text-foreground leading-tight">{e.title}</p>
                    </Link>
                  );
                })}
            </div>
          </section>

          {/* Quick Stats */}
          <section className="p-6 rounded-xl border border-border bg-card">
            <h3 className="text-sm font-semibold text-foreground mb-4">
              <FlagDisplay flag={currentScenario.flag} size="sm" /> {currentScenario.title}
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "이벤트", value: allEvents.length },
                { label: "인과 링크", value: allLinks.length },
                { label: "의무 조항", value: agreement.obligations.length },
                { label: "예측 시장", value: predictions.length },
              ].map((stat) => (
                <div key={stat.label} className="p-3 rounded-lg bg-background/50 border border-border/50 text-center">
                  <div className="text-lg font-bold text-accent">{stat.value}</div>
                  <div className="text-[10px] text-muted">{stat.label}</div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
