import Image from 'next/image';
import Link from 'next/link';
import Hero from '@/components/Hero';
import InstagramPreview from '@/components/InstagramPreview';
import ScrollReveal from '@/components/ScrollReveal';
import { getFeaturedImages } from '@/lib/imageService';

export const metadata = {
  title: 'Alina Vladyka Photography — Toronto & Kitchener-Waterloo',
  description:
    'Professional photographer based in Toronto GTA and Kitchener-Waterloo, Ontario. Specializing in weddings, portraits, couples, family, events, and lifestyle photography.',
};

export default async function HomePage() {
  const featured = await getFeaturedImages(6);

  return (
    <>
      <Hero />

      {/* ── Introduction ───────────────────────────────────── */}
      <section className="px-6 py-36 lg:py-52">
        <div className="max-w-3xl mx-auto text-center">
          <ScrollReveal>
            <p className="text-[10px] uppercase tracking-[0.4em] text-gold mb-8">
              Welcome
            </p>
          </ScrollReveal>

          <ScrollReveal delay={1}>
            <h2 className="font-heading font-light text-4xl sm:text-5xl lg:text-6xl italic text-foreground leading-[1.2] mb-10">
              Every photograph tells<br />a story worth keeping
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={2}>
            <p className="text-[15px] text-muted-foreground leading-[1.9] max-w-xl mx-auto mb-12">
              Based in Toronto GTA and Kitchener-Waterloo, I create timeless,
              emotion-driven images for weddings, portraits, couples, families,
              events, and lifestyle sessions. My approach is calm, unhurried,
              and rooted in authentic storytelling.
            </p>
            <Link
              href="/about"
              className="inline-block text-[10px] uppercase tracking-[0.3em] text-foreground border-b border-gold pb-px hover:text-gold transition-colors duration-300"
            >
              About me
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Services strip — Scandi grid ───────────────────── */}
      <section className="border-y border-border px-6 py-16">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 divide-x divide-border">
              {['Weddings', 'Portraits', 'Couples', 'Family', 'Events', 'Lifestyle'].map((s) => (
                <Link
                  key={s}
                  href="/portfolio"
                  className="group flex flex-col items-center gap-3 py-8 px-4 hover:bg-surface transition-colors duration-300"
                >
                  <span className="w-5 h-px bg-gold/40 group-hover:bg-gold transition-colors duration-300 group-hover:w-8" style={{ transition: 'width 0.4s, background-color 0.3s' }} />
                  <span className="text-[9px] uppercase tracking-[0.28em] text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                    {s}
                  </span>
                </Link>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Portfolio preview ──────────────────────────────── */}
      <section className="px-6 py-36 lg:py-52">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal className="flex flex-col sm:flex-row items-baseline justify-between mb-14 lg:mb-20">
            <div>
              <p className="text-[10px] uppercase tracking-[0.4em] text-gold mb-3">Portfolio</p>
              <h2 className="font-heading font-light text-3xl lg:text-4xl italic text-foreground">
                Selected Work
              </h2>
            </div>
            <Link
              href="/portfolio"
              className="mt-5 sm:mt-0 text-[10px] uppercase tracking-[0.3em] text-muted-foreground hover:text-gold transition-colors duration-300 pb-px border-b border-transparent hover:border-gold"
            >
              View all work
            </Link>
          </ScrollReveal>

          {/* 2-col on mobile, 3 on large — generous gap */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4">
            {featured.map((image, i) => (
              <ScrollReveal
                key={image.id}
                delay={i % 3 === 0 ? 0 : i % 3 === 1 ? 1 : 2}
                className="group cursor-pointer"
              >
                <Link href="/portfolio">
                  <div className="relative overflow-hidden aspect-[3/4] bg-surface">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="(max-width: 1024px) 50vw, 33vw"
                      className="object-cover img-zoom"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-500" />
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal className="text-center mt-14">
            <Link
              href="/portfolio"
              className="inline-block px-12 py-4 border border-border text-[10px] uppercase tracking-[0.3em] text-foreground hover:border-gold hover:text-gold transition-colors duration-400"
            >
              Full Portfolio
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Instagram ──────────────────────────────────────── */}
      <InstagramPreview />

      {/* ── CTA — calm Scandi closing ──────────────────────── */}
      <section className="px-6 py-36 lg:py-52 border-t border-border">
        <div className="max-w-xl mx-auto text-center">
          <ScrollReveal>
            <p className="text-[10px] uppercase tracking-[0.4em] text-gold mb-8">
              Let&apos;s create together
            </p>
          </ScrollReveal>
          <ScrollReveal delay={1}>
            <h2 className="font-heading font-light text-4xl lg:text-5xl italic text-foreground mb-8 leading-snug">
              Ready to create something beautiful?
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={2}>
            <p className="text-[15px] text-muted-foreground mb-12 leading-[1.9]">
              Serving Toronto GTA, Kitchener-Waterloo, and beyond.
              I&apos;d love to hear about your vision.
            </p>
            <Link
              href="/contact"
              className="inline-block px-12 py-4 bg-foreground text-background text-[10px] uppercase tracking-[0.3em] hover:bg-gold hover:text-white transition-colors duration-400"
            >
              Book a Session
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
