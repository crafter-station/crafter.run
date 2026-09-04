"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"

import styles from "./hackathons.module.css"

export function HackathonsExperience({
  children,
  navigationLabel,
  navigationItemLabel,
}: {
  children: ReactNode
  navigationLabel: string
  navigationItemLabel: string
}) {
  const rootRef = useRef<HTMLDivElement>(null)
  const [activeSection, setActiveSection] = useState(0)
  const [sectionCount, setSectionCount] = useState(0)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    const sections = Array.from(root.querySelectorAll<HTMLElement>("[data-hack-section]"))
    const reveals = Array.from(root.querySelectorAll<HTMLElement>("[data-hack-reveal]"))
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    setSectionCount(sections.length)

    if (reducedMotion) {
      root.dataset.motion = "reduced"
      reveals.forEach((element) => element.setAttribute("data-visible", "true"))
    } else {
      root.dataset.motion = "ready"
    }

    const animatedCounters = new WeakSet<HTMLElement>()
    const revealObserver = reducedMotion
      ? null
      : new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (!entry.isIntersecting) return
              const element = entry.target as HTMLElement
              element.setAttribute("data-visible", "true")
              revealObserver?.unobserve(element)

              const target = Number(element.dataset.count)
              if (!Number.isFinite(target) || animatedCounters.has(element)) return
              animatedCounters.add(element)
              const prefix = element.dataset.prefix ?? ""
              const suffix = element.dataset.suffix ?? ""
              const start = performance.now()

              const draw = (now: number) => {
                const progress = Math.min((now - start) / 1100, 1)
                const eased = 1 - (1 - progress) ** 3
                element.textContent = `${prefix}${Math.round(target * eased).toLocaleString("en-US")}${suffix}`
                if (progress < 1) requestAnimationFrame(draw)
              }

              requestAnimationFrame(draw)
            })
          },
          { threshold: 0.2 },
        )

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          const index = sections.indexOf(entry.target as HTMLElement)
          if (index >= 0) setActiveSection(index)
        })
      },
      { rootMargin: "-42% 0px -42% 0px" },
    )

    reveals.forEach((element) => revealObserver?.observe(element))
    sections.forEach((section) => sectionObserver.observe(section))

    return () => {
      revealObserver?.disconnect()
      sectionObserver.disconnect()
    }
  }, [])

  return (
    <div className={styles.experience} ref={rootRef}>
      {children}
      {sectionCount > 0 && (
        <nav className={styles.progress} aria-label={navigationLabel}>
          {Array.from({ length: sectionCount }, (_, index) => (
            <button
              type="button"
              key={index}
              className={index === activeSection ? styles.progressActive : undefined}
              onClick={() => {
                rootRef.current
                  ?.querySelectorAll<HTMLElement>("[data-hack-section]")
                  [index]?.scrollIntoView({
                    behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
                      ? "auto"
                      : "smooth",
                  })
              }}
              aria-label={`${navigationItemLabel} ${index + 1}`}
              aria-current={index === activeSection ? "step" : undefined}
            />
          ))}
        </nav>
      )}
    </div>
  )
}
