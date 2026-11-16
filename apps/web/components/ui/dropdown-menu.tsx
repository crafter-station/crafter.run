'use client'

import type * as React from 'react'
import {
  Menu as DropdownMenu,
  MenuContent,
  MenuGroup as DropdownMenuGroup,
  MenuGroupLabel,
  MenuItem,
  MenuItemIndicator,
  MenuRadioGroup as DropdownMenuRadioGroup,
  MenuRadioItem,
  MenuTrigger as DropdownMenuTrigger,
} from '@ui-sdk/react/menu'
import { Check } from 'lucide-react'

import { cn } from '@/lib/utils'

type WithClassName<T> = Omit<T, 'className'> & { className?: string }

function DropdownMenuContent({
  className,
  sideOffset = 4,
  ...props
}: WithClassName<React.ComponentProps<typeof MenuContent>>) {
  return (
    <MenuContent
      sideOffset={sideOffset}
      className={cn(
        'z-50 min-w-32 origin-(--transform-origin) overflow-y-auto rounded-md border bg-popover p-1 text-popover-foreground shadow-md transition-[opacity,scale,translate] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] data-starting-style:scale-[0.97] data-starting-style:opacity-0 data-starting-style:data-[side=bottom]:-translate-y-1 data-starting-style:data-[side=top]:translate-y-1 data-ending-style:scale-[0.98] data-ending-style:opacity-0 data-ending-style:duration-150 data-ending-style:ease-in motion-reduce:transition-opacity motion-reduce:data-ending-style:scale-100 motion-reduce:data-starting-style:scale-100 motion-reduce:data-starting-style:translate-y-0',
        className,
      )}
      {...props}
    />
  )
}

function DropdownMenuItem({
  className,
  ...props
}: WithClassName<React.ComponentProps<typeof MenuItem>>) {
  return (
    <MenuItem
      className={cn(
        'relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden transition-colors data-highlighted:bg-muted data-highlighted:text-foreground data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
        className,
      )}
      {...props}
    />
  )
}

function DropdownMenuRadioItem({
  className,
  children,
  ...props
}: WithClassName<React.ComponentProps<typeof MenuRadioItem>> & {
  children?: React.ReactNode
}) {
  return (
    <MenuRadioItem
      className={cn(
        'relative flex cursor-default select-none items-center gap-3 rounded-sm py-1.5 pl-3 pr-9 text-sm outline-hidden transition-colors data-highlighted:bg-muted data-highlighted:text-foreground data-disabled:pointer-events-none data-disabled:opacity-50',
        className,
      )}
      {...props}
    >
      <MenuItemIndicator className="absolute right-3 flex h-4 w-4 items-center justify-center">
        <Check className="h-4 w-4" aria-hidden="true" />
      </MenuItemIndicator>
      {children}
    </MenuRadioItem>
  )
}

function DropdownMenuLabel({
  className,
  ...props
}: WithClassName<React.ComponentProps<typeof MenuGroupLabel>>) {
  return (
    <MenuGroupLabel
      className={cn(
        'px-2 py-2 font-label text-xs font-normal uppercase tracking-[0.08em] text-muted-foreground',
        className,
      )}
      {...props}
    />
  )
}

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuGroup,
  DropdownMenuRadioGroup,
}
