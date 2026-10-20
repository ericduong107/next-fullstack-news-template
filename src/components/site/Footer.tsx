import Container from '@/components/ui/Container';
import { getT } from '@/lib/i18n';
import { pick } from '@/lib/utils';
import { siteConfig } from '@/config/site.config';

export default function Footer({ locale, data }: { locale: string; data: Record<string, any> }) {
  const t = getT(locale);
  const social = [
    { label: 'Facebook', href: data.facebook },
    { label: 'YouTube', href: data.youtube },
  ].filter((s) => s.href);
  return (
    <footer className="mt-16 bg-slate-900 text-slate-300">
      <Container className="grid gap-8 py-12 md:grid-cols-3">
        <div>
          <p className="text-lg font-semibold text-white">{pick(siteConfig.name, locale)}</p>
          <p className="mt-3 text-sm">{pick(data.description, locale)}</p>
        </div>
        <div className="text-sm">
          <p className="font-semibold text-white">{t('footer.contact')}</p>
          <ul className="mt-3 space-y-1">
            {data.address && <li>{pick(data.address, locale)}</li>}
            {data.phone && <li><a href={`tel:${data.phone}`} className="hover:text-white">{data.phone}</a></li>}
            {data.email && <li><a href={`mailto:${data.email}`} className="hover:text-white">{data.email}</a></li>}
          </ul>
        </div>
        {social.length > 0 && (
          <div className="text-sm">
            <p className="font-semibold text-white">{t('footer.follow')}</p>
            <ul className="mt-3 space-y-1">
              {social.map((s) => (
                <li key={s.label}><a href={s.href} target="_blank" rel="noopener noreferrer" className="hover:text-white">{s.label}</a></li>
              ))}
            </ul>
          </div>
        )}
      </Container>
      <div className="border-t border-slate-800 py-4 text-center text-xs text-slate-400">{pick(data.copyright, locale)}</div>
    </footer>
  );
}
