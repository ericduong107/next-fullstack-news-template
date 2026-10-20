import Link from 'next/link';
import Container from '@/components/ui/Container';
import LanguageSwitcher from './LanguageSwitcher';
import { siteConfig } from '@/config/site.config';
import { getT, i18nEnabled, isFeatureOn, localePath, locales } from '@/lib/i18n';
import { pick } from '@/lib/utils';

export default function Header({ locale }: { locale: string }) {
  const t = getT(locale);
  const nav = siteConfig.nav.filter((n) => isFeatureOn(n.feature));
  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur">
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link href={localePath(locale, '/')} className="text-lg font-bold text-brand">
          {pick(siteConfig.name, locale)}
        </Link>
        <div className="flex items-center gap-4">
          <nav className="flex flex-wrap items-center gap-x-5 text-sm">
            {nav.map((n) => (
              <Link key={n.key} href={localePath(locale, n.href)} className="text-slate-700 hover:text-brand">
                {t(`nav.${n.key}`)}
              </Link>
            ))}
          </nav>
          {i18nEnabled && <LanguageSwitcher locales={locales} current={locale} />}
        </div>
      </Container>
    </header>
  );
}
