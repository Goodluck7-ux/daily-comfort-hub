import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { PageTitle } from "@/components/storefront/ui";
import { formatNaira } from "@/lib/format";
import { requireAuthenticatedUser } from "@/lib/require-auth";
import { getDatabase } from "@/lib/db";
import { RequestForm } from "@/components/account/request-form";

type RequestItem = { id: string; item_name: string; budget_kobo: number | string | null; deadline: string; status: string; created_at: string };

export default async function RequestsPage() {
  const user = await requireAuthenticatedUser();
  const database = getDatabase();
  const requests = database ? (await database.query<RequestItem>("select id, item_name, budget_kobo, deadline, status, created_at from public.shopping_requests where user_id = $1 order by created_at desc", [user.id])).rows : [];
  return <main className="mx-auto max-w-5xl px-4 py-6 md:px-6 md:py-10"><Link href="/account" className="mb-6 inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-black"><ChevronLeft className="size-5" /> Account</Link><PageTitle title="Personal shopping requests" description="We source the things you cannot find in the storefront." /><div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">{requests.length ? <section className="space-y-3">{requests.map((request) => <article key={request.id} className="rounded-xl border bg-white p-4"><div className="flex items-start justify-between gap-4"><div><p className="font-medium">{request.item_name}</p><p className="mt-1 text-xs text-neutral-500">Needed by {request.deadline} · {new Date(request.created_at).toLocaleDateString("en-NG", { dateStyle: "medium" })}</p></div><span className="rounded-full bg-amber-50 px-2 py-1 text-[11px] font-medium capitalize text-amber-700">{request.status.replaceAll("_", " ")}</span></div>{request.budget_kobo && <p className="mt-3 text-sm font-semibold">Budget: {formatNaira(Number(request.budget_kobo))}</p>}</article>)}</section> : <section className="rounded-xl border border-dashed p-8 text-center text-sm text-neutral-500">You have not submitted a sourcing request yet.</section>}<RequestForm /></div></main>;
}
