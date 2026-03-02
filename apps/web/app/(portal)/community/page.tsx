import { Users } from "lucide-react";
import CommunityClient from "./CommunityClient";

export const metadata = {
  title: "커뮤니티 — NAVIFACT",
};

export default function CommunityPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center gap-3 mb-8">
        <Users className="h-6 w-6 text-accent" />
        <div>
          <h1 className="text-2xl font-bold text-foreground">커뮤니티</h1>
          <p className="text-sm text-muted">예측 적중률, 포인트, 활동 리더보드</p>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card p-6">
        <CommunityClient />
      </div>
    </div>
  );
}
