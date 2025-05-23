import { z } from 'zod';

const requiredString = z.string().trim().min(1, 'Required');

export const signUpSchema = z.object({
  email: requiredString.email('Invalid email address'),
  username: requiredString.regex(
    /^[a-zA-Z0-9_-]+$/,
    'Only letters, numbers, - and _ allowed',
  ),
  password: requiredString.min(6, 'Must be at least 6 characters'),
});

export type SignUpValues = z.infer<typeof signUpSchema>;

export const loginSchema = z.object({
  username: requiredString,
  password: requiredString,
});

export type LoginValue = z.infer<typeof loginSchema>;

export const createPostSchema = z.object({
  content: requiredString,
  mediaIds: z.array(z.string()).max(5, 'Cannot have more than 5 attachments!'),
});

export const editPostSchema = z.object({
  id: requiredString,
  content: requiredString,
});

export const updateUserProfileSchema = z.object({
  displayName: requiredString,
  bio: z.string().max(1000, 'Must be at most 1000 characters'),
});

export type UpdateUserProfileValues = z.infer<typeof updateUserProfileSchema>;

export const createCommentSchema = z.object({
  content: requiredString,
});

export const editCommentSchema = z.object({
  id: requiredString,
  content: requiredString,
});
