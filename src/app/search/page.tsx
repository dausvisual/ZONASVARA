import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Search as SearchIcon, Clock } from "lucide-react";
import prisma from "@/lib/prisma";
import { format } from "date-fns";
import { id as localeId } from "date-fns/locale";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const resolvedParams = await searchParams;
  const query = resolvedParams.q || "";
  
  const searchResults = query ? await prisma.article.findMany({
    where: {
      status: "PUBLISHED",
      OR: [
        { title: { contains: query, mode: "insensitive" } },
        { content: { contains: query, mode: "insensitive" } },
        { summary: { contains: query, mode: "insensitive" } }
      ]
    },
    orderBy: { createdAt: "desc" },
    include: { category: true, author: true }
  }) : [];

  const formatDate = (date: Date) => format(date, "dd MMM yyyy", { locale: localeId });

  return (
    <div className="bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link href="/" className="hover:text-primary transition-colors">Beranda</Link>
          <ChevronRight size={14} />
          <span className="text-foreground">Pencarian</span>
        </nav>

        <div className="mb-10 border-b border-border pb-8">
          <h1 className="text-3xl md:text-4xl font-bold font-heading mb-4">Hasil Pencarian</h1>
          
          <form action="/search" method="GET" className="relative max-w-2xl">
            <input 
              type="text" 
              name="q"
              defaultValue={query}
              placeholder="Cari berita..." 
              className="w-full pl-12 pr-4 py-4 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 text-lg shadow-sm"
            />
            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={24} />
            <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors">
              Cari
            </button>
          </form>
          
          {query && (
            <p className="text-muted-foreground mt-4">
              Menampilkan {searchResults.length} hasil untuk: <span className="font-semibold text-foreground">"{query}"</span>
            </p>
          )}
        </div>

        {!query ? (
          <div className="text-center py-20 bg-slate-50 dark:bg-slate-900 rounded-xl border border-border">
            <SearchIcon size={48} className="mx-auto text-slate-300 mb-4" />
            <h2 className="text-2xl font-bold font-heading text-slate-400">Mulai Pencarian</h2>
            <p className="text-muted-foreground mt-2">Ketikkan kata kunci di kolom pencarian untuk menemukan berita.</p>
          </div>
        ) : searchResults.length === 0 ? (
          <div className="text-center py-20 bg-slate-50 dark:bg-slate-900 rounded-xl border border-border">
            <h2 className="text-2xl font-bold font-heading text-slate-400">Tidak Ditemukan</h2>
            <p className="text-muted-foreground mt-2">Maaf, kami tidak dapat menemukan berita dengan kata kunci "{query}".</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {searchResults.map((item, idx) => (
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
