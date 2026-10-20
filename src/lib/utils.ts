import { siteConfig } from '@/config/site.config';

export const cn = (...c: (string | false | null | undefined)[]) => c.filter(Boolean).join(' ');

export const uid = () => Math.random().toString(36).slice(2, 10);

export function slugify(s: string): string {
  return s
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

/** Lấy giá trị theo ngôn ngữ: string thường hoặc {vi, en}. Tự fallback về ngôn ngữ mặc định. */
export function pick(field: unknown, locale: string): string {
  if (field == null) return '';
  if (typeof field === 'string') return field;
  if (typeof field === 'object') {
    const o = field as Record<string, string>;
    return o[locale] || o[siteConfig.i18n.defaultLocale] || Object.values(o).find(Boolean) || '';
  }
  return String(field);
}

export function formatDate(d: string | undefined, locale: string): string {
  if (!d) return '';
  const date = new Date(d);
  if (isNaN(date.getTime())) return '';
  return date.toLocaleDateString(locale === 'vi' ? 'vi-VN' : 'en-US');
}

export function paginate<T>(items: T[], page: number, size: number) {
  const totalPages = Math.max(1, Math.ceil(items.length / size));
  const current = Math.min(Math.max(1, page || 1), totalPages);
  return { items: items.slice((current - 1) * size, current * size), page: current, totalPages };
}
