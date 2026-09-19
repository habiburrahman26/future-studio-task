import { cn } from '@/lib/utils';
import type { ComponentProps, ReactNode } from 'react';

type ButtonProps = ComponentProps<'button'> & {
  children: ReactNode;
};

export default function Button({
  children,
  onClick,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'flex items-center justify-center h-10 w-full rounded-md bg-primary font-medium text-primary-fg transition-colors hover:bg-ok',
        className,
      )}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}
