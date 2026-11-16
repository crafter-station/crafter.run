'use client'

import type * as React from 'react'
import {
  Tooltip,
  TooltipContent as TooltipContentPrimitive,
  TooltipTrigger,
} from '@ui-sdk/react/tooltip'

import { cn } from '@/lib/utils'

function TooltipContent({
  className,
  sideOffset = 6,
  ...props
}: Omit<React.ComponentProps<typeof TooltipContentPrimitive>, 'className'> & {
  className?: string
}) {
  return (
    <TooltipContentPrimitive
      sideOffset={sideOffset}
      className={cn(
        'z-50 origin-(--transform-origin) rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md transition-[opacity,scale] duration-150 ease-out data-starting-style:scale-90 data-starting-style:opacity-0 data-ending-style:scale-90 data-ending-style:opacity-0 data-instant:transition-none motion-reduce:transition-opacity motion-reduce:data-ending-style:scale-100 motion-reduce:data-starting-style:scale-100',
        className,
      )}
      {...props}
    />
  )
}

export { Tooltip, TooltipTrigger, TooltipContent }
