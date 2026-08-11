import Link, { type LinkProps } from "next/link"
import type { AnchorHTMLAttributes, ReactNode } from "react"
import { type Locale, withLocale } from "@/lib/i18n"

type LocalizedLinkProps = LinkProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> & {
    href: string
    locale: Locale
    children: ReactNode
  }

export function LocalizedLink({ href, locale, children, ...props }: LocalizedLinkProps) {
  return (
    <Link href={withLocale(href, locale)} {...props}>
      {children}
    </Link>
  )
}
