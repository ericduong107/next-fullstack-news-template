// Chỉ dùng Web Crypto để chạy được cả ở middleware (edge) lẫn route handler (node)
export const AUTH_COOKIE = 'admin_token';

const secret = () => process.env.AUTH_SECRET || 'dev-secret-change-me';

async function hmac(msg: string) {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey('raw', enc.encode(secret()), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const sig = await crypto.subtle.sign('HMAC', key, enc.encode(msg));
  return Array.from(new Uint8Array(sig)).map((b) => b.toString(16).padStart(2, '0')).join('');
}

export async function createToken(days = 7) {
  const exp = String(Date.now() + days * 86400000);
  return `${exp}.${await hmac(exp)}`;
}

export async function verifyToken(token?: string) {
  if (!token) return false;
  const [exp, sig] = token.split('.');
  if (!exp || !sig || Number(exp) < Date.now()) return false;
  return (await hmac(exp)) === sig;
}
