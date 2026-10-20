import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { collections, singletons } from '@/config/collections';

export const json = (data: unknown, status = 200) => NextResponse.json(data, { status });
export const notFound = () => json({ error: 'Not found' }, 404);
export const hasCollection = (n: string) => Object.prototype.hasOwnProperty.call(collections, n);
export const hasSingleton = (n: string) => Object.prototype.hasOwnProperty.call(singletons, n);
/** Làm mới cache các trang public sau khi admin lưu */
export const refreshSite = () => revalidatePath('/', 'layout');
