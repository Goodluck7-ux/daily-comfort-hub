import Link from "next/link";
import { ArrowLeft, MapPin, Plus } from "lucide-react";
import { PageTitle } from "@/components/storefront/ui";
import { requireAuthenticatedUser } from "@/lib/require-auth";
import { getDatabase } from "@/lib/db";
import { AddressForm } from "@/components/account/address-form";

type Address = { id: string; label: string; recipient_name: string; phone: string; address: string; state: string; city: string; postal_code: string | null; is_default: boolean };

export default async function AddressesPage() {
  const user = await requireAuthenticatedUser();
  const database = getDatabase();
  const addresses = database ? (await database.query<Address>("select id, label, recipient_name, phone, address, state, city, postal_code, is_default from public.addresses where user_id = $1 order by is_default desc, created_at desc", [user.id])).rows : [];
  return <main className="mx-auto max-w-3xl px-4 py-6 md:px-6 md:py-10"><Link href="/account" className="mb-6 inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-black"><ArrowLeft className="size-4" /> Account</Link><PageTitle title="Saved addresses" description="Save delivery details for a faster checkout." />{addresses.length ? <div className="space-y-3">{addresses.map((item) => <article key={item.id} className="rounded-xl border bg-white p-5"><div className="flex items-start gap-3"><span className="grid size-9 place-items-center rounded-lg bg-[#d9ad3d]/15 text-[#a27815]"><MapPin className="size-4" /></span><div className="flex-1"><div className="flex flex-wrap items-center gap-2"><h2 className="font-medium">{item.label}</h2>{item.is_default && <span className="rounded-full bg-green-50 px-2 py-1 text-[11px] font-medium text-green-700">Default</span>}</div><p className="mt-2 text-sm text-neutral-700">{item.recipient_name} · {item.phone}</p><p className="mt-1 text-sm text-neutral-500">{item.address}, {item.city}, {item.state}{item.postal_code ? `, ${item.postal_code}` : ""}</p></div></div></article>)}</div> : <div className="mb-5 rounded-xl border border-dashed p-6 text-center text-sm text-neutral-500">No saved addresses yet. Add one below for faster checkout.</div>}<div className="mt-6 flex items-center gap-2"><Plus className="size-4 text-[#a27815]" /><h2 className="font-semibold">Add an address</h2></div><div className="mt-3"><AddressForm onDone={() => undefined} /></div></main>;
}
