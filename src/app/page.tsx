import Image from "next/image";
import Link from "next/link";
import { ChevronRight, PlayCircle, Headphones, Image as ImageIcon } from "lucide-react";
import prisma from "@/lib/prisma";
import { format } from "date-fns";
import { id } from "date-fns/locale";

export default async function Home() {
  // Fetch latest published articles from database
  const allNews = await prisma.article.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { createdAt: "desc" },
    take: 20,
    include: { category: true, author: true }
  });

  if (allNews.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold font-heading">Belum ada berita</h2>
          <p className="text-muted-foreground">Silakan import data dummy di halaman admin terlebih dahulu.</p>
          <Link href="/admin" className="inline-block bg-primary text-primary-foreground px-4 py-2 rounded-md">Ke Halaman Admin</Link>
        </div>
      </div>
    );
  }

  const heroNews = allNews[0];
  const popularNews = allNews.slice(1, 5);
  const editorChoice = allNews.slice(5, 9);
  
  const formatDate = (date: Date) => format(date, "dd MMM yyyy, HH:mm", { locale: id });

  return (
    <div className="bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 space-y-12">
        
        {/* Top Section: Hero & Popular */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Hero Featured Article */}
          <div className="lg:col-span-8 relative group cursor-pointer overflow-hidden rounded-xl shadow-lg h-[400px] md:h-[500px]">
              <Image 
                src={heroNews.thumbnail || "https://images.unsplash.com/photo-1542281286-9e0a16bb7366?q=80&w=1000&auto=format&fit=crop"} 
                alt={heroNews.title} 
                fill 
                unoptimized
                className="object-cover transition-transform duration-700 group-hover:scale-105" 
                priority
              />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent"></div>
            <Link href={`/berita/${heroNews.slug}`} className="absolute bottom-0 left-0 p-6 md:p-10 w-full">
              <span className="bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-sm mb-4 inline-block">{heroNews.category?.name || "Umum"}</span>
              <h1 className="text-white text-2xl md:text-4xl font-bold font-heading leading-tight mb-3 group-hover:text-secondary transition-colors">
                {heroNews.title}
              </h1>
              <p className="text-slate-200 text-sm md:text-base mb-4 line-clamp-2 max-w-3xl" dangerouslySetInnerHTML={{ __html: heroNews.summary || "" }}></p>
              <div className="flex items-center gap-2 text-white font-semibold text-sm">
                Baca Selengkapnya <ChevronRight size={16} />
              </div>
            </Link>
          </div>

          {/* Popular News Sidebar */}
          <div className="lg:col-span-4 flex flex-col h-full">
            <div className="flex items-center gap-2 mb-6">
              <span className="w-1.5 h-6 bg-accent rounded-full block"></span>
              <h2 className="text-xl font-bold font-heading uppercase">Terbaru</h2>
            </div>
            
            <div className="flex flex-col gap-6 flex-grow">
              {popularNews.map((item, idx) => (
                <Link href={`/berita/${item.slug}`} key={idx} className="flex gap-4 group cursor-pointer">
                  <div className="relative w-24 h-20 shrink-0 overflow-hidden rounded-md shadow-sm bg-slate-200">
                    {item.thumbnail && (
                      <Image src={item.thumbnail} alt={item.title} fill unoptimized className="object-cover group-hover:scale-110 transition-transform duration-500" />
                    )}
                  </div>
                  <div className="flex flex-col justify-between py-1">
                    <h3 className="font-semibold text-sm leading-snug group-hover:text-primary transition-colors line-clamp-2">
                      {item.title}
                    </h3>
                    <p className="text-xs text-muted-foreground">{formatDate(item.createdAt)}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Editor's Choice Section */}
        {editorChoice.length > 0 && (
          <section className="pt-8 border-t border-border">
            <div className="flex justify-between items-end mb-8">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-6 bg-primary rounded-full block"></span>
                <h2 className="text-2xl font-bold font-heading uppercase">Pilihan Editor</h2>
              </div>
              <Link href="/berita" className="text-sm font-semibold text-muted-foreground hover:text-primary transition-colors hidden sm:flex items-center gap-1">
                Lihat Semua <ChevronRight size={16} />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {editorChoice.map((item, idx) => (
                <Link href={`/berita/${item.slug}`} key={idx} className="group cursor-pointer">
                  <div className="relative h-48 mb-4 overflow-hidden rounded-lg shadow-sm bg-slate-200">
                    {item.thumbnail && (
                      <Image src={item.thumbnail} alt={item.title} fill unoptimized className="object-cover group-hover:scale-110 transition-transform duration-500" />
                    )}
                    <div className="absolute top-3 left-3">
                      <span className="bg-background/90 backdrop-blur-sm text-foreground text-[10px] font-bold px-2 py-1 rounded-sm uppercase tracking-wider">
                        {item.category?.name || "Umum"}
                      </span>
                    </div>
                  </div>
                  <h3 className="font-bold text-lg leading-tight mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    {item.title}
                  </h3>
                  <div className="flex items-center text-xs text-muted-foreground gap-2">
                    <span className="font-medium text-foreground">{item.author?.name || "Admin"}</span>
                    <span>•</span>
                    <span>{formatDate(item.createdAt)}</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

      </div>
    </div>
  );
}
