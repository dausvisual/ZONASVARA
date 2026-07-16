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
  // Fetch real counts from DB
  const totalArticles = await prisma.article.count();
  const totalCategories = await prisma.category.count();
  const activeWriters = await prisma.user.count({
    where: { role: { in: ['SUPER_ADMIN', 'EDITOR', 'JOURNALIST', 'CONTRIBUTOR'] } }
  });

  // Calculate total views (sum of viewCount)
  const viewsAggregation = await prisma.article.aggregate({
    _sum: { viewCount: true }
  });
  const totalViews = viewsAggregation._sum.viewCount || 0;

  // Fetch recent 5 articles
  const recentArticles = await prisma.article.findMany({
    take: 5,
    orderBy: { createdAt: 'desc' },
    include: { category: true }
  });

  return (
    <div className="space-y-6">
      
      <div className="flex justify-between items-center bg-white dark:bg-slate-950 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div>
          <h2 className="text-lg font-bold">Status Database: <span className="text-green-600">Terhubung</span></h2>
          <p className="text-sm text-muted-foreground">Sistem terhubung ke Vercel Postgres.</p>
        </div>
        <SeedButton />
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-slate-950 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
            <FileText size={24} />
          </div>
          <div>
            <p className="text-sm text-slate-500 font-medium">Total Artikel</p>
            <h3 className="text-2xl font-bold">{totalArticles}</h3>
          </div>
        </div>
        
        <div className="bg-white dark:bg-slate-950 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400">
            <Eye size={24} />
          </div>
          <div>
            <p className="text-sm text-slate-500 font-medium">Total Tayangan</p>
            <h3 className="text-2xl font-bold">{totalViews}</h3>
          </div>
        </div>
        
        <div className="bg-white dark:bg-slate-950 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-600 dark:text-orange-400">
            <Users size={24} />
          </div>
          <div>
            <p className="text-sm text-slate-500 font-medium">Penulis Aktif</p>
            <h3 className="text-2xl font-bold">{activeWriters}</h3>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-950 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400">
            <MessageSquare size={24} />
          </div>
          <div>
            <p className="text-sm text-slate-500 font-medium">Total Kategori</p>
            <h3 className="text-2xl font-bold">{totalCategories}</h3>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Articles */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-lg font-heading">Artikel Terbaru</h3>
            <Link href="/admin/articles" className="text-sm text-primary hover:underline font-medium flex items-center gap-1">
              Lihat Semua <TrendingUp size={16} />
            </Link>
          </div>
          
          <div className="space-y-4">
            {recentArticles.length === 0 ? (
               <div className="text-center py-8 text-muted-foreground">Belum ada artikel. Klik tombol "Import Data Dummy" di atas.</div>
            ) : (
              recentArticles.map((article, i) => (
                <div key={i} className="flex gap-4 items-center p-3 hover:bg-slate-50 dark:hover:bg-slate-900 rounded-lg transition-colors border border-transparent hover:border-slate-100 dark:hover:border-slate-800">
                  <div className="w-16 h-16 bg-slate-200 dark:bg-slate-800 rounded-md shrink-0 overflow-hidden relative">
                    {article.thumbnail ? (
                      <img src={article.thumbnail} alt={article.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-400"><FileText /></div>
                    )}
                  </div>
                  <div className="flex-grow">
                    <h4 className="font-semibold text-sm line-clamp-1">{article.title}</h4>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                      <span className="flex items-center gap-1"><Clock size={12} /> {new Date(article.createdAt).toLocaleDateString('id-ID')}</span>
                      <span className="bg-primary/10 text-primary px-2 py-0.5 rounded uppercase font-semibold text-[10px]">{article.category?.name || 'Umum'}</span>
                    </div>
                  </div>
                  <Link href={`/admin/articles/${article.id}/edit`} className="text-xs font-medium bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 px-3 py-1.5 rounded-md transition-colors shrink-0">
                    Edit
                  </Link>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6">
          <h3 className="font-bold text-lg font-heading mb-6">Aksi Cepat</h3>
          <div className="space-y-3">
            <Link href="/admin/articles/create" className="w-full flex items-center gap-3 p-3 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary transition-colors font-medium">
              <div className="w-8 h-8 rounded bg-white flex items-center justify-center shadow-sm">
                <FileText size={16} />
              </div>
              Tulis Artikel Baru
            </Link>
            <Link href="/admin/categories" className="w-full flex items-center gap-3 p-3 rounded-lg border border-slate-200 dark:border-slate-800 hover:border-primary/50 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors font-medium">
              <div className="w-8 h-8 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 flex items-center justify-center">
                <Database size={16} />
              </div>
              Kelola Kategori
            </Link>
          </div>
        </div>
      </div>
      
    </div>
  );
}
