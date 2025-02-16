'use client';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import UserAvatar from '@/components/user-avatar';
import { useSession } from '@/app/(main)/SessionProvider';
import { useSubmitPostMutation } from './mutation';
import LoadingButton from '@/components/ui/loading-button';

export default function PostEditor() {
  const { user } = useSession();

  const mutation = useSubmitPostMutation();

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bold: false,
        italic: false,
      }),
      Placeholder.configure({
        placeholder: "What's your new today?",
      }),
    ],
  });

  const input =
    editor?.getText({
      blockSeparator: '\n',
    }) || '';

  function onSubmit() {
    // await submitPost(input);
    mutation.mutate(input, {
      onSuccess: () => editor?.commands.clearContent(),
    });
    editor?.commands.clearContent();
  }

  return (
    <div>
      <div className="rounded-md border bg-bg-main ~p-3/5 shadow-md">
        <div className="flex items-center gap-5">
          <UserAvatar avatarUrl={user.avatarUrl} className="max-sm:hidden" />
          <EditorContent
            editor={editor}
            className="grow max-h-[20rem] overflow-y-auto border dark:border-white/30 rounded-md bg-black/10 dark:bg-white/10 p-2"
          />
        </div>
        <div className="flex justify-end mt-5">
          <LoadingButton
            variant="transformToBottomBox"
            onClick={onSubmit}
            disabled={!input.trim()}
            loading={mutation.isPending}
          >
            Create
          </LoadingButton>
        </div>
      </div>
    </div>
  );
}
