import { useMemo } from 'react'
import * as THREE from 'three'

/** River centreline (x, z) — flows from the north-west to the south coast. */
export const RIVER = [
  [-17, -8],
  [-12, -4],
  [-8, 0],
  [-5, 3.5],
  [-3.6, 6.5],
  [-3.2, 9.5],
  [-4.5, 13],
  [-8, 16],
  [-11.5, 18],
]

function segDist(px, pz, ax, az, bx, bz) {
  const dx = bx - ax
  const dz = bz - az
  const l2 = dx * dx + dz * dz
  let t = l2 ? ((px - ax) * dx + (pz - az) * dz) / l2 : 0
  t = Math.max(0, Math.min(1, t))
  return Math.hypot(px - (ax + t * dx), pz - (az + t * dz))
}

export function riverDistance(x, z) {
  let m = 1e9
  for (let i = 0; i < RIVER.length - 1; i++) m = Math.min(m, segDist(x, z, RIVER[i][0], RIVER[i][1], RIVER[i + 1][0], RIVER[i + 1][1]))
  return m
}

const BUMPS = [
  [8.2, -6.5, 2.1],
  [7.5, 8.5, 1.7],
  [-7.5, 2.5, 2.2],
  [-3, -9, 1.6],
  [3.5, -12, 1.4],
  [12, 4, 1.2],
  [-12, 9, 1.5],
  [4, 14, 1.3],
  [-13, -4, 1.2],
  [1.5, 10.5, 1.1],
]

export function baseHeight(x, z) {
  const r = Math.hypot(x, z)
  if (r > 19.5) return 0.3 - (r - 19.5) * 1.35
  return 0.6 + 0.5 * Math.pow(Math.max(0, 1 - r / 19.5), 1.3)
}

export function terrainHeight(x, z) {
  let h = baseHeight(x, z)
  for (const [bx, bz, g] of BUMPS) {
    const d = Math.hypot(x - bx, z - bz)
    h += g * Math.exp(-d * d * 0.16)
  }
  // flatten the central plaza
  const dpl = Math.hypot(x, z - 3)
  if (dpl < 5.2) h = h + (0.92 - h) * Math.pow(1 - dpl / 5.2, 0.75)
  // carve the river bed
  const dr = riverDistance(x, z)
  if (dr < 1.75) h -= Math.pow(1 - dr / 1.75, 1.15) * 1.2
  return h
}

const C_GRASS = new THREE.Color('#8fd14f')
const C_GRASSD = new THREE.Color('#70bf45')
const C_SAND = new THREE.Color('#eccf9c')
const C_CLAY = new THREE.Color('#c97b44')
const C_BEACH = new THREE.Color('#e9c894')
const C_PLAZA = new THREE.Color('#f6e7c8')
const _c = new THREE.Color()

export default function Terrain() {
  const geo = useMemo(() => {
    const size = 56
    const seg = 110
    const g = new THREE.PlaneGeometry(size, size, seg, seg)
    const pos = g.attributes.position
    const colors = new Float32Array(pos.count * 3)
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i)
      const y = pos.getY(i)
      const h = terrainHeight(x, y)
      pos.setZ(i, h)
      const r = Math.hypot(x, y)
      const base = baseHeight(x, y)
      _c.copy(C_CLAY)
      if (r > 16.5) _c.lerp(C_BEACH, Math.min(1, (r - 16.5) / 3.5))
      const dr = riverDistance(x, y)
      if (dr < 2.2) _c.lerp(C_SAND, dr < 1.9 ? 0.85 : 0.45)
      if (h - base > 0.12) {
        const k = Math.min(1, (h - base - 0.12) / 0.35)
        _c.lerp(C_GRASS, k)
        if (k > 0.55) _c.lerp(C_GRASSD, (k - 0.55) / 0.45)
      }
      const dpl = Math.hypot(x, y - 3)
      if (dpl < 5.2) _c.lerp(C_PLAZA, Math.pow(1 - dpl / 5.2, 0.9))
      colors[i * 3] = _c.r
      colors[i * 3 + 1] = _c.g
      colors[i * 3 + 2] = _c.b
    }
    g.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    g.computeVertexNormals()
    return g
  }, [])

  return (
    <>
      <mesh geometry={geo} rotation-x={-Math.PI / 2}>
        <meshStandardMaterial vertexColors roughness={1} metalness={0} />
      </mesh>
      {/* submerged stone pedestal — the island "floats" on it */}
      <mesh position={[0, -1.55, 0]} receiveShadow>
        <cylinderGeometry args={[19.4, 20.6, 3.8, 56]} />
        <meshStandardMaterial color='#7a5a48' roughness={0.95} />
      </mesh>
    </>
  )
}