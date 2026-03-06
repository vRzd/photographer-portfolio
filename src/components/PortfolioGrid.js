'use client';

import { useState, useCallback } from 'react';
import Image from 'next/image';
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

function SortablePhoto({ image, index, onOpen, isDraggingAny }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: image.id });

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
      {...attributes}
      {...listeners}
      className="portfolio-item group relative overflow-hidden cursor-grab active:cursor-grabbing touch-none"
    >
      <div
        className="overflow-hidden"
        onClick={() => { if (!isDraggingAny) onOpen(index); }}
      >
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

export default function PortfolioGrid({ images }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [exiting, setExiting] = useState(false);
  const [activeId, setActiveId] = useState(null);

  // Per-category custom order stored as arrays of image ids
  const [orders, setOrders] = useState({});

  const baseFiltered =
    activeCategory === 'all'
      ? images
      : images.filter((img) => img.category === activeCategory);

  // Apply stored order for this category if it exists
  const orderedIds = orders[activeCategory];
  const filtered = orderedIds
    ? orderedIds.map(id => baseFiltered.find(img => img.id === id)).filter(Boolean)
    : baseFiltered;

  const activeImage = activeId != null ? filtered.find(img => img.id === activeId) : null;

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(TouchSensor,   { activationConstraint: { delay: 200, tolerance: 5 } }),
  );

  const handleDragStart = ({ active }) => setActiveId(active.id);

  const handleDragEnd = ({ active, over }) => {
    setActiveId(null);
    if (!over || active.id === over.id) return;
    const oldIndex = filtered.findIndex(img => img.id === active.id);
    const newIndex = filtered.findIndex(img => img.id === over.id);
    const reordered = arrayMove(filtered, oldIndex, newIndex);
    setOrders(prev => ({ ...prev, [activeCategory]: reordered.map(img => img.id) }));
  };

  const openLightbox  = useCallback((i) => setLightboxIndex(i), []);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  const handleCategory = (slug) => {
    if (slug === activeCategory) return;
    setExiting(true);
    setTimeout(() => {
      setActiveCategory(slug);
      setExiting(false);
    }, 200);
  };

  return (
    <div>
      {/* Category filter */}
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
      </div>

      {/* Drag hint */}
      <p className="text-center text-[11px] text-muted-foreground/50 uppercase tracking-widest mb-8 -mt-4">
        Drag to reorder
      </p>

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
