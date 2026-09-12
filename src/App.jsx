import { Suspense, lazy, useRef, useEffect } from 'react'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import gsap from 'gsap'
import { navStore } from './store/navStore'
import CustomCursor from './components/CustomCursor'
import Home from './pages/Home'

const About = lazy(() => import('./pages/About'))
const Projects = lazy(() => import('./pages/Projects'))
const Certifications = lazy(() => import('./pages/Certifications'))
const Collections = lazy(() => import('./pages/Collections'))
const Resume = lazy(() => import('./pages/Resume'))
const Contact = lazy(() => import('./pages/Contact'))
const NotFound = lazy(() => import('./pages/NotFound'))

/** cinematic curtain that runs between the world and every page */
function TransitionVeil() {
  const veil = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    navStore.register(navigate)
    const unsub = navStore.subscribe(({ type, path }) => {
      if (type !== 'go') return
      const el = veil.current
      if (!el) {
        navigate(path)
        return
      }
      const tl = gsap.timeline()
      // cabin shake-off, then the orange/cream curtain sweeps up from below
      tl.set(el, { scaleY: 0, transformOrigin: '50% 100%' }, 0)
      tl.to(el, {
        scaleY: 1,
        duration: 0.5,
        ease: 'power2.in',
        onStart: () => {
          el.style.pointerEvents = 'auto'
        },
      }, 0)
      tl.add(() => {
        navigate(path)
      }, '+=0.12')
      tl.to(el, {
        scaleY: 0,
        duration: 0.7,
        ease: 'power3.inOut',
        onComplete: () => {
          el.style.pointerEvents = 'none'
        },
      }, '+=0.08')
    })
    return unsub
  }, [navigate])

  return (
    <div
      ref={veil}
      className='pointer-events-none fixed inset-0 z-[75]'
      style={{
        background:
          'radial-gradient(120% 120% at 50% 100%, #f97316 0%, #ffb085 45%, #fbf3e4 100%)',
        transform: 'scaleY(0)',
        transformOrigin: '50% 100%',
      }}
    />
  )
}

function AppRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode='wait' initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path='/' element={<Home />} />
        <Route
          path='/about'
          element={
            <Suspense fallback={null}>
              <About />
            </Suspense>
          }
        />
        <Route
          path='/projects'
          element={
            <Suspense fallback={null}>
              <Projects />
            </Suspense>
          }
        />
        <Route
          path='/certifications'
          element={
            <Suspense fallback={null}>
              <Certifications />
            </Suspense>
          }
        />
        <Route
          path='/collections'
          element={
            <Suspense fallback={null}>
              <Collections />
            </Suspense>
          }
        />
        <Route
          path='/resume'
          element={
            <Suspense fallback={null}>
              <Resume />
            </Suspense>
          }
        />
        <Route
          path='/contact'
          element={
            <Suspense fallback={null}>
              <Contact />
            </Suspense>
          }
        />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <>
      <AppRoutes />
      <TransitionVeil />
      <CustomCursor />
    </>
  )
}