import { useMemo, useRef, type MutableRefObject } from 'react'
import { useFrame } from '@react-three/fiber'
import { RoundedBox } from '@react-three/drei'
import * as THREE from 'three'

export type ModelKey = 'microphone' | 'camera' | 'book' | 'laptop' | 'storefront'

/** 0 while a model is away, 1 once it has fully arrived — drives each model's "coming to life" motion */
type Reveal = MutableRefObject<number>

const GOLD = '#eeb72b'

const mat = {
  charcoal: new THREE.MeshStandardMaterial({ color: '#1c1c1f', roughness: 0.55, metalness: 0.35 }),
  graphite: new THREE.MeshStandardMaterial({ color: '#34343a', roughness: 0.4, metalness: 0.6 }),
  silver: new THREE.MeshStandardMaterial({ color: '#c9c9cf', roughness: 0.3, metalness: 0.95 }),
  gold: new THREE.MeshStandardMaterial({ color: '#e7b23c', roughness: 0.24, metalness: 1 }),
  // Metallic gold turns near-black on broad surfaces facing away from the lights; fabric needs paint
  goldPaint: new THREE.MeshStandardMaterial({ color: '#e5ad35', roughness: 0.55, metalness: 0.1 }),
  cream: new THREE.MeshStandardMaterial({ color: '#efe6d2', roughness: 0.85 }),
  leather: new THREE.MeshStandardMaterial({ color: '#2b211c', roughness: 0.7, metalness: 0.1 }),
  ink: new THREE.MeshStandardMaterial({ color: '#4a433c', roughness: 0.9 }),
  glass: new THREE.MeshPhysicalMaterial({
    color: '#0b1520',
    roughness: 0.05,
    metalness: 0.3,
    clearcoat: 1,
    clearcoatRoughness: 0.04,
  }),
  glow: new THREE.MeshStandardMaterial({ color: GOLD, emissive: GOLD, emissiveIntensity: 1.6 }),
}

export function Microphone() {
  return (
    <group scale={0.8} position={[0, -0.4, 0]}>
      <mesh position={[0, 1.2, 0]} material={mat.silver}>
        <capsuleGeometry args={[0.5, 0.8, 16, 32]} />
      </mesh>
      {/* Wireframe shell reads as the grille mesh */}
      <mesh position={[0, 1.2, 0]} scale={1.02}>
        <capsuleGeometry args={[0.5, 0.8, 14, 22]} />
        <meshStandardMaterial color="#4d4d54" metalness={0.8} roughness={0.4} wireframe />
      </mesh>
      <mesh position={[0, 0.8, 0]} material={mat.gold}>
        <cylinderGeometry args={[0.54, 0.54, 0.12, 48]} />
      </mesh>
      <mesh position={[0, 0.1, 0]} material={mat.charcoal}>
        <cylinderGeometry args={[0.5, 0.42, 1.3, 48]} />
      </mesh>
      <mesh position={[0, 0.15, 0]} rotation={[Math.PI / 2, 0, 0]} material={mat.gold}>
        <torusGeometry args={[0.66, 0.035, 12, 64]} />
      </mesh>
      <mesh position={[0, 0.42, 0.475]} material={mat.glow}>
        <sphereGeometry args={[0.045, 16, 16]} />
      </mesh>
      <mesh position={[0, -0.85, 0]} material={mat.graphite}>
        <cylinderGeometry args={[0.07, 0.07, 0.7, 16]} />
      </mesh>
      <mesh position={[0, -1.22, 0]} material={mat.graphite}>
        <cylinderGeometry args={[0.75, 0.8, 0.08, 48]} />
      </mesh>
    </group>
  )
}

export function Camera({ reveal }: { reveal: Reveal }) {
  const lens = useRef<THREE.Group>(null)

  useFrame(() => {
    if (lens.current) lens.current.position.z = 0.2 + reveal.current * 0.35
  })

  return (
    <group scale={0.95} rotation={[0.12, -0.55, 0]}>
      <RoundedBox args={[2.4, 1.5, 1]} radius={0.14} smoothness={4} material={mat.charcoal} />
      <RoundedBox
        args={[0.95, 0.5, 0.85]}
        radius={0.1}
        smoothness={4}
        position={[0.1, 0.88, -0.05]}
        material={mat.charcoal}
      />
      <RoundedBox
        args={[0.6, 1.46, 1.2]}
        radius={0.16}
        smoothness={4}
        position={[-0.95, -0.02, 0.12]}
        material={mat.graphite}
      />
      <mesh position={[-0.85, 0.83, 0.15]} material={mat.gold}>
        <cylinderGeometry args={[0.13, 0.13, 0.1, 32]} />
      </mesh>
      <mesh position={[0.78, 0.8, 0]} material={mat.graphite}>
        <cylinderGeometry args={[0.24, 0.24, 0.14, 32]} />
      </mesh>
      <mesh position={[0.95, 0.5, 0.51]} material={mat.glow}>
        <circleGeometry args={[0.05, 24]} />
      </mesh>

      <group ref={lens} position={[0.2, -0.05, 0.2]}>
        <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0.3]} material={mat.graphite}>
          <cylinderGeometry args={[0.66, 0.66, 0.6, 64]} />
        </mesh>
        <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0.62]} material={mat.gold}>
          <cylinderGeometry args={[0.68, 0.68, 0.06, 64]} />
        </mesh>
        <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0.9]} material={mat.charcoal}>
          <cylinderGeometry args={[0.6, 0.64, 0.5, 64]} />
        </mesh>
        <mesh position={[0, 0, 1.12]} scale={[1, 1, 0.35]} material={mat.glass}>
          <sphereGeometry args={[0.52, 48, 24]} />
        </mesh>
      </group>
    </group>
  )
}

const pageLines = [1.1, 1.18, 0.95, 1.15, 1.05, 0.7, 1.12, 0.88]

function BookHalf({ side }: { side: -1 | 1 }) {
  const x = side * 0.8
  return (
    <>
      <RoundedBox args={[1.6, 2.1, 0.06]} radius={0.02} smoothness={2} position={[x, 0, 0]} material={mat.leather} />
      <mesh position={[side * 0.78, 0, 0.11]} material={mat.cream}>
        <boxGeometry args={[1.52, 2, 0.16]} />
      </mesh>
      {side === 1 && (
        <mesh position={[side * 0.72, 0.75, 0.195]} material={mat.gold}>
          <boxGeometry args={[0.8, 0.09, 0.01]} />
        </mesh>
      )}
      {pageLines.map((width, i) => (
        <mesh
          key={i}
          position={[side * 0.78 - side * (1.2 - width) * 0.5, (side === 1 ? 0.5 : 0.75) - i * 0.19, 0.195]}
          material={mat.ink}
        >
          <boxGeometry args={[width, 0.035, 0.01]} />
        </mesh>
      ))}
    </>
  )
}

export function Book({ reveal }: { reveal: Reveal }) {
  const left = useRef<THREE.Group>(null)
  const right = useRef<THREE.Group>(null)
  const pen = useRef<THREE.Group>(null)

  useFrame(() => {
    const open = reveal.current
    const angle = THREE.MathUtils.lerp(Math.PI / 2 - 0.04, 0.26, open)
    if (left.current) left.current.rotation.y = angle
    if (right.current) right.current.rotation.y = -angle
    if (pen.current) pen.current.scale.setScalar(Math.max(0.001, open))
  })

  return (
    <group scale={0.85} rotation={[-0.3, 0, 0]}>
      <group ref={left}>
        <BookHalf side={-1} />
      </group>
      <group ref={right}>
        <BookHalf side={1} />
      </group>
      <mesh position={[0, 0, -0.02]} material={mat.leather}>
        <cylinderGeometry args={[0.07, 0.07, 2.1, 16]} />
      </mesh>
      <mesh position={[0.06, -1.3, 0.2]} material={mat.gold}>
        <boxGeometry args={[0.08, 0.7, 0.01]} />
      </mesh>

      <group ref={pen} position={[0.75, 0.1, 0.85]} rotation={[0.3, 0, -0.85]}>
        <mesh material={mat.charcoal}>
          <cylinderGeometry args={[0.065, 0.065, 1.4, 24]} />
        </mesh>
        <mesh position={[0, 0.45, 0]} material={mat.gold}>
          <cylinderGeometry args={[0.07, 0.07, 0.12, 24]} />
        </mesh>
        <mesh position={[0, -0.84, 0]} rotation={[Math.PI, 0, 0]} material={mat.gold}>
          <coneGeometry args={[0.065, 0.28, 24]} />
        </mesh>
      </group>
    </group>
  )
}

function roundRect(g: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  g.beginPath()
  g.roundRect(x, y, w, h, r)
  g.fill()
}

function makeWebsiteTexture() {
  const canvas = document.createElement('canvas')
  canvas.width = 1024
  canvas.height = 666
  const g = canvas.getContext('2d')!

  g.fillStyle = '#0b0b0d'
  g.fillRect(0, 0, 1024, 666)

  g.fillStyle = GOLD
  roundRect(g, 56, 40, 96, 24, 6)
  g.fillStyle = 'rgba(255,255,255,0.35)'
  ;[700, 790, 880].forEach((x) => roundRect(g, x, 47, 62, 10, 5))

  g.fillStyle = '#f4f4f4'
  roundRect(g, 56, 150, 500, 52, 8)
  roundRect(g, 56, 218, 360, 52, 8)
  g.fillStyle = 'rgba(255,255,255,0.45)'
  roundRect(g, 56, 300, 440, 14, 7)
  roundRect(g, 56, 326, 320, 14, 7)
  g.fillStyle = GOLD
  roundRect(g, 56, 375, 180, 50, 25)

  const art = g.createLinearGradient(620, 130, 970, 430)
  art.addColorStop(0, '#f2c14e')
  art.addColorStop(1, '#3a2a10')
  g.fillStyle = art
  roundRect(g, 620, 130, 350, 295, 22)

  g.fillStyle = '#1c1c20'
  ;[56, 380, 704].forEach((x) => roundRect(g, x, 480, 264, 140, 16))
  g.fillStyle = 'rgba(238,183,43,0.8)'
  ;[56, 380, 704].forEach((x) => roundRect(g, x + 24, 504, 40, 40, 10))

  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  texture.anisotropy = 8
  return texture
}

export function Laptop({ reveal }: { reveal: Reveal }) {
  const lid = useRef<THREE.Group>(null)
  const screen = useMemo(makeWebsiteTexture, [])

  useFrame(() => {
    if (lid.current) lid.current.rotation.x = THREE.MathUtils.lerp(Math.PI / 2 - 0.02, -0.22, reveal.current)
  })

  return (
    <group scale={0.95} position={[0, -0.55, 0]} rotation={[0.38, -0.45, 0]}>
      <RoundedBox args={[3, 0.1, 2]} radius={0.04} smoothness={3} material={mat.graphite} />
      <mesh position={[0, 0.056, -0.3]}>
        <boxGeometry args={[2.6, 0.012, 0.95]} />
        <meshStandardMaterial color="#141416" roughness={0.8} />
      </mesh>
      <mesh position={[0, 0.056, 0.55]}>
        <boxGeometry args={[0.95, 0.01, 0.55]} />
        <meshStandardMaterial color="#26262b" roughness={0.5} metalness={0.3} />
      </mesh>

      <group ref={lid} position={[0, 0.05, -1]}>
        <RoundedBox args={[3, 2, 0.07]} radius={0.04} smoothness={3} position={[0, 1, 0]} material={mat.graphite} />
        <mesh position={[0, 1, 0.037]}>
          <planeGeometry args={[2.8, 1.82]} />
          <meshBasicMaterial map={screen} toneMapped={false} />
        </mesh>
      </group>
    </group>
  )
}

const awningStripes = Array.from({ length: 7 }, (_, i) => i)

export function Storefront({ reveal }: { reveal: Reveal }) {
  const awning = useRef<THREE.Group>(null)

  useFrame(() => {
    // Awning unrolls from hanging flat against the wall to its sloped position
    if (awning.current) awning.current.rotation.x = THREE.MathUtils.lerp(1.45, 0.5, reveal.current)
  })

  return (
    <group scale={0.88} position={[0, -0.15, 0]} rotation={[0.14, -0.5, 0]}>
      <RoundedBox args={[3.1, 0.12, 1.9]} radius={0.04} smoothness={3} position={[0, -1.06, 0.15]} material={mat.graphite} />
      <RoundedBox args={[2.6, 1.95, 1.3]} radius={0.05} smoothness={3} material={mat.cream} />
      <RoundedBox args={[2.8, 0.16, 1.46]} radius={0.04} smoothness={3} position={[0, 1.02, 0]} material={mat.charcoal} />

      <RoundedBox args={[1.9, 0.36, 0.08]} radius={0.03} smoothness={2} position={[0, 0.72, 0.68]} material={mat.charcoal} />
      <mesh position={[0, 0.72, 0.725]} material={mat.glow}>
        <planeGeometry args={[1.55, 0.12]} />
      </mesh>

      <group ref={awning} position={[0, 0.47, 0.66]}>
        {awningStripes.map((i) => (
          <group key={i} position={[-1.3 + 0.186 + i * 0.371, 0, 0]}>
            <mesh position={[0, 0, 0.31]} material={i % 2 ? mat.cream : mat.goldPaint}>
              <boxGeometry args={[0.371, 0.04, 0.62]} />
            </mesh>
            <mesh position={[0, -0.07, 0.62]} material={i % 2 ? mat.cream : mat.goldPaint}>
              <boxGeometry args={[0.371, 0.14, 0.03]} />
            </mesh>
          </group>
        ))}
      </group>

      <mesh position={[-0.52, -0.32, 0.655]}>
        <planeGeometry args={[1.1, 0.85]} />
        <meshStandardMaterial color="#f3c872" emissive="#f0b44a" emissiveIntensity={0.55} roughness={0.2} />
      </mesh>
      <mesh position={[-0.52, -0.32, 0.66]} material={mat.charcoal}>
        <boxGeometry args={[0.03, 0.85, 0.02]} />
      </mesh>
      <RoundedBox args={[0.62, 1.12, 0.04]} radius={0.02} smoothness={2} position={[0.78, -0.42, 0.66]} material={mat.charcoal} />
      <mesh position={[0.58, -0.42, 0.69]} material={mat.gold}>
        <sphereGeometry args={[0.04, 16, 16]} />
      </mesh>
    </group>
  )
}

export const models: Record<ModelKey, (props: { reveal: Reveal }) => JSX.Element> = {
  microphone: Microphone,
  camera: Camera,
  book: Book,
  laptop: Laptop,
  storefront: Storefront,
}
