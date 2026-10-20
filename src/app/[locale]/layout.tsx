import '../globals.css';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Header from '@/components/site/Header';
import Footer from '@/components/site/Footer';
import { siteConfig } from '@/config/site.config';
import { getSingleton } from '@/lib/db';
import { isLocale, locales } from '@/lib/i18n';
import { pick } from '@/lib/utils';

export const revalidate = 60;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const name = pick(siteConfig.name, params.locale);
  return { metadataBase: new URL(siteConfig.url), title: { default: name, template: `%s | ${name}` } };
}

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const footer = await getSingleton('footer');
  return (
    <html lang={params.locale}>
      <body className="font-sans">
        <Header locale={params.locale} />
        <main className="min-h-[60vh]">{children}</main>
        <Footer locale={params.locale} data={footer} />
      </body>
    </html>
  );
}
