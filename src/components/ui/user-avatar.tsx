import { cn } from '@/lib/utils';
import { User } from 'lucide-react';
import Image from 'next/image';

interface UserAvatarProps {
  avatarUrl: string | null | undefined;
  size?: number;
  className?: string;
}

export default function UserAvatar({
  avatarUrl,
  size = 48,
  className = '',
}: UserAvatarProps) {
  const classNew = cn(
    'aspect-square h-fit flex-none rounded-full bg-blue-second object-cover',
    className,
  );
  return avatarUrl ? (
    <Image
      src={avatarUrl}
      alt="avatar user"
      className={classNew}
      width={size}
      height={size}
    />
  ) : (
    <User className={`!~size-4/8 ${classNew}`} />
  );
}
