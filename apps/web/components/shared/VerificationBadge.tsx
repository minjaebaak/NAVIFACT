"use client";

import { ShieldCheck, ShieldAlert, ShieldQuestion, AlertTriangle } from "lucide-react";

type VerificationStatus = "verified" | "false" | "misleading" | "unverified" | "disputed" | "partly_true";

const statusConfig: Record<
  VerificationStatus,
  { label: string; color: string; bg: string; border: string; icon: typeof ShieldCheck }
> = {
  verified: {
    label: "검증됨",
    color: "text-success",
    bg: "bg-success/10",
    border: "border-success/20",
    icon: ShieldCheck,
  },
  false: {
    label: "거짓",
    color: "text-destructive",
    bg: "bg-destructive/10",
    border: "border-destructive/20",
    icon: ShieldAlert,
  },
  misleading: {
    label: "오해의 소지",
    color: "text-warning",
    bg: "bg-warning/10",
    border: "border-warning/20",
    icon: AlertTriangle,
  },
  disputed: {
    label: "논쟁중",
    color: "text-warning",
    bg: "bg-warning/10",
    border: "border-warning/20",
    icon: AlertTriangle,
  },
  unverified: {
    label: "미검증",
    color: "text-muted",
    bg: "bg-muted/10",
    border: "border-muted/20",
    icon: ShieldQuestion,
  },
  partly_true: {
    label: "부분 사실",
    color: "text-warning",
    bg: "bg-warning/10",
    border: "border-warning/20",
    icon: AlertTriangle,
  },
};

interface VerificationBadgeProps {
  status: VerificationStatus;
  size?: "sm" | "md";
}

export default function VerificationBadge({ status, size = "sm" }: VerificationBadgeProps) {
  const config = statusConfig[status] ?? statusConfig.unverified;
  const Icon = config.icon;
  const iconSize = size === "sm" ? "h-3 w-3" : "h-4 w-4";
  const textSize = size === "sm" ? "text-xs" : "text-sm";

  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full font-medium border ${config.bg} ${config.color} ${config.border} ${textSize}`}
    >
      <Icon className={iconSize} />
      {config.label}
    </span>
  );
}
