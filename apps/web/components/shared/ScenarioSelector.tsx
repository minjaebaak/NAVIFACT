"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { SCENARIOS, type ScenarioId } from "@/lib/data";

interface ScenarioSelectorProps {
  current: ScenarioId;
}

export default function ScenarioSelector({ current }: ScenarioSelectorProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function handleSelect(id: ScenarioId) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("scenario", id);
    router.push(`?${params.toString()}`);
  }

  return (
    <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
      {SCENARIOS.map((s) => (
        <button
          key={s.id}
          onClick={() => handleSelect(s.id)}
          className={`whitespace-nowrap px-4 py-2 rounded-lg text-sm font-medium transition-colors border ${
            current === s.id
              ? "bg-accent text-accent-foreground border-accent"
              : "bg-card border-border text-muted hover:text-foreground hover:bg-white/5"
          }`}
        >
          <span className="mr-1.5">{s.flag}</span>
          {s.title}
        </button>
      ))}
    </div>
  );
}
