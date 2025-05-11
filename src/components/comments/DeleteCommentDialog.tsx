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
import { useDeleteCommentMutation } from './mutations';
import LoadingButton from '../ui/loading-button';

interface DeleteCommentDialogProps {
  comment: CommentData;
  open: boolean;
  onClose: () => void;
}

export default function DeleteCommentDialog({
  comment,
  open,
  onClose,
}: DeleteCommentDialogProps) {
  const mutation = useDeleteCommentMutation();

  function handleOpenChange(open: boolean) {
    if (!open || !mutation.isPending) {
      onClose();
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-text-title">Delete comment?</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this comment? This action cannot be
            undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <div className="flex items-center gap-5">
            <LoadingButton
              variant="transformToBottomBox"
              onClick={() =>
                mutation.mutate(comment.id, { onSuccess: onClose })
              }
              loading={mutation.isPending}
            >
              Delete
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
