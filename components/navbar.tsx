import Link from "next/link"

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-5 md:px-12">
      <Link
        href="/"
        className="text-foreground font-sans text-lg font-medium tracking-tight"
      >
        syntex
      </Link>
      <div className="hidden items-center gap-8 md:flex">
        <Link
          href="#"
          className="text-muted-foreground text-sm tracking-wide uppercase transition-colors hover:text-foreground"
        >
          Work
        </Link>
        <Link
          href="#"
          className="text-muted-foreground text-sm tracking-wide uppercase transition-colors hover:text-foreground"
        >
          About
        </Link>
        <Link
          href="#"
          className="text-muted-foreground text-sm tracking-wide uppercase transition-colors hover:text-foreground"
        >
          Contact
        </Link>
      </div>
      <Link
        href="#"
        className="border-foreground/20 text-foreground rounded-full border px-5 py-2 text-sm tracking-wide transition-colors hover:bg-foreground hover:text-background"
      >
        Get Started
      </Link>
    </nav>
  )
}
