"use client";

import { LogOut } from "lucide-react";
import { handleSignOut } from "@/app/admin/actions";

export function SignOutButton({ variant = "icon" }: { variant?: "icon" | "full" }) {
  if (variant === "full") {
    return (
      <form action={handleSignOut} className="w-full">
        <button
          type="submit"
          className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-red-500/10 text-red-400 w-full transition-colors text-sm"
        >
          <LogOut size={16} /> Keluar
        </button>
      </form>
    );
  }

  return (
    <form action={handleSignOut} className="flex">
      <button
        type="submit"
        title="Keluar"
        className="w-8 h-8 rounded-full bg-red-100 hover:bg-red-200 dark:bg-red-900/20 dark:hover:bg-red-900/40 text-red-600 dark:text-red-400 flex items-center justify-center transition-colors shrink-0"
      >
        <LogOut size={16} />
      </button>
    </form>
  );
}
