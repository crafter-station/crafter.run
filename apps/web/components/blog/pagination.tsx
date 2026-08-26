/**
 * Archive pagination.
 *
 * Two shapes: page 1 ends in a single "Older posts" control, and every page
 * after it gets numbered controls. Page 1 is the shared, crawled, linked-to
 * URL and should read as a feed with more below, not as page 1 of N. Once a
 * reader has gone deeper they are navigating an archive, and numbers are the
 * better instrument.
 *
 * Every destination is a real `/blog/page/N` URL rather than a query string,
 * so each page of the archive is crawlable and carries its own canonical.
 * Page 1 stays at `/blog` and is never `/blog/page/1`, which would be the same
 * list at two addresses.
 */
import Link from "next/link"
import { ArrowLeft, ArrowRight } from "lucide-react"

import type { BlogCopy } from "@/components/blog/copy"
import { PixelArrow } from "@/components/pixel-arrow"
import { blogPagePath } from "@/lib/blog-paths"
import type { Locale } from "@/lib/i18n"

const CONTROL =
  "inline-flex h-10 cursor-pointer items-center gap-3 border border-line px-4 font-mono text-[10px] " +
  "uppercase tracking-[0.2em] transition-colors hover:bg-accent-surface/10 " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"

const NUMBER =
  "flex size-10 items-center justify-center border border-line font-mono text-xs tabular-nums " +
  "transition-colors hover:bg-accent-surface/10 " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"

const CURRENT =
  "flex size-10 items-center justify-center border border-foreground bg-foreground font-mono text-xs " +
  "tabular-nums text-background"

export function BlogPager({
  locale,
  page,
  pageCount,
  t,
}: {
  locale: Locale
  page: number
  pageCount: number
  t: BlogCopy
}) {
  if (pageCount <= 1) return null

  if (page === 1) {
    return (
      <div className="flex justify-center border-t border-line px-6 py-10 md:px-10">
        <Link
          href={blogPagePath(locale, 2)}
          aria-label={t.pageOf(2, pageCount)}
          className={`group ${CONTROL}`}
        >
          {t.showMore}
          <PixelArrow />
        </Link>
      </div>
    )
  }

  // Elisions rather than every number: an archive that grows past a dozen
  // pages would otherwise wrap the control onto two lines.
  const numbers: (number | "gap")[] = [1]
  if (page > 3) numbers.push("gap")
  if (page - 1 > 1) numbers.push(page - 1)
  numbers.push(page)
  if (page + 1 < pageCount) numbers.push(page + 1)
  if (page + 2 < pageCount) numbers.push("gap")
  if (page !== pageCount) numbers.push(pageCount)

  return (
    <nav
      aria-label={t.pageLabel}
      className="flex items-center justify-between gap-4 border-t border-line px-6 py-8 md:px-10"
    >
      {page > 1 ? (
        <Link href={blogPagePath(locale, page - 1)} aria-label={t.pageOf(page - 1, pageCount)} className={CONTROL}>
          <ArrowLeft aria-hidden className="size-3.5" />
          <span className="hidden sm:inline">{t.previous}</span>
        </Link>
      ) : (
        <span />
      )}

      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground sm:hidden">
        {t.pageOf(page, pageCount)}
      </span>

      <ul className="hidden items-center gap-1.5 sm:flex">
        {numbers.map((n, i) =>
          n === "gap" ? (
            <li key={`gap-${i}`} aria-hidden className="flex size-10 items-center justify-center text-muted-foreground">
              …
            </li>
          ) : (
            <li key={n}>
              {n === page ? (
                <span aria-current="page" className={CURRENT}>
                  {n}
                </span>
              ) : (
                <Link href={blogPagePath(locale, n)} aria-label={t.pageOf(n, pageCount)} className={NUMBER}>
                  {n}
                </Link>
              )}
            </li>
          ),
        )}
      </ul>

      {page < pageCount ? (
        <Link href={blogPagePath(locale, page + 1)} aria-label={t.pageOf(page + 1, pageCount)} className={CONTROL}>
          <span className="hidden sm:inline">{t.next}</span>
          <ArrowRight aria-hidden className="size-3.5" />
        </Link>
      ) : (
        <span />
      )}
    </nav>
  )
}
