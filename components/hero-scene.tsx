"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { EffectComposer } from "@react-three/postprocessing"
import { Vector2, type Mesh } from "three"
import { AsciiEffect } from "./ascii-effect"

function RotatingGeometry() {
  const meshRef = useRef<Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.15
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2
    }
  })

  return (
    <mesh ref={meshRef}>
      <torusKnotGeometry args={[1.2, 0.4, 128, 32]} />
      <meshStandardMaterial color="#e8e8e8" roughness={0.3} metalness={0.7} />
    </mesh>
  )
}

function FloatingOrbs() {
  const orb1Ref = useRef<Mesh>(null)
  const orb2Ref = useRef<Mesh>(null)
  const orb3Ref = useRef<Mesh>(null)

  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (orb1Ref.current) {
      orb1Ref.current.position.x = Math.sin(t * 0.3) * 2.5
      orb1Ref.current.position.y = Math.cos(t * 0.4) * 1.5
      orb1Ref.current.position.z = Math.sin(t * 0.2) * 1
    }
    if (orb2Ref.current) {
      orb2Ref.current.position.x = Math.cos(t * 0.25) * 3
      orb2Ref.current.position.y = Math.sin(t * 0.35) * 2
      orb2Ref.current.position.z = Math.cos(t * 0.15) * 1.5
    }
    if (orb3Ref.current) {
      orb3Ref.current.position.x = Math.sin(t * 0.2 + 2) * 2
      orb3Ref.current.position.y = Math.cos(t * 0.3 + 1) * 1.8
      orb3Ref.current.position.z = Math.sin(t * 0.25 + 3) * 0.8
    }
  })

  return (
    <>
      <mesh ref={orb1Ref}>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial color="#c0c0c0" roughness={0.2} metalness={0.8} />
      </mesh>
      <mesh ref={orb2Ref}>
        <sphereGeometry args={[0.2, 32, 32]} />
        <meshStandardMaterial color="#d0d0d0" roughness={0.3} metalness={0.6} />
      </mesh>
      <mesh ref={orb3Ref}>
        <octahedronGeometry args={[0.25, 0]} />
        <meshStandardMaterial color="#b0b0b0" roughness={0.1} metalness={0.9} />
      </mesh>
    </>
  )
}

export function HeroScene() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [mousePos, setMousePos] = useState(new Vector2(0, 0))
  const [resolution, setResolution] = useState(new Vector2(1920, 1080))

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = rect.height - (e.clientY - rect.top)
      setMousePos(new Vector2(x, y))
    }
  }, [])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    container.addEventListener("mousemove", handleMouseMove)

    const rect = container.getBoundingClientRect()
    setResolution(new Vector2(rect.width, rect.height))

    const handleResize = () => {
      const r = container.getBoundingClientRect()
      setResolution(new Vector2(r.width, r.height))
    }
    window.addEventListener("resize", handleResize)

    return () => {
      container.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("resize", handleResize)
    }
  }, [handleMouseMove])

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full"
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        style={{ background: "#050505" }}
        gl={{ antialias: true }}
      >
        <color attach="background" args={["#050505"]} />

        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} />
        <pointLight position={[-3, 2, 4]} intensity={0.5} color="#ffffff" />

        <RotatingGeometry />
        <FloatingOrbs />

        <EffectComposer>
          <AsciiEffect
            style="standard"
            cellSize={9}
            invert={false}
            color={false}
            resolution={resolution}
            mousePos={mousePos}
            postfx={{
              scanlineIntensity: 0.05,
              scanlineCount: 300,
              targetFPS: 0,
              jitterIntensity: 0,
              jitterSpeed: 1,
              mouseGlowEnabled: false,
              mouseGlowRadius: 200,
              mouseGlowIntensity: 1.5,
              vignetteIntensity: 0.6,
              vignetteRadius: 1.2,
              colorPalette: 0,
              curvature: 0,
              aberrationStrength: 0,
              noiseIntensity: 0.03,
              noiseScale: 2,
              noiseSpeed: 0.5,
              waveAmplitude: 0,
              waveFrequency: 10,
              waveSpeed: 1,
              glitchIntensity: 0,
              glitchFrequency: 0,
              brightnessAdjust: 0,
              contrastAdjust: 1.2,
            }}
          />
        </EffectComposer>
      </Canvas>
    </div>
  )
}
