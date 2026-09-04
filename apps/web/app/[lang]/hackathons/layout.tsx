import type { ReactNode } from "react"
import type { Viewport } from "next"

import styles from "./hackathons.module.css"

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
}

export default function HackathonsLayout({ children }: { children: ReactNode }) {
  return (
    <div className={styles.shell}>
      <div className={styles.grain} aria-hidden="true" />
      {children}
    </div>
  )
}
