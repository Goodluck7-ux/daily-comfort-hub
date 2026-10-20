import { getDatabase } from "@/lib/db";
import { getSessionUser } from "@/lib/session-user";
import { isAdminEmail, hasAdminAccess } from "@/lib/require-admin";

async function getCurrentAdmin() { const user = await getSessionUser(); return user && await hasAdminAccess(user.email) ? user : null; }
async function canManageAdmins() { const user = await getSessionUser(); return user && isAdminEmail(user.email) ? user : null; }

export async function GET() {
  const user = await getCurrentAdmin(); if (!user) return Response.json({ error: "Admin access required." }, { status: 403 });
  const database = getDatabase(); if (!database) return Response.json({ error: "Database connection is not configured." }, { status: 503 });
  try { const result = await database.query("select email, role, active, created_at from public.admin_users order by created_at asc"); return Response.json({ admins: result.rows, canManage: isAdminEmail(user.email) }); } catch { return Response.json({ error: "Run the admin_users migration before managing admin access." }, { status: 503 }); }
}

export async function POST(request: Request) {
  if (!await canManageAdmins()) return Response.json({ error: "Only a bootstrap admin can change admin access." }, { status: 403 });
  const { email, role } = await request.json() as { email?: string; role?: string }; const normalized = email?.trim().toLowerCase();
  if (!normalized || !normalized.includes("@")) return Response.json({ error: "Enter a valid email address." }, { status: 400 });
  const database = getDatabase(); if (!database) return Response.json({ error: "Database connection is not configured." }, { status: 503 });
  try { await database.query("insert into public.admin_users (email, role, active) values ($1, $2, true) on conflict (email) do update set role = excluded.role, active = true, updated_at = now()", [normalized, role === "manager" ? "manager" : "admin"]); return Response.json({ ok: true }, { status: 201 }); } catch { return Response.json({ error: "Run the admin_users migration before adding admins." }, { status: 503 }); }
}

export async function DELETE(request: Request) {
  const current = await canManageAdmins(); if (!current) return Response.json({ error: "Only a bootstrap admin can change admin access." }, { status: 403 });
  const { email } = await request.json() as { email?: string }; const normalized = email?.trim().toLowerCase();
  if (!normalized || isAdminEmail(normalized)) return Response.json({ error: "Bootstrap admins cannot be removed here." }, { status: 400 });
  const database = getDatabase(); if (!database) return Response.json({ error: "Database connection is not configured." }, { status: 503 });
  await database.query("update public.admin_users set active = false, updated_at = now() where lower(email) = lower($1)", [normalized]); return Response.json({ ok: true });
}
