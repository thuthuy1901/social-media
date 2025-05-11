'use client';

import { Button } from '@/components/ui/button';
import kyInstance from '@/lib/ky';
import { NotificationCountInfo } from '@/lib/types';
import { useQuery } from '@tanstack/react-query';
import { Bell } from 'lucide-react';
import Link from 'next/link';

interface NotificationButtonProps {
  initialState: NotificationCountInfo;
}

export default function NotificationButton({
  initialState,
}: NotificationButtonProps) {
  const { data } = useQuery({
    queryKey: ['unread-notification-count'],
    queryFn: () =>
      kyInstance
        .get('/api/notifications/unread-count')
        .json<NotificationCountInfo>(),
    initialData: initialState,
    refetchInterval: 60 * 1000,
  });
  return (
    <Button
      title="Notifications"
      className="justify-start"
      variant="navBarItem"
    >
      <Link href="/notifications" className="flex items-center gap-2">
        <div className="relative">
          <Bell />
          {!!data.unreadCount && (
            <span className="absolute -right-1 -top-1 rounded-full bg-text-title text-white dark:text-black size-3 min-h-3 min-w-3 text-[8px] leading-3 font-medium tabular-nums">
              {data.unreadCount}
            </span>
          )}
        </div>
        <span className="hidden lg:inline font-semibold">Notification</span>
      </Link>
    </Button>
  );
}
