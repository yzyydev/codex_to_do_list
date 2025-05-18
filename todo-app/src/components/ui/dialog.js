"use client";

import * as React from 'react';
import { createPortal } from 'react-dom';

import { cn } from '@/lib/utils';

const DialogContext = React.createContext();

export function Dialog({ open, onOpenChange, children }) {
  return (
    <DialogContext.Provider value={{ open, onOpenChange }}>
      {children}
    </DialogContext.Provider>
  );
}

export function DialogTrigger({ asChild, children, ...props }) {
  const context = React.useContext(DialogContext);
  if (!context) {
    throw new Error('DialogTrigger must be used within a Dialog');
  }
  const { onOpenChange } = context;

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      ...props,
      onClick: (e) => {
        onOpenChange(true);
        if (children.props.onClick) {
          children.props.onClick(e);
        }
      },
    });
  }

  return (
    <button
      type="button"
      {...props}
      onClick={() => onOpenChange(true)}
    >
      {children}
    </button>
  );
}

export function DialogPortal({ children, ...props }) {
  if (typeof document === 'undefined') {
    return null;
  }
  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-start justify-center sm:items-center"
      {...props}
    >
      {children}
    </div>,
    document.body
  );
}
DialogPortal.displayName = 'DialogPortal';

export const DialogOverlay = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('fixed inset-0 z-50 bg-black/50', className)}
    {...props}
  />
));
DialogOverlay.displayName = 'DialogOverlay';

export const DialogContent = React.forwardRef(({ className, children, ...props }, ref) => {
  const context = React.useContext(DialogContext);
  if (!context) {
    throw new Error('DialogContent must be used within a Dialog');
  }
  const { open } = context;
  return open ? (
    <DialogPortal>
      <DialogOverlay />
      <div
        ref={ref}
        className={cn(
          'fixed z-50 grid w-full max-w-lg gap-4 bg-white p-6 shadow-lg outline-none',
          className
        )}
        {...props}
      >
        {children}
      </div>
    </DialogPortal>
  ) : null;
});
DialogContent.displayName = 'DialogContent';

export function DialogHeader({ className, ...props }) {
  return (
    <div
      className={cn('flex flex-col space-y-1.5 text-center sm:text-left', className)}
      {...props}
    />
  );
}
DialogHeader.displayName = 'DialogHeader';

export function DialogFooter({ className, ...props }) {
  return (
    <div
      className={cn(
        'flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2',
        className
      )}
      {...props}
    />
  );
}
DialogFooter.displayName = 'DialogFooter';

export const DialogTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h2 ref={ref} className={cn('text-lg font-semibold', className)} {...props} />
));
DialogTitle.displayName = 'DialogTitle';

export const DialogDescription = React.forwardRef(({ className, ...props }, ref) => (
  <p ref={ref} className={cn('text-sm text-gray-500', className)} {...props} />
));
DialogDescription.displayName = 'DialogDescription';