const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log("Setting all sources to detik.com...");
  const updateResult = await prisma.article.updateMany({
    where: {
      OR: [
        { source: null },
        { source: "" }
      ]
    },
    data: {
      source: 'detik.com'
    }
  });
  console.log(`Updated ${updateResult.count} articles to source 'detik.com'`);

  console.log("Checking for broken thumbnails...");
  const articles = await prisma.article.findMany({
    select: { id: true, thumbnail: true }
  });

  let deletedCount = 0;
  for (const article of articles) {
    if (!article.thumbnail) continue;
    
    // If it's a relative path starting with /, it's a local file, assume it works if we uploaded it.
    // If it's http/https, we check it.
    if (article.thumbnail.startsWith('http')) {
      try {
        const response = await fetch(article.thumbnail, { method: 'HEAD', signal: AbortSignal.timeout(5000) });
        if (!response.ok && response.status !== 405) { // some servers block HEAD with 405
          // Let's do a GET with range to be sure if HEAD fails with other than 405
          const getResp = await fetch(article.thumbnail, { headers: { Range: 'bytes=0-0' }, signal: AbortSignal.timeout(5000) });
          if (!getResp.ok) {
            await prisma.article.delete({ where: { id: article.id } });
            deletedCount++;
            console.log(`Deleted article ${article.id} with broken image (Status ${getResp.status}): ${article.thumbnail}`);
          }
        }
      } catch (e) {
        await prisma.article.delete({ where: { id: article.id } });
        deletedCount++;
        console.log(`Deleted article ${article.id} with fetch error: ${article.thumbnail}`);
      }
    }
  }
  
  console.log(`Total deleted articles with broken images: ${deletedCount}`);
}

main().finally(() => prisma.$disconnect());
