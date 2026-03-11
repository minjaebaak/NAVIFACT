"use client";

import { useState, useMemo } from "react";
import { Search, Compass, Shield, FileText } from "lucide-react";
import EventCard from "@/components/shared/EventCard";
import VerificationBadge from "@/components/shared/VerificationBadge";
import FlagDisplay from "@/components/shared/FlagDisplay";

import seedEvents from "@/data/seed/tariff-events.json";
import seedClaims from "@/data/seed/tariff-claims.json";
import seedAgreement from "@/data/seed/tariff-agreement.json";

type SearchType = "events" | "claims" | "agreements";

const typeConfig: Record<
  SearchType,
  { icon: typeof Compass; label: string }
> = {
  events: { icon: Compass, label: "이벤트" },
  claims: { icon: Shield, label: "주장" },
  agreements: { icon: FileText, label: "합의" },
};

export default function SearchClient() {
  const [query, setQuery] = useState("");
  const [activeType, setActiveType] = useState<SearchType>("events");

  const q = query.toLowerCase().trim();

  const eventResults = useMemo(() => {
    if (!q) return seedEvents;
    return seedEvents.filter(
      (e) =>
        e.title.toLowerCase().includes(q) ||
        e.description.toLowerCase().includes(q)
    );
  }, [q]);

  const claimResults = useMemo(() => {
    if (!q) return seedClaims;
    return seedClaims.filter((c) => c.text.toLowerCase().includes(q));
  }, [q]);

  const agreementResults = useMemo(() => {
    if (!q) return [seedAgreement];
    const matches =
      seedAgreement.title.toLowerCase().includes(q) ||
      seedAgreement.obligations.some((o) =>
        o.description.toLowerCase().includes(q)
      );
    return matches ? [seedAgreement] : [];
  }, [q]);

  const counts: Record<SearchType, number> = {
    events: eventResults.length,
    claims: claimResults.length,
    agreements: agreementResults.length,
  };

  return (
    <>
      {/* Search Bar */}
      <div className="max-w-2xl mx-auto mb-8">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="검색어를 입력하세요..."
            className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-border bg-card text-foreground placeholder:text-muted text-base focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-colors"
          />
        </div>
      </div>

      {/* Type Filters */}
      <div className="flex justify-center gap-3 mb-8">
        {(Object.keys(typeConfig) as SearchType[]).map((type) => {
          const config = typeConfig[type];
          const Icon = config.icon;
          const active = activeType === type;
          return (
            <button
              key={type}
              onClick={() => setActiveType(type)}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                active
                  ? "bg-accent/10 text-accent border border-accent/20"
                  : "bg-card border border-border text-muted hover:text-foreground hover:bg-white/5"
              }`}
            >
              <Icon className="h-4 w-4" />
              {config.label}
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-border/50">
                {counts[type]}
              </span>
            </button>
          );
        })}
      </div>

      {/* Results */}
      <div className="max-w-4xl mx-auto">
        {activeType === "events" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {eventResults.map((event) => (
              <EventCard
                key={event.id}
                id={event.id}
                title={event.title}
                description={event.description}
                date={event.date}
                category={event.category}
                confidence={event.confidence}
                status={event.status as any}
              />
            ))}
          </div>
        )}

        {activeType === "claims" && (
          <div className="space-y-3">
            {claimResults.map((claim) => (
              <div
                key={claim.id}
                className="p-4 rounded-xl border border-border bg-card flex items-center gap-4"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground">
                    &ldquo;{claim.text}&rdquo;
                  </p>
                  <div className="flex items-center gap-2 mt-1.5">
                    <VerificationBadge status={claim.status as any} size="sm" />
                    <span className="text-[10px] text-muted">
                      {claim.sourcesFor}건 지지 / {claim.sourcesAgainst}건 반박
                    </span>
                  </div>
                </div>
                <div className="shrink-0 text-right">
                  <span
                    className={`text-lg font-bold ${
                      claim.confidence >= 70
                        ? "text-success"
                        : claim.confidence >= 40
                          ? "text-warning"
                          : "text-destructive"
                    }`}
                  >
                    {claim.confidence}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeType === "agreements" && (
          <div className="space-y-4">
            {agreementResults.map((agr) => (
              <div
                key={agr.id}
                className="p-5 rounded-xl border border-border bg-card"
              >
                <div className="flex items-center gap-2 mb-2">
                  {agr.parties.map((p) => (
                    <span key={p.id} className="text-lg">
                      <FlagDisplay flag={p.flag} size="sm" />
                    </span>
                  ))}
                  <h3 className="text-base font-semibold text-foreground">
                    {agr.title}
                  </h3>
                </div>
                <p className="text-xs text-muted mb-3">
                  {agr.date} · {agr.obligations.length}개 의무 조항
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {agr.obligations.slice(0, 4).map((ob) => (
                    <div
                      key={ob.id}
                      className="flex items-center gap-2 text-xs p-2 rounded-lg bg-background/30 border border-border/50"
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          ob.status === "fulfilled"
                            ? "bg-success"
                            : ob.status === "violated"
                              ? "bg-destructive"
                              : "bg-muted"
                        }`}
                      />
                      <span className="text-muted truncate">
                        {ob.description}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty state */}
        {((activeType === "events" && eventResults.length === 0) ||
          (activeType === "claims" && claimResults.length === 0) ||
          (activeType === "agreements" && agreementResults.length === 0)) && (
          <div className="text-center py-16">
            <Search className="h-12 w-12 text-muted mx-auto mb-4" />
            <p className="text-muted">
              &ldquo;{query}&rdquo;에 대한 검색 결과가 없습니다.
            </p>
          </div>
        )}
      </div>
    </>
  );
}
