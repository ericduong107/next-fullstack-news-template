import { siteConfig } from '@/config/site.config';
import { clientDict } from '@/i18n/client';

const { enabled, defaultLocale } = siteConfig.i18n;

/** Danh sách ngôn ngữ đang hoạt động (khi tắt i18n chỉ còn ngôn ngữ mặc định) */
export const locales: string[] = enabled ? siteConfig.i18n.locales : [defaultLocale];
export const i18nEnabled = enabled && locales.length > 1;
export { defaultLocale };

export const isLocale = (l: string) => locales.includes(l);

/** Tạo link đúng theo chế độ có/không có tiền tố ngôn ngữ */
export function localePath(locale: string, path: string): string {
  if (!i18nEnabled) return path;
  return `/${locale}${path === '/' ? '' : path}`;
}

/** Hàm dịch cho client site: const t = getT(locale); t('nav.home') */
export function getT(locale: string) {
  return (key: string): string => clientDict[locale]?.[key] ?? clientDict[defaultLocale]?.[key] ?? key;
}

export function isFeatureOn(feature?: string) {
  return !feature || siteConfig.features[feature] !== false;
}
