import { makePoster, PALETTES } from './posters'
import dress from './images/dress.jpeg'
import dress1 from './images/dress1.jpeg'
import dress3 from './images/dress3.jpeg'
import dress4 from './images/dress4.jpeg'
import dress5 from './images/dress5.jpeg'
import dress6 from './images/dress6.jpeg'

/** Edit this file to add / reorder collections. */
export const COLLECTIONS = [
  {
    id: 'menswear',
    title: 'Menswear',
    subtitle: 'A Study of South Indian Traditional Wear',

    concept: [
      'This collection explores menswear through the traditional clothing and cultural aesthetics of South India. The inspiration came from the simplicity and elegance of traditional garments, particularly the kurta-pajama, and the way traditional styles can be interpreted through contemporary design.',
      "As part of learning menswear pattern making and garment construction, I developed a traditional look featuring a kurta-pajama, alongside a shirt to explore a different approach to men's clothing. The project helped me understand menswear silhouettes, garment structure, pattern development, and the importance of translating an inspiration into wearable designs.",
    ],
    garments: ['Traditional kurta-pajama', 'Shirt'],
    photos: [dress, dress4],
    colors: PALETTES.forest,
    images: [
      makePoster({ title: 'Menswear', kicker: 'LOOK 01', index: '1', year: '2023 – 2027', colors: PALETTES.forest, variant: 'coat', seed: 5 }),
      makePoster({ title: 'Menswear', kicker: 'LOOK 02', index: '2', year: '2023 – 2027', colors: PALETTES.cream, variant: 'blouse', seed: 6 }),
      makePoster({ title: 'Menswear', kicker: 'LOOK 03', index: '3', year: '2023 – 2027', colors: PALETTES.forest, variant: 'arch', seed: 7 }),
    ],
  },
  {
    id: 'midnight',
    title: 'Midnight',
    subtitle: 'Where Moonlight Meets Magic',

    concept: [
      'Midnight explores the contrast between the mystery of the night and the quiet magic hidden within it. The collection draws inspiration from a dreamlike night-time world, where darkness, moonlight, tiny glowing lights, and delicate flowers create an atmosphere of fantasy.',
      'The black gown, detailed with sequins, represents the depth and mystery of the night sky. The sequins add a subtle sense of sparkle, like distant stars appearing against the darkness.',
      'In contrast, the short white dress, decorated with floral details extending towards the hem, represents the softer side of the night. Inspired by fireflies, flowers, and an imaginary world of fairies, the design reflects a feeling of lightness, delicacy, and enchantment.',
      'Together, the two garments express different moods of the same imagined world: one dark and dramatic, the other light and whimsical.',
    ],
    garments: ['Black sequinned gown', 'Short white floral dress'],
    photos: [dress1, dress3],
    colors: PALETTES.plum,
    images: [
      makePoster({ title: 'Midnight', kicker: 'LOOK 01', index: '1', year: '2023 – 2027', colors: PALETTES.plum, variant: 'dress', seed: 9 }),
      makePoster({ title: 'Midnight', kicker: 'LOOK 02', index: '2', year: '2023 – 2027', colors: PALETTES.berry, variant: 'dress', seed: 10 }),
      makePoster({ title: 'Midnight', kicker: 'LOOK 03', index: '3', year: '2023 – 2027', colors: PALETTES.cream, variant: 'sun', seed: 11 }),
    ],
  },
  {
    id: 'sunhari-chave',
    title: 'Sunhari Chave',
    subtitle: 'The Golden Key',

    concept: [
      'Sunhari Chave is a warm, golden-toned collection that plays with light and shadow in evening wear. Add your concept & inspiration text here.',
    ],
    garments: ['Beautiful green gown', 'grenary of nature'],
    photos: [dress5, dress6],
    colors: PALETTES.sunset,
    images: [
      makePoster({ title: 'Sunhari Chave', kicker: 'LOOK 01', index: '1', year: '2023 – 2027', colors: PALETTES.sunset, variant: 'dress', seed: 31 }),
      makePoster({ title: 'Sunhari Chave', kicker: 'LOOK 02', index: '2', year: '2023 – 2027', colors: PALETTES.cream, variant: 'dress', seed: 32 }),
      makePoster({ title: 'Sunhari Chave', kicker: 'LOOK 03', index: '3', year: '2023 – 2027', colors: PALETTES.sunset, variant: 'arch', seed: 33 }),
    ],
  },
  
  
]