/**
 * Data access layer — API calls with static JSON fallback.
 *
 * All pages should use these functions instead of importing seed JSON directly.
 * When the backend API is available, data is fetched via HTTP and transformed
 * to match the frontend shape. When unavailable, we fall back to the static
 * seed JSON files (same data, zero downtime).
 */

// Tariff scenario seed data
import seedEvents from "@/data/seed/tariff-events.json";
import seedLinks from "@/data/seed/tariff-links.json";
import seedAgreement from "@/data/seed/tariff-agreement.json";
import seedPredictions from "@/data/seed/tariff-predictions.json";
import seedNarratives from "@/data/seed/tariff-narratives.json";
import seedClaims from "@/data/seed/tariff-claims.json";

// Iran scenario seed data
import iranEvents from "@/data/seed/iran-events.json";
import iranLinks from "@/data/seed/iran-links.json";
import iranAgreement from "@/data/seed/iran-agreement.json";
import iranPredictions from "@/data/seed/iran-predictions.json";
import iranNarratives from "@/data/seed/iran-narratives.json";
import iranClaims from "@/data/seed/iran-claims.json";

// Ukraine scenario seed data
import ukraineEvents from "@/data/seed/ukraine-events.json";
import ukraineLinks from "@/data/seed/ukraine-links.json";
import ukraineAgreement from "@/data/seed/ukraine-agreement.json";
import ukrainePredictions from "@/data/seed/ukraine-predictions.json";
import ukraineNarratives from "@/data/seed/ukraine-narratives.json";
import ukraineClaims from "@/data/seed/ukraine-claims.json";

// Tech War scenario seed data
import techwarEvents from "@/data/seed/techwar-events.json";
import techwarLinks from "@/data/seed/techwar-links.json";
import techwarAgreement from "@/data/seed/techwar-agreement.json";
import techwarPredictions from "@/data/seed/techwar-predictions.json";
import techwarNarratives from "@/data/seed/techwar-narratives.json";
import techwarClaims from "@/data/seed/techwar-claims.json";

// North Korea scenario seed data
import nkoreaEvents from "@/data/seed/nkorea-events.json";
import nkoreaLinks from "@/data/seed/nkorea-links.json";
import nkoreaAgreement from "@/data/seed/nkorea-agreement.json";
import nkoreaPredictions from "@/data/seed/nkorea-predictions.json";
import nkoreaNarratives from "@/data/seed/nkorea-narratives.json";
import nkoreaClaims from "@/data/seed/nkorea-claims.json";

// Taiwan scenario seed data
import taiwanEvents from "@/data/seed/taiwan-events.json";
import taiwanLinks from "@/data/seed/taiwan-links.json";
import taiwanAgreement from "@/data/seed/taiwan-agreement.json";
import taiwanPredictions from "@/data/seed/taiwan-predictions.json";
import taiwanNarratives from "@/data/seed/taiwan-narratives.json";
import taiwanClaims from "@/data/seed/taiwan-claims.json";

// Syria scenario seed data
import syriaEvents from "@/data/seed/syria-events.json";
import syriaLinks from "@/data/seed/syria-links.json";
import syriaAgreement from "@/data/seed/syria-agreement.json";
import syriaPredictions from "@/data/seed/syria-predictions.json";
import syriaNarratives from "@/data/seed/syria-narratives.json";
import syriaClaims from "@/data/seed/syria-claims.json";

// Brexit scenario seed data
import brexitEvents from "@/data/seed/brexit-events.json";
import brexitLinks from "@/data/seed/brexit-links.json";
import brexitAgreement from "@/data/seed/brexit-agreement.json";
import brexitPredictions from "@/data/seed/brexit-predictions.json";
import brexitNarratives from "@/data/seed/brexit-narratives.json";
import brexitClaims from "@/data/seed/brexit-claims.json";

// Afghanistan scenario seed data
import afghanEvents from "@/data/seed/afghan-events.json";
import afghanLinks from "@/data/seed/afghan-links.json";
import afghanAgreement from "@/data/seed/afghan-agreement.json";
import afghanPredictions from "@/data/seed/afghan-predictions.json";
import afghanNarratives from "@/data/seed/afghan-narratives.json";
import afghanClaims from "@/data/seed/afghan-claims.json";

// Iraq scenario seed data
import iraqEvents from "@/data/seed/iraq-events.json";
import iraqLinks from "@/data/seed/iraq-links.json";
import iraqAgreement from "@/data/seed/iraq-agreement.json";
import iraqPredictions from "@/data/seed/iraq-predictions.json";
import iraqNarratives from "@/data/seed/iraq-narratives.json";
import iraqClaims from "@/data/seed/iraq-claims.json";

// Arab Spring scenario seed data
import arabspringEvents from "@/data/seed/arabspring-events.json";
import arabspringLinks from "@/data/seed/arabspring-links.json";
import arabspringAgreement from "@/data/seed/arabspring-agreement.json";
import arabspringPredictions from "@/data/seed/arabspring-predictions.json";
import arabspringNarratives from "@/data/seed/arabspring-narratives.json";
import arabspringClaims from "@/data/seed/arabspring-claims.json";

// Yugoslavia scenario seed data
import yugoEvents from "@/data/seed/yugo-events.json";
import yugoLinks from "@/data/seed/yugo-links.json";
import yugoAgreement from "@/data/seed/yugo-agreement.json";
import yugoPredictions from "@/data/seed/yugo-predictions.json";
import yugoNarratives from "@/data/seed/yugo-narratives.json";
import yugoClaims from "@/data/seed/yugo-claims.json";

// Rwanda scenario seed data
import rwandaEvents from "@/data/seed/rwanda-events.json";
import rwandaLinks from "@/data/seed/rwanda-links.json";
import rwandaAgreement from "@/data/seed/rwanda-agreement.json";
import rwandaPredictions from "@/data/seed/rwanda-predictions.json";
import rwandaNarratives from "@/data/seed/rwanda-narratives.json";
import rwandaClaims from "@/data/seed/rwanda-claims.json";

// Cuba scenario seed data
import cubaEvents from "@/data/seed/cuba-events.json";
import cubaLinks from "@/data/seed/cuba-links.json";
import cubaAgreement from "@/data/seed/cuba-agreement.json";
import cubaPredictions from "@/data/seed/cuba-predictions.json";
import cubaNarratives from "@/data/seed/cuba-narratives.json";
import cubaClaims from "@/data/seed/cuba-claims.json";

// Soviet scenario seed data
import sovietEvents from "@/data/seed/soviet-events.json";
import sovietLinks from "@/data/seed/soviet-links.json";
import sovietAgreement from "@/data/seed/soviet-agreement.json";
import sovietPredictions from "@/data/seed/soviet-predictions.json";
import sovietNarratives from "@/data/seed/soviet-narratives.json";
import sovietClaims from "@/data/seed/soviet-claims.json";

// Vietnam scenario seed data
import vietnamEvents from "@/data/seed/vietnam-events.json";
import vietnamLinks from "@/data/seed/vietnam-links.json";
import vietnamAgreement from "@/data/seed/vietnam-agreement.json";
import vietnamPredictions from "@/data/seed/vietnam-predictions.json";
import vietnamNarratives from "@/data/seed/vietnam-narratives.json";
import vietnamClaims from "@/data/seed/vietnam-claims.json";

// Korea scenario seed data
import koreaEvents from "@/data/seed/korea-events.json";
import koreaLinks from "@/data/seed/korea-links.json";
import koreaAgreement from "@/data/seed/korea-agreement.json";
import koreaPredictions from "@/data/seed/korea-predictions.json";
import koreaNarratives from "@/data/seed/korea-narratives.json";
import koreaClaims from "@/data/seed/korea-claims.json";

// Iran Revolution scenario seed data
import iranrevEvents from "@/data/seed/iranrev-events.json";
import iranrevLinks from "@/data/seed/iranrev-links.json";
import iranrevAgreement from "@/data/seed/iranrev-agreement.json";
import iranrevPredictions from "@/data/seed/iranrev-predictions.json";
import iranrevNarratives from "@/data/seed/iranrev-narratives.json";
import iranrevClaims from "@/data/seed/iranrev-claims.json";

// Market impact seed data
import seedMarketImpacts from "@/data/seed/tariff-market-impacts.json";
import iranMarketImpacts from "@/data/seed/iran-market-impacts.json";
import ukraineMarketImpacts from "@/data/seed/ukraine-market-impacts.json";
import techwarMarketImpacts from "@/data/seed/techwar-market-impacts.json";
import nkoreaMarketImpacts from "@/data/seed/nkorea-market-impacts.json";
import taiwanMarketImpacts from "@/data/seed/taiwan-market-impacts.json";
import syriaMarketImpacts from "@/data/seed/syria-market-impacts.json";
import brexitMarketImpacts from "@/data/seed/brexit-market-impacts.json";
import afghanMarketImpacts from "@/data/seed/afghan-market-impacts.json";
import iraqMarketImpacts from "@/data/seed/iraq-market-impacts.json";
import arabspringMarketImpacts from "@/data/seed/arabspring-market-impacts.json";
import yugoMarketImpacts from "@/data/seed/yugo-market-impacts.json";
import rwandaMarketImpacts from "@/data/seed/rwanda-market-impacts.json";
import cubaMarketImpacts from "@/data/seed/cuba-market-impacts.json";
import sovietMarketImpacts from "@/data/seed/soviet-market-impacts.json";
import vietnamMarketImpacts from "@/data/seed/vietnam-market-impacts.json";
import koreaMarketImpacts from "@/data/seed/korea-market-impacts.json";
import iranrevMarketImpacts from "@/data/seed/iranrev-market-impacts.json";

const FETCH_TIMEOUT_MS = 3_000; // API 3초 타임아웃 → seed 폴백

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

export interface SeedStockImpact {
  ticker: string;
  name: string;
  exchange: string;
  direction: "positive" | "negative" | "neutral";
  reasoning: string;
  // Actual outcome
  actualChange?: number;
  actualPeriod?: string;
  actualReasoning?: string;
}

export interface SeedSectorImpact {
  sector: string;
  direction: "positive" | "negative" | "neutral";
  magnitude: "high" | "medium" | "low";
  reasoning: string;
  region: "KR" | "US" | "GLOBAL";
  stocks: SeedStockImpact[];
  // Actual outcome
  actualDirection?: "positive" | "negative" | "neutral";
  actualMagnitude?: "high" | "medium" | "low";
  actualReasoning?: string;
}

export interface SeedMarketImpact {
  id: string;
  eventId: string;
  summary: string;
  analysisDate: string;
  sectors: SeedSectorImpact[];
  // Actual outcome
  actualSummary?: string;
  actualDate?: string;
  predictionAccuracy?: number;
}

// ---------------------------------------------------------------------------
// Scenario system
// ---------------------------------------------------------------------------

export type ScenarioId = "tariff" | "iran" | "ukraine" | "techwar" | "nkorea" | "taiwan" | "syria" | "brexit" | "afghan" | "iraq" | "arabspring" | "yugo" | "rwanda" | "cuba" | "soviet" | "vietnam" | "korea" | "iranrev";

export interface Scenario {
  id: ScenarioId;
  title: string;
  flag: string;
  description: string;
  dateRange: string;
}

export const SCENARIOS: Scenario[] = [
  {
    id: "tariff",
    title: "한미 관세 분쟁",
    flag: "🇰🇷🇺🇸",
    description: "한미 관세 협정 위반과 보복 조치",
    dateRange: "2025.01 - 2025.06",
  },
  {
    id: "iran",
    title: "이란-이스라엘 갈등",
    flag: "🇮🇷🇮🇱",
    description: "하마스 10.7 공격부터 하메네이 사살까지",
    dateRange: "2023.10 - 2026.03",
  },
  {
    id: "ukraine",
    title: "러시아-우크라이나 전쟁",
    flag: "🇺🇦🇷🇺",
    description: "부다페스트 각서부터 전면 침공까지의 인과관계",
    dateRange: "1994.12 - 2024.06",
  },
  {
    id: "techwar",
    title: "미중 기술 패권 전쟁",
    flag: "🇺🇸🇨🇳",
    description: "WTO 가입부터 DeepSeek 충격까지의 반도체·AI 패권 경쟁",
    dateRange: "2001.12 - 2025.01",
  },
  {
    id: "nkorea",
    title: "북한 핵 위기",
    flag: "🇰🇷🇰🇵",
    description: "한국전쟁부터 적대적 2국가 선언까지 70년 핵 위기의 인과관계",
    dateRange: "1950.06 - 2024.01",
  },
  {
    id: "taiwan",
    title: "대만 해협 위기",
    flag: "🇹🇼🇨🇳",
    description: "국공내전부터 연합이검 봉쇄 훈련까지 75년 양안 위기의 인과관계",
    dateRange: "1949.12 - 2024.10",
  },
  {
    id: "syria",
    title: "시리아 내전",
    flag: "🇸🇾",
    description: "하페즈 알아사드 집권부터 아사드 정권 붕괴까지 50년 내전의 인과관계",
    dateRange: "1970.11 - 2024.12",
  },
  {
    id: "brexit",
    title: "브렉시트",
    flag: "🇬🇧🇪🇺",
    description: "EEC 가입부터 EU 탈퇴·TCA 발효까지 50년 유럽 통합과 역행의 인과관계",
    dateRange: "1973.01 - 2024.07",
  },
  {
    id: "afghan",
    title: "아프가니스탄 전쟁",
    flag: "🇦🇫",
    description: "소련 침공부터 미군 철수까지 42년 '제국의 무덤' 인과관계",
    dateRange: "1979.12 - 2021.08",
  },
  {
    id: "iraq",
    title: "이라크 전쟁",
    flag: "🇮🇶",
    description: "걸프전부터 ISIS 격퇴·미군 전투임무 종료까지 31년 인과관계",
    dateRange: "1990.08 - 2021.12",
  },
  {
    id: "arabspring",
    title: "아랍의 봄",
    flag: "🌍",
    description: "부아지지 분신부터 유럽 난민 위기까지 중동·북아프리카 도미노 혁명의 인과관계",
    dateRange: "2010.12 - 2015.09",
  },
  {
    id: "yugo",
    title: "유고슬라비아 전쟁",
    flag: "🇷🇸🇧🇦",
    description: "유고 해체부터 보스니아·코소보 전쟁·NATO 공습·코소보 독립까지 17년 인과관계",
    dateRange: "1991.06 - 2008.02",
  },
  {
    id: "rwanda",
    title: "르완다 대학살",
    flag: "🇷🇼",
    description: "RPF 침공부터 100일 대학살·난민 위기·콩고 전쟁 파급까지 13년 인과관계",
    dateRange: "1990.10 - 2003.07",
  },
  {
    id: "cuba",
    title: "쿠바 미사일 위기",
    flag: "🇨🇺🇺🇸",
    description: "피그만 침공부터 핵전쟁 직전 13일·미사일 철수·핫라인·NPT까지 냉전 최대 핵위기의 인과관계",
    dateRange: "1961.04 - 1968.07",
  },
  {
    id: "soviet",
    title: "소련 붕괴",
    flag: "🇷🇺",
    description: "고르바초프 개혁부터 체르노빌·베를린 장벽·8월 쿠데타·소련 해체·부다페스트 각서까지 냉전 종식의 인과관계",
    dateRange: "1985.03 - 1994.12",
  },
  {
    id: "vietnam",
    title: "베트남 전쟁",
    flag: "🇻🇳🇺🇸",
    description: "통킹만 사건부터 테트 공세·파리평화협정·사이공 함락·전쟁권한법까지 미국 외교정책 전환점",
    dateRange: "1964.08 - 1975.04",
  },
  {
    id: "korea",
    title: "한국전쟁",
    flag: "🇰🇷🇰🇵",
    description: "38선 분단부터 북한 남침·인천상륙·중공군 참전·정전협정·한미동맹까지 한반도 분단의 기원",
    dateRange: "1945.09 - 1953.10",
  },
  {
    id: "iranrev",
    title: "이란 혁명",
    flag: "🇮🇷",
    description: "CIA 쿠데타부터 이슬람 혁명·미 대사관 인질·이란-이라크 전쟁·전쟁 종결까지 이란 현대사의 기원",
    dateRange: "1953 - 1988",
  },
];

interface ScenarioSeedData {
  events: SeedEvent[];
  links: SeedLink[];
  agreement: SeedAgreement;
  predictions: SeedPrediction[];
  narratives: SeedNarrative[];
  claims: SeedClaim[];
  marketImpacts: SeedMarketImpact[];
}

const SEED_DATA: Record<ScenarioId, ScenarioSeedData> = {
  tariff: {
    events: seedEvents as SeedEvent[],
    links: seedLinks as SeedLink[],
    agreement: seedAgreement as SeedAgreement,
    predictions: seedPredictions as SeedPrediction[],
    narratives: seedNarratives as SeedNarrative[],
    claims: seedClaims as SeedClaim[],
    marketImpacts: seedMarketImpacts as SeedMarketImpact[],
  },
  iran: {
    events: iranEvents as SeedEvent[],
    links: iranLinks as SeedLink[],
    agreement: iranAgreement as SeedAgreement,
    predictions: iranPredictions as SeedPrediction[],
    narratives: iranNarratives as SeedNarrative[],
    claims: iranClaims as SeedClaim[],
    marketImpacts: iranMarketImpacts as SeedMarketImpact[],
  },
  ukraine: {
    events: ukraineEvents as SeedEvent[],
    links: ukraineLinks as SeedLink[],
    agreement: ukraineAgreement as SeedAgreement,
    predictions: ukrainePredictions as SeedPrediction[],
    narratives: ukraineNarratives as SeedNarrative[],
    claims: ukraineClaims as SeedClaim[],
    marketImpacts: ukraineMarketImpacts as SeedMarketImpact[],
  },
  techwar: {
    events: techwarEvents as SeedEvent[],
    links: techwarLinks as SeedLink[],
    agreement: techwarAgreement as SeedAgreement,
    predictions: techwarPredictions as SeedPrediction[],
    narratives: techwarNarratives as SeedNarrative[],
    claims: techwarClaims as SeedClaim[],
    marketImpacts: techwarMarketImpacts as SeedMarketImpact[],
  },
  nkorea: {
    events: nkoreaEvents as SeedEvent[],
    links: nkoreaLinks as SeedLink[],
    agreement: nkoreaAgreement as SeedAgreement,
    predictions: nkoreaPredictions as SeedPrediction[],
    narratives: nkoreaNarratives as SeedNarrative[],
    claims: nkoreaClaims as SeedClaim[],
    marketImpacts: nkoreaMarketImpacts as SeedMarketImpact[],
  },
  taiwan: {
    events: taiwanEvents as SeedEvent[],
    links: taiwanLinks as SeedLink[],
    agreement: taiwanAgreement as SeedAgreement,
    predictions: taiwanPredictions as SeedPrediction[],
    narratives: taiwanNarratives as SeedNarrative[],
    claims: taiwanClaims as SeedClaim[],
    marketImpacts: taiwanMarketImpacts as SeedMarketImpact[],
  },
  syria: {
    events: syriaEvents as SeedEvent[],
    links: syriaLinks as SeedLink[],
    agreement: syriaAgreement as SeedAgreement,
    predictions: syriaPredictions as SeedPrediction[],
    narratives: syriaNarratives as SeedNarrative[],
    claims: syriaClaims as SeedClaim[],
    marketImpacts: syriaMarketImpacts as SeedMarketImpact[],
  },
  brexit: {
    events: brexitEvents as SeedEvent[],
    links: brexitLinks as SeedLink[],
    agreement: brexitAgreement as SeedAgreement,
    predictions: brexitPredictions as SeedPrediction[],
    narratives: brexitNarratives as SeedNarrative[],
    claims: brexitClaims as SeedClaim[],
    marketImpacts: brexitMarketImpacts as SeedMarketImpact[],
  },
  afghan: {
    events: afghanEvents as SeedEvent[],
    links: afghanLinks as SeedLink[],
    agreement: afghanAgreement as SeedAgreement,
    predictions: afghanPredictions as SeedPrediction[],
    narratives: afghanNarratives as SeedNarrative[],
    claims: afghanClaims as SeedClaim[],
    marketImpacts: afghanMarketImpacts as SeedMarketImpact[],
  },
  iraq: {
    events: iraqEvents as SeedEvent[],
    links: iraqLinks as SeedLink[],
    agreement: iraqAgreement as SeedAgreement,
    predictions: iraqPredictions as SeedPrediction[],
    narratives: iraqNarratives as SeedNarrative[],
    claims: iraqClaims as SeedClaim[],
    marketImpacts: iraqMarketImpacts as SeedMarketImpact[],
  },
  arabspring: {
    events: arabspringEvents as SeedEvent[],
    links: arabspringLinks as SeedLink[],
    agreement: arabspringAgreement as SeedAgreement,
    predictions: arabspringPredictions as SeedPrediction[],
    narratives: arabspringNarratives as SeedNarrative[],
    claims: arabspringClaims as SeedClaim[],
    marketImpacts: arabspringMarketImpacts as SeedMarketImpact[],
  },
  yugo: {
    events: yugoEvents as SeedEvent[],
    links: yugoLinks as SeedLink[],
    agreement: yugoAgreement as SeedAgreement,
    predictions: yugoPredictions as SeedPrediction[],
    narratives: yugoNarratives as SeedNarrative[],
    claims: yugoClaims as SeedClaim[],
    marketImpacts: yugoMarketImpacts as SeedMarketImpact[],
  },
  rwanda: {
    events: rwandaEvents as SeedEvent[],
    links: rwandaLinks as SeedLink[],
    agreement: rwandaAgreement as SeedAgreement,
    predictions: rwandaPredictions as SeedPrediction[],
    narratives: rwandaNarratives as SeedNarrative[],
    claims: rwandaClaims as SeedClaim[],
    marketImpacts: rwandaMarketImpacts as SeedMarketImpact[],
  },
  cuba: {
    events: cubaEvents as SeedEvent[],
    links: cubaLinks as SeedLink[],
    agreement: cubaAgreement as SeedAgreement,
    predictions: cubaPredictions as SeedPrediction[],
    narratives: cubaNarratives as SeedNarrative[],
    claims: cubaClaims as SeedClaim[],
    marketImpacts: cubaMarketImpacts as SeedMarketImpact[],
  },
  soviet: {
    events: sovietEvents as SeedEvent[],
    links: sovietLinks as SeedLink[],
    agreement: sovietAgreement as SeedAgreement,
    predictions: sovietPredictions as SeedPrediction[],
    narratives: sovietNarratives as SeedNarrative[],
    claims: sovietClaims as SeedClaim[],
    marketImpacts: sovietMarketImpacts as SeedMarketImpact[],
  },
  vietnam: {
    events: vietnamEvents as SeedEvent[],
    links: vietnamLinks as SeedLink[],
    agreement: vietnamAgreement as SeedAgreement,
    predictions: vietnamPredictions as SeedPrediction[],
    narratives: vietnamNarratives as SeedNarrative[],
    claims: vietnamClaims as SeedClaim[],
    marketImpacts: vietnamMarketImpacts as SeedMarketImpact[],
  },
  korea: {
    events: koreaEvents as SeedEvent[],
    links: koreaLinks as SeedLink[],
    agreement: koreaAgreement as SeedAgreement,
    predictions: koreaPredictions as SeedPrediction[],
    narratives: koreaNarratives as SeedNarrative[],
    claims: koreaClaims as SeedClaim[],
    marketImpacts: koreaMarketImpacts as SeedMarketImpact[],
  },
  iranrev: {
    events: iranrevEvents as SeedEvent[],
    links: iranrevLinks as SeedLink[],
    agreement: iranrevAgreement as SeedAgreement,
    predictions: iranrevPredictions as SeedPrediction[],
    narratives: iranrevNarratives as SeedNarrative[],
    claims: iranrevClaims as SeedClaim[],
    marketImpacts: iranrevMarketImpacts as SeedMarketImpact[],
  },
};

export function detectScenario(eventId: string): ScenarioId {
  if (eventId.startsWith("ievt-") || eventId.startsWith("ilink-") || eventId.startsWith("ipred-") || eventId.startsWith("inar-") || eventId.startsWith("iclm-") || eventId.startsWith("agr-iran") || eventId.startsWith("imi-")) {
    return "iran";
  }
  if (eventId.startsWith("uevt-") || eventId.startsWith("ulink-") || eventId.startsWith("upred-") || eventId.startsWith("unar-") || eventId.startsWith("uclm-") || eventId.startsWith("agr-ukraine") || eventId.startsWith("umi-") || eventId.startsWith("uobl-")) {
    return "ukraine";
  }
  if (eventId.startsWith("twevt-") || eventId.startsWith("twlink-") || eventId.startsWith("twpred-") || eventId.startsWith("twnar-") || eventId.startsWith("twclm-") || eventId.startsWith("agr-techwar") || eventId.startsWith("twmi-") || eventId.startsWith("twobl-")) {
    return "techwar";
  }
  if (eventId.startsWith("nkevt-") || eventId.startsWith("nklink-") || eventId.startsWith("nkpred-") || eventId.startsWith("nknar-") || eventId.startsWith("nkclm-") || eventId.startsWith("agr-nkorea") || eventId.startsWith("nkmi-") || eventId.startsWith("nkobl-")) {
    return "nkorea";
  }
  if (eventId.startsWith("taievt-") || eventId.startsWith("tailink-") || eventId.startsWith("taipred-") || eventId.startsWith("tainar-") || eventId.startsWith("taiclm-") || eventId.startsWith("agr-taiwan") || eventId.startsWith("taimi-") || eventId.startsWith("taiobl-")) {
    return "taiwan";
  }
  if (eventId.startsWith("syevt-") || eventId.startsWith("sylink-") || eventId.startsWith("sypred-") || eventId.startsWith("synar-") || eventId.startsWith("syclm-") || eventId.startsWith("agr-syria") || eventId.startsWith("symi-") || eventId.startsWith("syobl-")) {
    return "syria";
  }
  if (eventId.startsWith("bxevt-") || eventId.startsWith("bxlink-") || eventId.startsWith("bxpred-") || eventId.startsWith("bxnar-") || eventId.startsWith("bxclm-") || eventId.startsWith("agr-brexit") || eventId.startsWith("bxmi-") || eventId.startsWith("bxobl-")) {
    return "brexit";
  }
  if (eventId.startsWith("afevt-") || eventId.startsWith("aflink-") || eventId.startsWith("afpred-") || eventId.startsWith("afnar-") || eventId.startsWith("afclm-") || eventId.startsWith("agr-afghan") || eventId.startsWith("afmi-") || eventId.startsWith("afobl-")) {
    return "afghan";
  }
  if (eventId.startsWith("iqevt-") || eventId.startsWith("iqlink-") || eventId.startsWith("iqpred-") || eventId.startsWith("iqnar-") || eventId.startsWith("iqclm-") || eventId.startsWith("agr-iraq") || eventId.startsWith("iqmi-") || eventId.startsWith("iqobl-")) {
    return "iraq";
  }
  if (eventId.startsWith("asevt-") || eventId.startsWith("aslink-") || eventId.startsWith("aspred-") || eventId.startsWith("asnar-") || eventId.startsWith("asclm-") || eventId.startsWith("agr-arabspring") || eventId.startsWith("asmi-") || eventId.startsWith("asobl-")) {
    return "arabspring";
  }
  if (eventId.startsWith("ygevt-") || eventId.startsWith("yglink-") || eventId.startsWith("ygpred-") || eventId.startsWith("ygnar-") || eventId.startsWith("ygclm-") || eventId.startsWith("agr-yugo") || eventId.startsWith("ygmi-") || eventId.startsWith("ygobl-")) {
    return "yugo";
  }
  if (eventId.startsWith("rwevt-") || eventId.startsWith("rwlink-") || eventId.startsWith("rwpred-") || eventId.startsWith("rwnar-") || eventId.startsWith("rwclm-") || eventId.startsWith("agr-rwanda") || eventId.startsWith("rwmi-") || eventId.startsWith("rwobl-")) {
    return "rwanda";
  }
  if (eventId.startsWith("cbevt-") || eventId.startsWith("cblink-") || eventId.startsWith("cbpred-") || eventId.startsWith("cbnar-") || eventId.startsWith("cbclm-") || eventId.startsWith("agr-cuba") || eventId.startsWith("cbmi-") || eventId.startsWith("cbobl-")) {
    return "cuba";
  }
  if (eventId.startsWith("svevt-") || eventId.startsWith("svlink-") || eventId.startsWith("svpred-") || eventId.startsWith("svnar-") || eventId.startsWith("svclm-") || eventId.startsWith("agr-soviet") || eventId.startsWith("svmi-") || eventId.startsWith("svobl-")) {
    return "soviet";
  }
  if (eventId.startsWith("vnevt-") || eventId.startsWith("vnlink-") || eventId.startsWith("vnpred-") || eventId.startsWith("vnnar-") || eventId.startsWith("vnclm-") || eventId.startsWith("agr-vietnam") || eventId.startsWith("vnmi-") || eventId.startsWith("vnobl-")) {
    return "vietnam";
  }
  if (eventId.startsWith("krevt-") || eventId.startsWith("krlink-") || eventId.startsWith("krpred-") || eventId.startsWith("krnar-") || eventId.startsWith("krclm-") || eventId.startsWith("agr-korea") || eventId.startsWith("krmi-") || eventId.startsWith("krobl-")) {
    return "korea";
  }
  if (eventId.startsWith("irvevt-") || eventId.startsWith("irvlink-") || eventId.startsWith("irvpred-") || eventId.startsWith("irvnar-") || eventId.startsWith("irvclm-") || eventId.startsWith("agr-iranrev") || eventId.startsWith("irvmi-") || eventId.startsWith("irvobl-")) {
    return "iranrev";
  }
  return "tariff";
}

// ---------------------------------------------------------------------------
// API URL
// ---------------------------------------------------------------------------

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1"; // keep local — server component can't import client-side api-client

// ---------------------------------------------------------------------------
// UUID ↔ Short ID mapping (must match backend seed_data.py)
// ---------------------------------------------------------------------------

// We keep a runtime lookup built lazily from seed data so that API responses
// (which use UUIDs) can be mapped back to short IDs used in frontend URLs.

const UUID_NAMESPACE = "a1b2c3d4-e5f6-7890-abcd-ef1234567890";

// Pre-build mappings from all seed data short IDs
const allShortIds = [
  // Tariff scenario
  ...seedEvents.map((e) => e.id),
  ...seedLinks.map((l) => l.id),
  seedAgreement.id,
  ...seedAgreement.parties.map((p) => p.id),
  ...seedAgreement.obligations.map((o) => o.id),
  ...seedPredictions.map((p) => p.id),
  ...seedNarratives.map((n) => n.id),
  ...seedClaims.map((c) => c.id),
  // Iran scenario
  ...iranEvents.map((e) => e.id),
  ...iranLinks.map((l) => l.id),
  iranAgreement.id,
  ...iranAgreement.parties.map((p) => p.id),
  ...iranAgreement.obligations.map((o) => o.id),
  ...iranPredictions.map((p) => p.id),
  ...iranNarratives.map((n) => n.id),
  ...iranClaims.map((c) => c.id),
  // Ukraine scenario
  ...ukraineEvents.map((e) => e.id),
  ...ukraineLinks.map((l) => l.id),
  ukraineAgreement.id,
  ...ukraineAgreement.parties.map((p) => p.id),
  ...ukraineAgreement.obligations.map((o) => o.id),
  ...ukrainePredictions.map((p) => p.id),
  ...ukraineNarratives.map((n) => n.id),
  ...ukraineClaims.map((c) => c.id),
  // Tech War scenario
  ...techwarEvents.map((e) => e.id),
  ...techwarLinks.map((l) => l.id),
  techwarAgreement.id,
  ...techwarAgreement.parties.map((p) => p.id),
  ...techwarAgreement.obligations.map((o) => o.id),
  ...techwarPredictions.map((p) => p.id),
  ...techwarNarratives.map((n) => n.id),
  ...techwarClaims.map((c) => c.id),
  // North Korea scenario
  ...nkoreaEvents.map((e) => e.id),
  ...nkoreaLinks.map((l) => l.id),
  nkoreaAgreement.id,
  ...nkoreaAgreement.parties.map((p) => p.id),
  ...nkoreaAgreement.obligations.map((o) => o.id),
  ...nkoreaPredictions.map((p) => p.id),
  ...nkoreaNarratives.map((n) => n.id),
  ...nkoreaClaims.map((c) => c.id),
  // Taiwan scenario
  ...taiwanEvents.map((e) => e.id),
  ...taiwanLinks.map((l) => l.id),
  taiwanAgreement.id,
  ...taiwanAgreement.parties.map((p) => p.id),
  ...taiwanAgreement.obligations.map((o) => o.id),
  ...taiwanPredictions.map((p) => p.id),
  ...taiwanNarratives.map((n) => n.id),
  ...taiwanClaims.map((c) => c.id),
  // Syria scenario
  ...syriaEvents.map((e) => e.id),
  ...syriaLinks.map((l) => l.id),
  syriaAgreement.id,
  ...syriaAgreement.parties.map((p) => p.id),
  ...syriaAgreement.obligations.map((o) => o.id),
  ...syriaPredictions.map((p) => p.id),
  ...syriaNarratives.map((n) => n.id),
  ...syriaClaims.map((c) => c.id),
  // Brexit scenario
  ...brexitEvents.map((e) => e.id),
  ...brexitLinks.map((l) => l.id),
  brexitAgreement.id,
  ...brexitAgreement.parties.map((p) => p.id),
  ...brexitAgreement.obligations.map((o) => o.id),
  ...brexitPredictions.map((p) => p.id),
  ...brexitNarratives.map((n) => n.id),
  ...brexitClaims.map((c) => c.id),
  // Afghanistan scenario
  ...afghanEvents.map((e) => e.id),
  ...afghanLinks.map((l) => l.id),
  afghanAgreement.id,
  ...afghanAgreement.parties.map((p) => p.id),
  ...afghanAgreement.obligations.map((o) => o.id),
  ...afghanPredictions.map((p) => p.id),
  ...afghanNarratives.map((n) => n.id),
  ...afghanClaims.map((c) => c.id),
  // Iraq scenario
  ...iraqEvents.map((e) => e.id),
  ...iraqLinks.map((l) => l.id),
  iraqAgreement.id,
  ...iraqAgreement.parties.map((p) => p.id),
  ...iraqAgreement.obligations.map((o) => o.id),
  ...iraqPredictions.map((p) => p.id),
  ...iraqNarratives.map((n) => n.id),
  ...iraqClaims.map((c) => c.id),
  // Arab Spring scenario
  ...arabspringEvents.map((e) => e.id),
  ...arabspringLinks.map((l) => l.id),
  arabspringAgreement.id,
  ...arabspringAgreement.parties.map((p) => p.id),
  ...arabspringAgreement.obligations.map((o) => o.id),
  ...arabspringPredictions.map((p) => p.id),
  ...arabspringNarratives.map((n) => n.id),
  ...arabspringClaims.map((c) => c.id),
  // Yugoslavia scenario
  ...yugoEvents.map((e) => e.id),
  ...yugoLinks.map((l) => l.id),
  yugoAgreement.id,
  ...yugoAgreement.parties.map((p) => p.id),
  ...yugoAgreement.obligations.map((o) => o.id),
  ...yugoPredictions.map((p) => p.id),
  ...yugoNarratives.map((n) => n.id),
  ...yugoClaims.map((c) => c.id),
  // Rwanda scenario
  ...rwandaEvents.map((e) => e.id),
  ...rwandaLinks.map((l) => l.id),
  rwandaAgreement.id,
  ...rwandaAgreement.parties.map((p) => p.id),
  ...rwandaAgreement.obligations.map((o) => o.id),
  ...rwandaPredictions.map((p) => p.id),
  ...rwandaNarratives.map((n) => n.id),
  ...rwandaClaims.map((c) => c.id),
  // Cuba scenario
  ...cubaEvents.map((e) => e.id),
  ...cubaLinks.map((l) => l.id),
  cubaAgreement.id,
  ...cubaAgreement.parties.map((p) => p.id),
  ...cubaAgreement.obligations.map((o) => o.id),
  ...cubaPredictions.map((p) => p.id),
  ...cubaNarratives.map((n) => n.id),
  ...cubaClaims.map((c) => c.id),
  // Soviet scenario
  ...sovietEvents.map((e) => e.id),
  ...sovietLinks.map((l) => l.id),
  sovietAgreement.id,
  ...sovietAgreement.parties.map((p) => p.id),
  ...sovietAgreement.obligations.map((o) => o.id),
  ...sovietPredictions.map((p) => p.id),
  ...sovietNarratives.map((n) => n.id),
  ...sovietClaims.map((c) => c.id),
  // Vietnam scenario
  ...vietnamEvents.map((e) => e.id),
  ...vietnamLinks.map((l) => l.id),
  vietnamAgreement.id,
  ...vietnamAgreement.parties.map((p: { id: string }) => p.id),
  ...vietnamAgreement.obligations.map((o: { id: string }) => o.id),
  ...vietnamPredictions.map((p) => p.id),
  ...vietnamNarratives.map((n) => n.id),
  ...vietnamClaims.map((c) => c.id),
  // Korea scenario
  ...koreaEvents.map((e) => e.id),
  ...koreaLinks.map((l) => l.id),
  koreaAgreement.id,
  ...koreaAgreement.parties.map((p: { id: string }) => p.id),
  ...koreaAgreement.obligations.map((o: { id: string }) => o.id),
  ...koreaPredictions.map((p) => p.id),
  ...koreaNarratives.map((n) => n.id),
  ...koreaClaims.map((c) => c.id),
  // Iran Revolution scenario
  ...iranrevEvents.map((e) => e.id),
  ...iranrevLinks.map((l) => l.id),
  iranrevAgreement.id,
  ...iranrevAgreement.parties.map((p: { id: string }) => p.id),
  ...iranrevAgreement.obligations.map((o: { id: string }) => o.id),
  ...iranrevPredictions.map((p) => p.id),
  ...iranrevNarratives.map((n) => n.id),
  ...iranrevClaims.map((c) => c.id),
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
// Scenario-aware data fetching
// ---------------------------------------------------------------------------

export async function getEventsForScenario(scenarioId: ScenarioId): Promise<SeedEvent[]> {
  try {
    const res = await fetch(`${API_URL}/events?page_size=100`, {
      next: { revalidate: 60 },
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
    });
    if (!res.ok) throw new Error(`${res.status}`);
    const data = await res.json();
    const items = data.items || data;
    if (!Array.isArray(items) || items.length === 0) throw new Error("empty");
    const all = items.map(transformApiEvent);
    const filtered = all.filter((e) => detectScenario(e.id) === scenarioId);
    if (filtered.length === 0) throw new Error("no events for scenario");
    return filtered;
  } catch {
    return SEED_DATA[scenarioId].events;
  }
}

export async function getLinksForScenario(scenarioId: ScenarioId): Promise<SeedLink[]> {
  try {
    const res = await fetch(`${API_URL}/events/links?page_size=100`, {
      next: { revalidate: 60 },
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
    });
    if (!res.ok) throw new Error(`${res.status}`);
    const data = await res.json();
    const items = data.items || data;
    if (!Array.isArray(items) || items.length === 0) throw new Error("empty");
    const all = items.map(transformApiLink);
    const filtered = all.filter((l) => detectScenario(l.source) === scenarioId);
    if (filtered.length === 0) throw new Error("no links for scenario");
    return filtered;
  } catch {
    return SEED_DATA[scenarioId].links;
  }
}

export async function getAgreementForScenario(scenarioId: ScenarioId): Promise<SeedAgreement> {
  return SEED_DATA[scenarioId].agreement;
}

export async function getPredictionsForScenario(scenarioId: ScenarioId): Promise<SeedPrediction[]> {
  try {
    const res = await fetch(`${API_URL}/predictions`, {
      next: { revalidate: 60 },
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
    });
    if (!res.ok) throw new Error(`${res.status}`);
    const data = await res.json();
    const items = data.items || data;
    if (!Array.isArray(items) || items.length === 0) throw new Error("empty");
    const all = items.map(transformApiPrediction);
    const filtered = all.filter((p) => detectScenario(p.id) === scenarioId);
    if (filtered.length === 0) throw new Error("no predictions for scenario");
    return filtered;
  } catch {
    return SEED_DATA[scenarioId].predictions;
  }
}

export async function getNarrativesForScenario(scenarioId: ScenarioId): Promise<SeedNarrative[]> {
  return SEED_DATA[scenarioId].narratives;
}

export async function getClaimsForScenario(scenarioId: ScenarioId): Promise<SeedClaim[]> {
  return SEED_DATA[scenarioId].claims;
}

export async function getMarketImpactsForScenario(scenarioId: ScenarioId): Promise<SeedMarketImpact[]> {
  try {
    const res = await fetch(`${API_URL}/market-impacts?page_size=100`, {
      next: { revalidate: 60 },
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
    });
    if (!res.ok) throw new Error(`${res.status}`);
    const data = await res.json();
    const items = data.items || data;
    if (!Array.isArray(items) || items.length === 0) throw new Error("empty");
    const filtered = items.filter((mi: SeedMarketImpact) => detectScenario(mi.id) === scenarioId);
    if (filtered.length === 0) throw new Error("no market impacts for scenario");
    return filtered;
  } catch {
    return SEED_DATA[scenarioId].marketImpacts;
  }
}

export async function getMarketImpactsForEvent(eventId: string): Promise<SeedMarketImpact[]> {
  const scenarioId = detectScenario(eventId);
  const all = await getMarketImpactsForScenario(scenarioId);
  return all.filter((mi) => mi.eventId === eventId);
}

// ---------------------------------------------------------------------------
// Backward-compatible data fetching (all scenarios combined)
// ---------------------------------------------------------------------------

export async function getEvents(): Promise<SeedEvent[]> {
  try {
    const res = await fetch(`${API_URL}/events?page_size=100`, {
      next: { revalidate: 60 },
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
    });
    if (!res.ok) throw new Error(`${res.status}`);
    const data = await res.json();
    const items = data.items || data;
    if (!Array.isArray(items) || items.length === 0) throw new Error("empty");
    return items.map(transformApiEvent);
  } catch {
    return [...(seedEvents as SeedEvent[]), ...(iranEvents as SeedEvent[]), ...(ukraineEvents as SeedEvent[]), ...(techwarEvents as SeedEvent[]), ...(nkoreaEvents as SeedEvent[]), ...(taiwanEvents as SeedEvent[]), ...(syriaEvents as SeedEvent[]), ...(brexitEvents as SeedEvent[]), ...(afghanEvents as SeedEvent[]), ...(iraqEvents as SeedEvent[]), ...(arabspringEvents as SeedEvent[]), ...(yugoEvents as SeedEvent[]), ...(rwandaEvents as SeedEvent[]), ...(cubaEvents as SeedEvent[]), ...(sovietEvents as SeedEvent[]), ...(vietnamEvents as SeedEvent[]), ...(koreaEvents as SeedEvent[]), ...(iranrevEvents as SeedEvent[])];
  }
}

export async function getEvent(id: string): Promise<SeedEvent | undefined> {
  const scenarioId = detectScenario(id);
  const events = await getEventsForScenario(scenarioId);
  return events.find((e) => e.id === id);
}

export async function getLinks(): Promise<SeedLink[]> {
  try {
    const res = await fetch(`${API_URL}/events/links?page_size=100`, {
      next: { revalidate: 60 },
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
    });
    if (!res.ok) throw new Error(`${res.status}`);
    const data = await res.json();
    const items = data.items || data;
    if (!Array.isArray(items) || items.length === 0) throw new Error("empty");
    return items.map(transformApiLink);
  } catch {
    return [...(seedLinks as SeedLink[]), ...(iranLinks as SeedLink[]), ...(ukraineLinks as SeedLink[]), ...(techwarLinks as SeedLink[]), ...(nkoreaLinks as SeedLink[]), ...(taiwanLinks as SeedLink[]), ...(syriaLinks as SeedLink[]), ...(brexitLinks as SeedLink[]), ...(afghanLinks as SeedLink[]), ...(iraqLinks as SeedLink[]), ...(arabspringLinks as SeedLink[]), ...(yugoLinks as SeedLink[]), ...(rwandaLinks as SeedLink[]), ...(cubaLinks as SeedLink[]), ...(sovietLinks as SeedLink[]), ...(vietnamLinks as SeedLink[]), ...(koreaLinks as SeedLink[]), ...(iranrevLinks as SeedLink[])];
  }
}

export async function getLinksForEvent(eventId: string): Promise<SeedLink[]> {
  const scenarioId = detectScenario(eventId);
  const links = await getLinksForScenario(scenarioId);
  return links.filter(
    (l) => l.source === eventId || l.target === eventId
  );
}

export async function getAgreement(): Promise<SeedAgreement> {
  try {
    const res = await fetch(`${API_URL}/agreements`, {
      next: { revalidate: 60 },
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
    });
    if (!res.ok) throw new Error(`${res.status}`);
    const data = await res.json();
    const items = data.items || data;
    if (!Array.isArray(items) || items.length === 0) throw new Error("empty");
    return items[0] as SeedAgreement;
  } catch {
    return seedAgreement as SeedAgreement;
  }
}

export async function getPredictions(): Promise<SeedPrediction[]> {
  try {
    const res = await fetch(`${API_URL}/predictions`, {
      next: { revalidate: 60 },
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
    });
    if (!res.ok) throw new Error(`${res.status}`);
    const data = await res.json();
    const items = data.items || data;
    if (!Array.isArray(items) || items.length === 0) throw new Error("empty");
    return items.map(transformApiPrediction);
  } catch {
    return [...(seedPredictions as SeedPrediction[]), ...(iranPredictions as SeedPrediction[]), ...(ukrainePredictions as SeedPrediction[]), ...(techwarPredictions as SeedPrediction[]), ...(nkoreaPredictions as SeedPrediction[]), ...(taiwanPredictions as SeedPrediction[]), ...(syriaPredictions as SeedPrediction[]), ...(brexitPredictions as SeedPrediction[]), ...(afghanPredictions as SeedPrediction[]), ...(iraqPredictions as SeedPrediction[]), ...(arabspringPredictions as SeedPrediction[]), ...(yugoPredictions as SeedPrediction[]), ...(rwandaPredictions as SeedPrediction[]), ...(cubaPredictions as SeedPrediction[]), ...(sovietPredictions as SeedPrediction[]), ...(vietnamPredictions as SeedPrediction[]), ...(koreaPredictions as SeedPrediction[]), ...(iranrevPredictions as SeedPrediction[])];
  }
}

export async function getNarratives(): Promise<SeedNarrative[]> {
  try {
    const res = await fetch(`${API_URL}/narratives`, {
      next: { revalidate: 60 },
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
    });
    if (!res.ok) throw new Error(`${res.status}`);
    const data = await res.json();
    const items = data.items || data;
    if (!Array.isArray(items) || items.length === 0) throw new Error("empty");
    return items.map(transformApiNarrative);
  } catch {
    return [...(seedNarratives as SeedNarrative[]), ...(iranNarratives as SeedNarrative[]), ...(ukraineNarratives as SeedNarrative[]), ...(techwarNarratives as SeedNarrative[]), ...(nkoreaNarratives as SeedNarrative[]), ...(taiwanNarratives as SeedNarrative[]), ...(syriaNarratives as SeedNarrative[]), ...(brexitNarratives as SeedNarrative[]), ...(afghanNarratives as SeedNarrative[]), ...(iraqNarratives as SeedNarrative[]), ...(arabspringNarratives as SeedNarrative[]), ...(yugoNarratives as SeedNarrative[]), ...(rwandaNarratives as SeedNarrative[]), ...(cubaNarratives as SeedNarrative[]), ...(sovietNarratives as SeedNarrative[]), ...(vietnamNarratives as SeedNarrative[]), ...(koreaNarratives as SeedNarrative[]), ...(iranrevNarratives as SeedNarrative[])];
  }
}

export async function getClaims(): Promise<SeedClaim[]> {
  try {
    const res = await fetch(`${API_URL}/claims`, {
      next: { revalidate: 60 },
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
    });
    if (!res.ok) throw new Error(`${res.status}`);
    const data = await res.json();
    const items = data.items || data;
    if (!Array.isArray(items) || items.length === 0) throw new Error("empty");
    return items.map(transformApiClaim);
  } catch {
    return [...(seedClaims as SeedClaim[]), ...(iranClaims as SeedClaim[]), ...(ukraineClaims as SeedClaim[]), ...(techwarClaims as SeedClaim[]), ...(nkoreaClaims as SeedClaim[]), ...(taiwanClaims as SeedClaim[]), ...(syriaClaims as SeedClaim[]), ...(brexitClaims as SeedClaim[]), ...(afghanClaims as SeedClaim[]), ...(iraqClaims as SeedClaim[]), ...(arabspringClaims as SeedClaim[]), ...(yugoClaims as SeedClaim[]), ...(rwandaClaims as SeedClaim[]), ...(cubaClaims as SeedClaim[]), ...(sovietClaims as SeedClaim[]), ...(vietnamClaims as SeedClaim[]), ...(koreaClaims as SeedClaim[]), ...(iranrevClaims as SeedClaim[])];
  }
}
