'use client';
/* eslint-disable @next/next/no-img-element */
import { useRef, useState } from 'react';
import { useAdmin } from './AdminI18n';
import { btnGhost, inputCls } from './ui';

export default function ImageField({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const { t } = useAdmin();
  const ref = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');

  const upload = async (file: File) => {
    setBusy(true);
    setErr('');
    const fd = new FormData();
    fd.append('file', file);
    const res = await fetch('/api/admin/media', { method: 'POST', body: fd });
    const data = await res.json().catch(() => ({}));
    setBusy(false);
    if (res.ok) onChange(data.url);
    else setErr(data.error || t('common.error'));
  };

  return (
    <div className="space-y-2">
      {value && <img src={value} alt="" className="h-32 rounded-md border border-slate-200 object-cover" />}
      <div className="flex gap-2">
        <input className={inputCls} value={value || ''} onChange={(e) => onChange(e.target.value)} placeholder="/uploads/..." />
        <button type="button" className={btnGhost} disabled={busy} onClick={() => ref.current?.click()}>
          {busy ? t('img.uploading') : t('img.upload')}
        </button>
        {value && <button type="button" className={btnGhost} onClick={() => onChange('')}>{t('img.remove')}</button>}
      </div>
      <input ref={ref} type="file" accept="image/*" hidden onChange={(e) => e.target.files?.[0] && upload(e.target.files[0])} />
      {err && <p className="text-sm text-red-600">{err}</p>}
    </div>
  );
}
