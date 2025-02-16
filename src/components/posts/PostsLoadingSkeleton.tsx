import { Skeleton } from '../ui/skeleton';

export default function PostsLoadingSkeleton() {
  return (
    <div className="~space-y-3/6 ~mt-3/6">
      <PostLoadingSkeleton />
      <PostLoadingSkeleton />
      <PostLoadingSkeleton />
      <PostLoadingSkeleton />
    </div>
  );
}

function PostLoadingSkeleton() {
  return (
    <div className="bg-bg-main border shadow-md rounded-md ~p-3/5">
      <div className="flex items-center gap-3">
        <Skeleton className="size-8 rounded-full" />
        <div className="flex flex-col gap-1">
          <Skeleton className="h-4 w-24 rounded" />
          <Skeleton className="h-4 w-24 rounded" />
        </div>
      </div>
      <Skeleton className="h-16 rounded mt-3" />
    </div>
  );
}
