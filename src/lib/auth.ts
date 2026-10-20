import { betterAuth } from "better-auth";
import { Pool } from "pg";

let authInstance: ReturnType<typeof betterAuth> | null = null;

export function getAuth() {
  if (authInstance) return authInstance;
  if (process.env.NEXT_PHASE === "phase-production-build") return null;
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) return null;
  authInstance = betterAuth({ database: new Pool({ connectionString, max: 5 }), emailAndPassword: { enabled: true }, trustedOrigins: [process.env.BETTER_AUTH_URL ?? "http://localhost:3000"] }) as ReturnType<typeof betterAuth>;
  return authInstance;
}

export const auth = getAuth();
export default auth;
