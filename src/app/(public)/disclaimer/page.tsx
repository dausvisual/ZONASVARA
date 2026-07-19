import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Disclaimer | ZONASVARA SPACE",
  description: "Penafian (Disclaimer) informasi dan konten di ZONASVARA SPACE.",
};

export default function DisclaimerPage() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 py-16">
      <div className="max-w-4xl mx-auto px-6 md:px-8">
        <div className="bg-white dark:bg-slate-900 p-8 md:p-12 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
          <h1 className="text-3xl md:text-4xl font-bold font-heading mb-8 text-slate-900 dark:text-white border-b pb-6">
            Disclaimer
          </h1>
          
          <div className="prose prose-slate dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 space-y-6">
            <p>
              Informasi yang diterbitkan oleh ZONASVARA SPACE disajikan untuk tujuan penyampaian informasi kepada masyarakat.
            </p>
            
            <p>
              Kami berupaya memastikan setiap informasi yang dipublikasikan akurat dan terpercaya. Namun demikian, ZONASVARA SPACE tidak memberikan jaminan bahwa seluruh informasi selalu lengkap, bebas dari kesalahan, atau sesuai dengan kebutuhan setiap pengguna.
            </p>

            <div>
              <p className="font-semibold text-slate-900 dark:text-white mb-2">ZONASVARA SPACE tidak bertanggung jawab atas:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Kerugian langsung maupun tidak langsung akibat penggunaan informasi di website.</li>
                <li>Keputusan yang diambil berdasarkan isi berita.</li>
                <li>Gangguan teknis di luar kendali kami.</li>
                <li>Isi tautan menuju situs pihak ketiga.</li>
              </ul>
            </div>

            <p className="bg-slate-100 dark:bg-slate-800/50 p-4 rounded-lg border-l-4 border-primary italic">
              Opini yang dimuat dalam rubrik Opini atau Kolom sepenuhnya menjadi tanggung jawab penulis dan tidak selalu mencerminkan sikap resmi redaksi.
            </p>

            <p className="font-medium">
              Komentar pengguna merupakan tanggung jawab masing-masing pengguna.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
