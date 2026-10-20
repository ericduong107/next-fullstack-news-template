import { cn } from '@/lib/utils';

/* eslint-disable @next/next/no-img-element */
export default function Cover({ src, alt, className }: { src?: string; alt?: string; className?: string }) {
  if (!src) return <div className={cn('aspect-[16/10] w-full bg-slate-100', className)} aria-hidden />;
  return <img src={src} alt={alt || ''} loading="lazy" className={cn('aspect-[16/10] w-full object-cover', className)} />;
}
