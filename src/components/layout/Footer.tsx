import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin } from "lucide-react";
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0f172a] text-slate-300 pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand & About */}
          <div className="space-y-6">
            <div className="relative w-[200px] h-[55px] bg-white rounded p-2">
              <Image 
                src="/logo-utama.png" 
                alt="ZONASVARA SPACE Logo" 
                fill 
                sizes="200px"
                className="object-contain object-left"
              />
            </div>
            <p className="text-sm leading-relaxed text-slate-400">
              ZONASVARA SPACE adalah portal berita digital yang menghadirkan informasi cepat, akurat, independen dan terpercaya. Menjadi ruang bagi setiap suara, menyajikan berita, analisis dan perspektif yang mencerahkan masyarakat.
            </p>
            <div className="flex items-center gap-4">
              <Link href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary hover:text-white transition-colors"><FaFacebook size={18} /></Link>
              <Link href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary hover:text-white transition-colors"><FaTwitter size={18} /></Link>
              <Link href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary hover:text-white transition-colors"><FaInstagram size={18} /></Link>
              <Link href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary hover:text-white transition-colors"><FaYoutube size={18} /></Link>
            </div>
          </div>

          {/* Wrapper for Kategori & Perusahaan (Side-by-side on Mobile) */}
          <div className="grid grid-cols-2 gap-6 lg:col-span-2 lg:grid-cols-2 lg:gap-12">
            {/* Kategori */}
            <div>
              <h3 className="text-white font-bold text-base md:text-lg mb-4 md:mb-6 flex items-center gap-2">
                <span className="w-1 h-4 md:h-5 bg-primary block rounded-full"></span>
                Kategori
              </h3>
              <ul className="space-y-2.5 md:space-y-3 text-xs md:text-sm">
                <li><Link href="/kategori/news" className="hover:text-white transition-colors">News</Link></li>
                <li><Link href="/kategori/nasional" className="hover:text-white transition-colors">Nasional</Link></li>
                <li><Link href="/kategori/politik" className="hover:text-white transition-colors">Politik</Link></li>
                <li><Link href="/kategori/ekonomi" className="hover:text-white transition-colors">Ekonomi</Link></li>
                <li><Link href="/kategori/hukum" className="hover:text-white transition-colors">Hukum</Link></li>
                <li><Link href="/kategori/pendidikan" className="hover:text-white transition-colors block leading-tight">Pendidikan</Link></li>
                <li><Link href="/kategori/teknologi" className="hover:text-white transition-colors">Teknologi</Link></li>
                <li><Link href="/kategori/olahraga" className="hover:text-white transition-colors">Olahraga</Link></li>
                <li><Link href="/kategori/gaya-hidup" className="hover:text-white transition-colors block leading-tight">Gaya Hidup</Link></li>
                <li><Link href="/kategori/internasional" className="hover:text-white transition-colors block leading-tight">Internasional</Link></li>
              </ul>
            </div>

            {/* Perusahaan */}
            <div>
              <h3 className="text-white font-bold text-base md:text-lg mb-4 md:mb-6 flex items-center gap-2">
                <span className="w-1 h-4 md:h-5 bg-secondary block rounded-full"></span>
                Perusahaan
              </h3>
              <ul className="space-y-2.5 md:space-y-3 text-xs md:text-sm">
                <li><Link href="/tentang-kami" className="hover:text-white transition-colors block leading-tight">Tentang Kami</Link></li>
                <li><Link href="/redaksi" className="hover:text-white transition-colors block leading-tight">Susunan Redaksi</Link></li>
                <li><Link href="/pedoman-siber" className="hover:text-white transition-colors block leading-tight">Pedoman Siber</Link></li>
                <li><Link href="/disclaimer" className="hover:text-white transition-colors">Disclaimer</Link></li>
                <li><Link href="/kebijakan-privasi" className="hover:text-white transition-colors block leading-tight">Kebijakan Privasi</Link></li>
                <li><Link href="/syarat-ketentuan" className="hover:text-white transition-colors block leading-tight">Syarat & Ketentuan</Link></li>
                <li><Link href="/karir" className="hover:text-white transition-colors">Karir</Link></li>
              </ul>
            </div>
          </div>

          {/* Kontak */}
          <div>
            <h3 className="text-white font-bold text-base md:text-lg mb-4 md:mb-6 flex items-center gap-2">
              <span className="w-1 h-4 md:h-5 bg-accent block rounded-full"></span>
              Kontak
            </h3>
            <ul className="space-y-3 md:space-y-4 text-xs md:text-sm">
              <li className="flex items-center gap-3">
                <MapPin size={18} className="text-primary shrink-0" />
                <span className="text-slate-400">Jakarta, Indonesia</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-primary shrink-0" />
                <span className="text-slate-400">08158772217</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-primary shrink-0" />
                <a href="mailto:zonasvaraspace@gmail.com" className="text-slate-400 hover:text-white transition-colors">
                  zonasvaraspace@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p className="text-slate-500 font-medium">
            &copy; {currentYear} ZONASVARA SPACE. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
