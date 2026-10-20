import { randomUUID } from "node:crypto";
import { getDatabase } from "@/lib/db";
import { getSessionUser } from "@/lib/session-user";
import { hasAdminAccess } from "@/lib/require-admin";
import { getSupabaseServer } from "@/lib/supabase/server";

async function ensureAdmin() { const user = await getSessionUser(); return user && await hasAdminAccess(user.email) ? user : null; }

export async function GET() {
  if (!await ensureAdmin()) return Response.json({ error: "Admin access required." }, { status: 403 });
  const database = getDatabase(); if (!database) return Response.json({ error: "Database connection is not configured." }, { status: 503 });
  const result = await database.query("select id, slug, name, category_path, summary, description, price_kobo, images, availability, stock_count, sourcing_eta, colors, features, specs from public.products order by created_at desc");
  return Response.json({ products: result.rows });
}

async function uploadImages(files: File[]) {
  if (!files.length) return [];
  const client = getSupabaseServer();
  await client.storage.createBucket("product-images", { public: true }).catch(() => undefined);
  const storage = client.storage.from("product-images");
  const urls: string[] = [];
  for (const file of files) {
    const extension = file.name.split(".").pop()?.toLowerCase() || "jpg";
    const path = `${Date.now()}-${randomUUID()}.${extension}`;
    const upload = await storage.upload(path, Buffer.from(await file.arrayBuffer()), { contentType: file.type || "image/jpeg", upsert: false });
    if (upload.error) throw new Error(`Image upload failed: ${upload.error.message}. Create a public Supabase Storage bucket named product-images.`);
    urls.push(storage.getPublicUrl(path).data.publicUrl);
  }
  return urls;
}

export async function POST(request: Request) {
  if (!await ensureAdmin()) return Response.json({ error: "Admin access required." }, { status: 403 });
  const form = await request.formData();
  const value = (name: string) => String(form.get(name) || "");
  const files = form.getAll("images").filter((item): item is File => item instanceof File && item.size > 0);
  const name = value("name"); const summary = value("summary"); const description = value("description"); const priceValue = value("price");
  if (!name || !summary || !description || !priceValue || !files.length) return Response.json({ error: "Name, summary, description, price, and at least one image are required." }, { status: 400 });
  const database = getDatabase(); if (!database) return Response.json({ error: "Database connection is not configured." }, { status: 503 });
  const price = Math.round(Number(priceValue.replaceAll(",", "")) * 100);
  if (!Number.isFinite(price) || price < 0) return Response.json({ error: "Enter a valid price in naira." }, { status: 400 });
  let colors: unknown[] = []; let specs: Record<string, string> = {};
  try { colors = value("colors") ? JSON.parse(value("colors")) as unknown[] : []; specs = value("specs") ? JSON.parse(value("specs")) as Record<string, string> : {}; } catch { return Response.json({ error: "There was a problem with the product details." }, { status: 400 }); }
  try {
    const images = await uploadImages(files);
    const slug = (value("slug") || name).toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    const result = await database.query("insert into public.products (id, slug, name, category_path, summary, description, price_kobo, images, availability, stock_count, sourcing_eta, colors, features, specs) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) returning id", [randomUUID(), slug, name.trim(), value("categoryPath").split(",").map((item) => item.trim()).filter(Boolean), summary.trim(), description.trim(), price, images, value("availability") === "on_request" ? "on_request" : "in_stock", value("stockCount") ? Math.max(0, Math.floor(Number(value("stockCount")))) : null, value("sourcingEta") || null, JSON.stringify(colors), JSON.stringify(value("features").split("\n").map((item) => item.trim()).filter(Boolean)), JSON.stringify(specs)]);
    return Response.json({ id: result.rows[0].id, slug }, { status: 201 });
  } catch (error) { const message = error instanceof Error ? error.message : "Unable to publish product."; return Response.json({ error: message }, { status: 500 }); }
}
