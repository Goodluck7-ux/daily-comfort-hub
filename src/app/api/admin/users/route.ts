import { getDatabase } from "@/lib/db";
import { getSessionUser } from "@/lib/session-user";
import { hasAdminAccess, isAdminEmail } from "@/lib/require-admin";

async function currentAdmin() { const user = await getSessionUser(); return user && await hasAdminAccess(user.email) ? user : null; }

export async function GET() {
  const user = await currentAdmin(); if (!user) return Response.json({ error: "Admin access required." }, { status: 403 });
  const database = getDatabase(); if (!database) return Response.json({ error: "Database connection is not configured." }, { status: 503 });
  try {
    const result = await database.query("select u.id, u.name, u.email, u.created_at, coalesce(a.active, false) as is_admin, coalesce(a.role, 'customer') as role from public.\"user\" u left join public.admin_users a on lower(a.email) = lower(u.email) order by u.created_at desc");
    return Response.json({ users: result.rows, canManage: isAdminEmail(user.email) });
  } catch { return Response.json({ error: "Unable to read users. Confirm that Better Auth and admin_users migrations have been run." }, { status: 503 }); }
}

export async function PATCH(request: Request) {
  const user = await currentAdmin(); if (!user || !isAdminEmail(user.email)) return Response.json({ error: "Only a bootstrap admin can change user roles." }, { status: 403 });
  const { email, role } = await request.json() as { email?: string; role?: string }; const normalized = email?.trim().toLowerCase();
  if (!normalized || !["admin", "customer"].includes(role || "")) return Response.json({ error: "Choose a valid user role." }, { status: 400 });
  if (normalized === user.email.toLowerCase() && role === "customer") return Response.json({ error: "You cannot remove your own owner access." }, { status: 400 });
  const database = getDatabase(); if (!database) return Response.json({ error: "Database connection is not configured." }, { status: 503 });
  try {
    if (role === "admin") await database.query("insert into public.admin_users (email, role, active) values ($1, 'admin', true) on conflict (email) do update set role = 'admin', active = true, updated_at = now()", [normalized]);
    else await database.query("update public.admin_users set active = false, updated_at = now() where lower(email) = lower($1)", [normalized]);
    return Response.json({ ok: true });
  } catch { return Response.json({ error: "Run the admin_users migration before changing roles." }, { status: 503 }); }
}
