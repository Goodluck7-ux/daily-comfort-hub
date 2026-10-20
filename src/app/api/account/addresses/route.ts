import { randomUUID } from "node:crypto";
import { getDatabase } from "@/lib/db";
import { getSessionUser } from "@/lib/session-user";

export async function GET() {
  const user = await getSessionUser();
  if (!user) return Response.json({ error: "Authentication required." }, { status: 401 });
  const database = getDatabase();
  if (!database) return Response.json({ error: "Database connection is not configured." }, { status: 503 });
  const result = await database.query("select id, label, recipient_name, phone, address, state, city, postal_code, is_default from public.addresses where user_id = $1 order by is_default desc, created_at desc", [user.id]);
  return Response.json({ addresses: result.rows });
}

export async function POST(request: Request) {
  const user = await getSessionUser();
  if (!user) return Response.json({ error: "Authentication required." }, { status: 401 });
  const body = await request.json() as { label?: string; recipientName?: string; phone?: string; address?: string; state?: string; city?: string; postalCode?: string; isDefault?: boolean };
  if (!body.recipientName || !body.phone || !body.address || !body.state || !body.city) return Response.json({ error: "Please complete all required address fields." }, { status: 400 });
  const database = getDatabase();
  if (!database) return Response.json({ error: "Database connection is not configured." }, { status: 503 });
  if (body.isDefault) await database.query("update public.addresses set is_default = false where user_id = $1", [user.id]);
  const result = await database.query("insert into public.addresses (id, user_id, label, recipient_name, phone, address, state, city, postal_code, is_default) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) returning id, label, recipient_name, phone, address, state, city, postal_code, is_default", [randomUUID(), user.id, body.label || "Home", body.recipientName, body.phone, body.address, body.state, body.city, body.postalCode || null, Boolean(body.isDefault)]);
  return Response.json({ address: result.rows[0] }, { status: 201 });
}
