import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding categorías...");

  const categories = [
    { name: "A", coefficient: 0.25, pricePerM2: 520000 },
    { name: "B", coefficient: 0.22, pricePerM2: 437200 },
    { name: "C", coefficient: 0.18, pricePerM2: 340000 },
    { name: "D", coefficient: 0.15, pricePerM2: 233500 },
  ];

  for (const category of categories) {
    await prisma.category.upsert({
      where: { name: category.name },
      update: {},
      create: category,
    });
  }

  console.log("✅ Categorías cargadas");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });