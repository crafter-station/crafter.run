"use client"

import { useEffect, useState } from "react"

export function LocalTime({ timezone }: { timezone: string }) {
  const [time, setTime] = useState<string | null>(null)

  useEffect(() => {
    const format = () =>
      new Intl.DateTimeFormat("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        timeZone: timezone,
      }).format(new Date())

    setTime(format())
    const id = setInterval(() => setTime(format()), 20_000)
    return () => clearInterval(id)
  }, [timezone])

  // Render nothing until mounted to avoid a hydration mismatch.
  if (!time) return null
  return <>{time} local</>
}
