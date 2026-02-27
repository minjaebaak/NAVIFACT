import Link from "next/link";
import {
  Compass,
  Calendar,
  TrendingUp,
  Search,
  GitBranch,
  Shield,
} from "lucide-react";

import { getEvents, getLinks, getClaims, getPredictions } from "@/lib/data";

const features = [
  {
    icon: Compass,
    title: "이벤트 추적",
    description:
      "역사적 사건을 팩트 기반으로 추적하고, 검증된 정보만을 제공합니다.",
    href: "/events",
  },
  {
    icon: GitBranch,
    title: "인과관계 시각화",
    description:
      "사건 간의 원인과 결과를 그래프로 시각화하여 맥락을 파악합니다.",
    href: "/events",
  },
  {
    icon: Calendar,
    title: "타임라인",
    description:
      "시간순으로 사건을 정렬하고 흐름을 한눈에 확인합니다.",
    href: "/timeline",
  },
  {
    icon: TrendingUp,
    title: "예측 시장",
    description:
      "커뮤니티의 집단 지성으로 미래 사건의 가능성을 예측합니다.",
    href: "/predict",
  },
  {
    icon: Shield,
    title: "팩트 검증",
    description:
      "주장과 사실을 구분하고, 신뢰도 점수로 정보의 품질을 평가합니다.",
    href: "/events",
  },
  {
    icon: Search,
    title: "통합 검색",
    description:
      "이벤트, 주장, 행위자, 합의를 통합적으로 검색합니다.",
    href: "/search",
  },
];

export default async function HomePage() {
  const [events, links, claims, predictions] = await Promise.all([
    getEvents(),
    getLinks(),
    getClaims(),
    getPredictions(),
  ]);

  const stats = [
    { label: "추적 이벤트", value: events.length },
    { label: "인과 연결", value: links.length },
    { label: "검증된 주장", value: claims.filter((c) => c.status === "verified").length },
    { label: "활성 예측", value: predictions.filter((p) => p.status === "active").length },
  ];
  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-accent/5 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
              <span className="text-foreground">진실을 향한</span>
              <br />
              <span className="text-accent">내비게이션</span>
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-lg sm:text-xl text-muted leading-relaxed">
              NAVIFACT는 팩트 기반 역사적 사건 추적 포털입니다. 사건 간의
              인과관계를 시각화하고, 커뮤니티가 함께 진실을 검증합니다.
            </p>
            <div className="mt-10 flex items-center justify-center gap-4">
              <Link
                href="/events"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-accent text-accent-foreground font-medium text-sm hover:bg-accent/90 transition-colors"
              >
                <Compass className="h-4 w-4" />
                이벤트 탐색
              </Link>
              <Link
                href="/timeline"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-border text-foreground font-medium text-sm hover:bg-white/5 transition-colors"
              >
                <Calendar className="h-4 w-4" />
                타임라인 보기
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
            핵심 기능
          </h2>
          <p className="mt-3 text-muted">
            팩트 기반 사건 분석을 위한 도구들
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Link
                key={feature.title}
                href={feature.href}
                className="group p-6 rounded-xl border border-border bg-card hover:border-accent/30 hover:bg-card/80 transition-all"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent mb-4 group-hover:bg-accent/20 transition-colors">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted leading-relaxed">
                  {feature.description}
                </p>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {stats.map((stat) => (
              <div key={stat.label}>
                <div className="text-3xl font-bold text-accent">
                  {stat.value}
                </div>
                <div className="mt-1 text-sm text-muted">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
