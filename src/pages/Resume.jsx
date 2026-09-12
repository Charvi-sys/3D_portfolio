import { useState } from 'react'
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib'
import { motion } from 'framer-motion'
import { PERSON } from '../data/content'
import { SKILLS } from '../data/skills'
import PageShell from '../components/PageShell'

async function downloadResume() {
  try {
    const pdfDoc = await PDFDocument.create()
    const page = pdfDoc.addPage([595, 842]) // A4
    const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold)
    const fontBody = await pdfDoc.embedFont(StandardFonts.Helvetica)
    const plum = rgb(61 / 255, 17 / 255, 70 / 255)
    const orange = rgb(249 / 255, 115 / 255, 22 / 255)

    page.drawText(PERSON.fullName.toUpperCase(), { x: 60, y: 770, size: 26, font, color: plum })
    page.drawText(PERSON.role.toUpperCase(), { x: 60, y: 745, size: 13, font: fontBody, color: orange })
    page.drawLine({ start: { x: 60, y: 730 }, end: { x: 535, y: 730 }, thickness: 2, color: orange })

    let y = 700
    page.drawText('PROFILE', { x: 60, y, size: 14, font, color: plum })
    y -= 22
    page.drawText(PERSON.shortBio, { x: 60, y, size: 10.5, font: fontBody, color: plum, maxWidth: 475 })
    y -= Math.max(80, PERSON.shortBio.length * 1.8)

    page.drawText('EXPERIENCE', { x: 60, y, size: 14, font, color: plum })
    y -= 22
    for (const e of PERSON.experience) {
      page.drawText(`${e.role}  —  ${e.place}`, { x: 60, y, size: 11, font, color: plum })
      y -= 16
      page.drawText(e.years, { x: 60, y, size: 10, font: fontBody, color: orange })
      y -= 24
    }

    page.drawText('EDUCATION', { x: 60, y, size: 14, font, color: plum })
    y -= 22
    for (const e of PERSON.education) {
      page.drawText(`${e.degree}  —  ${e.place}`, { x: 60, y, size: 11, font, color: plum })
      y -= 16
      page.drawText(e.years, { x: 60, y, size: 10, font: fontBody, color: orange })
      y -= 24
    }

    page.drawText('SKILLS', { x: 60, y, size: 14, font, color: plum })
    y -= 22
    for (const g of SKILLS) {
      page.drawText(`${g.group}: ${g.items.map((i) => i.name).join(', ')}`, {
        x: 60,
        y,
        size: 10,
        font: fontBody,
        color: plum,
        maxWidth: 475,
      })
      y -= 20
    }

    page.drawText(`CONTACT: ${PERSON.email}  ·  ${PERSON.location}`, {
      x: 60,
      y: 36,
      size: 9.5,
      font: fontBody,
      color: plum,
    })

    const bytes = await pdfDoc.save()
    const blob = new Blob([bytes], { type: 'application/pdf' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${PERSON.fullName.replace(/\s+/g, '_')}_Resume.pdf`
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
  } catch (err) {
    console.error('Resume PDF generation failed:', err)
    alert('Something went wrong generating the PDF. Please try again.')
  }
}
export default function Resume() {
  const [loading, setLoading] = useState(false)
  const go = async () => {
    setLoading(true)
    await downloadResume()
    setLoading(false)
  }
  return (
    <PageShell title='Resume' accent='#58a12f'>
      <section className='mx-auto max-w-6xl px-5 md:px-10'>
        <p className='eyebrow'>Experience &amp; skills</p>
        <h1 className='huge mt-3 text-5xl md:text-8xl'>RESUME</h1>
        <div className='mt-6 h-1 w-28 rounded-full bg-leaf-500' />
        <p className='mt-8 max-w-2xl font-body text-lg font-semibold leading-relaxed text-plum-700/80'>
          The short version of a long story — download it, or wander back into the world.
        </p>
        <button onClick={go} disabled={loading} className='btn-primary mt-10' data-cursor='DOWNLOAD'>
          {loading ? 'Brewing PDF…' : 'DOWNLOAD RESUME ↓'}
        </button>
      </section>

      <section className='mx-auto mt-20 max-w-6xl px-5 md:px-10'>
        <div className='grid grid-cols-1 gap-10 md:grid-cols-2'>
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