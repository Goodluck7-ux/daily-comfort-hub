import { randomUUID } from "node:crypto";
import { getCatalogProducts } from "@/lib/catalog";
import { getDatabase } from "@/lib/db";
import { initializePaystackTransaction } from "@/lib/payments/paystack";

type CheckoutBody = { email?: string; phone?: string; name?: string; address?: string; state?: string; city?: string; postalCode?: string; notes?: string; delivery?: string; items?: { productId?: string; quantity?: number; color?: string }[] };

export async function POST(request: Request) {
  try {
    const body = await request.json() as CheckoutBody;
    if (!body.email || !body.name || !body.address || !body.state || !body.city || !body.items?.length) return Response.json({ error: "Please complete your contact, delivery, and cart details." }, { status: 400 });
    const database = getDatabase();
    if (!database) return Response.json({ error: "Database connection is not configured." }, { status: 503 });
    const catalog = await getCatalogProducts();
    const lineItems = body.items.map((item) => { const product = catalog.find((candidate) => candidate.id === item.productId); const quantity = Math.max(1, Math.floor(item.quantity || 1)); return product ? { product, quantity, color: item.color } : null; }).filter((item): item is NonNullable<typeof item> => item !== null);
    if (lineItems.length !== body.items.length) return Response.json({ error: "One or more cart items are no longer available." }, { status: 400 });
    const subtotal = lineItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    const shipping = body.delivery === "express" ? 500_000 : 0;
    const total = subtotal + shipping;
    const orderId = randomUUID();
    const reference = `CH-${Date.now()}-${randomUUID().slice(0, 8)}`;
    await database.query("insert into public.orders (id, reference, email, phone, full_name, address, state, city, postal_code, notes, delivery_method, subtotal_kobo, shipping_kobo, total_kobo) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)", [orderId, reference, body.email, body.phone ?? null, body.name, body.address, body.state, body.city, body.postalCode ?? null, body.notes ?? null, body.delivery === "express" ? "express" : "standard", subtotal, shipping, total]);
    for (const item of lineItems) await database.query("insert into public.order_items (id, order_id, product_id, product_name, product_slug, color, quantity, unit_price_kobo) values ($1, $2, $3, $4, $5, $6, $7, $8)", [randomUUID(), orderId, item.product.id, item.product.name, item.product.slug, item.color ?? null, item.quantity, item.product.price]);
    const callbackUrl = `${process.env.BETTER_AUTH_URL ?? "http://localhost:3000"}/checkout`;
    const payment = await initializePaystackTransaction({ email: body.email, amountKobo: total, reference, callbackUrl });
    return Response.json({ authorizationUrl: payment.data.authorization_url, reference, orderId, amount: total });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to start payment.";
    return Response.json({ error: message }, { status: message.includes("not configured") ? 503 : 500 });
  }
}
