'use server';

import { validateRequest } from '@/auth';
import prisma from '@/lib/prisma';
import { getPostDataInclude } from '@/lib/types';
import { editPostSchema } from '@/lib/validation';

export async function deletePost(id: string) {
  const { user } = await validateRequest();

  if (!user) throw new Error('Unauthorized');

  const post = await prisma.post.findUnique({
    where: { id },
  });

  if (!post) throw new Error('Post not found');

  if (post.userId !== user.id) throw new Error('Unauthorized');

  const deletePost = await prisma.post.delete({
    where: { id },
    include: getPostDataInclude(user.id),
  });

  return deletePost;
}

export async function editPost(input: { id: string; content: string }) {
  const { user } = await validateRequest();

  if (!user) throw new Error('Unauthorized');

  const { id, content } = editPostSchema.parse(input);

  const post = await prisma.post.findUnique({
    where: { id },
  });

  if (!post) throw new Error('Post not found');
  if (post.userId !== user.id) throw new Error('Unauthorized');

  const updatedPost = await prisma.post.update({
    where: { id },
    data: {
      content,
    },
    include: getPostDataInclude(user.id),
  });

  return updatedPost;
}
