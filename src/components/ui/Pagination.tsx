import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function Pagination({
  page, totalPages, href, prevLabel, nextLabel,
}: { page: number; totalPages: number; href: string; prevLabel: string; nextLabel: string }) {
  if (totalPages <= 1) return null;
  const link = (p: number) => `${href}?page=${p}`;
  const base = 'rounded-md border border-slate-300 px-3 py-1.5 text-sm hover:bg-slate-50';
  return (
    <nav className="mt-10 flex items-center justify-center gap-2">
      {page > 1 && <Link className={base} href={link(page - 1)}>{prevLabel}</Link>}
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
        <Link key={p} href={link(p)} className={cn(base, p === page && 'border-brand bg-brand text-white hover:bg-brand')}>{p}</Link>
      ))}
      {page < totalPages && <Link className={base} href={link(page + 1)}>{nextLabel}</Link>}
    </nav>
  );
}
