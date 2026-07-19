import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Clock } from "lucide-react";
import prisma from "@/lib/prisma";
import { format } from "date-fns";
import { id } from "date-fns/locale";

export default async function IndeksBerita() {
  const news = await prisma.article.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { createdAt: "desc" },
    include: { category: true, author: true }
  });

  const formatDate = (date: Date) => format(date, "dd MMM yyyy", { locale: id });

  return (
    <div className="bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link href="/" className="hover:text-primary transition-colors">Beranda</Link>
          <ChevronRight size={14} />
          <span className="text-foreground">Indeks Berita</span>
        </nav>

        <div className="flex justify-between items-end mb-10 border-b border-border pb-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold font-heading uppercase mb-2">Indeks Berita</h1>
            <p className="text-muted-foreground">Kumpulan seluruh berita terbaru dari ZONASVARA.</p>
          </div>
          <div className="text-sm font-semibold text-primary hidden sm:block">
            Total: {news.length} Artikel
          </div>
        </div>

        {news.length === 0 ? (
          <div className="text-center py-20 bg-slate-50 dark:bg-slate-900 rounded-xl border border-border">
            <h2 className="text-2xl font-bold font-heading text-slate-400">Belum Ada Berita</h2>
            <p className="text-muted-foreground mt-2">Belum ada berita yang diterbitkan.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {news.map((item, idx) => (
              <Link href={`/berita/${item.slug}`} key={idx} className="group cursor-pointer flex flex-col h-full">
                <div className="relative h-48 mb-4 overflow-hidden rounded-xl shadow-sm bg-slate-200">
                  {item.thumbnail && (
                    <Image src={item.thumbnail} alt={item.title} fill unoptimized className="object-cover group-hover:scale-110 transition-transform duration-500" />
                  )}
                  <div className="absolute top-3 left-3">
                    <span className="bg-primary text-primary-foreground text-[10px] font-bold px-2 py-1 rounded-sm uppercase tracking-wider shadow-sm">
                      {item.category?.name || "Umum"}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col flex-grow">
                  <h3 className="font-bold text-lg leading-tight mb-2 group-hover:text-primary transition-colors line-clamp-3">
                    {item.title}
                  </h3>
                  <div className="mt-auto flex items-center text-xs text-muted-foreground gap-2 pt-2">
                    <span className="font-medium text-foreground">{item.author?.name || "Redaksi"}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1"><Clock size={12} /> {formatDate(item.createdAt)}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
