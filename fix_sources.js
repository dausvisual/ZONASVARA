const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

function extractBestSourceUrl(content) {
  // Extract all href URLs
  const urlMatches = content.match(/href="(https?:\/\/[^"&]+)"/g) || [];
  const urls = urlMatches
    .map(m => m.replace(/href="/, '').replace(/"$/, ''))
    .filter(url => {
      const lower = url.toLowerCase();
      // Exclude: social media, tag pages, topic pages, short/generic URLs
      return !lower.includes('instagram.com') &&
             !lower.includes('tiktok.com') &&
             !lower.includes('facebook.com') &&
             !lower.includes('twitter.com') &&
             !lower.includes('x.com') &&
             !lower.includes('youtube.com') &&
             !lower.includes('news.google.com') &&  // Not real source
             !lower.includes('google.com') &&
             !lower.includes('/tag/') &&
             !lower.includes('/tags/') &&
             !lower.includes('/topic/') &&
             !lower.includes('/label/') &&
             url.split('/').length > 4 && // Must have a real path
             url.length > 30; // Must be a meaningful URL
    });

  // Prefer known Indonesian news domains
  const priorityDomains = [
    'news.detik.com', 'detik.com', 'cnnindonesia.com', 
    'tempo.co', 'nasional.tempo.co', 'en.tempo.co',
    'antaranews.com', 'kompas.com', 'tribunnews.com',
    'cnbcindonesia.com', 'merdeka.com', 'republika.co.id',
    'okezone.com', 'liputan6.com', 'suara.com',
    'cantika.com', 'cnn.com', 'edition.cnn.com',
    'bbc.com', 'reuters.com', 'ap.org',
    'aa.com.tr',
  ];

  for (const domain of priorityDomains) {
    const match = urls.find(u => u.includes(domain));
    if (match) {
      try {
        const parsed = new URL(match);
        return {
          url: match,
          domain: parsed.hostname.replace('www.', '')
        };
      } catch (e) {}
    }
  }

  // Fallback: use first valid URL
  if (urls.length > 0) {
    try {
      const parsed = new URL(urls[0]);
      return { url: urls[0], domain: parsed.hostname.replace('www.', '') };
    } catch (e) {}
  }

  return { url: null, domain: null };
}

async function main() {
  const articles = await prisma.article.findMany({
    select: { id: true, title: true, source: true, content: true }
  });

  console.log(`\nRe-checking ${articles.length} articles...\n`);

  let updatedCount = 0;
  for (const article of articles) {
    const { url, domain } = extractBestSourceUrl(article.content);
    const bestSource = domain || 'Tim Redaksi ZONASVARA';

    if (bestSource !== article.source) {
      await prisma.article.update({
        where: { id: article.id },
        data: { source: bestSource }
      });
      console.log(`✓ Fixed: "${article.title.substring(0, 55)}"`);
      console.log(`  ${article.source} → ${bestSource}`);
      if (url) console.log(`  URL: ${url}`);
      console.log();
      updatedCount++;
    } else {
      console.log(`- OK: "${article.title.substring(0, 55)}" → ${article.source}`);
    }
  }

  console.log(`\n✅ Done. Updated ${updatedCount} articles.`);
}

main().finally(() => prisma.$disconnect());
