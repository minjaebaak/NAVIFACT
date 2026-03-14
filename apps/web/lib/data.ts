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

// Palestine-Israel scenario seed data
import palestEvents from "@/data/seed/palest-events.json";
import palestLinks from "@/data/seed/palest-links.json";
import palestAgreement from "@/data/seed/palest-agreement.json";
import palestPredictions from "@/data/seed/palest-predictions.json";
import palestNarratives from "@/data/seed/palest-narratives.json";
import palestClaims from "@/data/seed/palest-claims.json";

// Tiananmen scenario seed data
import tiananmenEvents from "@/data/seed/tiananmen-events.json";
import tiananmenLinks from "@/data/seed/tiananmen-links.json";
import tiananmenAgreement from "@/data/seed/tiananmen-agreement.json";
import tiananmenPredictions from "@/data/seed/tiananmen-predictions.json";
import tiananmenNarratives from "@/data/seed/tiananmen-narratives.json";
import tiananmenClaims from "@/data/seed/tiananmen-claims.json";

// India-Pakistan scenario seed data
import indpakEvents from "@/data/seed/indpak-events.json";
import indpakLinks from "@/data/seed/indpak-links.json";
import indpakAgreement from "@/data/seed/indpak-agreement.json";
import indpakPredictions from "@/data/seed/indpak-predictions.json";
import indpakNarratives from "@/data/seed/indpak-narratives.json";
import indpakClaims from "@/data/seed/indpak-claims.json";

// Falklands scenario seed data
import falklandsEvents from "@/data/seed/falklands-events.json";
import falklandsLinks from "@/data/seed/falklands-links.json";
import falklandsAgreement from "@/data/seed/falklands-agreement.json";
import falklandsPredictions from "@/data/seed/falklands-predictions.json";
import falklandsNarratives from "@/data/seed/falklands-narratives.json";
import falklandsClaims from "@/data/seed/falklands-claims.json";

// South Africa Apartheid scenario seed data
import safricaEvents from "@/data/seed/safrica-events.json";
import safricaLinks from "@/data/seed/safrica-links.json";
import safricaAgreement from "@/data/seed/safrica-agreement.json";
import safricaPredictions from "@/data/seed/safrica-predictions.json";
import safricaNarratives from "@/data/seed/safrica-narratives.json";
import safricaClaims from "@/data/seed/safrica-claims.json";

// Mexico Drug War scenario seed data
import mexicoEvents from "@/data/seed/mexico-events.json";
import mexicoLinks from "@/data/seed/mexico-links.json";
import mexicoAgreement from "@/data/seed/mexico-agreement.json";
import mexicoPredictions from "@/data/seed/mexico-predictions.json";
import mexicoNarratives from "@/data/seed/mexico-narratives.json";
import mexicoClaims from "@/data/seed/mexico-claims.json";

// Chechnya War scenario seed data
import chechnyaEvents from "@/data/seed/chechnya-events.json";
import chechnyaLinks from "@/data/seed/chechnya-links.json";
import chechnyaAgreement from "@/data/seed/chechnya-agreement.json";
import chechnyaPredictions from "@/data/seed/chechnya-predictions.json";
import chechnyaNarratives from "@/data/seed/chechnya-narratives.json";
import chechnyaClaims from "@/data/seed/chechnya-claims.json";

// Northern Ireland Troubles scenario seed data
import nirelandEvents from "@/data/seed/nireland-events.json";
import nirelandLinks from "@/data/seed/nireland-links.json";
import nirelandAgreement from "@/data/seed/nireland-agreement.json";
import nirelandPredictions from "@/data/seed/nireland-predictions.json";
import nirelandNarratives from "@/data/seed/nireland-narratives.json";
import nirelandClaims from "@/data/seed/nireland-claims.json";

// Congo Civil War scenario seed data
import congoEvents from "@/data/seed/congo-events.json";
import congoLinks from "@/data/seed/congo-links.json";
import congoAgreement from "@/data/seed/congo-agreement.json";
import congoPredictions from "@/data/seed/congo-predictions.json";
import congoNarratives from "@/data/seed/congo-narratives.json";
import congoClaims from "@/data/seed/congo-claims.json";

// Yemen Civil War scenario seed data
import yemenEvents from "@/data/seed/yemen-events.json";
import yemenLinks from "@/data/seed/yemen-links.json";
import yemenAgreement from "@/data/seed/yemen-agreement.json";
import yemenPredictions from "@/data/seed/yemen-predictions.json";
import yemenNarratives from "@/data/seed/yemen-narratives.json";
import yemenClaims from "@/data/seed/yemen-claims.json";

// Myanmar Coup scenario seed data
import myanmarEvents from "@/data/seed/myanmar-events.json";
import myanmarLinks from "@/data/seed/myanmar-links.json";
import myanmarAgreement from "@/data/seed/myanmar-agreement.json";
import myanmarPredictions from "@/data/seed/myanmar-predictions.json";
import myanmarNarratives from "@/data/seed/myanmar-narratives.json";
import myanmarClaims from "@/data/seed/myanmar-claims.json";
import libyaEvents from "@/data/seed/libya-events.json";
import libyaLinks from "@/data/seed/libya-links.json";
import libyaAgreement from "@/data/seed/libya-agreement.json";
import libyaPredictions from "@/data/seed/libya-predictions.json";
import libyaNarratives from "@/data/seed/libya-narratives.json";
import libyaClaims from "@/data/seed/libya-claims.json";
import ethiopiaEvents from "@/data/seed/ethiopia-events.json";
import ethiopiaLinks from "@/data/seed/ethiopia-links.json";
import ethiopiaAgreement from "@/data/seed/ethiopia-agreement.json";
import ethiopiaPredictions from "@/data/seed/ethiopia-predictions.json";
import ethiopiaNarratives from "@/data/seed/ethiopia-narratives.json";
import ethiopiaClaims from "@/data/seed/ethiopia-claims.json";

// Cambodia scenario seed data
import cambodiaEvents from "@/data/seed/cambodia-events.json";
import cambodiaLinks from "@/data/seed/cambodia-links.json";
import cambodiaAgreement from "@/data/seed/cambodia-agreement.json";
import cambodiaPredictions from "@/data/seed/cambodia-predictions.json";
import cambodiaNarratives from "@/data/seed/cambodia-narratives.json";
import cambodiaClaims from "@/data/seed/cambodia-claims.json";

// Sudan scenario seed data
import sudanEvents from "@/data/seed/sudan-events.json";
import sudanLinks from "@/data/seed/sudan-links.json";
import sudanAgreement from "@/data/seed/sudan-agreement.json";
import sudanPredictions from "@/data/seed/sudan-predictions.json";
import sudanNarratives from "@/data/seed/sudan-narratives.json";
import sudanClaims from "@/data/seed/sudan-claims.json";

// Venezuela scenario seed data
import venezuelaEvents from "@/data/seed/venezuela-events.json";
import venezuelaLinks from "@/data/seed/venezuela-links.json";
import venezuelaAgreement from "@/data/seed/venezuela-agreement.json";
import venezuelaPredictions from "@/data/seed/venezuela-predictions.json";
import venezuelaNarratives from "@/data/seed/venezuela-narratives.json";
import venezuelaClaims from "@/data/seed/venezuela-claims.json";

// Somalia scenario seed data
import somaliaEvents from "@/data/seed/somalia-events.json";
import somaliaLinks from "@/data/seed/somalia-links.json";
import somaliaAgreement from "@/data/seed/somalia-agreement.json";
import somaliaPredictions from "@/data/seed/somalia-predictions.json";
import somaliaNarratives from "@/data/seed/somalia-narratives.json";
import somaliaClaims from "@/data/seed/somalia-claims.json";

// Yoon Impeachment scenario seed data
import yoonEvents from "@/data/seed/yoon-events.json";
import yoonLinks from "@/data/seed/yoon-links.json";
import yoonAgreement from "@/data/seed/yoon-agreement.json";
import yoonPredictions from "@/data/seed/yoon-predictions.json";
import yoonNarratives from "@/data/seed/yoon-narratives.json";
import yoonClaims from "@/data/seed/yoon-claims.json";

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
import palestMarketImpacts from "@/data/seed/palest-market-impacts.json";
import tiananmenMarketImpacts from "@/data/seed/tiananmen-market-impacts.json";
import indpakMarketImpacts from "@/data/seed/indpak-market-impacts.json";
import falklandsMarketImpacts from "@/data/seed/falklands-market-impacts.json";
import safricaMarketImpacts from "@/data/seed/safrica-market-impacts.json";
import mexicoMarketImpacts from "@/data/seed/mexico-market-impacts.json";
import chechnyaMarketImpacts from "@/data/seed/chechnya-market-impacts.json";
import nirelandMarketImpacts from "@/data/seed/nireland-market-impacts.json";
import congoMarketImpacts from "@/data/seed/congo-market-impacts.json";
import yemenMarketImpacts from "@/data/seed/yemen-market-impacts.json";
import myanmarMarketImpacts from "@/data/seed/myanmar-market-impacts.json";
import libyaMarketImpacts from "@/data/seed/libya-market-impacts.json";
import ethiopiaMarketImpacts from "@/data/seed/ethiopia-market-impacts.json";
import cambodiaMarketImpacts from "@/data/seed/cambodia-market-impacts.json";
import sudanMarketImpacts from "@/data/seed/sudan-market-impacts.json";
import venezuelaMarketImpacts from "@/data/seed/venezuela-market-impacts.json";
import somaliaMarketImpacts from "@/data/seed/somalia-market-impacts.json";
import yoonMarketImpacts from "@/data/seed/yoon-market-impacts.json";

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

export type ScenarioId = "tariff" | "iran" | "ukraine" | "techwar" | "nkorea" | "taiwan" | "syria" | "brexit" | "afghan" | "iraq" | "arabspring" | "yugo" | "rwanda" | "cuba" | "soviet" | "vietnam" | "korea" | "iranrev" | "palest" | "tiananmen" | "indpak" | "falklands" | "safrica" | "mexico" | "chechnya" | "nireland" | "congo" | "yemen" | "myanmar" | "libya" | "ethiopia" | "cambodia" | "sudan" | "venezuela" | "somalia" | "yoon";

const SCENARIO_IDS = new Set<string>([
  "tariff", "iran", "ukraine", "techwar", "nkorea", "taiwan",
  "syria", "brexit", "afghan", "iraq", "arabspring", "yugo",
  "rwanda", "cuba", "soviet", "vietnam", "korea", "iranrev",
  "palest", "tiananmen", "indpak", "falklands", "safrica",
  "mexico", "chechnya", "nireland", "congo", "yemen", "myanmar", "libya", "ethiopia", "cambodia", "sudan", "venezuela", "somalia", "yoon",
]);

export function parseScenarioParam(param?: string): ScenarioId {
  if (param && SCENARIO_IDS.has(param)) return param as ScenarioId;
  return "tariff";
}

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
  {
    id: "palest",
    title: "팔레스타인-이스라엘 분쟁",
    flag: "🇵🇸🇮🇱",
    description: "밸푸어 선언부터 6일 전쟁·오슬로 협정·가자 전쟁까지 100년 분쟁의 인과관계",
    dateRange: "1917 - 2008",
  },
  {
    id: "tiananmen",
    title: "천안문 사건",
    flag: "🇨🇳",
    description: "마오 사망부터 개혁개방·학생 민주화·6.4 학살·남순강화·시장경제 확립까지 현대 중국 정치의 분기점",
    dateRange: "1976 - 1993",
  },
  {
    id: "indpak",
    title: "인도-파키스탄 분쟁",
    flag: "🇮🇳🇵🇰",
    description: "영국 인도 분할부터 카슈미르 전쟁·핵 경쟁·뭄바이 테러·풀와마-발라콧 위기까지 남아시아 핵 대치의 뿌리",
    dateRange: "1947 - 2019",
  },
  {
    id: "falklands",
    title: "포클랜드 전쟁",
    flag: "🇬🇧🇦🇷",
    description: "영국 포클랜드 점령부터 아르헨티나 군사정권 침공·해전·상륙전·항복까지 냉전기 재래식 전쟁의 전형",
    dateRange: "1833 - 1990",
  },
  {
    id: "safrica",
    title: "남아공 아파르트헤이트",
    flag: "🇿🇦",
    description: "인종분리법 제정부터 샤프빌 학살·만델라 투옥·국제 제재·민주 선거·진실화해위원회까지 제도적 인종차별의 평화적 극복 과정",
    dateRange: "1948 - 1996",
  },
  {
    id: "mexico",
    title: "멕시코 마약 전쟁",
    flag: "🇲🇽",
    description: "PRI 일당 체제부터 카르텔 분열·NAFTA·칼데론 마약 전쟁 선포·엘 차포 체포·쿨리아칸 전투까지 마약 정책·치안·부패의 인과관계",
    dateRange: "1929 - 2023",
  },
  {
    id: "chechnya",
    title: "체첸 전쟁",
    flag: "🏴",
    description: "소련 해체 후 독립 선언부터 1·2차 체첸 전쟁·노르드오스트·베슬란 인질극·카디로프 독재 체제·우크라이나 참전까지 민족자결·테러·권위주의의 인과관계",
    dateRange: "1991 - 2022",
  },
  {
    id: "nireland",
    title: "북아일랜드 분쟁",
    flag: "🇬🇧",
    description: "아일랜드 분할부터 시민권 운동·블러디 선데이·IRA 테러·벨파스트 협정·IRA 무장 해제·브렉시트 프로토콜까지 민족·종교·테러·평화의 인과관계",
    dateRange: "1920 - 2023",
  },
  {
    id: "congo",
    title: "콩고 내전",
    flag: "🇨🇩",
    description: "벨기에 식민 착취부터 루뭄바 암살·모부투 독재·1·2차 콩고전쟁·M23 반군·코발트 자원 분쟁까지 식민유산·자원저주·지역전쟁의 인과관계",
    dateRange: "1960 - 2023",
  },
  {
    id: "yemen",
    title: "예멘 내전",
    flag: "🇾🇪",
    description: "후티 반군 봉기부터 아랍의 봄·살레 퇴진·사우디 군사 개입·스톡홀름 협정·홍해 상선 공격까지 프록시 전쟁·인도주의 위기·해상 봉쇄의 인과관계",
    dateRange: "2004 - 2023",
  },
  {
    id: "myanmar",
    title: "미얀마 쿠데타",
    flag: "🇲🇲",
    description: "영국 식민→네윈 군사독재→8888 항쟁→NLD 압승→사프란 혁명→아웅산 수치→로힝야 학살→2021 쿠데타→1027 작전까지 군부·민주주의·소수민족의 인과관계",
    dateRange: "1948 - 2023",
  },
  {
    id: "libya",
    title: "리비아 내전",
    flag: "🇱🇾",
    description: "카다피 쿠데타→록커비 테러→UN 제재→WMD 포기→아랍의 봄→NATO 개입→카다피 사망→벵가지 공격→IS 진출→동서 분열까지 석유국가·독재·개입의 인과관계",
    dateRange: "1969 - 2023",
  },
  {
    id: "ethiopia",
    title: "에티오피아 내전",
    flag: "🇪🇹",
    description: "데르그 혁명→적색 테러→에리트레아 독립→EPRDF→국경전쟁→아비 아흐메드→에리트레아 화해→티그라이 전쟁→프레토리아 협정까지 민족 갈등·전쟁·평화의 인과관계",
    dateRange: "1974 - 2023",
  },
  {
    id: "cambodia",
    title: "캄보디아 킬링필드",
    flag: "🇰🇭",
    description: "론놀 쿠데타→미국 폭격→크메르루주 집권→킬링필드→베트남 침공→프놈펜 해방→파리 협정→UNTAC 선거→크메르루주 해체→특별재판소까지 혁명·학살·정의의 인과관계",
    dateRange: "1970 - 2018",
  },
  {
    id: "sudan",
    title: "수단 내전",
    flag: "🇸🇩",
    description: "알바시르 독재→다르푸르 학살→남수단 독립→민주화 혁명→군부 쿠데타→SAF-RSF 내전→다르푸르 기근→사실상 분단까지 군부·민병대·인도적 위기의 인과관계",
    dateRange: "1956 - 2026",
  },
  {
    id: "venezuela",
    title: "베네수엘라 위기",
    flag: "🇻🇪",
    description: "차베스 볼리바르 혁명→PDVSA 장악→하이퍼인플레이션→과이도 선언→바베이도스 합의→부정선거→미군 마두로 체포→로드리게스 승계까지 석유국가·독재·외부개입의 인과관계",
    dateRange: "1998 - 2026",
  },
  {
    id: "somalia",
    title: "소말리아 내전",
    flag: "🇸🇴",
    description: "바레 군사독재→오가덴 전쟁→정권 붕괴→미군 개입→블랙호크 다운→UNOSOM 철수→알샤바브 부상→AMISOM→대기근→연방정부→모가디슈 테러→2025 공세까지 실패국가·대테러·인도적 위기의 인과관계",
    dateRange: "1969 - 2026",
  },
  {
    id: "yoon",
    title: "윤석열 탄핵·계엄 사태",
    flag: "🇰🇷",
    description: "이태원 참사→특검법 거부→12·3 비상계엄→국회 해제 의결→탄핵·체포→헌재 인용→조기 대선까지 대한민국 헌정 위기의 인과관계",
    dateRange: "2022.05 - 2026.03",
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
  palest: {
    events: palestEvents as SeedEvent[],
    links: palestLinks as SeedLink[],
    agreement: palestAgreement as SeedAgreement,
    predictions: palestPredictions as SeedPrediction[],
    narratives: palestNarratives as SeedNarrative[],
    claims: palestClaims as SeedClaim[],
    marketImpacts: palestMarketImpacts as SeedMarketImpact[],
  },
  tiananmen: {
    events: tiananmenEvents as SeedEvent[],
    links: tiananmenLinks as SeedLink[],
    agreement: tiananmenAgreement as SeedAgreement,
    predictions: tiananmenPredictions as SeedPrediction[],
    narratives: tiananmenNarratives as SeedNarrative[],
    claims: tiananmenClaims as SeedClaim[],
    marketImpacts: tiananmenMarketImpacts as SeedMarketImpact[],
  },
  indpak: {
    events: indpakEvents as SeedEvent[],
    links: indpakLinks as SeedLink[],
    agreement: indpakAgreement as SeedAgreement,
    predictions: indpakPredictions as SeedPrediction[],
    narratives: indpakNarratives as SeedNarrative[],
    claims: indpakClaims as SeedClaim[],
    marketImpacts: indpakMarketImpacts as SeedMarketImpact[],
  },
  falklands: {
    events: falklandsEvents as SeedEvent[],
    links: falklandsLinks as SeedLink[],
    agreement: falklandsAgreement as SeedAgreement,
    predictions: falklandsPredictions as SeedPrediction[],
    narratives: falklandsNarratives as SeedNarrative[],
    claims: falklandsClaims as SeedClaim[],
    marketImpacts: falklandsMarketImpacts as SeedMarketImpact[],
  },
  safrica: {
    events: safricaEvents as SeedEvent[],
    links: safricaLinks as SeedLink[],
    agreement: safricaAgreement as SeedAgreement,
    predictions: safricaPredictions as SeedPrediction[],
    narratives: safricaNarratives as SeedNarrative[],
    claims: safricaClaims as SeedClaim[],
    marketImpacts: safricaMarketImpacts as SeedMarketImpact[],
  },
  mexico: {
    events: mexicoEvents as SeedEvent[],
    links: mexicoLinks as SeedLink[],
    agreement: mexicoAgreement as SeedAgreement,
    predictions: mexicoPredictions as SeedPrediction[],
    narratives: mexicoNarratives as SeedNarrative[],
    claims: mexicoClaims as SeedClaim[],
    marketImpacts: mexicoMarketImpacts as SeedMarketImpact[],
  },
  chechnya: {
    events: chechnyaEvents as SeedEvent[],
    links: chechnyaLinks as SeedLink[],
    agreement: chechnyaAgreement as SeedAgreement,
    predictions: chechnyaPredictions as SeedPrediction[],
    narratives: chechnyaNarratives as SeedNarrative[],
    claims: chechnyaClaims as SeedClaim[],
    marketImpacts: chechnyaMarketImpacts as SeedMarketImpact[],
  },
  nireland: {
    events: nirelandEvents as SeedEvent[],
    links: nirelandLinks as SeedLink[],
    agreement: nirelandAgreement as SeedAgreement,
    predictions: nirelandPredictions as SeedPrediction[],
    narratives: nirelandNarratives as SeedNarrative[],
    claims: nirelandClaims as SeedClaim[],
    marketImpacts: nirelandMarketImpacts as SeedMarketImpact[],
  },
  congo: {
    events: congoEvents as SeedEvent[],
    links: congoLinks as SeedLink[],
    agreement: congoAgreement as SeedAgreement,
    predictions: congoPredictions as SeedPrediction[],
    narratives: congoNarratives as SeedNarrative[],
    claims: congoClaims as SeedClaim[],
    marketImpacts: congoMarketImpacts as SeedMarketImpact[],
  },
  yemen: {
    events: yemenEvents as SeedEvent[],
    links: yemenLinks as SeedLink[],
    agreement: yemenAgreement as SeedAgreement,
    predictions: yemenPredictions as SeedPrediction[],
    narratives: yemenNarratives as SeedNarrative[],
    claims: yemenClaims as SeedClaim[],
    marketImpacts: yemenMarketImpacts as SeedMarketImpact[],
  },
  myanmar: {
    events: myanmarEvents as SeedEvent[],
    links: myanmarLinks as SeedLink[],
    agreement: myanmarAgreement as SeedAgreement,
    predictions: myanmarPredictions as SeedPrediction[],
    narratives: myanmarNarratives as SeedNarrative[],
    claims: myanmarClaims as SeedClaim[],
    marketImpacts: myanmarMarketImpacts as SeedMarketImpact[],
  },
  libya: {
    events: libyaEvents as SeedEvent[],
    links: libyaLinks as SeedLink[],
    agreement: libyaAgreement as SeedAgreement,
    predictions: libyaPredictions as SeedPrediction[],
    narratives: libyaNarratives as SeedNarrative[],
    claims: libyaClaims as SeedClaim[],
    marketImpacts: libyaMarketImpacts as SeedMarketImpact[],
  },
  ethiopia: {
    events: ethiopiaEvents as SeedEvent[],
    links: ethiopiaLinks as SeedLink[],
    agreement: ethiopiaAgreement as SeedAgreement,
    predictions: ethiopiaPredictions as SeedPrediction[],
    narratives: ethiopiaNarratives as SeedNarrative[],
    claims: ethiopiaClaims as SeedClaim[],
    marketImpacts: ethiopiaMarketImpacts as SeedMarketImpact[],
  },
  cambodia: {
    events: cambodiaEvents as SeedEvent[],
    links: cambodiaLinks as SeedLink[],
    agreement: cambodiaAgreement as SeedAgreement,
    predictions: cambodiaPredictions as SeedPrediction[],
    narratives: cambodiaNarratives as SeedNarrative[],
    claims: cambodiaClaims as SeedClaim[],
    marketImpacts: cambodiaMarketImpacts as SeedMarketImpact[],
  },
  sudan: {
    events: sudanEvents as SeedEvent[],
    links: sudanLinks as SeedLink[],
    agreement: sudanAgreement as SeedAgreement,
    predictions: sudanPredictions as SeedPrediction[],
    narratives: sudanNarratives as SeedNarrative[],
    claims: sudanClaims as SeedClaim[],
    marketImpacts: sudanMarketImpacts as SeedMarketImpact[],
  },
  venezuela: {
    events: venezuelaEvents as SeedEvent[],
    links: venezuelaLinks as SeedLink[],
    agreement: venezuelaAgreement as SeedAgreement,
    predictions: venezuelaPredictions as SeedPrediction[],
    narratives: venezuelaNarratives as SeedNarrative[],
    claims: venezuelaClaims as SeedClaim[],
    marketImpacts: venezuelaMarketImpacts as SeedMarketImpact[],
  },
  somalia: {
    events: somaliaEvents as SeedEvent[],
    links: somaliaLinks as SeedLink[],
    agreement: somaliaAgreement as SeedAgreement,
    predictions: somaliaPredictions as SeedPrediction[],
    narratives: somaliaNarratives as SeedNarrative[],
    claims: somaliaClaims as SeedClaim[],
    marketImpacts: somaliaMarketImpacts as SeedMarketImpact[],
  },
  yoon: {
    events: yoonEvents as SeedEvent[],
    links: yoonLinks as SeedLink[],
    agreement: yoonAgreement as SeedAgreement,
    predictions: yoonPredictions as SeedPrediction[],
    narratives: yoonNarratives as SeedNarrative[],
    claims: yoonClaims as SeedClaim[],
    marketImpacts: yoonMarketImpacts as SeedMarketImpact[],
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
  if (eventId.startsWith("plevt-") || eventId.startsWith("pllink-") || eventId.startsWith("plpred-") || eventId.startsWith("plnar-") || eventId.startsWith("plclm-") || eventId.startsWith("agr-palest") || eventId.startsWith("plmi-") || eventId.startsWith("plobl-")) {
    return "palest";
  }
  if (eventId.startsWith("tnevt-") || eventId.startsWith("tnlink-") || eventId.startsWith("tnpred-") || eventId.startsWith("tnnar-") || eventId.startsWith("tnclm-") || eventId.startsWith("agr-tiananmen") || eventId.startsWith("tnmi-") || eventId.startsWith("tnobl-")) {
    return "tiananmen";
  }
  if (eventId.startsWith("ipevt-") || eventId.startsWith("iplink-") || eventId.startsWith("ippred-") || eventId.startsWith("ipnar-") || eventId.startsWith("ipclm-") || eventId.startsWith("agr-indpak") || eventId.startsWith("ipmi-") || eventId.startsWith("ipobl-")) {
    return "indpak";
  }
  if (eventId.startsWith("fkevt-") || eventId.startsWith("fklink-") || eventId.startsWith("fkpred-") || eventId.startsWith("fknar-") || eventId.startsWith("fkclm-") || eventId.startsWith("agr-falklands") || eventId.startsWith("fkmi-") || eventId.startsWith("fkobl-")) {
    return "falklands";
  }
  if (eventId.startsWith("saevt-") || eventId.startsWith("salink-") || eventId.startsWith("sapred-") || eventId.startsWith("sanar-") || eventId.startsWith("saclm-") || eventId.startsWith("agr-safrica") || eventId.startsWith("sami-") || eventId.startsWith("saobl-")) {
    return "safrica";
  }
  if (eventId.startsWith("mxevt-") || eventId.startsWith("mxlink-") || eventId.startsWith("mxpred-") || eventId.startsWith("mxnar-") || eventId.startsWith("mxclm-") || eventId.startsWith("agr-mexico") || eventId.startsWith("mxmi-") || eventId.startsWith("mxobl-")) {
    return "mexico";
  }
  if (eventId.startsWith("chevt-") || eventId.startsWith("chlink-") || eventId.startsWith("chpred-") || eventId.startsWith("chnar-") || eventId.startsWith("chclm-") || eventId.startsWith("agr-chechnya") || eventId.startsWith("chmi-") || eventId.startsWith("chobl-")) {
    return "chechnya";
  }
  if (eventId.startsWith("nievt-") || eventId.startsWith("nilink-") || eventId.startsWith("nipred-") || eventId.startsWith("ninar-") || eventId.startsWith("niclm-") || eventId.startsWith("agr-nireland") || eventId.startsWith("nimi-") || eventId.startsWith("niobl-")) {
    return "nireland";
  }
  if (eventId.startsWith("cgevt-") || eventId.startsWith("cglink-") || eventId.startsWith("cgpred-") || eventId.startsWith("cgnar-") || eventId.startsWith("cgclm-") || eventId.startsWith("agr-congo") || eventId.startsWith("cgmi-") || eventId.startsWith("cgobl-")) {
    return "congo";
  }
  if (eventId.startsWith("ymevt-") || eventId.startsWith("ymlink-") || eventId.startsWith("ympred-") || eventId.startsWith("ymnar-") || eventId.startsWith("ymclm-") || eventId.startsWith("agr-yemen") || eventId.startsWith("ymmi-") || eventId.startsWith("ymobl-")) {
    return "yemen";
  }
  if (eventId.startsWith("myevt-") || eventId.startsWith("mylink-") || eventId.startsWith("mypred-") || eventId.startsWith("mynar-") || eventId.startsWith("myclm-") || eventId.startsWith("agr-myanmar") || eventId.startsWith("mymi-") || eventId.startsWith("myobl-")) {
    return "myanmar";
  }
  if (eventId.startsWith("lyevt-") || eventId.startsWith("lylink-") || eventId.startsWith("lypred-") || eventId.startsWith("lynar-") || eventId.startsWith("lyclm-") || eventId.startsWith("agr-libya") || eventId.startsWith("lymi-") || eventId.startsWith("lyobl-")) {
    return "libya";
  }
  if (eventId.startsWith("etevt-") || eventId.startsWith("etlink-") || eventId.startsWith("etpred-") || eventId.startsWith("etnar-") || eventId.startsWith("etclm-") || eventId.startsWith("agr-ethiopia") || eventId.startsWith("etmi-") || eventId.startsWith("etobl-")) {
    return "ethiopia";
  }
  if (eventId.startsWith("cbevt-") || eventId.startsWith("cblink-") || eventId.startsWith("cbpred-") || eventId.startsWith("cbnar-") || eventId.startsWith("cbclm-") || eventId.startsWith("agr-cambodia") || eventId.startsWith("cbmi-") || eventId.startsWith("cbobl-")) {
    return "cambodia";
  }
  if (eventId.startsWith("sdevt-") || eventId.startsWith("sdlink-") || eventId.startsWith("sdpred-") || eventId.startsWith("sdnar-") || eventId.startsWith("sdclm-") || eventId.startsWith("agr-sudan") || eventId.startsWith("sdmi-") || eventId.startsWith("sdobl-")) {
    return "sudan";
  }
  if (eventId.startsWith("vzevt-") || eventId.startsWith("vzlink-") || eventId.startsWith("vzpred-") || eventId.startsWith("vznar-") || eventId.startsWith("vzclm-") || eventId.startsWith("agr-venezuela") || eventId.startsWith("vzmi-") || eventId.startsWith("vzobl-")) {
    return "venezuela";
  }
  if (eventId.startsWith("smevt-") || eventId.startsWith("smlink-") || eventId.startsWith("smpred-") || eventId.startsWith("smnar-") || eventId.startsWith("smclm-") || eventId.startsWith("agr-somalia") || eventId.startsWith("smmi-") || eventId.startsWith("smobl-")) {
    return "somalia";
  }
  if (eventId.startsWith("ynevt-") || eventId.startsWith("ynlink-") || eventId.startsWith("ynpred-") || eventId.startsWith("ynnar-") || eventId.startsWith("ynclm-") || eventId.startsWith("agr-yoon") || eventId.startsWith("ynmi-") || eventId.startsWith("ynobl-")) {
    return "yoon";
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
  // Palestine-Israel scenario
  ...palestEvents.map((e) => e.id),
  ...palestLinks.map((l) => l.id),
  palestAgreement.id,
  ...palestAgreement.parties.map((p: { id: string }) => p.id),
  ...palestAgreement.obligations.map((o: { id: string }) => o.id),
  ...palestPredictions.map((p) => p.id),
  ...palestNarratives.map((n) => n.id),
  ...palestClaims.map((c) => c.id),
  // Tiananmen scenario
  ...tiananmenEvents.map((e) => e.id),
  ...tiananmenLinks.map((l) => l.id),
  tiananmenAgreement.id,
  ...tiananmenAgreement.parties.map((p: { id: string }) => p.id),
  ...tiananmenAgreement.obligations.map((o: { id: string }) => o.id),
  ...tiananmenPredictions.map((p) => p.id),
  ...tiananmenNarratives.map((n) => n.id),
  ...tiananmenClaims.map((c) => c.id),
  // India-Pakistan scenario
  ...indpakEvents.map((e) => e.id),
  ...indpakLinks.map((l) => l.id),
  indpakAgreement.id,
  ...indpakAgreement.parties.map((p: { id: string }) => p.id),
  ...indpakAgreement.obligations.map((o: { id: string }) => o.id),
  ...indpakPredictions.map((p) => p.id),
  ...indpakNarratives.map((n) => n.id),
  ...indpakClaims.map((c) => c.id),
  // Falklands scenario
  ...falklandsEvents.map((e) => e.id),
  ...falklandsLinks.map((l) => l.id),
  falklandsAgreement.id,
  ...falklandsAgreement.parties.map((p: { id: string }) => p.id),
  ...falklandsAgreement.obligations.map((o: { id: string }) => o.id),
  ...falklandsPredictions.map((p) => p.id),
  ...falklandsNarratives.map((n) => n.id),
  ...falklandsClaims.map((c) => c.id),
  // South Africa Apartheid scenario
  ...safricaEvents.map((e) => e.id),
  ...safricaLinks.map((l) => l.id),
  safricaAgreement.id,
  ...safricaAgreement.parties.map((p: { id: string }) => p.id),
  ...safricaAgreement.obligations.map((o: { id: string }) => o.id),
  ...safricaPredictions.map((p) => p.id),
  ...safricaNarratives.map((n) => n.id),
  ...safricaClaims.map((c) => c.id),
  // Mexico Drug War scenario
  ...mexicoEvents.map((e) => e.id),
  ...mexicoLinks.map((l) => l.id),
  mexicoAgreement.id,
  ...mexicoAgreement.parties.map((p: { id: string }) => p.id),
  ...mexicoAgreement.obligations.map((o: { id: string }) => o.id),
  ...mexicoPredictions.map((p) => p.id),
  ...mexicoNarratives.map((n) => n.id),
  ...mexicoClaims.map((c) => c.id),
  // Chechnya War scenario
  ...chechnyaEvents.map((e) => e.id),
  ...chechnyaLinks.map((l) => l.id),
  chechnyaAgreement.id,
  ...chechnyaAgreement.parties.map((p: { id: string }) => p.id),
  ...chechnyaAgreement.obligations.map((o: { id: string }) => o.id),
  ...chechnyaPredictions.map((p) => p.id),
  ...chechnyaNarratives.map((n) => n.id),
  ...chechnyaClaims.map((c) => c.id),
  // Northern Ireland Troubles scenario
  ...nirelandEvents.map((e) => e.id),
  ...nirelandLinks.map((l) => l.id),
  nirelandAgreement.id,
  ...nirelandAgreement.parties.map((p: { id: string }) => p.id),
  ...nirelandAgreement.obligations.map((o: { id: string }) => o.id),
  ...nirelandPredictions.map((p) => p.id),
  ...nirelandNarratives.map((n) => n.id),
  ...nirelandClaims.map((c) => c.id),
  // Congo Civil War scenario
  ...congoEvents.map((e) => e.id),
  ...congoLinks.map((l) => l.id),
  congoAgreement.id,
  ...congoAgreement.parties.map((p: { id: string }) => p.id),
  ...congoAgreement.obligations.map((o: { id: string }) => o.id),
  ...congoPredictions.map((p) => p.id),
  ...congoNarratives.map((n) => n.id),
  ...congoClaims.map((c) => c.id),
  // Yemen Civil War scenario
  ...yemenEvents.map((e) => e.id),
  ...yemenLinks.map((l) => l.id),
  yemenAgreement.id,
  ...yemenAgreement.parties.map((p: { id: string }) => p.id),
  ...yemenAgreement.obligations.map((o: { id: string }) => o.id),
  ...yemenPredictions.map((p) => p.id),
  ...yemenNarratives.map((n) => n.id),
  ...yemenClaims.map((c) => c.id),
  ...myanmarEvents.map((e) => e.id),
  ...myanmarLinks.map((l) => l.id),
  myanmarAgreement.id,
  ...myanmarAgreement.parties.map((p: { id: string }) => p.id),
  ...myanmarAgreement.obligations.map((o: { id: string }) => o.id),
  ...myanmarMarketImpacts.map((m) => m.id),
  ...myanmarPredictions.map((p) => p.id),
  ...myanmarNarratives.map((n) => n.id),
  ...myanmarClaims.map((c) => c.id),
  ...libyaEvents.map((e) => e.id),
  ...libyaLinks.map((l) => l.id),
  libyaAgreement.id,
  ...libyaAgreement.parties.map((p: { id: string }) => p.id),
  ...libyaAgreement.obligations.map((o: { id: string }) => o.id),
  ...libyaMarketImpacts.map((m) => m.id),
  ...libyaPredictions.map((p) => p.id),
  ...libyaNarratives.map((n) => n.id),
  ...libyaClaims.map((c) => c.id),
  ...ethiopiaEvents.map((e) => e.id),
  ...ethiopiaLinks.map((l) => l.id),
  ethiopiaAgreement.id,
  ...ethiopiaAgreement.parties.map((p: { id: string }) => p.id),
  ...ethiopiaAgreement.obligations.map((o: { id: string }) => o.id),
  ...ethiopiaMarketImpacts.map((m) => m.id),
  ...ethiopiaPredictions.map((p) => p.id),
  ...ethiopiaNarratives.map((n) => n.id),
  ...ethiopiaClaims.map((c) => c.id),
  ...cambodiaEvents.map((e) => e.id),
  ...cambodiaLinks.map((l) => l.id),
  cambodiaAgreement.id,
  ...cambodiaAgreement.parties.map((p: { id: string }) => p.id),
  ...cambodiaAgreement.obligations.map((o: { id: string }) => o.id),
  ...cambodiaMarketImpacts.map((m) => m.id),
  ...cambodiaPredictions.map((p) => p.id),
  ...cambodiaNarratives.map((n) => n.id),
  ...cambodiaClaims.map((c) => c.id),
  ...sudanEvents.map((e) => e.id),
  ...sudanLinks.map((l) => l.id),
  sudanAgreement.id,
  ...sudanAgreement.parties.map((p: { id: string }) => p.id),
  ...sudanAgreement.obligations.map((o: { id: string }) => o.id),
  ...sudanMarketImpacts.map((m) => m.id),
  ...sudanPredictions.map((p) => p.id),
  ...sudanNarratives.map((n) => n.id),
  ...sudanClaims.map((c) => c.id),
  ...venezuelaEvents.map((e) => e.id),
  ...venezuelaLinks.map((l) => l.id),
  venezuelaAgreement.id,
  ...venezuelaAgreement.parties.map((p: { id: string }) => p.id),
  ...venezuelaAgreement.obligations.map((o: { id: string }) => o.id),
  ...venezuelaMarketImpacts.map((m) => m.id),
  ...venezuelaPredictions.map((p) => p.id),
  ...venezuelaNarratives.map((n) => n.id),
  ...venezuelaClaims.map((c) => c.id),
  ...somaliaEvents.map((e) => e.id),
  ...somaliaLinks.map((l) => l.id),
  somaliaAgreement.id,
  ...somaliaAgreement.parties.map((p: { id: string }) => p.id),
  ...somaliaAgreement.obligations.map((o: { id: string }) => o.id),
  ...somaliaMarketImpacts.map((m) => m.id),
  ...somaliaPredictions.map((p) => p.id),
  ...somaliaNarratives.map((n) => n.id),
  ...somaliaClaims.map((c) => c.id),
  // Yoon scenario
  ...yoonEvents.map((e) => e.id),
  ...yoonLinks.map((l) => l.id),
  yoonAgreement.id,
  ...yoonAgreement.parties.map((p: { id: string }) => p.id),
  ...yoonAgreement.obligations.map((o: { id: string }) => o.id),
  ...yoonMarketImpacts.map((m) => m.id),
  ...yoonPredictions.map((p) => p.id),
  ...yoonNarratives.map((n) => n.id),
  ...yoonClaims.map((c) => c.id),
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
    return [...(seedEvents as SeedEvent[]), ...(iranEvents as SeedEvent[]), ...(ukraineEvents as SeedEvent[]), ...(techwarEvents as SeedEvent[]), ...(nkoreaEvents as SeedEvent[]), ...(taiwanEvents as SeedEvent[]), ...(syriaEvents as SeedEvent[]), ...(brexitEvents as SeedEvent[]), ...(afghanEvents as SeedEvent[]), ...(iraqEvents as SeedEvent[]), ...(arabspringEvents as SeedEvent[]), ...(yugoEvents as SeedEvent[]), ...(rwandaEvents as SeedEvent[]), ...(cubaEvents as SeedEvent[]), ...(sovietEvents as SeedEvent[]), ...(vietnamEvents as SeedEvent[]), ...(koreaEvents as SeedEvent[]), ...(iranrevEvents as SeedEvent[]), ...(palestEvents as SeedEvent[]), ...(tiananmenEvents as SeedEvent[]), ...(indpakEvents as SeedEvent[]), ...(falklandsEvents as SeedEvent[]), ...(safricaEvents as SeedEvent[]), ...(mexicoEvents as SeedEvent[]), ...(chechnyaEvents as SeedEvent[]), ...(nirelandEvents as SeedEvent[]), ...(congoEvents as SeedEvent[]), ...(yemenEvents as SeedEvent[]), ...(myanmarEvents as SeedEvent[]), ...(libyaEvents as SeedEvent[]), ...(ethiopiaEvents as SeedEvent[]), ...(cambodiaEvents as SeedEvent[]), ...(sudanEvents as SeedEvent[]), ...(venezuelaEvents as SeedEvent[]), ...(somaliaEvents as SeedEvent[])];
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
    return [...(seedLinks as SeedLink[]), ...(iranLinks as SeedLink[]), ...(ukraineLinks as SeedLink[]), ...(techwarLinks as SeedLink[]), ...(nkoreaLinks as SeedLink[]), ...(taiwanLinks as SeedLink[]), ...(syriaLinks as SeedLink[]), ...(brexitLinks as SeedLink[]), ...(afghanLinks as SeedLink[]), ...(iraqLinks as SeedLink[]), ...(arabspringLinks as SeedLink[]), ...(yugoLinks as SeedLink[]), ...(rwandaLinks as SeedLink[]), ...(cubaLinks as SeedLink[]), ...(sovietLinks as SeedLink[]), ...(vietnamLinks as SeedLink[]), ...(koreaLinks as SeedLink[]), ...(iranrevLinks as SeedLink[]), ...(palestLinks as SeedLink[]), ...(tiananmenLinks as SeedLink[]), ...(indpakLinks as SeedLink[]), ...(falklandsLinks as SeedLink[]), ...(safricaLinks as SeedLink[]), ...(mexicoLinks as SeedLink[]), ...(chechnyaLinks as SeedLink[]), ...(nirelandLinks as SeedLink[]), ...(congoLinks as SeedLink[]), ...(yemenLinks as SeedLink[]), ...(myanmarLinks as SeedLink[]), ...(libyaLinks as SeedLink[]), ...(ethiopiaLinks as SeedLink[]), ...(cambodiaLinks as SeedLink[]), ...(sudanLinks as SeedLink[]), ...(venezuelaLinks as SeedLink[]), ...(somaliaLinks as SeedLink[])];
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
    return [...(seedPredictions as SeedPrediction[]), ...(iranPredictions as SeedPrediction[]), ...(ukrainePredictions as SeedPrediction[]), ...(techwarPredictions as SeedPrediction[]), ...(nkoreaPredictions as SeedPrediction[]), ...(taiwanPredictions as SeedPrediction[]), ...(syriaPredictions as SeedPrediction[]), ...(brexitPredictions as SeedPrediction[]), ...(afghanPredictions as SeedPrediction[]), ...(iraqPredictions as SeedPrediction[]), ...(arabspringPredictions as SeedPrediction[]), ...(yugoPredictions as SeedPrediction[]), ...(rwandaPredictions as SeedPrediction[]), ...(cubaPredictions as SeedPrediction[]), ...(sovietPredictions as SeedPrediction[]), ...(vietnamPredictions as SeedPrediction[]), ...(koreaPredictions as SeedPrediction[]), ...(iranrevPredictions as SeedPrediction[]), ...(palestPredictions as SeedPrediction[]), ...(tiananmenPredictions as SeedPrediction[]), ...(indpakPredictions as SeedPrediction[]), ...(falklandsPredictions as SeedPrediction[]), ...(safricaPredictions as SeedPrediction[]), ...(mexicoPredictions as SeedPrediction[]), ...(chechnyaPredictions as SeedPrediction[]), ...(nirelandPredictions as SeedPrediction[]), ...(congoPredictions as SeedPrediction[]), ...(yemenPredictions as SeedPrediction[]), ...(myanmarPredictions as SeedPrediction[]), ...(libyaPredictions as SeedPrediction[]), ...(ethiopiaPredictions as SeedPrediction[]), ...(cambodiaPredictions as SeedPrediction[]), ...(sudanPredictions as SeedPrediction[]), ...(venezuelaPredictions as SeedPrediction[]), ...(somaliaPredictions as SeedPrediction[])];
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
    return [...(seedNarratives as SeedNarrative[]), ...(iranNarratives as SeedNarrative[]), ...(ukraineNarratives as SeedNarrative[]), ...(techwarNarratives as SeedNarrative[]), ...(nkoreaNarratives as SeedNarrative[]), ...(taiwanNarratives as SeedNarrative[]), ...(syriaNarratives as SeedNarrative[]), ...(brexitNarratives as SeedNarrative[]), ...(afghanNarratives as SeedNarrative[]), ...(iraqNarratives as SeedNarrative[]), ...(arabspringNarratives as SeedNarrative[]), ...(yugoNarratives as SeedNarrative[]), ...(rwandaNarratives as SeedNarrative[]), ...(cubaNarratives as SeedNarrative[]), ...(sovietNarratives as SeedNarrative[]), ...(vietnamNarratives as SeedNarrative[]), ...(koreaNarratives as SeedNarrative[]), ...(iranrevNarratives as SeedNarrative[]), ...(palestNarratives as SeedNarrative[]), ...(tiananmenNarratives as SeedNarrative[]), ...(indpakNarratives as SeedNarrative[]), ...(falklandsNarratives as SeedNarrative[]), ...(safricaNarratives as SeedNarrative[]), ...(mexicoNarratives as SeedNarrative[]), ...(chechnyaNarratives as SeedNarrative[]), ...(nirelandNarratives as SeedNarrative[]), ...(congoNarratives as SeedNarrative[]), ...(yemenNarratives as SeedNarrative[]), ...(myanmarNarratives as SeedNarrative[]), ...(libyaNarratives as SeedNarrative[]), ...(ethiopiaNarratives as SeedNarrative[]), ...(cambodiaNarratives as SeedNarrative[]), ...(sudanNarratives as SeedNarrative[]), ...(venezuelaNarratives as SeedNarrative[]), ...(somaliaNarratives as SeedNarrative[])];
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
    return [...(seedClaims as SeedClaim[]), ...(iranClaims as SeedClaim[]), ...(ukraineClaims as SeedClaim[]), ...(techwarClaims as SeedClaim[]), ...(nkoreaClaims as SeedClaim[]), ...(taiwanClaims as SeedClaim[]), ...(syriaClaims as SeedClaim[]), ...(brexitClaims as SeedClaim[]), ...(afghanClaims as SeedClaim[]), ...(iraqClaims as SeedClaim[]), ...(arabspringClaims as SeedClaim[]), ...(yugoClaims as SeedClaim[]), ...(rwandaClaims as SeedClaim[]), ...(cubaClaims as SeedClaim[]), ...(sovietClaims as SeedClaim[]), ...(vietnamClaims as SeedClaim[]), ...(koreaClaims as SeedClaim[]), ...(iranrevClaims as SeedClaim[]), ...(palestClaims as SeedClaim[]), ...(tiananmenClaims as SeedClaim[]), ...(indpakClaims as SeedClaim[]), ...(falklandsClaims as SeedClaim[]), ...(safricaClaims as SeedClaim[]), ...(mexicoClaims as SeedClaim[]), ...(chechnyaClaims as SeedClaim[]), ...(nirelandClaims as SeedClaim[]), ...(congoClaims as SeedClaim[]), ...(yemenClaims as SeedClaim[]), ...(myanmarClaims as SeedClaim[]), ...(libyaClaims as SeedClaim[]), ...(ethiopiaClaims as SeedClaim[]), ...(cambodiaClaims as SeedClaim[]), ...(sudanClaims as SeedClaim[]), ...(venezuelaClaims as SeedClaim[]), ...(somaliaClaims as SeedClaim[])];
  }
}
