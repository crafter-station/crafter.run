import { toJsxRuntime } from "hast-util-to-jsx-runtime"
import type { ComponentPropsWithoutRef } from "react"
import { Fragment, jsx, jsxs } from "react/jsx-runtime"

import { shipMarkdownTree } from "@/lib/ship-markdown"

const components = {
  // Wide tables scroll inside their own box instead of widening the page.
  table: (props: ComponentPropsWithoutRef<"table">) => (
    <div className="ship-prose-table">
      <table {...props} />
    </div>
  ),
}

/** A Ship's description or update body as prose. Member markdown only: no HTML, scripts or unsafe URLs reach the page. */
export function ShipMarkdown({ source, className = "" }: { source: string; className?: string }) {
  return (
    <div className={`ship-prose blog-body ${className}`.trim()}>
      {toJsxRuntime(shipMarkdownTree(source), { Fragment, jsx, jsxs, components })}
    </div>
  )
}
