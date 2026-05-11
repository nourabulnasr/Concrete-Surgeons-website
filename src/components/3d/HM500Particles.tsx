'use client'
import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import type { InstancedMesh } from 'three'
import { Object3D, Color } from 'three'
import { useIsMobile } from '@/hooks/useIsMobile'

const BOUNDS = { x: 4, y: 4, z: 2 }

function rand(min: number, max: number) {
  return Math.random() * (max - min) + min
}

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
      vx: rand(-0.003, 0.003),
      vy: rand(-0.002, 0.002),
      vz: rand(-0.001, 0.001),
      size: rand(0.012, 0.045),
    }))
  }, [count])

  useFrame(() => {
    if (!meshRef.current) return

    for (let i = 0; i < count; i++) {
      const p = particles[i]
      p.x += p.vx
      p.y += p.vy
      p.z += p.vz

      if (p.x > BOUNDS.x) p.x = -BOUNDS.x
      if (p.x < -BOUNDS.x) p.x = BOUNDS.x
      if (p.y > BOUNDS.y) p.y = -BOUNDS.y
      if (p.y < -BOUNDS.y) p.y = BOUNDS.y
      if (p.z > BOUNDS.z) p.z = -BOUNDS.z
      if (p.z < -BOUNDS.z) p.z = BOUNDS.z

      dummy.position.set(p.x, p.y, p.z)
      dummy.scale.setScalar(p.size)
      dummy.updateMatrix()
      meshRef.current.setMatrixAt(i, dummy.matrix)
    }
    meshRef.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 4, 4]} />
      <meshBasicMaterial color={new Color('#d09050')} transparent opacity={0.35} />
    </instancedMesh>
  )
}
