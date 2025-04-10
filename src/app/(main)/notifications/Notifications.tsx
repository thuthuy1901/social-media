'use client';

import InfiniteScrollContainer from '@/components/infinite-scroll-container';
import PostsLoadingSkeleton from '@/components/posts/PostsLoadingSkeleton';
import kyInstance from '@/lib/ky';
import { NotificationsPage } from '@/lib/types';
import { useInfiniteQuery } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import Notification from './Notification';

export default function Notifications() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery({
      queryKey: ['notifications'],
      queryFn: ({ pageParam }) =>
        kyInstance
          .get(
            '/api/notifications',
            pageParam ? { searchParams: { cursor: pageParam } } : {},
          )
          .json<NotificationsPage>(),
      initialPageParam: null as string | null,
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    });

  const notifications = data?.pages.flatMap((page) => page.notification) || [];

  if (status === 'pending') {
    return <PostsLoadingSkeleton />;
  }

  if (status === 'success' && !notifications.length && !hasNextPage) {
    return (
      <p className="text-center text-muted-foreground ~mt-3/6">
        You don&apos;t have any notifications yet.
      </p>
    );
  }

  if (status === 'error') {
    return (
      <p className="text-center text-destructive ~mt-3/6">
        An error occurred while loading notifications.
      </p>
    );
  }

  return (
    <InfiniteScrollContainer
      className="~space-y-3/6 ~mt-3/6"
      onBottomReached={() =>
        hasNextPage && !isFetchingNextPage && fetchNextPage()
      }
    >
      {notifications.map((notification) => (
        <Notification
          key={`notification-item-${notification.id}`}
          notification={notification}
        />
      ))}

      {isFetchingNextPage && <Loader2 className="mx-auto animate-spin" />}
    </InfiniteScrollContainer>
  );
}
