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
                src="/zonasvara-logo.png" 
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

          {/* Kategori */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
              <span className="w-1 h-5 bg-primary block rounded-full"></span>
              Kategori
            </h3>
            <ul className="grid grid-cols-2 gap-y-3 text-sm">
              <li><Link href="/kategori/nasional" className="hover:text-white transition-colors">Nasional</Link></li>
              <li><Link href="/kategori/politik" className="hover:text-white transition-colors">Politik</Link></li>
              <li><Link href="/kategori/ekonomi" className="hover:text-white transition-colors">Ekonomi</Link></li>
              <li><Link href="/kategori/hukum" className="hover:text-white transition-colors">Hukum</Link></li>
              <li><Link href="/kategori/pendidikan" className="hover:text-white transition-colors">Pendidikan</Link></li>
              <li><Link href="/kategori/teknologi" className="hover:text-white transition-colors">Teknologi</Link></li>
              <li><Link href="/kategori/olahraga" className="hover:text-white transition-colors">Olahraga</Link></li>
              <li><Link href="/kategori/gaya-hidup" className="hover:text-white transition-colors">Gaya Hidup</Link></li>
              <li><Link href="/kategori/internasional" className="hover:text-white transition-colors">Internasional</Link></li>
              <li><Link href="/kategori/otomotif" className="hover:text-white transition-colors">Otomotif</Link></li>
            </ul>
          </div>

          {/* Perusahaan */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
              <span className="w-1 h-5 bg-secondary block rounded-full"></span>
              Perusahaan
            </h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/tentang-kami" className="hover:text-white transition-colors">Tentang Kami</Link></li>
              <li><Link href="/redaksi" className="hover:text-white transition-colors">Susunan Redaksi</Link></li>
              <li><Link href="/pedoman-siber" className="hover:text-white transition-colors">Pedoman Media Siber</Link></li>
              <li><Link href="/disclaimer" className="hover:text-white transition-colors">Disclaimer</Link></li>
              <li><Link href="/kebijakan-privasi" className="hover:text-white transition-colors">Kebijakan Privasi</Link></li>
              <li><Link href="/syarat-ketentuan" className="hover:text-white transition-colors">Syarat & Ketentuan</Link></li>
              <li><Link href="/karir" className="hover:text-white transition-colors">Karir</Link></li>
            </ul>
          </div>

          {/* Kontak & Newsletter */}
          <div className="space-y-8">
            <div>
              <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
                <span className="w-1 h-5 bg-accent block rounded-full"></span>
                Hubungi Kami
              </h3>
              <ul className="space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <MapPin size={18} className="text-primary shrink-0 mt-0.5" />
                  <span className="text-slate-400">Gedung Zonasvara Lt. 5, Jl. Sudirman Kav. 50, Jakarta Selatan 12930</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone size={18} className="text-primary shrink-0" />
                  <span className="text-slate-400">+62 21 5555 1234</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail size={18} className="text-primary shrink-0" />
                  <span className="text-slate-400">redaksi@zonasvara.space</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold text-sm mb-3">Berlangganan Newsletter</h4>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Email Anda" 
                  className="bg-slate-800 border-none rounded-l-md px-4 py-2 text-sm w-full focus:outline-none focus:ring-1 focus:ring-primary text-white"
                />
                <button className="bg-primary hover:bg-primary/90 text-white px-4 py-2 text-sm font-semibold rounded-r-md transition-colors">
                  Kirim
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p className="text-slate-500 font-medium">
            &copy; {currentYear} ZONASVARA SPACE. All rights reserved. <br/>
            <span className="text-xs font-normal italic">*Seluruh konten berita merupakan hak cipta dan bersumber dari <a href="https://news.detik.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors underline">news.detik.com</a>, ditampilkan semata untuk keperluan demonstrasi UI/UX portofolio.</span>
          </p>
          <div className="flex gap-4">
            <Link href="/rss" className="hover:text-slate-300">RSS Feed</Link>
            <Link href="/sitemap" className="hover:text-slate-300">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
