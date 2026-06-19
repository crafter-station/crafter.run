import { NextResponse, type NextRequest } from "next/server"

import { defaultLocale, isLocale } from "@/lib/i18n"

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const firstSegment = pathname.split("/").filter(Boolean)[0]

  if (firstSegment && isLocale(firstSegment)) {
    return NextResponse.next()
  }

  const url = request.nextUrl.clone()
  url.pathname = pathname === "/" ? `/${defaultLocale}` : `/${defaultLocale}${pathname}`

  return NextResponse.redirect(url)
}

export const config = {
  matcher: [
    "/((?!api|_next|_vercel|favicon.ico|icon.svg|apple-touch-icon.png|.*\\..*).*)",
  ],
}
