import { useMemo } from 'react'
import * as THREE from 'three'
import { terrainHeight } from './Terrain'

const PATHS = [
  // from the ABOUT house, curving down to the plaza (south-west gate)
  [[-11.9, -10.5], [-10.6, -8.6], [-9.1, -6.6], [-7.4, -4.6], [-5.8, -2.9], [-4.9, -0.9]],
  // plaza → PROJECTS studio
  [[4.2, -0.4], [5.8, -2.0], [8.0, -5.0], [10.4, -7.6], [12.4, -9.2]],
  // plaza → CERTIFICATES gallery
  [[-4.6, -0.8], [-6.8, -0.8], [-10.0, -1.6], [-12.8, -1.1], [-13.8, -0.2]],
  // plaza → COLLECTIONS showroom
  [[4.5, 4.1], [5.9, 5.9], [7.9, 8.6], [10.3, 10.2], [11.6, 11.3]],
  // plaza → bridge → CONTACT booth
  [[-4.6, 4.3], [-4.0, 6.3], [-3.2, 8.9], [-4.0, 11.0], [-5.6, 12.2], [-7.6, 12.9], [-9.0, 13.6]],
  // plaza → RESUME desk
  [[4.2, 1.6], [5.7, 2.6], [7.0, 3.4]],
]

const PAVERS = [
  [-1.6, 0.6, 0.5], [1.8, 5.2, 0.4], [0.9, 5.8, 0.5], [3.4, 3.4, 0.5], [-4.2, 3.4, 0.4],
  [-2.2, 5.4, 0.4], [4.6, 0.9, 0.4], [0.4, 0.6, 0.5], [-5.0, 2.6, 0.45], [3.8, 5.6, 0.4],
  [1.2, -0.4, 0.4], [-1.4, 4.8, 0.45], [5.4, 3.0, 0.4], [-4.8, 0.2, 0.4], [2.8, 0.2, 0.45],
]

function PathTube({ points }) {
  const geom = useMemo(() => {
    const pts = points.map(([x, z]) => new THREE.Vector3(x, terrainHeight(x, z) + 0.055, z))
    const curve = new THREE.CatmullRomCurve3(pts, false, 'catmullrom', 0.6)
    return new THREE.TubeGeometry(curve, 60, 0.6, 7, false)
  }, [points])
  return (
    <mesh geometry={geom} receiveShadow>
      <meshStandardMaterial color='#e8cba1' roughness={0.9} />
    </mesh>
  )
}

const BRIDGE_POS = new THREE.Vector3(-3.2, 0, 8.9)
const BRIDGE_YAW = 0.18 // planks roughly perpendicular to the river

export default function Paths() {
  const pavers = useMemo(
    () =>
      PAVERS.map(([x, z, r]) => (
        <mesh key={`${x}${z}`} position={[x, terrainHeight(x, z) + 0.07, z]} rotation={[0, (x * 13 + z * 7) % Math.PI, 0]}>
          <boxGeometry args={[1.15, 0.1, 1.15]} />
          <meshStandardMaterial color='#d9bd94' roughness={0.95} />
        </mesh>
      )),
    [],
  )

  return (
    <group>
      {/* central plaza */}
      <mesh position={[0, 0.925, 3]} receiveShadow>
        <cylinderGeometry args={[5.2, 5.2, 0.05, 48]} />
        <meshStandardMaterial color='#f6e7c8' roughness={0.95} />
      </mesh>
      <mesh position={[0, 0.94, 3]} rotation-x={-Math.PI / 2}>
        <ringGeometry args={[4.85, 5.05, 40]} />
        <meshBasicMaterial color='#e07a42' transparent opacity={0.8} />
      </mesh>

      {PATHS.map((p, i) => (
        <PathTube key={i} points={p} />
      ))}

      {/* wooden bridge across the river */}
      <group position={BRIDGE_POS} rotation-y={BRIDGE_YAW}>
        {Array.from({ length: 7 }, (_, i) => (
          <mesh key={i} position={[(i - 3) * 0.62, 0.36, 0]} receiveShadow castShadow>
            <boxGeometry args={[0.55, 0.14, 4.8]} />
            <meshStandardMaterial color='#c98a5e' roughness={0.9} />
          </mesh>
        ))}
        {[[-2.15, 0.72], [2.15, 0.72]].map(([r, h]) => (
          <group key={r}>
            {[0, 4.4].map((zOff) => (
              <mesh key={zOff} position={[r, h + 0.5, zOff - 2.2]}>
                <cylinderGeometry args={[0.09, 0.11, 1.5, 8]} />
                <meshStandardMaterial color='#7a4a30' />
              </mesh>
            ))}
            <mesh position={[r, h + 1.0, 0]}>
              <boxGeometry args={[0.16, 0.16, 4.6]} />
              <meshStandardMaterial color='#8a5a3a' roughness={0.8} />
            </mesh>
          </group>
        ))}
      </group>

      {pavers}
    </group>
  )
}