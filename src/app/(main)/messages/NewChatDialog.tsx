import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import {
  type DefaultStreamChatGenerics,
  useChatContext,
} from 'stream-chat-react';
import { useSession } from '../SessionProvider';
import useDebouce from '@/hooks/useDebounce';
import { type UserResponse } from 'stream-chat';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Check, Loader2, SearchIcon, X } from 'lucide-react';
import UserAvatar from '@/components/user-avatar';
import LoadingButton from '@/components/ui/loading-button';

interface NewChatDialogProps {
  onOpenChange: (open: boolean) => void;
  onChatCreated: () => void;
}

export default function NewChatDialog({
  onOpenChange,
  onChatCreated,
}: NewChatDialogProps) {
  const { client, setActiveChannel } = useChatContext();
  const { toast } = useToast();
  const { user: loggedInUser } = useSession();

  const [searchInput, setSearchInput] = useState('');
  const searchInputDebounced = useDebouce(searchInput);

  const [selectedUsers, setSelectedUsers] = useState<
    UserResponse<DefaultStreamChatGenerics>[]
  >([]);

  const { data, isFetching, isError, isSuccess } = useQuery({
    queryKey: ['stream-users', searchInputDebounced],
    queryFn: async () =>
      client.queryUsers(
        {
          id: { $ne: loggedInUser.id },
          role: { $ne: 'admin' },
          ...(searchInputDebounced
            ? {
                $or: [
                  { name: { $autocomplete: searchInputDebounced } },
                  { username: { $autocomplete: searchInputDebounced } },
                ],
              }
            : {}),
        },
        { name: 1, username: 1 },
        { limit: 15 },
      ),
  });

  const mutation = useMutation({
    mutationFn: async () => {
      const channel = client.channel('messaging', {
        members: [loggedInUser.id, ...selectedUsers.map((u) => u.id)],
        name:
          selectedUsers.length > 1
            ? loggedInUser.displayName +
              ', ' +
              selectedUsers.map((u) => u.name).join(', ')
            : undefined,
      });

      await channel.create();
      return channel;
    },
    onSuccess: (channel) => {
      setActiveChannel(channel);
      onChatCreated();
    },
    onError(error) {
      console.error('Error starting chat', error);
      toast({
        variant: 'destructive',
        description: 'Error starting chat. Please try again.',
      });
    },
  });

  return (
    <Dialog open onOpenChange={onOpenChange}>
      <DialogContent className="bg-background p-0">
        <DialogHeader className="~px-3/6 ~pt-3/6">
          <DialogTitle>New chat</DialogTitle>
        </DialogHeader>
        <div>
          <div className="group relative">
            <SearchIcon className="absolute ~left-2/5 top-1/2 size-5 -translate-y-1/2 transform text-text-title group-focus-within:text-green-main" />
            <input
              placeholder="Search users..."
              className="h-12 w-full ~pe-2/4 ~ps-9/14 focus:outline-none bg-green-second/10"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </div>
          {!!selectedUsers.length && (
            <div className="mt-4 flex flex-wrap gap-2 p-2">
              {selectedUsers.map((user) => (
                <SelectedUserTag
                  key={user.id}
                  user={user}
                  onRemove={() =>
                    setSelectedUsers((prev) =>
                      prev.filter((u) => u.id !== user.id),
                    )
                  }
                />
              ))}
            </div>
          )}
          <hr />
          <div className="h-96 overflow-y-auto">
            {isSuccess &&
              data.users.map((user) => (
                <UserResult
                  key={user.id}
                  user={user}
                  selected={selectedUsers.some((u) => u.id === user.id)}
                  onClick={() =>
                    setSelectedUsers((prev) =>
                      prev.some((u) => u.id === user.id)
                        ? prev.filter((u) => u.id !== user.id)
                        : [...prev, user],
                    )
                  }
                />
              ))}
            {isSuccess && !data.users.length && (
              <p className="~text-xs/base text-center ~mt-3/6">
                No users found. Try a different name.
              </p>
            )}
            {isFetching && <Loader2 className="mx-auto my-3 animate-spin" />}
            {isError && (
              <p className="~text-xs/base text-center ~mt-3/6">
                An error occurred with loading users.
              </p>
            )}
          </div>
        </div>
        <DialogFooter className="~px-3/6 ~pb-3/6">
          <LoadingButton
            disabled={!selectedUsers.length}
            loading={mutation.isPending}
            onClick={() => mutation.mutate()}
            type="submit"
            variant="transformToBottomBox"
            className="dark:bg-green-main dark:before:border-green-main"
          >
            Start chat
          </LoadingButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

interface UserResultProps {
  user: UserResponse<DefaultStreamChatGenerics>;
  selected: boolean;
  onClick: () => void;
}

function UserResult({ user, selected, onClick }: UserResultProps) {
  return (
    <button
      className="flex w-full items-center justify-between px-4 py-2.5 transition-colors hover:bg-green-second/10"
      onClick={onClick}
    >
      <div className="flex items-center gap-2">
        <UserAvatar avatarUrl={user.image} size={35} />
        <div className="flex flex-col text-start">
          <p className="font-bold capitalize">{user.name}</p>
          <p className="text-xs text-gray-400">@{user.username}</p>
        </div>
      </div>
      {selected && <Check className="size-5 text-text-second" />}
    </button>
  );
}

interface SelectedUserTagProps {
  user: UserResponse<DefaultStreamChatGenerics>;
  onRemove: () => void;
}

function SelectedUserTag({ user, onRemove }: SelectedUserTagProps) {
  return (
    <button
      onClick={onRemove}
      className="flex items-center gap-1 rounded-full border p-1 hover:bg-green-second/10"
    >
      <UserAvatar avatarUrl={user.image} size={20} />
      <p className="font-bold capitalize text-xs">{user.name}</p>
      <X className="mx-2 size-3 text-text-second" />
    </button>
  );
}
