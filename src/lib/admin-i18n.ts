import { cookies } from 'next/headers';
import { adminConfig } from '@/config/site.config';
import { adminDict } from '@/i18n/admin';

export const ADMIN_LANG_COOKIE = 'admin_lang';

export function getAdminLocale(): string {
  const v = cookies().get(ADMIN_LANG_COOKIE)?.value;
  return v && adminConfig.locales.includes(v) ? v : adminConfig.defaultLocale;
}

export function getAdminT(locale: string) {
  return (key: string) => adminDict[locale]?.[key] ?? adminDict[adminConfig.defaultLocale]?.[key] ?? key;
}
