import { cn } from '@/lib/utils';
import { UserRound } from 'lucide-react';
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
    <div
      className={`${classNew} ${size ? '' : 'size-8'} dark:bg-gray-600 border dark:border-white border-gray-300 p-1 overflow-hidden`}
      style={{ width: `${size}px`, height: `${size}px` }}
    >
      <UserRound className="!size-full" />
    </div>
  );
}
