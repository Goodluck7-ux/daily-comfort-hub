"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { formatNaira } from "@/lib/format";
import { useCart } from "@/components/storefront/cart-provider";

export function CartItems() {
  const { items, updateQuantity, removeItem } = useCart();
  if (!items.length) return <div className="rounded-xl border border-dashed bg-white p-10 text-center text-sm text-neutral-500"><p>Your cart is empty.</p><Link href="/shop" className="mt-3 inline-block font-medium text-[#8a6710] hover:underline">Continue shopping</Link></div>;
  return <div className="space-y-3">{items.map((item) => <div key={`${item.id}-${item.color || "default"}`} className="flex gap-3 rounded-xl border bg-white p-3 transition hover:shadow-sm"><Link href={`/products/${item.slug}`} className="relative size-20 shrink-0 overflow-hidden rounded-lg bg-neutral-100"><Image src={item.images[0]} alt={item.name} fill sizes="80px" className="object-contain p-2" /></Link><div className="min-w-0 flex-1"><div className="flex justify-between gap-3"><div><Link href={`/products/${item.slug}`} className="line-clamp-2 text-sm font-medium hover:underline">{item.name}</Link><p className="mt-1 text-xs text-neutral-500">{item.color || "Default"}</p></div><button type="button" aria-label={`Remove ${item.name}`} onClick={() => removeItem(item.id)} className="text-neutral-400 transition hover:text-red-600"><Trash2 className="size-4" /></button></div><div className="mt-3 flex items-center justify-between"><div><p className="text-sm font-semibold">{formatNaira(item.price * item.quantity)}</p><p className="text-xs text-neutral-500">{formatNaira(item.price)} each</p></div><div className="flex items-center rounded-lg border"><button type="button" aria-label="Decrease quantity" onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1.5 transition hover:bg-neutral-100"><Minus className="size-3" /></button><span className="w-7 text-center text-xs">{item.quantity}</span><button type="button" aria-label="Increase quantity" onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1.5 transition hover:bg-neutral-100"><Plus className="size-3" /></button></div></div></div></div>)}</div>;
}
