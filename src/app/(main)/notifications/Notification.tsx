import UserAvatar from '@/components/user-avatar';
import { NotificationData } from '@/lib/types';
import { cn } from '@/lib/utils';
import { NotificationType } from '@prisma/client';
import { Heart, MessageSquare, User2 } from 'lucide-react';
import Link from 'next/link';
import { JSX } from 'react';

interface NotificationProps {
  notification: NotificationData;
}

export default function Notification({ notification }: NotificationProps) {
  const notificationTypeMap: Record<
    NotificationType,
    { message: string; icon: JSX.Element; href: string }
  > = {
    FOLLOW: {
      message: `${notification.issuer.displayName} followed you`,
      icon: <User2 className="~size-5/7 text-text-title fill-text-title" />,
      href: `/users/${notification.issuer.username}`,
    },
    COMMENT: {
      message: `${notification.issuer.displayName} commented on your post`,
      icon: (
        <MessageSquare className="~size-5/7 text-text-title fill-text-title" />
      ),
      href: `/posts/${notification.postId}`,
    },
    LIKE: {
      message: `${notification.issuer.displayName} liked your post`,
      icon: <Heart className="~size-5/7 text-text-title fill-text-title" />,
      href: `/posts/${notification.postId}`,
    },
  };

  const { message, icon, href } = notificationTypeMap[notification.type];

  return (
    <Link href={href} className="block">
      <article
        className={cn(
          'flex ~gap-2/3 rounded-md bg-bg-main border ~p-3/5 hover:bg-black/5 dark:hover:bg-white/30',
          !notification.read && 'bg-bg-second',
        )}
      >
        <div className="my-1">{icon}</div>
        <div className="">
          <UserAvatar avatarUrl={notification.issuer.avatarUrl} size={36} />
          <div className="mt-2">
            <span className="font-bold capitalize">
              {notification.issuer.displayName}
            </span>{' '}
            <span>{message}</span>
          </div>
          {notification.post && (
            <div className="line-clamp-3 whitespace-pre-line text-gray-400 ~text-sm/base">
              {notification.post.content}
            </div>
          )}
        </div>
      </article>
    </Link>
  );
}
