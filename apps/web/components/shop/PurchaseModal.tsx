"use client";

import { X, AlertTriangle } from "lucide-react";
import type { ShopItem } from "./ItemCard";

interface PurchaseModalProps {
  item: ShopItem;
  balance: number;
  onConfirm: () => void;
  onCancel: () => void;
  loading?: boolean;
}

export default function PurchaseModal({
  item,
  balance,
  onConfirm,
  onCancel,
  loading = false,
}: PurchaseModalProps) {
  const canAfford = balance >= item.price;
  const afterBalance = balance - item.price;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="relative w-full max-w-sm mx-4 p-6 rounded-2xl bg-card border border-border shadow-2xl">
        {/* Close */}
        <button
          onClick={onCancel}
          className="absolute top-4 right-4 text-muted hover:text-foreground"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Title */}
        <h3 className="text-lg font-bold text-foreground mb-4">아이템 구매</h3>

        {/* Item info */}
        <div className="p-4 rounded-xl bg-background/50 border border-border/50 mb-4">
          <p className="text-sm font-semibold text-foreground mb-1">{item.name}</p>
          <p className="text-xs text-muted mb-2">{item.description}</p>
          <p className="text-lg font-bold text-accent">{item.price}P</p>
        </div>

        {/* Balance info */}
        <div className="space-y-2 mb-6">
          <div className="flex justify-between text-sm">
            <span className="text-muted">현재 잔액</span>
            <span className="font-medium text-foreground">{balance.toLocaleString()}P</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted">구매 후 잔액</span>
            <span className={`font-medium ${canAfford ? "text-foreground" : "text-destructive"}`}>
              {canAfford ? `${afterBalance.toLocaleString()}P` : "잔액 부족"}
            </span>
          </div>
        </div>

        {/* Warning if can't afford */}
        {!canAfford && (
          <div className="flex items-center gap-2 p-3 mb-4 rounded-lg bg-destructive/10 border border-destructive/20">
            <AlertTriangle className="h-4 w-4 text-destructive flex-shrink-0" />
            <p className="text-xs text-destructive">
              포인트가 {(item.price - balance).toLocaleString()}P 부족합니다.
              활동을 통해 포인트를 모아보세요!
            </p>
          </div>
        )}

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 py-2.5 text-sm font-medium rounded-lg border border-border text-muted hover:text-foreground hover:border-foreground/20 transition-colors"
          >
            취소
          </button>
          <button
            onClick={onConfirm}
            disabled={!canAfford || loading}
            className="flex-1 py-2.5 text-sm font-medium rounded-lg bg-accent text-white hover:bg-accent/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "구매 중..." : "구매하기"}
          </button>
        </div>
      </div>
    </div>
  );
}
