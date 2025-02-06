import { PostData } from '@/lib/types';
import Link from 'next/link';
import UserAvatar from '../ui/user-avatar';
import { formatRelativeDate } from '@/lib/utils';

interface Postprops {
  post: PostData;
}

export default function Post({ post }: Postprops) {
  return (
    <article className="bg-bg-main border shadow-md rounded-md ~p-3/5">
      <div className="flex items-center gap-3">
        <Link href={`/users/${post.user.username}`}>
          <UserAvatar avatarUrl={post.user.avatarUrl} size={30} />
        </Link>
        <div className="flex flex-col">
          <Link
            href={`/users/${post.user.username}`}
            className="font-bold text-text-title capitalize"
          >
            {post.user.displayName}
          </Link>
          <Link href={`/posts/${post.id}`} className="text-xs text-gray-400">
            {formatRelativeDate(post.createdAt)}
          </Link>
        </div>
      </div>
      <div className="whitespace-pre-line break-words mt-3">{post.content}</div>
    </article>
  );
}
