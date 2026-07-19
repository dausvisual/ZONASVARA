const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const result = await prisma.article.deleteMany({
    where: {
      OR: [
        { thumbnail: null },
        { thumbnail: "" }
      ]
    }
  });
  console.log(`Deleted ${result.count} articles without photos.`);
}
main().finally(() => prisma.$disconnect());
