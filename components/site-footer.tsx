import Link from "next/link"
import { SiteWordmark } from "@/components/site-wordmark"
import { products, openSourceRepos, socials } from "@/lib/site"

const studioLinks = [
  { label: "Work", href: "#work" },
  { label: "Team", href: "#team" },
  { label: "Stack", href: "#stack" },
  { label: "Get in touch", href: "#contact" },
]

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-background">
      <div className="grid gap-12 px-8 py-16 md:grid-cols-4">
        <div>
          <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            Studio
          </p>
          <ul className="space-y-3 text-sm">
            {studioLinks.map((l) => (
              <li key={l.label}>
                <Link
                  href={l.href}
                  className="text-foreground transition-colors hover:text-muted-foreground"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            Products
          </p>
          <ul className="space-y-3 text-sm">
            {products.map((p) => (
              <li key={p.slug}>
                <Link
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground transition-colors hover:text-muted-foreground"
                >
                  {p.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            Open source
          </p>
          <ul className="space-y-3 text-sm">
            {openSourceRepos.map((r) => (
              <li key={r.name}>
                <Link
                  href={r.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground transition-colors hover:text-muted-foreground"
                >
                  {r.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            Social
          </p>
          <ul className="space-y-3 text-sm">
            {socials.map((s) => (
              <li key={s.label}>
                <Link
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground transition-colors hover:text-muted-foreground"
                >
                  {s.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

      </div>
      <div className="border-t border-line">
        <div className="flex flex-col items-start justify-between gap-3 px-8 py-6 md:flex-row md:items-center">
          <SiteWordmark />
          <p className="font-mono text-[10px] tracking-wider text-muted-foreground">
            © {new Date().getFullYear()} Crafter Station. Built fast, built well.
          </p>
        </div>
      </div>
    </footer>
  )
}
