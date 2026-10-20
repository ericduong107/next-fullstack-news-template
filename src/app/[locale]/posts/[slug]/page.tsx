import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Container from '@/components/ui/Container';
import Cover from '@/components/ui/Cover';
import RichText from '@/components/ui/RichText';
import { getItem, getPublished } from '@/lib/db';
import { getT, locales, localePath } from '@/lib/i18n';
import { formatDate, pick } from '@/lib/utils';

export async function generateStaticParams() {
  const posts = await getPublished('posts');
  return locales.flatMap((locale) => posts.map((p) => ({ locale, slug: p.slug! })));
}

export async function generateMetadata({ params }: { params: { locale: string; slug: string } }): Promise<Metadata> {
  const item = await getItem('posts', params.slug);
  if (!item) return {};
  return { title: pick(item.title, params.locale), description: pick(item.excerpt, params.locale) };
}

export default async function PostDetail({ params: { locale, slug } }: { params: { locale: string; slug: string } }) {
  const item = await getItem('posts', slug);
  if (!item || (item.status ?? 'published') !== 'published') notFound();
  const t = getT(locale);
  return (
    <Container className="max-w-3xl py-12">
      <Link href={localePath(locale, '/posts')} className="text-sm text-brand hover:underline">← {t('common.back')}</Link>
      <h1 className="mt-4 text-3xl font-bold text-slate-900">{pick(item.title, locale)}</h1>
      <time className="mt-2 block text-sm text-slate-500">{formatDate(item.date, locale)}</time>
      {item.cover && <Cover src={item.cover} alt={pick(item.title, locale)} className="mt-6 rounded-lg" />}
      <div className="mt-8"><RichText text={pick(item.content, locale)} /></div>
    </Container>
  );
}
