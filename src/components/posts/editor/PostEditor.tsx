'use client';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import UserAvatar from '@/components/user-avatar';
import { useSession } from '@/app/(main)/SessionProvider';
import { useSubmitPostMutation } from './mutation';
import LoadingButton from '@/components/ui/loading-button';
import useMediaUpload from './useMediaUpload';
import { useRef } from 'react';

interface PostEditorProps {
  button: string;
}

export default function PostEditor({ button }: PostEditorProps) {
  const { user } = useSession();

  const mutation = useSubmitPostMutation();

  const {
    startUpload,
    attachments,
    isUploading,
    uploadProgress,
    removeAttachment,
    reset: resetMediaUpload,
  } = useMediaUpload();

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
    immediatelyRender: false,
  });

  const input =
    editor?.getText({
      blockSeparator: '\n',
    }) || '';

  function onSubmit() {
    // await submitPost(input);
    mutation.mutate(
      {
        content: input,
        mediaIds: attachments.map((a) => a.mediaId).filter(Boolean) as string[],
      },
      {
        onSuccess: () => {
          editor?.commands.clearContent();
          resetMediaUpload();
        },
      },
    );
    editor?.commands.clearContent();
  }

  return (
    <div>
      <div className="rounded-md border bg-bg-main ~p-3/5 shadow-md">
        <div className="flex items-center gap-5">
          <UserAvatar
            avatarUrl={user.avatarUrl}
            size={40}
            className="max-sm:hidden"
          />
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
            {button}
          </LoadingButton>
        </div>
      </div>
    </div>
  );
}

interface AddAttachmentsButtonProps {
  onFilesSelected: (files: File[]) => void;
  disabled: boolean;
}

function AddAttachmentsButton({
  onFilesSelected,
  disabled,
}: AddAttachmentsButtonProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  return;
}
