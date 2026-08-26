import { notFound } from "next/navigation"

import { getPost, getSlugs, postLocales } from "@/lib/blog"
import { postMarkdown } from "@/lib/blog-markdown"
import { isLocale } from "@/lib/i18n"

/**
 * Markdown rendering of one post.
 *
 * Two ways in, one canonical URL:
 *
 * - `/{locale}/blog/{slug}.md` rewrites here (next.config.mjs), for a human
 *   or an agent that appends the suffix to a post URL.
 * - `proxy.ts` rewrites here when a request for the post's real URL carries
 *   `Accept: text/markdown`. The address the client asked for never changes,
 *   which is why the HTML head can advertise the markdown alternate as itself.
 *
 * `Vary: Accept` is what keeps the two apart in a shared cache. Without it a
 * CDN that stored the markdown would go on to serve it to a browser.
 *
 * `X-Robots-Tag: noindex` because this is the same content as the post page:
 * useful to fetch, wrong to index as a separate result.
 */

export const dynamic = "force-static"
export const dynamicParams = false

export function generateStaticParams() {
  return getSlugs().flatMap((slug) => postLocales(slug).map((lang) => ({ lang, slug })))
}

export async function GET(_request: Request, { params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params
  if (!isLocale(lang)) notFound()

  const post = getPost(slug, lang)
  if (!post) notFound()

  return new Response(postMarkdown(post, lang), {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=0, must-revalidate",
      "X-Robots-Tag": "noindex",
      Vary: "Accept",
    },
  })
}
