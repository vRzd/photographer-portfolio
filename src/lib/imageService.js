/**
 * Image Service — abstraction layer for fetching portfolio images.
 *
 * Current source: static JSON (imageData.js)
 *
 * Future sources (set via environment variables):
 *   IMAGE_SOURCE=nas  →  fetches from Synology NAS API
 *   NAS_API_URL       →  base URL of the NAS photo API
 *   NAS_API_KEY       →  API key for authenticated requests
 *
 * To migrate to NAS:
 *   1. Set IMAGE_SOURCE=nas in your .env
 *   2. Set NAS_API_URL=https://your-nas.domain.com
 *   3. Optionally set NAS_API_KEY for authentication
 *   4. Ensure NAS returns data in the same shape as imageData.js
 */

import { images, instagramPreviews } from './imageData';

const IMAGE_SOURCE = process.env.IMAGE_SOURCE || 'static';
const NAS_API_URL = process.env.NAS_API_URL || '';
const NAS_API_KEY = process.env.NAS_API_KEY || '';

/**
 * Fetch all portfolio images, optionally filtered by category.
 * @param {string} [category] - category slug ('weddings', 'portraits', etc.) or omit for all
 * @returns {Promise<Array>} array of image objects
 */
export async function getImages(category) {
  if (IMAGE_SOURCE === 'nas' && NAS_API_URL) {
    return fetchFromNAS({ category });
  }
  return getStaticImages(category);
}

/**
 * Fetch a single image by ID.
 * @param {number|string} id
 * @returns {Promise<object|null>}
 */
export async function getImageById(id) {
  if (IMAGE_SOURCE === 'nas' && NAS_API_URL) {
    return fetchFromNAS({ id });
  }
  return images.find((img) => img.id === Number(id)) || null;
}

/**
 * Fetch featured images for the home page preview.
 * @param {number} [limit=6]
 * @returns {Promise<Array>}
 */
export async function getFeaturedImages(limit = 6) {
  if (IMAGE_SOURCE === 'nas' && NAS_API_URL) {
    return fetchFromNAS({ featured: true, limit });
  }
  return images.filter((img) => img.featured).slice(0, limit);
}

/**
 * Return Instagram preview images (static mock — not from Instagram API).
 * @returns {Array}
 */
export function getInstagramPreviews() {
  return instagramPreviews;
}

// ── Private helpers ────────────────────────────────────────

function getStaticImages(category) {
  if (!category || category === 'all') return images;
  return images.filter((img) => img.category === category);
}

async function fetchFromNAS({ category, id, featured, limit } = {}) {
  const url = new URL('/api/photos', NAS_API_URL);
  if (category) url.searchParams.set('category', category);
  if (id) url.searchParams.set('id', id);
  if (featured) url.searchParams.set('featured', 'true');
  if (limit) url.searchParams.set('limit', limit);

  const headers = { 'Content-Type': 'application/json' };
  if (NAS_API_KEY) headers['X-Api-Key'] = NAS_API_KEY;

  const res = await fetch(url.toString(), {
    headers,
    next: { revalidate: 300 }, // revalidate every 5 minutes
  });

  if (!res.ok) {
    console.error(`NAS API error: ${res.status} ${res.statusText}`);
    // Graceful fallback to static data
    return getStaticImages(category);
  }

  return res.json();
}
