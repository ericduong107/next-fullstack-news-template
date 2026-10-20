/**
 * Lưu trữ bằng file JSON trong thư mục /content (không cần database).
 * Muốn đổi sang DB/CMS khác: chỉ cần viết lại các hàm trong file này, phần còn lại giữ nguyên.
 */
import fs from 'fs/promises';
import path from 'path';
import { slugify, uid, pick } from './utils';
import { collections } from '@/config/collections';

export type Item = { id: string; slug?: string; createdAt: string; updatedAt: string; [k: string]: any };

const DIR = path.join(process.cwd(), 'content');

async function readJson<T>(file: string, fallback: T): Promise<T> {
  try {
    return JSON.parse(await fs.readFile(path.join(DIR, file), 'utf8')) as T;
  } catch {
    return fallback;
  }
}

async function writeJson(file: string, data: unknown) {
  await fs.mkdir(DIR, { recursive: true });
  await fs.writeFile(path.join(DIR, file), JSON.stringify(data, null, 2), 'utf8');
}

/* ---------- Collections ---------- */
export const listItems = (c: string) => readJson<Item[]>(`${c}.json`, []);

/** Chỉ lấy bài đã đăng, mới nhất trước – dùng cho website khách */
export async function getPublished(c: string): Promise<Item[]> {
  const all = await listItems(c);
  return all
    .filter((i) => (i.status ?? 'published') === 'published')
    .sort((a, b) => String(b.date || b.createdAt).localeCompare(String(a.date || a.createdAt)));
}

export async function getItem(c: string, idOrSlug: string) {
  return (await listItems(c)).find((i) => i.id === idOrSlug || i.slug === idOrSlug) ?? null;
}

function prepare(c: string, data: Record<string, any>, existing: Item[], selfId?: string) {
  const def = collections[c];
  const out = { ...data };
  if (def?.slugFrom) {
    let base = slugify(out.slug || pick(out[def.slugFrom], 'vi')) || uid();
    let slug = base;
    while (existing.some((i) => i.slug === slug && i.id !== selfId)) slug = `${base}-${uid().slice(0, 4)}`;
    out.slug = slug;
  }
  return out;
}

export async function createItem(c: string, data: Record<string, any>) {
  const items = await listItems(c);
  const now = new Date().toISOString();
  const item: Item = {
    ...prepare(c, data, items),
    id: uid(),
    date: data.date || now.slice(0, 10),
    createdAt: now,
    updatedAt: now,
  };
  await writeJson(`${c}.json`, [item, ...items]);
  return item;
}

export async function updateItem(c: string, id: string, data: Record<string, any>) {
  const items = await listItems(c);
  const idx = items.findIndex((i) => i.id === id);
  if (idx < 0) return null;
  const item: Item = {
    ...items[idx],
    ...prepare(c, data, items, id),
    id,
    createdAt: items[idx].createdAt,
    updatedAt: new Date().toISOString(),
  };
  items[idx] = item;
  await writeJson(`${c}.json`, items);
  return item;
}

export async function deleteItem(c: string, id: string) {
  const items = await listItems(c);
  await writeJson(`${c}.json`, items.filter((i) => i.id !== id));
}

/* ---------- Singletons (footer, contact, ...) ---------- */
export const getSingleton = (name: string) => readJson<Record<string, any>>(`${name}.json`, {});
export const saveSingleton = (name: string, data: Record<string, any>) => writeJson(`${name}.json`, data);
