"use client";

import { PageTitle } from "@/components/storefront/ui";
import { CartItems } from "@/components/storefront/cart-items";
import { OrderSummary } from "@/components/storefront/order-summary";
import { useCart } from "@/components/storefront/cart-provider";

export default function CartPage() {
  const { itemCount } = useCart();
  return <main className="mx-auto max-w-6xl px-4 py-6 md:px-6 md:py-8"><PageTitle title="Your Cart" description={`${itemCount} ${itemCount === 1 ? "item" : "items"}`} /><div className="grid gap-8 lg:grid-cols-[1.4fr_0.8fr]"><section><CartItems /><div className="mt-8"><h2 className="text-lg font-semibold">You May Also Like</h2><p className="mt-2 text-sm text-neutral-500">Explore more everyday comfort for your home.</p></div></section><OrderSummary /></div></main>;
}
