import { AdminFrame } from "@/components/admin/admin-frame";
import { UserManager } from "@/components/admin/user-manager";
import { requireAdmin } from "@/lib/require-admin";

export default async function AdminUsersPage() { await requireAdmin(); return <AdminFrame active="Users"><main className="mx-auto max-w-7xl p-4 md:p-8"><div className="mb-8"><p className="text-xs font-semibold uppercase tracking-[.2em] text-[#a27815]">Users</p><h1 className="mt-1 text-3xl font-semibold">Accounts and roles</h1><p className="mt-2 text-sm text-slate-500">Review registered users and control who can access the admin workspace.</p></div><UserManager /></main></AdminFrame>; }
