import { useEffect, useRef, type ReactNode } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { ContactShadows, Environment, Float, Lightformer } from '@react-three/drei'
import type { MotionValue } from 'framer-motion'
import * as THREE from 'three'
import { models, type ModelKey } from '@/components/ServiceModels'

const { damp } = THREE.MathUtils

// Portion of each scene where its model holds still, then the window it spends handing over
const HOLD = 0.26
const SWAP = 0.48
const TRAVEL = 4.6

type SlotProps = {
  index: number
  count: number
  progress: MotionValue<number>
  calm: boolean
  children: (reveal: { current: number }) => ReactNode
}

function Slot({ index, count, progress, calm, children }: SlotProps) {
  const group = useRef<THREE.Group>(null)
  const reveal = useRef(index === 0 ? 1 : 0)

  useFrame((_, delta) => {
    const g = group.current
    if (!g) return

    const d = progress.get() * (count - 1) - index
    const k = Math.min(1, Math.max(0, (Math.abs(d) - HOLD) / SWAP))
    const away = k * k * (3 - 2 * k)
    const dir = d > 0 ? 1 : -1

    // Leaving models lift out the top, arriving ones rise from below
    g.position.y = damp(g.position.y, dir * away * TRAVEL, 7, delta)
    g.scale.setScalar(damp(g.scale.x, 1 - away * 0.85, 7, delta))
    g.rotation.y = damp(g.rotation.y, d * 0.7 + dir * away * 1.3, 6, delta)
    reveal.current = damp(reveal.current, 1 - away, 5, delta)
    g.visible = !(away >= 1 && Math.abs(g.position.y) > TRAVEL - 0.2)
  })

  const hidden = index !== 0
  return (
    <group ref={group} position={[0, hidden ? -TRAVEL : 0, 0]} scale={hidden ? 0.15 : 1}>
      <Float
        speed={calm ? 0 : 1.4}
        rotationIntensity={calm ? 0 : 0.35}
        floatIntensity={calm ? 0 : 0.6}
      >
        {children(reveal)}
      </Float>
    </group>
  )
}

function PointerRig({ calm, children }: { calm: boolean; children: ReactNode }) {
  const rig = useRef<THREE.Group>(null)
  const pointer = useRef({ x: 0, y: 0 })

  // Read the pointer from the window so the canvas never needs pointer events (page scroll stays untouched)
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [])

  useFrame((_, delta) => {
    if (!rig.current || calm) return
    rig.current.rotation.y = damp(rig.current.rotation.y, pointer.current.x * 0.28, 3, delta)
    rig.current.rotation.x = damp(rig.current.rotation.x, pointer.current.y * 0.12, 3, delta)
  })

  return <group ref={rig}>{children}</group>
}

type ServicesSceneProps = {
  sequence: ModelKey[]
  progress: MotionValue<number>
  running: boolean
  calm: boolean
}

export default function ServicesScene({ sequence, progress, running, calm }: ServicesSceneProps) {
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0.15, 8], fov: 32 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      frameloop={running ? 'always' : 'never'}
      style={{ pointerEvents: 'none' }}
    >
      <ambientLight intensity={0.3} />
      <directionalLight position={[4, 6, 6]} intensity={1.5} />
      <directionalLight position={[-6, 2, -3]} intensity={1} color="#f2c14e" />

      {/* Studio lighting built from light cards, so no environment files are downloaded */}
      <Environment resolution={256} frames={1}>
        <Lightformer form="rect" intensity={3} position={[0, 4, -6]} scale={[12, 4, 1]} />
        <Lightformer
          form="rect"
          intensity={1.6}
          color="#f4c35a"
          position={[-6, 0, 2]}
          rotation={[0, Math.PI / 2, 0]}
          scale={[8, 3, 1]}
        />
        <Lightformer form="circle" intensity={2} position={[5, 3, 4]} scale={2.5} />
        <Lightformer form="rect" intensity={0.8} position={[0, -4, 3]} rotation={[Math.PI / 2, 0, 0]} scale={[10, 3, 1]} />
      </Environment>

      <PointerRig calm={calm}>
        {sequence.map((key, index) => {
          const Model = models[key]
          return (
            <Slot key={key} index={index} count={sequence.length} progress={progress} calm={calm}>
              {(reveal) => <Model reveal={reveal} />}
            </Slot>
          )
        })}
      </PointerRig>

      <ContactShadows position={[0, -1.75, 0]} opacity={0.45} scale={9} blur={2.8} far={3.5} />
    </Canvas>
  )
}
