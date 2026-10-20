import { notFound } from 'next/navigation';
import PageHeader from '@/components/ui/PageHeader';
import Section from '@/components/ui/Section';
import Pagination from '@/components/ui/Pagination';
import ContentCard from '@/components/site/ContentCard';
import { siteConfig } from '@/config/site.config';
import { getPublished } from '@/lib/db';
import { getT, isFeatureOn, localePath } from '@/lib/i18n';
import { paginate } from '@/lib/utils';

export const dynamic = 'force-dynamic';

export default async function ProjectsPage({
  params: { locale }, searchParams,
}: { params: { locale: string }; searchParams: { page?: string } }) {
  if (!isFeatureOn('projects')) notFound();
  const t = getT(locale);
  const all = await getPublished('projects');
  const { items, page, totalPages } = paginate(all, Number(searchParams.page) || 1, siteConfig.postsPerPage);
  return (
    <>
      <PageHeader title={t('projects.title')} />
      <Section>
        {items.length === 0 ? (
          <p className="text-slate-500">{t('common.noItems')}</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((p) => (
              <ContentCard key={p.id} item={p} locale={locale} basePath="/projects" readMore={t('common.readMore')} />
            ))}
          </div>
        )}
        <Pagination page={page} totalPages={totalPages} href={localePath(locale, '/projects')} prevLabel={t('common.prev')} nextLabel={t('common.next')} />
      </Section>
    </>
  );
}
