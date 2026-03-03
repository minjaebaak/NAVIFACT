"use client";

import CausalGraph from "@/components/graph/CausalGraph";
import ObligationChecklist from "@/components/agreement/ObligationChecklist";
import PredictionCard from "@/components/prediction/PredictionCard";
import NarrativeComparison from "@/components/narrative/NarrativeComparison";
import TruthScorecard from "@/components/scorecard/TruthScorecard";
import MarketImpactPanel from "@/components/market-impact/MarketImpactPanel";

interface EventDetailClientProps {
  events: Array<{
    id: string;
    title: string;
    date: string;
    category: string;
    confidence: number;
    status: "verified" | "disputed" | "unverified" | "false";
    description?: string;
  }>;
  links: Array<{
    id: string;
    source: string;
    target: string;
    confidence: number;
    mechanism: string;
    causalType: "direct" | "indirect" | "contributing" | "enabling";
  }>;
  agreement: {
    title: string;
    date: string;
    parties: Array<{ id: string; name: string; flag?: string }>;
    obligations: Array<{
      id: string;
      description: string;
      deadline: string;
      status: "fulfilled" | "violated" | "pending" | "partial";
      assignedTo: { id: string; name: string; flag?: string };
      consequenceEventId?: string;
    }>;
  };
  predictions: Array<{
    id: string;
    question: string;
    yesPool: number;
    noPool: number;
    deadline: string;
    status: "active" | "settled" | "expired";
    settlementCriteria?: string;
  }>;
  narratives?: Array<{
    id: string;
    title: string;
    source: string;
    sourceType: "media" | "verified";
    framing: string;
    claims: Array<{
      text: string;
      status: "verified" | "false" | "misleading" | "unverified" | "partly_true";
      confidence: number;
    }>;
    missingContext?: string[];
    sources?: string[];
  }>;
  claims?: Array<{
    id: string;
    text: string;
    status: "verified" | "false" | "misleading" | "unverified" | "partly_true";
    confidence: number;
    sourcesFor?: number;
    sourcesAgainst?: number;
  }>;
  marketImpacts?: Array<{
    id: string;
    eventId: string;
    summary: string;
    analysisDate: string;
    sectors: Array<{
      sector: string;
      direction: "positive" | "negative" | "neutral";
      magnitude: "high" | "medium" | "low";
      reasoning: string;
      region: "KR" | "US" | "GLOBAL";
      stocks: Array<{
        ticker: string;
        name: string;
        exchange: string;
        direction: "positive" | "negative" | "neutral";
        reasoning: string;
      }>;
    }>;
  }>;
  currentEventId: string;
  section?: "graph" | "agreement" | "predictions" | "narratives" | "scorecard" | "market-impact";
}

export default function EventDetailClient({
  events,
  links,
  agreement,
  predictions,
  narratives,
  claims,
  marketImpacts,
  currentEventId,
  section,
}: EventDetailClientProps) {
  if (section === "agreement") {
    return (
      <ObligationChecklist
        agreementTitle={agreement.title}
        agreementDate={agreement.date}
        parties={agreement.parties}
        obligations={agreement.obligations}
        onObligationClick={(oblId, eventId) => {
          if (eventId) {
            window.location.href = `/events/${eventId}`;
          }
        }}
      />
    );
  }

  if (section === "predictions") {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {predictions.map((pred) => (
          <PredictionCard
            key={pred.id}
            {...pred}
            onBet={(id, side, amount) => {
              alert(`베팅: ${side === "yes" ? "할 것이다" : "안 할 것이다"} ${amount}P (데모)`);
            }}
          />
        ))}
      </div>
    );
  }

  if (section === "narratives" && narratives) {
    return <NarrativeComparison narratives={narratives} />;
  }

  if (section === "market-impact") {
    return <MarketImpactPanel marketImpacts={marketImpacts || []} />;
  }

  if (section === "scorecard" && claims) {
    return <TruthScorecard claims={claims} />;
  }

  // Default: graph
  return (
    <CausalGraph
      events={events}
      links={links}
      onNodeClick={(eventId) => {
        if (eventId !== currentEventId) {
          window.location.href = `/events/${eventId}`;
        }
      }}
      className="h-full"
    />
  );
}
