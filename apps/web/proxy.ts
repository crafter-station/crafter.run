import { clerkMiddleware } from "@clerk/nextjs/server"
import { NextResponse, type NextRequest } from "next/server"

import { BLOG_POST_PATH, blogPostMarkdownRoute } from "@/lib/blog-paths"
import { defaultLocale, isLocale, LOCALE_HEADER, locales, type Locale } from "@/lib/i18n"

/**
 * True when a client asked for markdown and did not also ask for HTML. A
 * browser lists text/html first; an agent that wants the source says
 * `Accept: text/markdown` and nothing else, and that is the request this
 * negotiates on. The markdown route answers with `Vary: Accept`.
 */
function wantsMarkdown(request: NextRequest) {
  const accept = request.headers.get("accept") ?? ""
  return accept.includes("text/markdown") && !accept.includes("text/html")
}

/** The first supported language in Accept-Language, by q-weight, else English. */
function preferredLocale(request: NextRequest): Locale {
  const ranked = (request.headers.get("accept-language") ?? "")
    .split(",")
    .map((part) => {
      const [tag, ...params] = part.trim().toLowerCase().split(";")
      const q = params.find((p) => p.trim().startsWith("q="))
      return { lang: tag!.split("-")[0]!, q: q ? Number(q.trim().slice(2)) : 1 }
    })
    .filter(({ q }) => q > 0)
    .sort((a, b) => b.q - a.q)
  return (ranked.find(({ lang }) => (locales as readonly string[]).includes(lang))?.lang as Locale) ?? defaultLocale
}

export const proxy = clerkMiddleware((_auth, request: NextRequest) => {
  const { pathname } = request.nextUrl
  const firstSegment = pathname.split("/").filter(Boolean)[0]

  // These retired pages intentionally have no replacement, including at the
  // old unlocalized URLs. Let the global 404 handle them without a locale hop.
  if (["/opencode", "/claude-code", "/n8n", "/research"].includes(pathname)) {
    return NextResponse.next()
  }

  if (firstSegment && isLocale(firstSegment)) {
    // A URL under a locale that matches no route is served by
    // `app/global-not-found.tsx`, which renders outside `[lang]` and has no
    // params to read. Carry the locale forward so its 404 speaks the language
    // the visitor was already browsing in.
    const headers = new Headers(request.headers)
    headers.set(LOCALE_HEADER, firstSegment)

    // A blog post asked for as markdown is served its `.md` twin at the same
    // address, so the URL a client holds stays canonical.
    const post = BLOG_POST_PATH.exec(pathname)
    if (post && wantsMarkdown(request)) {
      const url = request.nextUrl.clone()
      url.pathname = blogPostMarkdownRoute(firstSegment, post[2]!)
      return NextResponse.rewrite(url, { request: { headers } })
    }

    return NextResponse.next({ request: { headers } })
  }

  const url = request.nextUrl.clone()
  const locale = preferredLocale(request)
  url.pathname = pathname === "/" ? `/${locale}` : `/${locale}${pathname}`

  const response = NextResponse.redirect(url)
  response.headers.set("Vary", "Accept-Language")
  return response
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
