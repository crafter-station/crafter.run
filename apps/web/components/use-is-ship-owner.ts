"use client"

import { meResponseSchema } from "@crafter/contracts"
import { useAuth } from "@clerk/nextjs"
import { useEffect, useState } from "react"

import { shipsApi } from "@/lib/ships-client"

export function useIsShipOwner(ownerHandle: string) {
  const { getToken, isLoaded, userId } = useAuth()
  const [isOwner, setIsOwner] = useState(false)

  useEffect(() => {
    if (!isLoaded || !userId) return
    let cancelled = false
    getToken()
      .then((token) => token ? shipsApi<unknown>("/v1/me", token) : null)
      .then((body) => {
        if (cancelled || !body) return
        const parsed = meResponseSchema.safeParse(body)
        setIsOwner(parsed.success && parsed.data.member?.handle === ownerHandle)
      })
      .catch(() => {})
    return () => { cancelled = true }
  }, [getToken, isLoaded, ownerHandle, userId])

  return isOwner
}
