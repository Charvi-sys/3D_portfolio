import { MAT, Site, AboutHouse, CertificateGallery } from './BuildingsA'
import { ProjectsStudio, Showroom } from './BuildingsB'
import { Bench } from './PropsA'
import { Laptop, Mailbox, Phone } from './PropsB'

/** CONTACT — a phone booth + mailbox + waiting bench */
function ContactBooth() {
  return (
    <group>
      <mesh position={[0, 0.06, 0]} rotation-x={-Math.PI / 2}>
        <circleGeometry args={[1.5, 28]} />
        <meshStandardMaterial color='#eee0c4' roughness={0.95} />
      </mesh>
      {/* glass booth */}
      <mesh position={[0, 1.35, 0]}>
        <cylinderGeometry args={[1.25, 1.25, 2.7, 5]} />
        <meshStandardMaterial color='#9fe8e0' metalness={0.1} roughness={0.15} transparent opacity={0.55} />
      </mesh>
      {/* corner posts */}
      {Array.from({ length: 4 }, (_, i) => {
        const a = (i / 4) * Math.PI * 2 + Math.PI / 4
        return (
          <mesh key={i} position={[Math.cos(a) * 1.2, 1.35, Math.sin(a) * 1.2]}>
            <cylinderGeometry args={[0.08, 0.1, 2.72, 6]} />
            <meshStandardMaterial {...MAT.roofB} />
          </mesh>
        )
      })}
      {/* roof cap */}
      <mesh position={[0, 2.75, 0]}>
        <cylinderGeometry args={[1.5, 1.22, 0.3, 5]} />
        <meshStandardMaterial {...MAT.roofB} />
      </mesh>
      {/* phone shelf + phone + glowing plaque */}
      <mesh position={[0, 1.12, 0]}>
        <cylinderGeometry args={[1.24, 1.24, 0.08, 5]} />
        <meshStandardMaterial color='#c9a06a' roughness={0.8} />
      </mesh>
      <Phone x={0.3} z={0.3} y={1.34} rot={-1.2} scale={1} />
      <mesh position={[0, 2.42, 0.05]}>
        <boxGeometry args={[1.9, 0.36, 0.05]} />
        <meshBasicMaterial color='#3d1146' />
      </mesh>
      <Mailbox x={-2.6} z={1.6} rot={-0.6} scale={1} />
      <Bench x={2.4} z={1.3} rot={-2.4} scale={0.9} />
    </group>
  )
}

/** RESUME — an open-air workstation with an umbrella desk */
function ResumeDesk() {
  return (
    <group>
      <mesh position={[0, 0.05, 0]} rotation-x={-Math.PI / 2}>
        <circleGeometry args={[3.1, 28]} />
        <meshStandardMaterial color='#e8d3ae' roughness={0.95} />
      </mesh>
      {/* desk */}
      <mesh position={[0, 0.66, 0]} castShadow>
        <boxGeometry args={[1.9, 0.1, 1.1]} />
        <meshStandardMaterial color='#a9723f' roughness={0.75} />
      </mesh>
      {[0.6, -0.6].map((ox, i) => (
        <mesh key={i} position={[ox, 0.33, 0]}>
          <boxGeometry args={[0.12, 0.66, 0.9]} />
          <meshStandardMaterial color='#7a4a30' />
        </mesh>
      ))}
      <Laptop x={0.25} z={-0.05} y={0.78} rot={0} scale={1} />
      {/* papers + mug + pen */}
      <mesh position={[-0.6, 0.75, 0.12]} rotation={[0, 0.2, 0.05]}>
        <boxGeometry args={[0.5, 0.04, 0.38]} />
        <meshStandardMaterial color='#ffffff' roughness={0.6} />
      </mesh>
      <mesh position={[-0.58, 0.78, 0.1]} rotation={[0, 0.32, 0.08]}>
        <boxGeometry args={[0.46, 0.035, 0.34]} />
        <meshStandardMaterial color='#fff4dc' roughness={0.6} />
      </mesh>
      <mesh position={[-0.9, 0.75, -0.15]}>
        <cylinderGeometry args={[0.06, 0.05, 0.12, 10]} />
        <meshStandardMaterial color='#e2574c' roughness={0.5} />
      </mesh>
      <mesh position={[0.58, 0.74, 0.12]} rotation={[0.1, 0, 0]}>
        <cylinderGeometry args={[0.016, 0.016, 0.5, 5]} />
        <meshStandardMaterial color='#3d1146' />
      </mesh>
      {/* portfolio book */}
      <group position={[-0.82, 0.3, 0.72]} rotation={[0.16, 0, 0.34]}>
        <mesh>
          <boxGeometry args={[0.8, 0.06, 1.1]} />
          <meshStandardMaterial color='#f97316' roughness={0.6} />
        </mesh>
      </group>
      {/* chair */}
      <mesh position={[1.5, 0.12, 0]}>
        <boxGeometry args={[0.5, 0.1, 0.5]} />
        <meshStandardMaterial color='#6d227f' roughness={0.8} />
      </mesh>
      <mesh position={[1.5, 0.75, 0]} rotation-x={0.12}>
        <boxGeometry args={[0.5, 1.2, 0.1]} />
        <meshStandardMaterial color='#6d227f' roughness={0.8} />
      </mesh>
      {/* umbrella */}
      <mesh position={[0.4, 1.0, 0.3]}>
        <cylinderGeometry args={[0.05, 0.06, 2.0, 7]} />
        <meshStandardMaterial color='#8a5a38' />
      </mesh>
      <mesh position={[0.4, 2.05, 0.3]} rotation-x={Math.PI} castShadow>
        <coneGeometry args={[1.9, 0.9, 10]} />
        <meshStandardMaterial color='#f97316' roughness={0.8} side={2} />
      </mesh>
    </group>
  )
}

export default function Buildings() {
  return (
    <group>
      <Site id='about'>
        <AboutHouse />
      </Site>
      <Site id='projects'>
        <ProjectsStudio />
      </Site>
      <Site id='certs'>
        <CertificateGallery />
      </Site>
      <Site id='collections'>
        <Showroom />
      </Site>
      <Site id='contact'>
        <ContactBooth />
      </Site>
      <Site id='resume'>
        <ResumeDesk />
      </Site>
    </group>
  )
}