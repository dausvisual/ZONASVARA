import Link from "next/link";
import { auth } from "@/auth";
import {
  LayoutDashboard,
  FileText,
  Users,
  Settings,
  Image as ImageIcon,
  Tag,
  PenSquare,
} from "lucide-react";
import { AdminBottomNav } from "@/components/admin/AdminBottomNav";
import { SignOutButton } from "@/components/admin/SignOutButton";

const sidebarLinks = [
  {
    section: null,
    links: [{ href: "/admin", icon: LayoutDashboard, label: "Dashboard" }],
  },
  {
    section: "Berita",
    links: [
      { href: "/admin/articles", icon: FileText, label: "Semua Artikel" },
      { href: "/admin/articles/create", icon: PenSquare, label: "Tulis Artikel Baru" },
      { href: "/admin/categories", icon: Tag, label: "Kategori" },
    ],
  },
  {
    section: "Media",
    links: [{ href: "/admin/media", icon: ImageIcon, label: "Galeri & Media" }],
  },
  {
    section: "Sistem",
    links: [
      { href: "/admin/users", icon: Users, label: "Pengguna & Role" },
      { href: "/admin/settings", icon: Settings, label: "Pengaturan" },
    ],
  },
];

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  const userName = session?.user?.name || "Admin";
  const userEmail = session?.user?.email || "";
  const userInitial = userName.charAt(0).toUpperCase();

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 flex">

      {/* ── Desktop Sidebar ── */}
      <aside className="hidden lg:flex w-64 shrink-0 flex-col bg-slate-900 text-slate-300 h-screen sticky top-0">
        <div className="h-16 flex items-center px-6 border-b border-slate-800 bg-slate-950 shrink-0">
          <span className="text-white font-bold font-heading text-lg tracking-wide">ZONASVARA CMS</span>
        </div>

        <nav className="flex-grow overflow-y-auto p-3 space-y-1">
          {sidebarLinks.map((group, gi) => (
            <div key={gi}>
              {group.section && (
                <div className="pt-4 pb-1 px-3 text-[10px] font-semibold text-slate-500 uppercase tracking-widest">
                  {group.section}
                </div>
              )}
              {group.links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-slate-800 hover:text-white transition-colors text-sm"
                >
                  <link.icon size={16} />
                  {link.label}
                </Link>
              ))}
            </div>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-800 shrink-0 space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary/30 flex items-center justify-center text-primary font-bold text-sm shrink-0">
              {userInitial}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-white truncate">{userName}</p>
              <p className="text-[11px] text-slate-500 truncate">{userEmail}</p>
            </div>
          </div>
          <SignOutButton variant="full" />
        </div>
      </aside>

      {/* ── Main ── */}
      <div className="flex-1 flex flex-col min-h-screen min-w-0">

        {/* ── Mobile Top Bar ── */}
        <header className="lg:hidden sticky top-0 z-40 h-14 bg-slate-900 text-white flex items-center justify-between px-4 shadow-lg shrink-0">
          <span className="font-bold font-heading text-sm tracking-wide">ZONASVARA CMS</span>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary/30 flex items-center justify-center text-primary font-bold text-sm select-none">
              {userInitial}
            </div>
            <SignOutButton variant="icon" />
          </div>
        </header>

        {/* ── Desktop Top Bar ── */}
        <header className="hidden lg:flex h-16 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 items-center justify-between px-8 shrink-0 sticky top-0 z-30">
          <h1 className="text-lg font-semibold font-heading text-slate-800 dark:text-white">CMS Dashboard</h1>
          <div className="flex items-center gap-4 text-sm text-right">
            <div>
              <p className="font-semibold text-slate-900 dark:text-white leading-tight">{userName}</p>
              <p className="text-xs text-slate-500">{userEmail}</p>
            </div>
            <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold shadow-sm">
              {userInitial}
            </div>
          </div>
        </header>

        {/* ── Page Content ── */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 pb-24 lg:pb-8">
          {children}
        </main>
      </div>

      {/* ── Mobile Bottom Nav (pure navigation only) ── */}
      <AdminBottomNav />
    </div>
  );
}
