import Image from "next/image";
import Link from "next/link";
import { ChevronRight, PlayCircle, Headphones, Image as ImageIcon, ArrowRight } from "lucide-react";
import prisma from "@/lib/prisma";
import { format, formatDistanceToNow } from "date-fns";
import { id } from "date-fns/locale";

import HeroSlider from "@/components/HeroSlider";

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

  const heroNews = allNews.slice(0, 3);
  const popularNews = allNews.slice(3, 7);
  const editorChoice = allNews.slice(7, 11);
  
  const formatDate = (date: Date) => format(date, "dd MMM yyyy, HH:mm", { locale: id });
  const formatRelativeTime = (date: Date) => {
    return formatDistanceToNow(date, { addSuffix: true, locale: id });
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen">
      
      {/* Mobile Hero Featured Article (Slider Style) */}
      <div className="lg:max-w-7xl lg:mx-auto lg:px-8">
        <section className="px-4 pt-4 pb-6 lg:px-0 lg:pt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
          <HeroSlider news={heroNews} />

          {/* TERPOPULER Section */}
          <div className="lg:col-span-4 flex flex-col h-full bg-white dark:bg-slate-900 rounded-[1.5rem] p-5 shadow-sm border border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2 mb-5">
              <span className="w-1 h-5 bg-[#cc0000] rounded-sm block"></span>
              <h2 className="text-[17px] font-bold font-heading uppercase tracking-wide text-[#0f172a] dark:text-white">TERPOPULER</h2>
            </div>
            
            <div className="flex flex-col gap-5 flex-grow">
              {popularNews.map((item, idx) => (
                <Link href={`/berita/${item.slug}`} key={idx} className="flex gap-4 group cursor-pointer items-center">
                  <div className="relative w-[85px] h-[60px] shrink-0 overflow-hidden rounded-lg shadow-sm bg-slate-200">
                    {item.thumbnail && (
                      <Image src={item.thumbnail} alt={item.title} fill unoptimized className="object-cover group-hover:scale-110 transition-transform duration-500" />
                    )}
                  </div>
                  <div className="flex flex-col justify-center gap-1.5">
                    <h3 className="font-bold text-[13px] md:text-sm leading-snug text-slate-800 dark:text-slate-200 group-hover:text-primary transition-colors line-clamp-2">
                      {item.title}
                    </h3>
                    <p className="text-[11px] text-slate-500 font-medium">
                      {formatRelativeTime(item.createdAt)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Editor's Choice Section */}
        {editorChoice.length > 0 && (
          <section className="px-4 lg:px-0 pt-8 pb-12">
            <div className="flex items-center gap-2 mb-6">
              <span className="w-1 h-5 bg-primary rounded-sm block"></span>
              <h2 className="text-[17px] font-bold font-heading uppercase tracking-wide">Pilihan Editor</h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {editorChoice.map((item, idx) => (
                <Link href={`/berita/${item.slug}`} key={idx} className="group cursor-pointer bg-white dark:bg-slate-900 p-2 md:p-3 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800">
                  <div className="relative h-32 md:h-48 mb-3 overflow-hidden rounded-lg shadow-sm bg-slate-200">
                    {item.thumbnail && (
                      <Image src={item.thumbnail} alt={item.title} fill unoptimized className="object-cover group-hover:scale-110 transition-transform duration-500" />
                    )}
                  </div>
                  <h3 className="font-bold text-[13px] md:text-lg leading-tight mb-2 group-hover:text-primary transition-colors line-clamp-2 px-1">
                    {item.title}
                  </h3>
                  <div className="flex items-center text-[10px] md:text-xs text-muted-foreground gap-1.5 px-1 pb-1">
                    <span className="font-medium text-foreground truncate max-w-[60px] md:max-w-none">{item.author?.name || "Admin"}</span>
                    <span>•</span>
                    <span>{formatRelativeTime(item.createdAt)}</span>
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
