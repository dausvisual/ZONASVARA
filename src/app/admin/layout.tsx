import Link from "next/link";
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  Settings, 
  Image as ImageIcon,
  LogOut,
  Tag
} from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col shrink-0">
        <div className="h-16 flex items-center px-6 border-b border-slate-800 bg-slate-950">
          <span className="text-white font-bold font-heading text-lg tracking-wide">ZONASVARA CMS</span>
        </div>
        
        <div className="p-4 flex-grow overflow-y-auto">
          <nav className="space-y-1">
            <Link href="/admin" className="flex items-center gap-3 px-3 py-2 rounded-md bg-primary text-white font-medium text-sm">
              <LayoutDashboard size={18} /> Dashboard
            </Link>
            
            <div className="pt-4 pb-2 px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Berita</div>
            <Link href="/admin/articles" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-slate-800 hover:text-white transition-colors text-sm">
              <FileText size={18} /> Semua Artikel
            </Link>
            <Link href="/admin/articles/create" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-slate-800 hover:text-white transition-colors text-sm">
              <FileText size={18} /> Tulis Artikel Baru
            </Link>
            <Link href="/admin/categories" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-slate-800 hover:text-white transition-colors text-sm">
              <Tag size={18} /> Kategori
            </Link>
            
            <div className="pt-4 pb-2 px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Media</div>
            <Link href="/admin/media" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-slate-800 hover:text-white transition-colors text-sm">
              <ImageIcon size={18} /> Galeri & Media
            </Link>
            
            <div className="pt-4 pb-2 px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Sistem</div>
            <Link href="/admin/users" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-slate-800 hover:text-white transition-colors text-sm">
              <Users size={18} /> Pengguna & Role
            </Link>
            <Link href="/admin/settings" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-slate-800 hover:text-white transition-colors text-sm">
              <Settings size={18} /> Pengaturan
            </Link>
          </nav>
        </div>
        
        <div className="p-4 border-t border-slate-800">
          <button className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-red-500/10 text-red-400 w-full transition-colors text-sm">
            <LogOut size={18} /> Keluar
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-8 shrink-0">
          <h1 className="text-lg font-semibold font-heading">CMS Dashboard</h1>
          <div className="flex items-center gap-4">
            <div className="text-sm text-right">
              <p className="font-semibold text-slate-900 dark:text-white">Admin Zonasvara</p>
              <p className="text-xs text-slate-500">Super Admin</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
              AZ
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
