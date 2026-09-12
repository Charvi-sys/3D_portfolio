import { useRef, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import gsap from 'gsap'
import { camStore } from '../../store/camStore'
import { uiStore } from '../../store/uiStore'
import { DEFAULT_CAM, getLocation, LOCATIONS } from '../../data/locations'

const DEF = new THREE.Vector3(...DEFAULT_CAM.pos)
const DEF_LOOK = new THREE.Vector3(...DEFAULT_CAM.look)

export default function CameraController() {
  const { camera } = useThree()
  const state = useRef({
    flying: false,
    anim: null,
    look: new THREE.Vector3(...DEFAULT_CAM.look),
    hovered: null,
  })

  useEffect(() => {
    camera.up.set(0, 1, 0)
    camera.position.set(DEF.x, DEF.y, DEF.z)

    const unsubCam = camStore.subscribe((fly) => {
      const s = state.current
      if (s.anim) {
        s.anim.kill()
        s.anim = null
      }
      if (!fly) {
        s.flying = false
        return
      }
      s.flying = true
      const lookFrom = s.look.clone()
      const lookTo = new THREE.Vector3(...fly.look)
      const tl = gsap.timeline({
        onComplete: () => {
          s.flying = false
          s.anim = null
          if (fly.onComplete) fly.onComplete()
        },
      })
      tl.to(camera.position, {
        x: fly.to[0],
        y: fly.to[1],
        z: fly.to[2],
        duration: fly.duration,
        ease: fly.ease || 'power3.inOut',
      })
      tl.to(
        lookFrom,
        {
          x: lookTo.x,
          y: lookTo.y,
          z: lookTo.z,
          duration: fly.duration,
          ease: fly.ease || 'power3.inOut',
          onUpdate: () => {
            s.look.copy(lookFrom)
            camera.lookAt(s.look)
          },
        },
        0,
      )
      s.anim = tl
    })

    const unsubUi = uiStore.subscribe((st) => {
      state.current.hovered = st.hoveredId
    })

    return () => {
      unsubCam()
      unsubUi()
      if (state.current.anim) state.current.anim.kill()
    }
  }, [camera])

  useFrame(({ clock }) => {
    const s = state.current
    if (s.flying) return
    const t = clock.elapsedTime
    // gentle cinematic drift
    const drift = new THREE.Vector3(
      DEF.x + Math.sin(t * 0.06) * 0.5,
      DEF.y + Math.cos(t * 0.05) * 0.28,
      DEF.z + Math.sin(t * 0.045 + 1.2) * 0.4,
    )
    camera.position.lerp(drift, 0.025)

    // hover nudge toward the hovered location
    const hoverTarget = new THREE.Vector3(DEF_LOOK.x, DEF_LOOK.y, DEF_LOOK.z)
    if (s.hovered) {
      const loc = getLocation(s.hovered)
      if (loc) {
        hoverTarget.lerp(new THREE.Vector3(...loc.cam.look), 0.18)
      }
    }
    s.look.lerp(hoverTarget, 0.06)
    camera.lookAt(s.look)
  })

  return null
}