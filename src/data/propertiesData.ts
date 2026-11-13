export interface PropertyInsight {
  id: string;
  title: string;
  location: string;
  subRegistrarZone: string;
  type: 'Residential Plot' | 'Independent Villa' | 'Apartment' | 'Commercial Land';
  govtGuidanceValue: number; // in ₹/sq.ft
  fairMarketValue: number; // in ₹/sq.ft
  registeredTransactionAverage: number; // in ₹/sq.ft
  oneYearGrowthForecast: number; // in %
  dimensions: string;
  totalAreaSqft: number;
  khataType: 'A-Khata' | 'BDA Allotted' | 'BMRDA Approved' | 'E-Khata';
  features: string[];
  latLng: { lat: number; lng: number };
}

export const REAL_ESTATE_INSIGHTS: PropertyInsight[] = [
  {
    id: 'prop-anjanapura-bda',
    title: 'BDA Approved Residential Villa Plot — 2nd Block',
    location: 'Anjanapura BDA Layout, 2nd Block, South Bengaluru',
    subRegistrarZone: 'Sub-Registrar Office Banashankari / Konanakunte',
    type: 'Residential Plot',
    govtGuidanceValue: 4800,
    fairMarketValue: 7900,
    registeredTransactionAverage: 7650,
    oneYearGrowthForecast: 14.8,
    dimensions: '30 ft x 50 ft',
    totalAreaSqft: 1500,
    khataType: 'BDA Allotted',
    features: ['Direct 40-ft Asphalt BDA Road', 'Cauvery Water & Underground Drainage (BWSSB)', 'Clear 30-Year Encumbrance Nil Certificate', '2.5 km from Green Line Metro Anjanapura'],
    latLng: { lat: 12.8624, lng: 77.5619 }
  },
  {
    id: 'prop-sarjapur-villa',
    title: 'Contemporary Luxury 4BHK Gated Villa',
    location: 'Sarjapur Main Road, Near Dommasandra Circle, Bengaluru',
    subRegistrarZone: 'Sub-Registrar Office Varthur / Sarjapur',
    type: 'Independent Villa',
    govtGuidanceValue: 5600,
    fairMarketValue: 9200,
    registeredTransactionAverage: 8900,
    oneYearGrowthForecast: 16.5,
    dimensions: 'Built-up 3,450 Sq.Ft on 2,400 Sq.Ft Plot',
    totalAreaSqft: 2400,
    khataType: 'A-Khata',
    features: ['100% Vastu East Facing', 'Private Splash Pool & Solar Rooftop 5kW', 'Clubhouse with Tennis & Heated Pool', 'Close to RGA Tech Park & International Schools'],
    latLng: { lat: 12.8795, lng: 77.7289 }
  },
  {
    id: 'prop-kanakapura-corridor',
    title: 'BMRDA Approved Premium Gated Community Plots',
    location: 'Kanakapura Main Road Corridor, Bengaluru South',
    subRegistrarZone: 'Sub-Registrar Office Kaggalipura',
    type: 'Residential Plot',
    govtGuidanceValue: 3200,
    fairMarketValue: 5400,
    registeredTransactionAverage: 5150,
    oneYearGrowthForecast: 18.2,
    dimensions: '40 ft x 60 ft (2,400 Sq.Ft)',
    totalAreaSqft: 2400,
    khataType: 'BMRDA Approved',
    features: ['Adjacent to Art of Living International Center', 'Wide 60ft Grand Entrance with Landscaped Boulevard', 'Ready for Bank Construction Loan Disbursement', 'Underground Optical Fiber & Streetlights'],
    latLng: { lat: 12.7850, lng: 77.5120 }
  },
  {
    id: 'prop-yelahanka-comm',
    title: 'High-Visibility Corner Commercial Land Parcel',
    location: 'Yelahanka New Town / Airport Expressway, North Bengaluru',
    subRegistrarZone: 'Sub-Registrar Office Yelahanka',
    type: 'Commercial Land',
    govtGuidanceValue: 8500,
    fairMarketValue: 14500,
    registeredTransactionAverage: 13800,
    oneYearGrowthForecast: 21.0,
    dimensions: '12,000 Sq.Ft Corner Frontage',
    totalAreaSqft: 12000,
    khataType: 'A-Khata',
    features: ['120ft Double Road Frontage with Highway Access', 'Ideal for Commercial Complex / Automobile Showroom', 'FAR / FSI allowance up to 2.75', 'Direct Metro Orange Line station planned within 800m'],
    latLng: { lat: 13.1007, lng: 77.5963 }
  },
  {
    id: 'prop-whitefield-luxury',
    title: 'The Sovereign — 3BHK Smart Residential Residence',
    location: 'Whitefield ECC Road, Near ITPL, Bengaluru East',
    subRegistrarZone: 'Sub-Registrar Office Shivajinagar / KR Puram',
    type: 'Apartment',
    govtGuidanceValue: 6200,
    fairMarketValue: 9800,
    registeredTransactionAverage: 9400,
    oneYearGrowthForecast: 15.2,
    dimensions: '1,890 Sq.Ft Carpet Area (3BHK + Servant)',
    totalAreaSqft: 1890,
    khataType: 'A-Khata',
    features: ['Walking distance to Metro & ITPL', 'IGBC Gold Certified Green Building', 'Double Height Balcony Deck', '100% Power Backup with 2 Dedicated Basement Car Parks'],
    latLng: { lat: 12.9866, lng: 77.7380 }
  },
  {
    id: 'prop-ecity-layout',
    title: 'Electronic City Phase 1 Premium Villa Sites',
    location: 'Electronic City Phase 1, Near Infosys Campus, Bengaluru',
    subRegistrarZone: 'Sub-Registrar Office Begur',
    type: 'Residential Plot',
    govtGuidanceValue: 4100,
    fairMarketValue: 6800,
    registeredTransactionAverage: 6500,
    oneYearGrowthForecast: 17.0,
    dimensions: '30 ft x 40 ft (1,200 Sq.Ft)',
    totalAreaSqft: 1200,
    khataType: 'A-Khata',
    features: ['Ready for immediate house construction', 'Underground electrical cabling & storm water drains', '5 mins to Hosur Road Elevated Expressway toll', 'Clear BDA Approved Layout Plan'],
    latLng: { lat: 12.8452, lng: 77.6602 }
  }
];

export const MICRO_MARKET_BENCHMARKS = [
  { area: 'Anjanapura BDA Layout', guidance: '₹ 4,800', market: '₹ 7,900', delta: '+64.5%', trend: 'High Demand (Metro Extension)' },
  { area: 'Kanakapura Main Road', guidance: '₹ 3,200', market: '₹ 5,400', delta: '+68.7%', trend: 'Rapid Villa Corridors' },
  { area: 'Sarjapur Road Corridor', guidance: '₹ 5,600', market: '₹ 9,200', delta: '+64.2%', trend: 'Tech Worker Influx' },
  { area: 'Whitefield / ITPL Hub', guidance: '₹ 6,200', market: '₹ 9,800', delta: '+58.0%', trend: 'Commercial Grade A' },
  { area: 'Yelahanka / Airport Rd', guidance: '₹ 8,500', market: '₹ 14,500', delta: '+70.5%', trend: 'Infrastructure Corridor' },
  { area: 'Electronic City Phase 1', guidance: '₹ 4,100', market: '₹ 6,800', delta: '+65.8%', trend: 'High Rental Yield' },
];
