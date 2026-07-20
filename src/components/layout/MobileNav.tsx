"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, LayoutGrid, PlaySquare, MessageSquare, Newspaper } from "lucide-react";

export function MobileNav() {
  const pathname = usePathname();

  const navItems = [
    { label: "Beranda", icon: Home, href: "/" },
    { label: "Berita", icon: Newspaper, href: "/berita" },
    { label: "Kategori", icon: LayoutGrid, href: "/kategori" },
    { label: "Video", icon: PlaySquare, href: "/video" },
    { label: "Opini", icon: MessageSquare, href: "/opini" },
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-[#0f172a] text-slate-400 border-t border-slate-800 z-[60] pb-safe">
      <nav className="flex justify-around items-center px-2 py-1.5">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
          const Icon = item.icon;
          return (
            <Link 
              key={item.href} 
              href={item.href}
              className={`flex flex-col items-center justify-center gap-1 p-2 flex-1 transition-colors ${isActive ? "text-white" : "hover:text-white"}`}
            >
              <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
