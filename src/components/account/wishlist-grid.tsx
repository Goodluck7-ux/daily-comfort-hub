"use client";

import { useEffect, useState } from "react";
import { ProductCard } from "@/components/product/product-card";
import type { Product } from "@/types/product";

export function WishlistGrid({ products }: { products: Product[] }) {
  const [savedIds, setSavedIds] = useState<string[]>([]);
  useEffect(() => {
    const read = () => {
      try { setSavedIds(JSON.parse(window.localStorage.getItem("comfort-hub-wishlist") || "[]") as string[]); } catch { setSavedIds([]); }
    };
    read();
    window.addEventListener("storage", read);
    return () => window.removeEventListener("storage", read);
  }, []);
  const saved = products.filter((product) => savedIds.includes(product.id));
  if (!saved.length) return <div className="rounded-2xl border border-dashed p-12 text-center"><p className="font-medium">Your wishlist is empty</p><p className="mt-1 text-sm text-neutral-500">Tap the heart on any product you want to keep close.</p></div>;
  return <div className="grid grid-cols-2 gap-3 md:grid-cols-4">{saved.map((product) => <ProductCard key={product.id} product={product} />)}</div>;
}
