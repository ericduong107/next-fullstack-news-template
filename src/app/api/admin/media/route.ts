import { NextRequest } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { json } from '@/lib/api';
import { slugify } from '@/lib/utils';

const UPLOAD_DIR = path.join(process.cwd(), 'uploads');
const ALLOWED = ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.svg', '.avif'];
const MAX_SIZE = 8 * 1024 * 1024;

export async function GET() {
  await fs.mkdir(UPLOAD_DIR, { recursive: true });
  const names = (await fs.readdir(UPLOAD_DIR)).filter((n) => ALLOWED.includes(path.extname(n).toLowerCase()));
  const files = await Promise.all(
    names.map(async (n) => ({ name: n, url: `/uploads/${n}`, mtime: (await fs.stat(path.join(UPLOAD_DIR, n))).mtimeMs }))
  );
  return json(files.sort((a, b) => b.mtime - a.mtime));
}

export async function POST(req: NextRequest) {
  const form = await req.formData();
  const file = form.get('file');
  if (!(file instanceof File)) return json({ error: 'No file' }, 400);
  const ext = path.extname(file.name).toLowerCase();
  if (!ALLOWED.includes(ext)) return json({ error: 'File type not allowed' }, 400);
  if (file.size > MAX_SIZE) return json({ error: 'File too large (max 8MB)' }, 400);
  const base = slugify(path.basename(file.name, ext)) || 'image';
  const name = `${Date.now()}-${base}${ext}`;
  await fs.mkdir(UPLOAD_DIR, { recursive: true });
  await fs.writeFile(path.join(UPLOAD_DIR, name), Buffer.from(await file.arrayBuffer()));
  return json({ url: `/uploads/${name}`, name }, 201);
}

export async function DELETE(req: NextRequest) {
  const name = path.basename(req.nextUrl.searchParams.get('name') || '');
  if (!name) return json({ error: 'Missing name' }, 400);
  await fs.unlink(path.join(UPLOAD_DIR, name)).catch(() => {});
  return json({ ok: true });
}
