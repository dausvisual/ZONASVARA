import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kebijakan Privasi | ZONASVARA SPACE",
  description: "Kebijakan Privasi terkait pengumpulan, penggunaan, dan perlindungan data pengguna di ZONASVARA SPACE.",
};

export default function KebijakanPrivasiPage() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 py-16">
      <div className="max-w-4xl mx-auto px-6 md:px-8">
        <div className="bg-white dark:bg-slate-900 p-8 md:p-12 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
          <h1 className="text-3xl md:text-4xl font-bold font-heading mb-8 text-slate-900 dark:text-white border-b pb-6">
            Kebijakan Privasi
          </h1>
          
          <div className="prose prose-slate dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 space-y-6">
            <div>
              <h2 className="text-xl font-bold font-heading text-slate-900 dark:text-white mt-8 mb-4">Komitmen Kami</h2>
              <p>
                ZONASVARA SPACE menghormati privasi setiap pengguna dan berkomitmen melindungi data pribadi sesuai ketentuan peraturan perundang-undangan yang berlaku.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold font-heading text-slate-900 dark:text-white mt-8 mb-4">Informasi yang Kami Kumpulkan</h2>
              <p className="mb-2">Kami dapat mengumpulkan informasi seperti:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Nama</li>
                <li>Alamat email</li>
                <li>Nomor telepon (jika diberikan)</li>
                <li>Alamat IP</li>
                <li>Jenis perangkat</li>
                <li>Browser</li>
                <li>Cookies</li>
                <li>Aktivitas penggunaan website</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold font-heading text-slate-900 dark:text-white mt-8 mb-4">Tujuan Penggunaan Data</h2>
              <p className="mb-2">Data digunakan untuk:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Mengelola akun pengguna</li>
                <li>Mengirim newsletter</li>
                <li>Meningkatkan layanan</li>
                <li>Analisis statistik</li>
                <li>Personalisasi konten</li>
                <li>Keamanan website</li>
                <li>Memenuhi kewajiban hukum</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold font-heading text-slate-900 dark:text-white mt-8 mb-4">Cookies</h2>
              <p className="mb-2">Website menggunakan cookies untuk:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Mengingat preferensi pengguna</li>
                <li>Analisis pengunjung</li>
                <li>Keamanan</li>
                <li>Personalisasi iklan</li>
              </ul>
              <p className="mt-2 text-sm italic">Pengguna dapat menonaktifkan cookies melalui pengaturan browser.</p>
            </div>

            <div>
              <h2 className="text-xl font-bold font-heading text-slate-900 dark:text-white mt-8 mb-4">Perlindungan Data</h2>
              <p>Kami menerapkan langkah-langkah teknis dan administratif yang wajar untuk melindungi data pengguna dari akses, penggunaan, atau pengungkapan yang tidak sah.</p>
            </div>

            <div>
              <h2 className="text-xl font-bold font-heading text-slate-900 dark:text-white mt-8 mb-4">Pembagian Data</h2>
              <p>Kami tidak menjual data pribadi pengguna kepada pihak lain.</p>
              <p className="mt-2 font-medium">Data hanya dapat dibagikan apabila:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Diwajibkan oleh hukum.</li>
                <li>Dibutuhkan untuk penyedia layanan yang bekerja sama dengan kami.</li>
                <li>Mendapat persetujuan pengguna.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold font-heading text-slate-900 dark:text-white mt-8 mb-4">Hak Pengguna</h2>
              <p className="mb-2">Pengguna berhak untuk:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Mengakses data pribadi.</li>
                <li>Memperbaiki data.</li>
                <li>Memperbarui data.</li>
                <li>Menghapus data sesuai ketentuan hukum.</li>
                <li>Menarik persetujuan pemrosesan data apabila berlaku.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold font-heading text-slate-900 dark:text-white mt-8 mb-4">Perubahan Kebijakan</h2>
              <p>Kebijakan Privasi dapat diperbarui sewaktu-waktu. Perubahan akan diumumkan melalui halaman ini.</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
