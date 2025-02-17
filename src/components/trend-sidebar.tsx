import { validateRequest } from '@/auth';
import prisma from '@/lib/prisma';
import { userDataSelect } from '@/lib/types';
import { Loader2 } from 'lucide-react';
import { Suspense } from 'react';
import UserAvatar from './user-avatar';
import Link from 'next/link';
import { Button } from './ui/button';
import { unstable_cache } from 'next/cache';
import { formatNumber } from '@/lib/utils';
import FollowButton from './follow-button';

export default function TrendSidebar() {
  return (
    <section className="sticky top-[5.25rem] h-fit hidden md:block lg:w-80 w-72 max-h-[calc(100vh-80px)] overflow-y-auto scrollbar-hide pb-2.5">
      <Suspense fallback={<Loader2 className="mx-auto animate-spin" />}>
        <WhoToFollow />
        <TrendingTopics />
      </Suspense>
    </section>
  );
}

async function WhoToFollow() {
  const { user } = await validateRequest();
  // await new Promise((r) => setTimeout(r, 10000));
  if (!user) return null;

  const usersToFollow = await prisma.user.findMany({
    where: {
      NOT: {
        id: user?.id,
      },
    },
    select: userDataSelect,
    take: 5,
  });

  return (
    <div className="bg-bg-main border rounded-md shadow-md ~p-3/5">
      <h3 className="text-xl font-bold">Who to follow</h3>
      <div className="space-y-2 pt-2">
        {usersToFollow.map((user) => (
          <div key={user.id} className="flex justify-between items-center">
            <Link
              href={`/users/${user.username}`}
              className="flex items-center gap-3"
            >
              <UserAvatar avatarUrl={user.avatarUrl} />
              <div>
                <p className="font-bold text-text-title capitalize line-clamp-1 break-all hover:underline">
                  {user.displayName}
                </p>
                <p className="text-xs text-gray-400 line-clamp-1 break-all">
                  @{user.username}
                </p>
              </div>
            </Link>
            {/* <FollowButton userId={user.id} initialState={{followers:}}/> */}
          </div>
        ))}
      </div>
    </div>
  );
}

const getTrendingTopics = unstable_cache(
  async () => {
    const result = await prisma.$queryRaw<{ hashtag: string; count: bigint }[]>`
            SELECT LOWER(unnest(regexp_matches(content, '#[[:alnum:]_]+', 'g'))) AS hashtag, COUNT(*) AS count
            FROM posts
            GROUP BY (hashtag)
            ORDER BY count DESC, hashtag ASC
            LIMIT 5
        `;

    return result.map((row) => ({
      hashtag: row.hashtag,
      count: Number(row.count),
    }));
  },
  ['trending_topics'],
  {
    revalidate: 3 * 60 * 60,
  },
);

async function TrendingTopics() {
  const trendingTopics = await getTrendingTopics();
  return (
    <div className="~mt-3/6 bg-bg-main border rounded-md shadow-md ~p-3/5">
      <h3 className="text-xl font-bold">Trending Topics</h3>
      <div className="space-y-2 pt-2">
        {trendingTopics.map(({ hashtag, count }) => {
          const title = hashtag.split('#')[1];
          return (
            <Link href={`/hastag/${title}`} key={title} className="block">
              <p className="font-bold text-text-title capitalize line-clamp-1 break-all hover:underline">
                {hashtag}
              </p>
              <p className="text-xs text-gray-400 line-clamp-1 break-all">
                {formatNumber(count)} {count === 1 ? 'post' : 'posts'}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
