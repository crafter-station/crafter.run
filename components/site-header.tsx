"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import { Container } from "@/components/grid-container"
import { PixelArrow } from "@/components/pixel-arrow"
import { SiteWordmark } from "@/components/site-wordmark"
import { navItems } from "@/lib/site"

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  return (
    <header className="sticky top-0 z-40 w-full bg-background/80 backdrop-blur">
      <Container innerClassName="h-4" />
      <hr className="border-line" />
      <Container innerClassName="h-16">
        <nav className="relative flex h-full justify-between">
          <div className="flex h-full w-[180px] items-center border-line lg:w-[215px] lg:border-r">
            <Link
              href="/"
              className="group inline-flex h-full items-center px-4 transition-colors lg:hover:bg-primary/5"
            >
              <SiteWordmark />
            </Link>
          </div>
          <div className="hidden flex-1 items-center justify-center lg:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="inline-flex h-16 items-center gap-1 px-5 text-sm font-medium text-foreground transition-colors hover:bg-accent/10 hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </div>
          <div className="hidden h-full w-[215px] items-center justify-center border-line lg:flex lg:border-l">
            <Link
              href="#contact"
              className="group flex h-full w-full items-center justify-center gap-4 font-medium transition-colors hover:bg-primary/5"
            >
              Get in touch
              <PixelArrow />
            </Link>
          </div>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="flex h-16 w-16 items-center justify-center text-foreground/70 transition-colors hover:text-foreground lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>
      </Container>
      <hr className="border-line" />
      {open ? (
        <>
          <Container innerClassName="px-4 py-4 lg:hidden">
            <div className="flex flex-col">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="border-b border-line py-3 text-sm text-foreground"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="#contact"
                onClick={() => setOpen(false)}
                className="mt-4 inline-flex items-center justify-between border border-foreground/20 px-4 py-3 text-sm font-medium"
              >
                Get in touch
                <PixelArrow />
              </Link>
            </div>
          </Container>
          <hr className="border-line lg:hidden" />
        </>
      ) : null}
    </header>
  )
}
