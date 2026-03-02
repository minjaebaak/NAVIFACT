"use client";

import { useState } from "react";
import { Trophy, Zap, MessageSquare } from "lucide-react";
import LeaderboardTable from "@/components/community/LeaderboardTable";

const tabs = [
  { id: "accuracy" as const, label: "예측 적중률", icon: Trophy },
  { id: "points" as const, label: "포인트", icon: Zap },
  { id: "activity" as const, label: "활동량", icon: MessageSquare },
];

export default function CommunityClient() {
  const [activeTab, setActiveTab] = useState<"accuracy" | "points" | "activity">("accuracy");

  return (
    <div>
      {/* Tabs */}
      <div className="flex gap-1 mb-6 border-b border-border">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                isActive
                  ? "border-accent text-accent"
                  : "border-transparent text-muted hover:text-foreground"
              }`}
            >
              <Icon className="h-4 w-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Content */}
      <LeaderboardTable type={activeTab} />
    </div>
  );
}
