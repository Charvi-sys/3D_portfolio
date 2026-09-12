import { useMemo } from 'react'
import * as THREE from 'three'
import { MeshDistortMaterial } from '@react-three/drei'
import { uiStore } from '../../store/uiStore'
import { RIVER } from './Terrain'

function buildRiverShape(hw = 1.75) {
  const pts = RIVER.map(([x, z]) => new THREE.Vector3(x, 0, z))
  const left = []
  const right = []
  for (let i = 0; i < pts.length; i++) {
    const p = pts[i]
    const a = pts[Math.max(0, i - 1)]
    const b = pts[Math.min(pts.length - 1, i + 1)]
    const d = new THREE.Vector3().subVectors(b, a).normalize()
    const n = new THREE.Vector3(-d.z, 0, d.x)
    left.push(new THREE.Vector2(p.x + n.x * hw, p.z + n.z * hw))
    right.push(new THREE.Vector2(p.x - n.x * hw, p.z - n.z * hw))
  }
  const shape = new THREE.Shape()
  shape.moveTo(left[0].x, left[0].y)
  for (const v of left) shape.lineTo(v.x, v.y)
  for (let i = right.length - 1; i >= 0; i--) shape.lineTo(right[i].x, right[i].y)
  shape.closePath()
  return shape
}

function River() {
  const geo = useMemo(() => new THREE.ShapeGeometry(buildRiverShape()), [])
  const under = useMemo(() => new THREE.ShapeGeometry(buildRiverShape(2.9)), [])
  return (
    <group>
      <mesh geometry={under} rotation-x={-Math.PI / 2} position={[0, 0.1, 0]}>
        <meshStandardMaterial color='#0f5c57' roughness={0.8} />
      </mesh>
      <mesh geometry={geo} rotation-x={-Math.PI / 2} position={[0, 0.55, 0]}>
        <MeshDistortMaterial color='#3dd6c8' distort={0.2} speed={1.6} roughness={0.28} />
      </mesh>
    </group>
  )
}

export default function Water() {
  const quality = uiStore.quality
  return (
    <group>
      {/* far deep water */}
      <mesh rotation-x={-Math.PI / 2} position={[0, 0.06, 0]}>
        <circleGeometry args={[150, 48]} />
        <meshStandardMaterial color='#0d4a47' roughness={0.95} />
      </mesh>
      {/* turquoise lake */}
      <mesh rotation-x={-Math.PI / 2} position={[0, 0.24, 0]}>
        <circleGeometry args={[100, 64]} />
        <MeshDistortMaterial
          color='#2ebfb4'
          roughness={0.25}
          metalness={0.12}
          distort={quality === 'high' ? 0.32 : 0.2}
          speed={1.4}
          transparent
          opacity={0.96}
        />
      </mesh>
      {/* foam ring around the island shore */}
      <mesh rotation-x={-Math.PI / 2} position={[0, 0.26, 0]}>
        <ringGeometry args={[19.1, 19.8, 90]} />
        <meshBasicMaterial color='#eafaf5' transparent opacity={0.5} />
      </mesh>
      <River />
    </group>
  )
}