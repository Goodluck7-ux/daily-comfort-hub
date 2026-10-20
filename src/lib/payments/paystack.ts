const PAYSTACK_API = "https://api.paystack.co";

export async function initializePaystackTransaction(input: { email: string; amountKobo: number; reference: string; callbackUrl: string }) {
  const secret = process.env.PAYSTACK_SECRET_KEY;
  if (!secret) throw new Error("PAYSTACK_SECRET_KEY is not configured");
  const response = await fetch(`${PAYSTACK_API}/transaction/initialize`, { method: "POST", headers: { Authorization: `Bearer ${secret}`, "Content-Type": "application/json" }, body: JSON.stringify({ email: input.email, amount: input.amountKobo, reference: input.reference, callback_url: input.callbackUrl }) });
  if (!response.ok) throw new Error("Unable to initialize Paystack transaction");
  return response.json() as Promise<{ status: boolean; data: { authorization_url: string; access_code: string; reference: string } }>;
}
