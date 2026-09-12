import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { uiStore } from '../../store/uiStore'

const CLOUD_MAT = new THREE.MeshStandardMaterial({
  color: '#fff4e6',
  roughness: 1,
  flatShading: true,
  transparent: true,
  opacity: 0.88,
})

function Cloud({ pos = [0, 9, 0], scale = 1.2, seed = 1, speed = 0.25 }) {
  const ref = useRef()
  const size = useMemo(
    () => [0.6 + Math.random() * 0.5, 0.5 + Math.random() * 0.3, 0.3 + Math.random() * 0.2],
    [],
  )
  useFrame(({ clock }) => {
    if (!ref.current) return
    const t = clock.elapsedTime
    ref.current.position.x = pos[0] + Math.sin(t * speed + seed * 3) * 8
    ref.current.position.y = pos[1] + Math.sin(t * 0.35 + seed * 2) * 0.5
  })
  return (
    <group ref={ref} position={pos} scale={scale}>
      {[0, 1, 2].map((i) => (
        <mesh
          key={i}
          position={[(i - 1) * 1.3 * size[0], -i * 0.2 * size[1], i * 0.4 * size[2]]}
          scale={[size[0] * (1 + i * 0.4), size[1], size[1]]}
          material={CLOUD_MAT}
        >
          <sphereGeometry args={[1, 8, 6]} />
        </mesh>
      ))}
    </group>
  )
}

function Bird({ radius = 20, angle = 0, speed = 0.09 }) {
  const ref = useRef()
  const wingL = useRef()
  const wingR = useRef()
  useFrame(({ clock }) => {
    if (!ref.current) return
    const t = clock.elapsedTime * speed + angle
    ref.current.position.set(
      Math.cos(t) * radius,
      8.5 + Math.sin(t * 3) * 1.2,
      Math.sin(t * 1.5) * radius * 0.6,
    )
    ref.current.rotation.y = -t + Math.PI / 2
    const flap = Math.sin(t * 14) * 0.5
    if (wingL.current) wingL.current.rotation.z = -flap
    if (wingR.current) wingR.current.rotation.z = flap
  })
  return (
    <group ref={ref}>
      <mesh ref={wingL} position={[-0.22, 0, 0]} rotation-z={0.6}>
        <boxGeometry args={[0.42, 0.02, 0.14]} />
        <meshStandardMaterial color='#3d1146' roughness={0.9} />
      </mesh>
      <mesh ref={wingR} position={[0.22, 0, 0]} rotation-z={-0.6}>
        <boxGeometry args={[0.42, 0.02, 0.14]} />
        <meshStandardMaterial color='#3d1146' roughness={0.9} />
      </mesh>
      <mesh>
        <coneGeometry args={[0.05, 0.14, 6]} />
        <meshStandardMaterial color='#3d1146' roughness={0.9} />
      </mesh>
    </group>
  )
}

function Fireflies({ count = 34 }) {
  const seeds = useMemo(
    () =>
      Array.from({ length: count }, () => ({
        x: (Math.random() - 0.5) * 40,
        z: (Math.random() - 0.5) * 40,
        y: 0.6 + Math.random() * 3.5,
        ph: Math.random() * Math.PI * 2,
      })),
    [count],
  )
  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(new Float32Array(count * 3), 3))
    return g
  }, [count])

  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    const arr = geo.attributes.position.array
    for (let i = 0; i < count; i++) {
      const p = seeds[i]
      arr[i * 3] = p.x + Math.sin(t * 0.5 + p.ph) * 1.5
      arr[i * 3 + 1] = p.y + Math.sin(t * 1.1 + p.ph * 2) * 0.4
      arr[i * 3 + 2] = p.z + Math.cos(t * 0.5 + p.ph) * 1.5
    }
    geo.attributes.position.needsUpdate = true
  })

  return (
    <points geometry={geo}>
      <pointsMaterial
        size={0.1}
        color='#ffd98a'
        transparent
        opacity={0.85}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

export default function Effects() {
  const quality = uiStore.quality
  return (
    <group>
      <Cloud pos={[-14, 9, -6]} scale={1.4} seed={2} />
      <Cloud pos={[6, 10.5, -16]} scale={1.1} seed={5} />
      <Cloud pos={[18, 8.5, 8]} scale={1.6} seed={9} />
      <Cloud pos={[-20, 10, 14]} scale={1.2} seed={4} />
      <Bird angle={0} />
      <Bird angle={2.2} radius={21} />
      {quality === 'high' && <Fireflies count={34} />}
    </group>
  )
}