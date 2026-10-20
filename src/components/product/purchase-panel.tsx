"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Check, Clock, Minus, Plus, ShieldCheck, ShoppingBag, Truck } from "lucide-react";
import { toast } from "sonner";
import type { Product } from "@/types/product";
import { formatNaira } from "@/lib/format";
import { useCart } from "@/components/storefront/cart-provider";

export function PurchasePanel({ product }: { product: Product }) {
  const router = useRouter();
  const { addItem } = useCart();
  const [color, setColor] = useState(product.colors[0]?.name);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const isInStock = product.availability === "in_stock";
  const maxQty = product.stockCount ?? 10;
  const lowStock = product.stockCount !== undefined && product.stockCount <= 5;
  const requestHref = `/personal-shopping?product=${product.slug}`;

  function handleAdd() {
    addItem(product, quantity, color);
    setAdded(true);
    toast.success(`${product.name} added to your cart`);
    window.setTimeout(() => setAdded(false), 1800);
  }

  function handleBuyNow() {
    addItem(product, quantity, color);
    router.push("/checkout");
  }

  const actionIcon = added ? <Check className="size-4" /> : <ShoppingBag className="size-4" />;

  return <div className="space-y-6">
    <div>
      <h1 className="animate-comfort-fade-up text-2xl font-semibold tracking-tight md:text-3xl">{product.name}</h1>
      <p className="animate-comfort-fade-up motion-delay-1 mt-3 text-sm leading-6 text-neutral-600">{product.summary}</p>
    </div>
    <p className="animate-comfort-fade-up motion-delay-2 text-3xl font-semibold">{formatNaira(product.price)}</p>

    {product.colors.length > 0 && <div>
      <p className="mb-2 text-sm font-medium">Color: <span className="font-normal">{color}</span></p>
      <div className="flex gap-3">{product.colors.map((item) => <button key={item.name} type="button" onClick={() => setColor(item.name)} aria-label={`Select ${item.name}`} aria-pressed={color === item.name} className={`size-9 rounded-full border-2 p-0.5 transition duration-200 hover:scale-110 ${color === item.name ? "border-black" : "border-transparent"}`}><span className="block size-full rounded-full border border-black/10" style={{ backgroundColor: item.hex }} /></button>)}</div>
    </div>}

    {isInStock ? <>
      <div className="flex items-center justify-between md:flex-col md:items-start md:gap-4">
        <div className="flex items-center gap-2 text-sm"><span className="size-2 rounded-full bg-green-500" /><span className="font-medium text-green-600">In Stock</span><span className={lowStock ? "text-amber-600" : "text-neutral-500"}>{lowStock ? `Only ${product.stockCount} left` : "Ready to ship"}</span></div>
        <div className="flex items-center gap-3"><span className="hidden text-sm font-medium md:inline">Quantity</span><div className="flex items-center rounded-lg border bg-white"><button type="button" onClick={() => setQuantity((value) => Math.max(1, value - 1))} className="p-2.5 transition-colors hover:bg-neutral-100" aria-label="Decrease quantity"><Minus className="size-4" /></button><span className="w-8 text-center text-sm">{quantity}</span><button type="button" onClick={() => setQuantity((value) => Math.min(maxQty, value + 1))} className="p-2.5 transition-colors hover:bg-neutral-100" aria-label="Increase quantity"><Plus className="size-4" /></button></div></div>
      </div>
      <div className="hidden grid-cols-2 gap-3 md:grid"><button type="button" onClick={handleAdd} className="flex items-center justify-center gap-2 rounded-lg bg-black py-4 font-medium text-white transition duration-200 hover:-translate-y-0.5 hover:bg-neutral-800 active:translate-y-0">{actionIcon}{added ? "Added to Cart" : "Add to Cart"}</button><button type="button" onClick={handleBuyNow} className="rounded-lg border border-black py-4 font-medium transition duration-200 hover:-translate-y-0.5 hover:bg-neutral-50 active:translate-y-0">Buy Now</button></div>
      <div className="grid grid-cols-3 gap-3 border-y border-neutral-200 py-4 text-xs text-neutral-600"><div className="flex items-center gap-2"><Truck className="size-4 shrink-0 text-[#a27815]" />Fast delivery</div><div className="flex items-center gap-2"><ShieldCheck className="size-4 shrink-0 text-[#a27815]" />Secure checkout</div><div className="flex items-center gap-2"><Check className="size-4 shrink-0 text-[#a27815]" />Quality checked</div></div>
      <div className="animate-comfort-slide-up fixed inset-x-0 bottom-0 z-20 flex items-center gap-4 border-t bg-white p-4 md:hidden"><span className="text-lg font-semibold">{formatNaira(product.price)}</span><button type="button" onClick={handleAdd} className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-black py-3.5 font-medium text-white transition duration-200 active:scale-[.98]">{actionIcon}{added ? "Added" : "Add to cart"}</button></div>
    </> : <>
      <div className="space-y-3 rounded-xl bg-amber-50 p-4"><div className="flex items-center gap-3"><span className="grid size-9 place-items-center rounded-full bg-amber-100 text-amber-600"><Clock className="size-4" /></span><p className="font-medium text-amber-700">Available on Request</p></div><p className="text-sm text-neutral-600">This item is sourced from trusted suppliers.</p>{product.sourcingEta && <p className="text-sm text-neutral-600">Estimated sourcing time: {product.sourcingEta}</p>}</div>
      <Link href={requestHref} className="hidden w-full rounded-lg bg-black py-4 text-center font-medium text-white transition duration-200 hover:-translate-y-0.5 hover:bg-neutral-800 md:block">Request This Item</Link>
      <div className="animate-comfort-slide-up fixed inset-x-0 bottom-0 z-20 border-t bg-white p-4 md:hidden"><Link href={requestHref} className="block w-full rounded-lg bg-black py-3.5 text-center font-medium text-white transition duration-200 active:scale-[.98]">Request This Item</Link></div>
    </>}
  </div>;
}
