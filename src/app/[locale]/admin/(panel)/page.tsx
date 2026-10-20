import Link from 'next/link';
import { collections } from '@/config/collections';
import { getAdminLocale, getAdminT } from '@/lib/admin-i18n';
import { listItems } from '@/lib/db';
import { pick } from '@/lib/utils';

export default async function Dashboard() {
  const locale = getAdminLocale();
  const t = getAdminT(locale);
  const counts = await Promise.all(
    Object.entries(collections).map(async ([k, c]) => ({ k, label: pick(c.label, locale), n: (await listItems(k)).length }))
  );
  return (
    <div>
      <h1 className="text-2xl font-semibold text-slate-900">{t('dash.title')}</h1>
      <p className="mt-1 text-slate-600">{t('dash.welcome')}</p>
      <div className="mt-6 grid max-w-2xl gap-4 sm:grid-cols-2">
        {counts.map((c) => (
          <Link key={c.k} href={`/admin/c/${c.k}`} className="rounded-lg border border-slate-200 bg-white p-5 hover:border-brand">
            <p className="text-sm text-slate-500">{c.label}</p>
            <p className="mt-1 text-3xl font-semibold text-slate-900">{c.n}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
