"use client";

import Link from "next/link";
import { ArrowRight, Truck } from "lucide-react";
import { formatNaira } from "@/lib/format";
import { useCart } from "@/components/storefront/cart-provider";

export function OrderSummary({ checkout = false, shipping = 0 }: { checkout?: boolean; shipping?: number }) {
  const { subtotal } = useCart();
  const total = subtotal + shipping;
  return <aside className="rounded-xl border bg-white p-5 shadow-sm">
    <h2 className="text-lg font-semibold">Order Summary</h2>
    <div className="mt-5 space-y-3 text-sm">
      <div className="flex justify-between text-neutral-500"><span>Subtotal</span><span className="text-neutral-900">{formatNaira(subtotal)}</span></div>
      <div className="flex justify-between text-neutral-500"><span>Shipping</span><span className="text-neutral-900">{shipping ? formatNaira(shipping) : "Free"}</span></div>
    </div>
    <div className="my-5 border-t" />
    <div className="flex items-end justify-between"><div><p className="font-semibold">Total</p><p className="text-xs text-neutral-500">Tax included</p></div><p className="text-xl font-semibold">{formatNaira(total)}</p></div>
    {checkout ? <button type="submit" className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg bg-black py-3.5 text-sm font-medium text-white transition hover:bg-neutral-800">Proceed to Payment <ArrowRight className="size-4" /></button> : <Link href="/checkout" className="mt-5 flex items-center justify-center gap-2 rounded-lg bg-black py-3.5 text-sm font-medium text-white transition hover:bg-neutral-800">Proceed to Checkout <ArrowRight className="size-4" /></Link>}
    <div className="mt-5 flex items-center gap-3 border-t pt-4 text-xs text-neutral-600"><Truck className="size-5 shrink-0" />Free shipping on orders over ₦100,000</div>
  </aside>;
}
