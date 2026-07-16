import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function OpiniPage() {
  const news = [
    { title: "Membaca Arah Politik Pilkada 2024: Mampukah Partai Baru Bersaing?", author: "Prof. Dr. Supriadi", time: "5 jam lalu", img: "https://i.pravatar.cc/150?u=1" },
    { title: "Dampak Kenaikan Suku Bunga Terhadap Kredit UMKM", author: "Budi Santoso, M.Ec", time: "6 jam lalu", img: "https://i.pravatar.cc/150?u=2" },
    { title: "Mengapa Transformasi Digital Pendidikan Berjalan Lambat?", author: "Dr. Rina Wijaya", time: "7 jam lalu", img: "https://i.pravatar.cc/150?u=3" }
  ];

  return (
    <div className="bg-background min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex items-center gap-3 mb-8">
          <span className="w-2 h-8 bg-primary block rounded"></span>
          <h1 className="text-3xl font-bold font-heading uppercase">Opini & Analisis</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {news.map((item, idx) => (
            <Link href="/berita/contoh-berita" key={idx} className="group flex flex-col gap-4 bg-card border border-border p-6 rounded-xl hover:shadow-md transition-shadow">
               <div className="flex items-center gap-3">
                 <Image src={item.img} alt={item.author} width={40} height={40} className="rounded-full" />
                 <div>
                   <p className="font-bold text-sm text-primary">{item.author}</p>
                   <p className="text-xs text-muted-foreground">{item.time}</p>
                 </div>
               </div>
               <h3 className="font-bold text-xl leading-snug group-hover:text-primary transition-colors">
                 {item.title}
               </h3>
               <p className="text-sm text-muted-foreground line-clamp-3">Analisis mendalam mengenai isu terkini yang disajikan secara eksklusif oleh pakar dan akademisi untuk pembaca setia Zonasvara.</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
