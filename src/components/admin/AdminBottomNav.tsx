"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  Users,
  Image as ImageIcon,
  Tag,
  Plus,
} from "lucide-react";

const bottomNavItems = [
  { href: "/admin", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/admin/articles", icon: FileText, label: "Artikel" },
  { href: "/admin/articles/create", icon: Plus, label: "Buat" },
  { href: "/admin/media", icon: ImageIcon, label: "Media" },
  { href: "/admin/users", icon: Users, label: "Pengguna" },
];

export function AdminBottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-slate-900 border-t border-slate-800 lg:hidden">
      <div className="flex items-stretch">
        {bottomNavItems.map((item) => {
          const isActive = item.href === "/admin"
            ? pathname === "/admin"
            : pathname.startsWith(item.href);
          const isCreate = item.href === "/admin/articles/create";

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex-1 flex flex-col items-center justify-center py-2 gap-0.5 text-[10px] font-medium transition-colors relative
                ${isCreate
                  ? "bg-primary text-white"
                  : isActive
                  ? "text-primary bg-slate-800"
                  : "text-slate-400 hover:text-slate-200"
                }`}
            >
              {isCreate ? (
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center mb-0.5">
                  <item.icon size={18} />
                </div>
              ) : (
                <item.icon size={18} />
              )}
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
