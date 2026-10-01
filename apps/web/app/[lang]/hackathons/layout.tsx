import type { ReactNode } from "react"
import type { Viewport } from "next"

import styles from "./hackathons.module.css"

export const viewport: Viewport = {
  themeColor: [{ media: "(prefers-color-scheme: light)", color: "#F7F7F2" }, { media: "(prefers-color-scheme: dark)", color: "#191B17" }],
}

export default function HackathonsLayout({ children }: { children: ReactNode }) {
  return (
    <div className={styles.shell}>
      <div className={styles.grain} aria-hidden="true" />
      {children}
    </div>
  )
}
