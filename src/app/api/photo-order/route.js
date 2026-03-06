import { verifyToken, COOKIE_NAME } from '@/lib/auth';
import { getOrder, setOrder } from '@/lib/orderStore';
import { cookies } from 'next/headers';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category') || 'all';
  const order = await getOrder(category);
  return Response.json(order);
}

export async function POST(request) {
  const jar = await cookies();
  const token = jar.get(COOKIE_NAME)?.value;
  if (!verifyToken(token)) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { category, order } = await request.json();
  if (!category || !Array.isArray(order)) {
    return Response.json({ error: 'Invalid payload' }, { status: 400 });
  }

  await setOrder(category, order);
  return Response.json({ ok: true });
}
