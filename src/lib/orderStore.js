// Persistent order storage — uses Vercel KV in production,
// falls back to an in-memory map for local dev.
const memStore = new Map();

async function getKv() {
  if (!process.env.KV_REST_API_URL) return null;
  try {
    const { kv } = await import('@vercel/kv');
    return kv;
  } catch {
    return null;
  }
}

export async function getOrder(category) {
  const kv = await getKv();
  if (kv) return kv.get(`photo-order:${category}`);
  return memStore.get(category) ?? null;
}

export async function setOrder(category, order) {
  const kv = await getKv();
  if (kv) {
    await kv.set(`photo-order:${category}`, order);
  } else {
    memStore.set(category, order);
  }
}
