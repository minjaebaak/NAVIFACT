import Link from "next/link";
import { Calendar, GitBranch } from "lucide-react";
import VerificationBadge from "./VerificationBadge";

interface EventCardProps {
  id: string;
  title: string;
  description: string;
  date: string;
  category: string;
  confidence: number;
  status: "verified" | "disputed" | "unverified" | "false";
  linkCount?: number;
}

export default function EventCard({
  id,
  title,
  description,
  date,
  category,
  confidence,
  status,
  linkCount,
}: EventCardProps) {
  return (
    <Link
      href={`/events/${id}`}
      className="block p-5 rounded-xl border border-border bg-card group hover:border-accent/30 hover:bg-card/80 transition-all"
    >
      <div className="flex items-center justify-between mb-3">
        <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-accent/10 text-accent border border-accent/20">
          {category}
        </span>
        <VerificationBadge status={status} size="sm" />
      </div>

      <h3 className="text-base font-semibold text-foreground mb-1.5 group-hover:text-accent transition-colors line-clamp-2">
        {title}
      </h3>
      <p className="text-xs text-muted leading-relaxed line-clamp-2 mb-4">
        {description}
      </p>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1 text-[10px] text-muted">
          <Calendar className="h-3 w-3" />
          <span>{date}</span>
        </div>
        <div className="flex items-center gap-3">
          {linkCount !== undefined && (
            <div className="flex items-center gap-1 text-[10px] text-muted">
              <GitBranch className="h-3 w-3" />
              <span>{linkCount}</span>
            </div>
          )}
          <div className="flex items-center gap-1">
            <div className="w-10 h-1 rounded-full bg-border/50 overflow-hidden">
              <div
                className={`h-full rounded-full ${
                  confidence >= 80
                    ? "bg-success"
                    : confidence >= 50
                      ? "bg-warning"
                      : "bg-destructive"
                }`}
                style={{ width: `${confidence}%` }}
              />
            </div>
            <span className="text-[10px] text-muted">{confidence}%</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
