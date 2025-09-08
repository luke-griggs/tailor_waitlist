import { createClient, Client } from "@libsql/client";

let client: Client | null = null;

export function getTursoClient(): Client {
  if (client) return client;

  const url = process.env.TURSO_DATABASE_URL;
  const authToken = process.env.TURSO_AUTH_TOKEN;

  if (!url) throw new Error("Missing TURSO_DATABASE_URL env var");
  if (!authToken) throw new Error("Missing TURSO_AUTH_TOKEN env var");

  client = createClient({ url, authToken });
  return client;
}

