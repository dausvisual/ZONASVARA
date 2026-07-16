"use client";

interface MediaItem {
  id: string;
  title: string;
  thumbnail: string | null;
}

export default function MediaGrid({ articles }: { articles: MediaItem[] }) {
  if (articles.length === 0) {
    return (
      <div className="bg-white dark:bg-slate-900 border border-dashed border-slate-300 dark:border-slate-700 rounded-xl py-20 text-center">
        <div className="mx-auto text-slate-300 dark:text-slate-700 mb-4 text-5xl">🖼️</div>
        <p className="text-slate-500 font-medium">Belum ada media</p>
        <p className="text-sm text-slate-400 mt-1">Upload gambar saat membuat atau mengedit artikel</p>
      </div>
    );
  }

  return (
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
  );
}
