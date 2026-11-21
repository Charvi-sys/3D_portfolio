import { useRef, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import gsap from 'gsap'
import { camStore } from '../../store/camStore'
import { uiStore } from '../../store/uiStore'
import { DEFAULT_CAM, getLocation, LOCATIONS } from '../../data/locations'

const DEF = new THREE.Vector3(...DEFAULT_CAM.pos)
const DEF_LOOK = new THREE.Vector3(...DEFAULT_CAM.look)

/**
 * Portrait / narrow screens see a much narrower slice of the island at the
 * same camera distance, which makes the world look cramped and cluttered.
 * Scale the overview camera outward so the whole plaza stays in frame.
 */
function portraitZoom(pos) {
  const aspect = window.innerWidth / Math.max(window.innerHeight, 1)
  if (aspect >= 1) return pos.clone()
  // ~1.45× further back on a 414×896 phone, smoothly up to 1.8× at 9:19.5
  const f = Math.min(1.8, Math.pow(1 / Math.max(aspect, 0.3), 0.55))
  const out = pos.clone()
  out.y += 1.5 * (f - 1)
  return out.multiplyScalar(f)
}

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
    const p = portraitZoom(DEF)
    camera.position.set(p.x, p.y, p.z)

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
      const target = portraitZoom(new THREE.Vector3(...fly.to))
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
        x: target.x,
        y: target.y,
        z: target.z,
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
    // gentle cinematic drift (recentered when the viewport is portrait)
    const base = portraitZoom(DEF)
    const drift = new THREE.Vector3(
      base.x + Math.sin(t * 0.06) * 0.5,
      base.y + Math.cos(t * 0.05) * 0.28,
      base.z + Math.sin(t * 0.045 + 1.2) * 0.4,
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