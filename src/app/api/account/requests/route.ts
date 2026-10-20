import { randomUUID } from "node:crypto";
import { getDatabase } from "@/lib/db";
import { getSessionUser } from "@/lib/session-user";

export async function POST(request: Request) {
  const user = await getSessionUser();
  const body = await request.json() as { itemName?: string; budget?: string; deadline?: string; referenceUrl?: string; details?: string; contactMethod?: string; email?: string; phone?: string };
  if (!body.itemName || !body.deadline || (!user && (!body.email || !body.phone))) return Response.json({ error: "Item, deadline, email, and phone are required." }, { status: 400 });
  const database = getDatabase();
  if (!database) return Response.json({ error: "Database connection is not configured." }, { status: 503 });
  const budget = body.budget ? Math.round(Number(body.budget.replaceAll(",", "")) * 100) : null;
  const result = await database.query("insert into public.shopping_requests (id, user_id, email, phone, item_name, budget_kobo, deadline, reference_url, details, contact_method) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) returning id", [randomUUID(), user?.id ?? null, user?.email ?? body.email, body.phone ?? null, body.itemName, Number.isFinite(budget) ? budget : null, body.deadline, body.referenceUrl || null, body.details || null, body.contactMethod === "email" ? "email" : "whatsapp"]);
  return Response.json({ id: result.rows[0].id }, { status: 201 });
}
