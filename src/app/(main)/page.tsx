import PostEditor from '@/components/posts/editor/PostEditor';
import Post from '@/components/posts/Post';
import TrendSidebar from '@/components/ui/trend-sidebar';
import prisma from '@/lib/prisma';
import { postDataInclude } from '@/lib/types';

export default async function Home() {
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: 'desc' },
    include: postDataInclude,
  });
  return (
    <main className="w-full min-w-0 flex gap-5">
      <div className="w-full min-w-0">
        <PostEditor />
        <div className="~space-y-3/6 ~mt-3/6">
          {posts.map((post) => (
            <Post key={post.id} post={post} />
          ))}
        </div>
      </div>
      <TrendSidebar />
    </main>
  );
}
