"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { Search, Filter, SlidersHorizontal, X } from "lucide-react";
import EventCard from "@/components/shared/EventCard";

type SortKey = "date-desc" | "date-asc" | "confidence-desc" | "confidence-asc";

interface EventItem {
  id: string;
  title: string;
  description: string;
  date: string;
  category: string;
  confidence: number;
  status: string;
}

interface Link {
  source: string;
  target: string;
}

interface EventsClientProps {
  events: EventItem[];
  links: Link[];
  categories: string[];
}

const SORT_OPTIONS: { key: SortKey; label: string }[] = [
  { key: "date-desc", label: "최신순" },
  { key: "date-asc", label: "오래된순" },
  { key: "confidence-desc", label: "신뢰도 높은순" },
  { key: "confidence-asc", label: "신뢰도 낮은순" },
];

const STATUS_OPTIONS = [
  { key: "verified", label: "검증됨", color: "bg-success" },
  { key: "disputed", label: "논쟁중", color: "bg-warning" },
  { key: "unverified", label: "미검증", color: "bg-muted" },
  { key: "false", label: "거짓", color: "bg-destructive" },
];

export default function EventsClient({ events, links, categories }: EventsClientProps) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("전체");
  const [sortBy, setSortBy] = useState<SortKey>("date-desc");
  const [showSort, setShowSort] = useState(false);
  const [statusFilter, setStatusFilter] = useState<Set<string>>(new Set());
  const [showFilter, setShowFilter] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);
  const filterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (sortRef.current && !sortRef.current.contains(e.target as Node)) setShowSort(false);
      if (filterRef.current && !filterRef.current.contains(e.target as Node)) setShowFilter(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function getLinkCount(eventId: string): number {
    return links.filter((l) => l.source === eventId || l.target === eventId).length;
  }

  function toggleStatus(s: string) {
    setStatusFilter((prev) => {
      const next = new Set(prev);
      if (next.has(s)) next.delete(s);
      else next.add(s);
      return next;
    });
  }

  const q = query.toLowerCase().trim();

  const filtered = useMemo(() => {
    let result = events;

    if (q) {
      result = result.filter(
        (e) => e.title.toLowerCase().includes(q) || e.description.toLowerCase().includes(q),
      );
    }

    if (activeCategory !== "전체") {
      result = result.filter((e) => e.category === activeCategory);
    }

    if (statusFilter.size > 0) {
      result = result.filter((e) => statusFilter.has(e.status));
    }

    result = [...result].sort((a, b) => {
      switch (sortBy) {
        case "date-desc":
          return b.date.localeCompare(a.date);
        case "date-asc":
          return a.date.localeCompare(b.date);
        case "confidence-desc":
          return b.confidence - a.confidence;
        case "confidence-asc":
          return a.confidence - b.confidence;
        default:
          return 0;
      }
    });

    return result;
  }, [events, q, activeCategory, statusFilter, sortBy]);

  return (
    <>
      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="이벤트 검색..."
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border bg-card text-foreground placeholder:text-muted text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-colors"
          />
        </div>

        {/* Filter */}
        <div className="relative" ref={filterRef}>
          <button
            onClick={() => { setShowFilter(!showFilter); setShowSort(false); }}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border text-sm transition-colors ${
              statusFilter.size > 0
                ? "border-accent bg-accent/10 text-accent"
                : "border-border bg-card text-muted hover:text-foreground hover:bg-white/5"
            }`}
          >
            <Filter className="h-4 w-4" />
            필터{statusFilter.size > 0 && ` (${statusFilter.size})`}
          </button>
          {showFilter && (
            <div className="absolute right-0 top-full mt-2 w-48 rounded-lg border border-border bg-card shadow-lg z-20 p-2">
              {STATUS_OPTIONS.map((opt) => (
                <button
                  key={opt.key}
                  onClick={() => toggleStatus(opt.key)}
                  className={`w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors ${
                    statusFilter.has(opt.key) ? "bg-accent/10 text-foreground" : "text-muted hover:text-foreground hover:bg-white/5"
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${opt.color}`} />
                  {opt.label}
                </button>
              ))}
              {statusFilter.size > 0 && (
                <button
                  onClick={() => setStatusFilter(new Set())}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm text-destructive hover:bg-destructive/10 mt-1 border-t border-border pt-2"
                >
                  <X className="h-3 w-3" />
                  초기화
                </button>
              )}
            </div>
          )}
        </div>

        {/* Sort */}
        <div className="relative" ref={sortRef}>
          <button
            onClick={() => { setShowSort(!showSort); setShowFilter(false); }}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-border bg-card text-sm text-muted hover:text-foreground hover:bg-white/5 transition-colors"
          >
            <SlidersHorizontal className="h-4 w-4" />
            {SORT_OPTIONS.find((o) => o.key === sortBy)?.label ?? "정렬"}
          </button>
          {showSort && (
            <div className="absolute right-0 top-full mt-2 w-40 rounded-lg border border-border bg-card shadow-lg z-20 p-1">
              {SORT_OPTIONS.map((opt) => (
                <button
                  key={opt.key}
                  onClick={() => { setSortBy(opt.key); setShowSort(false); }}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                    sortBy === opt.key ? "bg-accent/10 text-accent" : "text-muted hover:text-foreground hover:bg-white/5"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`shrink-0 whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              activeCategory === category
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
        {filtered.map((event) => (
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

      {/* Empty State */}
      {filtered.length === 0 && (
        <div className="text-center py-16">
          <Search className="h-12 w-12 text-muted mx-auto mb-4" />
          <p className="text-muted">검색 결과가 없습니다.</p>
        </div>
      )}

      {/* Result Count */}
      {filtered.length > 0 && filtered.length !== events.length && (
        <div className="mt-4 text-center">
          <p className="text-muted text-xs">{events.length}개 중 {filtered.length}개 표시</p>
        </div>
      )}
    </>
  );
}
