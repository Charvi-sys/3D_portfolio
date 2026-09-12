import { motion } from 'framer-motion'
import { PROJECTS } from '../data/projects'
import PageShell from '../components/PageShell'

export default function Projects() {
  return (
    <PageShell title='Projects' accent='#6d227f'>
      <section className='mx-auto max-w-6xl px-5 md:px-10'>
        <p className='eyebrow'>Creative work</p>
        <h1 className='huge mt-3 text-5xl md:text-8xl'>PROJECTS</h1>
        <div className='mt-6 h-1 w-28 rounded-full bg-sunset-500' />
        <p className='mt-8 max-w-2xl font-body text-lg font-semibold leading-relaxed text-plum-700/80'>
          Selected works — from couture studies to virtual garments. Every project lives in
          the world you just walked through.
        </p>
      </section>

      <section className='mx-auto mt-20 max-w-6xl px-5 md:px-10'>
        <div className='flex flex-col gap-24 md:gap-32'>
          {PROJECTS.map((p, i) => (
            <motion.article
              key={p.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className='group grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-12'
            >
              {/* giant number */}
              <div className='order-2 font-display text-sm font-bold tracking-widest text-plum-700/40 lg:order-1 lg:col-span-2 lg:pt-3'>
                <span className='text-5xl md:text-7xl'>{p.index}</span>
              </div>
              {/* image */}
              <div className='order-1 lg:order-2 lg:col-span-5'>
                <motion.div
                  whileHover={{ scale: 1.03, rotate: -0.5 }}
                  transition={{ type: 'spring', stiffness: 120, damping: 16 }}
                  className='overflow-hidden rounded-3xl shadow-soft'
                  style={{ background: p.colors[0] }}
                >
                  <img
                    src={p.image}
                    alt={p.title}
                    loading='lazy'
                    className='aspect-[3/4] w-full object-cover transition-transform duration-700 group-hover:scale-105'
                  />
                </motion.div>
              </div>
              {/* copy */}
              <div className='order-3 lg:col-span-5'>
                <p className='font-display text-xs font-bold uppercase tracking-[0.3em]' style={{ color: p.accent }}>
                  {p.category}
                </p>
                <h2 className='mt-3 font-display text-4xl font-bold leading-none text-plum-800 md:text-6xl'>
                  {p.title}
                </h2>
                <p className='mt-2 font-display text-sm font-semibold text-plum-700/50'>{p.year}</p>
                <p className='mt-6 font-body text-lg font-semibold leading-relaxed text-plum-700/85'>
                  {p.description}
                </p>
                <div className='mt-6 flex flex-wrap gap-2'>
                  {p.tags.map((t) => (
                    <span key={t} className='chip'>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>
    </PageShell>
  )
}