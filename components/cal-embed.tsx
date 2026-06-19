"use client"

import { useEffect } from "react"

declare global {
  interface Window {
    Cal?: any
  }
}

export function CalEmbed({ calLink, namespace }: { calLink: string; namespace: string }) {
  useEffect(() => {
    ;(function (C: Window, A: string, L: string) {
      const p = function (a: any, ar: IArguments | any[]) {
        a.q.push(ar)
      }
      const d = C.document
      C.Cal =
        C.Cal ||
        function () {
          const cal = C.Cal
          const ar = arguments
          if (!cal.loaded) {
            cal.ns = {}
            cal.q = cal.q || []
            d.head.appendChild(d.createElement("script")).src = A
            cal.loaded = true
          }
          if (ar[0] === L) {
            const api: any = function () {
              p(api, arguments)
            }
            const ns = ar[1]
            api.q = api.q || []
            if (typeof ns === "string") {
              cal.ns[ns] = cal.ns[ns] || api
              p(cal.ns[ns], ar)
              p(cal, ["initNamespace", ns])
            } else {
              p(cal, ar)
            }
            return
          }
          p(cal, ar)
        }
    })(window, "https://app.cal.com/embed/embed.js", "init")

    window.Cal?.("init", namespace, { origin: "https://app.cal.com" })
    window.Cal?.ns?.[namespace]?.("inline", {
      elementOrSelector: `#cal-embed-${namespace}`,
      config: {
        layout: "month_view",
        useSlotsViewOnSmallScreen: "true",
        theme: "dark",
      },
      calLink,
    })
    window.Cal?.ns?.[namespace]?.("ui", {
      cssVarsPerTheme: {
        dark: {
          "cal-brand": "#F2EDED",
          "cal-bg": "#131010",
          "cal-bg-emphasis": "#1e1b1b",
          "cal-bg-subtle": "#1a1717",
          "cal-border": "#3D3838",
          "cal-border-emphasis": "#716B6A",
          "cal-text": "#F2EDED",
          "cal-text-emphasis": "#F2EDED",
          "cal-text-subtle": "#7F7A7A",
        },
      },
      hideEventTypeDetails: false,
      layout: "month_view",
    })
  }, [calLink, namespace])

  return (
    <div
      id={`cal-embed-${namespace}`}
      className="mx-auto h-[660px] w-full max-w-[1380px] overflow-scroll border-x border-line"
    />
  )
}
