import * as React from 'react';
import { cn } from '@/lib/utils';

const variants = {
  default: 'bg-black text-white hover:bg-gray-800',
  outline: 'border border-black hover:bg-black hover:text-white',
  destructive: 'bg-red-600 text-white hover:bg-red-700',
};

const sizes = {
  default: 'h-10 px-4 py-2',
  sm: 'h-8 px-3 py-1',
};

export const Button = React.forwardRef(
  ({ className, variant = 'default', size = 'default', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';