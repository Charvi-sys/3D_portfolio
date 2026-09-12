import { useRef, useEffect, useState } from 'react'
import { uiStore, isTouch } from '../store/uiStore'

export default function CustomCursor() {
  const dot = useRef(null)
  const ring = useRef(null)
  const [label, setLabel] = useState('EXPLORE')
  const [hovering, setHovering] = useState(false)
  const hoveringRef = useRef(false)
  const [enabled] = useState(!isTouch())

  useEffect(() => {
    if (!enabled) return
    document.body.classList.add('custom-cursor-active')

    let mx = window.innerWidth / 2
    let my = window.innerHeight / 2
    const dotX = dot.current
    const ringX = ring.current
    let raf = 0

    const move = (e) => {
      mx = e.clientX
      my = e.clientY
    }

    const loop = () => {
      if (!dotX || !ringX) return
      const ringScale = hoveringRef.current ? 4.2 : 1
      dotX.style.transform = `translate(${mx - 5}px, ${my - 5}px)`
      ringX.style.transform = `translate(${mx - 25}px, ${my - 25}px) scale(${ringScale})`
      raf = requestAnimationFrame(loop)
    }

    const setVisual = (h, lab) => {
      hoveringRef.current = h
      setLabel(lab)
      setHovering(h)
    }

    const onOver = (e) => {
      const t = e.target.closest('[data-hover]')
      if (t) setVisual(true, t.dataset.cursor || 'EXPLORE')
    }
    const onOut = (e) => {
      if (e.target.closest('[data-hover]')) setVisual(false, 'EXPLORE')
    }

    window.addEventListener('mousemove', move)
    document.addEventListener('mouseover', onOver)
    document.addEventListener('mouseout', onOut)
    raf = requestAnimationFrame(loop)

    const unsub = uiStore.subscribe((st) => {
      if (st.hoveredId) setVisual(true, 'EXPLORE')
      else setVisual(false, 'EXPLORE')
    })

    return () => {
      window.removeEventListener('mousemove', move)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseout', onOut)
      cancelAnimationFrame(raf)
      document.body.classList.remove('custom-cursor-active')
      unsub()
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <>
      <div
        ref={dot}
        className='pointer-events-none fixed left-0 top-0 z-[90] h-2.5 w-2.5 rounded-full bg-sunset-500'
        style={{ boxShadow: '0 0 0 0 rgba(249,115,22,0.4)' }}
      />
      <div
        ref={ring}
        className='pointer-events-none fixed left-0 top-0 z-[90] flex h-[50px] w-[50px] items-center justify-center rounded-full border border-plum-800/60 bg-cream/40 backdrop-blur-[2px]'
      >
        <span className='font-display text-[8px] font-bold tracking-wider text-plum-800'>
          {label}
        </span>
      </div>
    </>
  )
}