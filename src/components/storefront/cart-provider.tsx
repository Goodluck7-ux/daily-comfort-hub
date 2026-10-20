"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { Product } from "@/types/product";
import { getProductBySlug, getAllProducts } from "@/lib/mock-products";

export type CartItem = Pick<Product, "id" | "slug" | "name" | "price" | "images"> & { quantity: number; color?: string };
type CartContextValue = { items: CartItem[]; itemCount: number; subtotal: number; addItem: (product: Product, quantity?: number, color?: string) => void; updateQuantity: (id: string, quantity: number) => void; removeItem: (id: string) => void; clearCart: () => void };
const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "daily-comfort-hub-cart";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => { const timer = window.setTimeout(() => { try { const saved = window.localStorage.getItem(STORAGE_KEY); if (saved) { const parsed = JSON.parse(saved) as CartItem[]; setItems(parsed.map((item) => { if (item.slug) return item; const product = getAllProducts().find((candidate) => candidate.id === item.id) || getProductBySlug(item.id); return product ? { ...item, slug: product.slug } : item; })); } } catch { /* Ignore malformed local cart data. */ } setHydrated(true); }, 0); return () => window.clearTimeout(timer); }, []);
  useEffect(() => { if (hydrated) window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items)); }, [hydrated, items]);
  const value = useMemo<CartContextValue>(() => ({ items, itemCount: items.reduce((sum, item) => sum + item.quantity, 0), subtotal: items.reduce((sum, item) => sum + item.price * item.quantity, 0), addItem: (product, quantity = 1, color) => setItems((current) => { const existing = current.find((item) => item.id === product.id && item.color === color); if (existing) return current.map((item) => item === existing ? { ...item, quantity: item.quantity + quantity } : item); return [...current, { id: product.id, slug: product.slug, name: product.name, price: product.price, images: product.images, quantity, color }]; }), updateQuantity: (id, quantity) => setItems((current) => quantity > 0 ? current.map((item) => item.id === id ? { ...item, quantity } : item) : current.filter((item) => item.id !== id)), removeItem: (id) => setItems((current) => current.filter((item) => item.id !== id)), clearCart: () => setItems([]) }), [items]);
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() { const context = useContext(CartContext); if (!context) throw new Error("useCart must be used inside CartProvider"); return context; }
