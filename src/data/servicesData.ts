export interface HomeService {
  id: string;
  name: string;
  category: 'Electrical' | 'Plumbing' | 'Painting' | 'Waterproofing' | 'Carpentry' | 'Civil Works';
  icon: string;
  rating: number;
  reviewsCount: number;
  startingPrice: string;
  priceUnit: string;
  eta: string;
  verifiedBadge: boolean;
  insuranceCover: string;
  shortDesc: string;
  fullDesc: string;
  deliverables: string[];
  popularProjects: string[];
}

export const HOME_SERVICES_CATALOG: HomeService[] = [
  {
    id: 'service-waterproofing',
    name: 'Advanced Terrace & Basement Waterproofing',
    category: 'Waterproofing',
    icon: 'ShieldCheck',
    rating: 4.9,
    reviewsCount: 388,
    startingPrice: '₹ 38',
    priceUnit: 'per Sq.Ft',
    eta: 'Inspection in 2 Hours',
    verifiedBadge: true,
    insuranceCover: 'Up to 10-Year Service Warranty',
    shortDesc: 'Multi-layer polyurethane & elastomeric waterproofing with thermal reflection coating for terraces, sunken slabs, and basements.',
    fullDesc: 'BuildMitra certified waterproofing technicians conduct infrared thermal moisture leak scans to pinpoint internal dampness sources, applying 5-stage fiber-mesh reinforced polymer elastomeric membranes.',
    deliverables: [
      'Thermal Infrared Moisture Mapping',
      'High-pressure crack V-grooving and crystalline injection',
      'Dual-layer SBS polymer modified elastomeric membrane',
      'Heat-reflective white topcoat with SRI > 105',
      'Water ponding flood test for 72 hours before handover'
    ],
    popularProjects: ['Rooftop Terrace Waterproofing', 'Sunken Bathroom Waterproofing', 'Basement Retaining Wall Grouting', 'Exterior Wall Damp Proofing']
  },
  {
    id: 'service-painting',
    name: 'Turnkey Interior & Exterior Painting',
    category: 'Painting',
    icon: 'Paintbrush',
    rating: 4.8,
    reviewsCount: 420,
    startingPrice: '₹ 14',
    priceUnit: 'per Sq.Ft',
    eta: 'Site Visit Today',
    verifiedBadge: true,
    insuranceCover: '5-Year Manufacturer Finish Warranty',
    shortDesc: 'Dust-free automated mechanised sanding, wall moisture checks, dual putty coats, and double finish coats with Asian Paints Royale / Berger.',
    fullDesc: 'Experience hassle-free home painting with mechanized dust-free sanders, laser alignment, furniture plastic masking, and certified color consultants.',
    deliverables: [
      'Digital moisture reading on all wall substrates',
      'Complete furniture masking and drop-sheet floor protection',
      '2 coats of acrylic wall putty + 1 coat primer',
      '2 coats of premium Teflon-shield anti-fungal paint',
      'Deep post-service cleanup and color touch-up kit'
    ],
    popularProjects: ['Complete 3BHK Repainting', 'Luxury Texture & Stencil Feature Wall', 'Exterior Weatherproof Cladding', 'Wood & Melamine Polish']
  },
  {
    id: 'service-electrician',
    name: 'Certified MEP Master Electrician',
    category: 'Electrical',
    icon: 'Zap',
    rating: 4.9,
    reviewsCount: 512,
    startingPrice: '₹ 299',
    priceUnit: 'per Point / Visit',
    eta: 'At your door in 45 Mins',
    verifiedBadge: true,
    insuranceCover: '₹ 25,000 Safety Cover',
    shortDesc: 'Concealed wiring, circuit breaker (MCB/RCCB) diagnostics, EV charging installation, and smart home automation switch modules.',
    fullDesc: 'Licensed electrical engineers and technicians trained to Indian Electrical Rules (1956) for safe earthing resistance testing, load balancing, and hazard prevention.',
    deliverables: [
      'Digital insulation resistance & earth pit testing',
      'Concealed wiring replacement with FR copper conductors',
      'Distribution board RCCB earth leakage protection setup',
      'Inverter / UPS backup circuit load bifurcation',
      'Testing report with phase balancing verification'
    ],
    popularProjects: ['Full House Rewiring', 'Short Circuit & Trip Rectification', 'Home EV Charger Level-2 Installation', 'Smart Touch Switch Automation']
  },
  {
    id: 'service-plumber',
    name: 'Master Hydraulic & Sanitary Plumber',
    category: 'Plumbing',
    icon: 'Wrench',
    rating: 4.9,
    reviewsCount: 367,
    startingPrice: '₹ 349',
    priceUnit: 'per Inspection / Fix',
    eta: 'Arrives in 40 Mins',
    verifiedBadge: true,
    insuranceCover: '100% Workmanship Guarantee',
    shortDesc: 'Concealed pipe leak acoustic detection, pressure booster pump setup, diverter valve replacement, and sanitary fixture installation.',
    fullDesc: 'Precision plumbing by certified technicians equipped with ultrasonic leak detectors and pipe inspection snake cameras to solve recurring seepage and low water pressure.',
    deliverables: [
      'Acoustic wall leak inspection without needless tile breaking',
      'High-pressure motorized descaling of blocked CPVC lines',
      'Grohe / Kohler / Jaquar concealed diverter servicing',
      'Automatic pressure booster pump & pressure tank setup',
      'Sanitary commode wall-hung frame anchor installation'
    ],
    popularProjects: ['Acoustic Concealed Leak Detection', 'Pressure Booster Pump Installation', 'Wall-Hung Toilet Commode Setup', 'Underground Sump Deep Clean']
  },
  {
    id: 'service-civil-contractor',
    name: 'Turnkey Civil Construction & Renovation',
    category: 'Civil Works',
    icon: 'Hammer',
    rating: 4.9,
    reviewsCount: 154,
    startingPrice: '₹ 1,750',
    priceUnit: 'per Sq.Ft (Turnkey)',
    eta: 'Consultation & BOQ in 24 Hrs',
    verifiedBadge: true,
    insuranceCover: 'Contractor All-Risk (CAR) Insured',
    shortDesc: 'End-to-end residential construction, floor additions, structural reinforcement, remodeling, and boundary wall masonry with milestone escrow.',
    fullDesc: 'Backed by M. Chinnappa Reddy’s 31+ years of senior leadership in real estate procurement, BuildMitra civil contractors deliver IS-standard construction with zero material compromises and transparent digital progress tracking.',
    deliverables: [
      'Architectural CAD drawings & municipal approval assistance',
      'Certified IS 456 RCC framework with cube test reports',
      'Standardized milestone payment releases via verified escrow',
      'Dedicated on-site civil engineer quality inspection',
      'Live daily CCTV site streaming and WhatsApp progress log'
    ],
    popularProjects: ['Duplex Independent House Construction', 'Floor Addition / Terrace Penthouse', 'Complete Villa Renovation', 'Compound Wall & Gate Pillar']
  },
  {
    id: 'service-carpenter',
    name: 'Bespoke Architectural Carpentry & Modular Interiors',
    category: 'Carpentry',
    icon: 'Ruler',
    rating: 4.8,
    reviewsCount: 298,
    startingPrice: '₹ 1,150',
    priceUnit: 'per Sq.Ft',
    eta: '3D Design in 48 Hours',
    verifiedBadge: true,
    insuranceCover: '10-Year Hardware Guarantee',
    shortDesc: 'Factory-finished BWR/BWP plywood modular kitchens, soft-close wardrobes, veneer wall paneling, and solid teakwood main entrance doors.',
    fullDesc: 'Custom interior cabinetry crafted using boiling-waterproof marine plywood with PUR edge-banding and German hardware (Hettich / Hafele) for lifelong durability.',
    deliverables: [
      'Detailed 3D visual walkthrough with material samples',
      'IS 710 calibrated BWP marine grade ply construction',
      'German soft-close hinges and hydraulic tandem boxes',
      'Zero-gap laser cut edge banding',
      'Lifetime anti-termite and borer protection warranty'
    ],
    popularProjects: ['Acrylic Modular Kitchen', 'Floor-to-Ceiling Sliding Wardrobes', 'Solid Teak Pooja Mandir & Main Door', 'Acoustic TV Media Wall Paneling']
  }
];

