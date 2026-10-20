import { NextRequest } from "next/server";
import { getAuth } from "@/lib/auth";

async function handle(request: NextRequest) {
  const auth = getAuth();
  if (!auth) return new Response("Authentication database is not configured", { status: 503 });
  return auth.handler(request);
}

export const GET = handle;
export const POST = handle;
