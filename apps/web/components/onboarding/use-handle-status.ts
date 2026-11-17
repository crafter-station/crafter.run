"use client"

import { handleAvailabilityResponseSchema } from "@crafter/contracts"
import { useEffect, useState } from "react"

import { publicApiUrl } from "@/lib/ships-client"

export type HandleStatus = "unknown" | "checking" | "available" | "taken" | "invalid"

const HANDLE = /^[a-z0-9][a-z0-9-]*[a-z0-9]$/

/** Checks a handle against the public API once typing pauses. A failed check reads as unknown, never as taken. */
export function useHandleStatus(handle: string, own?: string): HandleStatus {
  const value = handle.trim().toLowerCase()
  const [result, setResult] = useState<{ handle: string; status: HandleStatus } | null>(null)

  useEffect(() => {
    if (value.length < 3 || value.length > 40 || !HANDLE.test(value) || value === own) return
    const controller = new AbortController()
    const timer = window.setTimeout(async () => {
      try {
        const response = await fetch(new URL(`/v1/handles/${value}`, publicApiUrl), { signal: controller.signal })
        if (!response.ok) return setResult({ handle: value, status: "unknown" })
        const body = handleAvailabilityResponseSchema.parse(await response.json())
        setResult({ handle: value, status: body.available ? "available" : "taken" })
      } catch {
        if (!controller.signal.aborted) setResult({ handle: value, status: "unknown" })
      }
    }, 400)
    return () => {
      window.clearTimeout(timer)
      controller.abort()
    }
  }, [value, own])

  if (!value) return "unknown"
  if (value.length < 3 || value.length > 40 || !HANDLE.test(value)) return "invalid"
  if (value === own) return "available"
  return result?.handle === value ? result.status : "checking"
}
