"use client";

import { ShoppingCart, Check, Star } from "lucide-react";

export interface ShopItem {
  id: string;
  short_id?: string;
  name: string;
  description: string;
  category: string;
  price: number;
  rarity: string;
  preview_url?: string;
  emoji_code?: string;
  is_active: boolean;
}

const RARITY_STYLES: Record<string, { bg: string; text: string; border: string; label: string }> = {
  common: { bg: "bg-muted/10", text: "text-muted", border: "border-muted/30", label: "일반" },
  rare: { bg: "bg-blue-500/10", text: "text-blue-400", border: "border-blue-500/30", label: "레어" },
  epic: { bg: "bg-purple-500/10", text: "text-purple-400", border: "border-purple-500/30", label: "에픽" },
  legendary: { bg: "bg-amber-500/10", text: "text-amber-400", border: "border-amber-500/30", label: "레전더리" },
};

const CATEGORY_LABELS: Record<string, string> = {
  emoji: "이모지",
  profile_border: "프로필 테두리",
  profile_background: "프로필 배경",
  comment_effect: "댓글 효과",
  badge_style: "칭호 스타일",
  theme: "테마",
};

interface ItemCardProps {
  item: ShopItem;
  owned?: boolean;
  equipped?: boolean;
  onPurchase?: (item: ShopItem) => void;
  onEquip?: (item: ShopItem) => void;
  onUnequip?: (item: ShopItem) => void;
}

export default function ItemCard({
  item,
  owned = false,
  equipped = false,
  onPurchase,
  onEquip,
  onUnequip,
}: ItemCardProps) {
  const rarity = RARITY_STYLES[item.rarity] ?? RARITY_STYLES.common;

  return (
    <div
      className={`relative p-4 rounded-xl border bg-card transition-all hover:shadow-lg hover:border-accent/30 ${
        equipped ? "border-accent ring-1 ring-accent/30" : "border-border"
      }`}
    >
      {/* Rarity badge */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-[10px] text-muted">
          {CATEGORY_LABELS[item.category] ?? item.category}
        </span>
        <span
          className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${rarity.bg} ${rarity.text} border ${rarity.border}`}
        >
          {rarity.label}
        </span>
      </div>

      {/* Preview area */}
      <div className="h-20 flex items-center justify-center mb-3 rounded-lg bg-background/50 border border-border/50">
        {item.emoji_code ? (
          <span className="text-3xl">{item.name.split(" ")[0]}</span>
        ) : (
          <Star className="h-8 w-8 text-muted/30" />
        )}
      </div>

      {/* Info */}
      <h3 className="text-sm font-semibold text-foreground mb-1 leading-tight">
        {item.name}
      </h3>
      <p className="text-xs text-muted mb-3 line-clamp-2">{item.description}</p>

      {/* Price + Action */}
      <div className="flex items-center justify-between">
        <span className="text-sm font-bold text-accent">{item.price}P</span>

        {owned ? (
          equipped ? (
            <button
              onClick={() => onUnequip?.(item)}
              className="px-3 py-1.5 text-xs font-medium rounded-lg bg-accent text-white"
            >
              <Check className="h-3 w-3 inline mr-1" />
              장착중
            </button>
          ) : (
            <button
              onClick={() => onEquip?.(item)}
              className="px-3 py-1.5 text-xs font-medium rounded-lg border border-accent/30 text-accent hover:bg-accent/10 transition-colors"
            >
              장착하기
            </button>
          )
        ) : (
          <button
            onClick={() => onPurchase?.(item)}
            className="px-3 py-1.5 text-xs font-medium rounded-lg bg-accent/10 text-accent hover:bg-accent/20 transition-colors"
          >
            <ShoppingCart className="h-3 w-3 inline mr-1" />
            구매
          </button>
        )}
      </div>
    </div>
  );
}
