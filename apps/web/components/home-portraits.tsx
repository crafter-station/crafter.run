"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { type Locale, withLocale } from "@/lib/i18n"

export type Portrait = { username: string; name: string; image: string }

const SLOTS = 4
const LAST_KEY = "crafter:home-portraits"

function pick(pool: Portrait[], avoid: string) {
  for (let attempt = 0; attempt < 8; attempt++) {
    const shuffled = [...pool]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    const next = shuffled.slice(0, SLOTS)
    if (next.map((p) => p.username).sort().join() !== avoid) return next
  }
  return null
}

function preload(src: string) {
  const img = new Image()
  img.src = src
  return img.decode().catch(() => undefined)
}

/**
 * The server always renders `initial`, so the HTML and the first client render
 * match. After mount, four other members are chosen, their images decoded, and
 * only then swapped in, so nothing blocks paint or shifts layout.
 */
export function HomePortraits({ initial, pool, locale }: { initial: Portrait[]; pool: Portrait[]; locale: Locale }) {
  const [people, setPeople] = useState(initial)
  const [swapping, setSwapping] = useState(false)

  useEffect(() => {
    if (pool.length <= SLOTS) return
    let cancelled = false
    let last = initial.map((p) => p.username).sort().join()
    try { last = localStorage.getItem(LAST_KEY) ?? last } catch {}
    const next = pick(pool, last)
    if (!next) return
    try { localStorage.setItem(LAST_KEY, next.map((p) => p.username).sort().join()) } catch {}
    Promise.all(next.map((p) => preload(p.image))).then(() => {
      if (cancelled) return
      setSwapping(true)
      window.setTimeout(() => {
        if (cancelled) return
        setPeople(next)
        setSwapping(false)
      }, 160)
    })
    return () => { cancelled = true }
  }, [initial, pool])

  return (
    <div className="home-portraits" data-swapping={swapping || undefined}>
      {people.map((person, i) => (
        <Link href={withLocale(`/team/${person.username}`, locale)} key={i} className="home-portrait">
          <div className="home-portrait-image">
            <div className="home-portrait-cutout" style={{ clipPath: `url(#portrait-crop-${i})` }}>
              <span className="home-portrait-plate" style={{ clipPath: `url(#portrait-shape-${i})` }} aria-hidden="true" />
              <img src={person.image} alt="" width="768" height="768" loading="lazy" />
            </div>
          </div>
          <div className="home-portrait-caption"><span>{person.name}</span><span className="station-label">0{i + 1}</span></div>
        </Link>
      ))}
    </div>
  )
}
