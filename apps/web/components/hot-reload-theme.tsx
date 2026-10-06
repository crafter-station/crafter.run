import type { ReactNode } from "react"

export function HotReloadTheme({ children }: { children: ReactNode }) {
  return <main className="hot-reload-theme">{children}</main>
}
