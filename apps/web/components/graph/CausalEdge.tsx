"use client";

import { memo } from "react";
import {
  BaseEdge,
  EdgeLabelRenderer,
  getBezierPath,
  type EdgeProps,
} from "@xyflow/react";

export interface CausalEdgeData extends Record<string, unknown> {
  confidence: number;
  mechanism: string;
  causalType: "direct" | "indirect" | "contributing" | "enabling";
}

const typeStyles: Record<string, { dash: string; color: string }> = {
  direct: { dash: "0", color: "#3b82f6" },
  indirect: { dash: "6 3", color: "#8b5cf6" },
  contributing: { dash: "4 4", color: "#f59e0b" },
  enabling: { dash: "2 4", color: "#22c55e" },
};

function CausalEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  data,
  selected,
}: EdgeProps & { data?: CausalEdgeData }) {
  const confidence = data?.confidence ?? 50;
  const causalType = data?.causalType ?? "direct";
  const mechanism = data?.mechanism ?? "";

  const strokeWidth = 1 + (confidence / 100) * 3; // 1px ~ 4px
  const style = typeStyles[causalType] ?? typeStyles.direct;

  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  return (
    <>
      <BaseEdge
        id={id}
        path={edgePath}
        style={{
          stroke: selected ? "#3b82f6" : style.color,
          strokeWidth,
          strokeDasharray: style.dash,
          opacity: 0.6 + (confidence / 100) * 0.4,
        }}
        markerEnd="url(#arrow)"
      />
      {mechanism && (
        <EdgeLabelRenderer>
          <div
            className="absolute pointer-events-auto px-2 py-0.5 rounded text-[10px] bg-card/90 text-muted border border-border backdrop-blur-sm"
            style={{
              transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
            }}
          >
            {mechanism}
          </div>
        </EdgeLabelRenderer>
      )}
    </>
  );
}

export default memo(CausalEdge);
