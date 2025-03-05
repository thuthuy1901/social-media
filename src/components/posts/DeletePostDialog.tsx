import { PostData } from '@/lib/types';
import { useDeletePostMutation } from './mutations';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import LoadingButton from '../ui/loading-button';
import { useTranslations } from 'next-intl';

interface DeletePostDialogProps {
  post: PostData;
  open: boolean;
  onClose: () => void;
  button: string;
}

export function DeletePostDialog({
  post,
  open,
  onClose,
  button,
}: DeletePostDialogProps) {
  const t = useTranslations('delete-post-box');
  const mutation = useDeletePostMutation();

  function handleOpenChange(open: boolean) {
    if (!open || !mutation.isPending) {
      onClose();
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-text-title">{t('title')}</DialogTitle>
          <DialogDescription>{t('content')}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <LoadingButton
            variant="transformToBottomBox"
            onClick={() => mutation.mutate(post.id, { onSuccess: onClose })}
            loading={mutation.isPending}
          >
            {button}
          </LoadingButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
