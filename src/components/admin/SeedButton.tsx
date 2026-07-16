"use client";

import { useState } from "react";
import { DownloadCloud, Loader2 } from "lucide-react";
import { seedDatabase } from "@/app/actions/seed";

export default function SeedButton() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSeed = async () => {
    if (!confirm("Apakah Anda yakin ingin memigrasikan semua data dummy (ratusan artikel) ke dalam database? Proses ini memakan waktu beberapa detik.")) {
      return;
    }
    
    setLoading(true);
    try {
      const result = await seedDatabase();
      if (result.success) {
        setSuccess(true);
        alert(`Berhasil mengimpor ${result.count} artikel ke dalam database!`);
      } else {
        alert("Gagal: " + result.error);
      }
    } catch (err) {
      alert("Terjadi kesalahan sistem.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <button disabled className="bg-green-600 text-white px-4 py-2 rounded-md font-medium text-sm flex items-center gap-2 opacity-80">
        <DownloadCloud size={16} /> Data Berhasil Diimpor
      </button>
    );
  }

  return (
    <button 
      onClick={handleSeed}
      disabled={loading}
      className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md font-medium text-sm flex items-center gap-2 transition-colors disabled:opacity-70"
    >
      {loading ? <Loader2 size={16} className="animate-spin" /> : <DownloadCloud size={16} />}
      {loading ? "Memproses..." : "Import Data Dummy"}
    </button>
  );
}
