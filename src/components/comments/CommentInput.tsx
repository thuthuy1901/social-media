import { type PostData } from '@/lib/types';
import { Loader2, SendHorizonal } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { useSubmitCommentMutation } from './mutations';

interface CommentInputProps {
  post: PostData;
}

export default function CommentInput({ post }: CommentInputProps) {
  const [input, setInput] = useState('');

  const mutation = useSubmitCommentMutation(post.id);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!input) return;

    mutation.mutate(
      {
        post,
        content: input,
      },
      {
        onSuccess: () => setInput(''),
      },
    );
  }

  return (
    <form className="flex w-full items-center gap-2" onSubmit={onSubmit}>
      <Input
        placeholder="Write a comment..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        autoFocus
      />
      <Button
        type="submit"
        size="clear"
        className="~px-2/5"
        disabled={!input.trim() || mutation.isPending}
      >
        {!mutation.isPending ? (
          <SendHorizonal className="text-green-main fill-green-second !size-5" />
        ) : (
          <Loader2 className="animate-spin" />
        )}
      </Button>
    </form>
  );
}
