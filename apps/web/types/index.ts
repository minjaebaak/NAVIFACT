export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  category: string;
  confidenceScore: number;
  status: 'verified' | 'disputed' | 'unverified';
}

export interface CausalLink {
  id: string;
  sourceEventId: string;
  targetEventId: string;
  confidence: number;
  mechanism: string;
  causalType: 'direct' | 'indirect' | 'contributing' | 'enabling';
}

export interface Claim {
  id: string;
  text: string;
  claimType: 'factual' | 'causal' | 'predictive' | 'opinion';
  verificationStatus: 'verified' | 'false' | 'misleading' | 'unverified' | 'partly_true';
  confidence: number;
}

export interface Agreement {
  id: string;
  title: string;
  date: string;
  summary: string;
  status: string;
  parties: Actor[];
  obligations: Obligation[];
}

export interface Obligation {
  id: string;
  description: string;
  deadline: string;
  status: 'fulfilled' | 'violated' | 'pending' | 'partial';
  assignedTo: Actor;
}

export interface Actor {
  id: string;
  name: string;
  actorType: 'person' | 'organization' | 'country' | 'institution';
}

export interface Prediction {
  id: string;
  question: string;
  yesPool: number;
  noPool: number;
  deadline: string;
  status: 'active' | 'settled' | 'expired';
}

export interface GraphData {
  nodes: GraphNode[];
  edges: GraphEdge[];
}

export interface GraphNode {
  id: string;
  type: 'event' | 'claim' | 'actor' | 'agreement';
  data: Record<string, any>;
  position: { x: number; y: number };
}

export interface GraphEdge {
  id: string;
  source: string;
  target: string;
  type: string;
  data: Record<string, any>;
}
