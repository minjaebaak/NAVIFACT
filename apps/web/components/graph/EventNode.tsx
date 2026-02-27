"use client";

import { memo } from "react";
import { Handle, Position, type NodeProps } from "@xyflow/react";
import VerificationBadge from "../shared/VerificationBadge";

export interface EventNodeData extends Record<string, unknown> {
  title: string;
  date: string;
  category: string;
  confidence: number;
  status: "verified" | "disputed" | "unverified" | "false";
  description?: string;
}

const statusBorder: Record<string, string> = {
  verified: "border-success/60",
  disputed: "border-warning/60",
  unverified: "border-muted/40",
  false: "border-destructive/60",
};

const statusGlow: Record<string, string> = {
  verified: "shadow-success/20",
  disputed: "shadow-warning/20",
  unverified: "shadow-none",
  false: "shadow-destructive/20",
};

function EventNode({ data, selected }: NodeProps & { data: EventNodeData }) {
  const borderColor = statusBorder[data.status] ?? statusBorder.unverified;
  const glow = statusGlow[data.status] ?? "";

  return (
    <div
      className={`
        relative px-4 py-3 rounded-xl border-2 bg-card min-w-[200px] max-w-[280px]
        ${borderColor} ${selected ? "ring-2 ring-accent shadow-lg" : `shadow-md ${glow}`}
        transition-all duration-200 hover:shadow-lg cursor-pointer
      `}
    >
      <Handle
        type="target"
        position={Position.Left}
        className="!w-2.5 !h-2.5 !bg-accent !border-2 !border-card"
      />
      <Handle
        type="source"
        position={Position.Right}
        className="!w-2.5 !h-2.5 !bg-accent !border-2 !border-card"
      />

      <div className="flex items-center justify-between gap-2 mb-1.5">
        <span className="text-[10px] text-muted font-mono">{data.date}</span>
        <VerificationBadge status={data.status} size="sm" />
      </div>

      <h3 className="text-sm font-semibold text-foreground leading-tight mb-1.5 line-clamp-2">
        {data.title}
      </h3>

      <div className="flex items-center justify-between">
        <span className="text-[10px] px-1.5 py-0.5 rounded bg-accent/10 text-accent border border-accent/20">
          {data.category}
        </span>
        <div className="flex items-center gap-1">
          <div className="w-12 h-1 rounded-full bg-border/50 overflow-hidden">
            <div
              className={`h-full rounded-full ${
                data.confidence >= 80
                  ? "bg-success"
                  : data.confidence >= 50
                    ? "bg-warning"
                    : "bg-destructive"
              }`}
              style={{ width: `${data.confidence}%` }}
            />
          </div>
          <span className="text-[10px] text-muted">{data.confidence}%</span>
        </div>
      </div>
    </div>
  );
}

export default memo(EventNode);
