"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { CrafterStationLogo } from "./crafter-station-logo"

const navLinks = [
  { href: "#gallery", label: "Gallery" },
  { href: "#projects", label: "Projects" },
  { href: "https://www.crafterstation.com/", label: "Station", external: true },
]

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  return (
    <div className="fixed top-0 left-0 right-0 z-50 px-3 pt-3 sm:px-4 sm:pt-4 md:px-6 md:pt-5">
      <nav
        className={`mx-auto max-w-5xl border transition-all duration-300 ${
          scrolled
            ? "border-foreground/[0.1] bg-background/80 shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
            : "border-foreground/[0.06] bg-background/40"
        } backdrop-blur-xl`}
      >
        <div className="flex items-center justify-between px-4 py-2.5 sm:px-5 sm:py-3 md:px-6">
          <Link href="/" className="flex items-center gap-2">
            <CrafterStationLogo className="h-5 w-5 sm:h-6 sm:w-6" />
            <span className="font-mono text-xs font-medium tracking-wider text-foreground sm:text-sm">
              crafter.run
            </span>
          </Link>

          <div className="hidden items-center gap-6 lg:flex lg:gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                {...(link.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="font-mono text-[11px] tracking-widest text-foreground/50 uppercase transition-colors hover:text-accent"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="https://github.com/CrafterStation"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden border border-foreground/20 px-4 py-1.5 font-mono text-[11px] tracking-widest text-foreground uppercase transition-all hover:border-accent hover:text-accent sm:block sm:px-5 sm:py-2"
            >
              GitHub
            </Link>
            <button
              type="button"
              onClick={() => setOpen(!open)}
              className="flex h-8 w-8 items-center justify-center text-foreground/70 transition-colors hover:text-foreground lg:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
            >
              {open ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        <div
          className={`overflow-hidden transition-all duration-300 lg:hidden ${
            open ? "max-h-72" : "max-h-0"
          }`}
        >
          <div className="border-t border-foreground/[0.06] px-4 pt-3 pb-4 sm:px-5">
            <div className="flex flex-col gap-0.5">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  {...(link.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="px-3 py-2.5 font-mono text-sm tracking-widest text-foreground/70 uppercase transition-colors hover:text-accent active:text-accent"
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <Link
              href="https://github.com/CrafterStation"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="mt-3 block border border-foreground/20 py-2.5 text-center font-mono text-sm tracking-widest text-foreground uppercase transition-all hover:border-accent hover:text-accent active:border-accent active:text-accent"
            >
              GitHub
            </Link>
          </div>
        </div>
      </nav>
    </div>
  )
}
