"use client"

/**
 * Copy affordance around a compiled code block.
 *
 * The highlighted markup is built at compile time and arrives here as
 * children, so nothing about the snippet is rendered on the client. The only
 * thing that hydrates is the button.
 *
 * The code is read from the DOM rather than threaded through as a prop, which
 * would mean carrying every snippet twice in the payload. Line numbers are a
 * CSS counter, so `textContent` is the code exactly as written.
 */
import { useEffect, useRef, useState } from "react"
import { CheckIcon, CopyIcon } from "lucide-react"

export function CodeFigure({
  children,
  copyLabel,
  copiedLabel,
  ...props
}: React.ComponentPropsWithoutRef<"figure"> & {
  copyLabel: string
  copiedLabel: string
}) {
  const figure = useRef<HTMLElement>(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) return
    const timer = setTimeout(() => setCopied(false), 2000)
    return () => clearTimeout(timer)
  }, [copied])

  const copy = async () => {
    const code = figure.current?.querySelector("pre")?.textContent
    if (!code) return
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
    } catch {
      // Denied permission or an insecure origin. The snippet is selectable, so
      // there is still a way through; a thrown error here would not add one.
    }
  }

  return (
    <figure ref={figure} className="group/copy relative" {...props}>
      {children}

      {/* Hidden until hover, but never until focus: revealing it on hover
          alone would put it out of reach of anyone navigating by keyboard. */}
      <button
        type="button"
        onClick={() => void copy()}
        aria-label={copied ? copiedLabel : copyLabel}
        className="absolute right-2 top-2 z-10 inline-flex size-8 cursor-pointer items-center justify-center border border-line bg-background text-muted-foreground opacity-0 transition-[opacity,color] duration-200 hover:text-foreground focus-visible:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground group-hover/copy:opacity-100 motion-reduce:transition-none"
      >
        <span className="relative size-4">
          <CheckIcon
            aria-hidden
            className={`absolute inset-0 size-4 transition-[transform,opacity] duration-200 motion-reduce:transition-none ${
              copied ? "scale-100 opacity-100" : "scale-90 opacity-0"
            }`}
          />
          <CopyIcon
            aria-hidden
            className={`absolute inset-0 size-4 transition-[transform,opacity] duration-200 motion-reduce:transition-none ${
              copied ? "scale-90 opacity-0" : "scale-100 opacity-100"
            }`}
          />
        </span>
        <span aria-live="polite" className="sr-only">
          {copied ? copiedLabel : ""}
        </span>
      </button>
    </figure>
  )
}
