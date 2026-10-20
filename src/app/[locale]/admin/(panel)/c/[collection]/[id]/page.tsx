import { notFound } from 'next/navigation';
import EntityForm from '@/components/admin/EntityForm';
import { collections } from '@/config/collections';
import { getAdminLocale, getAdminT } from '@/lib/admin-i18n';
import { getItem } from '@/lib/db';
import { hasCollection } from '@/lib/api';
import { locales } from '@/lib/i18n';
import { pick } from '@/lib/utils';

export default async function EditItem({ params }: { params: { collection: string; id: string } }) {
  if (!hasCollection(params.collection)) notFound();
  const def = collections[params.collection];
  const locale = getAdminLocale();
  const t = getAdminT(locale);
  const isNew = params.id === 'new';
  const item = isNew ? { status: 'published', date: new Date().toISOString().slice(0, 10) } : await getItem(params.collection, params.id);
  if (!item) notFound();
  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold text-slate-900">
        {isNew ? `${t('common.add')}: ${pick(def.singular, locale)}` : pick(def.label, locale)}
      </h1>
      <EntityForm
        kind="collection"
        name={params.collection}
        fields={def.fields}
        initial={item}
        id={isNew ? undefined : params.id}
        contentLocales={locales}
      />
    </div>
  );
}
