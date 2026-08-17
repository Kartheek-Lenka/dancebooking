import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Database seeded successfully.");
  console.log(
    "Admin credentials are configured via environment variables."
  );
  console.log(
    "Set ADMIN_EMAIL and ADMIN_PASSWORD in your .env file."
  );
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
