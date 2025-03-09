import PostEditor from '@/components/posts/editor/PostEditor';
import TrendSidebar from '@/components/trend-sidebar';
import ForYouFeed from './ForYouFeed';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import FollowingFeed from './FollowingFeed';
import { useTranslations } from 'next-intl';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Home page',
};

export default function Home() {
  const t = useTranslations('home.post-editor');
  return (
    <main className="w-full min-w-0 flex gap-5">
      <div className="w-full min-w-0">
        <PostEditor button={t('button')} />
        <Tabs defaultValue="for-you" className="~mt-3/6 w-full">
          <TabsList className="border shadow-md ~h-10/12 w-full">
            <TabsTrigger value="for-you">{t('for-you')}</TabsTrigger>
            <TabsTrigger value="following">{t('following')}</TabsTrigger>
          </TabsList>
          <TabsContent value="for-you">
            <ForYouFeed />
          </TabsContent>
          <TabsContent value="following">
            <FollowingFeed />
          </TabsContent>
        </Tabs>
      </div>
      <TrendSidebar />
    </main>
  );
}
