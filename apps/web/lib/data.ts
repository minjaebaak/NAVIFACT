/**
 * Data access layer — API calls with static JSON fallback.
 *
 * All pages should use these functions instead of importing seed JSON directly.
 * When the backend API is available, data is fetched via HTTP and transformed
 * to match the frontend shape. When unavailable, we fall back to the static
 * seed JSON files (same data, zero downtime).
 */

import seedEvents from "@/data/seed/tariff-events.json";
import seedLinks from "@/data/seed/tariff-links.json";
import seedAgreement from "@/data/seed/tariff-agreement.json";
import seedPredictions from "@/data/seed/tariff-predictions.json";
import seedNarratives from "@/data/seed/tariff-narratives.json";
import seedClaims from "@/data/seed/tariff-claims.json";

// ---------------------------------------------------------------------------
// Types (matching seed JSON shapes)
// ---------------------------------------------------------------------------

export interface SeedEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  category: string;
  confidence: number;
  status: "verified" | "disputed" | "unverified" | "false";
}

export interface SeedLink {
  id: string;
  source: string;
  target: string;
  confidence: number;
  mechanism: string;
  causalType: "direct" | "indirect" | "contributing" | "enabling";
}

export interface SeedParty {
  id: string;
  name: string;
  flag?: string;
}

export interface SeedObligation {
  id: string;
  description: string;
  deadline: string;
  status: "fulfilled" | "violated" | "pending" | "partial";
  assignedTo: SeedParty;
  consequenceEventId?: string;
}

export interface SeedAgreement {
  id: string;
  title: string;
  date: string;
  summary: string;
  status: string;
  parties: SeedParty[];
  obligations: SeedObligation[];
}

export interface SeedPrediction {
  id: string;
  question: string;
  yesPool: number;
  noPool: number;
  deadline: string;
  status: "active" | "settled" | "expired";
  settlementCriteria?: string;
}

export interface SeedNarrativeClaim {
  text: string;
  status: "verified" | "false" | "misleading" | "unverified" | "partly_true";
  confidence: number;
}

export interface SeedNarrative {
  id: string;
  title: string;
  source: string;
  sourceType: "media" | "verified";
  framing: string;
  claims: SeedNarrativeClaim[];
  missingContext?: string[];
  sources?: string[];
}

export interface SeedClaim {
  id: string;
  text: string;
  status: "verified" | "false" | "misleading" | "unverified" | "partly_true";
  confidence: number;
  sourcesFor?: number;
  sourcesAgainst?: number;
}

// ---------------------------------------------------------------------------
// API URL
// ---------------------------------------------------------------------------

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";

// ---------------------------------------------------------------------------
// UUID ↔ Short ID mapping (must match backend seed_data.py)
// ---------------------------------------------------------------------------

// We keep a runtime lookup built lazily from seed data so that API responses
// (which use UUIDs) can be mapped back to short IDs used in frontend URLs.

const UUID_NAMESPACE = "a1b2c3d4-e5f6-7890-abcd-ef1234567890";

// Pre-build mappings from all seed data short IDs
const allShortIds = [
  ...seedEvents.map((e) => e.id),
  ...seedLinks.map((l) => l.id),
  seedAgreement.id,
  ...seedAgreement.parties.map((p) => p.id),
  ...seedAgreement.obligations.map((o) => o.id),
  ...seedPredictions.map((p) => p.id),
  ...seedNarratives.map((n) => n.id),
  ...seedClaims.map((c) => c.id),
];

// We can't compute UUID5 in the browser easily, so we rely on the API
// returning a `short_id` field. If not available, we match by title/text.

// ---------------------------------------------------------------------------
// Transform functions (API response → seed shape)
// ---------------------------------------------------------------------------

const CATEGORY_REVERSE: Record<string, string> = {
  political: "외교",
  economic: "경제",
  military: "군사",
  legal: "법률",
};

function transformApiEvent(apiEvent: Record<string, unknown>): SeedEvent {
  const shortId =
    (apiEvent.short_id as string) || (apiEvent.id as string);
  const category =
    CATEGORY_REVERSE[apiEvent.category as string] ||
    (apiEvent.category as string);
  const credibility = apiEvent.credibility_score as number;
  const confidence =
    credibility != null
      ? Math.round(credibility * 100)
      : (apiEvent.confidence as number) ?? 0;

  // Handle Neo4j date objects that may come as {year, month, day}
  let date = apiEvent.date as string;
  if (typeof date === "object" && date !== null) {
    const d = date as unknown as { year: number; month: number; day: number };
    date = `${d.year}-${String(d.month).padStart(2, "0")}-${String(d.day).padStart(2, "0")}`;
  }

  return {
    id: shortId,
    title: apiEvent.title as string,
    description: (apiEvent.description as string) || "",
    date,
    category,
    confidence,
    status: (apiEvent.status as SeedEvent["status"]) || "unverified",
  };
}

function transformApiLink(apiLink: Record<string, unknown>): SeedLink {
  return {
    id: (apiLink.short_id as string) || (apiLink.id as string),
    source:
      (apiLink.source_short_id as string) ||
      (apiLink.source_event_id as string) ||
      (apiLink.source as string),
    target:
      (apiLink.target_short_id as string) ||
      (apiLink.target_event_id as string) ||
      (apiLink.target as string),
    confidence:
      typeof apiLink.confidence === "number" && apiLink.confidence <= 1
        ? Math.round(apiLink.confidence * 100)
        : (apiLink.confidence as number) ?? 0,
    mechanism: (apiLink.description as string) || (apiLink.mechanism as string) || "",
    causalType: (apiLink.causal_type as SeedLink["causalType"]) || "direct",
  };
}

function transformApiPrediction(
  apiPred: Record<string, unknown>
): SeedPrediction {
  const shortId =
    (apiPred.short_id as string) || (apiPred.id as string);
  const statusMap: Record<string, SeedPrediction["status"]> = {
    open: "active",
    active: "active",
    settled: "settled",
    expired: "expired",
    closed: "settled",
  };

  return {
    id: shortId,
    question: apiPred.question as string,
    yesPool: (apiPred.yes_pool as number) ?? 0,
    noPool: (apiPred.no_pool as number) ?? 0,
    deadline: ((apiPred.closes_at as string) || (apiPred.deadline as string) || "").slice(0, 10),
    status: statusMap[apiPred.status as string] || "active",
    settlementCriteria:
      (apiPred.settlement_criteria as string) ||
      (apiPred.description as string) ||
      undefined,
  };
}

function transformApiNarrative(
  apiNar: Record<string, unknown>
): SeedNarrative {
  const shortId =
    (apiNar.short_id as string) || (apiNar.id as string);

  // Claims may come as parsed array or JSON string
  let claims: SeedNarrativeClaim[] = [];
  const rawClaims = apiNar.claims;
  if (Array.isArray(rawClaims)) {
    claims = rawClaims.map((c: Record<string, unknown>) => ({
      text: c.text as string,
      status: c.status as SeedNarrativeClaim["status"],
      confidence:
        typeof c.confidence === "number" && c.confidence <= 1
          ? Math.round(c.confidence * 100)
          : (c.confidence as number) ?? 0,
    }));
  }

  return {
    id: shortId,
    title: apiNar.title as string,
    source: (apiNar.source_name as string) || "",
    sourceType: (apiNar.source_type as SeedNarrative["sourceType"]) || "media",
    framing: (apiNar.framing as string) || "",
    claims,
    missingContext: (apiNar.missing_context as string[]) || undefined,
    sources: (apiNar.source_refs as string[]) || undefined,
  };
}

function transformApiClaim(apiClaim: Record<string, unknown>): SeedClaim {
  const shortId =
    (apiClaim.short_id as string) || (apiClaim.id as string);
  const confidence = apiClaim.confidence as number;

  return {
    id: shortId,
    text: apiClaim.text as string,
    status: (apiClaim.status as SeedClaim["status"]) || "unverified",
    confidence:
      typeof confidence === "number" && confidence <= 1
        ? Math.round(confidence * 100)
        : confidence ?? 0,
    sourcesFor: (apiClaim.sources_for as number) ?? 0,
    sourcesAgainst: (apiClaim.sources_against as number) ?? 0,
  };
}

// ---------------------------------------------------------------------------
// Data fetching functions
// ---------------------------------------------------------------------------

export async function getEvents(): Promise<SeedEvent[]> {
  try {
    const res = await fetch(`${API_URL}/events?page_size=100`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) throw new Error(`${res.status}`);
    const data = await res.json();
    const items = data.items || data;
    if (!Array.isArray(items) || items.length === 0) throw new Error("empty");
    return items.map(transformApiEvent);
  } catch {
    return seedEvents as SeedEvent[];
  }
}

export async function getEvent(id: string): Promise<SeedEvent | undefined> {
  const events = await getEvents();
  return events.find((e) => e.id === id);
}

export async function getLinks(): Promise<SeedLink[]> {
  try {
    const res = await fetch(`${API_URL}/events/links?page_size=100`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) throw new Error(`${res.status}`);
    const data = await res.json();
    const items = data.items || data;
    if (!Array.isArray(items) || items.length === 0) throw new Error("empty");
    return items.map(transformApiLink);
  } catch {
    return seedLinks as SeedLink[];
  }
}

export async function getLinksForEvent(eventId: string): Promise<SeedLink[]> {
  const allLinks = await getLinks();
  return allLinks.filter(
    (l) => l.source === eventId || l.target === eventId
  );
}

export async function getAgreement(): Promise<SeedAgreement> {
  try {
    const res = await fetch(`${API_URL}/agreements`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) throw new Error(`${res.status}`);
    const data = await res.json();
    const items = data.items || data;
    if (!Array.isArray(items) || items.length === 0) throw new Error("empty");
    // Return the first agreement (our tariff scenario)
    return items[0] as SeedAgreement;
  } catch {
    return seedAgreement as SeedAgreement;
  }
}

export async function getPredictions(): Promise<SeedPrediction[]> {
  try {
    const res = await fetch(`${API_URL}/predictions`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) throw new Error(`${res.status}`);
    const data = await res.json();
    const items = data.items || data;
    if (!Array.isArray(items) || items.length === 0) throw new Error("empty");
    return items.map(transformApiPrediction);
  } catch {
    return seedPredictions as SeedPrediction[];
  }
}

export async function getNarratives(): Promise<SeedNarrative[]> {
  try {
    const res = await fetch(`${API_URL}/narratives`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) throw new Error(`${res.status}`);
    const data = await res.json();
    const items = data.items || data;
    if (!Array.isArray(items) || items.length === 0) throw new Error("empty");
    return items.map(transformApiNarrative);
  } catch {
    return seedNarratives as SeedNarrative[];
  }
}

export async function getClaims(): Promise<SeedClaim[]> {
  try {
    const res = await fetch(`${API_URL}/claims`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) throw new Error(`${res.status}`);
    const data = await res.json();
    const items = data.items || data;
    if (!Array.isArray(items) || items.length === 0) throw new Error("empty");
    return items.map(transformApiClaim);
  } catch {
    return seedClaims as SeedClaim[];
  }
}
