import PostEditor from '@/components/posts/editor/PostEditor';
import Post from '@/components/posts/Post';
import prisma from '@/lib/prisma';
import { postDataInclude } from '@/lib/types';

export default async function Home() {
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: 'desc' },
    include: postDataInclude,
  });
  return (
    <main className="w-full min-w-0">
      <div className="">
        <PostEditor />
        <div className="~space-y-3/6 ~mt-3/6">
          {posts.map((post) => (
            <Post key={post.id} post={post} />
          ))}
        </div>
      </div>
    </main>
  );
}
