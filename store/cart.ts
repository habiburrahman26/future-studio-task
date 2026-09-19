import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "@/features/product/types";

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  add: (product: Product, quantity?: number) => void;
  remove: (id: string) => void;
  setQty: (id: string, quantity: number) => void;
  clear: () => void;
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
     
      add: (product, quantity = 1) => {
        const items = get().items.slice();
        const idx = items.findIndex((it) => it.product.id === product.id);
        const max = Math.max(1, product.stock || 1);
        if (idx >= 0) {
          const next = items[idx];
          next.quantity = Math.min(max, next.quantity + quantity);
        } else {
          items.push({ product, quantity: Math.min(max, quantity) });
        }
        set({ items });
      },
      remove: (id) => set({ items: get().items.filter((it) => it.product.id !== id) }),
      setQty: (id, quantity) => {
        if (quantity < 1) {
          set({ items: get().items.filter((it) => it.product.id !== id) });
          return;
        }
        set({
          items: get().items.map((it) =>
            it.product.id === id
              ? { ...it, quantity: Math.min(it.product.stock || 1, quantity) }
              : it,
          ),
        });
      },
      clear: () => set({ items: [] }),
    }),
    { name: "future-cart" },
  ),
);

export function cartCount(items: CartItem[]) {
  return items.reduce((n, it) => n + it.quantity, 0);
}

export function cartSubtotal(items: CartItem[]) {
  return items.reduce((n, it) => n + it.product.price * it.quantity, 0);
}