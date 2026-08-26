/**
 * Byline avatars.
 *
 * Stacked with a 1.5px overlap, descending z-index so the first avatar paints
 * on top of the ones behind it, and a ring in the page colour that reads as
 * the gap between circles rather than as a border. Monochrome on purpose: a
 * per-author hue would be the one decorative colour on the page, pulling the
 * eye off the headline it sits under.
 */
import Image from "next/image"
import Link from "next/link"

import type { EntryAuthor } from "@/components/blog/entry-view"
import { type Locale, withLocale } from "@/lib/i18n"

const AVATAR =
  "relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full " +
  "border border-line bg-secondary font-mono font-medium uppercase text-muted-foreground " +
  "shadow-[0_0_0_1.5px_hsl(var(--background))]"

/** Faces drawn before the group collapses into a count. The third slot becomes
    the "+N" chip when there are more, so this is a ceiling on circles, not on
    people. */
const SHOWN = 3

export function AvatarGroup({
  authors,
  size = 20,
}: {
  authors: readonly EntryAuthor[]
  size?: number
}) {
  const drawn = authors.slice(0, SHOWN)
  // Exactly three authors fill the three slots with no chip; a fourth turns the
  // last slot into "+2", since that slot then stands for itself and the rest.
  const overflow = authors.length > SHOWN ? authors.length - (SHOWN - 1) : 0

  return (
    <div aria-hidden className="flex items-center">
      {drawn.map((author, i) => (
        <span
          key={author.id}
          className={`${AVATAR} ${i > 0 ? "-ml-[1.5px]" : ""}`}
          style={{
            zIndex: drawn.length - i,
            width: size,
            height: size,
            fontSize: Math.round(size * 0.42),
          }}
        >
          {/* Empty alt: the group is aria-hidden and the byline spells every
              author out beside it, so a filled alt would read each name twice. */}
          <Image
            src={author.avatar}
            alt=""
            width={size * 2}
            height={size * 2}
            className="size-full object-cover"
          />
          {overflow > 0 && i === drawn.length - 1 && (
            <span
              className="absolute inset-0 flex items-center justify-center rounded-full bg-secondary font-mono text-foreground"
              style={{ fontSize: Math.round(size * 0.42) }}
            >
              +{overflow}
            </span>
          )}
        </span>
      ))}
    </div>
  )
}

/** Avatars plus the collapsed byline, as used on the index entries. */
export function AuthorByline({
  authors,
  label,
}: {
  authors: readonly EntryAuthor[]
  label: string
}) {
  return (
    <div className="flex items-center gap-2.5 text-sm text-foreground">
      <AvatarGroup authors={authors} />
      <span className="text-pretty">{label}</span>
    </div>
  )
}

/**
 * Post-page byline: every contributor named with their role, linked to their
 * profile. One row per person; a post with three authors reads as three
 * people, not a list.
 */
export function AuthorList({
  authors,
  locale,
}: {
  authors: readonly EntryAuthor[]
  locale: Locale
}) {
  return (
    <ul className="flex flex-col gap-3">
      {authors.map((author) => (
        <li key={author.id}>
          <Link
            href={withLocale(author.path, locale)}
            rel="author"
            className="group/author inline-flex items-center gap-3"
          >
            <span className={AVATAR} style={{ width: 32, height: 32, fontSize: 12 }}>
              <Image
                src={author.avatar}
                alt=""
                width={64}
                height={64}
                className="size-full object-cover"
              />
            </span>
            <span className="flex flex-col leading-tight">
              <span className="text-sm font-medium text-foreground underline-offset-4 group-hover/author:underline">
                {author.name}
              </span>
              <span className="text-xs text-muted-foreground">{author.role}</span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  )
}
