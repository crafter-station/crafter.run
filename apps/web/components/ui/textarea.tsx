'use client'

import type * as React from 'react'
import { Textarea as TextareaPrimitive } from '@ui-sdk/react/textarea'

import { cn } from '@/lib/utils'

type TextareaProps = Omit<
  React.ComponentProps<typeof TextareaPrimitive>,
  'className'
> & { className?: string }

function Textarea({ className, ...props }: TextareaProps) {
  return (
    <TextareaPrimitive
      className={cn(
        'flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background transition-[border-color,box-shadow] duration-150 placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 data-disabled:cursor-not-allowed data-disabled:opacity-50 motion-reduce:transition-none md:text-sm',
        className,
      )}
      {...props}
    />
  )
}

export { Textarea }
