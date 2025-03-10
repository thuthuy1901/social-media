'use client';
import { PostData } from '@/lib/types';
import { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Button } from '../ui/button';
import { MoreHorizontal, Trash2 } from 'lucide-react';
import { DeletePostDialog } from './DeletePostDialog';
import { useTranslations } from 'next-intl';

interface PostMoreButtonProps {
  post: PostData;
  className?: string;
}

export function PostMoreButton({ post, className }: PostMoreButtonProps) {
  const t = useTranslations('button');
  const [showDelete, setShowDelete] = useState(false);

  return (
    <>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger>
          <Button className={className} size="clear">
            <MoreHorizontal className="size-5 text-muted-foreground" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => setShowDelete(true)}>
            <div className="flex items-center gap-3 text-destructive font-semibold">
              <Trash2 className="size-4" /> {t('delete')}
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DeletePostDialog
        open={showDelete}
        onClose={() => setShowDelete(false)}
        post={post}
        button={t('delete')}
      />
    </>
  );
}
