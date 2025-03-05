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
  Languages,
  Moon,
  Sun,
  SunMoon,
  TvMinimal,
} from 'lucide-react';
import { logout } from '@/app/(auth)/action';
import { useTheme } from 'next-themes';
import { useQueryClient } from '@tanstack/react-query';
import { setUserLocale } from '@/services/locale';

interface UserButtonProps {
  title: string;
  profile: string;
  themeTitle: string;
  themeLight: string;
  themeDark: string;
  themeSystem: string;
  logOut: string;
  languageTitle: string;
  vi: string;
  en: string;
  locale: string;
}

export default function UserButton({
  title,
  profile,
  themeTitle,
  themeLight,
  themeDark,
  themeSystem,
  logOut,
  languageTitle,
  vi,
  en,
  locale,
}: UserButtonProps) {
  const { user } = useSession();
  const { setTheme, theme } = useTheme();

  const queryClient = useQueryClient();
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button>
          <UserAvatar size={32} avatarUrl={user.avatarUrl} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>
          {title} <b className="text-text-title">@{user.username}</b>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Link href={`/users/${user.username}`}>
          <DropdownMenuItem>
            <Contact /> {profile}
          </DropdownMenuItem>
        </Link>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <Languages />
            {languageTitle}
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuItem onClick={() => setUserLocale('vi')}>
                {vi}
                {locale === 'vi' && <Check />}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setUserLocale('en')}>
                {en}
                {locale === 'en' && <Check />}
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <TvMinimal />
            {themeTitle}
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuItem onClick={() => setTheme('light')}>
                <Sun />
                {themeLight}
                {theme === 'light' && <Check />}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme('dark')}>
                <Moon />
                {themeDark}
                {theme === 'dark' && <Check />}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setTheme('system')}>
                <SunMoon />
                {themeSystem}
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
          <ArrowRightFromLine /> {logOut}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
