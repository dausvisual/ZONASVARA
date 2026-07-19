import Link from "next/link";
import { format } from "date-fns";
import { id } from "date-fns/locale";

export default function IndeksPage() {
  const currentDate = format(new Date(), "EEEE, dd MMMM yyyy", { locale: id });
  const news = [
    { title: "TAP Untuk Negeri Renovasi Rumah Lansia di Desa Merapun", category: "SOSIAL", time: "10:30 WIB" },
    { title: "KPK Geledah Rumah Bupati Etik Suryani TKP Simpan Emas 2,5 Kg", category: "HUKUM", time: "09:45 WIB" },
    { title: "Daftar Nama Tim 9 yang Usut Febrie Adriansyah", category: "HUKUM", time: "09:15 WIB" },
    { title: "Zulhas Ungkap Penyaluran Bansos dan Hasil Panen", category: "POLITIK", time: "08:30 WIB" },
    { title: "Iran Pasang Billboard 'Trump dalam Peti Mati' di Teheran", category: "INTERNASIONAL", time: "07:55 WIB" },
    { title: "LRT Manggarai Jadi Simpul Baru Transportasi Publik", category: "NASIONAL", time: "07:00 WIB" }
  ];

  return (
    <div className="bg-background min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        <div className="flex items-center gap-3 mb-8 border-b border-border pb-4">
          <span className="w-2 h-8 bg-primary block rounded"></span>
          <div>
             <h1 className="text-3xl font-bold font-heading uppercase">Indeks Berita</h1>
             <p className="text-muted-foreground">{currentDate}</p>
          </div>
        </div>

        <div className="flex flex-col">
          {news.map((item, idx) => (
            <div key={idx} className="flex flex-col md:flex-row md:items-center py-4 border-b border-slate-100 dark:border-slate-800 gap-2 md:gap-6 group">
               <div className="w-24 shrink-0 text-sm font-semibold text-muted-foreground flex flex-col md:text-right">
                 <span>{item.time}</span>
               </div>
               <Link href="/berita/contoh-berita" className="flex-grow">
                 <h3 className="font-bold text-lg leading-snug group-hover:text-primary transition-colors">
                   <span className="text-primary text-xs mr-2 border border-primary px-1.5 py-0.5 rounded">{item.category}</span>
                   {item.title}
                 </h3>
               </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
