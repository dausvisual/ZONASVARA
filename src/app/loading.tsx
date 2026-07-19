import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-background/95 backdrop-blur-sm">
      <div className="relative flex items-center justify-center">
        <Loader2 className="h-14 w-14 animate-spin text-primary" />
        <div className="absolute h-14 w-14 rounded-full border-t-2 border-primary animate-ping opacity-30"></div>
      </div>
      <p className="mt-4 text-sm font-semibold text-primary animate-pulse tracking-widest uppercase">ZONASVARA</p>
    </div>
  );
}
