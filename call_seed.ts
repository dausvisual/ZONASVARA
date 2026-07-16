import { seedDatabase } from './src/app/actions/seed';
import prisma from './src/lib/prisma';

async function run() {
  console.log("Deleting old dummy articles...");
  try {
    const deleted = await prisma.article.deleteMany({
      where: {
        content: {
          contains: "Kredit Editor"
        }
      }
    });
    console.log(`Deleted ${deleted.count} old dummy articles.`);
  } catch (err) {
    console.log("Error deleting old articles:", err);
  }

  console.log("Seeding new local articles...");
  seedDatabase().then(console.log).catch(console.error);
}

run();
