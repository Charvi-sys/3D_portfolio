import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { LOCATIONS } from '../data/locations'
import { navStore } from '../store/navStore'

const items = [
  { label: 'HOME', path: '/' },
  ...LOCATIONS.map((l) => ({ label: l.short, path: l.path })),
]

export default function Menu({ open, onClose, onGo }) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const go = (path, accent) => {
    onClose()
    if (path === '/') {
      navStore.go(path, accent)
      return
    }
    // fly the camera to the location first, then transition
    const loc = LOCATIONS.find((l) => l.path === path)
    if (loc) {
      onGo && onGo(loc)
    } else {
      navStore.go(path, accent)
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key='menu'
          className='fixed inset-0 z-[60] flex flex-col items-center justify-center'
          style={{ background: 'linear-gradient(150deg,#3d1146 0%,#6d227f 55%,#f97316 135%)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.3 } }}
        >
          <div className='absolute left-10 top-10 h-56 w-56 rounded-full bg-cream/5 blur-3xl' />
          <div className='absolute bottom-10 right-10 h-72 w-72 rounded-full bg-sunset-500/30 blur-3xl' />
          <h2 className='mb-10 font-display text-sm font-semibold uppercase tracking-[0.5em] text-lake-300'>
            A world of
          </h2>
          <nav className='flex flex-col items-center gap-2 md:gap-3'>
            {items.map((it, i) => (
              <motion.button
                key={it.label}
                onClick={() => go(it.path, '#f97316')}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 * i, duration: 0.5 }}
                whileHover={{ x: 8, scale: 1.06 }}
                className='group font-display text-4xl font-bold text-cream/90 transition-colors hover:text-sunset-300 md:text-6xl'
                data-cursor='ENTER'
              >
                {it.label}
                <span className='hidden text-sm text-lake-400 group-hover:inline'>{' / explore'}</span>
              </motion.button>
            ))}
          </nav>
          <motion.button
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className='mt-12 rounded-full border border-cream/30 px-8 py-3 font-display text-sm font-semibold uppercase tracking-widest text-cream/80 transition hover:bg-cream hover:text-plum-800'
          >
            Close
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}