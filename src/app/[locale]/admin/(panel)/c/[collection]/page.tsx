import Link from 'next/link';
import { notFound } from 'next/navigation';
import ItemTable from '@/components/admin/ItemTable';
import { btnPrimary } from '@/components/admin/ui';
import { collections } from '@/config/collections';
import { getAdminLocale, getAdminT } from '@/lib/admin-i18n';
import { listItems } from '@/lib/db';
import { hasCollection } from '@/lib/api';
import { pick } from '@/lib/utils';

export default async function CollectionList({ params }: { params: { collection: string } }) {
  if (!hasCollection(params.collection)) notFound();
  const def = collections[params.collection];
  const locale = getAdminLocale();
  const t = getAdminT(locale);
  const items = await listItems(params.collection);
  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-slate-900">{pick(def.label, locale)}</h1>
        <Link href={`/admin/c/${params.collection}/new`} className={btnPrimary}>{t('common.add')}</Link>
      </div>
      <ItemTable collection={params.collection} titleField={def.titleField} items={items} />
    </div>
  );
}
