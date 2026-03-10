"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  type Node,
  type Edge,
  BackgroundVariant,
  Panel,
  MarkerType,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import EventNode, { type EventNodeData } from "./EventNode";
import CausalEdge, { type CausalEdgeData } from "./CausalEdge";

export interface CausalGraphProps {
  events: Array<{
    id: string;
    title: string;
    date: string;
    category: string;
    confidence: number;
    status: "verified" | "disputed" | "unverified" | "false";
    description?: string;
  }>;
  links: Array<{
    id: string;
    source: string;
    target: string;
    confidence: number;
    mechanism: string;
    causalType: "direct" | "indirect" | "contributing" | "enabling";
  }>;
  onNodeClick?: (eventId: string) => void;
  className?: string;
}

const nodeTypes = { event: EventNode };
const edgeTypes = { causal: CausalEdge };

const defaultEdgeOptions = {
  type: "causal",
  markerEnd: { type: MarkerType.ArrowClosed, width: 16, height: 16, color: "#3b82f6" },
};

export default function CausalGraph({
  events,
  links,
  onNodeClick,
  className,
}: CausalGraphProps) {
  const [layoutReady, setLayoutReady] = useState(false);

  const { initialNodes, initialEdges } = useMemo(() => {
    // 시간순 레이아웃: 날짜 기준 좌→우 배치
    const sorted = [...events].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
    const padding = 100;
    const width = 1000;
    const centerY = 300;
    const usableWidth = width - padding * 2;

    const positions = new Map<string, { x: number; y: number }>();
    sorted.forEach((event, i) => {
      const x =
        sorted.length > 1
          ? padding + (i / (sorted.length - 1)) * usableWidth
          : width / 2;
      // 같은 날짜 이벤트는 상하 분산
      const sameDateBefore = sorted.filter(
        (e, j) => j < i && e.date === event.date
      );
      const yOffset = sameDateBefore.length * 120;
      positions.set(event.id, { x, y: centerY + yOffset });
    });

    const rfNodes: Node<EventNodeData>[] = events.map((event) => {
      const pos = positions.get(event.id) ?? { x: 0, y: 0 };
      return {
        id: event.id,
        type: "event",
        position: pos,
        data: {
          title: event.title,
          date: event.date,
          category: event.category,
          confidence: event.confidence,
          status: event.status,
          description: event.description,
        },
      };
    });

    const rfEdges: Edge<CausalEdgeData>[] = links.map((link) => ({
      id: link.id,
      source: link.source,
      target: link.target,
      type: "causal",
      data: {
        confidence: link.confidence,
        mechanism: link.mechanism,
        causalType: link.causalType,
      },
    }));

    return { initialNodes: rfNodes, initialEdges: rfEdges };
  }, [events, links]);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  useEffect(() => {
    setNodes(initialNodes);
    setEdges(initialEdges);
    setLayoutReady(true);
  }, [initialNodes, initialEdges, setNodes, setEdges]);

  const handleNodeClick = useCallback(
    (_: React.MouseEvent, node: Node) => {
      onNodeClick?.(node.id);
    },
    [onNodeClick]
  );

  if (!layoutReady) {
    return (
      <div className={`flex items-center justify-center h-full ${className ?? ""}`}>
        <div className="animate-pulse text-muted text-sm">그래프 레이아웃 계산 중...</div>
      </div>
    );
  }

  return (
    <div className={`w-full h-full ${className ?? ""}`}>
      {/* SVG defs for edge arrow marker */}
      <svg style={{ position: "absolute", width: 0, height: 0 }}>
        <defs>
          <marker
            id="arrow"
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#3b82f6" />
          </marker>
        </defs>
      </svg>

      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={handleNodeClick}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        defaultEdgeOptions={defaultEdgeOptions}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        minZoom={0.3}
        maxZoom={2}
        proOptions={{ hideAttribution: true }}
      >
        <Background variant={BackgroundVariant.Dots} gap={20} size={1} color="#27272a" />
        <Controls
          showInteractive={false}
          className="!bg-card !border-border !rounded-lg !shadow-lg [&>button]:!bg-card [&>button]:!border-border [&>button]:!text-foreground [&>button:hover]:!bg-accent/10"
        />
        <MiniMap
          className="!bg-card !border-border !rounded-lg"
          nodeColor={(node) => {
            const status = (node.data as EventNodeData)?.status;
            if (status === "verified") return "#22c55e";
            if (status === "disputed") return "#f59e0b";
            if (status === "false") return "#ef4444";
            return "#71717a";
          }}
          maskColor="rgba(10, 10, 15, 0.7)"
        />
        <Panel position="top-left" className="!m-3">
          <div className="flex items-center gap-3 px-3 py-1.5 rounded-lg bg-card/80 border border-border backdrop-blur-sm text-[10px] text-muted">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-success" /> 검증됨
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-warning" /> 논쟁중
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-destructive" /> 거짓
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-muted" /> 미검증
            </span>
          </div>
        </Panel>
      </ReactFlow>
    </div>
  );
}
