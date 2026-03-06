'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

const ADMIN_KEY = 'alina2024'; // change via ADMIN_KEY env var on server
const CATEGORIES = ['portraits', 'weddings', 'couples', 'family', 'events', 'lifestyle'];

// All images currently in /public/instagram/
const STATIC_IMAGES = [
  'ig7.jpg','ig8.jpg','ig9.jpg','ig10.jpg','ig11.jpg','ig12.jpg',
  'ig13.jpg','ig15.jpg','ig19.jpg','ig20.jpg','ig21.jpg','ig22.jpg',
  'ig-pinned.jpg',
];

export default function AdminPage() {
  const [authed, setAuthed]     = useState(false);
  const [password, setPassword] = useState('');
  const [images, setImages]     = useState([]);
  const [uploading, setUploading] = useState(false);
  const [drag, setDrag]         = useState(false);
  const [form, setForm]         = useState({ category: 'portraits', title: '', featured: false });
  const [status, setStatus]     = useState('');
  const fileRef = useRef();

  // Load images (static list + uploaded metadata)
  const loadImages = async () => {
    const staticImgs = STATIC_IMAGES.map(f => ({
      filename: f,
      src: `/instagram/${f}`,
      title: f.replace('.jpg',''),
      category: '—',
      featured: false,
      static: true,
    }));

    let uploaded = [];
    try {
      const res = await fetch('/api/images');
      // We'll just show static + uploaded separately
    } catch {}

    // Fetch uploaded metadata
    try {
      const res = await fetch('/api/admin-images', {
        headers: { 'x-admin-key': ADMIN_KEY },
      });
      if (res.ok) uploaded = await res.json();
    } catch {}

    setImages([...uploaded.map(u => ({ ...u, static: false })), ...staticImgs]);
  };

  useEffect(() => {
    if (authed) loadImages();
  }, [authed]);

  const login = (e) => {
    e.preventDefault();
    if (password === ADMIN_KEY) { setAuthed(true); }
    else { setStatus('Wrong password'); }
  };

  const upload = async (files) => {
    if (!files.length) return;
    setUploading(true);
    setStatus('');
    let ok = 0;
    for (const file of Array.from(files)) {
      const fd = new FormData();
      fd.append('file', file);
      fd.append('category', form.category);
      fd.append('title', form.title || file.name.replace(/\.[^.]+$/, ''));
      fd.append('featured', form.featured);
      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: { 'x-admin-key': ADMIN_KEY },
        body: fd,
      });
      if (res.ok) ok++;
    }
    setStatus(`Uploaded ${ok} photo${ok !== 1 ? 's' : ''}`);
    setUploading(false);
    loadImages();
  };

  const remove = async (img) => {
    if (!confirm(`Delete ${img.filename}?`)) return;
    const res = await fetch('/api/delete', {
      method: 'DELETE',
      headers: { 'x-admin-key': ADMIN_KEY, 'Content-Type': 'application/json' },
      body: JSON.stringify({ filename: img.filename }),
    });
    if (res.ok) {
      setStatus(`Deleted ${img.filename}`);
      loadImages();
    }
  };

  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-6">
        <form onSubmit={login} className="w-full max-w-sm space-y-5">
          <h1 className="font-heading text-2xl text-foreground">Admin</h1>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full border border-border bg-transparent px-4 py-3 text-sm text-foreground outline-none focus:border-foreground"
          />
          {status && <p className="text-sm text-red-500">{status}</p>}
          <button
            type="submit"
            className="w-full bg-foreground text-background py-3 text-xs uppercase tracking-widest hover:bg-gold transition-colors"
          >
            Enter
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-24 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="font-heading text-3xl text-foreground mb-10">Photo Manager</h1>

        {/* Upload zone */}
        <div
          onDragOver={e => { e.preventDefault(); setDrag(true); }}
          onDragLeave={() => setDrag(false)}
          onDrop={e => { e.preventDefault(); setDrag(false); upload(e.dataTransfer.files); }}
          onClick={() => fileRef.current?.click()}
          className={`border-2 border-dashed rounded cursor-pointer flex flex-col items-center justify-center py-16 mb-4 transition-colors ${
            drag ? 'border-gold bg-gold/5' : 'border-border hover:border-muted-foreground'
          }`}
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="text-muted-foreground mb-3">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" y1="3" x2="12" y2="15" />
          </svg>
          <p className="text-sm text-muted-foreground">
            {uploading ? 'Uploading…' : 'Drop photos here or click to select'}
          </p>
          <p className="text-xs text-muted-foreground/60 mt-1">JPG, PNG, WEBP</p>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={e => upload(e.target.files)}
          />
        </div>

        {/* Upload options */}
        <div className="flex flex-wrap gap-4 mb-8">
          <select
            value={form.category}
            onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
            className="border border-border bg-background text-sm text-foreground px-3 py-2 outline-none"
          >
            {CATEGORIES.map(c => <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>)}
          </select>
          <input
            type="text"
            placeholder="Title (optional)"
            value={form.title}
            onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
            className="border border-border bg-background text-sm text-foreground px-3 py-2 outline-none flex-1 min-w-40"
          />
          <label className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer">
            <input
              type="checkbox"
              checked={form.featured}
              onChange={e => setForm(f => ({ ...f, featured: e.target.checked }))}
              className="accent-gold"
            />
            Featured (shows on home page)
          </label>
        </div>

        {status && (
          <p className="mb-6 text-sm text-gold">{status}</p>
        )}

        {/* Image grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {images.map(img => (
            <div key={img.filename} className="relative group aspect-square overflow-hidden bg-surface">
              <Image
                src={img.src}
                alt={img.title || img.filename}
                fill
                sizes="25vw"
                className="object-cover"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors flex flex-col items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                <p className="text-white text-xs text-center px-2 leading-tight">{img.title || img.filename}</p>
                {img.category && img.category !== '—' && (
                  <p className="text-white/60 text-[10px] uppercase tracking-wider">{img.category}</p>
                )}
                <button
                  onClick={() => remove(img)}
                  className="mt-2 px-4 py-1.5 bg-red-600/90 text-white text-[10px] uppercase tracking-wider hover:bg-red-700 transition-colors"
                >
                  Delete
                </button>
              </div>
              {img.featured && (
                <div className="absolute top-2 left-2 bg-gold/90 text-white text-[8px] uppercase tracking-wider px-1.5 py-0.5">
                  Featured
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
