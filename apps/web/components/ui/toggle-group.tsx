'use client'

import * as React from 'react'
import {
  SegmentedControl,
  SegmentedControlIndicator,
  SegmentedControlItem,
} from '@ui-sdk/react/segmented-control'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const toggleVariants = cva(
  'relative inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 data-disabled:pointer-events-none data-disabled:opacity-50 data-checked:bg-transparent data-checked:text-accent-foreground data-checked:hover:bg-transparent data-checked:hover:text-accent-foreground motion-reduce:transition-none [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 gap-2',
  {
    variants: {
      variant: {
        default: 'bg-transparent',
        outline: 'border border-input bg-transparent',
      },
      size: {
        default: 'h-10 px-3 min-w-10',
        sm: 'h-9 px-2.5 min-w-9',
        lg: 'h-11 px-5 min-w-11',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

const ToggleGroupContext = React.createContext<
  VariantProps<typeof toggleVariants>
>({
  size: 'default',
  variant: 'default',
})

type ToggleGroupProps = Omit<
  React.ComponentProps<typeof SegmentedControl>,
  'className' | 'onValueChange' | 'value' | 'defaultValue'
> &
  VariantProps<typeof toggleVariants> & {
    className?: string
    children?: React.ReactNode
    value?: string
    defaultValue?: string
    onValueChange?: (value: string) => void
  }

function ToggleGroup({
  className,
  variant,
  size,
  children,
  onValueChange,
  ...props
}: ToggleGroupProps) {
  return (
    <SegmentedControl
      className={cn(
        'relative isolate flex items-center justify-center gap-1',
        className,
      )}
      onValueChange={(value) => onValueChange?.(value ?? '')}
      {...props}
    >
      <SegmentedControlIndicator className="absolute left-(--segmented-control-indicator-left) top-(--segmented-control-indicator-top) -z-10 h-(--segmented-control-indicator-height) w-(--segmented-control-indicator-width) rounded-md bg-accent transition-[left,top,width,height] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none" />
      <ToggleGroupContext.Provider value={{ variant, size }}>
        {children}
      </ToggleGroupContext.Provider>
    </SegmentedControl>
  )
}

function ToggleGroupItem({
  className,
  variant,
  size,
  ...props
}: Omit<React.ComponentProps<typeof SegmentedControlItem>, 'className'> &
  VariantProps<typeof toggleVariants> & { className?: string }) {
  const context = React.useContext(ToggleGroupContext)

  return (
    <SegmentedControlItem
      className={cn(
        toggleVariants({
          variant: context.variant || variant,
          size: context.size || size,
        }),
        className,
      )}
      {...props}
    />
  )
}

export { ToggleGroup, ToggleGroupItem }
