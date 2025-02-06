'use client';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import { submitPost } from './action';
import UserAvatar from '@/components/ui/user-avatar';
import { useSession } from '@/app/(main)/SessionProvider';
import { Button } from '@/components/ui/button';

export default function PostEditor() {
  const { user } = useSession();
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

  async function onSubmit() {
    await submitPost(input);
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
          <Button
            variant="transformToBottomBox"
            onClick={onSubmit}
            disabled={!input.trim()}
          >
            Create
          </Button>
        </div>
      </div>
    </div>
  );
}
