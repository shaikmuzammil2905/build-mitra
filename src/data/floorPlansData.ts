export interface FloorPlan {
  id: string;
  title: string;
  type: '2BHK' | '3BHK Duplex' | '4BHK Luxury Villa' | 'Rental Commercial';
  plotDimensions: string;
  builtUpArea: number; // in sq.ft
  facing: 'East Facing (Vastu Compliant)' | 'North Facing (Kubera Corner)' | 'West Facing';
  floors: string;
  estCostTurnkey: string;
  estCostPerSqft: number;
  image: string;
  rooms: { name: string; size: string; vastuDirection: string }[];
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
    features: [
      'Open-to-sky central courtyard for ambient cooling',
      'High-grade earthquake resistant Fe 550D structural RCC design',
      'Solar rooftop 5kW provision with battery bank chamber',
      'Lift shaft provision for 4-passenger residential elevator'
    ]
  },
  {
    id: 'plan-30x50-2bhk-compact',
    title: 'The Sukha — 30x50 Single Floor Vastu Independent Home',
    type: '2BHK',
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
    features: [
      'Budget-optimized design with zero dead corridor space',
      'Columns engineered to support 2 additional upper storeys',
      'Separate utility and washing machine yard',
      'Direct perimeter setbacks for 360-degree sunlight'
    ]
  }
];
