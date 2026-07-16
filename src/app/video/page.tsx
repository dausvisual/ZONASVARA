import Image from "next/image";
import Link from "next/link";
import { PlayCircle } from "lucide-react";

export default function VideoPage() {
  const videos = [
    { title: "Zulhas Ungkap Penyaluran Bansos Lewat Kopdes Merah Putih", time: "2 jam lalu", img: "https://akcdn.detik.net.id/community/media/visual/2026/07/16/menteri-koordinator-bidang-pangan-menko-pangan-zulkifli-hasan-di-tmii-adhfardetik-1784178288152_169.jpeg?w=1000&q=90" },
    { title: "KPK Geledah Rumah Bupati Etik Suryani TKP Simpan Emas 2,5 Kg", time: "4 jam lalu", img: "https://akcdn.detik.net.id/community/media/visual/2026/07/16/rumah-bupati-etik-suryani-di-laweyan-1784176336669_169.jpeg?w=1000&q=90" },
    { title: "Iran Pasang Billboard 'Trump dalam Peti Mati' di Teheran", time: "5 jam lalu", img: "https://akcdn.detik.net.id/community/media/visual/2026/07/16/trump-1784178593207_169.webp?w=1000&q=90" },
    { title: "LRT Manggarai Jadi Simpul Baru Transportasi Publik", time: "6 jam lalu", img: "https://akcdn.detik.net.id/community/media/visual/2026/07/16/transportasi-publik-jakarta-makin-terhubung-lrt-manggarai-jadi-simpul-baru-1784180197211.png?w=1000&q=90" }
  ];

  return (
    <div className="bg-slate-900 min-h-screen py-8 text-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        <div className="flex items-center gap-3 mb-8">
          <span className="w-2 h-8 bg-accent block rounded"></span>
          <h1 className="text-3xl font-bold font-heading uppercase">Video Zonasvara</h1>
        </div>

        {/* Featured Video */}
        <div className="mb-12">
          <Link href="/berita/contoh-berita" className="group block relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl">
            <Image src={videos[0].img} alt={videos[0].title} fill className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100" />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <PlayCircle className="text-white w-20 h-20 opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300" />
            </div>
            <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-black/90 to-transparent">
              <h2 className="text-3xl font-bold font-heading mb-2">{videos[0].title}</h2>
              <p className="text-slate-300 text-sm">{videos[0].time}</p>
            </div>
          </Link>
        </div>

        <h3 className="text-xl font-bold mb-6 border-b border-slate-700 pb-2">Video Terbaru</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {videos.slice(1).map((item, idx) => (
            <Link href="/berita/contoh-berita" key={idx} className="group flex flex-col gap-3">
              <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-md">
                <Image src={item.img} alt={item.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <PlayCircle className="text-white w-12 h-12 opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300 drop-shadow-lg" />
                </div>
              </div>
              <div>
                <h3 className="font-bold text-base leading-snug group-hover:text-primary transition-colors line-clamp-2 mb-1">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-400 font-semibold">{item.time}</p>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
}
