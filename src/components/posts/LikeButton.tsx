import { useToast } from '@/hooks/use-toast';
import kyInstance from '@/lib/ky';
import type { LikeInfo } from '@/lib/types';
import { cn } from '@/lib/utils';
import {
  type QueryKey,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { Heart } from 'lucide-react';

interface LikeButtonProps {
  postId: string;
  content: string;
  initialState: LikeInfo;
}

export default function LikeButton({
  postId,
  initialState,
  content,
}: LikeButtonProps) {
  const { toast } = useToast();

  const queryClient = useQueryClient();

  const queryKey: QueryKey = ['like-info', postId];

  const { data } = useQuery({
    queryKey,
    queryFn: () =>
      kyInstance.get(`/api/posts/${postId}/likes`).json<LikeInfo>(),
    initialData: initialState,
    staleTime: Infinity,
  });

  const { mutate } = useMutation({
    mutationFn: () =>
      data.isLikedByUser
        ? kyInstance.delete(`/api/posts/${postId}/likes`)
        : kyInstance.post(`/api/posts/${postId}/likes`),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey });

      const previousState = queryClient.getQueryData<LikeInfo>(queryKey);

      queryClient.setQueryData<LikeInfo>(queryKey, () => ({
        likes:
          (previousState?.likes || 0) + (previousState?.isLikedByUser ? -1 : 1),
        isLikedByUser: !previousState?.isLikedByUser,
      }));

      return { previousState };
    },
    onError(error, variables, context) {
      queryClient.setQueryData(queryKey, context?.previousState);
      console.error(error);
      toast({
        variant: 'destructive',
        description: 'Something went wrong. Please try again.',
      });
    },
  });

  return (
    <button onClick={() => mutate()} className="flex items-center gap-2">
      <Heart
        className={cn(
          'size-5',
          data.isLikedByUser && 'fill-text-title text-text-title',
        )}
      />
      <span className="text-sm font-medium tabular-nums">
        {data.likes} <span className="hidden sm:inline">{content}</span>
      </span>
    </button>
  );
}
