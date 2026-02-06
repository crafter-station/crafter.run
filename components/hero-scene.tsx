"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { EffectComposer } from "@react-three/postprocessing"
import { Vector2, type Group } from "three"
import { AsciiEffect } from "./ascii-effect"

const catMat = { color: "#e0e0e0", roughness: 0.4, metalness: 0.6 }
const darkMat = { color: "#2a2a2a", roughness: 0.5, metalness: 0.3 }
const noseMat = { color: "#d4a0a0", roughness: 0.6, metalness: 0.2 }

function CatModel() {
  const groupRef = useRef<Group>(null)

  useFrame((state) => {
    if (!groupRef.current) return
    const t = state.clock.elapsedTime
    // Gentle floating + slow rotation
    groupRef.current.rotation.y = Math.sin(t * 0.2) * 0.3
    groupRef.current.position.y = Math.sin(t * 0.5) * 0.15
    // Subtle breathing scale
    const breathe = 1 + Math.sin(t * 1.2) * 0.01
    groupRef.current.scale.set(breathe, breathe, breathe)
  })

  return (
    <group ref={groupRef} position={[0, -0.3, 0]}>
      {/* === HEAD === */}
      <mesh position={[0, 1.35, 0]}>
        <sphereGeometry args={[0.7, 32, 32]} />
        <meshStandardMaterial {...catMat} />
      </mesh>

      {/* Left ear */}
      <mesh position={[-0.42, 2.05, 0]} rotation={[0, 0, -0.25]}>
        <coneGeometry args={[0.25, 0.5, 4]} />
        <meshStandardMaterial {...catMat} />
      </mesh>
      {/* Left inner ear */}
      <mesh position={[-0.4, 2.0, 0.08]} rotation={[0, 0, -0.25]}>
        <coneGeometry args={[0.14, 0.35, 4]} />
        <meshStandardMaterial {...noseMat} />
      </mesh>

      {/* Right ear */}
      <mesh position={[0.42, 2.05, 0]} rotation={[0, 0, 0.25]}>
        <coneGeometry args={[0.25, 0.5, 4]} />
        <meshStandardMaterial {...catMat} />
      </mesh>
      {/* Right inner ear */}
      <mesh position={[0.4, 2.0, 0.08]} rotation={[0, 0, 0.25]}>
        <coneGeometry args={[0.14, 0.35, 4]} />
        <meshStandardMaterial {...noseMat} />
      </mesh>

      {/* Left eye */}
      <mesh position={[-0.25, 1.45, 0.58]}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial {...darkMat} />
      </mesh>
      {/* Right eye */}
      <mesh position={[0.25, 1.45, 0.58]}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial {...darkMat} />
      </mesh>

      {/* Eye shine left */}
      <mesh position={[-0.22, 1.48, 0.68]}>
        <sphereGeometry args={[0.035, 8, 8]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.5} />
      </mesh>
      {/* Eye shine right */}
      <mesh position={[0.28, 1.48, 0.68]}>
        <sphereGeometry args={[0.035, 8, 8]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.5} />
      </mesh>

      {/* Nose */}
      <mesh position={[0, 1.2, 0.65]} rotation={[Math.PI, 0, 0]}>
        <coneGeometry args={[0.06, 0.08, 3]} />
        <meshStandardMaterial {...noseMat} />
      </mesh>

      {/* Muzzle */}
      <mesh position={[0, 1.12, 0.55]}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial {...catMat} />
      </mesh>

      {/* === BODY === */}
      <mesh position={[0, 0.15, 0]}>
        <capsuleGeometry args={[0.55, 0.7, 16, 32]} />
        <meshStandardMaterial {...catMat} />
      </mesh>

      {/* === LEGS === */}
      {/* Front left */}
      <mesh position={[-0.3, -0.7, 0.25]}>
        <capsuleGeometry args={[0.13, 0.5, 8, 16]} />
        <meshStandardMaterial {...catMat} />
      </mesh>
      {/* Front right */}
      <mesh position={[0.3, -0.7, 0.25]}>
        <capsuleGeometry args={[0.13, 0.5, 8, 16]} />
        <meshStandardMaterial {...catMat} />
      </mesh>
      {/* Back left */}
      <mesh position={[-0.3, -0.7, -0.25]}>
        <capsuleGeometry args={[0.14, 0.45, 8, 16]} />
        <meshStandardMaterial {...catMat} />
      </mesh>
      {/* Back right */}
      <mesh position={[0.3, -0.7, -0.25]}>
        <capsuleGeometry args={[0.14, 0.45, 8, 16]} />
        <meshStandardMaterial {...catMat} />
      </mesh>

      {/* Paws (front) */}
      <mesh position={[-0.3, -1.05, 0.25]}>
        <sphereGeometry args={[0.14, 12, 12]} />
        <meshStandardMaterial {...catMat} />
      </mesh>
      <mesh position={[0.3, -1.05, 0.25]}>
        <sphereGeometry args={[0.14, 12, 12]} />
        <meshStandardMaterial {...catMat} />
      </mesh>

      {/* === TAIL === */}
      <TailCurve />

      {/* Whiskers - left */}
      <mesh position={[-0.45, 1.22, 0.5]} rotation={[0, 0, 0.15]}>
        <cylinderGeometry args={[0.005, 0.005, 0.5, 4]} />
        <meshStandardMaterial color="#999999" />
      </mesh>
      <mesh position={[-0.48, 1.17, 0.5]} rotation={[0, 0, 0.05]}>
        <cylinderGeometry args={[0.005, 0.005, 0.5, 4]} />
        <meshStandardMaterial color="#999999" />
      </mesh>
      {/* Whiskers - right */}
      <mesh position={[0.45, 1.22, 0.5]} rotation={[0, 0, -0.15]}>
        <cylinderGeometry args={[0.005, 0.005, 0.5, 4]} />
        <meshStandardMaterial color="#999999" />
      </mesh>
      <mesh position={[0.48, 1.17, 0.5]} rotation={[0, 0, -0.05]}>
        <cylinderGeometry args={[0.005, 0.005, 0.5, 4]} />
        <meshStandardMaterial color="#999999" />
      </mesh>
    </group>
  )
}

function TailCurve() {
  const segments = 8
  return (
    <group position={[0, 0.1, -0.5]}>
      {Array.from({ length: segments }).map((_, i) => {
        const t = i / (segments - 1)
        const angle = t * Math.PI * 0.8
        const x = Math.sin(angle) * 0.3
        const y = t * 0.9 + 0.1
        const z = -Math.cos(angle) * 0.4 - 0.1
        const radius = 0.08 - t * 0.03
        return (
          <mesh key={i} position={[x, y, z]}>
            <sphereGeometry args={[radius, 8, 8]} />
            <meshStandardMaterial {...catMat} />
          </mesh>
        )
      })}
    </group>
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

        <CatModel />

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
