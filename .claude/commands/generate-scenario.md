# NAVIFACT 시나리오 생성기

주어진 주제로 NAVIFACT 시나리오를 생성합니다.

**사용법**: `/generate-scenario [주제]`
**예시**: `/generate-scenario 러시아-우크라이나 전쟁`

## 입력 파라미터 결정

주제에서 아래를 자동 결정 (사용자에게 확인):
- `scenarioId`: 영문 소문자 (예: "ukraine")
- `prefix`: 2-3자 (예: "ukr") — ID prefix로 사용
- `flag`: 관련 국가 이모지 (예: "🇺🇦🇷🇺")
- `title`: 한국어 시나리오 제목 (예: "러시아-우크라이나 전쟁")
- `dateRange`: 기간 (예: "2022.02 - 2024.12")
- `eventCount`: 이벤트 수 (기본 10개)

## 생성할 파일 (7개)

모든 파일은 `apps/web/data/seed/` 디렉토리에 저장.

### 1. `{scenarioId}-events.json` — 이벤트 배열

```json
[
  {
    "id": "{prefix}evt-001",
    "title": "이벤트 제목",
    "description": "상세 설명 (2-3문장)",
    "date": "YYYY-MM-DD",
    "category": "외교|경제|군사|법률|기술|사회",
    "confidence": 50-100,
    "status": "verified|disputed|unverified|false"
  }
]
```

**규칙**:
- 실제 역사적 사실에 기반 (허구 금지)
- 날짜 순으로 정렬
- confidence: 공식 발표/확인된 사건 = 85-97, 보도만 있는 사건 = 60-80
- status: 대부분 "verified", 논쟁적 사건만 "disputed"

### 2. `{scenarioId}-links.json` — 인과관계 링크 배열

```json
[
  {
    "id": "{prefix}link-001",
    "source": "{prefix}evt-001",
    "target": "{prefix}evt-002",
    "confidence": 50-100,
    "mechanism": "인과관계 설명 (1문장)",
    "causalType": "direct|indirect|contributing|enabling"
  }
]
```

**규칙**:
- source → target 시간순 (source.date <= target.date)
- 모든 이벤트가 최소 1개 링크에 연결
- 체인 형태로 연결 (A→B→C→D)

### 3. `{scenarioId}-agreement.json` — 관련 협정/조약 (단일 객체)

```json
{
  "id": "agr-{scenarioId}-001",
  "title": "협정/조약 이름",
  "date": "YYYY-MM-DD",
  "summary": "협정 요약 (2-3문장)",
  "status": "active|partially_violated|collapsed|suspended",
  "parties": [
    { "id": "actor-{code}", "name": "국가명", "flag": "🇺🇸" }
  ],
  "obligations": [
    {
      "id": "{prefix}obl-001",
      "description": "의무 내용",
      "deadline": "YYYY-MM-DD 또는 매 분기",
      "status": "fulfilled|violated|pending|partial",
      "assignedTo": { "id": "actor-{code}", "name": "국가명", "flag": "🇺🇸" },
      "consequenceEventId": "{prefix}evt-XXX (선택)"
    }
  ]
}
```

### 4. `{scenarioId}-predictions.json` — 예측 시장 배열

```json
[
  {
    "id": "{prefix}pred-001",
    "question": "예/아니오로 답할 수 있는 예측 질문?",
    "yesPool": 5000-20000,
    "noPool": 5000-20000,
    "deadline": "YYYY-MM-DD",
    "status": "active|settled|expired",
    "settlementCriteria": "판정 기준 설명"
  }
]
```

**규칙**:
- 3-5개 예측
- deadline이 오늘 이전이면 status = "expired" 또는 "settled"
- 흥미로운 질문으로 (결과가 불확실한 것)

### 5. `{scenarioId}-narratives.json` — 미디어 서사 배열

```json
[
  {
    "id": "{prefix}nar-001",
    "title": "서사 제목",
    "source": "출처 (언론사명 또는 NAVIFACT 사실 검증)",
    "sourceType": "media|verified",
    "framing": "emotional|factual|analytical",
    "claims": [
      {
        "text": "주장 내용",
        "status": "verified|false|misleading|unverified|partly_true",
        "confidence": 0-100
      }
    ],
    "missingContext": ["누락된 맥락 1", "누락된 맥락 2"],
    "sources": ["출처 1", "출처 2"]
  }
]
```

**규칙**:
- 최소 2개: 1개 media(편향적) + 1개 verified(팩트체크)
- media 서사는 의도적으로 편향/감정적 프레이밍
- verified 서사는 중립적/사실 기반

### 6. `{scenarioId}-claims.json` — 팩트체크 주장 배열

```json
[
  {
    "id": "{prefix}clm-001",
    "text": "검증 대상 주장",
    "status": "verified|false|misleading|unverified|partly_true",
    "confidence": 0-100,
    "sourcesFor": 0-5,
    "sourcesAgainst": 0-5
  }
]
```

**규칙**: 5-7개, narratives의 claims와 일부 겹쳐도 됨

### 7. `{scenarioId}-market-impacts.json` — 시장 영향 분석 배열

```json
[
  {
    "id": "{prefix}mi-001",
    "eventId": "{prefix}evt-001",
    "summary": "시장 영향 예측 요약",
    "analysisDate": "YYYY-MM-DD",
    "sectors": [
      {
        "sector": "섹터명 (에너지, 반도체, 방산 등)",
        "direction": "positive|negative|neutral",
        "magnitude": "high|medium|low",
        "reasoning": "영향 이유",
        "region": "KR|US|GLOBAL",
        "stocks": [
          {
            "ticker": "종목코드",
            "name": "종목명",
            "exchange": "KOSPI|NASDAQ|NYSE|KOSDAQ",
            "direction": "positive|negative|neutral",
            "reasoning": "종목별 영향 이유"
          }
        ]
      }
    ],
    "actualSummary": "실제 결과 (과거 이벤트만)",
    "actualDate": "YYYY-MM-DD",
    "predictionAccuracy": 0-100
  }
]
```

**규칙**:
- 주요 이벤트 3-5개에 대해서만 생성 (모든 이벤트 불필요)
- 과거 이벤트: actual* 필드 포함
- 최근/미래 이벤트: actual* 필드 생략
- 섹터별 실제 종목 코드/이름 사용

## data.ts 패치 절차

`apps/web/lib/data.ts`에 아래 추가:

1. **import 문** (파일 상단): 7개 JSON import
2. **ScenarioId 타입**: 유니온에 새 ID 추가
3. **SCENARIOS 배열**: 새 항목 추가
4. **SEED_DATA 객체**: 새 시나리오 매핑
5. **detectScenario()**: 새 prefix 분기 추가

## 검증 체크리스트

- [ ] 모든 event ID가 유니크
- [ ] links의 source/target이 실존하는 event ID
- [ ] links의 source.date <= target.date (시간순)
- [ ] agreement의 consequenceEventId가 유효
- [ ] predictions의 deadline이 ISO 날짜 형식
- [ ] market-impacts의 eventId가 실존
- [ ] data.ts ScenarioId 타입 업데이트
- [ ] data.ts SCENARIOS 배열 업데이트
- [ ] data.ts SEED_DATA 매핑 업데이트
- [ ] data.ts detectScenario() prefix 추가
- [ ] `pnpm --filter @navifact/web build` 성공
- [ ] 브라우저에서 `/events?scenario={scenarioId}` 정상 표시

## 실행 순서

1. 사용자에게 scenarioId, prefix, flag 확인
2. 7개 JSON 파일 생성 (Write 도구)
3. data.ts 패치 (Read → Edit 도구)
4. 빌드 검증
5. 브라우저 확인 (dev 서버 실행 중이면)
