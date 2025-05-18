'use client';
import type { PostData } from '@/lib/types';
import { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Button } from '../ui/button';
import { MoreHorizontal, PencilLine, Trash2 } from 'lucide-react';
import { DeletePostDialog } from './DeletePostDialog';
import { EditPostDialog } from './EditPostDialog';

interface PostMoreButtonProps {
  post: PostData;
  className?: string;
  contentLanguage: {
    buttonEdit: string;
    buttonDelete: string;
  };
}

export function PostMoreButton({
  post,
  className,
  contentLanguage,
}: PostMoreButtonProps) {
  const [showDelete, setShowDelete] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  return (
    <>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger>
          <Button className={className} size="clear">
            <MoreHorizontal className="size-5 text-muted-foreground" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => setShowEdit(true)}>
            <div className="flex items-center gap-3 font-semibold">
              <PencilLine className="size-4" /> {contentLanguage.buttonEdit}
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setShowDelete(true)}>
            <div className="flex items-center gap-3 text-destructive font-semibold">
              <Trash2 className="size-4" /> {contentLanguage.buttonDelete}
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DeletePostDialog
        open={showDelete}
        onClose={() => setShowDelete(false)}
        post={post}
        button={contentLanguage.buttonDelete}
      />
      <EditPostDialog
        open={showEdit}
        onClose={() => setShowEdit(false)}
        post={post}
        button={contentLanguage.buttonEdit}
      />
    </>
  );
}
