"use client";

import { useEffect, useState } from "react";
import { MapPin } from "lucide-react";

export type SavedAddress = { id: string; label: string; recipient_name: string; phone: string; address: string; state: string; city: string; postal_code: string | null; is_default: boolean };

export function SavedAddressSelector({ onSelect }: { onSelect: (address: SavedAddress) => void }) {
  const [addresses, setAddresses] = useState<SavedAddress[]>([]);
  const [selected, setSelected] = useState("");
  useEffect(() => { fetch("/api/account/addresses").then(async (response) => response.ok ? (await response.json() as { addresses: SavedAddress[] }).addresses : []).then(setAddresses).catch(() => undefined); }, []);
  if (!addresses.length) return null;
  return <div className="mb-5 rounded-xl border border-[#d9ad3d]/40 bg-[#fffaf0] p-4"><div className="flex items-center gap-2"><MapPin className="size-4 text-[#a27815]" /><p className="text-sm font-medium">Use a saved address</p></div><select value={selected} onChange={(event) => { const address = addresses.find((item) => item.id === event.target.value); setSelected(event.target.value); if (address) onSelect(address); }} className="mt-3 h-10 w-full rounded-lg border border-neutral-200 bg-white px-3 text-sm outline-none focus:border-black"><option value="">Select an address</option>{addresses.map((address) => <option key={address.id} value={address.id}>{address.label} — {address.address}, {address.city}</option>)}</select></div>;
}
