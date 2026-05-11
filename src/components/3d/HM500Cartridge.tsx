'use client'
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group } from 'three'
import type { MotionValue } from 'motion/react'

const bodyMat = { color: '#191512', roughness: 0.28, metalness: 0.06 }
const labelMat = { color: '#f2ede4', roughness: 0.75, metalness: 0 }
const ringMat = { color: '#c8925a', roughness: 0.18, metalness: 0.35 }

interface Props {
  rotationY: MotionValue<number>
  dragOffset: MotionValue<number>
}

export function HM500Cartridge({ rotationY, dragOffset }: Props) {
  const groupRef = useRef<Group>(null)

  useFrame(() => {
    if (!groupRef.current) return
    groupRef.current.rotation.y = rotationY.get() + dragOffset.get()
  })

  return (
    <group ref={groupRef} rotation={[0.12, 0, 0]}>
      {/* Nozzle tip */}
      <mesh position={[0, 1.62, 0]}>
        <cylinderGeometry args={[0.06, 0.13, 0.28, 24]} />
        <meshStandardMaterial {...bodyMat} />
      </mesh>

      {/* Nozzle body */}
      <mesh position={[0, 1.255, 0]}>
        <cylinderGeometry args={[0.13, 0.19, 0.55, 24]} />
        <meshStandardMaterial {...bodyMat} />
      </mesh>

      {/* Amber collar ring */}
      <mesh position={[0, 0.97, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.205, 0.018, 12, 48]} />
        <meshStandardMaterial {...ringMat} />
      </mesh>

      {/* Main body upper */}
      <mesh position={[0, 0.52, 0]}>
        <cylinderGeometry args={[0.21, 0.21, 0.9, 32]} />
        <meshStandardMaterial {...bodyMat} />
      </mesh>

      {/* Cream label band */}
      <mesh position={[0, 0.52, 0]}>
        <cylinderGeometry args={[0.215, 0.215, 0.78, 32]} />
        <meshStandardMaterial {...labelMat} />
      </mesh>

      {/* Top amber edge ring */}
      <mesh position={[0, 0.92, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.217, 0.012, 8, 48]} />
        <meshStandardMaterial {...ringMat} />
      </mesh>

      {/* Bottom amber edge ring */}
      <mesh position={[0, 0.12, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.217, 0.012, 8, 48]} />
        <meshStandardMaterial {...ringMat} />
      </mesh>

      {/* Main body lower */}
      <mesh position={[0, -0.23, 0]}>
        <cylinderGeometry args={[0.21, 0.21, 0.5, 32]} />
        <meshStandardMaterial {...bodyMat} />
      </mesh>

      {/* Amber base ring */}
      <mesh position={[0, -0.475, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.205, 0.018, 12, 48]} />
        <meshStandardMaterial {...ringMat} />
      </mesh>

      {/* Base cap */}
      <mesh position={[0, -0.61, 0]}>
        <cylinderGeometry args={[0.21, 0.18, 0.22, 32]} />
        <meshStandardMaterial {...bodyMat} />
      </mesh>
    </group>
  )
}
