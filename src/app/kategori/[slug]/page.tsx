import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, Clock, Hash } from "lucide-react";
import prisma from "@/lib/prisma";
import { format } from "date-fns";
import { id as localeId } from "date-fns/locale";

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  
  // Find category and its published articles
  const category = await prisma.category.findUnique({
    where: { slug: resolvedParams.slug },
    include: {
      articles: {
        where: { status: "PUBLISHED" },
        orderBy: { createdAt: "desc" },
        include: { author: true }
      }
    }
  });

  if (!category) {
    notFound();
  }

  const news = category.articles;
  const formatDate = (date: Date) => format(date, "dd MMM yyyy", { locale: localeId });

  return (
    <div className="bg-background min-h-screen">
      
      {/* Category Header */}
      <div className="bg-primary/5 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-4">
            <Hash size={32} />
          </div>
          <h1 className="text-3xl md:text-5xl font-bold font-heading uppercase mb-4">
            {category.name}
          </h1>
          <p className="text-muted-foreground max-w-2xl">
            Berita dan informasi terbaru seputar {category.name} dari tim redaksi ZONASVARA.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link href="/" className="hover:text-primary transition-colors">Beranda</Link>
          <ChevronRight size={14} />
          <Link href="/kategori" className="hover:text-primary transition-colors">Kategori</Link>
          <ChevronRight size={14} />
          <span className="text-foreground">{category.name}</span>
        </nav>

        {news.length === 0 ? (
          <div className="text-center py-20 bg-slate-50 dark:bg-slate-900 rounded-xl border border-border">
            <h2 className="text-2xl font-bold font-heading text-slate-400">Belum Ada Berita</h2>
            <p className="text-muted-foreground mt-2">Belum ada berita yang diterbitkan di kategori ini.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {news.map((item, idx) => (
              <Link href={`/berita/${item.slug}`} key={idx} className="group cursor-pointer flex flex-col h-full bg-card rounded-xl overflow-hidden border border-border shadow-sm hover:shadow-md transition-all">
                <div className="relative h-56 overflow-hidden bg-slate-200">
                  {item.thumbnail ? (
                    <Image src={item.thumbnail} alt={item.title} fill unoptimized className="object-cover group-hover:scale-105 transition-transform duration-700" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-400">No Image</div>
                  )}
                  <div className="absolute top-4 left-4">
                    <span className="bg-primary text-primary-foreground text-xs font-bold px-2.5 py-1 rounded-sm uppercase tracking-wider shadow-sm">
                      {category.name}
                    </span>
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="font-bold text-xl font-heading leading-tight mb-3 group-hover:text-primary transition-colors line-clamp-3">
                    {item.title}
                  </h3>
                  <div className="mt-auto flex items-center justify-between text-xs text-muted-foreground pt-4 border-t border-border/50">
                    <span className="font-medium text-foreground">{item.author?.name || "Redaksi"}</span>
                    <span className="flex items-center gap-1.5"><Clock size={12} /> {formatDate(item.createdAt)}</span>
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
