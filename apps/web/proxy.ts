import { clerkMiddleware } from "@clerk/nextjs/server"
import { NextResponse, type NextRequest } from "next/server"

import { defaultLocale, isLocale } from "@/lib/i18n"

export const proxy = clerkMiddleware((_auth, request: NextRequest) => {
  const { pathname } = request.nextUrl
  const firstSegment = pathname.split("/").filter(Boolean)[0]

  if (firstSegment && isLocale(firstSegment)) {
    return NextResponse.next()
  }

  const url = request.nextUrl.clone()
  url.pathname = pathname === "/" ? `/${defaultLocale}` : `/${defaultLocale}${pathname}`

  return NextResponse.redirect(url)
})

export const config = {
  matcher: [
    // `mcp` is the one dotless agent endpoint, so it needs naming here; every
    // other one (/agents.md, /openapi.json, /.well-known/*) already falls out
    // of the `.*\\..*` exclusion and must never be redirected into a locale.
    "/((?!api|og|mcp|_next|_vercel|favicon.ico|icon.svg|apple-touch-icon.png|.*\\..*).*)",
    "/__clerk/(.*)",
  ],
}
