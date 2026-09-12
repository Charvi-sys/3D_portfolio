import { makePoster, PALETTES } from './posters'

/** Edit this file to add / reorder collections. */
export const COLLECTIONS = [
  {
    id: 'golden-hour',
    title: 'Golden Hour',
    year: '2026',
    concept:
      'A warm capsule inspired by the light that hits the courtyard at 5 p.m. Everything in the collection moves the way that light does — slow, orange and a little drowsy.',
    inspiration: 'Sundown over the studio roof; the shadows of a drying line; itch-free cotton in the heat.',
    colors: PALETTES.sunset,
    materials: ['Organic Cotton', 'Chanderi Silk', 'Handblock Dye'],
    images: [
      makePoster({ title: 'Golden Hour', kicker: 'LOOK 01', index: '1', year: '2026', colors: PALETTES.sunset, variant: 'dress', seed: 5 }),
      makePoster({ title: 'Golden Hour', kicker: 'LOOK 02', index: '2', year: '2026', colors: PALETTES.cream, variant: 'blouse', seed: 6 }),
      makePoster({ title: 'Golden Hour', kicker: 'LOOK 03', index: '3', year: '2026', colors: PALETTES.sunset, variant: 'sun', seed: 7 }),
    ],
  },
  {
    id: 'river-teal',
    title: 'River Teal',
    year: '2025',
    concept:
      'An evening-wear study in turquoise water tones — silk that falls like the river after rain, with pleats that catch light like currents.',
    inspiration: 'The monsoon river at dusk; glassy ripples; the sound of water over reeds.',
    colors: PALETTES.ocean,
    materials: ['Silk Georgette', 'Organza', 'Pearl Beads'],
    images: [
      makePoster({ title: 'River Teal', kicker: 'LOOK 01', index: '1', year: '2025', colors: PALETTES.ocean, variant: 'dress', seed: 9 }),
      makePoster({ title: 'River Teal', kicker: 'LOOK 02', index: '2', year: '2025', colors: PALETTES.cream, variant: 'coat', seed: 10 }),
      makePoster({ title: 'River Teal', kicker: 'LOOK 03', index: '3', year: '2025', colors: PALETTES.ocean, variant: 'arch', seed: 11 }),
    ],
  },
  {
    id: 'forest-walk',
    title: 'Forest Walk',
    year: '2025',
    concept:
      'Daywear in mineral greens and undyed creams — relaxed tailoring with an earthy, walk-around-all-day attitude.',
    inspiration: 'Morning walks past hibiscus hedges; rotting mango leaves; the weight of a cotton tote.',
    colors: PALETTES.forest,
    materials: ['Recycled Denim', 'Linen', 'Hibiscus Dye'],
    images: [
      makePoster({ title: 'Forest Walk', kicker: 'LOOK 01', index: '1', year: '2025', colors: PALETTES.forest, variant: 'blouse', seed: 14 }),
      makePoster({ title: 'Forest Walk', kicker: 'LOOK 02', index: '2', year: '2025', colors: PALETTES.cream, variant: 'dress', seed: 15 }),
      makePoster({ title: 'Forest Walk', kicker: 'LOOK 03', index: '3', year: '2025', colors: PALETTES.forest, variant: 'sun', seed: 16 }),
    ],
  },
  {
    id: 'midnight-plum',
    title: 'Midnight Plum',
    year: '2024',
    concept:
      'A small black-tie capsule in plum, aubergine and violet — the collection that started it all, full of drama and spare silhouettes.',
    inspiration: 'Late-night design sketches, jazz records, the purple of a bruised evening sky.',
    colors: PALETTES.plum,
    materials: ['Velvet', 'Crepe', 'Brass Hardware'],
    images: [
      makePoster({ title: 'Midnight Plum', kicker: 'LOOK 01', index: '1', year: '2024', colors: PALETTES.plum, variant: 'coat', seed: 19 }),
      makePoster({ title: 'Midnight Plum', kicker: 'LOOK 02', index: '2', year: '2024', colors: PALETTES.berry, variant: 'dress', seed: 20 }),
      makePoster({ title: 'Midnight Plum', kicker: 'LOOK 03', index: '3', year: '2024', colors: PALETTES.plum, variant: 'arch', seed: 21 }),
    ],
  },
]