export interface HouseDesign3D {
  id: string;
  title: string;
  category: 'Exterior' | 'Interior';
  startingPrice: string;
  builtUpArea: string;
  dimensions: string;
  floors: string;
  heroImage: string;
  thumbnails: string[];
  description: string;
  features: string[];
}

export const HOUSE_DESIGNS_CATALOG: HouseDesign3D[] = [
  {
    id: 'design-modern-villa',
    title: 'Modern Villa Design',
    category: 'Exterior',
    startingPrice: '₹5,00,000 onwards',
    builtUpArea: '3,200 Sq.Ft',
    dimensions: '40 ft x 60 ft Plot',
    floors: 'G + 2 Storeys with Infinity Terrace',
    heroImage: '/assets/floor-plans.jpg',
    thumbnails: [
      '/assets/floor-plans.jpg',
      '/assets/hero-desktop.png',
      '/assets/hero-mobile.png',
      '/assets/engineering.jpg'
    ],
    description: 'Contemporary European cubic architecture featuring full-height structural glass curtain walls, cantilevered floating balconies, and exterior vertical wood louvers.',
    features: ['3D BIM Architectural Model', 'Vastu Eshanya Compliant', 'Structural Column Layout', 'Daylight & Thermal Analysis']
  },
  {
    id: 'design-luxury-duplex',
    title: 'Contemporary Duplex Residence',
    category: 'Exterior',
    startingPrice: '₹3,50,000 onwards',
    builtUpArea: '2,400 Sq.Ft',
    dimensions: '30 ft x 40 ft Plot',
    floors: 'G + 1 Storey with Double-Height Living',
    heroImage: '/assets/hero-desktop.png',
    thumbnails: [
      '/assets/hero-desktop.png',
      '/assets/floor-plans.jpg',
      '/assets/services.jpg'
    ],
    description: 'Compact urban luxury design optimizing sunlight and cross-ventilation for standard 30x40 city residential plots.',
    features: ['Double-Height Living Courtyard', 'Rainwater Harvesting Sump', 'Concealed AC Chasing', 'Solar Roof Deck']
  },
  {
    id: 'design-italian-living',
    title: 'Minimalist Italian Living & Foyer',
    category: 'Interior',
    startingPrice: '₹4,20,000 onwards',
    builtUpArea: '1,400 Sq.Ft Interior',
    dimensions: 'Living & Dining Hall',
    floors: 'Ground Floor Interior Suite',
    heroImage: '/assets/services.jpg',
    thumbnails: [
      '/assets/services.jpg',
      '/assets/floor-plans.jpg',
      '/assets/hero-desktop.png'
    ],
    description: 'Bespoke Italian marble flooring, cove LED architectural warm lighting, fluted charcoal wall paneling, and floating TV console.',
    features: ['Italian Statuario Marble', 'Fluted Charcoal Panels', 'Smart Dimmable Lighting', 'Acoustic Soundproofing']
  },
  {
    id: 'design-modular-kitchen',
    title: 'Grand Modular Island Kitchen',
    category: 'Interior',
    startingPrice: '₹3,80,000 onwards',
    builtUpArea: '450 Sq.Ft',
    dimensions: 'Open Concept Kitchen',
    floors: 'Dining Adjacent',
    heroImage: '/assets/floor-plans.jpg',
    thumbnails: [
      '/assets/floor-plans.jpg',
      '/assets/services.jpg',
      '/assets/engineering.jpg'
    ],
    description: 'Premium quartz breakfast island counter, German soft-close hydraulic hardware, integrated chimney, and concealed pantry drawers.',
    features: ['Quartz Stone Countertop', 'Blum Soft-Close Lift Ups', 'Integrated Hob & Chimney', 'Anti-Fingerprint Acrylic']
  }
];
