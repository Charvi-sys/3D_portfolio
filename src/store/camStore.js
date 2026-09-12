/**
 * Tiny pub/sub store that carries "fly the camera here" requests
 * from the DOM world (clicks on signs / menu) into the WebGL canvas.
 * GSAP runs the animation inside the Canvas; the UI only issues requests.
 */
let fly = null
const listeners = new Set()

function emit() {
  listeners.forEach((fn) => fn(fly))
}

export const camStore = {
  get current() {
    return fly
  },
  init() {
    fly = null
    emit()
  },
  requestFly({ to, look, duration = 1.6, ease = 'power3.inOut', onComplete }) {
    fly = { to, look, duration, ease, onComplete }
    emit()
  },
  cancelFly() {
    fly = null
    emit()
  },
  subscribe(fn) {
    listeners.add(fn)
    return () => listeners.delete(fn)
  },
}