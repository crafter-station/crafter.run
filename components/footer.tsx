import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-background relative z-10 border-t border-border px-6 py-12 md:px-12">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-6 md:flex-row">
        <Link
          href="/"
          className="font-mono text-sm font-medium tracking-wider text-foreground uppercase"
        >
          syntex_
        </Link>
        <div className="flex items-center gap-8">
          <Link
            href="#"
            className="font-mono text-[11px] tracking-widest text-foreground/40 uppercase transition-colors hover:text-foreground"
          >
            Twitter
          </Link>
          <Link
            href="#"
            className="font-mono text-[11px] tracking-widest text-foreground/40 uppercase transition-colors hover:text-foreground"
          >
            GitHub
          </Link>
          <Link
            href="#"
            className="font-mono text-[11px] tracking-widest text-foreground/40 uppercase transition-colors hover:text-foreground"
          >
            Dribbble
          </Link>
        </div>
        <p className="font-mono text-[10px] tracking-wider text-foreground/30">
          {"© 2026 syntex. all rights reserved."}
        </p>
      </div>
    </footer>
  )
}
