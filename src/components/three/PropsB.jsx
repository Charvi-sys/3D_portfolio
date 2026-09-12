/** open laptop on a desk */
export function Laptop({ x, z, y = 1.2, rot = 0, scale = 1, screenColor = '#9ff0e8' }) {
  return (
    <group position={[x, y, z]} rotation-y={rot} scale={scale}>
      <mesh position={[0, 0.035, 0.1]} rotation-x={0.28}>
        <boxGeometry args={[0.5, 0.05, 0.34]} />
        <meshStandardMaterial color='#4a3a2c' roughness={0.6} />
      </mesh>
      <mesh position={[0, 0.16, -0.07]}>
        <boxGeometry args={[0.5, 0.34, 0.05]} />
        <meshStandardMaterial color='#4a3a2c' roughness={0.6} />
      </mesh>
      <mesh position={[0, 0.16, -0.065]}>
        <planeGeometry args={[0.42, 0.26]} />
        <meshBasicMaterial color={screenColor} emissive={screenColor} emissiveIntensity={0.8} />
      </mesh>
    </group>
  )
}

/** mannequin torso on a stand, with a dress */
export function Mannequin({ x, z, y = 0.95, rot = 0, scale = 1, dressColor = '#f97316' }) {
  return (
    <group position={[x, y - 0.02, z]} rotation-y={rot} scale={scale}>
      <mesh position={[0, 0.05, 0]}>
        <cylinderGeometry args={[0.18, 0.24, 0.55, 12]} />
        <meshStandardMaterial color='#b7b0b8' roughness={0.8} metalness={0.1} />
      </mesh>
      <mesh castShadow>
        <coneGeometry args={[0.3, 0.5, 14]} />
        <meshStandardMaterial color={dressColor} roughness={0.85} />
      </mesh>
      <mesh position={[0, 0.72, 0]} castShadow>
        <sphereGeometry args={[0.26, 12, 10]} />
        <meshStandardMaterial color='#cfc7cf' roughness={0.9} />
      </mesh>
      <mesh position={[0, 1.04, 0]}>
        <cylinderGeometry args={[0.11, 0.12, 0.32, 10]} />
        <meshStandardMaterial color='#b7b0b8' />
      </mesh>
      <mesh position={[0, 1.3, 0]}>
        <sphereGeometry args={[0.2, 10, 8]} />
        <meshStandardMaterial color='#e8e3e6' roughness={0.7} />
      </mesh>
    </group>
  )
}

/** clothing rack with hanging dresses */
export function ClothesRack({ x, z, y = 0.95, rot = 0, scale = 1 }) {
  const dresses = [
    { c: '#f97316', sh: 0 },
    { c: '#6d227f', sh: 0.42 },
    { c: '#2fc2b8', sh: -0.44 },
  ]
  return (
    <group position={[x, y, z]} rotation-y={rot} scale={scale}>
      {[-0.55, 0.55].map((off, i) => (
        <mesh key={i} position={[off, 0.06, 0]}>
          <cylinderGeometry args={[0.05, 0.06, 0.55, 8]} />
          <meshStandardMaterial color='#5b4632' />
        </mesh>
      ))}
      <mesh position={[0, 0.68, 0]} castShadow>
        <mesh rotation-x={Math.PI / 2}>
          <cylinderGeometry args={[0.045, 0.045, 1.25, 8]} />
        </mesh>
        <meshStandardMaterial color='#5b4632' />
      </mesh>
      {dresses.map((d, i) => (
        <group key={i} position={[d.sh, 0.6, 0]}>
          <mesh>
            <cylinderGeometry args={[0.012, 0.012, 0.22, 5]} />
            <meshStandardMaterial color='#5b4632' />
          </mesh>
          <mesh position={[0, -0.28, 0]} scale={[0.34, 0.42, 0.22]} castShadow>
            <sphereGeometry args={[1, 8, 6]} />
            <meshStandardMaterial color={d.c} roughness={0.9} />
          </mesh>
        </group>
      ))}
    </group>
  )
}

/** keyhole postbox */
export function Mailbox({ x, z, y = 0.95, rot = 0, scale = 1 }) {
  return (
    <group position={[x, y - 0.05, z]} rotation-y={rot} scale={scale}>
      <mesh position={[0, 0.35, 0]}>
        <cylinderGeometry args={[0.07, 0.09, 0.7, 8]} />
        <meshStandardMaterial color='#6b4a30' roughness={0.8} />
      </mesh>
      <mesh position={[0, 0.85, 0]} castShadow>
        <boxGeometry args={[0.5, 0.62, 0.3]} />
        <meshStandardMaterial color='#f97316' roughness={0.7} />
      </mesh>
      <mesh position={[0, 0.56, 0]}>
        <boxGeometry args={[0.34, 0.12, 0.32]} />
        <meshStandardMaterial color='#f97316' roughness={0.7} />
      </mesh>
      <mesh position={[0, 1.14, 0]} rotation-y={0.7}>
        <boxGeometry args={[0.1, 0.2, 0.02]} />
        <meshStandardMaterial color='#d94d0c' />
      </mesh>
      <mesh position={[0, 0.75, 0.16]}>
        <planeGeometry args={[0.4, 0.42]} />
        <meshStandardMaterial color='#ffd9a8' roughness={0.5} />
      </mesh>
      <mesh position={[0, 0.75, 0.17]}>
        <planeGeometry args={[0.3, 0.3]} />
        <meshStandardMaterial color='#3d1146' roughness={0.3} />
      </mesh>
    </group>
  )
}

/** old-fashioned rotary phone */
export function Phone({ x, z, y = 1.2, rot = 0, scale = 1 }) {
  return (
    <group position={[x, y, z]} rotation-y={rot} scale={scale}>
      <mesh position={[0, 0.03, 0]}>
        <boxGeometry args={[0.34, 0.07, 0.24]} />
        <meshStandardMaterial color='#c2410c' roughness={0.6} />
      </mesh>
      <mesh position={[0, 0.14, 0]} rotation-x={-0.35}>
        <boxGeometry args={[0.3, 0.34, 0.06]} />
        <meshStandardMaterial color='#c2410c' roughness={0.6} />
      </mesh>
      <mesh position={[0, 0.1, -0.05]}>
        <cylinderGeometry args={[0.09, 0.09, 0.05, 12]} />
        <meshStandardMaterial color='#5b4632' roughness={0.4} />
      </mesh>
    </group>
  )
}