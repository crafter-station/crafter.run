"use client"

import { Portal } from "@portalsdk/core"

import { env } from "@/env"

export const portal = new Portal({
  apiKey: env.NEXT_PUBLIC_PORTAL_KEY ?? "pk_not_configured",
})
