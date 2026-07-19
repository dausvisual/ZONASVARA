"use client";

import { useFormStatus } from "react-dom";
import { Save, Loader2 } from "lucide-react";

export function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button 
      type="submit" 
      disabled={pending}
      className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-2.5 rounded-md font-medium flex items-center gap-2 transition-colors disabled:opacity-70 disabled:cursor-wait"
    >
      {pending ? (
        <Loader2 size={18} className="animate-spin" />
      ) : (
        <Save size={18} />
      )}
      {pending ? "Mengunggah Data..." : "Terbitkan Artikel"}
    </button>
  );
}
