import { getDatabase } from "@/lib/db";
import { getSessionUser } from "@/lib/session-user";

export async function PATCH(request: Request) {
  const user = await getSessionUser();
  if (!user) return Response.json({ error: "Authentication required." }, { status: 401 });
  const body = await request.json() as { name?: string };
  if (!body.name?.trim()) return Response.json({ error: "Name is required." }, { status: 400 });
  const database = getDatabase();
  if (!database) return Response.json({ error: "Database connection is not configured." }, { status: 503 });
  await database.query("update public.user set name = $1 where id = $2", [body.name.trim(), user.id]);
  return Response.json({ name: body.name.trim() });
}
