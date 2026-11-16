'use client'

import type * as React from 'react'
import {
  Select,
  SelectContent as SelectContentPrimitive,
  SelectItem as SelectItemPrimitive,
  SelectItemIndicator,
  SelectItemText,
  SelectTrigger as SelectTriggerPrimitive,
  SelectValue,
} from '@ui-sdk/react/select'
import { Check, ChevronDown } from 'lucide-react'

import { cn } from '@/lib/utils'

type WithClassName<T> = Omit<T, 'className'> & { className?: string }

function SelectTrigger({
  className,
  children,
  ...props
}: WithClassName<React.ComponentProps<typeof SelectTriggerPrimitive>> & {
  children?: React.ReactNode
}) {
  return (
    <SelectTriggerPrimitive
      className={cn(
        'group flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background transition-[border-color,box-shadow] duration-150 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 data-disabled:cursor-not-allowed data-disabled:opacity-50 motion-reduce:transition-none [&>span]:line-clamp-1',
        className,
      )}
      {...props}
    >
      {children}
      <ChevronDown
        className="h-4 w-4 opacity-50 transition-transform duration-200 group-data-open:rotate-180 motion-reduce:transition-none"
        aria-hidden="true"
      />
    </SelectTriggerPrimitive>
  )
}

function SelectContent({
  className,
  side = 'bottom',
  sideOffset = 4,
  ...props
}: WithClassName<React.ComponentProps<typeof SelectContentPrimitive>>) {
  return (
    <SelectContentPrimitive
      side={side}
      sideOffset={sideOffset}
      className={cn(
        'z-50 max-h-[min(24rem,var(--available-height))] min-w-(--anchor-width) origin-(--transform-origin) overflow-y-auto rounded-md border bg-popover p-1 text-popover-foreground shadow-md transition-[opacity,scale,translate] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] data-starting-style:scale-[0.97] data-starting-style:opacity-0 data-starting-style:data-[side=bottom]:-translate-y-1 data-starting-style:data-[side=top]:translate-y-1 data-ending-style:scale-[0.98] data-ending-style:opacity-0 data-ending-style:duration-150 data-ending-style:ease-in motion-reduce:transition-opacity motion-reduce:data-ending-style:scale-100 motion-reduce:data-starting-style:scale-100 motion-reduce:data-starting-style:translate-y-0',
        className,
      )}
      {...props}
    />
  )
}

function SelectItem({
  className,
  children,
  ...props
}: WithClassName<React.ComponentProps<typeof SelectItemPrimitive>> & {
  children?: React.ReactNode
}) {
  return (
    <SelectItemPrimitive
      className={cn(
        'relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-hidden transition-colors data-highlighted:bg-accent data-highlighted:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50',
        className,
      )}
      {...props}
    >
      <SelectItemIndicator className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        <Check className="h-4 w-4" aria-hidden="true" />
      </SelectItemIndicator>
      <SelectItemText>{children}</SelectItemText>
    </SelectItemPrimitive>
  )
}

export { Select, SelectValue, SelectTrigger, SelectContent, SelectItem }
