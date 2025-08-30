import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import { neonConfig } from "@neondatabase/serverless";

import ws from "ws";
neonConfig.webSocketConstructor = ws;

// For edge environments (optional)
// neonConfig.poolQueryViaFetch = true

// ---- Type augmentation for globalThis ----
declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

// Connection string
const connectionString = process.env.DATABASE_URL as string;
const adapter = new PrismaNeon({ connectionString });

// ---- Singleton instance ----
const prisma =
  globalThis.prisma || new PrismaClient({ adapter });

if (process.env.NODE_ENV === "development") {
  globalThis.prisma = prisma;
}

export default prisma;