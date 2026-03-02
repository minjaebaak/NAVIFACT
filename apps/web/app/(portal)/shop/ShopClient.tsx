"use client";

import { useState, useEffect, useCallback } from "react";
import { Package, ShoppingBag } from "lucide-react";
import ItemCard, { type ShopItem } from "@/components/shop/ItemCard";
import PurchaseModal from "@/components/shop/PurchaseModal";
import { apiClient } from "@/lib/api-client";
import { useAuth } from "@/lib/auth-context";

interface InventoryItem {
  item: ShopItem;
  purchased_at: string;
  equipped: boolean;
}

const CATEGORIES = [
  { key: "all", label: "전체" },
  { key: "emoji", label: "이모지" },
  { key: "profile_border", label: "프로필 테두리" },
  { key: "profile_background", label: "프로필 배경" },
  { key: "comment_effect", label: "댓글 효과" },
  { key: "badge_style", label: "칭호 스타일" },
  { key: "theme", label: "테마" },
];

interface ShopClientProps {
  initialItems: ShopItem[];
}

export default function ShopClient({ initialItems }: ShopClientProps) {
  const { user } = useAuth();
  const [items] = useState<ShopItem[]>(initialItems);
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [activeTab, setActiveTab] = useState<"shop" | "inventory">("shop");
  const [activeCategory, setActiveCategory] = useState("all");
  const [purchaseTarget, setPurchaseTarget] = useState<ShopItem | null>(null);
  const [balance, setBalance] = useState(user?.points ?? 0);
  const [loading, setLoading] = useState(false);

  // Fetch inventory
  const fetchInventory = useCallback(async () => {
    if (!user) return;
    try {
      const inv = await apiClient.get<InventoryItem[]>("/shop/inventory");
      setInventory(inv);
    } catch {
      // Not logged in or API down
    }
  }, [user]);

  useEffect(() => {
    fetchInventory();
  }, [fetchInventory]);

  useEffect(() => {
    if (user) setBalance(user.points);
  }, [user]);

  const ownedIds = new Set(inventory.map((i) => i.item.id));
  const equippedIds = new Set(
    inventory.filter((i) => i.equipped).map((i) => i.item.id)
  );

  const filteredItems =
    activeCategory === "all"
      ? items
      : items.filter((i) => i.category === activeCategory);

  const handlePurchase = async () => {
    if (!purchaseTarget) return;
    setLoading(true);
    try {
      const result = await apiClient.post<{ balance: number; item: ShopItem }>(
        "/shop/purchase",
        { item_id: purchaseTarget.id }
      );
      setBalance(result.balance);
      setPurchaseTarget(null);
      await fetchInventory();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "구매에 실패했습니다.";
      alert(message);
    } finally {
      setLoading(false);
    }
  };

  const handleEquip = async (item: ShopItem) => {
    try {
      await apiClient.put(`/shop/inventory/${item.id}/equip`);
      await fetchInventory();
    } catch {
      alert("장착에 실패했습니다.");
    }
  };

  const handleUnequip = async (item: ShopItem) => {
    try {
      await apiClient.put(`/shop/inventory/${item.id}/unequip`);
      await fetchInventory();
    } catch {
      alert("해제에 실패했습니다.");
    }
  };

  return (
    <div>
      {/* Tab selector */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => setActiveTab("shop")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeTab === "shop"
              ? "bg-accent text-white"
              : "text-muted hover:text-foreground hover:bg-card"
          }`}
        >
          <ShoppingBag className="h-4 w-4" />
          상점
        </button>
        <button
          onClick={() => setActiveTab("inventory")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeTab === "inventory"
              ? "bg-accent text-white"
              : "text-muted hover:text-foreground hover:bg-card"
          }`}
        >
          <Package className="h-4 w-4" />
          인벤토리
          {inventory.length > 0 && (
            <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-accent/20 text-accent">
              {inventory.length}
            </span>
          )}
        </button>

        {/* Balance */}
        {user && (
          <div className="ml-auto text-sm">
            <span className="text-muted">보유: </span>
            <span className="font-bold text-accent">{balance.toLocaleString()}P</span>
          </div>
        )}
      </div>

      {activeTab === "shop" ? (
        <>
          {/* Category filter */}
          <div className="flex flex-wrap gap-2 mb-6">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  activeCategory === cat.key
                    ? "bg-accent/10 text-accent border border-accent/20"
                    : "text-muted hover:text-foreground border border-border hover:border-foreground/20"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Items grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredItems.map((item) => (
              <ItemCard
                key={item.id}
                item={item}
                owned={ownedIds.has(item.id)}
                equipped={equippedIds.has(item.id)}
                onPurchase={() => {
                  if (!user) {
                    alert("로그인이 필요합니다.");
                    return;
                  }
                  setPurchaseTarget(item);
                }}
                onEquip={handleEquip}
                onUnequip={handleUnequip}
              />
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div className="text-center py-16 text-muted">
              <ShoppingBag className="h-12 w-12 mx-auto mb-3 opacity-30" />
              <p className="text-sm">이 카테고리에 아이템이 없습니다.</p>
            </div>
          )}
        </>
      ) : (
        <>
          {/* Inventory */}
          {inventory.length === 0 ? (
            <div className="text-center py-16 text-muted">
              <Package className="h-12 w-12 mx-auto mb-3 opacity-30" />
              <p className="text-sm">아직 구매한 아이템이 없습니다.</p>
              <button
                onClick={() => setActiveTab("shop")}
                className="mt-3 text-xs text-accent hover:underline"
              >
                상점 둘러보기
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {inventory.map((inv) => (
                <ItemCard
                  key={inv.item.id}
                  item={inv.item}
                  owned
                  equipped={inv.equipped}
                  onEquip={handleEquip}
                  onUnequip={handleUnequip}
                />
              ))}
            </div>
          )}
        </>
      )}

      {/* Purchase modal */}
      {purchaseTarget && (
        <PurchaseModal
          item={purchaseTarget}
          balance={balance}
          onConfirm={handlePurchase}
          onCancel={() => setPurchaseTarget(null)}
          loading={loading}
        />
      )}
    </div>
  );
}
