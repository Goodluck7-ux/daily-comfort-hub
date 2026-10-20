import { redirect } from "next/navigation";
import { getDatabase } from "@/lib/db";
import { getSessionUser } from "@/lib/session-user";

export function getBootstrapAdminEmails() {
  return (process.env.ADMIN_EMAILS || "").split(",").map((value) => value.trim().toLowerCase()).filter(Boolean);
}

export function isAdminEmail(email: string) { return getBootstrapAdminEmails().includes(email.toLowerCase()); }

export async function hasAdminAccess(email: string) {
  if (isAdminEmail(email)) return true;
  const database = getDatabase();
  if (!database) return false;
  try {
    const result = await database.query<{ active: boolean }>("select active from public.admin_users where lower(email) = lower($1) limit 1", [email]);
    return result.rows[0]?.active === true;
  } catch { return false; }
}

export async function requireAdmin() {
  const user = await getSessionUser();
  if (!user || !(await hasAdminAccess(user.email))) redirect("/account");
  return user;
}

export async function requireBootstrapAdmin() {
  const user = await getSessionUser();
  if (!user || !isAdminEmail(user.email)) redirect("/account");
  return user;
}
