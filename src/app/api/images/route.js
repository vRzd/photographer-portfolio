import { NextResponse } from 'next/server';
import { getImages, getFeaturedImages } from '@/lib/imageService';

/**
 * GET /api/images
 *
 * Query parameters:
 *   category  — filter by category slug (e.g. 'weddings', 'portraits')
 *   featured  — 'true' to return only featured images
 *   limit     — maximum number of results (integer)
 *
 * This route is ready to proxy a Synology NAS backend.
 * Switch the IMAGE_SOURCE env variable to 'nas' and set NAS_API_URL.
 */
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category') || undefined;
    const featured = searchParams.get('featured') === 'true';
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit'), 10) : undefined;

    let data;

    if (featured) {
      data = await getFeaturedImages(limit);
    } else {
      data = await getImages(category);
      if (limit) data = data.slice(0, limit);
    }

    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
      },
    });
  } catch (error) {
    console.error('Images API error:', error);
    return NextResponse.json({ error: 'Failed to fetch images' }, { status: 500 });
  }
}
