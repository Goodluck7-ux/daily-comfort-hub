"use client";

import { useState } from "react";

export function PasswordForm() {
  const [status, setStatus] = useState("");
  const [saving, setSaving] = useState(false);
  async function submit(event: React.FormEvent<HTMLFormElement>) { event.preventDefault(); setSaving(true); setStatus(""); const values = Object.fromEntries(new FormData(event.currentTarget)); const response = await fetch("/api/auth/change-password", { method: "POST", headers: { "Content-Type": "application/json" }, credentials: "include", body: JSON.stringify({ currentPassword: values.currentPassword, newPassword: values.newPassword, revokeOtherSessions: true }) }); const result = await response.json().catch(() => ({})) as { message?: string; error?: string }; setSaving(false); if (!response.ok) { setStatus(result.message || result.error || "Unable to change password."); return; } event.currentTarget.reset(); setStatus("Password changed and other sessions signed out."); }
  return <form onSubmit={submit} className="mt-4 space-y-3"><input name="currentPassword" type="password" required minLength={8} autoComplete="current-password" placeholder="Current password" className="h-10 w-full rounded-lg border border-neutral-200 px-3 text-sm outline-none focus:border-black" /><input name="newPassword" type="password" required minLength={8} autoComplete="new-password" placeholder="New password (8+ characters)" className="h-10 w-full rounded-lg border border-neutral-200 px-3 text-sm outline-none focus:border-black" />{status && <p className={`text-xs ${status.startsWith("Password changed") ? "text-green-700" : "text-red-700"}`}>{status}</p>}<button type="submit" disabled={saving} className="rounded-lg border border-black px-4 py-2.5 text-sm font-medium transition hover:bg-neutral-50 disabled:opacity-60">{saving ? "Updating…" : "Change password"}</button></form>;
}
