"use client";

import { useActionState } from "react";
import { authenticate } from "@/app/actions/auth";
import { Loader2, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useFormStatus } from "react-dom";

function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-3 rounded-md font-semibold flex items-center justify-center gap-2 transition-all disabled:opacity-70 disabled:cursor-wait mt-6 shadow-sm hover:shadow-md"
    >
      {pending ? (
        <Loader2 size={18} className="animate-spin" />
      ) : (
        <>
          Masuk ke Dashboard <ArrowRight size={18} />
        </>
      )}
    </button>
  );
}

export default function LoginPage() {
  const [errorMessage, dispatch] = useActionState(authenticate, undefined);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative Blobs */}
      <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-primary/5 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-primary/5 blur-3xl pointer-events-none"></div>

      {/* Form Container */}
      <div className="w-full max-w-md bg-white dark:bg-slate-900 shadow-xl border border-slate-200 dark:border-slate-800 p-8 sm:p-10 rounded-2xl relative z-10">
        
        <div className="text-center mb-8">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <Link href="/" className="relative w-[220px] h-[60px] block">
              <Image 
                src="/logo-utama.png" 
                alt="ZONASVARA SPACE Logo" 
                fill 
                sizes="240px"
                priority
                className="object-contain object-center"
              />
            </Link>
          </div>

          <h1 className="text-2xl font-bold font-heading tracking-tight mb-2 text-slate-900 dark:text-white">Admin Panel</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm">Silakan masukkan kredensial untuk melanjutkan.</p>
        </div>

        <form action={dispatch} className="space-y-5">
          <div className="space-y-2">
            <input
              id="email"
              type="text"
              name="email"
              placeholder="Masukkan username"
              required
              className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all hover:border-primary/50 text-slate-900 dark:text-white placeholder:text-slate-400"
            />
          </div>

          <div className="space-y-2">
            <input
              id="password"
              type="password"
              name="password"
              placeholder="Masukkan password"
              required
              className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all hover:border-primary/50 text-slate-900 dark:text-white placeholder:text-slate-400"
            />
          </div>

          {errorMessage && (
            <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-sm font-medium flex items-center justify-center animate-in fade-in zoom-in duration-300">
              {errorMessage}
            </div>
          )}

          <LoginButton />
          
          <div className="mt-8 text-center text-sm">
            <Link href="/" className="text-slate-500 hover:text-primary transition-colors hover:underline flex items-center justify-center gap-1">
              &larr; Kembali ke Beranda
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
