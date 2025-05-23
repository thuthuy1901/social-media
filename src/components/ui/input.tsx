import * as React from 'react';

import { cn } from '@/lib/utils';

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<'input'>>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-10 w-full rounded-xl border border-input bg-white/50 dark:bg-black/50 px-3 py-2 ring-offset-background file:border-0 file:bg-transparent file:font-medium file:text-foreground placeholder:text-black/50 dark:placeholder:text-white/50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-green-main dark:focus-visible:ring-green-second disabled:cursor-not-allowed disabled:opacity-50 ~text-sm/base mt-0 dark:text-white',
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = 'Input';

export { Input };
