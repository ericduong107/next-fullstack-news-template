import fs from 'fs/promises';
import path from 'path';

// Phục vụ ảnh upload lúc runtime (thư mục public không tự nhận file mới khi chạy production)
const UPLOAD_DIR = path.join(process.cwd(), 'uploads');
const MIME: Record<string, string> = {
  '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png', '.webp': 'image/webp',
  '.gif': 'image/gif', '.svg': 'image/svg+xml', '.avif': 'image/avif',
};

export async function GET(_: Request, { params }: { params: { path: string[] } }) {
  const name = path.basename(params.path.join('/'));
  try {
    const buf = await fs.readFile(path.join(UPLOAD_DIR, name));
    return new Response(new Uint8Array(buf), {
      headers: {
        'Content-Type': MIME[path.extname(name).toLowerCase()] || 'application/octet-stream',
        'Cache-Control': 'public, max-age=86400',
        'Content-Security-Policy': "default-src 'none'; style-src 'unsafe-inline'",
      },
    });
  } catch {
    return new Response('Not found', { status: 404 });
  }
}
