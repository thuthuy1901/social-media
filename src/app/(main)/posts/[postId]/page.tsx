import { validateRequest } from '@/auth';
import FollowButton from '@/components/follow-button';
import { Linkify } from '@/components/Linkify';
import Post from '@/components/posts/Post';
import UserAvatar from '@/components/user-avatar';
import UserTooltip from '@/components/user-tooltip';
import prisma from '@/lib/prisma';
import { getPostDataInclude, type UserData } from '@/lib/types';
import { Loader2 } from 'lucide-react';
import { type Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { cache, Suspense } from 'react';

interface PageProps {
  params: Promise<{ postId: string }>;
}

const getPost = cache(async (postId: string, loggedInUserId: string) => {
  const post = await prisma.post.findUnique({
    where: {
      id: postId,
    },
    include: getPostDataInclude(loggedInUserId),
  });

  if (!post) notFound();

  return post;
});

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { postId } = await params;
  const { user } = await validateRequest();

  if (!user) return {};

  const post = await getPost(postId, user.id);

  return {
    title: `${post.user.displayName}: ${post.content.slice(0, 50)}...`,
  };
}
export default async function Page({ params }: PageProps) {
  const { postId } = await params;
  const { user } = await validateRequest();

  if (!user) {
    return (
      <p className="text-destructive">
        You&apos;re not authorized to view this page.
      </p>
    );
  }

  const post = await getPost(postId, user.id);

  return (
    <main className="flex w-full min-w-0 gap-5">
      <div className="w-full min-w-0 ~space-y-3/6 ">
        <Post post={post} />
      </div>
      <div className="sticky top-[5.25rem] hidden lg:block h-fit w-80">
        <Suspense fallback={<Loader2 className="mx-auto animate-spin" />}>
          <UserInfoSidebar user={post.user} />
        </Suspense>
      </div>
    </main>
  );
}

interface UserInfoSidebarProps {
  user: UserData;
}

async function UserInfoSidebar({ user }: UserInfoSidebarProps) {
  const { user: loggedInUser } = await validateRequest();

  if (!loggedInUser) return null;

  return (
    <div className="bg-bg-main border rounded-md shadow-md ~p-3/5">
      <div className="text-xl font-bold text-text-title">About this user</div>
      <UserTooltip user={user}>
        <Link
          href={`/users/${user.username}`}
          className="flex items-center gap-3 mt-3"
        >
          <UserAvatar avatarUrl={user.avatarUrl} size={40} />
          <div>
            <p className="line-clamp-1 break-all font-semibold hover:underline text-text-title">
              {user.displayName}
            </p>
            <p className="line-clamp-1 break-all text-text-second">
              @{user.username}
            </p>
          </div>
        </Link>
      </UserTooltip>
      <hr className="my-3" />
      <Linkify>
        <div className="line-clamp-6 whitespace-pre-line break-words">
          {user.bio}
        </div>
      </Linkify>
      {user.id !== loggedInUser.id && (
        <div className="mt-3">
          <FollowButton
            userId={user.id}
            initialState={{
              followers: user._count.followers,
              isFollowedByUser: user.followers.some(
                ({ followerId }) => followerId === loggedInUser.id,
              ),
            }}
          />
        </div>
      )}
    </div>
  );
}
