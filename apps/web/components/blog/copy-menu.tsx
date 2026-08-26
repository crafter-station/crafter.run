"use client"

/**
 * Post meta rail: copy the link, a markdown link, or the title.
 *
 * Three square buttons sharing hairlines, in the same language as the header
 * controls. Each confirms in place by swapping its icon for a check, so the
 * row never resizes at the moment it is confirming something.
 */
import { useEffect, useState } from "react"
import { CheckIcon, FileCodeIcon, LinkIcon, TypeIcon } from "lucide-react"

import type { BlogCopy } from "@/components/blog/copy"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function CopyActions({ title, t }: { title: string; t: BlogCopy["copyMenu"] }) {
  const [copied, setCopied] = useState<string | null>(null)

  useEffect(() => {
    if (!copied) return
    const timer = setTimeout(() => setCopied(null), 1500)
    return () => clearTimeout(timer)
  }, [copied])

  const write = async (key: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(key)
    } catch {}
  }

  const items = [
    { key: "link", label: t.link, icon: LinkIcon, value: () => window.location.href },
    {
      key: "markdown",
      label: t.markdown,
      icon: FileCodeIcon,
      value: () => `[${title}](${window.location.href})`,
    },
    { key: "text", label: t.text, icon: TypeIcon, value: () => title },
  ]

  return (
    <TooltipProvider delayDuration={200}>
      <div role="group" aria-label={t.label} className="inline-flex border border-line">
        {items.map((item, i) => (
          <Tooltip key={item.key}>
            <TooltipTrigger asChild>
              <button
                type="button"
                aria-label={item.label}
                onClick={() => void write(item.key, item.value())}
                className={`inline-flex size-9 cursor-pointer items-center justify-center text-muted-foreground transition-colors hover:bg-accent-surface/10 hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground ${
                  i > 0 ? "border-l border-line" : ""
                }`}
              >
                {copied === item.key ? (
                  <CheckIcon aria-hidden className="size-4" strokeWidth={1.8} />
                ) : (
                  <item.icon aria-hidden className="size-4" strokeWidth={1.8} />
                )}
              </button>
            </TooltipTrigger>
            <TooltipContent className="font-mono text-[10px] uppercase tracking-[0.2em]">
              {copied === item.key ? t.copied : item.label}
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
      <span aria-live="polite" className="sr-only">
        {copied ? t.copied : ""}
      </span>
    </TooltipProvider>
  )
}
