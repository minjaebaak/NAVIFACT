import { parseFlagEmoji } from "@/lib/flag-utils";

interface FlagDisplayProps {
  flag: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const SIZE_MAP = {
  sm: { width: 20, height: 15 },
  md: { width: 28, height: 21 },
  lg: { width: 48, height: 36 },
};

export default function FlagDisplay({
  flag,
  size = "md",
  className = "",
}: FlagDisplayProps) {
  const codes = parseFlagEmoji(flag);
  const { width, height } = SIZE_MAP[size];

  // Non-flag emoji (e.g. 🌍) — fall back to text
  if (codes.length === 0) {
    return <span className={className}>{flag}</span>;
  }

  return (
    <span className={`inline-flex items-center gap-0.5 ${className}`}>
      {codes.map((code) => (
        <img
          key={code}
          src={`https://flagcdn.com/w${width * 2}/${code.toLowerCase()}.png`}
          srcSet={`https://flagcdn.com/w${width * 2}/${code.toLowerCase()}.png 2x`}
          width={width}
          height={height}
          alt={flag}
          loading="lazy"
          className="inline-block rounded-sm"
        />
      ))}
    </span>
  );
}
