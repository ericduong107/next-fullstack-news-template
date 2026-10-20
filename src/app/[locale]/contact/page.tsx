import PageHeader from '@/components/ui/PageHeader';
import Section from '@/components/ui/Section';
import { getSingleton } from '@/lib/db';
import { getT } from '@/lib/i18n';
import { pick } from '@/lib/utils';

export default async function ContactPage({ params: { locale } }: { params: { locale: string } }) {
  const t = getT(locale);
  const c = await getSingleton('contact');
  const rows = [
    { label: t('contact.address'), value: pick(c.address, locale) },
    { label: t('contact.phone'), value: c.phone, href: c.phone && `tel:${c.phone}` },
    { label: t('contact.email'), value: c.email, href: c.email && `mailto:${c.email}` },
    { label: t('contact.hours'), value: pick(c.hours, locale) },
  ].filter((r) => r.value);
  // Chỉ cho nhúng Google Maps để tránh iframe lạ
  const map = typeof c.mapEmbed === 'string' && c.mapEmbed.startsWith('https://www.google.com/maps/embed') ? c.mapEmbed : '';
  return (
    <>
      <PageHeader title={pick(c.heading, locale) || t('contact.title')} subtitle={pick(c.intro, locale)} />
      <Section>
        <div className="grid gap-8 md:grid-cols-2">
          <dl className="space-y-4">
            {rows.map((r) => (
              <div key={r.label}>
                <dt className="text-sm font-medium text-slate-500">{r.label}</dt>
                <dd className="mt-0.5 text-slate-900">{r.href ? <a href={r.href} className="hover:text-brand">{r.value}</a> : r.value}</dd>
              </div>
            ))}
          </dl>
          {map && <iframe src={map} title="Map" loading="lazy" className="h-80 w-full rounded-lg border-0" referrerPolicy="no-referrer-when-downgrade" />}
        </div>
      </Section>
    </>
  );
}
