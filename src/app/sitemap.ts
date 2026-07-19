import { MetadataRoute } from 'next'
import prisma from "@/lib/prisma"
 
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articles = await prisma.article.findMany({
    where: { status: 'PUBLISHED' },
    select: { slug: true, updatedAt: true },
  })
 
  const categories = await prisma.category.findMany({
    select: { slug: true, updatedAt: true },
  })

  const articleEntries = articles.map((article) => ({
    url: `https://zonasvara.space/berita/${article.slug}`,
    lastModified: article.updatedAt,
    changeFrequency: 'never' as const,
    priority: 0.8,
  }))

  const categoryEntries = categories.map((category) => ({
    url: `https://zonasvara.space/kategori/${category.slug}`,
    lastModified: category.updatedAt,
    changeFrequency: 'daily' as const,
    priority: 0.7,
  }))

  const staticEntries = [
    {
      url: 'https://zonasvara.space',
      lastModified: new Date(),
      changeFrequency: 'always' as const,
      priority: 1,
    },
    {
      url: 'https://zonasvara.space/berita',
      lastModified: new Date(),
      changeFrequency: 'hourly' as const,
      priority: 0.9,
    },
    {
      url: 'https://zonasvara.space/tentang-kami',
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: 'https://zonasvara.space/pedoman-siber',
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: 'https://zonasvara.space/indeks',
      lastModified: new Date(),
      changeFrequency: 'always' as const,
      priority: 0.8,
    },
    {
      url: 'https://zonasvara.space/opini',
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    {
      url: 'https://zonasvara.space/video',
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    {
      url: 'https://zonasvara.space/live',
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    {
      url: 'https://zonasvara.space/disclaimer',
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.3,
    },
    {
      url: 'https://zonasvara.space/kebijakan-privasi',
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.3,
    },
    {
      url: 'https://zonasvara.space/syarat-ketentuan',
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.3,
    }
  ]

  return [...staticEntries, ...categoryEntries, ...articleEntries]
}
