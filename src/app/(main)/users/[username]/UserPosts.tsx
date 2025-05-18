'use client';

import InfiniteScrollContainer from '@/components/infinite-scroll-container';
import Post from '@/components/posts/Post';
import PostsLoadingSkeleton from '@/components/posts/PostsLoadingSkeleton';
import kyInstance from '@/lib/ky';
import { type PostsPage } from '@/lib/types';
import { useInfiniteQuery } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';

interface UserPostsProps {
  userId: string;
  language: {
    errorPost: string;
    errorLoading: string;
  };
}

export default function UserPosts({ userId, language }: UserPostsProps) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery({
      queryKey: ['post-feed', 'user-posts', userId],
      queryFn: ({ pageParam }) =>
        kyInstance
          .get(
            `/api/users/${userId}/posts`,
            pageParam ? { searchParams: { cursor: pageParam } } : {},
          )
          .json<PostsPage>(),
      initialPageParam: null as string | null,
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    });

  const posts = data?.pages.flatMap((page) => page.posts) || [];

  if (status === 'pending') {
    return <PostsLoadingSkeleton />;
  }

  if (status === 'success' && !posts.length && !hasNextPage) {
    return (
      <p className="text-center text-muted-foreground ~mt-3/6">
        {language.errorPost}
      </p>
    );
  }

  if (status === 'error') {
    return (
      <p className="text-center text-destructive ~mt-3/6">
        {language.errorPost}
      </p>
    );
  }

  return (
    <InfiniteScrollContainer
      className="~space-y-3/6 ~mt-3/6"
      onBottomReached={() =>
        hasNextPage && !isFetchingNextPage && fetchNextPage()
      }
    >
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}

      {isFetchingNextPage && <Loader2 className="mx-auto animate-spin" />}
    </InfiniteScrollContainer>
  );
}
