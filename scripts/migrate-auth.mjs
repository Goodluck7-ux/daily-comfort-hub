import fs from "node:fs";
import { betterAuth } from "better-auth";
import { getMigrations } from "better-auth/db/migration";
import pg from "pg";

const envPath = new URL("../.env.local", import.meta.url);
const envText = fs.readFileSync(envPath, "utf8");
for (const line of envText.split(/\r?\n/)) {
  const match = line.match(/^([A-Z0-9_]+)=(.*)$/);
  if (match && !process.env[match[1]]) process.env[match[1]] = match[2].replace(/^"|"$/g, "");
}

if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is missing from .env.local");
const db = new pg.Pool({ connectionString: process.env.DATABASE_URL, max: 2 });
const auth = betterAuth({ database: db, emailAndPassword: { enabled: true }, secret: process.env.BETTER_AUTH_SECRET, trustedOrigins: [process.env.BETTER_AUTH_URL ?? "http://localhost:3000"] });
const migration = await getMigrations(auth.options);
await migration.runMigrations();
console.log(`Better Auth migration complete: ${migration.toBeCreated.length} new tables, ${migration.toBeAdded.length} new fields.`);
await db.end();
