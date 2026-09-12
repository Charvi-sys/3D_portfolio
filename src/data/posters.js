/**
 * Self-contained SVG poster generator. All portfolio imagery is created here
 * procedurally so the project ships with zero external image assets.
 */

const W = 900
const H = 1200

const esc = (s) =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')

const rng = (seed) => {
  let s = Math.abs(seed || 1) % 9999 || 1
  return () => {
    s = (s * 9301 + 49297) % 233280
    return s / 233280
  }
}

const toUri = (svg) => 'data:image/svg+xml;utf8,' + encodeURIComponent(svg)

export const PALETTES = {
  sunset: ['#f97316', '#fb923c', '#fbf3e4', '#3d1146'],
  ocean: ['#2fc2b8', '#11615d', '#e0fbf7', '#3d1146'],
  forest: ['#8fd14f', '#58a12f', '#fbf3e4', '#3d1146'],
  plum: ['#6d227f', '#9340a8', '#f0a0c8', '#250a2b'],
  cream: ['#fbf3e4', '#f0e2c8', '#f97316', '#3d1146'],
  berry: ['#e2574c', '#f97316', '#fbf3e4', '#3d1146'],
}

const wrap = (title, max = 12) => {
  const words = title.toUpperCase().split(' ')
  const lines = []
  let cur = ''
  for (const wd of words) {
    if ((cur + ' ' + wd).trim().length > max && cur) {
      lines.push(cur.trim())
      cur = wd
    } else cur = (cur + ' ' + wd).trim()
  }
  if (cur) lines.push(cur.trim())
  return lines.slice(0, 3)
}

/** Line-art garment silhouettes */
const garments = {
  dress: (cx, cy, s, ink) => `
    <g stroke="${ink}" stroke-width="${6 * s}" stroke-linecap="round" fill="none">
      <circle cx="${cx}" cy="${cy - 64 * s}" r="${12 * s}"/>
      <path d="M${cx - 3 * s} ${cy - 52 * s} C${cx - 8 * s} ${cy - 30 * s} ${cx - 26 * s} ${cy - 12 * s} ${cx - 30 * s} ${cy + 8 * s}"/>
      <path d="M${cx + 3 * s} ${cy - 52 * s} C${cx + 8 * s} ${cy - 30 * s} ${cx + 26 * s} ${cy - 12 * s} ${cx + 30 * s} ${cy + 8 * s}"/>
      <path d="M${cx} ${cy - 50 * s} q ${16 * s} ${34 * s} 0 ${66 * s} q ${-16 * s} ${-26 * s} 0 ${-66 * s}"/>
      <path d="M${cx} ${cy - 12 * s} h ${44 * s} v ${3 * s} h ${-44 * s}Z" fill="${ink}"/>
    </g>`,
  blouse: (cx, cy, s, ink) => `
    <g stroke="${ink}" stroke-width="${6 * s}" stroke-linecap="round" fill="none">
      <circle cx="${cx}" cy="${cy - 56 * s}" r="${11 * s}"/>
      <path d="M${cx - 3 * s} ${cy - 45 * s} C${cx - 8 * s} ${cy - 30 * s} ${cx - 4 * s} ${cy - 18 * s} ${cx - 6 * s} ${cy + 2 * s}"/>
      <path d="M${cx + 3 * s} ${cy - 45 * s} C${cx + 8 * s} ${cy - 30 * s} ${cx + 4 * s} ${cy - 18 * s} ${cx + 6 * s} ${cy + 2 * s}"/>
      <path d="M${cx - 6 * s} ${cy + 2 * s} q ${6 * s} ${4 * s} ${12 * s} 0 q ${6 * s} ${4 * s} ${12 * s} 0"/>
    </g>`,
  coat: (cx, cy, s, ink) => `
    <g stroke="${ink}" stroke-width="${6 * s}" stroke-linecap="round" fill="none">
      <circle cx="${cx}" cy="${cy - 60 * s}" r="${12 * s}"/>
      <path d="M${cx - 4 * s} ${cy - 48 * s} C${cx - 14 * s} ${cy - 30 * s} ${cx - 14 * s} ${cy + 10 * s} ${cx - 16 * s} ${cy + 34 * s}"/>
      <path d="M${cx + 4 * s} ${cy - 48 * s} C${cx + 14 * s} ${cy - 30 * s} ${cx + 14 * s} ${cy + 10 * s} ${cx + 16 * s} ${cy + 34 * s}"/>
      <path d="M${cx} ${cy - 46 * s} l ${0} ${-6 * s} m ${0} ${10 * s} v ${22 * s}"/>
    </g>`,
  arch: (cx, cy, s, ink) => `
    <g stroke="${ink}" stroke-width="${6 * s}" fill="none" stroke-linecap="round">
      <path d="M${cx - 22 * s} ${cy + 30 * s} v ${-56 * s} a ${22 * s} ${30 * s} 0 0 1 ${44 * s} 0 v ${56 * s}"/>
      <path d="M${cx - 14 * s} ${cy + 30 * s} v ${-32 * s} a ${14 * s} ${20 * s} 0 0 1 ${28 * s} 0 v ${32 * s}"/>
    </g>`,
  sun: (cx, cy, s, ink) => `
    <g stroke="${ink}" stroke-width="${6 * s}" fill="none" stroke-linecap="round">
      <circle cx="${cx}" cy="${cy}" r="${22 * s}"/>
      <path d="M${cx} ${cy - 30 * s} v ${-10 * s} M${cx} ${cy + 30 * s} v ${10 * s} M${cx - 30 * s} ${cy} h ${-10 * s} M${cx + 30 * s} ${cy} h ${10 * s} M${cx - 21 * s} ${cy - 21 * s} l ${-7 * s} ${-7 * s} M${cx + 21 * s} ${cy - 21 * s} l ${7 * s} ${-7 * s} M${cx - 21 * s} ${cy + 21 * s} l ${-7 * s} ${7 * s} M${cx + 21 * s} ${cy + 21 * s} l ${7 * s} ${7 * s}"/>
    </g>`,
}

const GRAIN = `<filter id="grain"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="2" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/></filter>`

/**
 * @param {object} opts
 *   title, kicker, index, year, colors[4], variant (dress|blouse|coat|arch|sun), seed
 */
export function makePoster(opts = {}) {
  const {
    title = 'UNTITLED',
    kicker = 'STUDY',
    index = '01',
    year = '2026',
    colors = PALETTES.sunset,
    variant = 'dress',
    seed = 0,
  } = opts
  const [c1, c2, c3, ink] = colors
  const r = rng(seed)
  const lines = wrap(title)
  const cx = 450
  const garY = 640
  const silhouette = (garments[variant] || garments.dress)(cx, garY, 1.7, ink)
  const dots = Array.from({ length: 24 }, () => {
    const x = Math.round(60 + r() * (W - 120))
    const y = Math.round(80 + r() * (H - 180))
    const rad = Math.round(6 + r() * 16)
    const op = (0.12 + r() * 0.3).toFixed(2)
    return `<circle cx="${x}" cy="${y}" r="${rad}" fill="${c3}" opacity="${op}"/>`
  }).join('\n')
  const landY = 880
  const arcline = r() * 60 - 30
  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${c1}"/>
      <stop offset="1" stop-color="${c2}"/>
    </linearGradient>
    <radialGradient id="sun" cx="0.5" cy="0.5" r="0.5">
      <stop offset="0" stop-color="#ffffff" stop-opacity="0.55"/>
      <stop offset="1" stop-color="#ffffff" stop-opacity="0"/>
    </radialGradient>
    ${GRAIN}
  </defs>
  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <circle cx="${450 + r() * 160 - 80}" cy="${170 + r() * 220}" r="${170 + r() * 110}" fill="url(#sun)"/>
  <g opacity="0.5">${dots}</g>
  <path d="M0 ${landY} Q 220 ${landY + arcline} 450 ${landY + 6} T 900 ${landY - 14} L900 ${H} L0 ${H} Z" fill="${c3}" opacity="0.92"/>
  <path d="M0 ${landY + 40} Q 300 ${landY + 30} 620 ${landY + 58} T 900 ${landY + 34} L900 ${H} L0 ${H} Z" fill="rgba(61,17,70,0.22)"/>
  ${silhouette}
  <g stroke="${c3}" stroke-width="2.5" fill="none" opacity="0.7">
    <path d="M36 128 q 20 22 0 44 q -20 -22 0 -44 Z M864 128 q 20 22 0 44 q -20 -22 0 -44 Z"/>
  </g>
  <text x="450" y="120" text-anchor="middle" font-family="Fredoka, system-ui, sans-serif" font-size="34" font-weight="600" letter-spacing="14" fill="${c3}">${esc(kicker)}</text>
  <text x="450" y="1130" text-anchor="middle" font-family="Fredoka, system-ui, sans-serif" font-size="${index.length > 2 ? 90 : 150}" font-weight="700" fill="${c3}" opacity="0.95">${esc(index)}</text>
  ${lines
    .map(
      (ln, i) =>
        `<text x="450" y="${1040 + i * 92}" text-anchor="middle" font-family="Fredoka, system-ui, sans-serif" font-size="82" font-weight="700" letter-spacing="2" fill="${ink}">${esc(ln)}</text>`,
    )
    .join('\n')}
  <text x="450" y="${1040 + Math.max(lines.length, 1) * 92 + 30}" text-anchor="middle" font-family="Nunito, system-ui, sans-serif" font-size="30" font-weight="700" letter-spacing="10" fill="${ink}" opacity="0.85">${esc(year)}</text>
  <rect x="30" y="30" width="${W - 60}" height="${H - 60}" fill="none" stroke="${ink}" stroke-width="3" opacity="0.4"/>
  <rect x="44" y="44" width="${W - 88}" height="${H - 88}" fill="none" stroke="${ink}" stroke-width="1.5" opacity="0.25"/>
  <rect width="${W}" height="${H}" filter="url(#grain)" opacity="0.09"/>
</svg>`
  return toUri(svg)
}

/** Stylised portrait avatar for the About page (abstract, original artwork). */
export function makeAvatar(seed = 7) {
  const r = rng(seed)
  const blossoms = Array.from({ length: 9 }, (_, i) => {
    const a = (i / 9) * Math.PI * 2
    const rad = 250 + r() * 40
    const x = Math.round(400 + Math.cos(a) * rad)
    const y = Math.round(360 + Math.sin(a) * rad * 0.82)
    const scl = 0.6 + r() * 0.7
    const bl = r() > 0.5 ? '#f97316' : '#fbf3e4'
    return `<g transform="translate(${x} ${y}) scale(${scl.toFixed(2)})" opacity="0.9">
      <circle r="26" fill="${bl}"/>
      <circle r="20" fill="${r() > 0.5 ? '#e2574c' : '#2fc2b8'}"/>
      <circle r="9" fill="${bl}"/>
    </g>`
  }).join('\n')
  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="800" height="800" viewBox="0 0 800 800">
  <defs>
    <linearGradient id="pg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#6d227f"/><stop offset="1" stop-color="#3d1146"/>
    </linearGradient>
    <radialGradient id="halo" cx="0.5" cy="0.35" r="0.6">
      <stop offset="0" stop-color="#fb923c" stop-opacity="0.5"/><stop offset="1" stop-color="#fb923c" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="800" height="800" rx="60" fill="url(#pg)"/>
  <circle cx="400" cy="400" r="260" fill="url(#halo)"/>
  ${blossoms}
  <circle cx="400" cy="330" r="122" fill="#fbf3e4"/>
  <circle cx="400" cy="330" r="122" fill="none" stroke="#f97316" stroke-width="6" stroke-dasharray="14 12"/>
  <g fill="#fbf3e4">
    <path d="M340 352 q 18 -14 30 -2 q 20 -14 40 0 q 12 -8 22 -2 q -4 16 -22 12 q -10 6 -26 -2 q -14 8 -28 0 q -18 6 -24 -4 Z" opacity="0.94"/>
    <path d="M190 700 q 0 -190 210 -190 q 210 0 210 190 Z"/>
  </g>
  <path d="M286 566 q 114 -52 228 0 l -12 90 q -102 -40 -204 0 Z" fill="#f97316"/>
  <path d="M258 700 q -14 -196 142 -196 q 142 0 142 196 Z" fill="none" stroke="#fb923c" stroke-width="10" stroke-dasharray="26 22" opacity="0.8"/>
  <circle cx="356" cy="368" r="26" fill="#3d1146"/>
  <path d="M356 396 q 30 22 58 0" stroke="#3d1146" stroke-width="8" fill="none" stroke-linecap="round"/>
  <text x="400" y="768" text-anchor="middle" font-family="Fredoka, system-ui, sans-serif" font-size="30" font-weight="600" letter-spacing="8" fill="#fbf3e4">CHARVI SHARMA</text>
</svg>`
  return toUri(svg)
}