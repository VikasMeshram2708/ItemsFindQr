import { config } from "dotenv";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
config({ path: ".env.local" });
import * as schema from "./schema";

console.log("env-2", process.env.NEXT_PUBLIC_DATABASE_URL);
const pool = new Pool({
  connectionString: process.env.NEXT_PUBLIC_DATABASE_URL,
});

export const db = drizzle({ client: pool, schema });