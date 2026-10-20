"use client";

import { ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import type { Product } from "@/types/product";
import { useCart } from "@/components/storefront/cart-provider";

export function AddToCartButton({ product }: { product: Product }) {
  const { addItem } = useCart();
  return <button type="button" onClick={() => { addItem(product); toast.success(`${product.name} added to your cart`); }} className="flex items-center justify-center gap-2 rounded-lg bg-black px-3 py-2 text-xs font-medium text-white transition hover:bg-neutral-800"><ShoppingBag className="size-3.5" /> Add to cart</button>;
}
