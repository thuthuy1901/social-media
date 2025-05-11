'use client';

import useFollowerInfo from '@/hooks/useFollowerInfo';
import kyInstance from '@/lib/ky';
import { type FollowerInfo } from '@/lib/types';
import {
  type QueryKey,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { Button } from './ui/button';
import { useToast } from '@/hooks/use-toast';
import { useTranslations } from 'next-intl';

interface FollowButtonProps {
  userId: string;
  initialState: FollowerInfo;
}

export default function FollowButton({
  userId,
  initialState,
}: FollowButtonProps) {
  const t = useTranslations('button-follow');
  const { toast } = useToast();

  const queryClient = useQueryClient();

  const { data } = useFollowerInfo(userId, initialState);

  const queryKey: QueryKey = ['follower-info', userId];

  const { mutate } = useMutation({
    mutationFn: () =>
      data.isFollowedByUser
        ? kyInstance.delete(`/api/users/${userId}/followers`)
        : kyInstance.post(`/api/users/${userId}/followers`),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey });

      const previousState = queryClient.getQueryData<FollowerInfo>(queryKey);

      queryClient.setQueryData<FollowerInfo>(queryKey, () => ({
        followers:
          (previousState?.followers || 0) +
          (previousState?.isFollowedByUser ? -1 : 1),
        isFollowedByUser: !previousState?.isFollowedByUser,
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
    <Button
      variant={data.isFollowedByUser ? 'dotted' : 'dottedRadius'}
      size="small"
      className="capitalize font-semibold text-xs h-fit"
      onClick={() => mutate()}
    >
      {data.isFollowedByUser ? t('unFollow') : t('follow')}
    </Button>
  );
}
