import { Loader2 } from "lucide-react";

export default function AdminLoading() {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/20 dark:bg-slate-950/40 backdrop-blur-[2px]">
      <div className="flex flex-col items-center gap-3 bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800 animate-in fade-in zoom-in duration-300">
        <div className="relative flex items-center justify-center w-12 h-12">
          <Loader2 className="w-8 h-8 text-primary animate-spin" />
        </div>
        <p className="text-sm font-semibold text-slate-600 dark:text-slate-300 animate-pulse">
          Memuat Data...
        </p>
      </div>
    </div>
  );
}
