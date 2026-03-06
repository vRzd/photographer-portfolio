'use client';

import { useState, useCallback, useEffect, useTransition } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Lightbox from './Lightbox';
import { categories } from '@/lib/imageData';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from '@dnd-kit/core';
import {
  SortableContext,
  useSortable,
  rectSortingStrategy,
  arrayMove,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

function SortablePhoto({ image, index, onOpen, isDraggingAny, isAdmin }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: image.id, disabled: !isAdmin });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0 : 1,
    animationDelay: `${Math.min(index * 40, 400)}ms`,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...(isAdmin ? { ...attributes, ...listeners } : {})}
      className={`portfolio-item group relative overflow-hidden touch-none ${
        isAdmin ? 'cursor-grab active:cursor-grabbing' : 'cursor-pointer'
      }`}
    >
      <div onClick={() => { if (!isDraggingAny) onOpen(index); }}>
        <Image
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="w-full h-auto object-cover img-zoom"
          loading="lazy"
          draggable={false}
        />
      </div>
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-500 flex items-end p-5 pointer-events-none">
        {image.title && (
          <p className="font-heading text-lg text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0 transform transition-transform duration-300">
            {image.title}
          </p>
        )}
      </div>
    </div>
  );
}

export default function PortfolioGrid({ images, isAdmin }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [lightboxIndex, setLightboxIndex]   = useState(null);
  const [exiting, setExiting]               = useState(false);
  const [activeId, setActiveId]             = useState(null);
  const [saving, setSaving]                 = useState(false);
  const [orders, setOrders]                 = useState({});  // category → id[]
  const router = useRouter();
  const [, startTransition] = useTransition();

  const baseFiltered =
    activeCategory === 'all'
      ? images
      : images.filter(img => img.category === activeCategory);

  // Apply stored order
  const orderedIds = orders[activeCategory];
  const filtered = orderedIds
    ? orderedIds.map(id => baseFiltered.find(img => img.id === id)).filter(Boolean)
    : baseFiltered;

  const activeImage = activeId != null ? filtered.find(img => img.id === activeId) : null;

  // Load saved order for the active category
  useEffect(() => {
    if (orders[activeCategory] !== undefined) return;
    fetch(`/api/photo-order?category=${activeCategory}`)
      .then(r => r.json())
      .then(data => {
        if (Array.isArray(data)) {
          setOrders(prev => ({ ...prev, [activeCategory]: data }));
        }
      })
      .catch(() => {});
  }, [activeCategory]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(TouchSensor,   { activationConstraint: { delay: 200, tolerance: 5 } }),
  );

  const handleDragStart = ({ active }) => setActiveId(active.id);

  const handleDragEnd = async ({ active, over }) => {
    setActiveId(null);
    if (!over || active.id === over.id) return;

    const oldIndex = filtered.findIndex(img => img.id === active.id);
    const newIndex = filtered.findIndex(img => img.id === over.id);
    const reordered = arrayMove(filtered, oldIndex, newIndex);
    const newIds = reordered.map(img => img.id);

    setOrders(prev => ({ ...prev, [activeCategory]: newIds }));

    setSaving(true);
    try {
      await fetch('/api/photo-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category: activeCategory, order: newIds }),
      });
      startTransition(() => router.refresh());
    } finally {
      setSaving(false);
    }
  };

  const openLightbox  = useCallback(i => setLightboxIndex(i), []);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  const handleCategory = (slug) => {
    if (slug === activeCategory) return;
    setExiting(true);
    setTimeout(() => {
      setActiveCategory(slug);
      setExiting(false);
    }, 200);
  };

  const logout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    startTransition(() => router.refresh());
  };

  return (
    <div>
      {/* Category filter */}
      <div className="flex flex-wrap gap-x-6 gap-y-3 justify-center items-center mb-12 lg:mb-16">
        {categories.map(cat => (
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
      </div>

      {/* Admin bar */}
      {isAdmin ? (
        <div className="flex items-center justify-between mb-8 px-1">
          <p className="text-[11px] text-gold uppercase tracking-widest flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-gold inline-block" />
            Admin — drag to reorder
            {saving && <span className="text-muted-foreground ml-2">Saving…</span>}
          </p>
          <button
            onClick={logout}
            className="text-[10px] uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
          >
            Sign out
          </button>
        </div>
      ) : (
        <div className="flex justify-end mb-8 px-1">
          <a
            href="/admin/login"
            className="text-[10px] uppercase tracking-widest text-muted-foreground/40 hover:text-muted-foreground transition-colors"
          >
            Admin
          </a>
        </div>
      )}

      {/* Sortable grid */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={filtered.map(img => img.id)} strategy={rectSortingStrategy}>
          <div className={`columns-1 sm:columns-2 lg:columns-3 gap-3 lg:gap-4 ${exiting ? 'portfolio-grid-exit' : ''}`}>
            {filtered.map((image, index) => (
              <div key={`${activeCategory}-${image.id}`} className="break-inside-avoid mb-3 lg:mb-4">
                <SortablePhoto
                  image={image}
                  index={index}
                  onOpen={openLightbox}
                  isDraggingAny={activeId != null}
                  isAdmin={isAdmin}
                />
              </div>
            ))}
          </div>
        </SortableContext>

        <DragOverlay adjustScale={false}>
          {activeImage && (
            <div className="opacity-90 shadow-2xl rotate-1 scale-105 cursor-grabbing">
              <Image
                src={activeImage.src}
                alt={activeImage.alt}
                width={activeImage.width}
                height={activeImage.height}
                className="w-full h-auto object-cover"
                draggable={false}
              />
            </div>
          )}
        </DragOverlay>
      </DndContext>

      {filtered.length === 0 && (
        <div className="text-center py-24">
          <p className="text-muted-foreground text-sm">No images found.</p>
        </div>
      )}

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
