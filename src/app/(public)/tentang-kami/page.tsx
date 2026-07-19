import { Metadata } from "next";
import { CheckCircle2, Target, Eye, Lightbulb } from "lucide-react";

export const metadata: Metadata = {
  title: "Tentang Kami | ZONASVARA SPACE",
  description: "Portal berita digital yang berkomitmen menghadirkan informasi yang cepat, akurat, independen, dan terpercaya.",
};

export default function TentangKamiPage() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-20">
      {/* Hero Section */}
      <section className="relative py-24 bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-slate-900/90 mix-blend-multiply z-10" />
          <div 
            className="absolute inset-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center"
          />
        </div>
        
        <div className="relative z-20 max-w-5xl mx-auto px-6 md:px-8 text-center space-y-6">
          <div className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-medium tracking-wider uppercase mb-4">
            Mengenal Lebih Dekat
          </div>
          <h1 className="text-4xl md:text-6xl font-bold font-heading text-white drop-shadow-lg">
            Tentang Kami
          </h1>
          <p className="text-xl md:text-2xl text-slate-200 font-light italic max-w-2xl mx-auto">
            "Suara Fakta, Ruang Informasi."
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-4xl mx-auto px-6 md:px-8 -mt-12 relative z-30">
        <div className="bg-white dark:bg-slate-900 p-8 md:p-12 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800 space-y-8 text-lg leading-relaxed text-slate-700 dark:text-slate-300">
          <p>
            <strong className="text-slate-900 dark:text-white font-heading font-bold text-xl">ZONASVARA SPACE</strong> adalah portal berita digital yang berkomitmen menghadirkan informasi yang cepat, akurat, independen, dan terpercaya. Kami percaya bahwa setiap informasi memiliki nilai ketika disampaikan berdasarkan fakta, etika jurnalistik, dan kepentingan publik.
          </p>
          <p>
            Melalui teknologi digital, ZONASVARA SPACE menyajikan berbagai berita nasional maupun daerah, mulai dari pemerintahan, ekonomi, bisnis, pendidikan, teknologi, lingkungan, hukum, politik, gaya hidup, hingga isu sosial yang berkembang di tengah masyarakat.
          </p>
          <p>
            Kami tidak hanya menyampaikan berita, tetapi juga menghadirkan analisis, liputan mendalam, dan perspektif yang membantu pembaca memahami suatu peristiwa secara utuh.
          </p>
        </div>
      </section>

      {/* Visi & Misi */}
      <section className="max-w-5xl mx-auto px-6 md:px-8 mt-20">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="space-y-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                <Eye size={28} />
              </div>
              <h2 className="text-3xl font-bold font-heading">Visi Kami</h2>
            </div>
            <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed border-l-4 border-primary pl-6 py-2 italic bg-slate-100/50 dark:bg-slate-800/30 rounded-r-xl">
              Menjadi portal berita digital terpercaya yang menjadi referensi masyarakat dalam memperoleh informasi yang akurat, independen, dan berintegritas.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary">
                <Target size={28} />
              </div>
              <h2 className="text-3xl font-bold font-heading">Misi Kami</h2>
            </div>
            <ul className="space-y-4">
              {[
                "Menyajikan berita berdasarkan fakta dan prinsip jurnalistik.",
                "Mengedepankan independensi, objektivitas, dan keberimbangan dalam setiap pemberitaan.",
                "Memanfaatkan teknologi digital untuk menyampaikan informasi secara cepat dan mudah diakses.",
                "Menjadi ruang bagi beragam suara dan perspektif yang membangun.",
                "Berkontribusi dalam meningkatkan literasi informasi di masyarakat."
              ].map((mission, idx) => (
                <li key={idx} className="flex gap-4 items-start bg-white dark:bg-slate-900 p-4 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-md transition-shadow">
                  <CheckCircle2 className="text-secondary shrink-0 mt-0.5" size={20} />
                  <span className="text-slate-700 dark:text-slate-300 font-medium">{mission}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Nilai-Nilai */}
      <section className="max-w-5xl mx-auto px-6 md:px-8 mt-24">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 text-accent mb-6">
            <Lightbulb size={32} />
          </div>
          <h2 className="text-3xl font-bold font-heading">Nilai-Nilai Kami</h2>
          <p className="text-slate-500 mt-4 max-w-2xl mx-auto">Prinsip dasar yang menjadi landasan setiap langkah operasional dan jurnalistik kami.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: "Integritas", desc: "Menjunjung tinggi kejujuran dan etika jurnalistik." },
            { title: "Akurasi", desc: "Memastikan setiap informasi telah melalui proses verifikasi." },
            { title: "Independensi", desc: "Bebas dari kepentingan yang dapat memengaruhi objektivitas berita." },
            { title: "Profesionalisme", desc: "Bekerja sesuai standar jurnalistik dan kode etik." },
            { title: "Inovasi", desc: "Terus berkembang mengikuti kemajuan teknologi digital." }
          ].map((val, idx) => (
            <div key={idx} className="group p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 hover:border-primary/50 hover:shadow-lg transition-all duration-300">
              <h3 className="text-xl font-bold font-heading text-slate-900 dark:text-white mb-3 group-hover:text-primary transition-colors">
                {val.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                {val.desc}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
