import { cn } from '@/lib/utils';
import { Button, ButtonProps } from './button';
import { Loader } from 'lucide-react';

interface LoadingButtonProps extends ButtonProps {
  loading: boolean;
}

export default function LoadingButton({
  loading,
  disabled,
  className,
  ...props
}: LoadingButtonProps) {
  return (
    <Button
      variant={props.variant}
      disabled={loading || disabled}
      className={cn('flex items-end ~gap-1/2', className)}
      {...props}
    >
      {loading && <Loader className="text-white animate-spin" />}
      {props.children}
    </Button>
  );
}
