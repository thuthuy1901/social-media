'use client';

import InfiniteScrollContainer from '@/components/infinite-scroll-container';
import PostsLoadingSkeleton from '@/components/posts/PostsLoadingSkeleton';
import kyInstance from '@/lib/ky';
import { type NotificationsPage } from '@/lib/types';
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import Notification from './Notification';
import { useEffect } from 'react';
import { useTranslations } from 'next-intl';

export default function Notifications() {
  const t = useTranslations('');
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

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: () => kyInstance.patch('/api/notifications/mark-as-read'),
    onSuccess: () => {
      queryClient.setQueryData(['unread-notification-count'], {
        unreadCount: 0,
      });
    },
    onError(error) {
      console.error('Fail to mark notifications read', error);
    },
  });

  useEffect(() => {
    mutate();
  }, [mutate]);

  const notifications = data?.pages.flatMap((page) => page.notification) || [];

  if (status === 'pending') {
    return <PostsLoadingSkeleton />;
  }

  if (status === 'success' && !notifications.length && !hasNextPage) {
    return (
      <p className="text-center text-muted-foreground ~mt-3/6">
        {t('not-found')}
      </p>
    );
  }

  if (status === 'error') {
    return (
      <p className="text-center text-destructive ~mt-3/6">{t('loading')}</p>
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
          follow={t('follow')}
          comment={t('comment')}
          like={t('like')}
        />
      ))}

      {isFetchingNextPage && <Loader2 className="mx-auto animate-spin" />}
    </InfiniteScrollContainer>
  );
}
