import Link from "next/link";
import { ChevronRight, UserCircle2 } from "lucide-react";

export default function OpiniPage() {
  const news = [
    { 
      title: "Masa Depan AI di Indonesia: Peluang atau Ancaman bagi Pekerja Kreatif?", 
      author: "Budi Santoso",
      role: "Pakar Teknologi AI", 
      time: "2 jam lalu", 
      summary: "Kecerdasan Buatan (AI) berkembang pesat dan mulai mendisrupsi industri kreatif lokal. Bagaimana pekerja seni dan penulis Indonesia harus beradaptasi?"
    },
    { 
      title: "Transisi Energi Hijau: Kesiapan Infrastruktur Kendaraan Listrik di Daerah", 
      author: "Rina Wijaya",
      role: "Peneliti Energi Terbarukan", 
      time: "5 jam lalu", 
      summary: "Subsidi kendaraan listrik terus digencarkan, namun kesiapan Stasiun Pengisian Kendaraan Listrik Umum (SPKLU) di luar Pulau Jawa masih menjadi tanda tanya besar."
    },
    { 
      title: "Pilkada Serentak 2026: Membaca Peta Kekuatan Politik Ekonomi", 
      author: "Haryanto Prabowo",
      role: "Pengamat Politik & Ekonomi", 
      time: "12 jam lalu", 
      summary: "Pilkada serentak tahun ini bukan hanya sekadar kontestasi figur, melainkan pertarungan visi pemulihan ekonomi dan ketahanan pangan di masing-masing daerah."
    }
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
                 <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary shrink-0">
                   <UserCircle2 size={24} />
                 </div>
                 <div>
                   <p className="font-bold text-sm text-primary">{item.author}</p>
                   <p className="text-[11px] font-medium text-slate-500 uppercase tracking-wide">{item.role}</p>
                   <p className="text-xs text-muted-foreground mt-0.5">{item.time}</p>
                 </div>
               </div>
               <h3 className="font-bold text-xl leading-snug group-hover:text-primary transition-colors">
                 {item.title}
               </h3>
               <p className="text-sm text-muted-foreground line-clamp-3">{item.summary}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
