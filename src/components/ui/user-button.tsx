'use client';

import { useSession } from '@/app/(main)/SessionProvider';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './dropdown-menu';
import { Button } from './button';
import UserAvatar from './user-avatar';
import Link from 'next/link';
import { ArrowRightFromLine, Contact } from 'lucide-react';
import { logout } from '@/app/(auth)/action';

interface UserButtonProps {
  className?: string;
}

export default function UserButton({}: UserButtonProps) {
  const { user } = useSession();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>
          <UserAvatar avatarUrl={user.avatarUrl} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Logged in as @{user.username}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Link href={`/users/${user.username}`}>
          <DropdownMenuItem>
            <Contact /> Profile
          </DropdownMenuItem>
        </Link>
        <DropdownMenuItem onClick={() => logout()}>
          <ArrowRightFromLine /> Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
