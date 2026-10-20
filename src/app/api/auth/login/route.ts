import { NextRequest, NextResponse } from 'next/server';
import { AUTH_COOKIE, createToken } from '@/lib/auth';

export async function POST(req: NextRequest) {
  const { username, password } = await req.json().catch(() => ({}));
  const okUser = process.env.ADMIN_USERNAME || 'admin';
  const okPass = process.env.ADMIN_PASSWORD || 'change-me';
  if (username !== okUser || password !== okPass) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }
  const res = NextResponse.json({ ok: true });
  res.cookies.set(AUTH_COOKIE, await createToken(7), {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 7 * 86400,
  });
  return res;
}
