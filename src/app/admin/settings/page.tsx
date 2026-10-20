import { AdminFrame } from "@/components/admin/admin-frame";
import { requireAdmin } from "@/lib/require-admin";
import { AdminAccessManager } from "@/components/admin/admin-access-manager";

export default async function AdminSettingsPage() {
  const user = await requireAdmin();
  return <AdminFrame active=""><main className="mx-auto max-w-4xl p-4 md:p-8"><div className="mb-8"><p className="text-xs font-semibold uppercase tracking-[.2em] text-[#a27815]">Settings</p><h1 className="mt-1 text-3xl font-semibold">Store settings</h1><p className="mt-2 text-sm text-slate-500">The essentials behind your admin workspace.</p></div><div className="space-y-4"><section className="rounded-2xl border border-slate-200 bg-white p-6"><h2 className="font-semibold">Signed-in admin</h2><p className="mt-1 text-sm text-slate-500">You are signed in as</p><p className="mt-3 rounded-xl bg-slate-50 px-4 py-3 text-sm font-medium">{user.email}</p></section><AdminAccessManager /><section className="rounded-2xl border border-slate-200 bg-white p-6"><h2 className="font-semibold">Catalog and payments</h2><div className="mt-4 grid gap-3 text-sm sm:grid-cols-2"><div className="rounded-xl bg-emerald-50 p-4 text-emerald-800">Product database connected</div><div className="rounded-xl bg-emerald-50 p-4 text-emerald-800">Checkout system configured</div></div></section></div></main></AdminFrame>;
}
