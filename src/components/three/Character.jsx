import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { terrainHeight } from './Terrain'

const WAYPOINTS = [
  [0, 3], [1.8, 2.2], [2.6, 3.8], [1.2, 4.8], [-1.4, 4.6], [-2.4, 3.2],
  [-1.6, 1.6], [0.4, 1.2], [2.2, 4.6], [-0.6, 5.2],
]

const BODY = '#f97316'
const SHIRT = '#fbf3e4'
const PANTS = '#6d227f'
const SKIN = '#f0c8a0'
const HAIR = '#3d1146'
const SCARF = '#2fc2b8'

export default function Character() {
  const group = useRef()
  const legL = useRef()
  const legR = useRef()
  const armL = useRef()
  const armR = useRef()
  const head = useRef()

  const state = useMemo(
    () => ({
      target: new THREE.Vector3(0, 0, 3),
      speed: 0.9,
      phase: Math.random() * Math.PI * 2,
      walking: false,
      wob: 0,
    }),
    [],
  )

  const pickTarget = () => {
    const w = WAYPOINTS[Math.floor(Math.random() * WAYPOINTS.length)]
    state.target.set(w[0], 0, w[1])
    state.walking = true
  }

  useFrame(({ clock }, dt) => {
    const g = group.current
    if (!g) return
    const t = clock.elapsedTime
    const dx = state.target.x - g.position.x
    const dz = state.target.z - g.position.z
    const dist = Math.hypot(dx, dz)

    if (dist < 0.25) {
      state.walking = false
      if (Math.random() < 0.02) pickTarget()
    } else {
      state.walking = true
      const step = Math.min(state.speed * (dt || 0.016), dist)
      g.position.x += (dx / dist) * step
      g.position.z += (dz / dist) * step
      g.rotation.y = Math.atan2(dx, dz)
    }

    const y = terrainHeight(g.position.x, g.position.z) + 0.02
    g.position.y = y

    // idle + walk animation
    const swing = state.walking ? Math.sin(t * 9) * 0.55 : Math.sin(t * 1.4) * 0.04
    if (legL.current) legL.current.rotation.x = swing
    if (legR.current) legR.current.rotation.x = -swing
    if (armL.current) armL.current.rotation.x = -swing * 0.8
    if (armR.current) armR.current.rotation.x = swing * 0.8
    if (head.current) head.current.rotation.y = Math.sin(t * 0.5) * 0.12
    g.position.y = y + Math.abs(Math.sin(t * (state.walking ? 9 : 1.4))) * 0.04
  })

  return (
    <group ref={group} position={[0, terrainHeight(0, 3), 3]}>
      {/* soft shadow blob */}
      <mesh position={[0, 0.02, 0]} rotation-x={-Math.PI / 2}>
        <circleGeometry args={[0.42, 18]} />
        <meshBasicMaterial color='#000000' transparent opacity={0.22} />
      </mesh>
      {/* legs */}
      <group ref={legL} position={[-0.17, 0.42, 0]}>
        <mesh position={[0, -0.2, 0]} castShadow>
          <boxGeometry args={[0.16, 0.42, 0.18]} />
          <meshStandardMaterial color={PANTS} roughness={0.8} />
        </mesh>
        <mesh position={[0, -0.44, 0.05]}>
          <boxGeometry args={[0.18, 0.12, 0.3]} />
          <meshStandardMaterial color='#3d1146' roughness={0.7} />
        </mesh>
      </group>
      <group ref={legR} position={[0.17, 0.42, 0]}>
        <mesh position={[0, -0.2, 0]} castShadow>
          <boxGeometry args={[0.16, 0.42, 0.18]} />
          <meshStandardMaterial color={PANTS} roughness={0.8} />
        </mesh>
        <mesh position={[0, -0.44, 0.05]}>
          <boxGeometry args={[0.18, 0.12, 0.3]} />
          <meshStandardMaterial color='#3d1146' roughness={0.7} />
        </mesh>
      </group>
      {/* torso */}
      <mesh position={[0, 0.78, 0]} castShadow>
        <boxGeometry args={[0.5, 0.55, 0.34]} />
        <meshStandardMaterial color={SHIRT} roughness={0.8} />
      </mesh>
      {/* scarf */}
      <mesh position={[0, 0.98, 0]}>
        <boxGeometry args={[0.52, 0.12, 0.36]} />
        <meshStandardMaterial color={SCARF} roughness={0.6} />
      </mesh>
      <mesh position={[0, 1.0, 0.2]} rotation-x={-0.4}>
        <boxGeometry args={[0.12, 0.4, 0.04]} />
        <meshStandardMaterial color={SCARF} roughness={0.6} />
      </mesh>
      {/* arms */}
      <group ref={armL} position={[-0.32, 0.92, 0]}>
        <mesh position={[0, -0.22, 0]} castShadow>
          <boxGeometry args={[0.13, 0.46, 0.15]} />
          <meshStandardMaterial color={SHIRT} roughness={0.8} />
        </mesh>
        <mesh position={[0, -0.48, 0]}>
          <sphereGeometry args={[0.09, 8, 6]} />
          <meshStandardMaterial color={SKIN} roughness={0.7} />
        </mesh>
      </group>
      <group ref={armR} position={[0.32, 0.92, 0]}>
        <mesh position={[0, -0.22, 0]} castShadow>
          <boxGeometry args={[0.13, 0.46, 0.15]} />
          <meshStandardMaterial color={SHIRT} roughness={0.8} />
        </mesh>
        <mesh position={[0, -0.48, 0]}>
          <sphereGeometry args={[0.09, 8, 6]} />
          <meshStandardMaterial color={SKIN} roughness={0.7} />
        </mesh>
      </group>
      {/* head + hair + sunhat */}
      <group ref={head} position={[0, 1.32, 0]}>
        <mesh castShadow>
          <sphereGeometry args={[0.28, 14, 12]} />
          <meshStandardMaterial color={SKIN} roughness={0.7} />
        </mesh>
        <mesh position={[0, 0.06, -0.05]} scale={[1, 0.7, 1]}>
          <sphereGeometry args={[0.29, 12, 10]} />
          <meshStandardMaterial color={HAIR} roughness={0.9} />
        </mesh>
        <mesh position={[0, 0.2, 0]} rotation-x={-0.1}>
          <cylinderGeometry args={[0.34, 0.4, 0.07, 12]} />
          <meshStandardMaterial color={BODY} roughness={0.7} />
        </mesh>
        <mesh position={[0, 0.24, 0]}>
          <sphereGeometry args={[0.07, 8, 6]} />
          <meshStandardMaterial color='#fbf3e4' />
        </mesh>
        <mesh position={[-0.11, 0.02, 0.26]}>
          <sphereGeometry args={[0.045, 6, 5]} />
          <meshStandardMaterial color='#3d1146' />
        </mesh>
        <mesh position={[0.11, 0.02, 0.26]}>
          <sphereGeometry args={[0.045, 6, 5]} />
          <meshStandardMaterial color='#3d1146' />
        </mesh>
      </group>
    </group>
  )
}