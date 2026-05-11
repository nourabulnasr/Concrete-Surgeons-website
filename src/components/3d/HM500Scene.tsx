'use client'
import { useRef, useCallback, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { PerspectiveCamera } from '@react-three/drei'
import { useMotionValue, useSpring } from 'motion/react'
import type { MotionValue } from 'motion/react'
import { HM500Cartridge } from './HM500Cartridge'
import { HM500Particles } from './HM500Particles'
import { useIsMobile } from '@/hooks/useIsMobile'

interface Props {
  scrollRotation: MotionValue<number>
}

export default function HM500Scene({ scrollRotation }: Props) {
  const isMobile = useIsMobile()
  const [isDragging, setIsDragging] = useState(false)
  const lastX = useRef(0)

  const rawDragOffset = useMotionValue(0)
  const dragOffset = useSpring(rawDragOffset, { stiffness: 180, damping: 28 })

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    setIsDragging(true)
    lastX.current = e.clientX
  }, [])

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging) return
    const delta = e.clientX - lastX.current
    lastX.current = e.clientX
    rawDragOffset.set(rawDragOffset.get() + delta * 0.014)
  }, [isDragging, rawDragOffset])

  const onPointerUp = useCallback(() => {
    setIsDragging(false)
    rawDragOffset.set(0)
  }, [rawDragOffset])

  return (
    <div
      style={{ width: '100%', height: '100%', cursor: isDragging ? 'grabbing' : 'grab' }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerUp}
    >
      <Canvas
        gl={{ antialias: true, alpha: true }}
        dpr={[1, isMobile ? 1.5 : 2]}
        style={{ background: 'transparent' }}
      >
        <PerspectiveCamera makeDefault position={[0, 0, 6]} fov={35} />

        {/* Warm key light */}
        <directionalLight
          position={[-2.5, 3.5, 2.5]}
          color="#ffd090"
          intensity={4}
        />
        {/* Cool fill */}
        <directionalLight
          position={[3, -1.5, 1.5]}
          color="#a8c8e8"
          intensity={1.2}
        />
        {/* Warm rim */}
        <directionalLight
          position={[0, -2, -3.5]}
          color="#ffe8c0"
          intensity={2.5}
        />
        {/* Ambient */}
        <ambientLight color="#fff8f0" intensity={0.25} />

        <HM500Cartridge rotationY={scrollRotation} dragOffset={dragOffset} />
        <HM500Particles />
      </Canvas>
    </div>
  )
}
