import type { PostData } from '@/lib/types';
import { useEditPostMutation } from './mutations';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import LoadingButton from '../ui/loading-button';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import { cn } from '@/lib/utils';

interface EditPostDialogProps {
  post: PostData;
  open: boolean;
  onClose: () => void;
  button: string;
}

export function EditPostDialog({
  post,
  open,
  onClose,
  button,
}: EditPostDialogProps) {
  const mutation = useEditPostMutation();

  function handleOpenChange(open: boolean) {
    if (!open || !mutation.isPending) {
      onClose();
    }
  }

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bold: false,
        italic: false,
      }),
      Placeholder.configure({
        placeholder: '',
      }),
    ],
    immediatelyRender: false,
    content: post.content,
  });

  const input =
    editor?.getText({
      blockSeparator: '\n',
    }) || '';

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-text-title">Edit Post</DialogTitle>
          <DialogDescription>
            <div className="w-full">
              <EditorContent
                editor={editor}
                className={cn(
                  'grow max-h-[20rem] overflow-y-auto border dark:border-white/30 rounded-md bg-black/10 dark:bg-white/10 p-2',
                )}
              />
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <LoadingButton
            variant="transformToBottomBox"
            onClick={() =>
              mutation.mutate(
                {
                  id: post.id,
                  content: input,
                },
                { onSuccess: onClose },
              )
            }
            loading={mutation.isPending}
            // onClick={() => console.log(post)}
          >
            {button}
          </LoadingButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
