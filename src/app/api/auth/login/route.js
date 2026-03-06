import { createToken, COOKIE_NAME, COOKIE_MAX_AGE } from '@/lib/auth';

export async function POST(request) {
  const { password } = await request.json();
  const expected = process.env.ADMIN_PASSWORD || 'alina2024';

  if (password !== expected) {
    return Response.json({ error: 'Invalid password' }, { status: 401 });
  }

  const token = createToken();
  return Response.json({ ok: true }, {
    headers: {
      'Set-Cookie': `${COOKIE_NAME}=${token}; HttpOnly; Path=/; Max-Age=${COOKIE_MAX_AGE}; SameSite=Lax`,
    },
  });
}
