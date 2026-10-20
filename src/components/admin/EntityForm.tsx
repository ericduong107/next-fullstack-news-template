'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Field } from '@/config/collections';
import { pick } from '@/lib/utils';
import { useAdmin } from './AdminI18n';
import ImageField from './ImageField';
import { btnGhost, btnPrimary, inputCls } from './ui';
import { cn } from '@/lib/utils';

interface Props {
  kind: 'collection' | 'singleton';
  name: string;
  fields: Field[];
  initial: Record<string, any>;
  id?: string; // có id = đang sửa, không có = thêm mới (với collection)
  contentLocales: string[]; // ngôn ngữ nội dung (theo siteConfig.i18n)
}

/** Form dùng chung cho MỌI collection/singleton – được sinh từ config/collections.ts */
export default function EntityForm({ kind, name, fields, initial, id, contentLocales }: Props) {
  const { t, locale } = useAdmin();
  const router = useRouter();
  const [data, setData] = useState<Record<string, any>>(initial);
  const [lang, setLang] = useState(contentLocales[0]);
  const [state, setState] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [msg, setMsg] = useState('');

  const hasLocalized = fields.some((f) => f.localized);
  const get = (f: Field) => (f.localized ? data[f.key]?.[lang] ?? '' : data[f.key] ?? (f.type === 'boolean' ? false : ''));
  const set = (f: Field, v: any) =>
    setData((d) => (f.localized ? { ...d, [f.key]: { ...(d[f.key] || {}), [lang]: v } } : { ...d, [f.key]: v }));

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const missing = fields.some((f) => f.required && !pick(data[f.key], contentLocales[0]).trim());
    if (missing) { setState('error'); setMsg(t('common.required')); return; }
    setState('saving');
    const isSingleton = kind === 'singleton';
    const url = isSingleton ? `/api/admin/singleton/${name}` : id ? `/api/admin/${name}/${id}` : `/api/admin/${name}`;
    const res = await fetch(url, {
      method: isSingleton || id ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) { setState('error'); setMsg(t('common.error')); return; }
    if (!isSingleton && !id) { router.push(`/admin/c/${name}`); router.refresh(); return; }
    setState('saved'); setMsg(t('common.saved'));
    router.refresh();
  }

  return (
    <form onSubmit={submit} className="max-w-3xl space-y-5">
      {hasLocalized && contentLocales.length > 1 && (
        <div className="inline-flex rounded-md border border-slate-300 p-0.5">
          {contentLocales.map((l) => (
            <button type="button" key={l} onClick={() => setLang(l)}
              className={cn('rounded px-3 py-1 text-sm', l === lang ? 'bg-slate-900 text-white' : 'text-slate-600')}>
              {l.toUpperCase()}
            </button>
          ))}
        </div>
      )}

      {fields.map((f) => (
        <div key={f.key}>
          <label className="mb-1 block text-sm font-medium text-slate-700">
            {pick(f.label, locale)}{f.required && <span className="text-red-500"> *</span>}
          </label>
          {f.type === 'text' && <input className={inputCls} value={get(f)} onChange={(e) => set(f, e.target.value)} />}
          {f.type === 'textarea' && <textarea className={inputCls} rows={f.rows || 4} value={get(f)} onChange={(e) => set(f, e.target.value)} />}
          {f.type === 'date' && <input type="date" className={inputCls} value={get(f)} onChange={(e) => set(f, e.target.value)} />}
          {f.type === 'select' && (
            <select className={inputCls} value={get(f) || f.options?.[0]?.value} onChange={(e) => set(f, e.target.value)}>
              {f.options?.map((o) => <option key={o.value} value={o.value}>{pick(o.label, locale)}</option>)}
            </select>
          )}
          {f.type === 'boolean' && <input type="checkbox" checked={!!get(f)} onChange={(e) => set(f, e.target.checked)} />}
          {f.type === 'image' && <ImageField value={get(f)} onChange={(v) => set(f, v)} />}
        </div>
      ))}

      <div className="flex items-center gap-3 pt-2">
        <button className={btnPrimary} disabled={state === 'saving'}>{state === 'saving' ? t('common.saving') : t('common.save')}</button>
        {kind === 'collection' && <button type="button" className={btnGhost} onClick={() => router.push(`/admin/c/${name}`)}>{t('common.cancel')}</button>}
        {(state === 'saved' || state === 'error') && (
          <span className={state === 'saved' ? 'text-sm text-green-700' : 'text-sm text-red-600'}>{msg}</span>
        )}
      </div>
    </form>
  );
}
