import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { terrainHeight } from './Terrain'

/** (x, z, scale) */
const TREES = [
  [9.5, -12.5, 1.15], [6.5, -14, 0.9], [3.5, -10, 1.0], [-1, -13, 1.25], [-4.5, -15, 0.85],
  [6.2, -3, 0.9], [10.5, -2.5, 1.1], [15, -6, 0.95], [15.5, -13, 1.2], [13, -16, 0.8],
  [-18.5, -6, 1.0], [-16.5, -12, 0.9], [-9, -4.5, 1.15], [-17.5, 4, 1.05], [-10, 5.5, 0.85],
  [6, 6.5, 1.2], [15.5, 6.5, 1.0], [16, 14.5, 1.05], [2, 10.5, 0.9], [-5.5, 8.5, 1.1],
  [-14.5, 9.5, 0.9], [-15.5, 14, 1.0], [9, 15.5, 0.85], [-2, 16.5, 0.8], [12, 0, 0.9],
  [-6.8, -8.8, 1.0], [5, 12.5, 1.1], [-11, 13.5, 0.85], [14.5, 2, 1.15], [-3.2, -6.5, 1.2],
  [6.9, -9.2, 0.95],
]

const BUSHES = [
  [-8.6, -1.4], [9.2, -8.8], [6.2, 8.8], [-5.4, -10.6], [-4.4, 7.6],
  [-7.9, 7.4], [10.8, 8.2], [-1.8, -12.4], [13.8, 12.9], [-12.6, -8.2],
  [2.2, -15.5], [15.2, 3.4],
]

const trunkGeo = new THREE.CylinderGeometry(0.22, 0.34, 1.5, 7)
const leafyLow = new THREE.IcosahedronGeometry(1.1, 0)
const leafyMid = new THREE.IcosahedronGeometry(0.85, 0)
const leafyTop = new THREE.IcosahedronGeometry(0.6, 0)
const trunkMat = new THREE.MeshStandardMaterial({ color: '#8a5a38', roughness: 0.9, flatShading: true })
const leafMats = [
  new THREE.MeshStandardMaterial({ color: '#7fc74a', roughness: 0.8, flatShading: true }),
  new THREE.MeshStandardMaterial({ color: '#8fd14f', roughness: 0.8, flatShading: true }),
  new THREE.MeshStandardMaterial({ color: '#a3d95f', roughness: 0.8, flatShading: true }),
]
const berryGeo = new THREE.IcosahedronGeometry(0.18, 0)
const berryMat = new THREE.MeshStandardMaterial({ color: '#f97316', roughness: 0.6 })
const bushGeo = new THREE.SphereGeometry(0.6, 9, 8)

function Tree({ x, z, s }) {
  const ref = useRef()
  const y = terrainHeight(x, z)
  const ph = Math.random() * Math.PI * 2
  useFrame(({ clock }) => {
    if (!ref.current) return
    const t = clock.elapsedTime
    ref.current.rotation.z = Math.sin(t * 0.9 + ph) * 0.022
    ref.current.rotation.x = Math.cos(t * 0.75 + ph) * 0.02
  })
  return (
    <group position={[x, y, z]} scale={s} ref={ref}>
      <mesh geometry={trunkGeo} position={[0, 0.75, 0]} castShadow material={trunkMat} />
      <mesh geometry={leafyLow} position={[0, 2.0, 0]} castShadow material={leafMats[0]} />
      <mesh geometry={leafyMid} position={[0, 2.78, 0]} castShadow material={leafMats[1]} />
      <mesh geometry={leafyTop} position={[0, 3.5, 0]} castShadow material={leafMats[2]} />
      {s > 1.05 && <mesh geometry={berryGeo} position={[0.66, 2.45, 0.4]} material={berryMat} />}
    </group>
  )
}

export default function Trees() {
  return (
    <group>
      {TREES.map(([x, z, s], i) => (
        <Tree key={i} x={x} z={z} s={s} />
      ))}
      {BUSHES.map(([x, z], i) => (
        <group key={`b${i}`} position={[x, terrainHeight(x, z) + 0.3, z]} scale={1 + (i % 3) * 0.18}>
          <mesh geometry={bushGeo} castShadow>
            <meshStandardMaterial
              color={i % 2 ? '#79c046' : '#6fb23f'}
              roughness={0.9}
              flatShading
            />
          </mesh>
        </group>
      ))}
    </group>
  )
}