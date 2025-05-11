import type { CommentData } from '@/lib/types';
import { Button } from '../ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { useEditCommentMutation } from './mutations';
import LoadingButton from '../ui/loading-button';
import { Input } from '../ui/input';
import { useState } from 'react';

interface EditCommentDialogProps {
  comment: CommentData;
  open: boolean;
  onClose: () => void;
}

export default function EditCommentDialog({
  comment,
  open,
  onClose,
}: EditCommentDialogProps) {
  const [input, setInput] = useState(comment.content);
  const mutation = useEditCommentMutation();

  function handleOpenChange(open: boolean) {
    if (!open || !mutation.isPending) {
      onClose();
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-text-title">Edit comment</DialogTitle>
          <DialogDescription>
            <Input
              placeholder=""
              value={input}
              onChange={(e) => setInput(e.target.value)}
              autoFocus
            />
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <div className="flex items-center gap-5">
            <LoadingButton
              variant="transformToBottomBox"
              onClick={() =>
                mutation.mutate(
                  {
                    id: comment.id,
                    content: input,
                  },
                  { onSuccess: onClose },
                )
              }
              loading={mutation.isPending}
            >
              Submit
            </LoadingButton>
            <Button
              variant="transformToBottomBox"
              onClick={onClose}
              disabled={mutation.isPending}
            >
              Cancel
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
