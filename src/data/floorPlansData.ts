export interface FloorPlan {
  id: string;
  title: string;
  type: '2BHK Compact' | '3BHK Duplex' | '3BHK Single Floor' | '4BHK Luxury Villa' | 'Rental & Penthouse';
  plotDimensions: string;
  builtUpArea: number; // in sq.ft
  facing: 'East Facing (Vastu Compliant)' | 'North Facing (Kubera Corner)' | 'West Facing' | 'East Facing (Double Road Corner)' | string;
  floors: string;
  estCostTurnkey: string;
  estCostPerSqft: number;
  image: string;
  rooms: { name: string; size: string; vastuDirection: string }[];
  materialEstimates: { cementBags: number; steelTons: number; sandTons: number; bricksCount: number };
  features: string[];
}

export const FLOOR_PLANS_CATALOG: FloorPlan[] = [
  {
    id: 'plan-30x40-3bhk-duplex',
    title: 'The Pragathi — 30x40 Modern 3BHK Duplex House',
    type: '3BHK Duplex',
    plotDimensions: '30 ft x 40 ft (1,200 Sq.Ft Plot)',
    builtUpArea: 2250,
    facing: 'East Facing (Vastu Compliant)',
    floors: 'G + 1 Storey with Private Terrace Pergola',
    estCostTurnkey: '₹ 42.75 Lakhs',
    estCostPerSqft: 1900,
    image: '/assets/floor-plans.jpg',
    rooms: [
      { name: 'Ground Floor Living Room', size: '14’0” x 16’6”', vastuDirection: 'North-East (Eshanya)' },
      { name: 'Modular Kitchen & Utility', size: '10’0” x 9’6”', vastuDirection: 'South-East (Agneya)' },
      { name: 'Master Bedroom with Ensuite', size: '13’0” x 12’0”', vastuDirection: 'South-West (Nairuthi)' },
      { name: 'Pooja Mandir Niche', size: '5’0” x 6’0”', vastuDirection: 'North-East' },
      { name: 'First Floor Family Lounge & Balcony', size: '14’0” x 12’6”', vastuDirection: 'North' },
      { name: 'Covered Car Porch', size: '11’0” x 15’0”', vastuDirection: 'North-West' }
    ],
    materialEstimates: { cementBags: 880, steelTons: 7.2, sandTons: 110, bricksCount: 22000 },
    features: [
      '100% Vastu compliant as per Ancient Sthapatya Veda',
      'Dual cross-ventilation shafts for continuous natural airflow',
      'Double-height ceiling in dining area for grandeur',
      'Rainwater harvesting sump integrated under car park'
    ]
  },
  {
    id: 'plan-40x60-4bhk-villa',
    title: 'The Samruddhi — 40x60 Luxury 4BHK Courtyard Villa',
    type: '4BHK Luxury Villa',
    plotDimensions: '40 ft x 60 ft (2,400 Sq.Ft Plot)',
    builtUpArea: 4100,
    facing: 'North Facing (Kubera Corner)',
    floors: 'G + 2 Storeys with Home Theatre & Terrace Deck',
    estCostTurnkey: '₹ 86.10 Lakhs',
    estCostPerSqft: 2100,
    image: '/assets/floor-plans.jpg',
    rooms: [
      { name: 'Double Height Grand Foyer', size: '16’0” x 18’0”', vastuDirection: 'North-East' },
      { name: 'Chef’s Island Kitchen + Wet Kitchen', size: '14’0” x 12’0”', vastuDirection: 'South-East' },
      { name: 'Central Green Courtyard (Brahmastana)', size: '12’0” x 12’0”', vastuDirection: 'Open Sky Central' },
      { name: 'Master Suite with Walk-in Closet', size: '18’0” x 16’0”', vastuDirection: 'South-West' },
      { name: 'Private Acoustic 7.2.4 Home Theatre', size: '18’0” x 14’0”', vastuDirection: 'West' }
    ],
    materialEstimates: { cementBags: 1650, steelTons: 14.5, sandTons: 210, bricksCount: 42000 },
    features: [
      'Open-to-sky central courtyard for ambient cooling',
      'High-grade earthquake resistant Fe 550D structural RCC design',
      'Solar rooftop 5kW provision with battery bank chamber',
      'Lift shaft provision for 4-passenger residential elevator'
    ]
  },
  {
    id: 'plan-30x50-3bhk-single',
    title: 'The Sukha — 30x50 Spacious 3BHK Single Floor Home',
    type: '3BHK Single Floor',
    plotDimensions: '30 ft x 50 ft (1,500 Sq.Ft Plot)',
    builtUpArea: 1350,
    facing: 'East Facing (Vastu Compliant)',
    floors: 'Ground Floor with Expansion Ready Pillars',
    estCostTurnkey: '₹ 25.65 Lakhs',
    estCostPerSqft: 1900,
    image: '/assets/floor-plans.jpg',
    rooms: [
      { name: 'Spacious Formal Living', size: '13’6” x 15’0”', vastuDirection: 'North-East' },
      { name: 'Semi-Open Kitchen with Breakfast Bar', size: '10’0” x 8’6”', vastuDirection: 'South-East' },
      { name: 'Master Bedroom', size: '12’0” x 13’0”', vastuDirection: 'South-West' },
      { name: 'Children / Guest Bedroom', size: '11’0” x 11’6”', vastuDirection: 'North-West' }
    ],
    materialEstimates: { cementBags: 540, steelTons: 4.5, sandTons: 70, bricksCount: 14000 },
    features: [
      'Budget-optimized design with zero dead corridor space',
      'Columns engineered to support 2 additional upper storeys',
      'Separate utility and washing machine yard',
      'Direct perimeter setbacks for 360-degree sunlight'
    ]
  },
  {
    id: 'plan-20x30-2bhk-compact',
    title: 'The Nidhi — 20x30 Compact Urban 2BHK Home',
    type: '2BHK Compact',
    plotDimensions: '20 ft x 30 ft (600 Sq.Ft Plot)',
    builtUpArea: 1100,
    facing: 'North Facing (Kubera Corner)',
    floors: 'G + 1 Storey with Covered Bike & Car Port',
    estCostTurnkey: '₹ 20.90 Lakhs',
    estCostPerSqft: 1900,
    image: '/assets/floor-plans.jpg',
    rooms: [
      { name: 'Ground Floor Living & Dining', size: '11’0” x 14’0”', vastuDirection: 'North-East' },
      { name: 'Compact Modular Kitchen', size: '7’6” x 8’0”', vastuDirection: 'South-East' },
      { name: 'First Floor Master Bedroom', size: '11’0” x 12’0”', vastuDirection: 'South-West' },
      { name: 'First Floor Guest Bedroom', size: '9’6” x 10’0”', vastuDirection: 'North-West' }
    ],
    materialEstimates: { cementBags: 440, steelTons: 3.6, sandTons: 55, bricksCount: 11000 },
    features: [
      'Designed specifically for tight 600 sqft Bangalore BDA/Panchayat plots',
      'Skylight shaft ensuring natural daytime lighting without electricity',
      'Sump & septic tank integrated under floor with zero odor ventilation'
    ]
  },
  {
    id: 'plan-50x80-commercial-rental',
    title: 'The Vaikunta — 50x80 Commercial + 6-Unit Rental Penthouse',
    type: 'Rental & Penthouse',
    plotDimensions: '50 ft x 80 ft (4,000 Sq.Ft Plot)',
    builtUpArea: 9200,
    facing: 'East Facing (Double Road Corner)',
    floors: 'G + 3 Storeys with Commercial Stilt Shops & Penthouse',
    estCostTurnkey: '₹ 1.84 Crores',
    estCostPerSqft: 2000,
    image: '/assets/floor-plans.jpg',
    rooms: [
      { name: 'Ground Floor Commercial Showrooms (3 Units)', size: '48’0” x 25’0”', vastuDirection: 'East Facing' },
      { name: 'First & Second Floors: 4 Units of 2BHK Rentals', size: '950 Sq.Ft Each', vastuDirection: 'Vastu Compliant' },
      { name: 'Third Floor: Owner’s Luxury 4BHK Penthouse', size: '2,600 Sq.Ft', vastuDirection: 'East & North' },
      { name: 'Private Rooftop Infinity Terrace Garden', size: '48’0” x 30’0”', vastuDirection: 'Open Sky' }
    ],
    materialEstimates: { cementBags: 3600, steelTons: 32.0, sandTons: 460, bricksCount: 95000 },
    features: [
      'High rental yield architecture generating estimated ₹ 1.4 Lakhs/month',
      'Dual commercial & domestic power meters setup',
      'Commercial elevator with 6-stop automated rescue device (ARD)'
    ]
  }
];
