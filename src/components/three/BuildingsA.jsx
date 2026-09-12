import { RoundedBox } from '@react-three/drei'
import { getLocation } from '../../data/locations'
import { terrainHeight } from './Terrain'
import { Easel, Frame, Bench } from './PropsA'
import { makePoster, makeAvatar } from '../../data/posters'
import { CERTIFICATIONS } from '../../data/certifications'
import { PROJECTS } from '../../data/projects'

// shared building materials
const MAT = {
  cream: { color: '#fbf3e4', roughness: 0.85 },
  white: { color: '#ffffff', roughness: 0.8 },
  roof: { color: '#e2574c', roughness: 0.75 },
  roofB: { color: '#f97316', roughness: 0.75 },
  wood: { color: '#8a5a38', roughness: 0.85 },
  glass: { color: '#bfeef0', metalness: 0.15, roughness: 0.1, transparent: true, opacity: 0.7 },
  glow: { color: '#ffe9b0', emissive: '#ffd98a', emissiveIntensity: 1.1 },
  plum: { color: '#6d227f', roughness: 0.8 },
}

const PORTRAIT = makeAvatar(3)
const EASEL_A = PROJECTS[0].image
const CERT_URIS = CERTIFICATIONS.map((c) => c.image)

const yawFacing = (x, z) => Math.atan2(x, z - 3)

function Site({ id, children, pad = false }) {
  const site = getLocation(id)
  const y = terrainHeight(site.pos[0], site.pos[1])
  return (
    <group position={[site.pos[0], y, site.pos[1]]} rotation-y={yawFacing(site.pos[0], site.pos[1])}>
      {pad && (
        <mesh position={[0, 0.02, 0]} rotation-x={-Math.PI / 2}>
          <circleGeometry args={[4.0, 32]} />
          <meshStandardMaterial color='#e8d3ae' roughness={0.95} />
        </mesh>
      )}
      {children}
    </group>
  )
}

/** ABOUT ME — a cosy cream cottage with a terracotta roof */
function AboutHouse() {
  return (
    <group>
      <RoundedBox args={[4.4, 2.6, 3.5]} radius={0.18} smoothness={3} position={[0, 1.35, 0]} castShadow receiveShadow>
        <meshStandardMaterial {...MAT.cream} />
      </RoundedBox>
      {/* pyramid roof */}
      <mesh position={[0, 2.85, 0]} rotation-y={Math.PI / 4} castShadow>
        <coneGeometry args={[3.9, 1.9, 4]} />
        <meshStandardMaterial {...MAT.roofB} />
      </mesh>
      {/* chimney */}
      <mesh position={[-1.35, 3.05, 0]}>
        <boxGeometry args={[0.42, 0.8, 0.42]} />
        <meshStandardMaterial color='#c98a5e' roughness={0.85} />
      </mesh>
      {/* door + porch */}
      <RoundedBox args={[0.95, 1.95, 0.24]} radius={0.1} position={[0, 0.97, 1.78]}>
        <meshStandardMaterial color='#7a4a30' roughness={0.7} />
      </RoundedBox>
      <mesh position={[0, 0.12, 1.9]} castShadow>
        <boxGeometry args={[1.6, 0.22, 0.9]} />
        <meshStandardMaterial color='#e0c9a0' roughness={0.9} />
      </mesh>
      {/* windows + flower boxes */}
      {[-1.15, 1.15].map((ox, i) => (
        <group key={i}>
          <mesh position={[ox, 1.35, 1.78]}>
            <boxGeometry args={[0.85, 0.9, 0.15]} />
            <meshStandardMaterial {...MAT.glow} />
          </mesh>
          <mesh position={[ox, 1.0, 1.82]}>
            <boxGeometry args={[0.95, 0.26, 0.26]} />
            <meshStandardMaterial color={i % 2 ? '#e2574c' : '#f97316'} roughness={0.8} />
          </mesh>
          <mesh position={[ox, 1.62, 2.0]}>
            <boxGeometry args={[0.15, 0.22, 0.12]} />
            <meshStandardMaterial color='#c98a5e' />
          </mesh>
        </group>
      ))}
      <mesh position={[2.25, 1.4, 0.3]} rotation-y={Math.PI / 2}>
        <boxGeometry args={[0.14, 0.8, 0.8]} />
        <meshStandardMaterial {...MAT.glow} />
      </mesh>
      {/* easel with a poster + framed portrait by the door */}
      <Easel x={2.6} z={1.7} rot={-0.75} poster={EASEL_A} scale={0.95} />
      <group position={[-2.15, 1.0, 1.55]} rotation-y={0.3}>
        <Frame w={0.62} h={0.8} poster={PORTRAIT} thick={0.05} />
      </group>
    </group>
  )
}

/** CERTIFICATES — a white gallery with a striped awning */
function CertificateGallery() {
  return (
    <group>
      <RoundedBox args={[5.4, 2.8, 3.0]} radius={0.14} smoothness={3} position={[0, 1.4, 0]} castShadow>
        <meshStandardMaterial {...MAT.white} />
      </RoundedBox>
      {/* roof slab */}
      <mesh position={[0, 2.88, 0]} castShadow>
        <boxGeometry args={[6.0, 0.28, 3.6]} />
        <meshStandardMaterial {...MAT.roofB} />
      </mesh>
      {/* awning stripes */}
      {[0, 1, 2, 3].map((i) => (
        <mesh key={i} position={[-1.5 + i * 1.0, 2.02, 1.62]}>
          <boxGeometry args={[0.95, 0.5, 0.34]} />
          <meshStandardMaterial color={i % 2 ? '#f97316' : '#fbf3e4'} roughness={0.85} />
        </mesh>
      ))}
      {/* glass front */}
      <mesh position={[0, 1.55, 1.54]}>
        <boxGeometry args={[4.8, 1.7, 0.12]} />
        <meshStandardMaterial {...MAT.glass} />
      </mesh>
      {/* entry columns */}
      {[-2.2, 2.2].map((ox, i) => (
        <mesh key={i} position={[ox, 1.05, 1.6]} castShadow>
          <boxGeometry args={[0.45, 2.1, 0.45]} />
          <meshStandardMaterial color={i % 2 ? '#f97316' : '#2fc2b8'} roughness={0.8} />
        </mesh>
      ))}
      {/* interior certificates */}
      <group position={[0, 1.6, -1.32]} rotation-y={Math.PI}>
        {[-1.35, 0, 1.35].map((ox, i) => (
          <group key={i} position={[ox, 0, 0]}>
            <Frame w={0.95} h={1.15} poster={CERT_URIS[i]} />
          </group>
        ))}
      </group>
      {/* spot lights */}
      {[-1.5, 0, 1.5].map((ox, i) => (
        <mesh key={i} position={[ox, 2.7, 0]}>
          <sphereGeometry args={[0.09, 8, 6]} />
          <meshBasicMaterial color='#ffe9b0' emissive='#ffd98a' emissiveIntensity={1.2} />
        </mesh>
      ))}
      <Bench x={-3.2} z={2.4} rot={Math.PI / 2} scale={0.9} />
    </group>
  )
}

export { Site, yawFacing, AboutHouse, CertificateGallery, MAT }