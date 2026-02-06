"use client"

import dynamic from "next/dynamic"

const HeroScene = dynamic(
  () => import("@/components/hero-scene").then((mod) => mod.HeroScene),
  { ssr: false }
)

export function HeroSceneLoader() {
  return <HeroScene />
}
