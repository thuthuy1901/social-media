import { validateRequest } from '@/auth';
import { Button } from '@/components/ui/button';
import prisma from '@/lib/prisma';
import { Bookmark, Home, Mail } from 'lucide-react';
import Link from 'next/link';
import NotificationButton from './NoticationsButton';
import MessagesButton from './MessagesButton';
import streamServerClient from '@/lib/stream';
import { getTranslations } from 'next-intl/server';

interface MenuBarProps {
  className?: string;
}

const MenuBar = async ({ className = '' }: MenuBarProps) => {
  const t = await getTranslations('home');
  const { user } = await validateRequest();
  if (!user) return null;

  const [unreadNotification, unreadMessagesCount] = await Promise.all([
    prisma.notification.count({
      where: {
        recipientId: user.id,
        read: false,
      },
    }),
    (await streamServerClient.getUnreadCount(user.id)).total_unread_count,
  ]);

  return (
    <section className={className}>
      <Button
        title={t('menu-bar.home')}
        className="justify-start"
        variant="navBarItem"
      >
        <Link href="/" className="flex items-center gap-2">
          <Home />
          <span className="hidden lg:inline font-semibold">
            {t('menu-bar.home')}
          </span>
        </Link>
      </Button>
      <NotificationButton
        initialState={{ unreadCount: unreadNotification }}
        content={t('menu-bar.notification')}
      />
      <MessagesButton
        initialState={{ unreadCount: unreadMessagesCount }}
        content={t('menu-bar.message')}
      />
      <Button
        title={t('menu-bar.bookmark')}
        className="justify-start"
        variant="navBarItem"
      >
        <Link href="/bookmarks" className="flex items-center gap-2">
          <Bookmark />
          <span className="hidden lg:inline font-semibold">
            {t('menu-bar.bookmark')}
          </span>
        </Link>
      </Button>
    </section>
  );
};

export default MenuBar;
