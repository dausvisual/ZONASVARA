import Link from "next/link";
import { auth, signOut } from "@/auth";
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  Settings, 
  Image as ImageIcon,
  LogOut,
  Tag,
  Menu
} from "lucide-react";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex relative overflow-hidden">
      
      {/* CSS-only Toggle Checkbox */}
      <input type="checkbox" id="mobile-sidebar-toggle" className="peer hidden" />
      
      {/* Mobile Overlay */}
      <label htmlFor="mobile-sidebar-toggle" className="fixed inset-0 bg-black/60 z-40 hidden peer-checked:block lg:hidden cursor-pointer backdrop-blur-sm transition-opacity" />

      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 text-slate-300 flex flex-col transform -translate-x-full peer-checked:translate-x-0 lg:relative lg:translate-x-0 transition-transform duration-300 shadow-2xl lg:shadow-none">
        <div className="h-16 flex items-center px-6 border-b border-slate-800 bg-slate-950 shrink-0">
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
        
        <div className="p-4 border-t border-slate-800 shrink-0">
          <form action={async () => {
            "use server";
            await signOut({ redirectTo: "/login" });
          }}>
            <button type="submit" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-red-500/10 text-red-400 w-full transition-colors text-sm">
              <LogOut size={18} /> Keluar
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden w-full relative">
        {/* Top Header */}
        <header className="h-16 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-4 lg:px-8 shrink-0">
          <div className="flex items-center gap-4">
            <label htmlFor="mobile-sidebar-toggle" className="lg:hidden text-slate-600 dark:text-slate-300 p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md cursor-pointer">
              <Menu size={24} />
            </label>
            <h1 className="text-base md:text-lg font-semibold font-heading">CMS Dashboard</h1>
          </div>

          <div className="flex items-center gap-3 md:gap-4">
            <div className="text-sm text-right hidden sm:block">
              <p className="font-semibold text-slate-900 dark:text-white leading-tight">{session?.user?.name || "Admin"}</p>
              <p className="text-xs text-slate-500">{session?.user?.email || "Super Admin"}</p>
            </div>
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold shadow-sm text-sm md:text-base">
              {session?.user?.name?.charAt(0).toUpperCase() || "A"}
            </div>
            
            <form action={async () => {
              "use server";
              await signOut({ redirectTo: "/login" });
            }}>
              <button type="submit" title="Keluar" className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-red-100 hover:bg-red-200 dark:bg-red-900/20 dark:hover:bg-red-900/40 text-red-600 dark:text-red-400 flex items-center justify-center transition-colors">
                <LogOut size={18} />
              </button>
            </form>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
