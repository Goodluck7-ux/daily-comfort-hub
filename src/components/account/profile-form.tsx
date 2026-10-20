"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function ProfileForm({ name, email }: { name: string; email: string }) {
  const router = useRouter();
  const [value, setValue] = useState(name);
  const [status, setStatus] = useState("");
  const [saving, setSaving] = useState(false);
  async function submit(event: React.FormEvent<HTMLFormElement>) { event.preventDefault(); setSaving(true); setStatus(""); const response = await fetch("/api/account/profile", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: value }) }); const result = await response.json() as { name?: string; error?: string }; setSaving(false); if (!response.ok) { setStatus(result.error || "Unable to save profile."); return; } setStatus("Profile saved."); router.refresh(); }
  return <form onSubmit={submit}><div className="mt-5 grid gap-4 md:grid-cols-2"><label className="text-sm">Name<input value={value} onChange={(event) => setValue(event.target.value)} required className="mt-2 h-11 w-full rounded-xl border px-3 outline-none focus:border-black" /></label><label className="text-sm">Email<input value={email} readOnly type="email" className="mt-2 h-11 w-full rounded-xl border bg-neutral-50 px-3 text-neutral-500 outline-none" /></label></div>{status && <p className={`mt-3 text-xs ${status === "Profile saved." ? "text-green-700" : "text-red-700"}`}>{status}</p>}<button type="submit" disabled={saving} className="mt-5 rounded-xl bg-black px-4 py-2.5 text-sm font-medium text-white disabled:opacity-60">{saving ? "Saving…" : "Save changes"}</button></form>;
}
