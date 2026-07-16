import { getCategories, deleteCategory, createCategory } from "@/app/actions/category";
import { Trash2, Plus, Tag } from "lucide-react";
import { revalidatePath } from "next/cache";

export default async function AdminCategoriesPage() {
  const categories = await getCategories();

  async function handleCreate(formData: FormData) {
    "use server";
    await createCategory(formData);
    revalidatePath("/admin/categories");
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold font-heading">Kelola Kategori</h1>
        <p className="text-muted-foreground text-sm">Tambahkan atau hapus topik berita untuk website Anda.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Form Tambah Kategori */}
        <div className="md:col-span-1">
          <div className="bg-white dark:bg-slate-950 p-6 rounded-xl border border-border shadow-sm">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><Plus size={18} /> Tambah Baru</h3>
            <form action={handleCreate} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">Nama Topik/Kategori</label>
                <input 
                  type="text" 
                  id="name"
                  name="name" 
                  required
                  placeholder="Cth: News, Startup, Gadget..."
                  className="w-full px-4 py-2 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                />
              </div>
              <button 
                type="submit" 
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md font-medium transition-colors"
              >
                Simpan Kategori
              </button>
            </form>
          </div>
        </div>

        {/* Tabel Kategori */}
        <div className="md:col-span-2">
          <div className="bg-white dark:bg-slate-950 rounded-xl border border-border shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-slate-500 uppercase bg-slate-50 dark:bg-slate-900 border-b border-border">
                  <tr>
                    <th scope="col" className="px-6 py-4 font-medium">Nama Kategori</th>
                    <th scope="col" className="px-6 py-4 font-medium">Slug (URL)</th>
                    <th scope="col" className="px-6 py-4 font-medium">Total Artikel</th>
                    <th scope="col" className="px-6 py-4 font-medium text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-6 py-8 text-center text-muted-foreground">
                        Belum ada kategori terdaftar.
                      </td>
                    </tr>
                  ) : (
                    categories.map((cat) => (
                      <tr key={cat.id} className="border-b border-border hover:bg-slate-50/50 dark:hover:bg-slate-900/50 transition-colors">
                        <td className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                          <Tag size={14} className="text-primary" /> {cat.name}
                        </td>
                        <td className="px-6 py-4 text-muted-foreground">/{cat.slug}</td>
                        <td className="px-6 py-4">
                          <span className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-2.5 py-1 rounded-md text-xs font-bold">
                            {cat._count.articles}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <form action={async () => {
                            "use server";
                            await deleteCategory(cat.id);
                          }}>
                            <button 
                              type="submit" 
                              className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors"
                              title="Hapus"
                            >
                              <Trash2 size={16} />
                            </button>
                          </form>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
