'use client';

import { useState, useCallback } from 'react';
import Image from 'next/image';
import Lightbox from './Lightbox';
import { categories } from '@/lib/imageData';

export default function PortfolioGrid({ images }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const filtered =
    activeCategory === 'all'
      ? images
      : images.filter((img) => img.category === activeCategory);

  const openLightbox = useCallback((index) => setLightboxIndex(index), []);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  return (
    <div>
      {/* Category filter */}
      <div className="flex flex-wrap gap-x-6 gap-y-3 justify-center mb-12 lg:mb-16">
        {categories.map((cat) => (
          <button
            key={cat.slug}
            onClick={() => setActiveCategory(cat.slug)}
            className={`text-xs uppercase tracking-[0.18em] pb-1 transition-all duration-300 border-b ${
              activeCategory === cat.slug
                ? 'text-gold border-gold'
                : 'text-muted-foreground border-transparent hover:text-foreground hover:border-border'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Masonry grid */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-3 lg:gap-4">
        {filtered.map((image, index) => (
          <div
            key={`${activeCategory}-${image.id}`}
            className="break-inside-avoid mb-3 lg:mb-4 group cursor-pointer overflow-hidden relative"
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
