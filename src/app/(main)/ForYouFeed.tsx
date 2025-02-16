'use client';

import InfiniteScrollContainer from '@/components/infinite-scroll-container';
import Post from '@/components/posts/Post';
import PostsLoadingSkeleton from '@/components/posts/PostsLoadingSkeleton';
import kyInstance from '@/lib/ky';
import { PostsPage } from '@/lib/types';
import { useInfiniteQuery } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';

export default function ForYouFeed() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery({
      queryKey: ['post-feed', 'for-you'],
      queryFn: ({ pageParam }) =>
        kyInstance
          .get(
            '/api/posts/for-you',
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
        No one has posted anything yet
      </p>
    );
  }

  if (status === 'error') {
    return (
      <p className="text-center text-destructive ~mt-3/6">
        An error occurred while loading posts
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
