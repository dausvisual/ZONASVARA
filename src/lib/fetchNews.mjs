import Parser from 'rss-parser';
import fs from 'fs';
import { JSDOM } from 'jsdom';
import { Readability } from '@mozilla/readability';

const parser = new Parser({
  customFields: {
    item: ['media:content', 'enclosure', 'content:encoded', 'description'],
  }
});

const sources = [
  { name: 'Tribun Makassar', url: 'https://makassar.tribunnews.com/rss', defaultCategory: 'Nasional' },
  { name: 'Detik', url: 'https://news.detik.com/rss', defaultCategory: 'Politik' },
  { name: 'Kompas', url: 'https://www.kompas.com/feed', defaultCategory: 'Hukum' },
  { name: 'Liputan6', url: 'https://www.liputan6.com/rss', defaultCategory: 'Ekonomi' },
  { name: 'CNN Indonesia', url: 'https://www.cnnindonesia.com/nasional/rss', defaultCategory: 'Nasional' },
  { name: 'Tempo', url: 'https://rss.tempo.co/', defaultCategory: 'Nasional' },
  { name: 'Antara News', url: 'https://www.antaranews.com/rss/terkini.xml', defaultCategory: 'Teknologi' }
];

const categories = ['Nasional', 'Politik', 'Ekonomi', 'Teknologi', 'Olahraga', 'Internasional', 'Hukum'];

function guessCategory(title, sourceCategory) {
  const lowerTitle = title.toLowerCase();
  if (lowerTitle.includes('rupiah') || lowerTitle.includes('saham') || lowerTitle.includes('bank') || lowerTitle.includes('ekonomi')) return 'Ekonomi';
  if (lowerTitle.includes('kpk') || lowerTitle.includes('polisi') || lowerTitle.includes('sidang') || lowerTitle.includes('hukum')) return 'Hukum';
  if (lowerTitle.includes('presiden') || lowerTitle.includes('menteri') || lowerTitle.includes('dpr') || lowerTitle.includes('partai')) return 'Politik';
  if (lowerTitle.includes('bola') || lowerTitle.includes('timnas') || lowerTitle.includes('liga') || lowerTitle.includes('juara')) return 'Olahraga';
  if (lowerTitle.includes('ai ') || lowerTitle.includes('apple') || lowerTitle.includes('google') || lowerTitle.includes('teknologi')) return 'Teknologi';
  if (lowerTitle.includes('trump') || lowerTitle.includes('gaza') || lowerTitle.includes('rusia') || lowerTitle.includes('israel') || lowerTitle.includes('dunia')) return 'Internasional';
  
  return sourceCategory;
}

const fallbackImages = [
  '1585829365295-ab7cd400c167', '1504711434969-e33886168f5c', '1495020632551-7f893d6e520f',
  '1526304640581-d334cdbbf45e', '1451187580459-43490279c0fa', '1504384308090-c894fdcc538d',
  '1447015237013-0e8feebdef95', '1497366216548-37526070297c', '1454165804606-c3d57bc86b40',
  '1486406146926-c627a92ad1ab', '1478395433062-f30c56fa8674', '1557804515869-4fb54f16960d',
  '1503694978374-8a2fa6852bce', '1434494878577-86c23bcb06b9', '1511632765486-a96c700344b5'
];

function extractImage(item) {
  // Try enclosure
  if (item.enclosure && item.enclosure.url && !item.enclosure.url.includes('googleusercontent')) return item.enclosure.url;
  // Try media:content
  if (item['media:content'] && item['media:content'].$ && !item['media:content'].$.url.includes('googleusercontent')) return item['media:content'].$.url;
  // Fallback regex on description/content
  const imgRegex = /<img[^>]+src="([^">]+)"/g;
  const content = item['content:encoded'] || item.description || '';
  const match = imgRegex.exec(content);
  if (match && match[1] && !match[1].includes('googleusercontent')) return match[1];
  
  const randomId = fallbackImages[Math.floor(Math.random() * fallbackImages.length)];
  return `https://images.unsplash.com/photo-${randomId}?w=1000&q=80`;
}

async function fetchAll() {
  let allNews = [];
  
  for (const source of sources) {
    try {
      console.log(`Fetching ${source.name}...`);
      const feed = await parser.parseURL(source.url);
      
      const top5 = feed.items.slice(0, 5);
      
      const parsedItems = await Promise.all(top5.map(async (item) => {
        let fullContentHtml = null;
        let hdImage = null;
        
        try {
          const response = await fetch(item.link, {
            headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
          });
          const html = await response.text();
          const dom = new JSDOM(html, { url: item.link });
          const reader = new Readability(dom.window.document);
          const article = reader.parse();
          
          if (article && article.content) {
            fullContentHtml = article.content;
          }
          
          const ogImage = dom.window.document.querySelector('meta[property="og:image"]');
          if (ogImage) hdImage = ogImage.getAttribute('content');
        } catch (err) {
          console.error(`Failed to fetch full content for ${item.link}:`, err.message);
        }

        const title = item.title || 'Tanpa Judul';
        const category = guessCategory(title, source.defaultCategory);
        
        let finalImage = hdImage || extractImage(item);
        if (finalImage && finalImage.includes('googleusercontent')) {
          finalImage = `https://images.unsplash.com/photo-${fallbackImages[Math.floor(Math.random() * fallbackImages.length)]}?w=1000&q=80`;
        }

        let finalContent = fullContentHtml || `<p><strong>ZONASVARA</strong> - ${item.contentSnippet || item.description || title}</p>`;
        
        return {
          title: title,
          category: category,
          slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') + '-' + Math.floor(Math.random() * 1000),
          time: new Date(item.pubDate || new Date()).toLocaleString('id-ID'),
          author: item.creator || source.name,
          editor: source.name,
          image: finalImage,
          content: finalContent,
          tags: [category, source.name],
          sourceName: source.name,
          link: item.link
        };
      }));
      
      allNews.push(...parsedItems);
    } catch (e) {
      console.error(`Failed to fetch ${source.name}: ${e.message}`);
    }
  }

  // Create category mapping
  const categoryData = {};
  categories.forEach(c => categoryData[c.toLowerCase()] = []);
  
  allNews.forEach(news => {
    const cat = news.category.toLowerCase();
    if (categoryData[cat]) {
      categoryData[cat].push(news);
    } else {
      categoryData['nasional'].push(news);
    }
  });

  // Ensure all categories have at least 1 item by duplicating if necessary
  categories.forEach(c => {
    const cat = c.toLowerCase();
    if (categoryData[cat].length === 0) {
       categoryData[cat].push(allNews[0]);
    }
  });

  const fileContent = `// AUTO-GENERATED: MOCK DATA FROM REAL SOURCES
export const mockNews = ${JSON.stringify(categoryData, null, 2)};
`;

  fs.writeFileSync('./src/lib/mockNews.ts', fileContent);
  console.log('Saved to src/lib/mockNews.ts. Total items:', allNews.length);
}

fetchAll();
