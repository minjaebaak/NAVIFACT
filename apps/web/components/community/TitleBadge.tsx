"use client";

interface TitleBadgeProps {
  name: string;
  icon: string;
  tier: number;
  category: "prediction" | "activity";
  size?: "sm" | "md";
}

const tierColors: Record<number, string> = {
  0: "bg-zinc-700/50 text-zinc-300 border-zinc-600",
  1: "bg-zinc-600/50 text-zinc-200 border-zinc-500",
  2: "bg-slate-600/50 text-slate-200 border-slate-500",
  3: "bg-blue-900/50 text-blue-300 border-blue-700",
  4: "bg-blue-800/50 text-blue-200 border-blue-600",
  5: "bg-emerald-900/50 text-emerald-300 border-emerald-700",
  6: "bg-purple-900/50 text-purple-300 border-purple-700",
  7: "bg-amber-900/50 text-amber-300 border-amber-700",
  8: "bg-rose-900/50 text-rose-200 border-rose-700",
  9: "bg-yellow-900/50 text-yellow-200 border-yellow-600",
};

export default function TitleBadge({ name, icon, tier, size = "md" }: TitleBadgeProps) {
  const colors = tierColors[tier] || tierColors[0];
  const sizeClasses = size === "sm"
    ? "text-xs px-2 py-0.5 gap-1"
    : "text-sm px-3 py-1 gap-1.5";

  return (
    <span
      className={`inline-flex items-center rounded-full border font-medium ${colors} ${sizeClasses}`}
    >
      <span>{icon}</span>
      <span>{name}</span>
    </span>
  );
}
