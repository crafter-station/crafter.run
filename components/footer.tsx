import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-background border-border relative z-10 border-t px-6 py-12 md:px-12">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-6 md:flex-row">
        <Link
          href="/"
          className="text-foreground font-sans text-lg font-medium tracking-tight"
        >
          syntex
        </Link>
        <div className="flex items-center gap-8">
          <Link
            href="#"
            className="text-muted-foreground text-sm transition-colors hover:text-foreground"
          >
            Twitter
          </Link>
          <Link
            href="#"
            className="text-muted-foreground text-sm transition-colors hover:text-foreground"
          >
            GitHub
          </Link>
          <Link
            href="#"
            className="text-muted-foreground text-sm transition-colors hover:text-foreground"
          >
            Dribbble
          </Link>
        </div>
        <p className="text-muted-foreground text-xs">
          {"© 2026 syntex. All rights reserved."}
        </p>
      </div>
    </footer>
  )
}
