import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { terrainHeight, riverDistance } from './Terrain'

const stemGeo = new THREE.CylinderGeometry(0.03, 0.04, 0.5, 5)
const stemMat = new THREE.MeshStandardMaterial({ color: '#58a12f', roughness: 0.8 })
const grassGeo = new THREE.ConeGeometry(0.16, 0.6, 5)
const grassMat = new THREE.MeshStandardMaterial({ color: '#7fc74a', roughness: 0.9, flatShading: true })

const FLOWERS = [
  [-3.4, -8.2, '#f97316'], [5.9, -6.4, '#fbf3e4'], [8.7, 6.3, '#f97316'], [-11.8, 5.2, '#fbf3e4'],
  [-5.4, 11.8, '#fb923c'], [2.3, -6.6, '#ffffff'], [12.9, -3.9, '#f97316'], [-13.2, -3.1, '#fbf3e4'],
  [11.4, 13.4, '#fb923c'], [7.9, 0.6, '#ffffff'], [-4.5, 15.2, '#f97316'], [-16.7, 7.4, '#fbf3e4'],
  [3.5, 13.9, '#fb923c'], [-1.5, 8.6, '#ffffff'], [16.3, 9.6, '#f97316'], [-9.1, -7.6, '#fbf3e4'],
  [-13.8, 13, '#ffffff'], [5.7, -2.6, '#f97316'], [-8.8, 10.6, '#fb923c'], [11.1, 2.1, '#ffffff'],
]

function Flowers() {
  return (
    <group>
      {FLOWERS.map(([x, z, c], i) => {
        const y = terrainHeight(x, z)
        return (
          <group key={i} position={[x, y, z]}>
            <mesh geometry={stemGeo} position={[0, 0.25, 0]} material={stemMat} />
            <mesh position={[0, 0.56, 0]}>
              <sphereGeometry args={[0.15, 7, 6]} />
              <meshStandardMaterial color={c} roughness={0.5} />
            </mesh>
            <mesh position={[0, 0.54, 0]} rotation-y={Math.PI / 2}>
              <sphereGeometry args={[0.1, 7, 6]} />
              <meshStandardMaterial color='#f7c94a' roughness={0.5} />
            </mesh>
          </group>
        )
      })}
    </group>
  )
}

export default function Grass() {
  const count = 150
  const ref = useRef()
  const dummy = useMemo(() => new THREE.Object3D(), [])
  const sways = useMemo(() => {
    const arr = []
    let i = 0
    while (i < count) {
      const a = Math.random() * Math.PI * 2
      const r = 3 + Math.random() * 16
      const x = Math.cos(a) * r
      const z = Math.sin(a) * r
      if (Math.hypot(x, z - 3) < 5.5) continue
      if (riverDistance(x, z) < 2.3) continue
      if (terrainHeight(x, z) < 0.5) continue
      arr.push({ x, z, s: 0.5 + Math.random() * 0.9, ph: Math.random() * Math.PI * 2 })
      i++
    }
    return arr
  }, [])

  useFrame(({ clock }) => {
    const t = clock.elapsedTime * 0.8
    if (!ref.current) return
    for (let i = 0; i < sways.length; i++) {
      const g = sways[i]
      dummy.position.set(g.x + Math.sin(t + g.ph) * 0.04, terrainHeight(g.x, g.z) + g.s * 0.62, g.z)
      dummy.rotation.set(0, g.ph + t * 0.35, 0)
      dummy.scale.setScalar(g.s)
      dummy.updateMatrix()
      ref.current.setMatrixAt(i, dummy.matrix)
    }
    ref.current.instanceMatrix.needsUpdate = true
  })

  return (
    <>
      <instancedMesh ref={ref} args={[undefined, undefined, count]}>
        <coneGeometry args={[0.16, 0.6, 5]} />
        <meshStandardMaterial color='#7fc74a' roughness={0.9} flatShading />
      </instancedMesh>
      <Flowers />
    </>
  )
}