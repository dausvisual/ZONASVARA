import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";
import RichTextEditor from "@/components/admin/RichTextEditor";
import { createArticle } from "@/app/actions/article";
import { getCategories } from "@/app/actions/category";
import { redirect } from "next/navigation";

export default async function CreateArticlePage() {
  const categories = await getCategories();

  async function action(formData: FormData) {
    "use server";
    const res = await createArticle(formData);
    if (res.error) {
      console.error(res.error);
    } else {
      redirect("/admin/articles");
    }
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      <div className="flex items-center gap-4">
        <Link 
          href="/admin/articles"
          className="p-2 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-md transition-colors"
        >
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold font-heading">Tulis Artikel Baru</h1>
          <p className="text-muted-foreground text-sm">Buat dan publikasikan berita terbaru.</p>
        </div>
      </div>

      <form action={action} className="space-y-8 bg-white dark:bg-slate-950 p-6 rounded-xl border border-border shadow-sm">
        
        <div className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium mb-1">Judul Berita</label>
            <input 
              type="text" 
              id="title"
              name="title" 
              required
              placeholder="Masukkan judul artikel yang menarik..."
              className="w-full px-4 py-2 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 text-lg font-semibold"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="category" className="block text-sm font-medium mb-1">Kategori</label>
              <select 
                id="category"
                name="category"
                required
                className="w-full px-4 py-2 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                <option value="">Pilih Kategori...</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.name}>{c.name}</option>
                ))}
              </select>
            </div>
            <div className="space-y-4">
              <div>
                <label htmlFor="imageFile" className="block text-sm font-medium mb-1">Upload Thumbnail (Lokal)</label>
                <input 
                  type="file" 
                  id="imageFile"
                  name="imageFile" 
                  accept="image/*"
                  className="w-full text-sm text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 transition-colors border border-input p-1 rounded-md bg-background"
                />
              </div>
              <div>
                <label htmlFor="image" className="block text-xs font-medium mb-1 text-muted-foreground">Atau gunakan URL gambar luar (opsional)</label>
                <input 
                  type="url" 
                  id="image"
                  name="image" 
                  placeholder="https://contoh.com/gambar.jpg"
                  className="w-full px-4 py-2 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                />
              </div>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Isi Berita</label>
          <div className="border border-input rounded-md overflow-hidden bg-background">
            <RichTextEditor name="content" />
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t border-border">
          <button 
            type="submit" 
            className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-2.5 rounded-md font-medium flex items-center gap-2 transition-colors"
          >
            <Save size={18} /> Terbitkan Artikel
          </button>
        </div>
      </form>
    </div>
  );
}
