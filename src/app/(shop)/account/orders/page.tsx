import Link from "next/link";
import { ChevronRight, Package } from "lucide-react";
import { PageTitle } from "@/components/storefront/ui";
import { requireAuthenticatedUser } from "@/lib/require-auth";
import { getDatabase } from "@/lib/db";
import { formatNaira } from "@/lib/format";

type Order = { reference: string; total_kobo: number | string; status: string; created_at: string };

export default async function OrdersPage() {
  const user = await requireAuthenticatedUser();
  let orders: Order[] = [];
  const database = getDatabase();
  if (database) { const result = await database.query<Order>("select reference, total_kobo, status, created_at from public.orders where email = $1 order by created_at desc", [user.email]); orders = result.rows; }
  return <main className="mx-auto max-w-3xl px-4 py-6 md:px-6 md:py-10"><PageTitle title="My Orders" description="Track your Comfort Hub purchases in one place." />{orders.length ? <div className="space-y-3">{orders.map((order) => <div key={order.reference} className="flex items-center gap-3 rounded-xl border bg-white p-4"><span className="grid size-10 shrink-0 place-items-center rounded-lg bg-[#d9ad3d]/15 text-[#a27815]"><Package className="size-5" /></span><div className="min-w-0 flex-1"><p className="truncate text-sm font-medium">{order.reference}</p><p className="mt-1 text-xs text-neutral-500">{new Date(order.created_at).toLocaleDateString("en-NG", { dateStyle: "medium" })}</p></div><div className="text-right"><span className={`rounded-full px-2 py-1 text-[11px] font-medium ${order.status === "paid" ? "bg-green-50 text-green-700" : "bg-amber-50 text-amber-700"}`}>{order.status}</span><p className="mt-1 text-sm font-semibold">{formatNaira(Number(order.total_kobo))}</p></div></div>)}</div> : <section className="rounded-2xl border border-dashed p-10 text-center"><span className="mx-auto grid size-14 place-items-center rounded-full bg-[#d9ad3d]/15 text-[#a27815]"><Package className="size-6" /></span><h2 className="mt-4 font-semibold">No orders yet</h2><p className="mt-2 text-sm text-neutral-500">Your completed purchases will appear here.</p><Link href="/shop" className="mt-5 inline-flex items-center gap-2 rounded-xl bg-black px-4 py-2.5 text-sm font-medium text-white">Start shopping <ChevronRight className="size-4" /></Link></section>}</main>;
}
