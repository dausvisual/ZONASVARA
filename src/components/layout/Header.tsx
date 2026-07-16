"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { 
  Search, 
  Menu, 
  X, 
  Sun,
  Moon
} from "lucide-react";
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  const currentDate = format(new Date(), "EEEE, dd MMMM yyyy", { locale: id });

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <header className="w-full bg-background border-b border-border sticky top-0 z-50 transition-colors duration-300">
      {/* Top Bar */}
      <div className="bg-primary text-primary-foreground py-2 px-4 md:px-8 text-xs flex justify-between items-center">
        <div className="flex items-center gap-4">
          <span className="bg-accent text-accent-foreground px-2 py-1 font-bold rounded-sm shrink-0">BREAKING NEWS</span>
          <div className="overflow-hidden whitespace-nowrap hidden sm:block max-w-[300px] md:max-w-md lg:max-w-lg">
            <p className="animate-marquee inline-block">
              Pemerintah Dorong Transformasi Digital di Sektor Pendidikan...
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <span className="hidden md:inline-block">{currentDate}</span>
          <div className="flex items-center gap-2">
            <Link href="#" className="hover:text-secondary transition-colors"><FaFacebook size={14} /></Link>
            <Link href="#" className="hover:text-secondary transition-colors"><FaTwitter size={14} /></Link>
            <Link href="#" className="hover:text-secondary transition-colors"><FaInstagram size={14} /></Link>
            <Link href="#" className="hover:text-secondary transition-colors"><FaYoutube size={14} /></Link>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="relative w-[180px] h-[50px]">
            <Image 
              src="/zonasvara-logo.png" 
              alt="ZONASVARA SPACE Logo" 
              fill 
              sizes="180px"
              className="object-contain object-left"
              priority
            />
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-6 font-semibold text-sm">
          <Link href="/" className="hover:text-primary transition-colors">HOME</Link>
          <Link href="/berita" className="hover:text-primary transition-colors">BERITA</Link>
          <div className="group relative cursor-pointer py-4">
            <span className="hover:text-primary transition-colors flex items-center gap-1">
              KATEGORI
              <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg" className="group-hover:rotate-180 transition-transform">
                <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
            {/* Mega Menu Dropdown */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 w-[600px] bg-background border border-border rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 grid grid-cols-3 p-6 gap-4">
              <Link href="/kategori/nasional" className="hover:text-primary hover:bg-muted p-2 rounded transition-colors">Nasional</Link>
              <Link href="/kategori/politik" className="hover:text-primary hover:bg-muted p-2 rounded transition-colors">Politik</Link>
              <Link href="/kategori/ekonomi" className="hover:text-primary hover:bg-muted p-2 rounded transition-colors">Ekonomi</Link>
              <Link href="/kategori/teknologi" className="hover:text-primary hover:bg-muted p-2 rounded transition-colors">Teknologi</Link>
              <Link href="/kategori/olahraga" className="hover:text-primary hover:bg-muted p-2 rounded transition-colors">Olahraga</Link>
              <Link href="/kategori/internasional" className="hover:text-primary hover:bg-muted p-2 rounded transition-colors">Internasional</Link>
            </div>
          </div>
          <Link href="/video" className="hover:text-primary transition-colors">VIDEO</Link>
          <Link href="/opini" className="hover:text-primary transition-colors">OPINI</Link>
          <Link href="/indeks" className="hover:text-primary transition-colors">INDEKS</Link>
        </nav>

        <div className="hidden lg:flex items-center gap-4">
          <Link href="/search" className="text-foreground hover:text-primary transition-colors">
            <Search size={20} />
          </Link>
          <button onClick={toggleDarkMode} className="text-foreground hover:text-primary transition-colors">
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <Link href="/live" className="bg-accent text-accent-foreground px-4 py-1.5 rounded-full font-bold text-sm hover:bg-red-700 transition-colors shadow-sm">
            LIVE
          </Link>
        </div>

        {/* Mobile Toggle */}
        <div className="lg:hidden flex items-center gap-4">
           <button onClick={toggleDarkMode} className="text-foreground hover:text-primary transition-colors">
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-foreground hover:text-primary transition-colors">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-background border-b border-border shadow-lg py-4 px-4 flex flex-col gap-4 font-semibold text-sm">
           <Link href="/" className="hover:text-primary transition-colors">HOME</Link>
          <Link href="/berita" className="hover:text-primary transition-colors">BERITA</Link>
          <Link href="/kategori" className="hover:text-primary transition-colors">KATEGORI</Link>
          <Link href="/video" className="hover:text-primary transition-colors">VIDEO</Link>
          <Link href="/opini" className="hover:text-primary transition-colors">OPINI</Link>
          <Link href="/indeks" className="hover:text-primary transition-colors">INDEKS</Link>
           <Link href="/live" className="bg-accent text-accent-foreground px-4 py-2 rounded font-bold text-center hover:bg-red-700 transition-colors mt-2">
            LIVE STREAMING
          </Link>
        </div>
      )}
    </header>
  );
}
