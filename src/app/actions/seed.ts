"use server";

import prisma from "@/lib/prisma";
import { mockNews } from "@/lib/mockNews";
import { revalidatePath } from "next/cache";
import { getOrCreateDummyUser } from "./article";

export async function seedDatabase() {
  try {
    const adminUser = await getOrCreateDummyUser();
    
    // 1. Ensure the new "News" category exists
    const newsSlug = "news";
    let newsCategory = await prisma.category.findUnique({ where: { slug: newsSlug } });
    if (!newsCategory) {
      newsCategory = await prisma.category.create({
        data: { name: "News", slug: newsSlug }
      });
    }

    let importedCount = 0;

    // 2. Loop through mock data
    for (const [categoryKey, articles] of Object.entries(mockNews)) {
      // Find or create category
      let categoryName = categoryKey.charAt(0).toUpperCase() + categoryKey.slice(1);
      
      // Some formatting for specific keys
      if (categoryName === "Gayahidup") categoryName = "Gaya Hidup";
      
      let category = await prisma.category.findUnique({ where: { slug: categoryKey } });
      if (!category) {
        category = await prisma.category.create({
          data: { name: categoryName, slug: categoryKey }
        });
      }

      // Insert articles
      for (const item of articles) {
        // Strip HTML for summary
        const summary = item.content.replace(/<[^>]+>/g, "").substring(0, 150) + "...";

        // Logo mapping
        let logoUrl = "";
        if (item.sourceName === "Tempo") logoUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Tempo_Media_Group_logo.svg/120px-Tempo_Media_Group_logo.svg.png";
        else if (item.sourceName === "Detik") logoUrl = "https://cdn.detik.net.id/detik2/images/logo.png";
        else if (item.sourceName === "CNN" || item.sourceName === "CNN Indonesia") logoUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/CNN.svg/120px-CNN.svg.png";
        else if (item.sourceName === "Antara News") logoUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Antara_logo.svg/120px-Antara_logo.svg.png";
        else if (item.sourceName === "Google News") logoUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Google_News_icon.svg/120px-Google_News_icon.svg.png";
        
        let creditHtml = "";
        if (item.sourceName) {
           creditHtml = `
            <hr style="margin-top: 30px; margin-bottom: 20px;" />
            <div style="display: flex; align-items: center; gap: 15px; padding: 15px; background: #f8fafc; border-radius: 8px; border: 1px solid #e2e8f0;">
              ${logoUrl ? `<img src="${logoUrl}" alt="${item.sourceName}" style="height: 30px; width: auto; margin: 0; filter: drop-shadow(0 1px 2px rgb(0 0 0 / 0.1));" />` : ''}
              <div>
                <p style="margin: 0; font-size: 14px; color: #475569;"><strong>Kredit Editor:</strong> Berita contoh ini disadur dari <strong>${item.sourceName}</strong> hanya untuk keperluan demo UI/UX semata.</p>
                ${item.link ? `<p style="margin: 0; font-size: 12px; margin-top: 4px;"><a href="${item.link}" target="_blank" style="color: #2563eb; text-decoration: none; font-weight: 500;">Baca artikel aslinya di sini &rarr;</a></p>` : ''}
              </div>
            </div>
           `;
        }
        
        const finalContent = item.content + creditHtml;

        await prisma.article.upsert({
          where: { slug: item.slug },
          update: { 
            content: finalContent,
            summary: summary,
            thumbnail: item.image || null,
          },
          create: {
            title: item.title,
            slug: item.slug,
            content: finalContent,
            summary: summary,
            thumbnail: item.image || null,
            categoryId: category.id,
            authorId: adminUser.id,
            status: "PUBLISHED",
            viewCount: Math.floor(Math.random() * 500)
          }
        });
        importedCount++;
      }
    }

    revalidatePath("/admin");
    revalidatePath("/admin/articles");
    revalidatePath("/admin/categories");
    
    return { success: true, count: importedCount };
  } catch (error: any) {
    console.error("Seeding error:", error);
    return { error: error.message };
  }
}
