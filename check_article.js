const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
  const article = await prisma.article.findFirst();
  const urls = article.content.match(/href="([^"]*)"/g);
  console.log("URLs in content:", urls);
}
main().finally(() => prisma.$disconnect());
