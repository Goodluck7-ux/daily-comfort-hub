import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const secretKey = process.env.SUPABASE_SECRET_KEY ?? process.env.SUPABASE_SERVICE_ROLE_KEY;

export function getSupabaseServer() {
  if (!url || !secretKey) throw new Error("Supabase server credentials are not configured");
  return createClient(url, secretKey, { auth: { autoRefreshToken: false, persistSession: false } });
}
