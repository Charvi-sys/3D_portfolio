import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { navStore } from '../store/navStore'

export default function PageShell({ children, title, accent = '#f97316' }) {
  useEffect(() => {
    document.title = title ? `${title} · CHARVI WORLD` : 'CHARVI · A World of Design'
  }, [title])

  return (
    <div
      className='relative min-h-screen overflow-x-hidden'
      style={{ background: 'linear-gradient(180deg,#fff7ed 0%,#fbf3e4 40%,#ffe8d6 100%)' }}
    >
      {/* soft accent blobs */}
      <div
        className='pointer-events-none absolute -left-40 top-10 h-[26rem] w-[26rem] rounded-full opacity-25 blur-3xl'
        style={{ background: accent }}
      />
      <div
        className='pointer-events-none absolute -right-44 bottom-0 h-[30rem] w-[30rem] rounded-full opacity-20 blur-3xl'
        style={{ background: '#2fc2b8' }}
      />

      <header className='fixed inset-x-0 top-0 z-40 flex items-center justify-between px-5 py-4 md:px-10'>
        <button
          onClick={() => navStore.go('/', '#f97316')}
          data-cursor='HOME'
          className='font-display text-sm font-bold uppercase tracking-[0.3em] text-plum-800'
        >
          Charvi
        </button>
        <button
          onClick={() => navStore.go('/', '#f97316')}
          data-cursor='BACK'
          className='rounded-full border border-plum-800/25 bg-cream/70 px-5 py-2 font-display text-xs font-semibold uppercase tracking-widest text-plum-800 backdrop-blur transition hover:bg-plum-800 hover:text-cream md:px-7 md:text-sm'
        >
          ← Return to world
        </button>
      </header>

      <motion.main
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className='relative z-10 pt-24 md:pt-28'
      >
        {children}
      </motion.main>

      <footer className='relative z-10 mt-24 flex flex-col items-center gap-2 border-t border-plum-800/10 py-10 text-center'>
        <p className='font-display text-sm font-bold tracking-[0.3em] text-plum-800'>CHARVI</p>
        <p className='font-body text-xs font-semibold uppercase tracking-[0.2em] text-plum-800/50'>
          Fashion &amp; Digital Designer · made as a 3D world
        </p>
      </footer>
    </div>
  )
}