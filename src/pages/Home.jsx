import { Suspense, useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { AnimatePresence, motion } from 'framer-motion'
import { uiStore } from '../store/uiStore'
import { camStore } from '../store/camStore'
import { navStore } from '../store/navStore'
import { DEFAULT_CAM, getLocation } from '../data/locations'
import { PERSON } from '../data/content'
import World from '../components/three/World'
import LoadingScreen from '../components/LoadingScreen'
import Menu from '../components/Menu'

function webglAvailable() {
  try {
    const c = document.createElement('canvas')
    return !!(window.WebGLRenderingContext && (c.getContext('webgl2') || c.getContext('webgl')))
  } catch {
    return false
  }
}

export default function Home() {
  const quality = uiStore.quality
  const [ready, setReady] = useState(false)
  const [canvasReady, setCanvasReady] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [hovered, setHovered] = useState(null)
  const [glFail, setGlFail] = useState(false)

  useEffect(() => {
    // early WebGL capability check — show a clear message instead of a cryptic crash
    if (!webglAvailable()) setGlFail(true)
  }, [])

  useEffect(() => {
    const unsub = uiStore.subscribe((st) => setHovered(st.hoveredId))
    uiStore.setHover(null)
    return () => {
      unsub()
      camStore.cancelFly()
    }
  }, [])

  const flyTo = (loc) => {
    setMenuOpen(false)
    camStore.requestFly({
      to: loc.cam.pos,
      look: loc.cam.look,
      duration: 3.0,
      ease: 'power3.inOut',
      onComplete: () => navStore.go(loc.path, loc.accent),
    })
  }

  if (glFail) {
    return (
      <div
        className='fixed inset-0 flex flex-col items-center justify-center overflow-auto p-8 text-center'
        style={{ background: 'linear-gradient(160deg,#3d1146 0%,#6d227f 60%,#f97316 130%)' }}
      >
        <p className='font-display text-6xl'>🏝️</p>
        <h1 className='mt-4 font-display text-3xl font-bold text-cream md:text-4xl'>
          This world needs WebGL
        </h1>
        <p className='mt-3 max-w-md font-body text-base font-semibold text-cream/80'>
          Your browser or device didn&apos;t give us a 3D context. Try enabling hardware
          acceleration, updating the browser, or switching device.
        </p>
        <a
          href='#'
          onClick={() => window.location.reload()}
          className='mt-8 rounded-full bg-cream px-8 py-3 font-display text-base font-bold text-plum-800 shadow-soft'
        >
          Try again
        </a>
      </div>
    )
  }

  return (
    <div className='fixed inset-0 overflow-hidden bg-plum-900'>
      {/* the world */}
      <Canvas
        shadows
        dpr={[1, quality === 'high' ? 2 : 1.5]}
        camera={{ fov: 42, position: DEFAULT_CAM.pos, near: 0.1, far: 260 }}
        gl={{ antialias: true, powerPreference: 'high-performance' }}
        onCreated={() => {
          setCanvasReady(true)
        }}
      >
        <Suspense fallback={null}>
          <World />
        </Suspense>
      </Canvas>

      {/* hovered location chip */}
      <AnimatePresence>
        {hovered && getLocation(hovered) && (
          <motion.div
            key={hovered}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className='pointer-events-none fixed bottom-24 left-1/2 z-40 flex -translate-x-1/2 flex-col items-center gap-1'
          >
            <span className='rounded-full border border-cream/40 bg-plum-800/70 px-5 py-1.5 font-display text-sm font-semibold tracking-widest text-cream backdrop-blur'>
              {getLocation(hovered).short} <span className='text-lake-300'>· VIEW →</span>
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* top-left brand */}
      <div className='pointer-events-none fixed left-5 top-5 z-40 md:left-10 md:top-8'>
        <p className='font-display text-sm font-semibold uppercase tracking-[0.3em] text-cream/95'>
          {PERSON.name}
        </p>
        <p className='font-body text-[11px] font-semibold uppercase tracking-[0.25em] text-sunset-200/80'>
          {PERSON.shortRole}
        </p>
      </div>

      {/* top-right menu */}
      <button
        onClick={() => setMenuOpen(true)}
        data-cursor='MENU'
        className='fixed right-5 top-5 z-40 rounded-full border border-cream/30 bg-plum-900/40 px-6 py-2.5 font-display text-sm font-semibold uppercase tracking-[0.3em] text-cream backdrop-blur transition hover:bg-cream hover:text-plum-800 md:right-10 md:top-8'
      >
        Menu
      </button>

      {/* bottom hint */}
      <div className='pointer-events-none fixed bottom-6 left-1/2 z-40 -translate-x-1/2 text-center'>
        <p className='font-display text-base font-bold tracking-[0.35em] text-cream/95 md:text-lg'>
          EXPLORE THE WORLD
        </p>
        <p className='mt-1 hidden font-body text-[11px] font-semibold uppercase tracking-[0.22em] text-cream/50 md:block'>
          CLICK A SIGN · MENU · WANDER
        </p>
      </div>

      {/* right-side vertical hints (desktop) */}
      <div className='pointer-events-none fixed right-10 bottom-1/2 z-40 hidden translate-y-1/2 flex-col items-end gap-1 text-right font-body text-[10px] font-bold uppercase tracking-[0.2em] text-cream/40 md:flex'>
        <span>MOUSE · LOOK</span>
        <span>CLICK · EXPLORE</span>
      </div>

      {/* menu overlay */}
      <Menu open={menuOpen} onClose={() => setMenuOpen(false)} onGo={(loc) => flyTo(loc)} />

      {/* loading veil — guarantees the entry button always appears */}
      {!ready && <LoadingScreen worldReady={canvasReady} onEnter={() => setReady(true)} />}
    </div>
  )
}