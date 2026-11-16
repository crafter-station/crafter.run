'use client'

import * as React from 'react'
import {
  Drawer,
  DrawerBackdrop,
  DrawerClose as SheetClose,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
  DrawerTrigger as SheetTrigger,
} from '@ui-sdk/react/drawer'
import { X } from 'lucide-react'

import { cn } from '@/lib/utils'

type WithClassName<T> = Omit<T, 'className'> & { className?: string }

type Side = 'top' | 'bottom' | 'left' | 'right'

const SheetSide = React.createContext<Side>('right')

const sheetSides: Record<Side, string> = {
  top: 'w-full border-b',
  bottom: 'w-full border-t',
  left: 'h-full w-3/4 border-r sm:max-w-sm',
  right: 'h-full w-3/4 border-l sm:max-w-sm',
}

function Sheet({
  side = 'right',
  ...props
}: React.ComponentProps<typeof Drawer> & { side?: Side }) {
  return (
    <SheetSide value={side}>
      <Drawer side={side} {...props} />
    </SheetSide>
  )
}

function SheetContent({
  className,
  children,
  ...props
}: WithClassName<React.ComponentProps<typeof DrawerContent>> & {
  children?: React.ReactNode
}) {
  const side = React.use(SheetSide)
  return (
    <>
      <DrawerBackdrop className="fixed inset-0 bg-black/80" />
      <DrawerContent
        initialFocus="content"
        className={cn(
          'bg-background p-6 text-foreground shadow-lg outline-none',
          sheetSides[side],
          className,
        )}
        {...props}
      >
        {children}
        <SheetClose
          aria-label="Close"
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 data-disabled:pointer-events-none"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </SheetClose>
      </DrawerContent>
    </>
  )
}

function SheetHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('flex flex-col space-y-2 text-center sm:text-left', className)}
      {...props}
    />
  )
}

function SheetFooter({
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

function SheetTitle({
  className,
  ...props
}: WithClassName<React.ComponentProps<typeof DrawerTitle>>) {
  return (
    <DrawerTitle
      className={cn('text-lg font-semibold text-foreground', className)}
      {...props}
    />
  )
}

function SheetDescription({
  className,
  ...props
}: WithClassName<React.ComponentProps<typeof DrawerDescription>>) {
  return (
    <DrawerDescription
      className={cn('text-sm text-muted-foreground', className)}
      {...props}
    />
  )
}

export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
}
