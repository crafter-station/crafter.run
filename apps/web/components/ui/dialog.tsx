'use client'

import * as React from 'react'
import {
  Dialog,
  DialogBackdrop,
  DialogClose,
  DialogContent as DialogContentPrimitive,
  DialogDescription as DialogDescriptionPrimitive,
  DialogTitle as DialogTitlePrimitive,
  DialogTrigger,
} from '@ui-sdk/react/dialog'
import { X } from 'lucide-react'

import { cn } from '@/lib/utils'

type WithClassName<T> = Omit<T, 'className'> & { className?: string }

const popupMotion =
  'transition-[opacity,scale,translate] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] data-starting-style:translate-y-2 data-starting-style:scale-[0.97] data-starting-style:opacity-0 data-ending-style:translate-y-1 data-ending-style:scale-[0.98] data-ending-style:opacity-0 data-ending-style:duration-150 data-ending-style:ease-in motion-reduce:transition-opacity motion-reduce:data-ending-style:scale-100 motion-reduce:data-ending-style:translate-y-0 motion-reduce:data-starting-style:scale-100 motion-reduce:data-starting-style:translate-y-0'

function DialogContent({
  className,
  children,
  ...props
}: WithClassName<React.ComponentProps<typeof DialogContentPrimitive>> & {
  children?: React.ReactNode
}) {
  return (
    <>
      <DialogBackdrop className="fixed inset-0 z-50 bg-black/80 transition-opacity duration-200 ease-out data-starting-style:opacity-0 data-ending-style:opacity-0 data-ending-style:duration-150" />
      <DialogContentPrimitive
        className={cn(
          'fixed inset-0 z-50 m-auto grid h-fit max-h-[calc(100dvh-1rem)] w-full max-w-lg gap-4 border bg-background p-6 text-foreground shadow-lg sm:rounded-lg',
          popupMotion,
          className,
        )}
        {...props}
      >
        {children}
        <DialogClose
          aria-label="Close"
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 data-disabled:pointer-events-none"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </DialogClose>
      </DialogContentPrimitive>
    </>
  )
}

function DialogHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'flex flex-col space-y-1.5 text-center sm:text-left',
        className,
      )}
      {...props}
    />
  )
}

function DialogFooter({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2',
        className,
      )}
      {...props}
    />
  )
}

function DialogTitle({
  className,
  ...props
}: WithClassName<React.ComponentProps<typeof DialogTitlePrimitive>>) {
  return (
    <DialogTitlePrimitive
      className={cn(
        'text-lg font-semibold leading-none tracking-tight',
        className,
      )}
      {...props}
    />
  )
}

function DialogDescription({
  className,
  ...props
}: WithClassName<React.ComponentProps<typeof DialogDescriptionPrimitive>>) {
  return (
    <DialogDescriptionPrimitive
      className={cn('text-sm text-muted-foreground', className)}
      {...props}
    />
  )
}

export {
  Dialog,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
}
