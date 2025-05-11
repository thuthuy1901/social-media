'use server';

import { validateRequest } from '@/auth';
import prisma from '@/lib/prisma';
import { getCommentDataInclude, type PostData } from '@/lib/types';
import { createCommentSchema, editCommentSchema } from '@/lib/validation';

export async function submitComment({
  post,
  content,
}: {
  post: PostData;
  content: string;
}) {
  const { user } = await validateRequest();

  if (!user) throw new Error('Unauthorized');

  const { content: contentValidated } = createCommentSchema.parse({ content });

  const [newComment] = await prisma.$transaction([
    prisma.comment.create({
      data: {
        content: contentValidated,
        postId: post.id,
        userId: user.id,
      },
      include: getCommentDataInclude(user.id),
    }),
    ...(post.user.id !== user.id
      ? [
          prisma.notification.create({
            data: {
              issuerId: user.id,
              recipientId: post.user.id,
              postId: post.id,
              type: 'COMMENT',
            },
          }),
        ]
      : []),
  ]);

  return newComment;
}

export async function deleteComment(id: string) {
  const { user } = await validateRequest();

  if (!user) throw new Error('Unauthorized');

  const comment = await prisma.comment.findUnique({
    where: { id },
  });

  if (!comment) throw new Error('Comment not found');

  if (comment.userId !== user.id) throw new Error('Unauthorized');

  const deletedComment = await prisma.comment.delete({
    where: { id },
    include: getCommentDataInclude(user.id),
  });

  return deletedComment;
}

export async function editComment(input: { id: string; content: string }) {
  const { user } = await validateRequest();

  if (!user) throw new Error('Unauthorized');

  const { id, content } = editCommentSchema.parse(input);

  const comment = await prisma.comment.findUnique({
    where: { id },
  });

  if (!comment) throw new Error('Comment not found');
  if (comment.userId !== user.id) throw new Error('Unauthorized');

  const updatedComment = await prisma.comment.update({
    where: { id },
    data: {
      content,
    },
    include: getCommentDataInclude(user.id),
  });

  return updatedComment;
}
