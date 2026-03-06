import { createHmac } from 'crypto';

const SECRET = process.env.ADMIN_SECRET || 'dev-secret-change-me';
export const COOKIE_NAME = 'admin_session';
export const COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

export function createToken() {
  const ts = Date.now().toString();
  const sig = createHmac('sha256', SECRET).update(ts).digest('hex');
  return `${ts}.${sig}`;
}

export function verifyToken(token) {
  if (!token) return false;
  const [ts, sig] = token.split('.');
  if (!ts || !sig) return false;
  const expected = createHmac('sha256', SECRET).update(ts).digest('hex');
  if (sig !== expected) return false;
  // Expire after 7 days
  return Date.now() - parseInt(ts) < COOKIE_MAX_AGE * 1000;
}
