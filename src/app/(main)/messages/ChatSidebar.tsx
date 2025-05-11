import {
  ChannelList,
  ChannelPreviewMessenger,
  type ChannelPreviewUIComponentProps,
  useChatContext,
} from 'stream-chat-react';
import { useSession } from '../SessionProvider';
import { Button } from '@/components/ui/button';
import { MailPlus, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useCallback, useEffect, useState } from 'react';
import NewChatDialog from './NewChatDialog';
import { useQueryClient } from '@tanstack/react-query';

interface ChatSidebarProps {
  open: boolean;
  onClose: () => void;
}

export default function ChatSidebar({ open, onClose }: ChatSidebarProps) {
  const { user } = useSession();

  const queryClient = useQueryClient();

  const { channel } = useChatContext();

  useEffect(() => {
    if (channel?.id) {
      console.log(1);
      queryClient.invalidateQueries({ queryKey: ['unread-messages-count'] });
    }
  }, [channel?.id, queryClient]);

  const ChannelPreviewCustom = useCallback(
    (props: ChannelPreviewUIComponentProps) => {
      return (
        <ChannelPreviewMessenger
          {...props}
          onSelect={() => {
            props.setActiveChannel?.(props.channel, props.watchers);
            onClose();
          }}
        />
      );
    },
    [onClose],
  );

  return (
    <div
      className={cn(
        'size-full flex-col border-e md:w-72',
        open ? 'flex' : 'hidden md:flex',
      )}
    >
      <MenuHeader onClose={onClose} />
      <ChannelList
        filters={{
          type: 'messaging',
          members: { $in: [user.id] },
        }}
        showChannelSearch
        options={{ state: true, presence: true, limit: 8 }}
        sort={{ last_message_at: -1 }}
        additionalChannelSearchProps={{
          searchForChannels: true,
          searchQueryParams: {
            channelFilters: {
              filters: {
                members: { $in: [user.id] },
              },
            },
          },
        }}
        Preview={ChannelPreviewCustom}
      />
    </div>
  );
}

interface MenuHeaderProps {
  onClose: () => void;
}

function MenuHeader({ onClose }: MenuHeaderProps) {
  const [showNewChatDialog, setShowNewChatDialog] = useState(false);
  return (
    <>
      <div className="flex items-center gap-3 p-2">
        <div className="h-full flex w-full">
          <Button onClick={onClose} className="md:hidden">
            <X className="size-5" />
          </Button>
          <h1 className="~text-lg/xl font-bold">Messages</h1>
          <Button
            title="Start new chat"
            onClick={() => setShowNewChatDialog(true)}
            className="ml-auto w-fit"
          >
            <MailPlus className="size-5" />
          </Button>
        </div>
      </div>
      {showNewChatDialog && (
        <NewChatDialog
          onOpenChange={setShowNewChatDialog}
          onChatCreated={() => {
            setShowNewChatDialog(false);
            onClose();
          }}
        />
      )}
    </>
  );
}
