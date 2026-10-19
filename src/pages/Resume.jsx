import { motion } from 'framer-motion'
import { PERSON, RESUME_FILE, RESUME_URL } from '../data/content'
import PageShell from '../components/PageShell'

export default function Resume() {
  return (
    <PageShell title='Resume' accent='#58a12f'>
      <section className='mx-auto max-w-6xl px-5 md:px-10'>
        <p className='eyebrow'>Education &amp; skills</p>
        <h1 className='huge mt-3 text-5xl md:text-8xl'>RESUME</h1>
        <div className='mt-6 h-1 w-28 rounded-full bg-leaf-500' />
        <p className='mt-8 max-w-2xl font-body text-lg font-semibold leading-relaxed text-plum-700/80'>
          The short version of a long story — peek at the PDF below, or download it.
        </p>
        <a href={RESUME_URL} download={RESUME_FILE} className='btn-primary mt-10' data-cursor='DOWNLOAD'>
          DOWNLOAD RESUME ↓
        </a>
      </section>

      <section className='mx-auto mt-20 max-w-3xl px-5 md:px-10'>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className='overflow-hidden rounded-3xl border border-plum-800/15 bg-white shadow-soft'
        >
          <div className='flex items-center justify-between gap-3 border-b border-plum-800/10 bg-cream/90 px-5 py-3 backdrop-blur'>
            <p className='font-display text-sm font-bold text-plum-800'>{RESUME_FILE}</p>
            <a href={RESUME_URL} download={RESUME_FILE} data-cursor='SAVE' className='font-body text-xs font-bold text-sunset-600'>
              Save ↓
            </a>
          </div>
          <div className='aspect-[1/1.414] w-full'>
            <iframe
              src={RESUME_URL}
              title={`${PERSON.fullName} — resume`}
              loading='lazy'
              className='h-full w-full'
            />
          </div>
        </motion.div>
      </section>

      <section className='mx-auto mt-20 max-w-6xl px-5 md:px-10'>
        <div className={`grid grid-cols-1 gap-10 ${PERSON.experience.length > 0 ? 'md:grid-cols-2' : 'md:grid-cols-1'}`}>
          {PERSON.experience.length > 0 && (
            <div>
              <h2 className='font-display text-3xl font-bold text-plum-800'>EXPERIENCE</h2>
              <div className='mt-6 space-y-6 border-l-2 border-sunset-300 pl-6'>
                {PERSON.experience.map((e, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.09 }}
                    className='relative'
                  >
                    <span className='absolute -left-[31px] top-1 h-3 w-3 rounded-full bg-sunset-500' />
                    <p className='font-display text-lg font-bold text-plum-800'>{e.role}</p>
                    <p className='font-body text-sm font-semibold text-sunset-600'>{e.place}</p>
                    <p className='font-body text-xs font-bold text-plum-700/50'>{e.years}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
          <div>
            <h2 className='font-display text-3xl font-bold text-plum-800'>EDUCATION</h2>
            <div className='mt-6 space-y-6 border-l-2 border-lake-400 pl-6'>
              {PERSON.education.map((e, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.09 }}
                  className='relative'
                >
                  <span className='absolute -left-[31px] top-1 h-3 w-3 rounded-full bg-lake-500' />
                  <p className='font-display text-lg font-bold text-plum-800'>{e.degree}</p>
                  {e.status && (
                    <p className='font-display text-xs font-bold uppercase tracking-[0.2em] text-sunset-600'>
                      {e.status}
                    </p>
                  )}
                  <p className='font-body text-sm font-semibold text-lake-700'>{e.place}</p>
                  <p className='font-body text-xs font-bold text-plum-700/50'>{e.years}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  )
}