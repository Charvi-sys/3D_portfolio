import { motion } from 'framer-motion'
import { COLLECTIONS } from '../data/collections'
import PageShell from '../components/PageShell'

export default function Collections() {
  return (
    <PageShell title='Collections' accent='#9340a8'>
      <section className='mx-auto max-w-6xl px-5 md:px-10'>
        <p className='eyebrow'>Fashion stories</p>
        <h1 className='huge mt-3 text-4xl md:text-8xl'>COLLECTIONS</h1>
        <div className='mt-6 h-1 w-28 rounded-full bg-fuchsia-500' />
        <p className='mt-8 max-w-2xl font-body text-lg font-semibold leading-relaxed text-plum-700/80'>
          A miniature showroom of ideas — each collection has its own mood, materials and
          colour story. Scroll to move through the racks.
        </p>
      </section>

      <section className='mt-16 space-y-24'>
        {COLLECTIONS.map((col, idx) => (
          <motion.div
            key={col.id}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7 }}
            className='relative'
            style={{ background: `linear-gradient(120deg, ${col.colors[0]}22, transparent 55%)` }}
          >
            <div className='mx-auto grid max-w-6xl grid-cols-1 gap-10 px-5 md:grid-cols-2 md:px-10'>
              {/* copy */}
              <div className={idx % 2 ? 'md:order-2' : ''}>
                <p className='font-display text-xs font-bold uppercase tracking-[0.35em] text-plum-700/50'>
                  Collection {String(idx + 1).padStart(2, '0')}
                </p>
                <h2 className='mt-2 font-display text-4xl font-bold leading-none text-plum-800 md:text-6xl'>
                  {col.title}
                </h2>
                <p className='mt-1 font-display text-sm font-semibold text-plum-700/55'>{col.year}</p>
                <p className='mt-5 font-body text-lg font-semibold leading-relaxed text-plum-700/85'>
                  {col.concept}
                </p>
                <div className='mt-5 rounded-2xl bg-white/70 p-4'>
                  <p className='font-display text-xs font-bold uppercase tracking-widest text-plum-700/60'>
                    Inspiration
                  </p>
                  <p className='mt-1 font-body text-sm font-semibold italic text-plum-700/80'>{col.inspiration}</p>
                </div>
                <div className='mt-5'>
                  <p className='font-display text-xs font-bold uppercase tracking-widest text-plum-700/60'>
                    Palette
                  </p>
                  <div className='mt-2 flex gap-2'>
                    {col.colors.map((c) => (
                      <span
                        key={c}
                        className='h-9 w-9 rounded-full border-2 border-white shadow-sm'
                        style={{ background: c }}
                        title={c}
                      />
                    ))}
                  </div>
                </div>
                <div className='mt-4 flex flex-wrap gap-2'>
                  {col.materials.map((m) => (
                    <span key={m} className='chip'>
                      {m}
                    </span>
                  ))}
                </div>
              </div>
              {/* horizontal cinematic images */}
              <div className={`relative ${idx % 2 ? 'md:order-1' : ''}`}>
                <div className='flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4'>
                  {col.images.map((img, i) => (
                    <div
                      key={i}
                      className='w-64 shrink-0 snap-center overflow-hidden rounded-2xl shadow-soft transition-transform duration-300 hover:-translate-y-2 md:w-72'
                    >
                      <img src={img} alt={`${col.title} look ${i + 1}`} loading='lazy' className='aspect-[3/4] w-full object-cover' />
                    </div>
                  ))}
                </div>
                <p className='mt-2 text-center font-body text-xs font-bold uppercase tracking-[0.25em] text-plum-700/40'>
                  ← drag to scroll the rack →
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </section>
    </PageShell>
  )
}