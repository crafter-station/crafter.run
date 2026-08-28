"use client"

import dynamic from "next/dynamic"
import { createContext, useContext, useEffect, useState } from "react"

import { cn } from "@/lib/utils"

/* Both backdrops are loaded on demand, and that is not an optimisation, it is
   the difference between shipping them and not. Next puts the `not-found`
   boundary in every route's client bundle so a client navigation can render
   it, so a static import here would put three.js and nine compiled shaders on
   the blog, the docs, and every other page that has never 404'd. */
const BlackHole = dynamic(
  () => import("@/components/black-hole").then((m) => m.BlackHole),
  { ssr: false },
)
const NotFoundSurface = dynamic(
  () => import("@/components/not-found-surface").then((m) => m.NotFoundSurface),
  { ssr: false },
)

/**
 * Whether this browser exposes WebGPU at all. Inlined rather than imported
 * from the renderer, because importing anything out of that module statically
 * would defeat the dynamic import above.
 *
 * A `true` is not a promise that an adapter exists, which is why
 * `onUnavailable` still has to be wired.
 */
function supportsWebGpu(): boolean {
  return typeof navigator !== "undefined" && "gpu" in navigator
}

/**
 * Picks what sits behind the 404 and keeps the rest of the page in step with
 * the answer, because the figure's stacking, the page's palette, and the
 * pointer hint all depend on it.
 *
 * Three outcomes, in order of preference. WebGPU gets the black hole. Anything
 * else that will still animate gets the water, the same surface the home page
 * hero uses, which needs only WebGL. Reduced motion gets neither and the page
 * falls back to the figure it renders in the DOM regardless.
 *
 * The server cannot know which of the three it is, so it renders `still` and
 * the client corrects it after mount. That order is deliberate: `still` is the
 * state where the DOM figure is visible, so the page is never briefly missing
 * its 404 while the question is being answered.
 */
export type BackdropMode = "still" | "water" | "blackHole"

const ModeContext = createContext<BackdropMode>("still")
const SetModeContext = createContext<((mode: BackdropMode) => void) | null>(null)

function useMode(): BackdropMode {
  return useContext(ModeContext)
}

export function NotFoundBackdropProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<BackdropMode>("still")

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    setMode(supportsWebGpu() ? "blackHole" : "water")
  }, [])

  return (
    <ModeContext.Provider value={mode}>
      <SetModeContext.Provider value={setMode}>
        {/* Space is black in both themes, so the section stops taking the
            page's word for it and forces the dark palette under the black
            hole. Without this a light-theme visitor gets near-black type on a
            starfield wherever the scrims have faded out. `theme-scope` is what
            makes a nested flip work at all; see its comment in globals.css. */}
        <div className={cn(mode === "blackHole" && "dark theme-scope")}>{children}</div>
      </SetModeContext.Provider>
    </ModeContext.Provider>
  )
}

export function NotFoundBackdrop({ caption }: { caption: string }) {
  const mode = useMode()
  const setMode = useContext(SetModeContext)

  if (mode === "blackHole") {
    // `supportsWebGpu` only says the API is exposed. A machine with no adapter
    // still fails inside `init`, and the water is a better answer to that than
    // a black rectangle.
    return <BlackHole className="z-1" onUnavailable={() => setMode?.("water")} />
  }

  if (mode === "water") return <NotFoundSurface caption={caption} className="z-1" />

  return null
}

/**
 * The figure, in the DOM, for every backdrop that leaves room for it. The
 * water paints its own copy and covers this one; a still page shows it as is.
 *
 * The black hole does not leave room. Its disk fills the same right-hand half
 * the figure wants and is far too bright to read a number over, and the page
 * is not short of ways to say 404: the eyebrow says it, the headline says it,
 * and the URL bar says it. So the art gets the frame to itself.
 */
export function NotFoundFigure({ caption }: { caption: string }) {
  const mode = useMode()
  if (mode === "blackHole") return null

  return (
    <div
      aria-hidden
      className="absolute inset-0 z-0 flex select-none flex-col items-center justify-start pt-[9%] lg:items-end lg:justify-center lg:pt-0 lg:pr-[8%]"
    >
      <span className="font-bold leading-none tracking-tight text-[22vw] text-foreground lg:text-[13rem]">
        404
      </span>
      <span className="mt-6 font-mono text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
        {caption}
      </span>
    </div>
  )
}

/**
 * Settles the backdrop behind the copy without swallowing it. The water is
 * quiet enough for a fade over the copy alone; the black hole's disk is the
 * brightest thing on the page and, stacked on a phone, it sits exactly where
 * the eyebrow does, so that layout gets a second fade from the top.
 */
export function NotFoundScrims() {
  const mode = useMode()

  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-2 h-1/2 bg-linear-to-t from-background via-background/85 to-transparent lg:hidden"
      />
      {mode === "blackHole" && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 z-2 h-1/4 bg-linear-to-b from-background via-background/70 to-transparent lg:hidden"
        />
      )}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 z-2 hidden w-[40%] bg-linear-to-r from-background via-background/85 to-transparent lg:block"
      />
    </>
  )
}

/** Only meaningful when there is something to disturb, and it names the thing. */
export function NotFoundHint({ water, blackHole }: { water: string; blackHole: string }) {
  const mode = useMode()
  if (mode === "still") return null

  return (
    <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
      {mode === "blackHole" ? blackHole : water}
    </p>
  )
}
