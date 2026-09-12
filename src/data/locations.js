/**
 * The map of the world.
 * `pos`  = where the site sits on the island (x, 0, z)
 * `sign` = where its giant 3D text stands (x, 0, z)
 * `cam`  = where the cinematic camera ends up after the flight
 * `accent` = theme colour used for the site
 */
export const DEFAULT_CAM = {
  pos: [14.5, 10, 21.5],
  look: [0, 0.9, 2],
}

export const LOCATIONS = [
  {
    id: 'about',
    short: 'ABOUT',
    label: 'ABOUT ME',
    sub: 'Discover my story',
    path: '/about',
    pos: [-12.5, -10.5],
    sign: [-8.9, -13.6],
    cam: { pos: [-21.5, 6.6, -15.5], look: [-12.3, -0.4, -11.3] },
    accent: '#f97316',
    fill: '#fb923c',
  },
  {
    id: 'projects',
    short: 'PROJECTS',
    label: 'PROJECTS',
    sub: 'View creative work',
    path: '/projects',
    pos: [13.5, -10],
    sign: [8.8, -13.2],
    cam: { pos: [22.5, 6.6, -15], look: [13.2, -0.4, -11] },
    accent: '#6d227f',
    fill: '#8b3aa0',
  },
  {
    id: 'certs',
    short: 'CERTIFICATES',
    label: 'CERTIFICATES',
    sub: 'Gallery of milestones',
    path: '/certifications',
    pos: [-14.5, 1.5],
    sign: [-10.4, -2.4],
    cam: { pos: [-22.5, 6.6, -0.5], look: [-14.2, -0.4, 1.2] },
    accent: '#1fa39a',
    fill: '#2fc2b8',
  },
  {
    id: 'resume',
    short: 'RESUME',
    label: 'RESUME',
    sub: 'Experience & skills',
    path: '/resume',
    pos: [7.6, 3.4],
    sign: [3.8, 4.9],
    cam: { pos: [14.5, 5.6, 9.5], look: [7.4, 0.2, 3.6] },
    accent: '#58a12f',
    fill: '#8fd14f',
  },
  {
    id: 'collections',
    short: 'COLLECTIONS',
    label: 'COLLECTIONS',
    sub: 'Fashion stories',
    path: '/collections',
    pos: [12.5, 11.5],
    sign: [7.6, 14.2],
    cam: { pos: [20.5, 6.6, 18.5], look: [12.4, -0.2, 12.6] },
    accent: '#9340a8',
    fill: '#a955bd',
  },
  {
    id: 'contact',
    short: 'CONTACT',
    label: 'CONTACT',
    sub: "Let's talk",
    path: '/contact',
    pos: [-11.5, 12],
    sign: [-6.6, 13.6],
    cam: { pos: [-19.5, 6.6, 18.5], look: [-11.6, -0.4, 13.4] },
    accent: '#2fc2b8',
    fill: '#4fd3c8',
  },
]

export const CENTER = [0, 0, 3] // the plaza / character home
export const getLocation = (id) => LOCATIONS.find((l) => l.id === id)