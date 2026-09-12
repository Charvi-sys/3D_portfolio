/**
 * Central portfolio content — edit this file to personalise the whole site.
 */
export const PERSON = {
  name: 'Charvi',
  fullName: 'Charvi Sharma',
  role: 'Fashion & Digital Designer',
  shortRole: 'Fashion & Digital Designer',
  tagline: 'I build little worlds for fashion, stories and ideas.',
  email: 'hello@charvi.world',
  instagram: 'https://instagram.com/charvi.designs',
  linkedin: 'https://linkedin.com/in/charvisharma',
  location: 'New Delhi, India',
  shortBio:
    'A fashion & digital designer who treats every project like a tiny world — pattern, colour, motion and a story to walk through.',
  bio: [
    'I’m Charvi — a designer who fell in love with the gap between sketching a garment and seeing it move. That gap is where I live: pattern notes, fabric swatches, code and colour all mixed together.',
    'My practice blends hands-on fashion craft (draping, grading, garment construction) with digital worlds — 3D visuals, interactive galleries and design systems. I believe a portfolio should feel like walking through a garden, not scrolling a PDF.',
    'When I’m not at the easel or the sewing machine, I’m usually hiding playful little objects inside a 3D scene — much like the world you’re standing in right now.',
  ],
  education: [
    { degree: 'B.Des — Fashion Design', place: 'National Institute of Fashion Technology', years: '2019 – 2023' },
    { degree: 'Digital Storytelling & 3D', place: 'Polimoda · Online Intensive', years: '2024' },
  ],
  experience: [
    { role: 'Junior Fashion Designer', place: 'House of Indigo, New Delhi', years: '2023 – Present' },
    { role: 'Fashion Illustration Intern', place: 'Atelier Sundari', years: '2022' },
    { role: 'Freelance Digital Designer', place: 'Self-employed', years: '2021 – Present' },
  ],
  philosophy:
    'Design should feel less like an announcement and more like an invitation — a place you want to explore with your hands.',
}

export const SOCIALS = [
  { label: 'Email', value: PERSON.email, href: `mailto:${PERSON.email}`, icon: 'mail' },
  { label: 'Instagram', value: '@charvi.designs', href: PERSON.instagram, icon: 'instagram' },
  { label: 'LinkedIn', value: 'in/charvisharma', href: PERSON.linkedin, icon: 'linkedin' },
  { label: 'Location', value: PERSON.location, href: '#', icon: 'pin' },
]