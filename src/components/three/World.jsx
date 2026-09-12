import { Suspense } from 'react'
import { Sky } from '@react-three/drei'
import { uiStore } from '../../store/uiStore'
import { LOCATIONS } from '../../data/locations'
import Terrain from './Terrain'
import Water from './Water'
import Paths from './Paths'
import Trees from './Trees'
import Rocks from './Rocks'
import Grass from './Grass'
import { Lamp, Bench, Fountain } from './PropsA'
import Buildings from './BuildingsC'
import WorldText from './WorldText'
import Character from './Character'
import Effects from './Effects'
import CameraController from './CameraController'
import { terrainHeight } from './Terrain'

const BENCHES = [
  { x: 3.1, z: 5.5, ry: Math.PI / 1.8 },
  { x: -3.4, z: 4.6, ry: -Math.PI / 2.4 },
  { x: 3.8, z: 0.4, ry: Math.PI / 1.5 },
  { x: -4.4, z: -0.4, ry: -Math.PI / 1.4 },
]
const LAMPS = [
  { x: 2.6, z: 5.3, ry: -1.2 },
  { x: -3.0, z: 5.0, ry: 1.2 },
  { x: 2.2, z: 0.9, ry: 2.4 },
  { x: -3.2, z: 0.7, ry: 1.8 },
  { x: -4.6, z: 8.3, ry: -2.6 },
  { x: 6.1, z: -0.4, ry: 0.6 },
]

export default function World() {
  const quality = uiStore.quality
  return (
    <group>
      {/* ---------- atmosphere ---------- */}
      <color attach='background' args={['#ffd9b0']} />
      <fog attach='fog' args={['#ffd9b0', 42, 150]} />
      <Sky
        distance={4500}
        sunPosition={[32, 14, -18]}
        turbidity={7}
        rayleigh={1.6}
        mieCoefficient={0.005}
        mieDirectionalG={0.8}
      />
      <hemisphereLight args={['#ffd9b0', '#2fc2b8', 0.75]} />
      <ambientLight intensity={0.35} color='#ffe9d6' />
      {/* key sunlight */}
      <directionalLight
        position={[20, 26, 12]}
        intensity={quality === 'high' ? 1.5 : 1.2}
        color='#ffb066'
        castShadow
        shadow-mapSize-width={quality === 'high' ? 2048 : 1024}
        shadow-mapSize-height={quality === 'high' ? 2048 : 1024}
        shadow-camera-left={-32}
        shadow-camera-right={32}
        shadow-camera-top={32}
        shadow-camera-bottom={-32}
        shadow-camera-near={1}
        shadow-camera-far={70}
        shadow-bias={-0.0004}
      />
      {/* warm rim fill */}
      <directionalLight position={[-18, 10, -14]} intensity={0.55} color='#ffcf9a' />
      {/* soft top bounce */}
      <directionalLight position={[0, 22, 6]} intensity={0.35} color='#fff2e0' />

      {/* world */}
      <Terrain />
      <Water />
      <Paths />
      <Trees />
      <Rocks />
      <Grass />
      <Buildings />

      {/* plaza furniture */}
      <Fountain />
      {BENCHES.map((b, i) => (
        <Bench key={i} x={b.x} z={b.z} rot={b.ry} y={terrainHeight(b.x, b.z) + 0.92} />
      ))}
      {LAMPS.map((l, i) => (
        <Lamp key={i} x={l.x} z={l.z} rot={l.ry} y={terrainHeight(l.x, l.z) + 0.96} />
      ))}

      {/* giant 3D signs */}
      {LOCATIONS.map((loc) => (
        <WorldText key={loc.id} id={loc.id} />
      ))}

      <Character />
      <Suspense fallback={null}>
        <Effects />
      </Suspense>
      <CameraController />
    </group>
  )
}