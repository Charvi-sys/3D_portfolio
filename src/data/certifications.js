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
 
 
]