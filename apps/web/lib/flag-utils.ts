/**
 * Parse a flag emoji string into ISO 3166-1 alpha-2 country codes.
 *
 * Regional Indicator Symbol Letters: U+1F1E6 ('A') to U+1F1FF ('Z').
 * Each flag emoji = two Regional Indicator symbols.
 *
 * "🇰🇷🇺🇸" → ["KR", "US"]
 * "🇸🇾"     → ["SY"]
 * "🌍"       → []  (not a flag — triggers fallback)
 */
export function parseFlagEmoji(flag: string): string[] {
  const codes: string[] = [];
  const codePoints = [...flag]; // spread handles surrogate pairs correctly
  let i = 0;
  while (i < codePoints.length) {
    const cp = codePoints[i].codePointAt(0)!;
    if (cp >= 0x1f1e6 && cp <= 0x1f1ff && i + 1 < codePoints.length) {
      const cp2 = codePoints[i + 1].codePointAt(0)!;
      if (cp2 >= 0x1f1e6 && cp2 <= 0x1f1ff) {
        codes.push(
          String.fromCharCode(cp - 0x1f1e6 + 65) +
            String.fromCharCode(cp2 - 0x1f1e6 + 65),
        );
        i += 2;
        continue;
      }
    }
    i++;
  }
  return codes;
}
