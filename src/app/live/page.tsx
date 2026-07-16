import Image from "next/image";
import Link from "next/link";
import { Radio } from "lucide-react";

export default function LivePage() {
  return (
    <div className="bg-background min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="flex items-center gap-3 mb-8">
          <Radio className="text-red-500 animate-pulse" size={32} />
          <h1 className="text-3xl font-bold font-heading uppercase text-red-500">Live Report</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Live Content */}
          <div className="lg:col-span-2">
            <div className="w-full aspect-video bg-black rounded-2xl overflow-hidden shadow-lg relative flex items-center justify-center mb-6 border border-border">
              <div className="absolute top-4 left-4 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded flex items-center gap-2 z-10">
                <span className="w-2 h-2 bg-white rounded-full animate-ping"></span> LIVE
              </div>
              <Image 
                src="https://akcdn.detik.net.id/community/media/visual/2026/07/16/transportasi-publik-jakarta-makin-terhubung-lrt-manggarai-jadi-simpul-baru-1784180197211.png?w=1000&q=90" 
                alt="Live Event" 
                fill 
                className="object-cover opacity-60" 
              />
              <Radio className="text-white w-16 h-16 opacity-80 z-10" />
            </div>
            <h2 className="text-2xl font-bold font-heading mb-4">Peresmian Stasiun LRT Manggarai Tahap 1</h2>
            <p className="text-muted-foreground text-sm">
              Siaran langsung peresmian pengoperasian penuh Stasiun LRT Manggarai yang akan dihadiri oleh pejabat pemerintah dan tokoh masyarakat. Stasiun ini menjadi simpul penting dalam integrasi transportasi publik di Jakarta.
            </p>
          </div>

          {/* Live Updates feed */}
          <div className="bg-slate-50 dark:bg-card border border-border rounded-xl p-6 h-[600px] overflow-y-auto">
            <h3 className="text-lg font-bold font-heading mb-6 pb-2 border-b border-border">Live Updates</h3>
            
            <div className="relative border-l-2 border-slate-200 dark:border-slate-700 ml-3 space-y-8 pb-4">
              
              <div className="relative pl-6">
                <div className="absolute -left-2 top-1 w-4 h-4 bg-red-500 rounded-full border-4 border-white dark:border-card"></div>
                <p className="text-xs font-bold text-red-500 mb-1">Baru Saja</p>
                <p className="text-sm font-semibold mb-2">Acara peresmian resmi dimulai</p>
                <p className="text-xs text-muted-foreground">Rombongan menteri dan pejabat telah tiba di lokasi peresmian Stasiun Manggarai.</p>
              </div>

              <div className="relative pl-6">
                <div className="absolute -left-2 top-1 w-4 h-4 bg-primary rounded-full border-4 border-white dark:border-card"></div>
                <p className="text-xs font-bold text-muted-foreground mb-1">10 Menit Lalu</p>
                <p className="text-sm font-semibold mb-2">Penjagaan diperketat di area VIP</p>
                <p className="text-xs text-muted-foreground">Terlihat pengamanan yang cukup ketat menjelang kedatangan para pejabat negara.</p>
              </div>
              
              <div className="relative pl-6">
                <div className="absolute -left-2 top-1 w-4 h-4 bg-primary rounded-full border-4 border-white dark:border-card"></div>
                <p className="text-xs font-bold text-muted-foreground mb-1">30 Menit Lalu</p>
                <p className="text-sm font-semibold mb-2">Warga mulai memadati area stasiun</p>
                <p className="text-xs text-muted-foreground">Masyarakat umum sangat antusias menyambut pengoperasian stasiun terpadu ini.</p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
