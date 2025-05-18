'use client';

import { Button } from '@/components/ui/button';
import kyInstance from '@/lib/ky';
import { type MessageCountInfo } from '@/lib/types';
import { useQuery } from '@tanstack/react-query';
import { Mail } from 'lucide-react';
import Link from 'next/link';

interface MessagesButtonProps {
  initialState: MessageCountInfo;
  content: string;
}

export default function MessagesButton({
  initialState,
  content,
}: MessagesButtonProps) {
  const { data } = useQuery({
    queryKey: ['unread-messages-count'],
    queryFn: () =>
      kyInstance.get('/api/messages/unread-count').json<MessageCountInfo>(),
    initialData: initialState,
    refetchInterval: 60 * 1000,
  });

  return (
    <Button title={content} className="justify-start" variant="navBarItem">
      <Link href="/messages" className="flex items-center gap-2">
        <div className="relative">
          <Mail />
          {!!data.unreadCount && (
            <span className="absolute -right-1 -top-1 rounded-full bg-text-title text-white dark:text-black size-3 min-h-3 min-w-3 text-[8px] leading-3 font-medium tabular-nums">
              {data.unreadCount}
            </span>
          )}
        </div>
        <span className="hidden lg:inline font-semibold">{content}</span>
      </Link>
    </Button>
  );
}
