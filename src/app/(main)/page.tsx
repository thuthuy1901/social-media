import PostEditor from '@/components/posts/editor/PostEditor';
import TrendSidebar from '@/components/trend-sidebar';
import ForYouFeed from './ForYouFeed';

export default function Home() {
  return (
    <main className="w-full min-w-0 flex gap-5">
      <div className="w-full min-w-0">
        <PostEditor />
        <ForYouFeed />
      </div>
      <TrendSidebar />
    </main>
  );
}
