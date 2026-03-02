import { ShoppingBag } from "lucide-react";
import ShopClient from "./ShopClient";
import type { ShopItem } from "@/components/shop/ItemCard";

import seedShopItems from "@/data/seed/shop-items.json";

async function getShopItems(): Promise<ShopItem[]> {
  try {
    const apiUrl =
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";
    const res = await fetch(`${apiUrl}/shop/items`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) throw new Error("API error");
    return await res.json();
  } catch {
    // Fallback to seed data
    return (seedShopItems as unknown as ShopItem[]).map((item) => ({
      ...item,
      id: item.id,
      is_active: true,
    }));
  }
}

export default async function ShopPage() {
  const items = await getShopItems();

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <ShoppingBag className="h-7 w-7 text-accent" />
          <h1 className="text-3xl font-bold text-foreground">포인트 상점</h1>
        </div>
        <p className="text-muted">
          활동으로 모은 포인트로 이모지, 프로필 꾸미기, 댓글 효과 등을
          구매하세요. 포인트는 현금으로 전환할 수 없습니다.
        </p>
      </div>

      {/* Shop client */}
      <ShopClient initialItems={items} />
    </div>
  );
}
