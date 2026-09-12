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

const state = {
  hoveredId: null,
  quality: isLowEnd() ? 'low' : 'high',
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
  setHover(id) {
    if (state.hoveredId !== id) {
      state.hoveredId = id
      emit()
    }
  },
  subscribe(fn) {
    listeners.add(fn)
    fn(state)
    return () => listeners.delete(fn)
  },
}