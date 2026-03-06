'use client';

import { useEffect, useCallback } from 'react';
import Image from 'next/image';

export default function Lightbox({ images, currentIndex, onClose, onNavigate }) {
  const image = images[currentIndex];
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < images.length - 1;

  const prev = useCallback(() => {
    if (hasPrev) onNavigate(currentIndex - 1);
  }, [hasPrev, currentIndex, onNavigate]);

  const next = useCallback(() => {
    if (hasNext) onNavigate(currentIndex + 1);
  }, [hasNext, currentIndex, onNavigate]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose, prev, next]);

  if (!image) return null;

  return (
    <div
      className="lightbox-overlay fixed inset-0 z-[100] flex items-center justify-center bg-black/95"
      onClick={onClose}
    >
      {/* Image container */}
      <div
        className="relative flex items-center justify-center w-full h-full p-4 md:p-12"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative max-h-full max-w-full">
          <Image
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            className="max-h-[85vh] max-w-[85vw] w-auto h-auto object-contain"
            sizes="(max-width: 768px) 95vw, 85vw"
            priority
          />
        </div>

        {/* Caption */}
        {image.title && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center">
            <p className="font-heading text-lg italic text-white/60">{image.title}</p>
            <p className="text-xs uppercase tracking-widest text-white/30 mt-1 capitalize">
              {image.category}
            </p>
          </div>
        )}
      </div>

      {/* Close button */}
      <button
        onClick={onClose}
        aria-label="Close"
        className="absolute top-5 right-5 p-2 text-white/60 hover:text-white transition-colors"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round">
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </button>

      {/* Counter */}
      <div className="absolute top-5 left-1/2 -translate-x-1/2 text-xs tracking-widest text-white/30">
        {currentIndex + 1} / {images.length}
      </div>

      {/* Prev button */}
      {hasPrev && (
        <button
          onClick={(e) => { e.stopPropagation(); prev(); }}
          aria-label="Previous image"
          className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 p-3 text-white/50 hover:text-white transition-colors"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
      )}

      {/* Next button */}
      {hasNext && (
        <button
          onClick={(e) => { e.stopPropagation(); next(); }}
          aria-label="Next image"
          className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 p-3 text-white/50 hover:text-white transition-colors"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      )}
    </div>
  );
}
