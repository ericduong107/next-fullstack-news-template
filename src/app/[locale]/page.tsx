import Link from 'next/link';
import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import ContentCard from '@/components/site/ContentCard';
import { getPublished } from '@/lib/db';
import { getT, isFeatureOn, localePath } from '@/lib/i18n';

export default async function HomePage({ params: { locale } }: { params: { locale: string } }) {
  const t = getT(locale);
  const [posts, projects] = await Promise.all([getPublished('posts'), getPublished('projects')]);
  const viewAll = (href: string) => (
    <Link href={localePath(locale, href)} className="text-sm font-medium text-brand hover:underline">{t('common.viewAll')}</Link>
  );
  return (
    <>
      <div className="bg-brand-light">
        <Container className="py-20">
          <h1 className="max-w-3xl text-4xl font-bold text-slate-900 sm:text-5xl">{t('home.hero.title')}</h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-700">{t('home.hero.subtitle')}</p>
        </Container>
      </div>

      {isFeatureOn('projects') && projects.length > 0 && (
        <Section title={t('home.featuredProjects')} action={viewAll('/projects')}>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.slice(0, 3).map((p) => (
              <ContentCard key={p.id} item={p} locale={locale} basePath="/projects" readMore={t('common.readMore')} />
            ))}
          </div>
        </Section>
      )}

      <Section title={t('home.latestPosts')} action={viewAll('/posts')}>
        {posts.length === 0 ? (
          <p className="text-slate-500">{t('common.noItems')}</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.slice(0, 3).map((p) => (
              <ContentCard key={p.id} item={p} locale={locale} basePath="/posts" readMore={t('common.readMore')} />
            ))}
          </div>
        )}
      </Section>
    </>
  );
}
