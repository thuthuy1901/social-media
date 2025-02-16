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

interface PostMoreButtonProps {
  post: PostData;
  className?: string;
}

export function PostMoreButton({ post, className }: PostMoreButtonProps) {
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
              <Trash2 className="size-4" /> Delete
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DeletePostDialog
        open={showDelete}
        onClose={() => setShowDelete(false)}
        post={post}
      />
    </>
  );
}
