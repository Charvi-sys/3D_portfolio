import { useState } from 'react'
import { motion } from 'framer-motion'
import { PERSON, SOCIALS } from '../data/content'
import PageShell from '../components/PageShell'

function Icon({ name }) {
  const p = 'currentColor'
  switch (name) {
    case 'instagram':
      return (
        <svg viewBox='0 0 24 24' width='22' height='22' fill='none' stroke={p} strokeWidth='1.8' strokeLinecap='round'>
          <rect x='3' y='3' width='18' height='18' rx='5' />
          <circle cx='12' cy='12' r='4' />
          <circle cx='17.2' cy='6.8' r='1.2' fill={p} stroke='none' />
        </svg>
      )
    case 'linkedin':
      return (
        <svg viewBox='0 0 24 24' width='22' height='22' fill={p}>
          <path d='M4.98 3.5a2.5 2.5 0 1 1-.02 5 2.5 2.5 0 0 1 .02-5zM3 9h4v12H3zM9 9h4v1.8h.06c.56-1 1.9-2.05 3.94-2.05 4.2 0 4.97 2.76 4.97 6.35V21h-4v-5.3c0-1.26-.02-2.9-1.77-2.9-1.78 0-2.05 1.4-2.05 2.83V21H9z' />
        </svg>
      )
    case 'pin':
      return (
        <svg viewBox='0 0 24 24' width='22' height='22' fill='none' stroke={p} strokeWidth='1.8' strokeLinecap='round'>
          <path d='M12 21s-7-5.5-7-11a7 7 0 0 1 14 0c0 5.5-7 11-7 11z' />
          <circle cx='12' cy='10' r='2.5' />
        </svg>
      )
    default:
      return (
        <svg viewBox='0 0 24 24' width='22' height='22' fill='none' stroke={p} strokeWidth='1.8'>
          <rect x='2.5' y='5' width='19' height='14' rx='2' />
          <path d='m3.5 6.5 8.5 6 8.5-6' />
        </svg>
      )
  }
}

export default function Contact() {
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const submit = (e) => {
    e.preventDefault()
    setSent(true)
    setTimeout(() => setSent(false), 4000)
    setForm({ name: '', email: '', message: '' })
  }

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  return (
    <PageShell title='Contact' accent='#2fc2b8'>
      <section className='mx-auto max-w-6xl px-5 md:px-10'>
        <p className='eyebrow'>Communication station</p>
        <h1 className='huge mt-3 text-5xl md:text-8xl'>CONTACT</h1>
        <div className='mt-6 h-1 w-28 rounded-full bg-lake-500' />
        <p className='mt-8 max-w-2xl font-body text-lg font-semibold leading-relaxed text-plum-700/80'>
          Drop a letter in the mailbox — I read everything (slowly, like good mail).
        </p>
      </section>

      <section className='mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-10 px-5 md:grid-cols-2 md:px-10'>
        {/* socials */}
        <div className='space-y-4'>
          {SOCIALS.map((s, i) => (
            <motion.a
              key={s.label}
              href={s.href}
              target={s.href.startsWith('http') ? '_blank' : undefined}
              rel='noreferrer'
              data-cursor='OPEN'
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className='group flex items-center gap-5 rounded-2xl bg-white/70 p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-soft'
            >
              <span className='grid h-12 w-12 place-items-center rounded-xl text-cream' style={{ background: s.label === 'Email' ? '#f97316' : s.label === 'Instagram' ? '#df6bbd' : s.label === 'LinkedIn' ? '#1380b6' : '#2fc2b8' }}>
                <Icon name={s.icon} />
              </span>
              <span>
                <span className='block font-display text-xs font-bold uppercase tracking-widest text-plum-700/50'>
                  {s.label}
                </span>
                <span className='block font-display text-lg font-bold text-plum-800 group-hover:text-sunset-600'>
                  {s.value}
                </span>
              </span>
            </motion.a>
          ))}
        </div>

        {/* contact form */}
        <motion.form
          onSubmit={submit}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className='rounded-3xl bg-white/80 p-7 shadow-soft backdrop-blur md:p-9'
        >
          <p className='font-display text-xl font-bold text-plum-800'>Send a letter</p>
          <div className='mt-5 space-y-4'>
            <input
              value={form.name}
              onChange={set('name')}
              required
              placeholder='Your name'
              className='w-full rounded-xl border border-plum-800/15 bg-cream/60 px-4 py-3 font-body font-semibold text-plum-800 outline-none transition focus:border-sunset-500 focus:bg-white'
            />
            <input
              type='email'
              value={form.email}
              onChange={set('email')}
              required
              placeholder='Your email'
              className='w-full rounded-xl border border-plum-800/15 bg-cream/60 px-4 py-3 font-body font-semibold text-plum-800 outline-none transition focus:border-sunset-500 focus:bg-white'
            />
            <textarea
              value={form.message}
              onChange={set('message')}
              required
              rows={5}
              placeholder='Your message…'
              className='w-full resize-none rounded-xl border border-plum-800/15 bg-cream/60 px-4 py-3 font-body font-semibold text-plum-800 outline-none transition focus:border-sunset-500 focus:bg-white'
            />
            <button type='submit' className='btn-primary w-full justify-center' data-cursor='SEND'>
              {sent ? '✓ Letter posted!' : 'POST LETTER'}
            </button>
          </div>
        </motion.form>
      </section>
    </PageShell>
  )
}