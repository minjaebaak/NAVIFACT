"use client";

import PredictionCard from "@/components/prediction/PredictionCard";

interface PredictClientProps {
  predictions: Array<{
    id: string;
    question: string;
    yesPool: number;
    noPool: number;
    deadline: string;
    status: "active" | "settled" | "expired";
    settlementCriteria?: string;
  }>;
}

export default function PredictClient({ predictions }: PredictClientProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {predictions.map((pred) => (
        <PredictionCard
          key={pred.id}
          {...pred}
          onBet={(id, side, amount) => {
            alert(
              `베팅: ${side === "yes" ? "할 것이다" : "안 할 것이다"} ${amount}P (데모)`
            );
          }}
        />
      ))}
    </div>
  );
}
