import AdminSidebar from '@/components/admin/AdminSidebar';
import { adminConfig } from '@/config/site.config';
import { collections, singletons } from '@/config/collections';
import { getAdminLocale, getAdminT } from '@/lib/admin-i18n';
import { pick } from '@/lib/utils';

export default function PanelLayout({ children }: { children: React.ReactNode }) {
  const locale = getAdminLocale();
  const t = getAdminT(locale);
  const groups = [
    { title: '', items: [{ href: '/admin', label: t('nav.dashboard') }] },
    {
      title: t('nav.content'),
      items: [
        ...Object.entries(collections).map(([k, c]) => ({ href: `/admin/c/${k}`, label: pick(c.label, locale) })),
        { href: '/admin/media', label: t('nav.media') },
      ],
    },
    {
      title: t('nav.settings'),
      items: Object.entries(singletons).map(([k, s]) => ({ href: `/admin/s/${k}`, label: pick(s.label, locale) })),
    },
  ];
  return (
    <div className="flex min-h-screen">
      <AdminSidebar groups={groups} langs={adminConfig.locales} />
      <main className="min-w-0 flex-1 p-8">{children}</main>
    </div>
  );
}
