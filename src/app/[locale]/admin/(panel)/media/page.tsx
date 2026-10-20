import MediaManager from '@/components/admin/MediaManager';
import { getAdminLocale, getAdminT } from '@/lib/admin-i18n';

export default function MediaPage() {
  const t = getAdminT(getAdminLocale());
  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold text-slate-900">{t('media.title')}</h1>
      <MediaManager />
    </div>
  );
}
