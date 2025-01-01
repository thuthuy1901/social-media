'use client';
import * as React from 'react';

import { Input } from './input';
import { Eye, EyeClosed } from 'lucide-react';

const PasswordInput = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<'input'>
>(({ className, ...props }, ref) => {
  const [showPass, setShowPass] = React.useState(false);
  return (
    <div className="relative">
      <Input
        type={showPass ? 'text' : 'password'}
        className={className}
        ref={ref}
        {...props}
      />
      <div
        className="absolute right-2 top-0 translate-y-1/3 text-green-main size-fit"
        onClick={() => setShowPass(!showPass)}
      >
        {showPass ? <Eye /> : <EyeClosed />}
      </div>
    </div>
  );
});
PasswordInput.displayName = 'PasswordInput';

export { PasswordInput };
