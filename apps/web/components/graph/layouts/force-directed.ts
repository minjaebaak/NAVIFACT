import {
  forceSimulation,
  forceLink,
  forceManyBody,
  forceCenter,
  forceCollide,
  type SimulationNodeDatum,
  type SimulationLinkDatum,
} from "d3-force";

export interface ForceNode extends SimulationNodeDatum {
  id: string;
  x?: number;
  y?: number;
}

export interface ForceLink extends SimulationLinkDatum<ForceNode> {
  source: string;
  target: string;
}

interface LayoutOptions {
  width: number;
  height: number;
  chargeStrength?: number;
  linkDistance?: number;
  collideRadius?: number;
  iterations?: number;
}

export function computeForceLayout(
  nodes: ForceNode[],
  links: ForceLink[],
  options: LayoutOptions
): Map<string, { x: number; y: number }> {
  const {
    width,
    height,
    chargeStrength = -400,
    linkDistance = 180,
    collideRadius = 60,
    iterations = 300,
  } = options;

  const simNodes = nodes.map((n) => ({ ...n }));
  const simLinks = links.map((l) => ({ ...l }));

  const simulation = forceSimulation(simNodes)
    .force(
      "link",
      forceLink(simLinks)
        .id((d: any) => d.id)
        .distance(linkDistance)
    )
    .force("charge", forceManyBody().strength(chargeStrength))
    .force("center", forceCenter(width / 2, height / 2))
    .force("collide", forceCollide(collideRadius))
    .stop();

  for (let i = 0; i < iterations; i++) {
    simulation.tick();
  }

  const positions = new Map<string, { x: number; y: number }>();
  for (const node of simNodes) {
    positions.set(node.id, { x: node.x ?? 0, y: node.y ?? 0 });
  }

  return positions;
}
