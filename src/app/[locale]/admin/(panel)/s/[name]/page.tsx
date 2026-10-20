import { notFound } from 'next/navigation';
import EntityForm from '@/components/admin/EntityForm';
import { singletons } from '@/config/collections';
import { getAdminLocale } from '@/lib/admin-i18n';
import { getSingleton } from '@/lib/db';
import { hasSingleton } from '@/lib/api';
import { locales } from '@/lib/i18n';
import { pick } from '@/lib/utils';

export default async function SingletonPage({ params }: { params: { name: string } }) {
  if (!hasSingleton(params.name)) notFound();
  const def = singletons[params.name];
  const locale = getAdminLocale();
  const data = await getSingleton(params.name);
  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold text-slate-900">{pick(def.label, locale)}</h1>
      <EntityForm kind="singleton" name={params.name} fields={def.fields} initial={data} contentLocales={locales} />
    </div>
  );
}
