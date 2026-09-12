import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { CERTIFICATIONS } from '../data/certifications'
import PageShell from '../components/PageShell'

function CertModal({ cert, onClose }) {
  return (
    <motion.div
      className='fixed inset-0 z-[60] flex items-center justify-center p-5'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <div className='absolute inset-0 bg-plum-900/80 backdrop-blur-sm' />
      <motion.div
        initial={{ scale: 0.85, y: 30 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 160, damping: 20 }}
        onClick={(e) => e.stopPropagation()}
        className='relative grid w-full max-w-3xl grid-cols-1 items-center gap-6 overflow-hidden rounded-3xl bg-cream p-8 shadow-soft md:grid-cols-2 md:p-10'
      >
        <div className='overflow-hidden rounded-2xl'>
          <img src={cert.image} alt={cert.title} className='aspect-[3/4] w-full object-cover' />
        </div>
        <div>
          <p className='eyebrow'>Certificate</p>
          <h3 className='mt-2 font-display text-3xl font-bold leading-tight text-plum-800 md:text-4xl'>
            {cert.title}
          </h3>
          <p className='mt-3 font-display text-sm font-semibold' style={{ color: cert.accent }}>
            {cert.organization}
          </p>
          <p className='font-body text-sm font-bold text-plum-700/50'>{cert.year}</p>
          <p className='mt-4 font-body text-base font-semibold leading-relaxed text-plum-700/85'>
            {cert.description}
          </p>
          <div className='mt-6 flex flex-wrap gap-3'>
            {cert.verificationLink && (
              <a href={cert.verificationLink} target='_blank' rel='noreferrer' className='btn-primary' data-cursor='OPEN'>
                Verify ↗
              </a>
            )}
            <button
              onClick={onClose}
              className='rounded-full border border-plum-800/25 px-6 py-3 font-display text-sm font-semibold text-plum-800 transition hover:bg-plum-800 hover:text-cream'
            >
              Close
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Certifications() {
  const [open, setOpen] = useState(null)
  return (
    <PageShell title='Certifications' accent='#1fa39a'>
      <section className='mx-auto max-w-6xl px-5 md:px-10'>
        <p className='eyebrow'>Gallery of milestones</p>
        <h1 className='huge mt-3 text-4xl md:text-8xl'>CERTIFICATIONS</h1>
        <div className='mt-6 h-1 w-28 rounded-full bg-lake-500' />
        <p className='mt-8 max-w-2xl font-body text-lg font-semibold leading-relaxed text-plum-700/80'>
          Each certificate hangs in the little gallery — tap one to step closer and read it.
        </p>
      </section>

      <section className='mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-6 px-5 sm:grid-cols-2 md:px-10 lg:grid-cols-3'>
        {CERTIFICATIONS.map((c, i) => (
          <motion.button
            key={c.id}
            onClick={() => setOpen(c)}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55, delay: (i % 3) * 0.08 }}
            whileHover={{ y: -8, rotate: -1 }}
            className='group relative text-left'
            data-cursor='VIEW'
          >
            <div className='overflow-hidden rounded-2xl shadow-soft transition-shadow group-hover:shadow-pop'>
              <img
                src={c.image}
                alt={c.title}
                loading='lazy'
                className='aspect-[3/4] w-full object-cover transition-transform duration-500 group-hover:scale-105'
              />
            </div>
            <div className='absolute inset-x-3 bottom-3 rounded-xl bg-white/85 p-3 backdrop-blur'>
              <p className='font-display text-sm font-bold leading-tight text-plum-800'>{c.title}</p>
              <p className='font-body text-xs font-semibold' style={{ color: c.accent }}>
                {c.organization} · {c.year}
              </p>
            </div>
          </motion.button>
        ))}
      </section>

      <AnimatePresence>{open && <CertModal cert={open} onClose={() => setOpen(null)} />}</AnimatePresence>
    </PageShell>
  )
}