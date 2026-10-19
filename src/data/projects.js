import { makePoster, PALETTES } from './posters'
import projectPhoto01 from './images/project-photo-01.jpeg'
import projectPhoto02 from './images/project-photo-02.jpeg'
import projectPhoto03 from './images/project-photo-03.jpeg'
import projectPhoto04 from './images/project-photo-04.jpeg'
import projectPhoto05 from './images/project-photo-05.jpeg'

/** Edit this file to add / reorder projects. */
export const PROJECTS = [
  {
    id: 'textile-dye',
    index: '01',
    title: 'Exploring Textiles, Colour and Surface Techniques',
    category: 'Textile & Dye',

    excerpt: 'Dyeing, printing and hand painting studies that treat fabric as a surface for design.',
    description:
      'This project focused on exploring different ways to add colour and detail to fabric. We worked with fabric samples and experimented with dyeing, printing, and hand painting. The process required precision, attention to detail, and an understanding of how different techniques work on fabric. It helped me understand fabric as a surface for creative experimentation and design development.',
    tags: ['Dyeing', 'Printing', 'Hand Painting', 'Surface Design'],
    colors: PALETTES.sunset,
    photo: projectPhoto01,
    image: makePoster({
      title: 'Textile & Dye',
      kicker: 'PROJECT 01',
      index: '01',
      year: '2023 – 2027',
      colors: PALETTES.sunset,
      variant: 'dress',
      seed: 11,
    }),
    accent: '#f97316',
  },
  {
    id: 'fashion-illustrations',
    index: '02',
    title: 'Ideas Through Illustration',
    category: 'Fashion Illustrations',

    excerpt: 'Illustrations that explore silhouettes, proportions, colours and styling before they become garments.',
    description:
      'Fashion illustration is an important part of my design process. Through different illustrations, I explore clothing ideas, silhouettes, proportions, colours, and styling. These works include both concept-based drawings and independent creative explorations. They help me develop my visualisation skills and communicate design ideas before turning them into garments.',
    tags: ['Illustration', 'Silhouettes', 'Colour Study', 'Styling'],
    colors: PALETTES.plum,
    photo: projectPhoto02,
    image: makePoster({
      title: 'Illustration',
      kicker: 'PROJECT 02',
      index: '02',
      year: '2023 – 2027',
      colors: PALETTES.plum,
      variant: 'blouse',
      seed: 23,
    }),
    accent: '#6d227f',
  },
  {
    id: 'cover-page-illustration',
    index: '03',
    title: 'Illustration for Fashion Covers',
    category: 'Cover Page Illustration',

    excerpt: 'Vogue-inspired cover designs and floral illustration for editorial presentation.',
    description:
      'This project explored illustration through fashion-inspired cover designs, including a Vogue-inspired cover and floral illustration work. It involved combining drawing, composition, and visual elements to create an appealing final presentation. The project helped me explore how illustrations can be used in fashion communication, editorial design, and creative storytelling.',
    tags: ['Editorial', 'Vogue Inspired', 'Floral Illustration', 'Composition'],
    colors: PALETTES.berry,
    photo: projectPhoto03,
    image: makePoster({
      title: 'Cover Art',
      kicker: 'PROJECT 03',
      index: '03',
      year: '2023 – 2027',
      colors: PALETTES.berry,
      variant: 'arch',
      seed: 37,
    }),
    accent: '#e2574c',
  },
  {
    id: 'fashion-styling',
    index: '04',
    title: 'Styling for Fashion Shoots',
    category: 'Fashion Styling',

    excerpt: 'Planning looks for fashion photography and advertising shoots — concept through presentation.',
    description:
      "This module introduced me to the process of styling for fashion photography and advertising shoots. I learned how clothing, accessories, colours, and overall presentation work together to communicate a particular concept. It also helped me understand the importance of planning a look according to the shoot's theme and visual direction.",
    tags: ['Fashion Styling', 'Photography', 'Concept Planning', 'Art Direction'],
    colors: PALETTES.ocean,
    photo: projectPhoto04,
    image: makePoster({
      title: 'Styling',
      kicker: 'PROJECT 04',
      index: '04',
      year: '2023 – 2027',
      colors: PALETTES.ocean,
      variant: 'coat',
      seed: 41,
    }),
    accent: '#1fa39a',
  },
  {
    id: 'motif-development',
    index: '05',
    title: 'Exploring Motifs and Repeated Patterns',
    category: 'Motif Development',

    excerpt: 'Motifs drawn from nature, geometry and culture — developed into repeating textile patterns.',
    description:
      'This project focuses on the development of motifs and their use in textile and surface design. Motifs can be inspired by nature, geometric forms, objects, or cultural elements and developed through drawing and experimentation. The process involves exploring shapes, details, and variations to create designs that can be used individually or arranged into repeating patterns on fabric.',
    tags: ['Motifs', 'Repeating Patterns', 'Textile Design', 'Surface Design'],
    colors: PALETTES.forest,
    photo: projectPhoto05,
    image: makePoster({
      title: 'Motifs',
      kicker: 'PROJECT 05',
      index: '05',
      year: '2023 – 2027',
      colors: PALETTES.forest,
      variant: 'sun',
      seed: 59,
    }),
    accent: '#58a12f',
  },
]