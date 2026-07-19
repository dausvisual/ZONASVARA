import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pedoman Media Siber | ZONASVARA SPACE",
  description: "Pedoman pemberitaan media siber ZONASVARA SPACE sesuai standar Dewan Pers.",
};

export default function PedomanSiberPage() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 py-16">
      <div className="max-w-4xl mx-auto px-6 md:px-8">
        <div className="bg-white dark:bg-slate-900 p-8 md:p-12 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
          <h1 className="text-3xl md:text-4xl font-bold font-heading mb-8 text-slate-900 dark:text-white border-b pb-6">
            Pedoman Media Siber
          </h1>
          
          <div className="prose prose-slate dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 space-y-6">
            <p className="lead font-medium text-lg">
              ZONASVARA SPACE merupakan portal berita digital yang berkomitmen menjalankan kegiatan jurnalistik berdasarkan Undang-Undang Nomor 40 Tahun 1999 tentang Pers, Kode Etik Jurnalistik, dan Pedoman Pemberitaan Media Siber yang ditetapkan Dewan Pers.
            </p>

            <div>
              <h2 className="text-xl font-bold font-heading text-slate-900 dark:text-white mt-8 mb-4">1. Ruang Lingkup</h2>
              <p>Pedoman ini berlaku untuk seluruh konten yang diterbitkan melalui website, aplikasi, media sosial, maupun platform digital resmi ZONASVARA SPACE.</p>
            </div>

            <div>
              <h2 className="text-xl font-bold font-heading text-slate-900 dark:text-white mt-8 mb-4">2. Verifikasi Informasi</h2>
              <p>Setiap berita yang dipublikasikan melalui ZONASVARA SPACE diupayakan melalui proses verifikasi sesuai standar jurnalistik. Dalam keadaan tertentu yang berkaitan dengan kepentingan publik dan keterbatasan waktu, berita dapat dipublikasikan dengan penjelasan bahwa informasi masih berkembang dan akan diperbarui setelah proses verifikasi selesai.</p>
            </div>

            <div>
              <h2 className="text-xl font-bold font-heading text-slate-900 dark:text-white mt-8 mb-4">3. Hak Jawab dan Hak Koreksi</h2>
              <p>Setiap pihak yang merasa dirugikan oleh pemberitaan berhak mengajukan Hak Jawab dan/atau Hak Koreksi sesuai ketentuan peraturan perundang-undangan.</p>
              <p className="mt-2">Permohonan dapat dikirim melalui email resmi redaksi dengan melampirkan:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Identitas pemohon</li>
                <li>Tautan berita</li>
                <li>Penjelasan keberatan</li>
                <li>Bukti pendukung</li>
              </ul>
              <p className="mt-2 font-medium">Redaksi akan menindaklanjuti sesuai ketentuan Dewan Pers.</p>
            </div>

            <div>
              <h2 className="text-xl font-bold font-heading text-slate-900 dark:text-white mt-8 mb-4">4. Koreksi Berita</h2>
              <p>Apabila ditemukan kesalahan fakta, redaksi akan melakukan koreksi, revisi, atau pencabutan berita disertai keterangan perubahan apabila diperlukan.</p>
            </div>

            <div>
              <h2 className="text-xl font-bold font-heading text-slate-900 dark:text-white mt-8 mb-4">5. Konten Buatan Pengguna</h2>
              <p>Komentar pembaca merupakan tanggung jawab masing-masing pengguna.</p>
              <p className="mt-2">Pengguna dilarang mengunggah konten yang:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Mengandung ujaran kebencian</li>
                <li>Mengandung SARA</li>
                <li>Mengandung fitnah</li>
                <li>Pornografi</li>
                <li>Kekerasan</li>
                <li>Spam</li>
                <li>Hoaks</li>
                <li>Melanggar hukum</li>
              </ul>
              <p className="mt-2 font-medium">Redaksi berhak menghapus komentar tanpa pemberitahuan terlebih dahulu.</p>
            </div>

            <div>
              <h2 className="text-xl font-bold font-heading text-slate-900 dark:text-white mt-8 mb-4">6. Sumber Berita</h2>
              <p>ZONASVARA SPACE menghargai Hak Kekayaan Intelektual. Setiap penggunaan kutipan, foto, video, atau data dari pihak lain akan mencantumkan atribusi sesuai ketentuan yang berlaku.</p>
            </div>

            <div>
              <h2 className="text-xl font-bold font-heading text-slate-900 dark:text-white mt-8 mb-4">7. Independensi</h2>
              <p>Seluruh produk jurnalistik disusun secara independen tanpa intervensi dari pihak mana pun yang bertentangan dengan prinsip jurnalistik.</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
