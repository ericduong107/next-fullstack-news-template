'use client';
/* eslint-disable @next/next/no-img-element */
import { useCallback, useEffect, useRef, useState } from 'react';
import { useAdmin } from './AdminI18n';
import { btnGhost, btnPrimary } from './ui';

type File_ = { name: string; url: string };

export default function MediaManager() {
  const { t } = useAdmin();
  const [files, setFiles] = useState<File_[] | null>(null);
  const [busy, setBusy] = useState(false);
  const [copied, setCopied] = useState('');
  const [err, setErr] = useState('');
  const ref = useRef<HTMLInputElement>(null);

  const load = useCallback(async () => setFiles(await (await fetch('/api/admin/media')).json()), []);
  useEffect(() => { load(); }, [load]);

  async function upload(list: FileList) {
    setBusy(true); setErr('');
    for (const f of Array.from(list)) {
      const fd = new FormData(); fd.append('file', f);
      const res = await fetch('/api/admin/media', { method: 'POST', body: fd });
      if (!res.ok) setErr((await res.json().catch(() => ({}))).error || t('common.error'));
    }
    setBusy(false); load();
  }

  async function remove(name: string) {
    if (!confirm(t('common.confirmDelete'))) return;
    await fetch(`/api/admin/media?name=${encodeURIComponent(name)}`, { method: 'DELETE' });
    load();
  }

  async function copy(url: string) {
    await navigator.clipboard.writeText(url);
    setCopied(url); setTimeout(() => setCopied(''), 1500);
  }

  return (
    <div>
      <button className={btnPrimary} disabled={busy} onClick={() => ref.current?.click()}>{busy ? t('img.uploading') : t('img.upload')}</button>
      <input ref={ref} type="file" accept="image/*" multiple hidden onChange={(e) => e.target.files && upload(e.target.files)} />
      {err && <p className="mt-2 text-sm text-red-600">{err}</p>}

      {files && files.length === 0 && <p className="mt-6 text-slate-500">{t('media.empty')}</p>}
      <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {files?.map((f) => (
          <div key={f.name} className="overflow-hidden rounded-md border border-slate-200 bg-white">
            <img src={f.url} alt="" className="aspect-square w-full object-cover" loading="lazy" />
            <div className="flex gap-1 p-2">
              <button className={`${btnGhost} flex-1 justify-center`} onClick={() => copy(f.url)}>{copied === f.url ? t('media.copied') : t('media.copy')}</button>
              <button className={`${btnGhost} text-red-600`} onClick={() => remove(f.name)}>{t('common.delete')}</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
