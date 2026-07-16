import { Image as ImageIcon, Upload, FolderOpen } from "lucide-react";
import prisma from "@/lib/prisma";

export default async function AdminMediaPage() {
  // Fetch articles that have thumbnails as media gallery
  const articles = await prisma.article.findMany({
    where: { thumbnail: { not: null } },
    select: {
      id: true,
      title: true,
      thumbnail: true,
      createdAt: true,
    },
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-heading text-slate-900 dark:text-white">
            Galeri &amp; Media
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Semua gambar thumbnail dari artikel yang diterbitkan
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-500 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg px-3 py-2">
          <Upload size={14} className="text-amber-500" />
          <span className="text-amber-700 dark:text-amber-400">Upload langsung via form artikel</span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 flex items-center gap-4">
          <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-500">
            <ImageIcon size={20} />
          </div>
          <div>
            <p className="text-2xl font-bold text-slate-900 dark:text-white">{articles.length}</p>
            <p className="text-xs text-slate-500">Total Gambar</p>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 flex items-center gap-4">
          <div className="p-2 rounded-lg bg-green-50 dark:bg-green-900/20 text-green-500">
            <FolderOpen size={20} />
          </div>
          <div>
            <p className="text-2xl font-bold text-slate-900 dark:text-white">
              {articles.filter(a => a.thumbnail?.startsWith("http")).length}
            </p>
            <p className="text-xs text-slate-500">Gambar Eksternal</p>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 flex items-center gap-4">
          <div className="p-2 rounded-lg bg-purple-50 dark:bg-purple-900/20 text-purple-500">
            <Upload size={20} />
          </div>
          <div>
            <p className="text-2xl font-bold text-slate-900 dark:text-white">
              {articles.filter(a => a.thumbnail?.startsWith("/")).length}
            </p>
            <p className="text-xs text-slate-500">Upload Lokal</p>
          </div>
        </div>
      </div>

      {/* Media Grid */}
      {articles.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 border border-dashed border-slate-300 dark:border-slate-700 rounded-xl py-20 text-center">
          <ImageIcon size={48} className="mx-auto text-slate-300 dark:text-slate-700 mb-4" />
          <p className="text-slate-500 font-medium">Belum ada media</p>
          <p className="text-sm text-slate-400 mt-1">Upload gambar saat membuat atau mengedit artikel</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {articles.map((article) => (
            <div
              key={article.id}
              className="group relative bg-slate-100 dark:bg-slate-800 rounded-xl overflow-hidden aspect-video border border-slate-200 dark:border-slate-700 hover:border-primary transition-colors"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={article.thumbnail!}
                alt={article.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/zonasvara-logo.png";
                }}
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2">
                <p className="text-white text-xs line-clamp-2 leading-tight">{article.title}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
