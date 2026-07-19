import Link from "next/link";
import { getArticles, deleteArticle, approveArticle } from "@/app/actions/article";
import { Edit, Trash2, Plus, FileText, CheckCircle, Eye } from "lucide-react";
import { auth } from "@/auth";

export default async function AdminArticlesPage() {
  const session = await auth();
  const isAdmin = (session?.user as any)?.role === "SUPER_ADMIN";
  const articles = await getArticles();

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div>
          <h1 className="text-xl md:text-2xl font-bold font-heading">Daftar Artikel</h1>
          <p className="text-muted-foreground text-sm">Kelola semua berita yang dipublikasikan.</p>
        </div>
        <Link
          href="/admin/articles/create"
          className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md font-medium flex items-center gap-2 transition-colors text-sm shrink-0"
        >
          <Plus size={16} /> Tulis Artikel
        </Link>
      </div>

      {articles.length === 0 ? (
        <div className="bg-white dark:bg-slate-950 rounded-xl border border-border p-12 text-center">
          <FileText size={48} className="text-slate-300 dark:text-slate-700 mx-auto mb-3" />
          <p className="text-muted-foreground">Belum ada artikel. Silakan buat artikel pertama Anda.</p>
        </div>
      ) : (
        <>
          {/* Mobile Card List */}
          <div className="lg:hidden space-y-3">
            {articles.map((article) => (
              <div key={article.id} className="bg-white dark:bg-slate-950 rounded-xl border border-border p-4 space-y-3">
                <div className="flex gap-3">
                  {article.thumbnail && (
                    <img src={article.thumbnail} alt="" className="w-14 h-14 rounded-lg object-cover shrink-0" />
                  )}
                  <div className="flex-grow min-w-0">
                    <p className="font-semibold text-sm leading-snug line-clamp-2">{article.title}</p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">Oleh: {article.author?.name || 'Admin'}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded text-[10px] font-medium">
                      {article.category?.name || 'Umum'}
                    </span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                      article.status === 'PUBLISHED'
                        ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                        : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                    }`}>
                      {article.status === 'PUBLISHED' ? 'Terbit' : 'Review'}
                    </span>
                    <span className="flex items-center gap-1 text-[10px] text-slate-400">
                      <Eye size={10} /> {article.viewCount.toLocaleString('id-ID')}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    {article.status === 'PENDING_REVIEW' && isAdmin && (
                      <form action={async () => { "use server"; await approveArticle(article.id); }}>
                        <button type="submit" className="p-1.5 text-slate-400 hover:text-green-600 hover:bg-green-50 rounded-md transition-colors" title="Setujui">
                          <CheckCircle size={15} />
                        </button>
                      </form>
                    )}
                    <Link href={`/admin/articles/${article.id}/edit`} className="p-1.5 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-md transition-colors" title="Edit">
                      <Edit size={15} />
                    </Link>
                    <form action={async () => { "use server"; await deleteArticle(article.id); }}>
                      <button type="submit" className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors" title="Hapus">
                        <Trash2 size={15} />
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Table */}
          <div className="hidden lg:block bg-white dark:bg-slate-950 rounded-xl border border-border shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-slate-500 uppercase bg-slate-50 dark:bg-slate-900 border-b border-border">
                  <tr>
                    <th scope="col" className="px-6 py-4 font-medium">Judul Berita</th>
                    <th scope="col" className="px-6 py-4 font-medium">Kategori</th>
                    <th scope="col" className="px-6 py-4 font-medium">Status</th>
                    <th scope="col" className="px-6 py-4 font-medium">Tanggal</th>
                    <th scope="col" className="px-6 py-4 font-medium text-center">
                      <span className="flex items-center justify-center gap-1"><Eye size={13} /> Views</span>
                    </th>
                    <th scope="col" className="px-6 py-4 font-medium text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {articles.map((article) => (
                    <tr key={article.id} className="border-b border-border hover:bg-slate-50/50 dark:hover:bg-slate-900/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-semibold text-slate-900 dark:text-slate-100 line-clamp-1">{article.title}</div>
                        <div className="text-xs text-muted-foreground mt-1">Oleh: {article.author?.name || 'Admin'}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-2.5 py-1 rounded-md text-xs font-medium">
                          {article.category?.name || 'Umum'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 rounded-md text-xs font-medium ${
                          article.status === 'PUBLISHED'
                            ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                            : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                        }`}>
                          {article.status === 'PUBLISHED' ? 'Telah Terbit' : 'Menunggu Review'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {new Date(article.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="inline-flex items-center gap-1 text-sm font-semibold text-slate-600 dark:text-slate-300">
                          <Eye size={13} className="text-slate-400" />
                          {article.viewCount.toLocaleString('id-ID')}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          {article.status === 'PENDING_REVIEW' && isAdmin && (
                            <form action={async () => { "use server"; await approveArticle(article.id); }}>
                              <button type="submit" className="p-2 text-slate-400 hover:text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-md transition-colors" title="Setujui & Publikasikan">
                                <CheckCircle size={16} />
                              </button>
                            </form>
                          )}
                          <Link href={`/admin/articles/${article.id}/edit`} className="p-2 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-md transition-colors" title="Edit">
                            <Edit size={16} />
                          </Link>
                          <form action={async () => { "use server"; await deleteArticle(article.id); }}>
                            <button type="submit" className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors" title="Hapus">
                              <Trash2 size={16} />
                            </button>
                          </form>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
