"use client";

import { useEffect, useState } from "react";
import { User, Trophy, Zap, Target, MessageSquare } from "lucide-react";
import TitleBadge from "@/components/community/TitleBadge";

import { API_BASE_URL as API_URL } from "@/lib/api-client";

interface UserProfile {
  id: string;
  username: string;
  points: number;
  bio: string | null;
  active_title: string | null;
  accuracy_rate: number | null;
  total_bets: number;
  correct_bets: number;
  created_at: string;
}

interface Activity {
  id: string;
  action: string;
  summary: string;
  created_at: string;
}

interface UserTitle {
  title: { id: string; name: string; icon: string; tier: number; category: string };
  earned_at: string;
  is_active: boolean;
}

export default function ProfileClient({ userId }: { userId: string }) {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [titles, setTitles] = useState<UserTitle[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"activity" | "titles">("activity");

  useEffect(() => {
    async function load() {
      try {
        const [profileRes, activitiesRes] = await Promise.all([
          fetch(`${API_URL}/users/${userId}/profile`),
          fetch(`${API_URL}/users/${userId}/activities?page_size=20`),
        ]);
        if (profileRes.ok) {
          setProfile(await profileRes.json());
        }
        if (activitiesRes.ok) {
          const data = await activitiesRes.json();
          setActivities(data.items || []);
        }
      } catch {
        // API unavailable
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [userId]);

  if (loading) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-8 animate-pulse space-y-4">
        <div className="h-32 bg-white/5 rounded-xl" />
        <div className="h-64 bg-white/5 rounded-xl" />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-8 text-center text-muted">
        사용자를 찾을 수 없습니다.
      </div>
    );
  }

  const accuracyPct = profile.accuracy_rate != null ? (profile.accuracy_rate * 100).toFixed(1) : "--";

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-8 space-y-6">
      {/* Profile Header */}
      <div className="rounded-xl border border-border bg-card p-6">
        <div className="flex items-start gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/10 text-accent">
            <User className="h-8 w-8" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-xl font-bold text-foreground">{profile.username}</h1>
              {profile.active_title && (
                <span className="text-sm text-accent">{profile.active_title}</span>
              )}
            </div>
            {profile.bio && <p className="text-sm text-muted mb-3">{profile.bio}</p>}
            <div className="flex gap-6 text-sm">
              <div className="flex items-center gap-1.5">
                <Zap className="h-4 w-4 text-accent" />
                <span className="font-semibold text-foreground">{profile.points.toLocaleString()}</span>
                <span className="text-muted">포인트</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Target className="h-4 w-4 text-accent" />
                <span className="font-semibold text-foreground">{accuracyPct}%</span>
                <span className="text-muted">적중률</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Trophy className="h-4 w-4 text-accent" />
                <span className="font-semibold text-foreground">
                  {profile.correct_bets}/{profile.total_bets}
                </span>
                <span className="text-muted">베팅</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <div className="flex border-b border-border">
          <button
            onClick={() => setActiveTab("activity")}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === "activity"
                ? "border-accent text-accent"
                : "border-transparent text-muted hover:text-foreground"
            }`}
          >
            <MessageSquare className="h-4 w-4" />
            활동
          </button>
          <button
            onClick={() => {
              setActiveTab("titles");
              // Lazy load titles
              if (titles.length === 0) {
                fetch(`${API_URL}/titles/mine`)
                  .then((r) => r.ok ? r.json() : [])
                  .then(setTitles)
                  .catch(() => {});
              }
            }}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === "titles"
                ? "border-accent text-accent"
                : "border-transparent text-muted hover:text-foreground"
            }`}
          >
            <Trophy className="h-4 w-4" />
            칭호
          </button>
        </div>

        <div className="p-4">
          {activeTab === "activity" && (
            activities.length === 0 ? (
              <p className="text-sm text-muted text-center py-8">활동 기록이 없습니다.</p>
            ) : (
              <div className="space-y-3">
                {activities.map((a) => (
                  <div key={a.id} className="flex items-center gap-3 text-sm">
                    <span className="text-muted text-xs whitespace-nowrap">
                      {new Date(a.created_at).toLocaleDateString("ko-KR")}
                    </span>
                    <span className="text-foreground">{a.summary}</span>
                  </div>
                ))}
              </div>
            )
          )}

          {activeTab === "titles" && (
            titles.length === 0 ? (
              <p className="text-sm text-muted text-center py-8">획득한 칭호가 없습니다.</p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {titles.map((ut) => (
                  <TitleBadge
                    key={ut.title.id}
                    name={ut.title.name}
                    icon={ut.title.icon}
                    tier={ut.title.tier}
                    category={ut.title.category as "prediction" | "activity"}
                  />
                ))}
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}
