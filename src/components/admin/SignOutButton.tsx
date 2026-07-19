"use client";

import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

export function SignOutButton({ variant = "icon" }: { variant?: "icon" | "full" }) {
  const handleLogout = async () => {
    await signOut({ callbackUrl: "/login" });
  };

  if (variant === "full") {
    return (
      <button
        onClick={handleLogout}
        className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-red-500/10 text-red-400 w-full transition-colors text-sm"
      >
        <LogOut size={16} /> Keluar
      </button>
    );
  }

  return (
    <button
      onClick={handleLogout}
      title="Keluar"
      className="w-8 h-8 rounded-full bg-red-100 hover:bg-red-200 dark:bg-red-900/20 dark:hover:bg-red-900/40 text-red-600 dark:text-red-400 flex items-center justify-center transition-colors shrink-0"
    >
      <LogOut size={16} />
    </button>
  );
}
