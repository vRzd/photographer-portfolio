'use client';

import { useState, useCallback } from 'react';
import Image from 'next/image';
import Lightbox from './Lightbox';
import { categories } from '@/lib/imageData';

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function PortfolioGrid({ images }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [shuffleKey, setShuffleKey] = useState(0);
  const [shuffledOrder, setShuffledOrder] = useState(null);
  const [spinning, setSpinning] = useState(false);

  const baseFiltered =
    activeCategory === 'all'
      ? images
      : images.filter((img) => img.category === activeCategory);

  const filtered = shuffledOrder ?? baseFiltered;

  const handleShuffle = () => {
    setSpinning(true);
    setShuffledOrder(shuffle(baseFiltered));
    setShuffleKey(k => k + 1);
    setTimeout(() => setSpinning(false), 500);
  };

  const handleCategory = (slug) => {
    setActiveCategory(slug);
    setShuffledOrder(null);
  };

  const openLightbox = useCallback((index) => setLightboxIndex(index), []);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  return (
    <div>
      {/* Category filter + shuffle */}
      <div className="flex flex-wrap gap-x-6 gap-y-3 justify-center items-center mb-12 lg:mb-16">
        {categories.map((cat) => (
          <button
            key={cat.slug}
            onClick={() => handleCategory(cat.slug)}
            className={`text-xs uppercase tracking-[0.18em] pb-1 transition-all duration-300 border-b ${
              activeCategory === cat.slug
                ? 'text-gold border-gold'
                : 'text-muted-foreground border-transparent hover:text-foreground hover:border-border'
            }`}
          >
            {cat.label}
          </button>
        ))}

        <div className="w-px h-4 bg-border mx-1 hidden sm:block" />

        <button
          onClick={handleShuffle}
          title="Shuffle photos"
          className="flex items-center gap-1.5 text-xs uppercase tracking-[0.18em] pb-1 border-b border-transparent text-muted-foreground hover:text-foreground hover:border-border transition-all duration-300"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={spinning ? 'shuffle-spin' : ''}>
            <polyline points="16 3 21 3 21 8" />
            <line x1="4" y1="20" x2="21" y2="3" />
            <polyline points="21 16 21 21 16 21" />
            <line x1="15" y1="15" x2="21" y2="21" />
          </svg>
          Shuffle
        </button>
      </div>

      {/* Masonry grid */}
      <div key={shuffleKey} className="columns-1 sm:columns-2 lg:columns-3 gap-3 lg:gap-4">
        {filtered.map((image, index) => (
          <div
            key={`${activeCategory}-${image.id}-${shuffleKey}`}
            className="portfolio-item break-inside-avoid mb-3 lg:mb-4 group cursor-pointer overflow-hidden relative"
            style={{ animationDelay: `${Math.min(index * 40, 400)}ms` }}
            onClick={() => openLightbox(index)}
          >
            <div className="overflow-hidden">
              <Image
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="w-full h-auto object-cover img-zoom"
                loading="lazy"
              />
            </div>

            {/* Hover overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-500 flex items-end p-5">
              {image.title && (
                <p className="font-heading text-lg italic text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0 transform transition-transform duration-300">
                  {image.title}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-24">
          <p className="text-muted-foreground text-sm">No images found.</p>
        </div>
      )}

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox
          images={filtered}
          currentIndex={lightboxIndex}
          onClose={closeLightbox}
          onNavigate={setLightboxIndex}
        />
      )}
    </div>
  );
}
