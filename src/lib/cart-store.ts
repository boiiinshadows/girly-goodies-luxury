import { useSyncExternalStore } from "react";
import type { Product } from "./products";

export interface CartItem extends Product {
  qty: number;
}

interface State {
  items: CartItem[];
  wishlist: string[];
  open: boolean;
}

let state: State = { items: [], wishlist: [], open: false };
const listeners = new Set<() => void>();
const emit = () => listeners.forEach((l) => l());

export const cartStore = {
  subscribe(l: () => void) { listeners.add(l); return () => listeners.delete(l); },
  getSnapshot() { return state; },
  addToCart(p: Product) {
    const existing = state.items.find((i) => i.id === p.id);
    state = {
      ...state,
      open: true,
      items: existing
        ? state.items.map((i) => i.id === p.id ? { ...i, qty: i.qty + 1 } : i)
        : [...state.items, { ...p, qty: 1 }],
    };
    emit();
  },
  removeFromCart(id: string) {
    state = { ...state, items: state.items.filter((i) => i.id !== id) };
    emit();
  },
  setQty(id: string, qty: number) {
    state = { ...state, items: state.items.map((i) => i.id === id ? { ...i, qty: Math.max(1, qty) } : i) };
    emit();
  },
  toggleWishlist(id: string) {
    state = {
      ...state,
      wishlist: state.wishlist.includes(id)
        ? state.wishlist.filter((i) => i !== id)
        : [...state.wishlist, id],
    };
    emit();
  },
  setOpen(open: boolean) { state = { ...state, open }; emit(); },
};

export function useCart() {
  return useSyncExternalStore(cartStore.subscribe, cartStore.getSnapshot, cartStore.getSnapshot);
}
