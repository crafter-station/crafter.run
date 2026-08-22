import { clerkMiddleware } from "@clerk/nextjs/server"
import { NextResponse, type NextRequest } from "next/server"

import { defaultLocale, isLocale, LOCALE_HEADER } from "@/lib/i18n"

export const proxy = clerkMiddleware((_auth, request: NextRequest) => {
  const { pathname } = request.nextUrl
  const firstSegment = pathname.split("/").filter(Boolean)[0]

  if (firstSegment && isLocale(firstSegment)) {
    // A URL under a locale that matches no route is served by
    // `app/global-not-found.tsx`, which renders outside `[lang]` and has no
    // params to read. Carry the locale forward so its 404 speaks the language
    // the visitor was already browsing in.
    const headers = new Headers(request.headers)
    headers.set(LOCALE_HEADER, firstSegment)
    return NextResponse.next({ request: { headers } })
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
