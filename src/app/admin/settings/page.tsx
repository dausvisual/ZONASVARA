"use client";

import { Settings, Globe, Bell, Shield, Database, Palette } from "lucide-react";
import { useState } from "react";

const sections = [
  {
    id: "site",
    icon: Globe,
    label: "Informasi Situs",
    fields: [
      { id: "site_name", label: "Nama Situs", type: "text", placeholder: "ZONASVARA", value: "ZONASVARA" },
      { id: "site_tagline", label: "Tagline", type: "text", placeholder: "Portal Berita Terpercaya", value: "Portal Berita Terpercaya" },
      { id: "site_url", label: "URL Situs", type: "url", placeholder: "https://zonasvara.com", value: "" },
      { id: "site_email", label: "Email Redaksi", type: "email", placeholder: "redaksi@zonasvara.com", value: "" },
    ],
  },
  {
    id: "appearance",
    icon: Palette,
    label: "Tampilan",
    fields: [
      { id: "articles_per_page", label: "Artikel per Halaman", type: "number", placeholder: "10", value: "10" },
      { id: "featured_count", label: "Jumlah Berita Utama", type: "number", placeholder: "5", value: "5" },
    ],
  },
  {
    id: "notifications",
    icon: Bell,
    label: "Notifikasi",
    fields: [
      { id: "notify_new_article", label: "Notifikasi Artikel Baru", type: "checkbox", placeholder: "", value: "true" },
      { id: "notify_new_comment", label: "Notifikasi Komentar Baru", type: "checkbox", placeholder: "", value: "true" },
    ],
  },
];

export default function AdminSettingsPage() {
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold font-heading text-slate-900 dark:text-white">
          Pengaturan Sistem
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">
          Kelola konfigurasi situs dan preferensi sistem
        </p>
      </div>

      {/* Save Banner */}
      {saved && (
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg px-4 py-3 text-green-700 dark:text-green-400 text-sm font-medium">
          ✓ Pengaturan berhasil disimpan
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Sidebar Nav */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-2">
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                <s.icon size={16} />
                {s.label}
              </a>
            ))}
          </div>

          {/* System Info */}
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 mt-4">
            <div className="flex items-center gap-2 text-slate-500 mb-4">
              <Database size={14} />
              <span className="text-xs font-semibold uppercase tracking-wide">Info Sistem</span>
            </div>
            <div className="space-y-2 text-xs text-slate-500">
              <div className="flex justify-between">
                <span>Versi CMS</span>
                <span className="font-mono text-slate-700 dark:text-slate-300">1.0.0</span>
              </div>
              <div className="flex justify-between">
                <span>Framework</span>
                <span className="font-mono text-slate-700 dark:text-slate-300">Next.js 16</span>
              </div>
              <div className="flex justify-between">
                <span>Database</span>
                <span className="font-mono text-slate-700 dark:text-slate-300">PostgreSQL</span>
              </div>
              <div className="flex justify-between">
                <span>ORM</span>
                <span className="font-mono text-slate-700 dark:text-slate-300">Prisma v5</span>
              </div>
            </div>
          </div>
        </div>

        {/* Settings Sections */}
        <div className="lg:col-span-2 space-y-6">
          {sections.map((section) => (
            <div
              key={section.id}
              id={section.id}
              className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden"
            >
              <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center gap-3">
                <section.icon size={18} className="text-primary" />
                <h2 className="font-semibold text-slate-900 dark:text-white">{section.label}</h2>
              </div>
              <div className="p-6 space-y-4">
                {section.fields.map((field) => (
                  <div key={field.id}>
                    {field.type === "checkbox" ? (
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          id={field.id}
                          defaultChecked={field.value === "true"}
                          className="w-4 h-4 rounded accent-primary"
                        />
                        <span className="text-sm text-slate-700 dark:text-slate-300">{field.label}</span>
                      </label>
                    ) : (
                      <div>
                        <label
                          htmlFor={field.id}
                          className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5"
                        >
                          {field.label}
                        </label>
                        <input
                          id={field.id}
                          type={field.type}
                          placeholder={field.placeholder}
                          defaultValue={field.value}
                          className="w-full border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm bg-white dark:bg-slate-950 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition"
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Security Section */}
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center gap-3">
              <Shield size={18} className="text-primary" />
              <h2 className="font-semibold text-slate-900 dark:text-white">Keamanan</h2>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Autentikasi Dua Faktor</p>
                  <p className="text-xs text-slate-400 mt-0.5">Lapisan keamanan tambahan untuk akun admin</p>
                </div>
                <span className="text-xs text-amber-600 bg-amber-50 dark:bg-amber-900/20 px-2 py-1 rounded-full">Segera Hadir</span>
              </div>
              <div className="flex items-center justify-between py-3">
                <div>
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Log Aktivitas</p>
                  <p className="text-xs text-slate-400 mt-0.5">Rekam semua aktivitas admin</p>
                </div>
                <span className="text-xs text-amber-600 bg-amber-50 dark:bg-amber-900/20 px-2 py-1 rounded-full">Segera Hadir</span>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <button
              onClick={handleSave}
              className="bg-primary text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              Simpan Pengaturan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
