'use client';

import InfiniteScrollContainer from '@/components/infinite-scroll-container';
import Post from '@/components/posts/Post';
import PostsLoadingSkeleton from '@/components/posts/PostsLoadingSkeleton';
import kyInstance from '@/lib/ky';
import { type PostsPage } from '@/lib/types';
import { useInfiniteQuery } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';

interface SearchResultsProps {
  query: string;
  language: {
    notFound: string;
    errorLoading: string;
  };
}

export default function SearchResults({ query, language }: SearchResultsProps) {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ['post-feed', 'search', query],
    queryFn: ({ pageParam }) =>
      kyInstance
        .get('/api/search', {
          searchParams: {
            q: query,
            ...(pageParam ? { cursor: pageParam } : {}),
          },
        })
        .json<PostsPage>(),
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    gcTime: 0,
  });

  const posts = data?.pages.flatMap((page) => page.posts) || [];

  if (status === 'pending') {
    return <PostsLoadingSkeleton />;
  }

  if (status === 'success' && !posts.length && !hasNextPage) {
    return (
      <p className="text-center text-muted-foreground">{language.notFound}</p>
    );
  }

  if (status === 'error') {
    return (
      <p className="text-center text-destructive">{language.errorLoading}</p>
    );
  }

  return (
    <InfiniteScrollContainer
      className="space-y-5"
      onBottomReached={() => hasNextPage && !isFetching && fetchNextPage()}
    >
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
      {isFetchingNextPage && <Loader2 className="mx-auto my-3 animate-spin" />}
    </InfiniteScrollContainer>
  );
}
