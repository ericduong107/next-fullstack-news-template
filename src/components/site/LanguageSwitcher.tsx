'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function LanguageSwitcher({ locales, current }: { locales: string[]; current: string }) {
  const pathname = usePathname() || '/';
  const rest = pathname.split('/').slice(2).join('/');
  return (
    <div className="flex items-center gap-1 text-sm">
      {locales.map((l) => (
        <Link
          key={l}
          href={`/${l}${rest ? `/${rest}` : ''}`}
          aria-current={l === current ? 'true' : undefined}
          className={l === current ? 'rounded px-2 py-1 font-semibold text-brand' : 'rounded px-2 py-1 text-slate-500 hover:text-slate-900'}
        >
          {l.toUpperCase()}
        </Link>
      ))}
    </div>
  );
}
