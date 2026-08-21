import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createPrismaClient() {
  if (!process.env.DATABASE_URL) {
    return null;
  }

  let url = process.env.DATABASE_URL;
  if (!url.includes("connectTimeoutMS")) {
    url += (url.includes("?") ? "&" : "?") + "connectTimeoutMS=5000&serverSelectionTimeoutMS=5000";
  }

  return new PrismaClient({
    datasourceUrl: url,
  });
}

export const db = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production" && db) globalForPrisma.prisma = db;

export async function withDbTimeout<T>(
  operation: () => Promise<T>,
  fallback: T,
  ms = 10000
): Promise<T> {
  return Promise.race([
    operation().catch(() => fallback),
    new Promise<T>((resolve) => setTimeout(() => resolve(fallback), ms)),
  ]);
}
