'use client';
import { createContext, useContext } from 'react';

type Ctx = { locale: string; t: (key: string) => string };
const AdminCtx = createContext<Ctx>({ locale: 'vi', t: (k) => k });

export function AdminI18nProvider({ locale, dict, children }: { locale: string; dict: Record<string, string>; children: React.ReactNode }) {
  return <AdminCtx.Provider value={{ locale, t: (k) => dict[k] ?? k }}>{children}</AdminCtx.Provider>;
}

/** Dùng trong mọi client component của admin: const { t, locale } = useAdmin(); */
export const useAdmin = () => useContext(AdminCtx);
