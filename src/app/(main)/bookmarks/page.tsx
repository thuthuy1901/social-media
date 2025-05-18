import { type Metadata } from 'next';
import Bookmarks from './Bookmarks';
import TrendSidebar from '@/components/trend-sidebar';
import { useTranslations } from 'next-intl';

export const metadata: Metadata = {
  title: 'Bookmarks',
};

export default function Page() {
  const t = useTranslations('bookmark');
  return (
    <main className="w-full min-w-0 flex gap-5">
      <div className="w-full min-w-0 space-y-5">
        <div className="rounded-md border bg-bg-main shadow-md ~p-3/5">
          <h1 className="text-center ~text-xl/2xl font-bold">{t('title')}</h1>
        </div>
        <Bookmarks />
      </div>
      <TrendSidebar />
    </main>
  );
}
