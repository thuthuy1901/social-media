import { validateRequest } from '@/auth';
import { redirect } from 'next/navigation';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = await validateRequest();
  console.log(user);
  // if (!user || !user.isAdmin) redirect('/admin/signin');
  return <>{children}</>;
}
