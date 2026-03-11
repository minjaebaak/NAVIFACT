"use client";

import { useEffect, useState } from "react";
import { Trophy } from "lucide-react";
import Link from "next/link";

import { API_BASE_URL as API_URL } from "@/lib/api-client";

interface LeaderboardEntry {
  rank: number;
  user_id: string;
  username: string;
  active_title: string | null;
  score: number;
  total_bets: number;
  correct_bets: number;
  points: number;
}

interface LeaderboardTableProps {
  type: "accuracy" | "points" | "activity";
}

const rankStyles: Record<number, string> = {
  1: "text-yellow-400",
  2: "text-zinc-300",
  3: "text-amber-600",
};

export default function LeaderboardTable({ type }: LeaderboardTableProps) {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`${API_URL}/leaderboard?type=${type}&page_size=20`);
        if (res.ok) {
          const data = await res.json();
          setEntries(data.items || []);
        }
      } catch {
        // API unavailable
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [type]);

  if (loading) {
    return (
      <div className="animate-pulse space-y-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-12 bg-white/5 rounded" />
        ))}
      </div>
    );
  }

  if (entries.length === 0) {
    return (
      <p className="text-sm text-muted text-center py-8">
        아직 리더보드 데이터가 없습니다.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border text-muted">
            <th className="text-left py-3 px-2 w-12">#</th>
            <th className="text-left py-3 px-2">사용자</th>
            {type === "accuracy" && <th className="text-right py-3 px-2">적중률</th>}
            {type === "accuracy" && <th className="text-right py-3 px-2">베팅</th>}
            {type === "points" && <th className="text-right py-3 px-2">포인트</th>}
            {type === "activity" && <th className="text-right py-3 px-2">댓글</th>}
          </tr>
        </thead>
        <tbody>
          {entries.map((entry) => (
            <tr key={entry.user_id} className="border-b border-border/50 hover:bg-white/5">
              <td className={`py-3 px-2 font-bold ${rankStyles[entry.rank] || "text-muted"}`}>
                {entry.rank <= 3 ? <Trophy className="h-4 w-4 inline" /> : entry.rank}
              </td>
              <td className="py-3 px-2">
                <Link href={`/profile/${entry.user_id}`} className="hover:text-accent transition-colors">
                  <span className="font-medium text-foreground">{entry.username}</span>
                  {entry.active_title && (
                    <span className="ml-2 text-xs text-accent">{entry.active_title}</span>
                  )}
                </Link>
              </td>
              {type === "accuracy" && (
                <>
                  <td className="text-right py-3 px-2 text-accent font-semibold">
                    {(entry.score * 100).toFixed(1)}%
                  </td>
                  <td className="text-right py-3 px-2 text-muted">
                    {entry.correct_bets}/{entry.total_bets}
                  </td>
                </>
              )}
              {type === "points" && (
                <td className="text-right py-3 px-2 text-accent font-semibold">
                  {entry.points.toLocaleString()} P
                </td>
              )}
              {type === "activity" && (
                <td className="text-right py-3 px-2 text-accent font-semibold">
                  {entry.score.toFixed(0)}개
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
