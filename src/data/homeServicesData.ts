export interface SubService {
  id: string;
  name: string;
  categoryId: string;
  image: string;
  rating: number;
  reviewsCount: number;
  priceStarting: number;
  priceDisplay: string;
  duration: string;
  description: string;
  features: string[];
}

export interface ServiceCategory {
  id: string;
  name: string;
  iconName: string;
  bannerImage: string;
  description: string;
  subServices: SubService[];
}

export interface NearbyProvider {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  reviewsCount: number;
  distanceKm: number;
  etaMinutes: number;
  availableNow: boolean;
  specialization: string;
  serviceCategory: string;
  phone: string;
  locationCoords: { x: number; y: number; lat: number; lng: number };
}

export interface Booking {
  id: string; // e.g. '#BM12456'
  serviceId: string;
  serviceName: string;
  categoryName: string;
  serviceImage: string;
  bookingDate: string;
  bookingTime: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  provider: NearbyProvider;
  amount: number;
  status: 'Request Placed' | 'Provider Accepted' | 'On the Way' | 'In Progress' | 'Completed' | 'Cancelled';
  timeline: {
    status: string;
    timestamp: string;
    completed: boolean;
    note?: string;
  }[];
  paymentMethod: 'Online UPI' | 'Cash on Delivery' | 'Card';
  paymentStatus: 'Paid' | 'Pending';
  rating?: number;
  review?: string;
}

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    id: 'painting',
    name: 'Painting',
    iconName: 'Paintbrush',
    bannerImage: '/assets/services.jpg',
    description: 'Transform your residential or commercial space with dust-free mechanized sanding and premium paints.',
    subServices: [
      {
        id: 'interior-painting',
        name: 'Interior Painting',
        categoryId: 'painting',
        image: '/assets/services.jpg',
        rating: 4.6,
        reviewsCount: 12400,
        priceStarting: 2000,
        priceDisplay: '₹2,000 onwards',
        duration: '2 - 4 Days',
        description: 'Give your home a fresh and premium look with our expert painters. Includes free moisture check, furniture masking, wall putty, primer, and double-coat Asian Paints Royale finish.',
        features: ['Verified Partner', 'On-Time Service', 'Quality Guarantee', 'Dust-Free Mechanized Sanding', '1-Year Warranty']
      },
      {
        id: 'exterior-painting',
        name: 'Exterior Painting',
        categoryId: 'painting',
        image: '/assets/hero-desktop.png',
        rating: 4.8,
        reviewsCount: 8900,
        priceStarting: 3000,
        priceDisplay: '₹3,000 onwards',
        duration: '4 - 7 Days',
        description: 'Weather-proof elastomeric exterior painting engineered to withstand heavy rainfall, UV rays, and algal growth.',
        features: ['WeatherCoat Anti-Algal', 'Scaffolding Included', '5-Year Finish Guarantee', 'High Pressure Jet Wash']
      },
      {
        id: 'premium-finish',
        name: 'Premium Texture Finish',
        categoryId: 'painting',
        image: '/assets/services.jpg',
        rating: 4.9,
        reviewsCount: 5200,
        priceStarting: 4500,
        priceDisplay: '₹4,500 onwards',
        duration: '3 - 5 Days',
        description: 'Designer Italian stucco, metallic glaze, and artistic wall textures to create stunning focal accent walls in your living and master bedroom.',
        features: ['Master Artisan Application', 'Exclusive Color Swatches', 'Washable Acrylic Base', '3D Wall Depth']
      },
      {
        id: 'waterproofing-paint',
        name: 'Waterproof Dampproof Coating',
        categoryId: 'painting',
        image: '/assets/engineering.jpg',
        rating: 4.7,
        reviewsCount: 3100,
        priceStarting: 3800,
        priceDisplay: '₹3,800 onwards',
        duration: '2 - 3 Days',
        description: 'Crystalline negative-side damp proofing to treat efflorescence, bubbling paint, and internal plaster peel.',
        features: ['Infrared Leak Scan', 'Chemical Crack Injection', 'Salt Resistant Barrier', '10-Year Warranty']
      }
    ]
  },
  {
    id: 'construction',
    name: 'Construction',
    iconName: 'Building2',
    bannerImage: '/assets/hero-desktop.png',
    description: 'Turnkey residential house construction, structural RCC framing, and floor additions.',
    subServices: [
      {
        id: 'turnkey-villa-construction',
        name: 'Turnkey House Construction',
        categoryId: 'construction',
        image: '/assets/hero-desktop.png',
        rating: 4.9,
        reviewsCount: 4200,
        priceStarting: 1650,
        priceDisplay: '₹1,650 / sq.ft onwards',
        duration: '6 - 9 Months',
        description: 'Complete architecture to occupancy construction with primary steel, NABL tested cement, and milestone escrow security.',
        features: ['IS 456 Structural Standard', 'Milestone Escrow Payment', 'Weekly CCTV & Video Reports', '10-Year Structural Guarantee']
      },
      {
        id: 'floor-extension',
        name: 'Floor Extension & Penthouse',
        categoryId: 'construction',
        image: '/assets/floor-plans.jpg',
        rating: 4.8,
        reviewsCount: 2900,
        priceStarting: 1800,
        priceDisplay: '₹1,800 / sq.ft onwards',
        duration: '3 - 4 Months',
        description: 'Structural column extension, lightweight block masonry, and rooftop terrace pergola for additional storeys.',
        features: ['Structural Stability Audit', 'Lightweight AAC Blocks', 'Waterproof Roof Slab', 'Approval Support']
      },
      {
        id: 'compound-wall',
        name: 'Compound Wall & Foundation',
        categoryId: 'construction',
        image: '/assets/cat_bricks.jpg',
        rating: 4.7,
        reviewsCount: 1800,
        priceStarting: 850,
        priceDisplay: '₹850 / Rft onwards',
        duration: '1 - 2 Weeks',
        description: 'Heavy duty stone masonry or concrete block boundary walls with copings and MS gate pillars.',
        features: ['Derrick Stone Packing', 'PCC Base Concrete', 'Barbed Wire Option', 'Plastered Finish']
      }
    ]
  },
  {
    id: 'repairs',
    name: 'Repairs',
    iconName: 'Wrench',
    bannerImage: '/assets/engineering.jpg',
    description: 'Structural seepage repair, wall crack rehabilitation, and tile regrouting.',
    subServices: [
      {
        id: 'seepage-repair',
        name: 'Seepage & Dampness Repair',
        categoryId: 'repairs',
        image: '/assets/services.jpg',
        rating: 4.8,
        reviewsCount: 6500,
        priceStarting: 1200,
        priceDisplay: '₹1,200 onwards',
        duration: '4 - 6 Hours',
        description: 'Pinpointing internal concealed pipe leakages with digital ultrasonic sensors and applying polymer cementitious coatings.',
        features: ['Non-Destructive Leak Scan', 'Epoxy Polymer Injection', 'Mold Prevention', 'Warranty Card']
      },
      {
        id: 'wall-crack-injection',
        name: 'Structural Crack Injection',
        categoryId: 'repairs',
        image: '/assets/engineering.jpg',
        rating: 4.9,
        reviewsCount: 2400,
        priceStarting: 1500,
        priceDisplay: '₹1,500 onwards',
        duration: '3 - 5 Hours',
        description: 'High-pressure polyurethane injection to weld and seal structural concrete beams and slab cracks.',
        features: ['High-Strength Polyurethane', '150 Bar Pressure Pump', 'Zero Excavation', 'Permanent Seal']
      },
      {
        id: 'tile-repair',
        name: 'Tile Replacement & Epoxy Grouting',
        categoryId: 'repairs',
        image: '/assets/cat_aggregates.jpg',
        rating: 4.7,
        reviewsCount: 4100,
        priceStarting: 900,
        priceDisplay: '₹900 onwards',
        duration: '2 - 4 Hours',
        description: 'Replacing hollow or broken vitrified tiles, precision laser cutting, and waterproof epoxy joint grouting.',
        features: ['Laser Alignment', 'Stain-Resistant Epoxy', 'Vibration-Free Cutting', 'Clean Finish']
      }
    ]
  },
  {
    id: 'cleaning',
    name: 'Cleaning',
    iconName: 'Sparkles',
    bannerImage: '/assets/services.jpg',
    description: 'Post-construction deep scrubbing, mechanized buffing, and water tank sanitization.',
    subServices: [
      {
        id: 'post-construction-cleaning',
        name: 'Post-Construction Deep Cleaning',
        categoryId: 'cleaning',
        image: '/assets/services.jpg',
        rating: 4.8,
        reviewsCount: 5600,
        priceStarting: 3500,
        priceDisplay: '₹3,500 onwards',
        duration: '6 - 8 Hours',
        description: 'Heavy industrial mechanized single-disc scrubber cleaning to strip cement stains, paint splatters, and masonry dust.',
        features: ['Industrial Scrubbing Machines', 'Cement Stain Removers', 'Window Glass Scrapers', 'Complete Sanitization']
      },
      {
        id: 'water-tank-cleaning',
        name: 'Underground Sump & Tank Cleaning',
        categoryId: 'cleaning',
        image: '/assets/cat_plumbing.jpg',
        rating: 4.9,
        reviewsCount: 7800,
        priceStarting: 1200,
        priceDisplay: '₹1,200 onwards',
        duration: '2 - 3 Hours',
        description: '6-stage mechanized sump cleaning with sludge slurry pump, rotary pressure jetting, and UV antibacterial treatment.',
        features: ['Submersible Sludge Removal', 'Food-Grade Antibacterial Wash', 'UV Lamp Treatment', 'No Chemical Odor']
      }
    ]
  },
  {
    id: 'plumbing',
    name: 'Plumbing',
    iconName: 'Droplets',
    bannerImage: '/assets/cat_plumbing.jpg',
    description: 'Certified plumbers for CPVC piping, pressure booster pumps, and sanitary installations.',
    subServices: [
      {
        id: 'concealed-plumbing',
        name: 'Concealed CPVC Pipe Installation',
        categoryId: 'plumbing',
        image: '/assets/cat_plumbing.jpg',
        rating: 4.7,
        reviewsCount: 8900,
        priceStarting: 1100,
        priceDisplay: '₹1,100 onwards',
        duration: '1 - 2 Days',
        description: 'Hot and cold CPVC pipe routing, wall groove chasing, diverter valves, and hydrostatic pressure testing.',
        features: ['Astral / Supreme CPVC', '10 kg/cm² Pressure Tested', 'Concealed Wall Grooving', 'Leakproof Solvent Weld']
      },
      {
        id: 'pump-installation',
        name: 'Water Booster Pump & Sump Setup',
        categoryId: 'plumbing',
        image: '/assets/cat_plumbing.jpg',
        rating: 4.8,
        reviewsCount: 4300,
        priceStarting: 2500,
        priceDisplay: '₹2,500 onwards',
        duration: '3 - 5 Hours',
        description: 'Installing automatic pressure booster pumps, float switches, non-return valves, and overhead tank bypass piping.',
        features: ['Automatic Pressure Switch', 'Dry Run Protection', 'Vibration Dampener', 'Wiring Included']
      }
    ]
  },
  {
    id: 'electrical',
    name: 'Electrical',
    iconName: 'Zap',
    bannerImage: '/assets/cat_electrical.jpg',
    description: 'Licensed electricians for home rewiring, DB box dressing, and solar inverter setup.',
    subServices: [
      {
        id: 'home-rewiring',
        name: 'Complete Home Concealed Rewiring',
        categoryId: 'electrical',
        image: '/assets/cat_electrical.jpg',
        rating: 4.9,
        reviewsCount: 6200,
        priceStarting: 8500,
        priceDisplay: '₹8,500 onwards',
        duration: '2 - 4 Days',
        description: 'FRLS fire-retardant copper wiring pulling through PVC conduits, circuit load balancing, and Earth leakage protection.',
        features: ['Finolex / Havells FRLS Wires', 'Circuit Load Balancing', 'Copper Earthing Rod', 'Megger Insulation Test']
      },
      {
        id: 'db-dressing',
        name: 'Distribution Board (DB) & MCB Dressing',
        categoryId: 'electrical',
        image: '/assets/cat_electrical.jpg',
        rating: 4.8,
        reviewsCount: 3800,
        priceStarting: 1800,
        priceDisplay: '₹1,800 onwards',
        duration: '3 - 4 Hours',
        description: 'Organized busbar and RCBO/ELCB installation to protect home appliances from voltage surges and short circuits.',
        features: ['Short-Circuit Trip Protection', 'Neat Cable Tagging', 'Phase Balancing', 'ISI Mark Enclosure']
      }
    ]
  },
  {
    id: 'carpentry',
    name: 'Carpentry',
    iconName: 'Hammer',
    bannerImage: '/assets/floor-plans.jpg',
    description: 'Master carpenters for teak wood frames, modular wardrobes, and kitchen cabinetry.',
    subServices: [
      {
        id: 'modular-kitchen',
        name: 'Modular Kitchen & Cabinetry',
        categoryId: 'carpentry',
        image: '/assets/floor-plans.jpg',
        rating: 4.9,
        reviewsCount: 3400,
        priceStarting: 45000,
        priceDisplay: '₹45,000 onwards',
        duration: '1 - 2 Weeks',
        description: 'BWP marine plywood modular kitchen cabinets with soft-close Blum/Hettich hinges and acrylic/laminate shutters.',
        features: ['BWP Boiling Waterproof Ply', 'Soft Close Hydraulic Hinges', 'Granite Top Cutting', '3D Layout Design']
      },
      {
        id: 'door-fitting',
        name: 'Teak Wood Door & Frame Installation',
        categoryId: 'carpentry',
        image: '/assets/floor-plans.jpg',
        rating: 4.8,
        reviewsCount: 5100,
        priceStarting: 3200,
        priceDisplay: '₹3,200 onwards',
        duration: '1 - 2 Days',
        description: 'Main door teak frame plumb fitting, mortise brass lock mortising, and stainless steel bearing hinges.',
        features: ['Zero Gap Frame Setting', 'Godrej / Yale Lock Fitting', 'Waterproof Wood Polish', 'Draft Strip Seal']
      }
    ]
  },
  {
    id: 'others',
    name: 'Others',
    iconName: 'MoreHorizontal',
    bannerImage: '/assets/services.jpg',
    description: 'Pest control, CCTV surveillance, false ceiling, and aluminum partitions.',
    subServices: [
      {
        id: 'anti-termite',
        name: 'Pre & Post Construction Anti-Termite',
        categoryId: 'others',
        image: '/assets/services.jpg',
        rating: 4.8,
        reviewsCount: 4900,
        priceStarting: 1800,
        priceDisplay: '₹1,800 onwards',
        duration: '3 - 5 Hours',
        description: 'Drill-fill-seal chemical barrier using Chlorpyrifos / Imidacloprid to protect woodwork and foundation slabs.',
        features: ['Odorless Termiticide', 'Foundation Perimeter Trench', '5-Year Written Warranty', 'Govt Approved Chemicals']
      },
      {
        id: 'cctv-setup',
        name: 'CCTV Surveillance & Security Setup',
        categoryId: 'others',
        image: '/assets/cat_electrical.jpg',
        rating: 4.7,
        reviewsCount: 2800,
        priceStarting: 3500,
        priceDisplay: '₹3,500 onwards',
        duration: '4 - 6 Hours',
        description: 'HD IP security camera installation with night vision, mobile live-streaming app, and hard drive NVR recording.',
        features: ['4K Night Vision', 'Mobile App Live Feed', 'Motion Alert Notifications', 'Concealed Cable Laying']
      }
    ]
  }
];

export const INITIAL_NEARBY_PROVIDERS: NearbyProvider[] = [
  {
    id: 'prov-1',
    name: 'Ramesh Enterprises',
    avatar: 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=150&auto=format&fit=crop&q=80',
    rating: 4.8,
    reviewsCount: 1240,
    distanceKm: 2.1,
    etaMinutes: 15,
    availableNow: true,
    specialization: 'Master Painter & Color Consultant',
    serviceCategory: 'Painting',
    phone: '+91 98765 43210',
    locationCoords: { x: 38, y: 44, lat: 17.441, lng: 78.382 }
  },
  {
    id: 'prov-2',
    name: 'Sri Sai Services',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    rating: 4.7,
    reviewsCount: 856,
    distanceKm: 3.5,
    etaMinutes: 25,
    availableNow: true,
    specialization: 'Turnkey Painting & Waterproofing',
    serviceCategory: 'Painting',
    phone: '+91 98480 12345',
    locationCoords: { x: 62, y: 32, lat: 17.449, lng: 78.398 }
  },
  {
    id: 'prov-3',
    name: 'Balaji Technical Works',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    rating: 4.9,
    reviewsCount: 2100,
    distanceKm: 4.2,
    etaMinutes: 30,
    availableNow: true,
    specialization: 'Certified Civil & Electrical Contractor',
    serviceCategory: 'Construction',
    phone: '+91 97000 54321',
    locationCoords: { x: 28, y: 68, lat: 17.432, lng: 78.375 }
  },
  {
    id: 'prov-4',
    name: 'Venkateshwara Plumbing & Pumps',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
    rating: 4.8,
    reviewsCount: 940,
    distanceKm: 1.8,
    etaMinutes: 12,
    availableNow: true,
    specialization: 'Master Plumber & Hydrostatic Specialist',
    serviceCategory: 'Plumbing',
    phone: '+91 91234 56789',
    locationCoords: { x: 50, y: 55, lat: 17.438, lng: 78.390 }
  }
];

export const INITIAL_BOOKINGS: Booking[] = [
  {
    id: '#BM12456',
    serviceId: 'interior-painting',
    serviceName: 'Interior Painting',
    categoryName: 'Painting',
    serviceImage: '/assets/services.jpg',
    bookingDate: 'Thu, 14 Nov',
    bookingTime: '10:00 AM',
    customerName: 'Hemanth Kumar',
    customerPhone: '+91 98765 43210',
    customerAddress: 'Flat 402, Sai Residency, Madhapur, Hyderabad - 500081',
    provider: INITIAL_NEARBY_PROVIDERS[0],
    amount: 2000,
    status: 'In Progress',
    timeline: [
      { status: 'Request Placed', timestamp: 'Thu, 14 Nov • 09:20 AM', completed: true, note: 'Service requested via Mobile App' },
      { status: 'Provider Accepted', timestamp: 'Thu, 14 Nov • 09:35 AM', completed: true, note: 'Assigned to Ramesh Enterprises (4.8 ★)' },
      { status: 'On the Way', timestamp: 'Thu, 14 Nov • 09:50 AM', completed: true, note: 'Arriving in 15 min with paint supplies' },
      { status: 'In Progress', timestamp: 'Thu, 14 Nov • 10:15 AM', completed: true, note: 'Surface moisture check and masking in progress' },
      { status: 'Completed', timestamp: 'Pending site inspection', completed: false, note: 'Final inspection & digital invoice handover' }
    ],
    paymentMethod: 'Online UPI',
    paymentStatus: 'Paid',
    rating: 5,
    review: 'Ramesh and his team were extremely professional! They masked all our furniture and completed the painting dust-free.'
  }
];
