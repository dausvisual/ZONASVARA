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
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex relative overflow-hidden">
      {/* Decorative Blob */}
      <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-primary/10 blur-3xl pointer-events-none lg:hidden"></div>

      {/* Left Column - Image */}
      <div className="hidden lg:flex w-1/2 relative bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent"></div>
        <Image
          src="https://res.cloudinary.com/ispjadjc/image/upload/v1784439762/zonasvara/lzrpwjpq1cwrogqnkqlm.webp"
          alt="News Room"
          fill
          className="object-cover opacity-80"
          unoptimized
        />
        <div className="absolute bottom-0 left-0 z-20 p-16 w-full">
          <Link href="/">
            <div className="relative w-48 h-16 mb-6">
              <Image 
                src="/logo-utama.png" 
                alt="ZONASVARA SPACE Logo" 
                fill 
                className="object-contain object-left"
              />
            </div>
          </Link>
          <h2 className="text-white text-5xl font-bold font-heading leading-tight mb-4 drop-shadow-md">
            Portal Berita Independen & Terpercaya.
          </h2>
          <p className="text-slate-300 max-w-md text-lg drop-shadow-sm">
            Masuk ke panel kontrol untuk mengelola artikel, kategori, dan sistem informasi Zonasvara Space.
          </p>
        </div>
      </div>

      {/* Right Column - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 relative z-10">
        <div className="w-full max-w-md space-y-8 bg-white/50 dark:bg-slate-900/50 lg:bg-transparent lg:dark:bg-transparent backdrop-blur-xl lg:backdrop-blur-none p-8 lg:p-0 rounded-2xl shadow-xl lg:shadow-none border border-border lg:border-none">
          
          <div className="text-center lg:text-left">
            {/* Logo Mobile */}
            <div className="lg:hidden flex justify-center mb-8">
              <div className="relative w-[300px] h-[80px]">
                <Image 
                  src="/logo-utama.png" 
                  alt="ZONASVARA SPACE Logo" 
                  fill 
                  className="object-contain object-center"
                />
              </div>
            </div>

            <h1 className="text-3xl font-bold font-heading tracking-tight mb-2 text-foreground">Selamat Datang Kembali</h1>
            <p className="text-muted-foreground text-sm">Silakan masukkan kredensial admin Anda untuk melanjutkan.</p>
          </div>

          <form action={dispatch} className="space-y-5 mt-8">
            <div className="space-y-2">
              <input
                id="email"
                type="text"
                name="email"
                placeholder="Masukkan username"
                required
                className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all hover:border-primary/50"
              />
            </div>

            <div className="space-y-2">
              <input
                id="password"
                type="password"
                name="password"
                placeholder="Masukkan password"
                required
                className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all hover:border-primary/50"
              />
            </div>

            {errorMessage && (
              <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-sm font-medium flex items-center justify-center animate-in fade-in zoom-in duration-300">
                {errorMessage}
              </div>
            )}

            <LoginButton />
            
            <div className="mt-8 text-center text-sm">
              <Link href="/" className="text-muted-foreground hover:text-primary transition-colors hover:underline flex items-center justify-center gap-1">
                &larr; Kembali ke Beranda
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
