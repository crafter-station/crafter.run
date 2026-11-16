'use client'

import type * as React from 'react'
import { Label as LabelPrimitive } from '@ui-sdk/react/label'

import { cn } from '@/lib/utils'

type LabelProps = Omit<React.ComponentProps<typeof LabelPrimitive>, 'className'> & {
  className?: string
}

function Label({ className, ...props }: LabelProps) {
  return (
    <LabelPrimitive
      className={cn(
        'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
        className,
      )}
      {...props}
    />
  )
}

export { Label }
