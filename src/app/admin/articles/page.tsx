import Link from "next/link";
import { getArticles, deleteArticle } from "@/app/actions/article";
import { Edit, Trash2, Plus, FileText } from "lucide-react";

export default async function AdminArticlesPage() {
  const articles = await getArticles();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold font-heading">Daftar Artikel</h1>
          <p className="text-muted-foreground text-sm">Kelola semua berita yang dipublikasikan.</p>
        </div>
        <Link 
          href="/admin/articles/create" 
          className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md font-medium flex items-center gap-2 transition-colors"
        >
          <Plus size={18} /> Tulis Artikel
        </Link>
      </div>

      <div className="bg-white dark:bg-slate-950 rounded-xl border border-border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-500 uppercase bg-slate-50 dark:bg-slate-900 border-b border-border">
              <tr>
                <th scope="col" className="px-6 py-4 font-medium">Judul Berita</th>
                <th scope="col" className="px-6 py-4 font-medium">Kategori</th>
                <th scope="col" className="px-6 py-4 font-medium">Status</th>
                <th scope="col" className="px-6 py-4 font-medium">Tanggal</th>
                <th scope="col" className="px-6 py-4 font-medium text-right">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {articles.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-muted-foreground">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <FileText size={48} className="text-slate-300 dark:text-slate-700" />
                      <p>Belum ada artikel. Silakan buat artikel pertama Anda.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                articles.map((article) => (
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
                      <span className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 px-2.5 py-1 rounded-md text-xs font-medium">
                        {article.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {new Date(article.createdAt).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Link 
                          href={`/admin/articles/${article.id}/edit`} 
                          className="p-2 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-md transition-colors"
                          title="Edit"
                        >
                          <Edit size={16} />
                        </Link>
                        <form action={async () => {
                          "use server";
                          await deleteArticle(article.id);
                        }}>
                          <button 
                            type="submit" 
                            className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors"
                            title="Hapus"
                          >
                            <Trash2 size={16} />
                          </button>
                        </form>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
