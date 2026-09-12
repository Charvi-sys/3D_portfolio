import { motion } from 'framer-motion'
import { PERSON } from '../data/content'
import { SKILLS, TOOLCHIP } from '../data/skills'
import { makeAvatar } from '../data/posters'
import PageShell from '../components/PageShell'

const AVATAR = makeAvatar(7)

export default function About() {
  return (
    <PageShell title='About' accent='#f97316'>
      <section className='mx-auto max-w-6xl px-5 md:px-10'>
        <p className='eyebrow'>About me</p>
        <h1 className='huge mt-3 text-4xl md:text-8xl'>ABOUT ME</h1>
        <div className='mt-6 h-1 w-28 rounded-full bg-sunset-500' />

        {/* intro block */}
        <div className='mt-14 grid grid-cols-1 items-start gap-12 md:grid-cols-12'>
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className='md:col-span-5'
          >
            <div className='overflow-hidden rounded-3xl shadow-soft'>
              <img src={AVATAR} alt='Portrait of Charvi' className='w-full' />
            </div>
          </motion.div>
          <div className='md:col-span-7'>
            <p className='font-body text-xl font-bold leading-relaxed text-plum-800 md:text-2xl'>
              {PERSON.tagline}
            </p>
            <div className='mt-6 space-y-5 font-body text-lg font-semibold leading-relaxed text-plum-700/85'>
              {PERSON.bio.map((para, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.12 }}
                >
                  {para}
                </motion.p>
              ))}
            </div>
            <blockquote className='mt-8 rounded-2xl border-l-4 border-sunset-500 bg-white/70 p-6 font-display text-xl font-semibold leading-snug text-plum-800 md:text-2xl'>
              “{PERSON.philosophy}”
            </blockquote>
          </div>
        </div>
      </section>

      {/* education + experience */}
      <section className='mx-auto mt-24 grid max-w-6xl grid-cols-1 gap-14 px-5 md:grid-cols-2 md:px-10'>
        <div>
          <h2 className='font-display text-3xl font-bold text-plum-800'>EDUCATION</h2>
          <div className='mt-6 space-y-6'>
            {PERSON.education.map((e, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className='rounded-2xl bg-white/70 p-5'
              >
                <p className='font-display text-lg font-bold text-plum-800'>{e.degree}</p>
                <p className='font-body text-sm font-semibold text-sunset-600'>{e.place}</p>
                <p className='font-body text-xs font-bold text-plum-700/50'>{e.years}</p>
              </motion.div>
            ))}
          </div>
          <h2 className='mt-12 font-display text-3xl font-bold text-plum-800'>EXPERIENCE</h2>
          <div className='mt-6 space-y-6'>
            {PERSON.experience.map((e, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className='rounded-2xl bg-white/70 p-5'
              >
                <p className='font-display text-lg font-bold text-plum-800'>{e.role}</p>
                <p className='font-body text-sm font-semibold text-sunset-600'>{e.place}</p>
                <p className='font-body text-xs font-bold text-plum-700/50'>{e.years}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* skills */}
        <div>
          <h2 className='font-display text-3xl font-bold text-plum-800'>SKILLS</h2>
          <div className='mt-6 space-y-8'>
            {SKILLS.map((group, gi) => (
              <div key={group.group}>
                <p className='mb-3 font-display text-sm font-bold uppercase tracking-[0.25em] text-plum-700/60'>
                  {group.group}
                </p>
                <div className='space-y-3'>
                  {group.items.map((sk) => (
                    <div key={sk.name}>
                      <div className='flex justify-between font-body text-sm font-bold text-plum-800'>
                        <span>{sk.name}</span>
                        <span className='text-sunset-600'>{sk.level}%</span>
                      </div>
                      <div className='mt-1 h-2.5 overflow-hidden rounded-full bg-plum-800/10'>
                        <motion.div
                          className='h-full rounded-full'
                          style={{ background: `linear-gradient(90deg,#f97316,#2fc2b8)` }}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${sk.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: gi * 0.15 }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className='mt-10 flex flex-wrap gap-2'>
            {TOOLCHIP.map((t) => (
              <span key={t} className='chip'>
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  )
}