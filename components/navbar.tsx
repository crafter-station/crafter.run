import Link from "next/link"

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-5 md:px-12">
      <Link
        href="/"
        className="font-mono text-sm font-medium tracking-wider text-foreground uppercase"
      >
        syntex_
      </Link>
      <div className="hidden items-center gap-8 md:flex">
        <Link
          href="#"
          className="font-mono text-[11px] tracking-widest text-foreground/50 uppercase transition-colors hover:text-foreground"
        >
          Work
        </Link>
        <Link
          href="#"
          className="font-mono text-[11px] tracking-widest text-foreground/50 uppercase transition-colors hover:text-foreground"
        >
          About
        </Link>
        <Link
          href="#"
          className="font-mono text-[11px] tracking-widest text-foreground/50 uppercase transition-colors hover:text-foreground"
        >
          Contact
        </Link>
      </div>
      <Link
        href="#"
        className="border border-foreground/20 text-foreground px-5 py-2 font-mono text-[11px] tracking-widest uppercase transition-all hover:border-foreground/50 hover:bg-foreground hover:text-background"
      >
        Get Started
      </Link>
    </nav>
  )
}
