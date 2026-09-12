import { RoundedBox } from '@react-three/drei'
import { MAT } from './BuildingsA'
import { Easel, Frame } from './PropsA'
import { Laptop, Mannequin, ClothesRack } from './PropsB'
import { PROJECTS } from '../../data/projects'
import { COLLECTIONS } from '../../data/collections'

const EASEL_B = PROJECTS[1].image
const LOOKBOOK = COLLECTIONS.map((c) => c.images[0])

/** PROJECTS — a semi-open creative studio with a big glass front */
export function ProjectsStudio() {
  return (
    <group>
      {/* main studio body */}
      <RoundedBox args={[5.8, 2.7, 3.9]} radius={0.14} smoothness={3} position={[0, 1.38, 0]} castShadow>
        <meshStandardMaterial {...MAT.cream} />
      </RoundedBox>
      {/* slanted roof */}
      <mesh position={[0, 2.9, 0]} rotation-x={0.1} castShadow>
        <boxGeometry args={[6.4, 0.32, 4.6]} />
        <meshStandardMaterial {...MAT.roofB} />
      </mesh>
      <mesh position={[0, 2.72, -1.9]}>
        <boxGeometry args={[6.4, 0.3, 0.4]} />
        <meshStandardMaterial {...MAT.plum} />
      </mesh>
      {/* glass front + door */}
      <mesh position={[0, 1.7, 1.97]}>
        <boxGeometry args={[5.0, 1.9, 0.12]} />
        <meshStandardMaterial {...MAT.glass} />
      </mesh>
      <RoundedBox args={[0.9, 2.1, 0.14]} radius={0.08} position={[0, 1.05, 2.0]}>
        <meshStandardMaterial color='#6d227f' roughness={0.7} />
      </RoundedBox>
      {/* design boards on the back wall */}
      <group position={[0, 1.7, -1.82]} rotation-y={Math.PI}>
        <group position={[-1.5, 0, 0]}>
          <Frame w={1.1} h={1.3} poster={EASEL_B} />
        </group>
        <group position={[1.5, 0, 0]}>
          <Frame w={1.1} h={1.3} poster={PROJECTS[2].image} />
        </group>
      </group>
      {/* work table + laptop */}
      <group position={[0.6, 0, 0.5]}>
        <mesh position={[0, 0.62, 0]} castShadow>
          <boxGeometry args={[1.5, 0.1, 0.8]} />
          <meshStandardMaterial color='#c9a06a' roughness={0.8} />
        </mesh>
        {[0.5, -0.5].map((ox, i) => (
          <mesh key={i} position={[ox, 0.31, 0]}>
            <boxGeometry args={[0.1, 0.6, 0.6]} />
            <meshStandardMaterial color='#8a5a38' />
          </mesh>
        ))}
        <Laptop x={0} z={0.05} y={0.7} rot={0} scale={1} />
      </group>
      {/* rug */}
      <mesh position={[-1.6, 0.03, 0.9]} rotation-x={-Math.PI / 2} rotation-z={0.4}>
        <circleGeometry args={[0.85, 20]} />
        <meshStandardMaterial color='#e2574c' roughness={0.9} />
      </mesh>
      <Easel x={3.2} z={1.4} rot={-0.6} poster={EASEL_B} scale={1.05} />
    </group>
  )
}

/** COLLECTIONS — a glass showroom with a mannequin and rack */
export function Showroom() {
  return (
    <group>
      <mesh position={[0, 0.07, 0]} rotation-x={-Math.PI / 2}>
        <circleGeometry args={[3.6, 32]} />
        <meshStandardMaterial color='#f4e0bb' roughness={0.95} />
      </mesh>
      {/* glass walls */}
      {[
        [0, 1.7, 1.9, 5.4, 3.2, 0.1],
        [0, 1.7, -1.9, 5.4, 3.2, 0.1],
        [2.7, 1.7, 0, 0.1, 3.2, 4.0],
        [-2.7, 1.7, 0, 0.1, 3.2, 4.0],
      ].map(([x, wy, wz, ww, wh, wd], i) => (
        <mesh key={i} position={[x, wy, wz]}>
          <boxGeometry args={[ww, wh, wd]} />
          <meshStandardMaterial {...MAT.glass} />
        </mesh>
      ))}
      {[0, 1].map((i) => (
        <mesh key={i} position={[i ? 2.68 : -2.68, 1.7, 0]}>
          <boxGeometry args={[0.18, 3.1, 3.9]} />
          <meshStandardMaterial {...MAT.plum} />
        </mesh>
      ))}
      {/* awning */}
      {[0, 1, 2, 3].map((i) => (
        <mesh key={i} position={[-1.5 + i * 1.0, 3.4, 0.8]}>
          <boxGeometry args={[0.95, 0.55, 0.36]} />
          <meshStandardMaterial color={i % 2 ? '#6d227f' : '#fbf3e4'} roughness={0.85} />
        </mesh>
      ))}
      {/* podium + mannequin */}
      <mesh position={[0, 0.22, 0.8]} castShadow>
        <cylinderGeometry args={[0.8, 0.95, 0.12, 24]} />
        <meshStandardMaterial color='#c9a06a' roughness={0.7} />
      </mesh>
      <Mannequin x={0} z={0.8} y={0.3} rot={0} scale={1} dressColor='#f97316' />
      <ClothesRack x={-1.6} z={-0.7} rot={0.4} scale={1} />
      <group position={[2.02, 1.6, -1.5]} rotation-y={Math.PI / 2}>
        <Frame w={1.0} h={1.2} poster={LOOKBOOK[0]} />
      </group>
      <group position={[2.02, 1.6, 1.5]} rotation-y={Math.PI / 2}>
        <Frame w={1.0} h={1.2} poster={LOOKBOOK[1]} />
      </group>
      <mesh position={[0, 3.28, 0]}>
        <boxGeometry args={[2.6, 0.06, 0.22]} />
        <meshBasicMaterial color='#ffe9b0' emissive='#ffe9b0' emissiveIntensity={1.6} />
      </mesh>
    </group>
  )
}