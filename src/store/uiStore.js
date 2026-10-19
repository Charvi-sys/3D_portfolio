/**
 * UI state shared between the 3D world and the DOM overlay:
 * - which 3D location is hovered (for the in-world tag + cursor label)
 * - graphics quality tier (for shadows / particles / DPR)
 */
export const isTouch = () =>
  typeof window !== 'undefined' &&
  (window.matchMedia('(max-width: 768px)').matches || 'ontouchstart' in window)

export const isLowEnd = () => {
  if (isTouch()) return true
  if (typeof navigator === 'undefined') return false
  const cores = navigator.hardwareConcurrency || 4
  return cores <= 4
}

/**
 * "Entered the world" flag — kept in sessionStorage so the loading veil shows
 * once per browser tab and is skipped every time the visitor returns to the 3D world.
 */
const ENTERED_KEY = 'charvi.enteredWorld'
const readEntered = () => {
  try {
    return typeof sessionStorage !== 'undefined' && sessionStorage.getItem(ENTERED_KEY) === '1'
  } catch {
    return false
  }
}

const state = {
  hoveredId: null,
  quality: isLowEnd() ? 'low' : 'high',
  enteredWorld: readEntered(),
}

const listeners = new Set()
function emit() {
  listeners.forEach((fn) => fn(state))
}

export const uiStore = {
  get hoveredId() {
    return state.hoveredId
  },
  get quality() {
    return state.quality
  },
  get enteredWorld() {
    return state.enteredWorld
  },
  setHover(id) {
    if (state.hoveredId !== id) {
      state.hoveredId = id
      emit()
    }
  },
  markEntered() {
    if (!state.enteredWorld) {
      state.enteredWorld = true
      try {
        sessionStorage.setItem(ENTERED_KEY, '1')
      } catch {
        /* ignore storage errors */
      }
      emit()
    }
  },
  subscribe(fn) {
    listeners.add(fn)
    fn(state)
    return () => listeners.delete(fn)
  },
}