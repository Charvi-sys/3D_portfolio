import * as THREE from 'three'
import { terrainHeight } from './Terrain'

const ROCKS = [
  [-8.2, 5.6, 0.5, 0.9, 0.8], [-12, 11.5, 0.4, 0.7, 0.7], [6.8, 15.6, 0.5, 1.0, 0.9],
  [13.6, -14.5, 0.55, 0.95, 0.85], [1.2, -11, 0.4, 0.75, 0.7], [-15.2, 13.4, 0.45, 0.8, 0.75],
  [-16.3, -10.8, 0.6, 1.1, 1.0], [16.8, 8.8, 0.5, 0.9, 0.8], [-6.2, 16.4, 0.4, 0.7, 0.7],
  [-2.4, 8.2, 0.5, 0.85, 0.8], [9.2, -4.8, 0.45, 0.8, 0.7], [8.2, 12.4, 0.5, 0.9, 0.8],
]

const geoA = new THREE.DodecahedronGeometry(0.55, 0)
const geoB = new THREE.IcosahedronGeometry(0.45, 0)
const mats = [
  new THREE.MeshStandardMaterial({ color: '#8d7f9a', roughness: 0.95, flatShading: true }),
  new THREE.MeshStandardMaterial({ color: '#a89dae', roughness: 0.95, flatShading: true }),
  new THREE.MeshStandardMaterial({ color: '#6e6577', roughness: 0.95, flatShading: true }),
]

export default function Rocks() {
  return (
    <group>
      {ROCKS.map(([x, z, sx, sy, sz], i) => (
        <mesh
          key={i}
          position={[x, terrainHeight(x, z) + sy * 0.55, z]}
          scale={[sx, sy, sz]}
          rotation={[0, i * 1.7, 0]}
          castShadow
          geometry={i % 2 ? geoB : geoA}
          material={mats[i % 3]}
        />
      ))}
    </group>
  )
}