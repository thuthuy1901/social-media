'use client';

import { Loader2 } from 'lucide-react';
import useInitializeChatClient from './useInitializeChatClient';
import { Chat as StreamChat } from 'stream-chat-react';
import ChatSidebar from './ChatSidebar';
import ChatChannel from './ChatChannel';
import { useTheme } from 'next-themes';
import { useState } from 'react';

export default function Chat() {
  const chatClient = useInitializeChatClient();

  const { resolvedTheme } = useTheme();

  const [siderbarOpen, setSidebarOpen] = useState(false);

  if (!chatClient) return <Loader2 className="mx-auto my-3 animate-spin" />;

  return (
    <main className="relative w-full overflow-hidden bg-bg-main border rounded-md shadow-md">
      <div className="absolute bottom-0 top-0 flex w-full">
        <StreamChat
          client={chatClient}
          theme={
            resolvedTheme === 'dark'
              ? 'str-chat__theme-dark'
              : 'str-chat__theme-light'
          }
        >
          <ChatSidebar
            open={siderbarOpen}
            onClose={() => setSidebarOpen(false)}
          />
          <ChatChannel
            open={!siderbarOpen}
            openSidebar={() => setSidebarOpen(true)}
          />
        </StreamChat>
      </div>
    </main>
  );
}
