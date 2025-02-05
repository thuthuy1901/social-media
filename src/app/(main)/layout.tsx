import { validateRequest } from '@/auth';
import { redirect } from 'next/navigation';
import SessionProvider from './SessionProvider';
import Navbar from './Navbar';
import MenuBar from './MenuBar';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await validateRequest();
  if (!session.user) redirect('/login');
  return (
    <SessionProvider value={session}>
      <div className="flex flex-col min-h-screen bg-gray-200 dark:bg-black">
        <Navbar />
        <div className="container mx-auto px-2 py-5 flex w-full grow gap-5">
          <MenuBar className="sm:flex flex-col bg-bg-main border dark:border-white/50 rounded-md gap-2 p-2 sticky top-[5.25rem] h-fit hidden shadow-md dark:shadow-white/30 lg:~w-40/80" />
          {children}
        </div>
        <MenuBar className="sm:hidden flex justify-evenly bg-bg-main border-t dark:border-white/50 gap-2 p-2 sticky bottom-0 h-fit w-full backdrop-blur-sm z-10" />
      </div>
    </SessionProvider>
  );
}
