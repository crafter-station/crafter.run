"use client"

import { useEffect, useRef, useState } from "react"

const GRID = [
  "..#..........#..",
  "..##........##..",
  ".#pp########pp#.",
  ".#oooooooooooo#.",
  ".#oooooooooooo#.",
  ".#oooooooooooo#.",
  ".#oooooooooooo#.",
  ".#occooooooocco#.",
  ".#oooooooooooo#.",
  "..#oooooooooo#..",
  "...##########...",
]
const COLORS: Record<string, string> = { "#": "#20221d", o: "#f4d56d", p: "#e8a2a2", c: "#f0a37f" }
type Mood = "watching" | "happy" | "sleepy"

/** A pixel pet drawn in SVG: the eyes follow the pointer, a click makes it jump and purr, idle time puts it to sleep. */
export function PetdexDemo({ label, unit, moods }: { label: string; unit: string; moods: [string, string, string] }) {
  const stage = useRef<HTMLDivElement>(null)
  const [look, setLook] = useState<[number, number]>([0, 0])
  const [mood, setMood] = useState<Mood>("sleepy")
  const [pets, setPets] = useState(0)
  const [burst, setBurst] = useState(0)
  const wake = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const calm = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" || !stage.current) return
      const box = stage.current.getBoundingClientRect()
      const dx = event.clientX - (box.left + box.width / 2)
      const dy = event.clientY - (box.top + box.height / 2)
      const next: [number, number] = [dx > 24 ? 1 : dx < -24 ? -1 : 0, dy > 24 ? 1 : dy < -24 ? -1 : 0]
      setLook(prev => (prev[0] === next[0] && prev[1] === next[1] ? prev : next))
      setMood(prev => (prev === "sleepy" ? "watching" : prev))
      clearTimeout(wake.current)
      wake.current = setTimeout(() => setMood(prev => (prev === "watching" ? "sleepy" : prev)), 6000)
    }
    window.addEventListener("pointermove", onMove, { passive: true })
    return () => { window.removeEventListener("pointermove", onMove); clearTimeout(wake.current); clearTimeout(calm.current) }
  }, [])

  function pet() {
    setPets(count => count + 1)
    setBurst(count => count + 1)
    setMood("happy")
    clearTimeout(calm.current)
    calm.current = setTimeout(() => setMood("watching"), 1400)
  }

  const squint = mood !== "watching"
  const [ex, ey] = [look[0] > 0 ? 1 : 0, look[1] > 0 ? 1 : 0]
  const label_ = mood === "happy" ? moods[1] : mood === "sleepy" ? moods[2] : moods[0]

  return (
    <div className="wb-petdex" ref={stage}>
      <button type="button" className="wb-pet" data-mood={mood} onClick={pet} aria-label={label}>
        <svg viewBox="0 0 16 11" shapeRendering="crispEdges" aria-hidden="true">
          {GRID.flatMap((row, y) => [...row].map((cell, x) => (cell === "." ? null : <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill={COLORS[cell]} />)))}
          {squint ? (
            <>
              <rect x="4" y="5.5" width="2" height=".6" fill="#20221d" />
              <rect x="10" y="5.5" width="2" height=".6" fill="#20221d" />
            </>
          ) : (
            <>
              <rect x="4" y="4" width="2" height="2" fill="#fff" />
              <rect x="10" y="4" width="2" height="2" fill="#fff" />
              <rect className="wb-pupil" x={4 + ex} y={4 + ey} width="1" height="1" fill="#20221d" />
              <rect className="wb-pupil" x={10 + ex} y={4 + ey} width="1" height="1" fill="#20221d" />
            </>
          )}
          {mood === "happy"
            ? <path d="M6.5 7 h3 v.7 h-.7 v.7 h-1.6 v-.7 h-.7z" fill="#20221d" />
            : <rect x="7.5" y="7.4" width="1" height=".6" fill="#20221d" />}
        </svg>
        {burst > 0 ? <span key={burst} className="wb-hearts" aria-hidden="true"><i>♥</i><i>♥</i><i>♥</i></span> : null}
        {mood === "sleepy" ? <span className="wb-zzz" aria-hidden="true">z</span> : null}
      </button>
      <p className="wb-petdex-meta"><span>{label_}</span><span><b>{pets}</b> {unit}</span></p>
    </div>
  )
}
