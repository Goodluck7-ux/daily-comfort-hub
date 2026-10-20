import { Pool } from "pg";

let pool: Pool | null = null;

export function getDatabase() {
  if (pool) return pool;
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) return null;
  pool = new Pool({ connectionString, max: 5 });
  return pool;
}
