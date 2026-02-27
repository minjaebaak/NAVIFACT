"use client";

interface ConfidenceMeterProps {
  value: number; // 0-100
  label?: string;
  showPercentage?: boolean;
  size?: "sm" | "md" | "lg";
}

function getColor(value: number): string {
  if (value >= 80) return "bg-success";
  if (value >= 50) return "bg-warning";
  if (value >= 30) return "bg-orange-500";
  return "bg-destructive";
}

function getTextColor(value: number): string {
  if (value >= 80) return "text-success";
  if (value >= 50) return "text-warning";
  if (value >= 30) return "text-orange-500";
  return "text-destructive";
}

const sizeStyles = {
  sm: { bar: "h-1.5", text: "text-xs" },
  md: { bar: "h-2.5", text: "text-sm" },
  lg: { bar: "h-3.5", text: "text-base" },
};

export default function ConfidenceMeter({
  value,
  label,
  showPercentage = true,
  size = "md",
}: ConfidenceMeterProps) {
  const clamped = Math.max(0, Math.min(100, value));
  const styles = sizeStyles[size];

  return (
    <div className="w-full">
      {(label || showPercentage) && (
        <div className="flex justify-between items-center mb-1">
          {label && <span className={`${styles.text} text-muted`}>{label}</span>}
          {showPercentage && (
            <span className={`${styles.text} font-semibold ${getTextColor(clamped)}`}>
              {clamped}%
            </span>
          )}
        </div>
      )}
      <div className={`w-full ${styles.bar} rounded-full bg-border/50 overflow-hidden`}>
        <div
          className={`${styles.bar} rounded-full ${getColor(clamped)} transition-all duration-500 ease-out`}
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
}
