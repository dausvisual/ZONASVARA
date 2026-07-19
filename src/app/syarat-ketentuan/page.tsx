import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Syarat & Ketentuan | ZONASVARA SPACE",
  description: "Syarat dan Ketentuan penggunaan portal berita digital ZONASVARA SPACE.",
};

export default function SyaratKetentuanPage() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 py-16">
      <div className="max-w-4xl mx-auto px-6 md:px-8">
        <div className="bg-white dark:bg-slate-900 p-8 md:p-12 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
          <h1 className="text-3xl md:text-4xl font-bold font-heading mb-8 text-slate-900 dark:text-white border-b pb-6">
            Syarat & Ketentuan
          </h1>
          
          <div className="prose prose-slate dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 space-y-6">
            <div>
              <h2 className="text-xl font-bold font-heading text-slate-900 dark:text-white mt-8 mb-4">Ketentuan Umum</h2>
              <p>
                Dengan mengakses atau menggunakan website ZONASVARA SPACE, Anda dianggap telah membaca, memahami, dan menyetujui seluruh syarat dan ketentuan ini.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold font-heading text-slate-900 dark:text-white mt-8 mb-4">Penggunaan Website</h2>
              <p className="mb-2">
                Pengguna wajib menggunakan website secara bertanggung jawab dan tidak melakukan tindakan yang melanggar hukum, termasuk namun tidak terbatas pada:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Menyebarkan spam.</li>
                <li>Mengunggah malware.</li>
                <li>Melakukan peretasan.</li>
                <li>Mengganggu operasional website.</li>
                <li>Menyebarkan informasi palsu.</li>
                <li>Melanggar hak cipta.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold font-heading text-slate-900 dark:text-white mt-8 mb-4">Hak Kekayaan Intelektual</h2>
              <p>
                Seluruh artikel, foto, video, desain, logo, ilustrasi, infografik, dan konten lain di ZONASVARA SPACE dilindungi oleh peraturan perundang-undangan mengenai Hak Kekayaan Intelektual.
              </p>
              <p className="mt-2 bg-slate-100 dark:bg-slate-800/50 p-4 rounded-lg font-medium">
                Pengguna tidak diperkenankan menyalin, menggandakan, mendistribusikan, atau menggunakan konten tanpa izin tertulis dari ZONASVARA SPACE, kecuali sebagaimana diperbolehkan oleh hukum.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold font-heading text-slate-900 dark:text-white mt-8 mb-4">Tautan ke Situs Lain</h2>
              <p>
                Website dapat memuat tautan menuju situs pihak ketiga. ZONASVARA SPACE tidak bertanggung jawab atas isi maupun kebijakan privasi situs tersebut.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold font-heading text-slate-900 dark:text-white mt-8 mb-4">Perubahan Layanan</h2>
              <p>
                Kami berhak mengubah, memperbarui, atau menghentikan sebagian maupun seluruh layanan tanpa pemberitahuan sebelumnya.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold font-heading text-slate-900 dark:text-white mt-8 mb-4">Pembatasan Tanggung Jawab</h2>
              <p>
                ZONASVARA SPACE tidak bertanggung jawab atas kerugian yang timbul akibat penggunaan website di luar kendali kami.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold font-heading text-slate-900 dark:text-white mt-8 mb-4">Hukum yang Berlaku</h2>
              <p>
                Syarat dan Ketentuan ini diatur dan ditafsirkan berdasarkan hukum Republik Indonesia.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
