import Image from 'next/image';
import { getInstagramPreviews } from '@/lib/imageService';

export default function InstagramPreview() {
  const previews = getInstagramPreviews();

  return (
    <section className="py-36 lg:py-48 px-6 bg-surface border-y border-border">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 lg:mb-20 reveal">
          <p className="text-[10px] uppercase tracking-[0.4em] text-gold mb-4">Follow Along</p>
          <h2 className="font-heading font-light text-4xl lg:text-5xl italic text-foreground mb-3">
            @alina_vladyka
          </h2>
          <p className="text-[14px] text-muted-foreground tracking-wide">
            Behind the lens on Instagram
          </p>
        </div>

        {/* 3×3 grid */}
        <div className="grid grid-cols-3 gap-1.5 sm:gap-2 lg:gap-2.5 reveal">
          {previews.map((photo) => (
            <a
              key={photo.id}
              href="https://instagram.com/alina_vladyka"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square overflow-hidden block bg-border"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(max-width: 640px) 33vw, (max-width: 1024px) 25vw, 20vw"
                className="object-cover img-zoom"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500 flex items-center justify-center">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </div>
            </a>
          ))}
        </div>

        {/* Follow link */}
        <div className="text-center mt-12 reveal">
          <a
            href="https://instagram.com/alina_vladyka"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-10 py-3.5 border border-border text-[10px] uppercase tracking-[0.3em] text-foreground hover:border-gold hover:text-gold transition-colors duration-400"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
            Follow on Instagram
          </a>
        </div>
      </div>
    </section>
  );
}
