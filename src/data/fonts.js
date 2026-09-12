// Bundled font assets — everything works fully offline, no CDN dependencies.
import fredoka500Url from '@fontsource/fredoka/files/fredoka-latin-500-normal.woff2?url'
import fredoka600Url from '@fontsource/fredoka/files/fredoka-latin-600-normal.woff2?url'
import fredoka700Url from '@fontsource/fredoka/files/fredoka-latin-700-normal.woff2?url'

export const UI_FONT_URL = fredoka700Url
export const UI_FONT_REG = fredoka500Url
export const UI_FONT_MED = fredoka600Url

// Three.js TextGeometry typeface fonts (bundled locally)
export const TYPEFACE_BOLD = '/fonts/helvetiker_bold.typeface.json'
export const TYPEFACE_REG = '/fonts/helvetiker_regular.typeface.json'