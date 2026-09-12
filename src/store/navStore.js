/**
 * Navigation bridge between the WebGL world and React Router.
 * WorldText / menu / page buttons call navStore.go(); the TransitionVeil
 * (mounted once in App) plays the cinematic cover and calls router.navigate().
 */
let navigateFn = null
const listeners = new Set()

export const navStore = {
  register(fn) {
    navigateFn = fn
  },
  get navigate() {
    return navigateFn
  },
  go(path, accent = '#f97316') {
    listeners.forEach((fn) => fn({ type: 'go', path, accent }))
  },
  subscribe(fn) {
    listeners.add(fn)
    return () => listeners.delete(fn)
  },
  // convenience for programmatic nav without the veil (e.g. after veil done)
  navigate(path) {
    if (navigateFn) navigateFn(path)
  },
}