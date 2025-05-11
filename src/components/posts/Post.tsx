'use client';
import type { PostData } from '@/lib/types';
import Link from 'next/link';
import UserAvatar from '../user-avatar';
import { formatRelativeDate } from '@/lib/utils';
import { useSession } from '@/app/(main)/SessionProvider';
import { PostMoreButton } from './PostMoreButton';
import { Linkify } from '../Linkify';
import UserTooltip from '../user-tooltip';
import type { Media } from '@prisma/client';
import Image from 'next/image';
import LikeButton from './LikeButton';
import BookmarkButton from './BookmarkButton';
import { useState } from 'react';
import { MessageSquare } from 'lucide-react';
import Comments from '../comments/Comments';

interface Postprops {
  post: PostData;
}

export default function Post({ post }: Postprops) {
  const { user } = useSession();
  const [showComments, setShowComments] = useState(false);

  return (
    <article className="bg-bg-main border shadow-md rounded-md ~p-3/5 group/post">
      <div className="flex justify-between gap-3">
        <div className="flex items-center gap-3">
          <UserTooltip user={post.user}>
            <Link href={`/users/${post.user.username}`}>
              <UserAvatar avatarUrl={post.user.avatarUrl} size={35} />
            </Link>
          </UserTooltip>
          <div className="flex flex-col">
            <UserTooltip user={post.user}>
              <Link
                href={`/users/${post.user.username}`}
                className="font-bold text-text-title capitalize"
              >
                {post.user.displayName}
              </Link>
            </UserTooltip>
            <Link
              href={`/posts/${post.id}`}
              className="text-xs text-gray-400"
              suppressHydrationWarning
            >
              {formatRelativeDate(post.createdAt)}
            </Link>
          </div>
        </div>
        {post.user.id === user.id && (
          <PostMoreButton
            post={post}
            className="opacity-0 transition-opacity duration-200 group-hover/post:opacity-100"
          />
        )}
      </div>
      <Linkify>
        <div className="whitespace-pre-line break-words mt-3">
          {post.content}
        </div>
      </Linkify>
      {!!post.attachments.length && (
        <div className="~mt-3/5">
          <MediaPreviews attachments={post.attachments} />
        </div>
      )}
      <hr className="mt-5" />
      <div className="mt-3 flex items-center justify-between">
        <LikeButton
          postId={post.id}
          initialState={{
            likes: post._count.likes,
            isLikedByUser: post.likes.some((like) => like.userId === user.id),
          }}
        />
        <CommentButton
          isShow={showComments}
          post={post}
          onClick={() => setShowComments(!showComments)}
        />
        <BookmarkButton
          postId={post.id}
          initialState={{
            isBookmarkedByUser: post.bookmarks.some(
              (bookmark) => bookmark.userId === user.id,
            ),
          }}
        />
      </div>
      {showComments && (
        <>
          <hr className="my-3" />
          <Comments post={post} />
        </>
      )}
    </article>
  );
}

interface MediaPreviewsProps {
  attachments: Media[];
}

function MediaPreviews({ attachments }: MediaPreviewsProps) {
  return (
    <div
      className={`flex flex-col gap-3 ${attachments.length > 1 ? 'sm:grid sm:grid-cols-2' : ''}`}
    >
      {attachments.map((item) => (
        <MediaPreview key={item.id} media={item} />
      ))}
    </div>
  );
}

interface MediaPreviewsProp {
  media: Media;
}

function MediaPreview({ media }: MediaPreviewsProp) {
  if (media.type === 'IMAGE') {
    return (
      <Image
        src={media.url}
        alt="attachment"
        width={500}
        height={500}
        className="mx-auto size-fit max-h-[30rem] rounded-2xl"
      />
    );
  }
  if (media.type === 'VIDEO') {
    return (
      <div>
        <video
          src={media.url}
          controls
          className="mx-auto size-fit max-h-[30rem] rounded-2xl"
        />
      </div>
    );
  }

  return <p className="text-text-second">Unsupported media type</p>;
}

interface CommentButtonProps {
  isShow: boolean;
  post: PostData;
  onClick: () => void;
}

function CommentButton({ post, onClick, isShow }: CommentButtonProps) {
  return (
    <button onClick={onClick} className="flex items-center gap-2">
      <MessageSquare
        className={`size-5 ${isShow ? 'fill-text-title text-text-title' : ''}`}
      />
      <span className="text-sm font-medium tabular-nums">
        {post._count.comments}{' '}
        <span className="hidden sm:inline">comments</span>
      </span>
    </button>
  );
}
