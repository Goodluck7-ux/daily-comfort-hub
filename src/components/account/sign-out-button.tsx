"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut, X } from "lucide-react";
import { toast } from "sonner";

export function SignOutButton() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  async function signOut() { setBusy(true); const response = await fetch("/api/auth/sign-out", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({}), credentials: "include" }); if (!response.ok) { toast.error("Unable to sign out. Please try again."); setBusy(false); return; } setOpen(false); toast.success("You have been signed out"); router.push("/"); router.refresh(); }
  return <><button type="button" onClick={() => setOpen(true)} className="inline-flex items-center gap-2 rounded-lg border border-red-200 px-3 py-2 text-sm font-medium text-red-700 transition hover:bg-red-50"><LogOut className="size-4" /> Sign out</button>{open && <div className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="sign-out-title"><div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl"><div className="flex items-start justify-between"><div><p className="text-xs font-semibold uppercase tracking-[.18em] text-[#a27815]">Account security</p><h2 id="sign-out-title" className="mt-2 text-xl font-semibold">Sign out?</h2></div><button type="button" onClick={() => setOpen(false)} aria-label="Close sign-out dialog" className="text-neutral-400 hover:text-black"><X className="size-5" /></button></div><p className="mt-3 text-sm leading-6 text-neutral-600">You&apos;ll need to sign in again to access your account dashboard. Your cart and guest wishlist will remain saved.</p><div className="mt-6 flex gap-3"><button type="button" onClick={() => setOpen(false)} className="flex-1 rounded-lg border border-neutral-200 py-2.5 text-sm font-medium transition hover:bg-neutral-50">Stay signed in</button><button type="button" onClick={signOut} disabled={busy} className="flex-1 rounded-lg bg-black py-2.5 text-sm font-medium text-white transition hover:bg-neutral-800 disabled:opacity-60">{busy ? "Signing out…" : "Sign out"}</button></div></div></div>}</>;
}
