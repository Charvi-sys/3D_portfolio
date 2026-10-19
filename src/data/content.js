/**
 * Central portfolio content — edit this file to personalise the whole site.
 */
export const PERSON = {
  name: 'Charvi',
  fullName: 'Charvi',
  role: 'Fashion Design Student',
  shortRole: 'Fashion Design Student',
  tagline: 'Designing, experimenting, and figuring things out along the way.',
  email: 'charvimaggu@gmail.com',
  instagram: 'https://instagram.com/charvi.designs',
  location: 'Rohtak, India',
  shortBio:
    "I'm Charvi, a fashion design student who enjoys exploring ideas and turning them into something tangible. My interests range from garment construction and textiles to digital design and interactive experiences.",
  bio: [
    "I'm Charvi, a fashion design student who enjoys exploring ideas and turning them into something tangible. My interests range from garment construction and textiles to digital design and interactive experiences.",
    "I like working with different concepts, experimenting with visuals, and learning through the process of making. For me, design isn't just about the final result; it's also about the ideas, trials, and small details that bring a project together.",
    'This portfolio brings together my work, experiments, and ongoing journey as a designer.',
  ],
  education: [
    {
      degree: 'Bachelor of Design (B.Des) — Fashion Design',
      place: 'SUVA',
      years: '2023 – 2027',
      status: 'Currently pursuing',
    },
  ],
  experience: [],
  philosophy: '',
}

export const SOCIALS = [
  { label: 'Email', value: PERSON.email, href: `mailto:${PERSON.email}`, icon: 'mail' },
  { label: 'Instagram', value: '@charvi.designs', href: PERSON.instagram, icon: 'instagram' },
  { label: 'Address', value: PERSON.location, href: '#', icon: 'pin' },
]

// The resume PDF lives in public/resume/ and is deployed under the configured
// base path. Vite replaces import.meta.env.BASE_URL at build time (see fonts.js).
const BASE = import.meta.env.BASE_URL.replace(/\/$/, '')
export const RESUME_FILE = 'Charvi_Maggu_Resume.pdf'
export const RESUME_URL = `${BASE}/resume/${RESUME_FILE}`