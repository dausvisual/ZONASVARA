import Link from "next/link";
import { ChevronRight, TrendingUp } from "lucide-react";

export default function KategoriIndexPage() {
  const categories = [
    { name: "Nasional", slug: "nasional", count: "34%", color: "bg-primary" },
    { name: "Politik", slug: "politik", count: "25%", color: "bg-secondary" },
    { name: "Ekonomi", slug: "ekonomi", count: "18%", color: "bg-accent" },
    { name: "Teknologi", slug: "teknologi", count: "12%", color: "bg-blue-400" },
    { name: "Olahraga", slug: "olahraga", count: "11%", color: "bg-green-500" },
    { name: "Internasional", slug: "internasional", count: "8%", color: "bg-orange-500" },
    { name: "Hukum", slug: "hukum", count: "15%", color: "bg-red-700" }
  ];

  return (
    <div className="bg-background min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        
        <div className="flex items-center gap-3 mb-8 border-b border-border pb-4">
          <TrendingUp className="text-accent" size={32} />
          <h1 className="text-3xl font-bold font-heading uppercase">Jelajahi Kategori</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories.map((cat, idx) => (
            <Link href={`/kategori/${cat.slug}`} key={idx} className="group block bg-card border border-border p-6 rounded-xl hover:shadow-md hover:border-primary/50 transition-all">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold font-heading group-hover:text-primary transition-colors">{cat.name}</h2>
                <ChevronRight className="text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2 mb-2">
                <div className={`${cat.color} h-2 rounded-full`} style={{ width: cat.count }}></div>
              </div>
              <p className="text-xs text-muted-foreground text-right">Popularitas: {cat.count}</p>
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
}
