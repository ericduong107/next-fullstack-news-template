'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { formatDate, pick } from '@/lib/utils';
import { useAdmin } from './AdminI18n';
import { btnGhost } from './ui';

interface Props {
  collection: string;
  titleField: string;
  items: { id: string; status?: string; date?: string; [k: string]: any }[];
}

export default function ItemTable({ collection, titleField, items }: Props) {
  const { t, locale } = useAdmin();
  const router = useRouter();
  const [busy, setBusy] = useState<string | null>(null);

  async function remove(id: string) {
    if (!confirm(t('common.confirmDelete'))) return;
    setBusy(id);
    await fetch(`/api/admin/${collection}/${id}`, { method: 'DELETE' });
    setBusy(null);
    router.refresh();
  }

  if (items.length === 0) return <p className="rounded-md border border-dashed border-slate-300 p-8 text-center text-slate-500">{t('common.empty')}</p>;

  return (
    <div className="overflow-x-auto rounded-md border border-slate-200 bg-white">
      <table className="w-full text-left text-sm">
        <thead className="bg-slate-50 text-slate-500">
          <tr>
            <th className="px-4 py-2 font-medium">{t('common.title')}</th>
            <th className="px-4 py-2 font-medium">{t('common.status')}</th>
            <th className="px-4 py-2 font-medium">{t('common.date')}</th>
            <th className="px-4 py-2 text-right font-medium">{t('common.actions')}</th>
          </tr>
        </thead>
        <tbody>
          {items.map((i) => (
            <tr key={i.id} className="border-t border-slate-100">
              <td className="px-4 py-3 font-medium text-slate-900">{pick(i[titleField], locale) || '—'}</td>
              <td className="px-4 py-3">
                <span className={i.status === 'draft' ? 'text-amber-700' : 'text-green-700'}>{t(`status.${i.status || 'published'}`)}</span>
              </td>
              <td className="px-4 py-3 text-slate-500">{formatDate(i.date, locale)}</td>
              <td className="px-4 py-3">
                <div className="flex justify-end gap-2">
                  <Link href={`/admin/c/${collection}/${i.id}`} className={btnGhost}>{t('common.edit')}</Link>
                  <button className={`${btnGhost} text-red-600`} disabled={busy === i.id} onClick={() => remove(i.id)}>{t('common.delete')}</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
