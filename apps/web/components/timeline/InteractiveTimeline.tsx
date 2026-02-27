"use client";

import { useRef, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import * as d3 from "d3";

interface TimelineEvent {
  id: string;
  title: string;
  date: string;
  category: string;
  confidence: number;
  status: "verified" | "disputed" | "unverified" | "false";
  side?: "top" | "bottom";
}

interface TimelineLink {
  id: string;
  source: string;
  target: string;
  confidence: number;
  mechanism: string;
}

export interface InteractiveTimelineProps {
  events: TimelineEvent[];
  links: TimelineLink[];
  className?: string;
}

const statusColor: Record<string, string> = {
  verified: "#22c55e",
  disputed: "#f59e0b",
  unverified: "#71717a",
  false: "#ef4444",
};

const categoryColor: Record<string, string> = {
  외교: "#3b82f6",
  경제: "#22c55e",
  정치: "#8b5cf6",
  사회: "#f59e0b",
  국제: "#ef4444",
  기술: "#06b6d4",
};

export default function InteractiveTimeline({
  events,
  links,
  className,
}: InteractiveTimelineProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [tooltip, setTooltip] = useState<{
    x: number;
    y: number;
    event: TimelineEvent;
  } | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!svgRef.current || !containerRef.current || events.length === 0) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = 400;
    const margin = { top: 60, right: 40, bottom: 60, left: 40 };

    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height);

    svg.selectAll("*").remove();

    // Parse dates and sort
    const parsed = events
      .map((e) => ({ ...e, parsedDate: new Date(e.date) }))
      .sort((a, b) => a.parsedDate.getTime() - b.parsedDate.getTime());

    // Time scale
    const timeExtent = d3.extent(parsed, (d) => d.parsedDate) as [Date, Date];
    const xScale = d3
      .scaleTime()
      .domain([
        d3.timeDay.offset(timeExtent[0], -15),
        d3.timeDay.offset(timeExtent[1], 15),
      ])
      .range([margin.left, width - margin.right]);

    const midY = height / 2;

    // Background
    svg
      .append("rect")
      .attr("width", width)
      .attr("height", height)
      .attr("fill", "transparent");

    // Time axis line
    svg
      .append("line")
      .attr("x1", margin.left)
      .attr("y1", midY)
      .attr("x2", width - margin.right)
      .attr("y2", midY)
      .attr("stroke", "#27272a")
      .attr("stroke-width", 2);

    // Side labels
    svg
      .append("text")
      .attr("x", margin.left)
      .attr("y", margin.top - 20)
      .attr("fill", "#71717a")
      .attr("font-size", 11)
      .text("한국측 행동");

    svg
      .append("text")
      .attr("x", margin.left)
      .attr("y", height - margin.bottom + 30)
      .attr("fill", "#71717a")
      .attr("font-size", 11)
      .text("미국측 행동");

    // Auto-assign sides if not specified
    const withSides = parsed.map((e, i) => ({
      ...e,
      side: e.side ?? (i % 2 === 0 ? ("top" as const) : ("bottom" as const)),
    }));

    // Causal link arcs
    const eventMap = new Map(withSides.map((e) => [e.id, e]));
    links.forEach((link) => {
      const source = eventMap.get(link.source);
      const target = eventMap.get(link.target);
      if (!source || !target) return;

      const x1 = xScale(source.parsedDate);
      const x2 = xScale(target.parsedDate);
      const yOff1 = source.side === "top" ? midY - 40 : midY + 40;
      const yOff2 = target.side === "top" ? midY - 40 : midY + 40;

      svg
        .append("path")
        .attr(
          "d",
          `M ${x1} ${yOff1} Q ${(x1 + x2) / 2} ${midY} ${x2} ${yOff2}`
        )
        .attr("fill", "none")
        .attr("stroke", "#3b82f6")
        .attr("stroke-width", 0.5 + (link.confidence / 100) * 1.5)
        .attr("stroke-dasharray", "4 3")
        .attr("opacity", 0.3);
    });

    // Date tick marks
    const ticks = xScale.ticks(d3.timeMonth.every(1) as any);
    ticks.forEach((tick) => {
      const x = xScale(tick);
      svg
        .append("line")
        .attr("x1", x)
        .attr("y1", midY - 6)
        .attr("x2", x)
        .attr("y2", midY + 6)
        .attr("stroke", "#27272a")
        .attr("stroke-width", 1);

      svg
        .append("text")
        .attr("x", x)
        .attr("y", midY + 20)
        .attr("text-anchor", "middle")
        .attr("fill", "#71717a")
        .attr("font-size", 10)
        .text(d3.timeFormat("%Y.%m")(tick));
    });

    // Event nodes
    withSides.forEach((event) => {
      const x = xScale(event.parsedDate);
      const yOffset = event.side === "top" ? -50 : 50;
      const y = midY + yOffset;

      const g = svg
        .append("g")
        .attr("cursor", "pointer")
        .on("mouseenter", (e) => {
          const rect = container.getBoundingClientRect();
          setTooltip({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
            event,
          });
        })
        .on("mouseleave", () => setTooltip(null))
        .on("click", () => router.push(`/events/${event.id}`));

      // Vertical connector line
      svg
        .append("line")
        .attr("x1", x)
        .attr("y1", midY)
        .attr("x2", x)
        .attr("y2", y)
        .attr("stroke", "#27272a")
        .attr("stroke-width", 1)
        .attr("stroke-dasharray", "2 2");

      // Node circle
      g.append("circle")
        .attr("cx", x)
        .attr("cy", y)
        .attr("r", 8)
        .attr("fill", statusColor[event.status] ?? "#71717a")
        .attr("stroke", "#0a0a0f")
        .attr("stroke-width", 2);

      // Category ring
      g.append("circle")
        .attr("cx", x)
        .attr("cy", y)
        .attr("r", 11)
        .attr("fill", "none")
        .attr("stroke", categoryColor[event.category] ?? "#3b82f6")
        .attr("stroke-width", 1.5)
        .attr("opacity", 0.6);

      // Title label
      const labelY = event.side === "top" ? y - 18 : y + 22;
      g.append("text")
        .attr("x", x)
        .attr("y", labelY)
        .attr("text-anchor", "middle")
        .attr("fill", "#e8e8ed")
        .attr("font-size", 10)
        .attr("font-weight", 500)
        .text(event.title.length > 12 ? event.title.slice(0, 12) + "…" : event.title);

      // Date label
      g.append("text")
        .attr("x", x)
        .attr("y", labelY + 13)
        .attr("text-anchor", "middle")
        .attr("fill", "#71717a")
        .attr("font-size", 9)
        .text(event.date);
    });
  }, [events, links, router]);

  return (
    <div ref={containerRef} className={`relative w-full ${className ?? ""}`}>
      <svg ref={svgRef} className="w-full" />
      {tooltip && (
        <div
          className="absolute z-50 px-3 py-2 rounded-lg bg-card border border-border shadow-lg text-xs pointer-events-none"
          style={{
            left: tooltip.x + 10,
            top: tooltip.y - 10,
            transform: "translateY(-100%)",
          }}
        >
          <div className="font-semibold text-foreground mb-0.5">
            {tooltip.event.title}
          </div>
          <div className="text-muted">{tooltip.event.date}</div>
          <div className="flex items-center gap-2 mt-1">
            <span
              className="w-2 h-2 rounded-full"
              style={{
                backgroundColor:
                  statusColor[tooltip.event.status] ?? "#71717a",
              }}
            />
            <span className="text-muted">신뢰도 {tooltip.event.confidence}%</span>
          </div>
        </div>
      )}
    </div>
  );
}
