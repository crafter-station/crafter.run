/**
 * MDX rendering for blog posts.
 *
 * Compiled per build inside a server component, so nothing here reaches the
 * client bundle: highlighting runs once at build time and ships as plain
 * marked-up HTML, with no runtime highlighter and no hydration cost on a page
 * that is pure reading.
 *
 * The component map is explicit rather than a `prose` class because the site
 * has no typography plugin and its palette is a fixed token set. Mapping each
 * element keeps the article inside the same design system as the rest of the
 * page instead of importing a second one.
 */
import Link from "next/link"
import type { ComponentPropsWithoutRef, ReactNode } from "react"

import { compileMDX } from "next-mdx-remote/rsc"
import rehypePrettyCode, { type Options as PrettyCodeOptions } from "rehype-pretty-code"
import rehypeSlug from "rehype-slug"
import remarkGfm from "remark-gfm"

import { CodeFigure } from "@/components/blog/code-figure"
import { CODE_THEME } from "@/components/blog/code-theme"
import type { BlogCopy } from "@/components/blog/copy"
import { type Locale, withLocale } from "@/lib/i18n"
import { baseUrl } from "@/lib/seo"

type ArticleCopy = BlogCopy["article"]

const PRETTY_CODE: PrettyCodeOptions = {
  // Both themes are compiled into every token as a pair of custom properties;
  // `.blog-body code span` in globals.css picks the side that matches the
  // active theme.
  theme: CODE_THEME,
  // Let the <pre> own its background so code blocks match the surfaces around
  // them rather than the highlighter's own canvas.
  keepBackground: false,
  defaultLang: "text",
}

const BODY = "w-full text-base leading-7 md:text-[17px] md:leading-8"

const FOCUS = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"

function anchor(locale: Locale) {
  return function Anchor({ href = "", children }: ComponentPropsWithoutRef<"a">) {
    // Inherits the paragraph's colour and carries a hairline underline that
    // darkens on hover. In a body this dense, colouring every link at rest
    // would turn the prose into a field of blue.
    const className =
      "underline decoration-muted-foreground/60 decoration-1 underline-offset-4 transition-colors " +
      `hover:decoration-foreground ${FOCUS}`

    // Authors write locale-relative paths ("/oss"); the link gets the active
    // locale so a Spanish post never sends a reader into /en.
    if (href.startsWith("/")) {
      return (
        <Link href={withLocale(href, locale)} className={className}>
          {children}
        </Link>
      )
    }

    if (href.startsWith("#") || href.startsWith(baseUrl)) {
      return (
        <a href={href} className={className}>
          {children}
        </a>
      )
    }

    return (
      <a href={href} className={className} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    )
  }
}

/** Heading that reveals a permalink on hover; the id comes from rehype-slug. */
function heading(level: 2 | 3 | 4, anchorLabel: string) {
  // Extra top padding rather than margin: the body is a flex column with a
  // fixed gap, and margins on a flex child collapse into nothing.
  const styles = {
    2: "pt-8 text-2xl tracking-tight md:text-3xl",
    3: "pt-4 text-xl tracking-tight md:text-2xl",
    4: "pt-2 text-lg tracking-tight",
  }[level]

  const Tag = `h${level}` as const

  return function Heading({ id, children }: { id?: string; children?: ReactNode }) {
    return (
      <Tag id={id} className={`group w-full scroll-mt-28 text-balance font-medium ${styles}`}>
        {children}
        {id ? (
          <a
            href={`#${id}`}
            aria-label={anchorLabel}
            className={`ml-2 font-mono text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100 focus-visible:opacity-100 ${FOCUS}`}
          >
            #
          </a>
        ) : null}
      </Tag>
    )
  }
}

const components = (article: ArticleCopy, locale: Locale) => ({
  h2: heading(2, article.sectionAnchor),
  h3: heading(3, article.sectionAnchor),
  h4: heading(4, article.sectionAnchor),
  a: anchor(locale),
  p: (props: ComponentPropsWithoutRef<"p">) => <p className={`${BODY} text-pretty`} {...props} />,
  ul: (props: ComponentPropsWithoutRef<"ul">) => (
    <ul className={`${BODY} list-disc space-y-2 pl-5 marker:text-muted-foreground`} {...props} />
  ),
  ol: (props: ComponentPropsWithoutRef<"ol">) => (
    <ol className={`${BODY} list-decimal space-y-2 pl-5 marker:font-mono marker:text-xs marker:text-muted-foreground`} {...props} />
  ),
  li: (props: ComponentPropsWithoutRef<"li">) => <li className="pl-1" {...props} />,
  strong: (props: ComponentPropsWithoutRef<"strong">) => <strong className="font-semibold" {...props} />,
  // Space Grotesk ships no italic, so a quote is set as a pull quote: larger,
  // tighter, with the site's hairline down its left edge.
  blockquote: (props: ComponentPropsWithoutRef<"blockquote">) => (
    <blockquote
      className="w-full border-l-2 border-foreground py-1 pl-6 text-xl tracking-tight text-foreground md:text-2xl [&_p]:text-inherit [&_p]:leading-snug"
      {...props}
    />
  ),
  hr: () => <hr className="my-4 w-full border-line" />,
  img: (props: ComponentPropsWithoutRef<"img">) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className="w-full border border-line"
      loading="lazy"
      decoding="async"
      alt={props.alt ?? ""}
      {...props}
    />
  ),
  table: (props: ComponentPropsWithoutRef<"table">) => (
    // Wide tables scroll inside their own container instead of widening the page.
    <div className="w-full overflow-x-auto border border-line">
      <table className="w-full border-collapse text-left text-sm" {...props} />
    </div>
  ),
  th: (props: ComponentPropsWithoutRef<"th">) => (
    <th
      className="whitespace-nowrap border-b border-line bg-secondary/60 px-4 py-2.5 font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground"
      {...props}
    />
  ),
  td: (props: ComponentPropsWithoutRef<"td">) => (
    <td className="border-b border-line px-4 py-2.5 align-top text-muted-foreground last:border-b-0 [tr:last-child_&]:border-b-0" {...props} />
  ),
  // `pre` and `code` are styled from globals.css instead of here: the rows,
  // the highlight flags and the counter that numbers them are produced by the
  // rehype plugin, so they never pass through an element this map can reach.
  figure: ({ children, ...props }: ComponentPropsWithoutRef<"figure">) =>
    "data-rehype-pretty-code-figure" in props ? (
      <CodeFigure copyLabel={article.copyCode} copiedLabel={article.copiedCode} {...props}>
        {children}
      </CodeFigure>
    ) : (
      <figure className="w-full" {...props}>
        {children}
      </figure>
    ),
})

export async function BlogBody({
  source,
  article,
  locale,
}: {
  source: string
  article: ArticleCopy
  locale: Locale
}) {
  const { content } = await compileMDX({
    source,
    components: components(article, locale),
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [rehypeSlug, [rehypePrettyCode, PRETTY_CODE]],
      },
    },
  })

  // A flex column with one gap, rather than per-element margins. Every block
  // then sits on the same rhythm no matter what follows what.
  return <div className="blog-body flex flex-col items-start gap-6">{content}</div>
}
