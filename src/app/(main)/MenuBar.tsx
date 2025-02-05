import { Button } from '@/components/ui/button';
import { Bell, Bookmark, Home, Mail } from 'lucide-react';
import Link from 'next/link';

interface MenuBarProps {
  className?: string;
}

const MenuBar = ({ className = '' }: MenuBarProps) => {
  return (
    <section className={className}>
      <Button title="Home" className="justify-start" variant="navBarItem">
        <Link href="/" className="flex items-center gap-2">
          <Home />
          <span className="hidden lg:inline font-semibold">Home</span>
        </Link>
      </Button>
      <Button
        title="Notifications"
        className="justify-start"
        variant="navBarItem"
      >
        <Link href="/notifications" className="flex items-center gap-2">
          <Bell />
          <span className="hidden lg:inline font-semibold">Notifications</span>
        </Link>
      </Button>
      <Button title="Messages" className="justify-start" variant="navBarItem">
        <Link href="/messages" className="flex items-center gap-2">
          <Mail />
          <span className="hidden lg:inline font-semibold">Messages</span>
        </Link>
      </Button>
      <Button title="Bookmarks" className="justify-start" variant="navBarItem">
        <Link href="/bookmarks" className="flex items-center gap-2">
          <Bookmark />
          <span className="hidden lg:inline font-semibold">Bookmarks</span>
        </Link>
      </Button>
    </section>
  );
};

export default MenuBar;
