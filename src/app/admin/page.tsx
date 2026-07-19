import { 
  FileText, 
  Eye, 
  Users, 
  MessageSquare,
  TrendingUp,
  Clock,
  Database
} from "lucide-react";
import prisma from "@/lib/prisma";
import Link from "next/link";
import SeedButton from "@/components/admin/SeedButton";

export default async function AdminDashboard() {
  const totalArticles = await prisma.article.count();
  const totalCategories = await prisma.category.count();
  const activeWriters = await prisma.user.count({
    where: { role: { in: ['SUPER_ADMIN', 'EDITOR', 'JOURNALIST', 'CONTRIBUTOR'] } }
  });

  const viewsAggregation = await prisma.article.aggregate({
    _sum: { viewCount: true }
  });
  const totalViews = viewsAggregation._sum.viewCount || 0;

  const recentArticles = await prisma.article.findMany({
    take: 5,
    orderBy: { createdAt: 'desc' },
    include: { category: true }
  });

  return (
    <div className="space-y-4 md:space-y-6">
      
      {/* DB Status */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 bg-white dark:bg-slate-950 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div>
          <h2 className="text-sm md:text-base font-bold">Status Database: <span className="text-green-600">Terhubung</span></h2>
          <p className="text-xs text-muted-foreground">Sistem terhubung ke Vercel Postgres.</p>
        </div>
        <SeedButton />
      </div>

      {/* Stats Cards — 2 columns on mobile, 4 on desktop */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        <div className="bg-white dark:bg-slate-950 p-3 md:p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-3">
          <div className="w-9 h-9 md:w-11 md:h-11 shrink-0 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
            <FileText size={18} />
          </div>
          <div className="min-w-0">
            <p className="text-[10px] md:text-xs text-slate-500 font-medium truncate">Total Artikel</p>
            <h3 className="text-lg md:text-2xl font-bold leading-tight">{totalArticles}</h3>
          </div>
        </div>
        
        <div className="bg-white dark:bg-slate-950 p-3 md:p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-3">
          <div className="w-9 h-9 md:w-11 md:h-11 shrink-0 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400">
            <Eye size={18} />
          </div>
          <div className="min-w-0">
            <p className="text-[10px] md:text-xs text-slate-500 font-medium truncate">Total Tayangan</p>
            <h3 className="text-lg md:text-2xl font-bold leading-tight">{totalViews.toLocaleString('id-ID')}</h3>
          </div>
        </div>
        
        <div className="bg-white dark:bg-slate-950 p-3 md:p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-3">
          <div className="w-9 h-9 md:w-11 md:h-11 shrink-0 rounded-lg bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-600 dark:text-orange-400">
            <Users size={18} />
          </div>
          <div className="min-w-0">
            <p className="text-[10px] md:text-xs text-slate-500 font-medium truncate">Penulis Aktif</p>
            <h3 className="text-lg md:text-2xl font-bold leading-tight">{activeWriters}</h3>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-950 p-3 md:p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-3">
          <div className="w-9 h-9 md:w-11 md:h-11 shrink-0 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400">
            <MessageSquare size={18} />
          </div>
          <div className="min-w-0">
            <p className="text-[10px] md:text-xs text-slate-500 font-medium truncate">Total Kategori</p>
            <h3 className="text-lg md:text-2xl font-bold leading-tight">{totalCategories}</h3>
          </div>
        </div>
      </div>

      {/* Recent Articles + Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        {/* Recent Articles */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-4 md:p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-base md:text-lg font-heading">Artikel Terbaru</h3>
            <Link href="/admin/articles" className="text-xs md:text-sm text-primary hover:underline font-medium flex items-center gap-1">
              Lihat Semua <TrendingUp size={14} />
            </Link>
          </div>
          
          <div className="space-y-3">
            {recentArticles.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground text-sm">Belum ada artikel.</div>
            ) : (
              recentArticles.map((article, i) => (
                <div key={i} className="flex gap-3 items-center p-2.5 hover:bg-slate-50 dark:hover:bg-slate-900 rounded-lg transition-colors">
                  <div className="w-12 h-12 md:w-14 md:h-14 bg-slate-200 dark:bg-slate-800 rounded-md shrink-0 overflow-hidden">
                    {article.thumbnail ? (
                      <img src={article.thumbnail} alt={article.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-400"><FileText size={16} /></div>
                    )}
                  </div>
                  <div className="flex-grow min-w-0">
                    <h4 className="font-semibold text-xs md:text-sm line-clamp-2 leading-snug">{article.title}</h4>
                    <div className="flex items-center gap-2 text-[10px] md:text-xs text-muted-foreground mt-1">
                      <span className="flex items-center gap-1"><Clock size={10} /> {new Date(article.createdAt).toLocaleDateString('id-ID')}</span>
                      <span className="bg-primary/10 text-primary px-1.5 py-0.5 rounded uppercase font-semibold text-[9px] md:text-[10px]">{article.category?.name || 'Umum'}</span>
                    </div>
                  </div>
                  <Link href={`/admin/articles/${article.id}/edit`} className="text-[10px] md:text-xs font-medium bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 px-2 py-1 rounded-md transition-colors shrink-0">
                    Edit
                  </Link>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-4 md:p-6">
          <h3 className="font-bold text-base md:text-lg font-heading mb-4">Aksi Cepat</h3>
          <div className="space-y-3">
            <Link href="/admin/articles/create" className="w-full flex items-center gap-3 p-3 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary transition-colors font-medium text-sm">
              <div className="w-8 h-8 rounded bg-white flex items-center justify-center shadow-sm shrink-0">
                <FileText size={15} />
              </div>
              Tulis Artikel Baru
            </Link>
            <Link href="/admin/categories" className="w-full flex items-center gap-3 p-3 rounded-lg border border-slate-200 dark:border-slate-800 hover:border-primary/50 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors font-medium text-sm">
              <div className="w-8 h-8 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 flex items-center justify-center shrink-0">
                <Database size={15} />
              </div>
              Kelola Kategori
            </Link>
            <Link href="/admin/users" className="w-full flex items-center gap-3 p-3 rounded-lg border border-slate-200 dark:border-slate-800 hover:border-primary/50 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors font-medium text-sm">
              <div className="w-8 h-8 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 flex items-center justify-center shrink-0">
                <Users size={15} />
              </div>
              Kelola Pengguna
            </Link>
          </div>
        </div>
      </div>
      
    </div>
  );
}
