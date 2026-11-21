import { makePoster, PALETTES } from './posters'
import sutramCertificate from './images/cetrificate.jpeg'

/**
 * Edit this file to add / reorder certifications.
 *
 * featured: true   -> shown large at the top of the page (use for one certificate)
 * landscape: true  -> the image is wider than tall (a scan or photo of a real certificate)
 * verificationLink -> leave '' (or '#') if there is no online verification page;
 *                     the "Verify" button is hidden in that case.
 */
export const CERTIFICATIONS = [
  {
    id: 'sutram-2026',
    title: 'Certificate of Appreciation, SUTRAM 2026',
    organization: 'Faculty of Design, DLCSUPVA, Rohtak',
    year: '12–14 August 2026',
    description:
      'Awarded for actively participating in SUTRAM-2026, organised by the Faculty of Design at Dada Lakhmi Chand State University of Performing and Visual Arts, Rohtak, in appreciation of contribution and dedication to the programme.',
    verificationLink: '',
    image: sutramCertificate,
    accent: '#e2574c',
    featured: true,
    landscape: true,
  },
  {
    id: 'fashion-design-foundation',
    title: 'Fashion Design Foundation',
    organization: 'NIFT · Continuing Education',
    year: '2023',
    description:
      'A year-long foundation in fashion illustration, draping, garment construction and design history — completed with distinction.',
    verificationLink: '#',
    image: makePoster({
      title: 'Fashion Design Foundation',
      kicker: 'CERTIFIED',
      index: 'I',
      year: '2023',
      colors: PALETTES.sunset,
      variant: 'arch',
      seed: 3,
    }),
    accent: '#f97316',
  },
  {
    id: 'digital-fashion-3d',
    title: 'Digital Fashion & 3D Design',
    organization: 'Polimoda · Online',
    year: '2024',
    description:
      'Intensive programme covering digital garment construction, 3D simulation and virtual prototyping for contemporary fashion workflows.',
    verificationLink: '#',
    image: makePoster({
      title: 'Digital Fashion & 3D',
      kicker: 'CERTIFIED',
      index: 'II',
      year: '2024',
      colors: PALETTES.plum,
      variant: 'coat',
      seed: 13,
    }),
    accent: '#6d227f',
  },
  {
    id: 'sustainable-fashion-design',
    title: 'Sustainable Fashion & Circular Design',
    organization: 'Fashion Revolution Academy',
    year: '2024',
    description:
      'Principles of circular design, material passports and end-of-life thinking for garments — applied in real workshop challenges.',
    verificationLink: '#',
    image: makePoster({
      title: 'Circular Fashion',
      kicker: 'CERTIFIED',
      index: 'III',
      year: '2024',
      colors: PALETTES.forest,
      variant: 'blouse',
      seed: 17,
    }),
    accent: '#58a12f',
  },
  {
    id: 'textile-innovation',
    title: 'Textile Innovation & Smart Materials',
    organization: 'Parsons · Short Course',
    year: '2025',
    description:
      'Exploration of conductive threads, reactive dyes and embedded sensing — with hands-on prototyping of an interactive textile sample.',
    verificationLink: '#',
    image: makePoster({
      title: 'Smart Textiles',
      kicker: 'CERTIFIED',
      index: 'IV',
      year: '2025',
      colors: PALETTES.ocean,
      variant: 'sun',
      seed: 29,
    }),
    accent: '#1fa39a',
  },
  {
    id: 'fashion-film',
    title: 'Fashion Film & Light Direction',
    organization: 'Art by Light Studio',
    year: '2025',
    description:
      'Cinematography and art direction for fashion shorts — storyboarding, single-source lighting and colour grading.',
    verificationLink: '#',
    image: makePoster({
      title: 'Fashion Film',
      kicker: 'CERTIFIED',
      index: 'V',
      year: '2025',
      colors: PALETTES.berry,
      variant: 'arch',
      seed: 47,
    }),
    accent: '#e2574c',
  },
 
]