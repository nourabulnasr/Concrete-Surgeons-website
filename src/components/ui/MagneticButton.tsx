'use client'
import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useReducedMotion } from 'motion/react'

interface Props {
  children: React.ReactNode
  strength?: number
  style?: React.CSSProperties
  className?: string
}

export function MagneticButton({ children, strength = 0.38, style, className }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const prefersReduced = useReducedMotion()

  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const x = useSpring(rawX, { stiffness: 220, damping: 18 })
  const y = useSpring(rawY, { stiffness: 220, damping: 18 })

  const onMouseMove = (e: React.MouseEvent) => {
    if (prefersReduced || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    rawX.set((e.clientX - rect.left - rect.width / 2) * strength)
    rawY.set((e.clientY - rect.top - rect.height / 2) * strength)
  }

  const onMouseLeave = () => {
    rawX.set(0)
    rawY.set(0)
  }

  return (
    <motion.div
      ref={ref}
      style={{ display: 'inline-block', x, y, ...style }}
      className={className}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </motion.div>
  )
}
