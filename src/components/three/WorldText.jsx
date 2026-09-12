import { useRef, useMemo, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text3D } from '@react-three/drei'
import * as THREE from 'three'
import { TYPEFACE_BOLD } from '../../data/fonts'
import { terrainHeight } from './Terrain'
import { uiStore } from '../../store/uiStore'
import { camStore } from '../../store/camStore'
import { navStore } from '../../store/navStore'
import { getLocation } from '../../data/locations'

/** rough per-glyph advance (helvetiker ≈ 0.55–0.62 em) */
function charWidth(ch, size) {
  const c = ch.toUpperCase()
  if (c === 'I' || c === 'J' || c === '1' || c === 'l') return size * 0.34
  if (c === 'M' || c === 'W') return size * 0.86
  if (c === ' ' || c === '.') return size * 0.42
  if (c === 'A' || c === 'R' || c === 'D' || c === 'O') return size * 0.68
  return size * 0.6
}

function Letter({ ch, x, size, color, hovered, handlers }) {
  const ref = useRef()
  const phase = useMemo(() => x * 0.7 + ch.charCodeAt(0), [x, ch])
  useFrame(({ clock }) => {
    if (!ref.current) return
    const t = clock.elapsedTime
    const bob = Math.sin(t * 1.5 + phase) * 0.06
    ref.current.position.y = bob + (hovered ? 0.14 : 0)
    ref.current.scale.setScalar(1 + (hovered ? 0.1 : 0))
  })
  return (
    <group ref={ref} position={[x, 0, 0]} {...handlers}>
      <Text3D
        font={TYPEFACE_BOLD}
        size={size}
        height={0.13}
        bevelEnabled
        bevelThickness={0.04}
        bevelSize={0.025}
        bevelSegments={2}
        curveSegments={5}
      >
        {ch}
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={hovered ? 0.6 : 0.16}
          roughness={0.3}
          metalness={0.28}
        />
      </Text3D>
    </group>
  )
}

export default function WorldText({ id }) {
  const site = getLocation(id)
  const group = useRef()
  const board = useRef()
  const [hovered, setHovered] = useState(false)
  const text = site.short
  const size = text.length > 9 ? 0.78 : text.length > 6 ? 1.0 : 1.45

  const layout = useMemo(() => {
    let x = 0
    const letters = []
    for (const ch of text) {
      const w = charWidth(ch, size)
      letters.push({ ch, x: x + w / 2, w })
      x += w
    }
    return { letters, total: x }
  }, [text, size])

  const yaw = useMemo(() => Math.atan2(site.sign[0], site.sign[1] - 3), [site])
  const yBase = terrainHeight(site.sign[0], site.sign[1]) + 0.55
  const boardW = layout.total + size * 1.4
  const boardH = size * 2.0

  const fly = (e) => {
    e.stopPropagation()
    camStore.requestFly({
      to: site.cam.pos,
      look: site.cam.look,
      duration: 3.0,
      ease: 'power3.inOut',
      onComplete: () => navStore.go(site.path, site.accent),
    })
  }

  const over = (e) => {
    e.stopPropagation()
    setHovered(true)
    uiStore.setHover(id)
    document.body.style.cursor = 'pointer'
  }
  const out = (e) => {
    e.stopPropagation()
    setHovered(false)
    uiStore.setHover(null)
  }

  useFrame(({ clock }) => {
    if (!group.current || !board.current) return
    const t = clock.elapsedTime
    group.current.position.y = yBase + Math.sin(t * 0.7) * 0.08
    board.current.position.y = yBase + 0.1 + Math.sin(t * 0.5) * 0.06
    board.current.material.opacity = hovered ? 0.5 : 0.18
  })

  return (
    <group
      ref={group}
      position={[site.sign[0], yBase, site.sign[1]]}
      rotation-y={yaw}
      onPointerOver={over}
      onPointerOut={out}
      onClick={fly}
    >
      {/* floating board the letters sit on */}
      <mesh ref={board} position={[0, -0.15, -0.06]} rotation-x={-0.18}>
        <boxGeometry args={[boardW, boardH, 0.16]} />
        <meshStandardMaterial color='#3d1146' transparent opacity={0.18} roughness={0.6} />
      </mesh>
      {/* soft ground shadow */}
      <mesh position={[0, -yBase - 0.02, 0]} rotation-x={-Math.PI / 2}>
        <circleGeometry args={[boardW * 0.62, 24]} />
        <meshBasicMaterial color='#000000' transparent opacity={0.18} />
      </mesh>
      {/* letters */}
      <group position={[-layout.total / 2, size * 0.42, 0]}>
        {layout.letters.map((l, i) => (
          <Letter
            key={i}
            ch={l.ch}
            x={l.x}
            size={size}
            color={site.fill}
            hovered={hovered}
            handlers={{
              onPointerOver: (e) => {
                e.stopPropagation()
                setHovered(true)
                uiStore.setHover(id)
              },
              onPointerOut: (e) => {
                e.stopPropagation()
                setHovered(false)
                uiStore.setHover(null)
              },
              onClick: (e) => {
                e.stopPropagation()
                fly(e)
              },
            }}
          />
        ))}
      </group>
      {/* widening click halo */}
      <mesh position={[0, size * 0.5, 0]} visible={false}>
        <boxGeometry args={[boardW + 2, boardH + 2, 1]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>
    </group>
  )
}