import Link from 'next/link';
import Cover from '@/components/ui/Cover';
import { localePath } from '@/lib/i18n';
import { formatDate, pick } from '@/lib/utils';
import type { Item } from '@/lib/db';

/** Thẻ dùng chung cho tin tức, dự án và mọi collection khác */
export default function ContentCard({
  item, locale, basePath, readMore,
}: { item: Item; locale: string; basePath: string; readMore: string }) {
  const title = pick(item.title, locale);
  return (
    <article className="group overflow-hidden rounded-lg border border-slate-200 bg-white">
      <Link href={localePath(locale, `${basePath}/${item.slug}`)} className="block">
        <Cover src={item.cover} alt={title} />
        <div className="p-4">
          <time className="text-xs text-slate-500">{formatDate(item.date, locale)}</time>
          <h3 className="mt-1 line-clamp-2 text-lg font-semibold text-slate-900 group-hover:text-brand">{title}</h3>
          <p className="mt-2 line-clamp-3 text-sm text-slate-600">{pick(item.excerpt, locale)}</p>
          <span className="mt-3 inline-block text-sm font-medium text-brand">{readMore}</span>
        </div>
      </Link>
    </article>
  );
}
