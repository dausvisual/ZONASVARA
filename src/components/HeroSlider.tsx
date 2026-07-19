"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Article, Category } from "@prisma/client";

type NewsWithCategory = Article & { category: Category | null };

export default function HeroSlider({ news }: { news: NewsWithCategory[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (news.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % news.length);
    }, 5000); // 5 seconds
    return () => clearInterval(interval);
  }, [news.length]);

  if (!news || news.length === 0) return null;

  return (
    <div className="lg:col-span-8 relative group overflow-hidden rounded-[1.5rem] shadow-xl h-[450px] md:h-[500px]">
      {news.map((item, index) => (
        <div 
          key={item.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
          }`}
        >
          <Image 
            src={item.thumbnail || "https://images.unsplash.com/photo-1542281286-9e0a16bb7366?q=80&w=1000&auto=format&fit=crop"} 
            alt={item.title} 
            fill 
            unoptimized
            className={`object-cover transition-transform duration-[10000ms] ease-linear ${
              index === currentIndex ? "scale-105" : "scale-100"
            }`} 
            priority={index === 0}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050B14] via-[#050B14]/60 to-transparent"></div>
          
          <Link href={`/berita/${item.slug}`} className="absolute bottom-0 left-0 p-5 md:p-10 pb-12 md:pb-16 w-full flex flex-col justify-end h-full">
            {/* Category Badge */}
            <div className="mb-4 self-start">
              <span className="bg-[#0f4a8a] text-white text-[10px] md:text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-md">
                {item.category?.name || "NASIONAL"}
              </span>
            </div>
            
            <h1 className="text-white text-2xl md:text-4xl font-bold font-heading leading-tight mb-4 group-hover:text-slate-300 transition-colors">
              {item.title}
            </h1>
            
            <div className="flex items-center gap-2 text-white font-semibold text-sm hover:gap-3 transition-all">
              Baca Selengkapnya <ArrowRight size={16} />
            </div>
          </Link>
        </div>
      ))}

      {/* Slider Dots */}
      <div className="absolute bottom-5 md:bottom-6 left-5 md:left-10 z-20 flex items-center gap-1.5">
        {news.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              index === currentIndex ? "w-6 bg-white" : "w-1.5 bg-white/40 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
