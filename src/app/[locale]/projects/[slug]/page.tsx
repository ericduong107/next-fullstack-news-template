import Link from 'next/link';
import { notFound } from 'next/navigation';
import Container from '@/components/ui/Container';
import Cover from '@/components/ui/Cover';
import RichText from '@/components/ui/RichText';
import { getItem, getPublished } from '@/lib/db';
import { getT, isFeatureOn, locales, localePath } from '@/lib/i18n';
import { pick } from '@/lib/utils';

export async function generateStaticParams() {
  const items = await getPublished('projects');
  return locales.flatMap((locale) => items.map((p) => ({ locale, slug: p.slug! })));
}

export default async function ProjectDetail({ params: { locale, slug } }: { params: { locale: string; slug: string } }) {
  if (!isFeatureOn('projects')) notFound();
  const item = await getItem('projects', slug);
  if (!item || (item.status ?? 'published') !== 'published') notFound();
  const t = getT(locale);
  return (
    <Container className="max-w-3xl py-12">
      <Link href={localePath(locale, '/projects')} className="text-sm text-brand hover:underline">← {t('common.back')}</Link>
      <h1 className="mt-4 text-3xl font-bold text-slate-900">{pick(item.title, locale)}</h1>
      <dl className="mt-3 flex gap-6 text-sm text-slate-600">
        {item.location && <div><dt className="inline font-medium">{t('common.location')}: </dt><dd className="inline">{pick(item.location, locale)}</dd></div>}
        {item.year && <div><dt className="inline font-medium">{t('common.year')}: </dt><dd className="inline">{item.year}</dd></div>}
      </dl>
      {item.cover && <Cover src={item.cover} alt={pick(item.title, locale)} className="mt-6 rounded-lg" />}
      <div className="mt-8"><RichText text={pick(item.content, locale)} /></div>
    </Container>
  );
}
