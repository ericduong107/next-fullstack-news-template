'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAdmin } from './AdminI18n';
import { cn } from '@/lib/utils';

type Group = { title: string; items: { href: string; label: string }[] };

export default function AdminSidebar({ groups, langs }: { groups: Group[]; langs: string[] }) {
  const pathname = usePathname();
  const router = useRouter();
  const { t, locale } = useAdmin();

  const setLang = (l: string) => {
    document.cookie = `admin_lang=${l}; path=/; max-age=31536000; samesite=lax`;
    router.refresh();
  };
  const logout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.replace('/admin/login');
  };

  return (
    <aside className="flex w-60 shrink-0 flex-col border-r border-slate-200 bg-white">
      <div className="flex h-14 items-center border-b border-slate-200 px-4 font-bold text-brand">Admin</div>
      <nav className="flex-1 space-y-5 overflow-y-auto p-3 text-sm">
        {groups.map((g) => (
          <div key={g.title}>
            <p className="px-2 pb-1 text-xs font-semibold text-slate-400">{g.title}</p>
            {g.items.map((i) => {
              const active = i.href === '/admin' ? pathname === '/admin' : pathname.startsWith(i.href);
              return (
                <Link
                  key={i.href}
                  href={i.href}
                  className={cn('block rounded-md px-2 py-1.5', active ? 'bg-brand-light font-medium text-brand-dark' : 'text-slate-700 hover:bg-slate-100')}
                >
                  {i.label}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>
      <div className="space-y-2 border-t border-slate-200 p-3 text-sm">
        <div className="flex gap-1">
          {langs.map((l) => (
            <button key={l} onClick={() => setLang(l)} className={cn('rounded px-2 py-1', l === locale ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100')}>
              {l.toUpperCase()}
            </button>
          ))}
        </div>
        <a href="/" target="_blank" rel="noreferrer" className="block px-2 py-1 text-slate-600 hover:text-brand">{t('nav.viewSite')}</a>
        <button onClick={logout} className="block w-full rounded px-2 py-1 text-left text-slate-600 hover:text-red-600">{t('nav.logout')}</button>
      </div>
    </aside>
  );
}
