import { Image as ImageIcon, Upload, FolderOpen } from "lucide-react";
import prisma from "@/lib/prisma";
import MediaGrid from "./MediaGrid";

export default async function AdminMediaPage() {
  const articles = await prisma.article.findMany({
    where: { thumbnail: { not: null } },
    select: { id: true, title: true, thumbnail: true, createdAt: true },
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  const externalCount = articles.filter((a: any) => a.thumbnail?.startsWith("http")).length;
  const localCount = articles.filter((a: any) => a.thumbnail?.startsWith("/")).length;

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl md:text-2xl font-bold font-heading text-slate-900 dark:text-white">Galeri &amp; Media</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm">Semua gambar thumbnail dari artikel yang diterbitkan</p>
        </div>
        <div className="flex items-center gap-2 text-xs text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg px-3 py-2 shrink-0">
          <Upload size={13} className="text-amber-500" />
          <span>Upload langsung via form artikel</span>
        </div>
      </div>

      {/* Stats — stack on mobile (flex-col inside each card), 3 columns */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-3 md:p-5 flex flex-col sm:flex-row items-center sm:items-center gap-2 sm:gap-4 text-center sm:text-left">
          <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-500 shrink-0">
            <ImageIcon size={18} />
          </div>
          <div>
            <p className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white leading-tight">{articles.length}</p>
            <p className="text-[10px] md:text-xs text-slate-500 leading-snug">Total Gambar</p>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-3 md:p-5 flex flex-col sm:flex-row items-center sm:items-center gap-2 sm:gap-4 text-center sm:text-left">
          <div className="p-2 rounded-lg bg-green-50 dark:bg-green-900/20 text-green-500 shrink-0">
            <FolderOpen size={18} />
          </div>
          <div>
            <p className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white leading-tight">{externalCount}</p>
            <p className="text-[10px] md:text-xs text-slate-500 leading-snug">Eksternal</p>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-3 md:p-5 flex flex-col sm:flex-row items-center sm:items-center gap-2 sm:gap-4 text-center sm:text-left">
          <div className="p-2 rounded-lg bg-purple-50 dark:bg-purple-900/20 text-purple-500 shrink-0">
            <Upload size={18} />
          </div>
          <div>
            <p className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white leading-tight">{localCount}</p>
            <p className="text-[10px] md:text-xs text-slate-500 leading-snug">Upload Lokal</p>
          </div>
        </div>
      </div>

      {/* Media Grid */}
      <MediaGrid articles={articles} />
    </div>
  );
}
