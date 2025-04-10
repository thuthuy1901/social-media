import { Button } from '@/components/ui/button';
import { Bell, Bookmark, Home, Mail } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

interface MenuBarProps {
  className?: string;
}

const MenuBar = ({ className = '' }: MenuBarProps) => {
  const t = useTranslations('home.menu-bar');
  return (
    <section className={className}>
      <Button title="Home" className="justify-start" variant="navBarItem">
        <Link href="/" className="flex items-center gap-2">
          <Home />
          <span className="hidden lg:inline font-semibold">{t('home')}</span>
        </Link>
      </Button>
      <Button
        title="Notifications"
        className="justify-start"
        variant="navBarItem"
      >
        <Link href="/notifications" className="flex items-center gap-2">
          <Bell />
          <span className="hidden lg:inline font-semibold">
            {t('notification')}
          </span>
        </Link>
      </Button>
      <Button title="Messages" className="justify-start" variant="navBarItem">
        <Link href="/messages" className="flex items-center gap-2">
          <Mail />
          <span className="hidden lg:inline font-semibold">{t('message')}</span>
        </Link>
      </Button>
      <Button title="Bookmarks" className="justify-start" variant="navBarItem">
        <Link href="/bookmarks" className="flex items-center gap-2">
          <Bookmark />
          <span className="hidden lg:inline font-semibold">
            {t('bookmark')}
          </span>
        </Link>
      </Button>
    </section>
  );
};

export default MenuBar;
