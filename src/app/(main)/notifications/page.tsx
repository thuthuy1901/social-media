import { Metadata } from 'next';
import TrendSidebar from '@/components/trend-sidebar';
import Notifications from './Notifications';

export const metadata: Metadata = {
  title: 'Notifications',
};

export default function Page() {
  return (
    <main className="w-full min-w-0 flex gap-5">
      <div className="w-full min-w-0 space-y-5">
        <div className="rounded-md border bg-bg-main shadow-md ~p-3/5">
          <h1 className="text-center ~text-xl/2xl font-bold">Notifications</h1>
        </div>
        <Notifications />
      </div>
      <TrendSidebar />
    </main>
  );
}
