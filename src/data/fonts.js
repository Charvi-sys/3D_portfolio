// Bundled font assets — everything works fully offline, no CDN dependencies.
import fredoka500Url from '@fontsource/fredoka/files/fredoka-latin-500-normal.woff2?url'
import fredoka600Url from '@fontsource/fredoka/files/fredoka-latin-600-normal.woff2?url'
import fredoka700Url from '@fontsource/fredoka/files/fredoka-latin-700-normal.woff2?url'

export const UI_FONT_URL = fredoka700Url
export const UI_FONT_REG = fredoka500Url
export const UI_FONT_MED = fredoka600Url

// Three.js TextGeometry typeface fonts (bundled locally).
// GitHub Pages serves the site under /3D_portfolio/, so public assets must be
// referenced with the base path prefix. Vite replaces import.meta.env.BASE_URL
// with the configured base at build time (stays in sync with vite.config.js).
const BASE = import.meta.env.BASE_URL.replace(/\/$/, '')

export const TYPEFACE_BOLD = `${BASE}/fonts/helvetiker_bold.typeface.json`
export const TYPEFACE_REG = `${BASE}/fonts/helvetiker_regular.typeface.json`