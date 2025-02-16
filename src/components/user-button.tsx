'use client';

import { useSession } from '@/app/(main)/SessionProvider';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Button } from './ui/button';
import UserAvatar from './user-avatar';
import Link from 'next/link';
import {
  ArrowRightFromLine,
  Check,
  Contact,
  Moon,
  Sun,
  SunMoon,
  TvMinimal,
} from 'lucide-react';
import { logout } from '@/app/(auth)/action';
import { useTheme } from 'next-themes';
import { useQueryClient } from '@tanstack/react-query';

interface UserButtonProps {
  className?: string;
}

export default function UserButton({}: UserButtonProps) {
  const { user } = useSession();
  const { setTheme, theme } = useTheme();

  const queryClient = useQueryClient();

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button>
          <UserAvatar avatarUrl={user.avatarUrl} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>
          Logged in as <b className="text-text-title">@{user.username}</b>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Link href={`/users/${user.username}`}>
          <DropdownMenuItem>
            <Contact /> Profile
          </DropdownMenuItem>
        </Link>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <TvMinimal />
            Theme
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuItem onClick={() => setTheme('light')}>
                <Sun />
                Light
                {theme === 'light' && <Check />}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme('dark')}>
                <Moon />
                Dark
                {theme === 'dark' && <Check />}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setTheme('system')}>
                <SunMoon />
                System
                {theme === 'system' && <Check />}
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            queryClient.clear();
            logout();
          }}
        >
          <ArrowRightFromLine /> Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
