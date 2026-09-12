import { useState, useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { PERSON } from '../data/content'

const TIPS = [
  'planting grass…',
  'watering the river…',
  'arranging the fashion rack…',
  'sanding the bridge…',
  'inflating the letters…',
]

/**
 * Loading veil. Deliberately does NOT depend on drei's useProgress — that store
 * only advances when real loading events fire and can sit at 0% forever,
 * trapping the site behind the veil. Instead we animate progress up to a
 * believable value, then unlock ENTER once the WebGL canvas is alive, with a
 * hard timeout fallback (and an auto-enter) so the world can never be blocked.
 */
export default function LoadingScreen({ worldReady = false, onEnter }) {
  const [progress, setProgress] = useState(0)
  const [tip, setTip] = useState(0)
  const [gone, setGone] = useState(false)
  const [unlocked, setUnlocked] = useState(false)
  const enteredRef = useRef(false)

  // rotate the flavour tips
  useEffect(() => {
    const id = setInterval(() => setTip((t) => (t + 1) % TIPS.length), 1400)
    return () => clearInterval(id)
  }, [])

  // deterministic progress: reaches ~94% after ~2.6s (smooth ease)
  useEffect(() => {
    if (enteredRef.current) return
    let start = null
    let raf
    const step = (ts) => {
      if (enteredRef.current) return
      if (start == null) start = ts
      const t = Math.min(1, (ts - start) / 2600)
      const eased = 1 - Math.pow(1 - t, 3)
      setProgress(Math.round(eased * 94))
      raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [])

  // unlock rules: canvas alive (worldReady) + a short hold, OR a hard fallback
  useEffect(() => {
    const hard = setTimeout(() => setUnlocked(true), 3200)
    return () => clearTimeout(hard)
  }, [])

  useEffect(() => {
    if (!worldReady) return
    const id = setTimeout(() => setUnlocked(true), 1200)
    return () => clearTimeout(id)
  }, [worldReady])

  // never trap the visitor: auto-enter after 12s even without a click
  useEffect(() => {
    if (enteredRef.current) return
    const id = setTimeout(enter, 12000)
    return () => clearTimeout(id)
  }, [])

  function enter() {
    if (enteredRef.current) return
    enteredRef.current = true
    setProgress(100)
    setGone(true)
    setTimeout(onEnter, 550)
  }

  return (
    <AnimatePresence>
      {!gone && (
        <motion.div
          key='loader'
          className='fixed inset-0 z-[80] flex flex-col items-center justify-center overflow-hidden'
          style={{ background: 'linear-gradient(160deg,#3d1146 0%,#6d227f 60%,#f97316 130%)' }}
          exit={{ opacity: 0, pointerEvents: 'none' }}
          transition={{ duration: 0.6 }}
        >
          {/* floating blobs */}
          <div className='absolute -left-24 top-24 h-72 w-72 rounded-full bg-sunset-500/30 blur-3xl' />
          <div className='absolute right-0 bottom-0 h-96 w-96 rounded-full bg-lake-400/20 blur-3xl' />

          <p className='font-body text-sm font-bold uppercase tracking-[0.4em] text-lake-200'>
            Entering the world of
          </p>
          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className='mt-2 font-display text-6xl font-bold text-cream md:text-8xl'
          >
            {PERSON.name.toUpperCase()}
          </motion.h1>

          <div className='mt-12 flex h-2 w-64 overflow-hidden rounded-full bg-white/20 md:w-96'>
            <motion.div
              className='h-full rounded-full bg-sunset-400'
              animate={{ width: `${progress}%` }}
              transition={{ ease: 'easeOut' }}
            />
          </div>
          <p className='mt-4 font-display text-sm font-medium tracking-widest text-cream/80'>
            {unlocked ? 'WORLD READY' : `${progress}% · ${TIPS[tip]}`}
          </p>

          {unlocked && (
            <motion.button
              onClick={enter}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              whileHover={{ scale: 1.05, y: -2 }}
              className='mt-10 rounded-full bg-cream px-10 py-4 font-display text-lg font-bold text-plum-800 shadow-soft'
            >
              ENTER THE WORLD
            </motion.button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}