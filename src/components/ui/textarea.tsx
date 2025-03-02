import * as React from 'react';

import { cn } from '@/lib/utils';

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<'textarea'>
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        'flex min-h-[80px] w-full rounded-xl border border-input bg-background px-3 py-2 placeholder:text-black/50 dark:placeholder:text-white/50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-green-main dark:focus-visible:ring-green-second disabled:cursor-not-allowed disabled:opacity-50 ~text-sm/base dark:text-white',
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = 'Textarea';

export { Textarea };
