import PostEditor from '@/components/posts/editor/PostEditor';
import TrendSidebar from '@/components/trend-sidebar';
import ForYouFeed from './ForYouFeed';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import FollowingFeed from './FollowingFeed';

export default function Home() {
  return (
    <main className="w-full min-w-0 flex gap-5">
      <div className="w-full min-w-0">
        <PostEditor />
        <Tabs defaultValue="for-you" className="~mt-3/6 w-full">
          <TabsList className="border shadow-md ~h-10/12 w-full">
            <TabsTrigger value="for-you">For You</TabsTrigger>
            <TabsTrigger value="following">Following</TabsTrigger>
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
