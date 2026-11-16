'use client'

import type * as React from 'react'
import {
  Avatar as AvatarPrimitive,
  AvatarFallback as AvatarFallbackPrimitive,
  AvatarImage as AvatarImagePrimitive,
} from '@ui-sdk/react/avatar'

import { cn } from '@/lib/utils'

type WithClassName<T> = Omit<T, 'className'> & { className?: string }

function Avatar({
  className,
  ...props
}: WithClassName<React.ComponentProps<typeof AvatarPrimitive>>) {
  return (
    <AvatarPrimitive
      className={cn(
        'relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full',
        className,
      )}
      {...props}
    />
  )
}

function AvatarImage({
  className,
  ...props
}: WithClassName<React.ComponentProps<typeof AvatarImagePrimitive>>) {
  return (
    <AvatarImagePrimitive
      className={cn('aspect-square h-full w-full', className)}
      {...props}
    />
  )
}

function AvatarFallback({
  className,
  ...props
}: WithClassName<React.ComponentProps<typeof AvatarFallbackPrimitive>>) {
  return (
    <AvatarFallbackPrimitive
      className={cn(
        'flex h-full w-full items-center justify-center rounded-full bg-muted',
        className,
      )}
      {...props}
    />
  )
}

export { Avatar, AvatarImage, AvatarFallback }
