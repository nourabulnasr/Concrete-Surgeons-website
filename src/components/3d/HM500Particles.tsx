'use client'
import { useRef, useMemo, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import type { InstancedMesh } from 'three'
import { Object3D, Color } from 'three'
import { useIsMobile } from '@/hooks/useIsMobile'

const BOUNDS = { x: 4.5, y: 4.5, z: 2.5 }

function rand(min: number, max: number) {
  return Math.random() * (max - min) + min
}

const WARM = new Color('#c88840')
const COOL = new Color('#f0e2c8')
const TMP  = new Color()

export function HM500Particles() {
  const isMobile = useIsMobile()
  const count = isMobile ? 300 : 800
  const meshRef = useRef<InstancedMesh>(null)
  const dummy = useMemo(() => new Object3D(), [])

  const particles = useMemo(() => {
    return Array.from({ length: count }, () => ({
      x: rand(-BOUNDS.x, BOUNDS.x),
      y: rand(-BOUNDS.y, BOUNDS.y),
      z: rand(-BOUNDS.z, BOUNDS.z),
      vx: rand(-0.0025, 0.0025),
      vy: rand(-0.0018, 0.0018),
      vz: rand(-0.0008, 0.0008),
      size: rand(0.01, 0.042),
      phase: rand(0, Math.PI * 2),
      warm: Math.random() > 0.35,
    }))
  }, [count])

  // Set per-instance colors once on mount
  useEffect(() => {
    const mesh = meshRef.current
    if (!mesh) return
    for (let i = 0; i < count; i++) {
      mesh.setColorAt(i, particles[i].warm ? WARM : COOL)
    }
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true
  }, [count, particles])

  useFrame(({ clock }) => {
    const mesh = meshRef.current
    if (!mesh) return
    const t = clock.getElapsedTime()

    for (let i = 0; i < count; i++) {
      const p = particles[i]

      // Drift with gentle sinusoidal turbulence
      p.x += p.vx + Math.sin(t * 0.11 + p.phase) * 0.00055
      p.y += p.vy + Math.cos(t * 0.09 + p.phase * 1.4) * 0.00045
      p.z += p.vz

      // Wrap bounds
      if (p.x >  BOUNDS.x) p.x = -BOUNDS.x
      if (p.x < -BOUNDS.x) p.x =  BOUNDS.x
      if (p.y >  BOUNDS.y) p.y = -BOUNDS.y
      if (p.y < -BOUNDS.y) p.y =  BOUNDS.y
      if (p.z >  BOUNDS.z) p.z = -BOUNDS.z
      if (p.z < -BOUNDS.z) p.z =  BOUNDS.z

      // Pulsing size — sine wave per particle phase
      const pulse = 0.72 + 0.28 * Math.sin(t * 1.3 + p.phase)
      dummy.position.set(p.x, p.y, p.z)
      dummy.scale.setScalar(p.size * pulse)
      dummy.updateMatrix()
      mesh.setMatrixAt(i, dummy.matrix)

      // Subtle color shift — warm particles drift cooler and back over time
      if (p.warm) {
        const blend = 0.08 + 0.08 * Math.sin(t * 0.4 + p.phase)
        TMP.copy(WARM).lerp(COOL, blend)
        mesh.setColorAt(i, TMP)
      }
    }

    mesh.instanceMatrix.needsUpdate = true
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true
  })

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 5, 5]} />
      <meshBasicMaterial vertexColors transparent opacity={0.32} />
    </instancedMesh>
  )
}
