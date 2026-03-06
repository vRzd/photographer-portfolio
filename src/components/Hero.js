'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative h-[100svh] min-h-[640px] overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="https://picsum.photos/seed/hero-alina/1920/1080"
          alt="Photography by Alina Vladyka"
          fill
          priority
          sizes="100vw"
          className="object-cover hero-fade"
        />
      </div>

      {/* Scandi-style overlay — lighter, more airy than the previous dark vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/55" />

      {/* Centered content — thin, wide, editorial */}
      <div className="relative z-10 flex h-full flex-col items-center justify-end pb-24 text-center px-6">
        <p className="hero-slide-1 text-[10px] uppercase tracking-[0.45em] text-white/50 mb-7">
          Toronto GTA &nbsp;&middot;&nbsp; Kitchener-Waterloo
        </p>

        <h1 className="hero-slide-2 font-heading font-light text-6xl sm:text-7xl md:text-8xl lg:text-[7.5rem] italic text-white leading-none tracking-tight mb-7">
          Alina Vladyka
        </h1>

        {/* Thin rule */}
        <div className="hero-slide-2 w-px h-10 bg-white/25 mb-7" />

        <p className="hero-slide-3 font-heading font-light text-lg sm:text-xl italic text-white/60 mb-12 max-w-sm tracking-wide">
          Photographs that feel like memories
        </p>

        <div className="hero-slide-3 flex flex-col sm:flex-row items-center gap-4">
          <Link
            href="/portfolio"
            className="px-9 py-3 bg-white/95 text-black text-[10px] uppercase tracking-[0.28em] hover:bg-white transition-colors duration-400 font-medium"
          >
            View Portfolio
          </Link>
          <Link
            href="/contact"
            className="px-9 py-3 border border-white/40 text-white text-[10px] uppercase tracking-[0.28em] hover:border-white/70 hover:bg-white/5 transition-colors duration-400"
          >
            Book a Session
          </Link>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 scroll-indicator">
        <div className="flex flex-col items-center gap-1.5">
          <div className="w-px h-10 bg-white/20" />
        </div>
      </div>
    </section>
  );
}
