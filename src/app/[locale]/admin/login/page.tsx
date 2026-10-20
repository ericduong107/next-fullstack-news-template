'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAdmin } from '@/components/admin/AdminI18n';
import { btnPrimary, inputCls } from '@/components/admin/ui';

export default function LoginPage() {
  const { t } = useAdmin();
  const router = useRouter();
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true); setError('');
    const res = await fetch('/api/auth/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
    if (res.ok) { router.replace('/admin'); router.refresh(); return; }
    setBusy(false); setError(t('login.error'));
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <form onSubmit={submit} className="w-full max-w-sm space-y-4 rounded-lg border border-slate-200 bg-white p-6">
        <h1 className="text-xl font-semibold text-slate-900">{t('login.title')}</h1>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">{t('login.username')}</label>
          <input className={inputCls} autoComplete="username" value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">{t('login.password')}</label>
          <input type="password" className={inputCls} autoComplete="current-password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button className={`${btnPrimary} w-full justify-center`} disabled={busy}>{t('login.submit')}</button>
      </form>
    </div>
  );
}
