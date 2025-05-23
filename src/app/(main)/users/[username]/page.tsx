import { cache } from 'react';
import prisma from '@/lib/prisma';
import {
  type FollowerInfo,
  getUserDataSelect,
  type UserData,
} from '@/lib/types';
import { notFound } from 'next/navigation';
import { validateRequest } from '@/auth';
import { type Metadata } from 'next';
import TrendSidebar from '@/components/trend-sidebar';
import UserAvatar from '@/components/user-avatar';
import { formatDate } from 'date-fns';
import { formatNumber } from '@/lib/utils';
import FollowerCount from '@/components/follower-count';
import FollowButton from '@/components/follow-button';
import UserPosts from './UserPosts';
import { Linkify } from '@/components/Linkify';
import EditProfileButton from './EditProfileButton';
import { getTranslations } from 'next-intl/server';

interface PageProps {
  params: Promise<{ username: string }>;
}

const getUser = cache(async (username: string, loggedInUserId: string) => {
  const user = await prisma.user.findFirst({
    where: {
      username: {
        equals: username,
        mode: 'insensitive',
      },
    },
    select: getUserDataSelect(loggedInUserId),
  });

  if (!user) notFound();

  return user;
});

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { username } = await params;
  const { user: loggedInUser } = await validateRequest();

  if (!loggedInUser) return {};

  const user = await getUser(username, loggedInUser.id);
  return {
    title: `${user.displayName} (@${user.username})`,
  };
}

export default async function Page({ params }: PageProps) {
  const t = await getTranslations('username');
  const { username } = await params;
  const { user: loggedInUser } = await validateRequest();

  if (!loggedInUser)
    return <p className="text-destructive">{t('error-user')}</p>;

  const user = await getUser(username, loggedInUser.id);

  return (
    <main className="w-full min-w-0 flex gap-5">
      <div className="w-full min-w-0">
        <UserProfile user={user} loggedInUserId={loggedInUser.id} />
        <div className="~mt-3/6 rounded-md border bg-bg-main shadow-md ~p-3/5">
          <h2 className="text-center ~text-xl/2xl font-bold">{t('post')}</h2>
        </div>
        <UserPosts
          userId={user.id}
          language={{
            errorPost: t('error-post'),
            errorLoading: t('error-loading'),
          }}
        />
      </div>
      <TrendSidebar />
    </main>
  );
}

interface UserProfileProps {
  user: UserData;
  loggedInUserId: string;
}

async function UserProfile({ user, loggedInUserId }: UserProfileProps) {
  const t = await getTranslations('profile');

  const followerInfo: FollowerInfo = {
    followers: user._count.followers,
    isFollowedByUser: user.followers.some(
      ({ followerId }) => followerId === loggedInUserId,
    ),
  };

  return (
    <div className="h-fit w-full space-y-5 rounded-md border bg-bg-main shadow-md ~p-3/5">
      <UserAvatar
        avatarUrl={user.avatarUrl}
        size={250}
        className="mx-auto max-w-60 max-h-60 rounded-full !~size-36/64"
      />
      <div className="flex flex-wrap gap-3 sm:flex-nowrap">
        <div className="me-auto space-y-3">
          <div>
            <h1 className="~text-xl/3xl font-bold text-text-title">
              {user.displayName}
            </h1>
            <div className="text-muted-foreground">@{user.username}</div>
          </div>
          <div>
            {t('since')} {formatDate(user.createAt, 'MMM d, yyyy')}
          </div>
          <div className="flex items-center gap-3">
            <span>
              {t('post')}:{' '}
              <span className="font-semibold">
                {formatNumber(user._count.posts)}
              </span>
            </span>
            <FollowerCount userId={user.id} initialState={followerInfo} />
          </div>
        </div>
        {user.id === loggedInUserId ? (
          <EditProfileButton user={user} />
        ) : (
          <FollowButton
            userId={user.id}
            initialState={followerInfo}
          ></FollowButton>
        )}
      </div>
      {user.bio && (
        <>
          <hr />
          <Linkify>
            <div className="overflow-hidden whitespace-pre-line break-words">
              {user.bio}
            </div>
          </Linkify>
        </>
      )}
    </div>
  );
}
