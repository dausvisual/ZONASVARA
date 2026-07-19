import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, Calendar, User, Share2, Link as LinkIcon, MessageSquare } from "lucide-react";
import { FaFacebook, FaTwitter } from "react-icons/fa";
import prisma from "@/lib/prisma";
import { format } from "date-fns";
import { id } from "date-fns/locale";

import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  
  const article = await prisma.article.findUnique({
    where: { slug: resolvedParams.slug },
  });

  if (!article) {
    return {
      title: "Berita Tidak Ditemukan - ZONASVARA SPACE",
    };
  }

  // Menghilangkan tag HTML dari konten untuk description (opsional, max 160 char)
  const plainTextDesc = article.summary || article.content.replace(/<[^>]+>/g, '').substring(0, 160) + "...";

  return {
    title: `${article.title} - ZONASVARA SPACE`,
    description: plainTextDesc,
    openGraph: {
      title: article.title,
      description: plainTextDesc,
      url: `https://zonasvaraspace.com/berita/${article.slug}`, // ganti dengan domain asli
      siteName: 'ZONASVARA SPACE',
      images: [
        {
          url: article.thumbnail || 'https://zonasvaraspace.com/logo-utama.png', 
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
      type: 'article',
      publishedTime: article.createdAt.toISOString(),
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: plainTextDesc,
      images: [article.thumbnail || 'https://zonasvaraspace.com/logo-utama.png'],
    },
  };
}

export default async function NewsDetail({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  
  const article = await prisma.article.findUnique({
    where: { slug: resolvedParams.slug },
    include: { category: true, author: true }
  });

  if (!article) {
    notFound();
  }

  // Fetch some related news from the same category
  const relatedNews = await prisma.article.findMany({
    where: { 
      categoryId: article.categoryId,
      id: { not: article.id },
      status: "PUBLISHED"
    },
    take: 3,
    orderBy: { createdAt: "desc" },
    include: { category: true }
  });

  const formatDate = (date: Date) => format(date, "EEEE, dd MMMM yyyy - HH:mm", { locale: id });

  return (
    <div className="bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link href="/" className="hover:text-primary transition-colors">Beranda</Link>
          <ChevronRight size={14} />
          {article.category && (
            <>
              <Link href={`/kategori/${article.category.slug}`} className="hover:text-primary transition-colors">{article.category.name}</Link>
              <ChevronRight size={14} />
            </>
          )}
          <span className="text-foreground truncate max-w-[200px] sm:max-w-[400px]">{article.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Main Content Area */}
          <article className="lg:col-span-8">
            
            {/* Article Header */}
            <header className="mb-8 space-y-6">
              {article.category && (
                <Link href={`/kategori/${article.category.slug}`} className="inline-block bg-primary/10 text-primary font-bold px-3 py-1 rounded-md text-xs uppercase tracking-wider hover:bg-primary hover:text-white transition-colors">
                  {article.category.name}
                </Link>
              )}
              
              <h1 className="text-3xl md:text-5xl font-bold font-heading leading-tight">
                {article.title}
              </h1>

              <div className="flex flex-wrap items-center gap-y-4 justify-between border-y border-border py-4">
                <div className="flex items-center gap-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2 font-medium text-foreground">
                    <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center shrink-0">
                      <User size={16} />
                    </div>
                    {article.author?.name || "Redaksi"}
                  </div>
                  <div className="flex items-center gap-1.5 hidden sm:flex">
                    <Calendar size={16} />
                    {formatDate(article.createdAt)} WIB
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-muted-foreground mr-2">Bagikan:</span>
                  <button className="w-8 h-8 rounded-full bg-slate-100 hover:bg-blue-100 text-slate-600 hover:text-blue-600 dark:bg-slate-800 dark:text-slate-400 flex items-center justify-center transition-colors">
                    <FaFacebook size={14} />
                  </button>
                  <button className="w-8 h-8 rounded-full bg-slate-100 hover:bg-sky-100 text-slate-600 hover:text-sky-500 dark:bg-slate-800 dark:text-slate-400 flex items-center justify-center transition-colors">
                    <FaTwitter size={14} />
                  </button>
                  <button className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-400 flex items-center justify-center transition-colors">
                    <LinkIcon size={14} />
                  </button>
                </div>
              </div>
            </header>

            {/* Featured Image */}
            <div className="mb-8">
              <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden bg-slate-200">
                {article.thumbnail && (
                  <Image 
                    src={article.thumbnail}
                    alt={article.title}
                    fill
                    unoptimized
                    className="object-cover"
                    priority
                  />
                )}
              </div>
            </div>

            {/* Article Body */}
            <div className="prose prose-lg prose-slate dark:prose-invert max-w-none prose-headings:font-heading prose-a:text-primary hover:prose-a:text-primary/80 prose-img:rounded-xl">
              <div dangerouslySetInnerHTML={{ __html: article.content }}></div>
            </div>

          </article>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-8">
            
            {/* Related News */}
            <div className="bg-slate-50 dark:bg-slate-900 rounded-xl p-6 border border-border">
              <div className="flex items-center gap-2 mb-6">
                <span className="w-1.5 h-5 bg-primary rounded-full block"></span>
                <h3 className="text-lg font-bold font-heading uppercase">Berita Terkait</h3>
              </div>
              
              <div className="space-y-6">
                {relatedNews.length === 0 ? (
                  <p className="text-sm text-muted-foreground">Tidak ada berita terkait.</p>
                ) : (
                  relatedNews.map((item, idx) => (
                    <Link href={`/berita/${item.slug}`} key={idx} className="group block cursor-pointer">
                      <div className="flex gap-4">
                        <div className="relative w-20 h-20 shrink-0 overflow-hidden rounded-md bg-slate-200">
                          {item.thumbnail && (
                            <Image src={item.thumbnail} alt={item.title} fill unoptimized className="object-cover group-hover:scale-110 transition-transform duration-500" />
                          )}
                        </div>
                        <div className="flex flex-col justify-center">
                          <h4 className="font-semibold text-sm leading-snug group-hover:text-primary transition-colors line-clamp-3">
                            {item.title}
                          </h4>
                          <span className="text-[11px] text-muted-foreground mt-2">{format(item.createdAt, "dd MMM yyyy", { locale: id })}</span>
                        </div>
                      </div>
                    </Link>
                  ))
                )}
              </div>
            </div>

          </aside>

        </div>
      </div>
    </div>
  );
}
