import { getDatabase } from "@/lib/db";

export async function GET(request: Request) {
  const reference = new URL(request.url).searchParams.get("reference");
  const secret = process.env.PAYSTACK_SECRET_KEY;
  if (!reference) return Response.json({ error: "Payment reference is required." }, { status: 400 });
  if (!secret) return Response.json({ error: "PAYSTACK_SECRET_KEY is not configured." }, { status: 503 });
  try {
    const response = await fetch(`https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`, { headers: { Authorization: `Bearer ${secret}` }, cache: "no-store" });
    const payload = await response.json() as { status?: boolean; data?: { status?: string; reference?: string } };
    if (!response.ok || payload.data?.status !== "success") return Response.json({ paid: false, status: payload.data?.status ?? "failed" }, { status: 402 });
    const database = getDatabase();
    if (!database) return Response.json({ error: "Database connection is not configured." }, { status: 503 });
    await database.query("update public.orders set status = 'paid', paid_at = now() where reference = $1", [reference]);
    return Response.json({ paid: true, reference: payload.data.reference });
  } catch { return Response.json({ error: "Unable to verify payment." }, { status: 500 }); }
}
