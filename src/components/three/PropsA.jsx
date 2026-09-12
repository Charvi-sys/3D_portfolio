import { useTexture } from '@react-three/drei'

/** low-poly lamp post with warm emissive globe */
export function Lamp({ x = 0, y = 0.95, z = 0, rot = 0, scale = 1 }) {
  return (
    <group position={[x, y - 1.5, z]} rotation-y={rot} scale={scale}>
      <mesh position={[0, 0.95, 0]} castShadow>
        <cylinderGeometry args={[0.09, 0.12, 1.9, 8]} />
        <meshStandardMaterial color='#4a3a2c' roughness={0.8} />
      </mesh>
      <mesh position={[0, 2.05, 0]}>
        <sphereGeometry args={[0.3, 12, 10]} />
        <meshBasicMaterial color='#ffe2b0' emissive='#ffd98a' emissiveIntensity={1.4} />
      </mesh>
      <mesh position={[0, 1.98, 0]}>
        <cylinderGeometry args={[0.18, 0.18, 0.06, 12]} />
        <meshStandardMaterial color='#4a3a2c' />
      </mesh>
      <mesh position={[0, 0.06, 0]}>
        <boxGeometry args={[0.5, 0.12, 0.5]} />
        <meshStandardMaterial color='#4a3a2c' />
      </mesh>
    </group>
  )
}

/** park bench */
export function Bench({ x = 0, z = 0, y = 0.96, rot = 0, scale = 1 }) {
  return (
    <group position={[x, y - 0.55, z]} rotation-y={rot} scale={scale}>
      {[-0.62, 0.62].map((off, i) => (
        <mesh key={i} position={[off, 0.06, 0]}>
          <boxGeometry args={[0.22, 1.1, 1.0]} />
          <meshStandardMaterial color='#7a4d2e' roughness={0.85} />
        </mesh>
      ))}
      <mesh position={[0, 0.72, 0]} castShadow>
        <boxGeometry args={[1.7, 0.14, 0.85]} />
        <meshStandardMaterial color='#a9723f' roughness={0.85} />
      </mesh>
      <mesh position={[0, 1.02, -0.42]}>
        <boxGeometry args={[1.7, 0.6, 0.12]} />
        <meshStandardMaterial color='#a9723f' roughness={0.85} />
      </mesh>
      <mesh position={[0, 0.82, -0.42]}>
        <boxGeometry args={[0.12, 0.28, 0.1]} />
        <meshStandardMaterial color='#7a4d2e' />
      </mesh>
    </group>
  )
}

/** fountain in the plaza */
export function Fountain() {
  return (
    <group position={[0, 0.95, 3]}>
      <mesh castShadow>
        <cylinderGeometry args={[2.0, 2.25, 1.0, 28]} />
        <meshStandardMaterial color='#d9b48a' roughness={0.85} />
      </mesh>
      <mesh rotation-x={-Math.PI / 2} position={[0, 0.5, 0]}>
        <ringGeometry args={[1.35, 1.7, 28]} />
        <meshStandardMaterial color='#c98a5e' roughness={0.7} />
      </mesh>
      <mesh rotation-x={-Math.PI / 2} position={[0, 0.3, 0]}>
        <circleGeometry args={[1.34, 28]} />
        <meshBasicMaterial color='#3dd6c8' transparent opacity={0.94} />
      </mesh>
      <mesh position={[0, 0.85, 0]}>
        <cylinderGeometry args={[0.22, 0.3, 0.7, 14]} />
        <meshStandardMaterial color='#d9b48a' roughness={0.85} />
      </mesh>
      <mesh position={[0, 1.45, 0]}>
        <sphereGeometry args={[0.16, 10, 8]} />
        <meshBasicMaterial color='#9ff0e8' emissive='#9ff0e8' emissiveIntensity={1.2} />
      </mesh>
    </group>
  )
}

/** easel holding a poster artwork */
export function Easel({ x, z, y = 0.95, rot = 0, poster, scale = 1 }) {
  const tex = useTexture(poster)
  return (
    <group position={[x, y - 0.05, z]} rotation-y={rot} scale={scale}>
      {[0.45, -0.45].map((off, i) => (
        <group key={i} position={[off, 0, 0]} rotation-z={off > 0 ? -0.28 : 0.28}>
          <mesh position={[0, 0.55, 0]}>
            <boxGeometry args={[0.09, 1.15, 0.09]} />
            <meshStandardMaterial color='#8a5a38' roughness={0.8} />
          </mesh>
        </group>
      ))}
      <mesh position={[0, 0.32, 0.16]} rotation-z={0.16}>
        <boxGeometry args={[0.09, 0.8, 0.09]} />
        <meshStandardMaterial color='#8a5a38' roughness={0.8} />
      </mesh>
      <mesh position={[0, 0.72, 0.01]} castShadow>
        <boxGeometry args={[0.98, 1.18, 0.07]} />
        <meshStandardMaterial color='#c9a06a' roughness={0.85} />
      </mesh>
      <mesh position={[0, 0.75, 0.045]}>
        <planeGeometry args={[0.95, 1.15]} />
        <meshStandardMaterial map={tex} toneMapped />
      </mesh>
    </group>
  )
}

/** certificate frame with poster artwork */
export function Frame({ w = 0.9, h = 1.1, poster, thick = 0.06 }) {
  const tex = useTexture(poster)
  return (
    <group>
      <mesh castShadow>
        <boxGeometry args={[w, h, thick]} />
        <meshStandardMaterial color='#c9a06a' roughness={0.5} metalness={0.2} />
      </mesh>
      <mesh position={[0, 0, thick * 0.5 + 0.001]}>
        <planeGeometry args={[w * 0.82, h * 0.84]} />
        <meshStandardMaterial map={tex} />
      </mesh>
    </group>
  )
}

/** small stack of books */
export function Books({ x, z, y = 0.95, rot = 0, scale = 1 }) {
  return (
    <group position={[x, y, z]} rotation-y={rot} scale={scale}>
      {[
        [0, 0.06, 0, 0.55, 0.12, 0.4, '#e2574c'],
        [0.06, 0.2, 0.02, 0.5, 0.12, 0.38, '#1fa39a'],
        [-0.05, 0.34, 0.04, 0.52, 0.12, 0.36, '#f97316'],
        [0.02, 0.48, 0.06, 0.48, 0.12, 0.34, '#6d227f'],
      ].map(([bx, byv, bz, bw, bh, bd, bc], i) => (
        <mesh key={i} position={[bx, byv, bz]} rotation={[0.1, 0.2 * i, 0.06]}>
          <boxGeometry args={[bw, bh, bd]} />
          <meshStandardMaterial color={bc} roughness={0.6} />
        </mesh>
      ))}
    </group>
  )
}