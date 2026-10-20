import '../globals.css';
import type { Metadata } from 'next';
import { AdminI18nProvider } from '@/components/admin/AdminI18n';
import { adminDict } from '@/i18n/admin';
import { getAdminLocale } from '@/lib/admin-i18n';

export const metadata: Metadata = { title: 'Admin', robots: { index: false, follow: false } };
export const dynamic = 'force-dynamic';

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  const locale = getAdminLocale();
  return (
    <html lang={locale}>
      <body className="bg-slate-50 font-sans">
        <AdminI18nProvider locale={locale} dict={adminDict[locale]}>{children}</AdminI18nProvider>
      </body>
    </html>
  );
}
