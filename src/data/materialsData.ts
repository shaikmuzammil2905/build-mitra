export interface MaterialProduct {
  id: string;
  name: string;
  category: 'Cement' | 'Steel' | 'Aggregates' | 'Bricks & Blocks' | 'Electrical' | 'Plumbing';
  brand: string;
  gradeSpec: string;
  unit: string;
  basePrice: number;
  bulkPrice50: number;
  bulkPrice100: number;
  minOrder: string;
  rating: number;
  reviewsCount: number;
  inStock: boolean;
  deliveryTime: string;
  features: string[];
  description: string;
  testCertificate: string;
  supplierName: string;
  supplierCity: string;
}

export const MATERIALS_CATALOG: MaterialProduct[] = [
  {
    id: 'mat-cement-ultratech',
    name: 'UltraTech Super Cement (PPC)',
    category: 'Cement',
    brand: 'UltraTech',
    gradeSpec: 'IS 1489 (Part 1) Fly Ash Based PPC',
    unit: '50 Kg Bag',
    basePrice: 380,
    bulkPrice50: 372,
    bulkPrice100: 365,
    minOrder: '50 Bags',
    rating: 4.9,
    reviewsCount: 342,
    inStock: true,
    deliveryTime: 'Within 24 Hours',
    features: ['Micro-fine particles for dense concrete', 'High sulphate resistance', 'Low heat of hydration', 'Ideal for all RCC structural elements'],
    description: 'UltraTech Super is India’s foremost engineered Portland Pozzolana Cement formulated with high-reactivity micro-silica slag for supreme compressive strength and durable crack-free plastering.',
    testCertificate: 'NABL Certified 28-Day Strength 54.5 MPa',
    supplierName: 'BuildMitra Direct Factory Yard',
    supplierCity: 'Bengaluru'
  },
  {
    id: 'mat-steel-tatatiscon',
    name: 'Tata Tiscon 550D Super Ductile TMT Rebars',
    category: 'Steel',
    brand: 'Tata Tiscon',
    gradeSpec: 'Fe 550D High Ductility IS 1786',
    unit: 'Kg',
    basePrice: 64,
    bulkPrice50: 62.5,
    bulkPrice100: 61.2,
    minOrder: '500 Kg',
    rating: 5.0,
    reviewsCount: 512,
    inStock: true,
    deliveryTime: '24-48 Hours',
    features: ['Superior earthquake shock resistance', 'Pure virgin iron ore billet casting', 'Enhanced ribbed grip with concrete', 'High elongation > 14.5%'],
    description: 'Tata Tiscon 550D is the undisputed standard in primary structural steel. Crafted from pure virgin blast furnace steel with ultra-low carbon, phosphorus, and sulphur content to resist seismic vibrations.',
    testCertificate: 'Tata Steel Mill Test Certificate (MTC) with QR verification',
    supplierName: 'Tata Authorized Primary Distributor',
    supplierCity: 'Bengaluru & Hyderabad'
  },
  {
    id: 'mat-sand-msand',
    name: 'VSI Washed M-Sand (Manufactured Sand)',
    category: 'Aggregates',
    brand: 'RoboSilicon Premium',
    gradeSpec: 'Zone II Fine Aggregate (IS 383:2016)',
    unit: 'Ton',
    basePrice: 1800,
    bulkPrice50: 1750,
    bulkPrice100: 1690,
    minOrder: '10 Tons (1 Tipper)',
    rating: 4.8,
    reviewsCount: 198,
    inStock: true,
    deliveryTime: 'Same Day Delivery',
    features: ['Triple water-washed', 'Zero silt content (< 2%)', 'Cubical grain shape for optimal cement economy', 'Eco-friendly river sand alternative'],
    description: 'Manufactured through state-of-the-art Vertical Shaft Impactor (VSI) crushing plants. Triple-washed to remove micro-fines and organic impurities, ensuring superior bonding and zero shrinkage cracks.',
    testCertificate: 'Silt content 1.8% verified by Government Engineering College Lab',
    supplierName: 'Robo Aggregates Quarry Hub',
    supplierCity: 'Bengaluru'
  },
  {
    id: 'mat-bricks-redclay',
    name: 'First Class Machine Wirecut Red Clay Bricks',
    category: 'Bricks & Blocks',
    brand: 'Malur Kiln Premium',
    gradeSpec: 'Standard Modular 9" x 4.25" x 3"',
    unit: 'Piece',
    basePrice: 7.50,
    bulkPrice50: 7.20,
    bulkPrice100: 6.90,
    minOrder: '2,000 Pieces',
    rating: 4.7,
    reviewsCount: 167,
    inStock: true,
    deliveryTime: 'Next Day Delivery',
    features: ['Machine pressed with sharp edges', 'High crushing strength > 8.5 N/mm²', 'Uniform deep terracotta cherry red color', 'Water absorption < 12%'],
    description: 'High-density burnt red clay bricks fired in continuous Hoffman kilns. Ensures razor-sharp rectangular edges, reducing mortar consumption by 20% and providing unmatched thermal insulation.',
    testCertificate: 'Crushing strength: 8.8 N/mm² (IS 1077 compliant)',
    supplierName: 'Malur Brick Manufacturers Cooperative',
    supplierCity: 'Kolar & Bengaluru'
  },
  {
    id: 'mat-blocks-siporex',
    name: 'Birla Aerocon AAC Light Weight Blocks',
    category: 'Bricks & Blocks',
    brand: 'Birla Aerocon',
    gradeSpec: '600 mm x 200 mm x 150 mm (IS 2185 Part 3)',
    unit: 'Block',
    basePrice: 68,
    bulkPrice50: 65,
    bulkPrice100: 62,
    minOrder: '300 Blocks',
    rating: 4.9,
    reviewsCount: 224,
    inStock: true,
    deliveryTime: '24-48 Hours',
    features: ['3x lighter than clay bricks', '4-hour fire rating', 'Superior thermal and acoustic insulation', 'Saves 25% on structural RCC framework'],
    description: 'Autoclaved Aerated Concrete blocks precision cut to millimeter tolerances. Speeds up masonry speed by 3x while drastically reducing dead load on multistory columns.',
    testCertificate: 'Density 580 kg/m³ | Thermal conductivity 0.16 W/mK',
    supplierName: 'Birla Aerocon Master Depot',
    supplierCity: 'Bengaluru'
  },
  {
    id: 'mat-electrical-polycab',
    name: 'Polycab Green FR-LSH Copper Multi-strand Wire',
    category: 'Electrical',
    brand: 'Polycab',
    gradeSpec: '2.5 sq.mm Flame Retardant Low Smoke (IS 694)',
    unit: '90m Coil',
    basePrice: 2850,
    bulkPrice50: 2740,
    bulkPrice100: 2650,
    minOrder: '5 Coils',
    rating: 4.9,
    reviewsCount: 289,
    inStock: true,
    deliveryTime: 'Within 24 Hours',
    features: ['100% pure electrolytic grade copper (99.97%)', 'Low smoke halogen free insulation', 'Energy saving oxygen free conductor', 'Withstands voltage surges up to 1100V'],
    description: 'Polycab Green wires are engineered with advanced FR-LSH PVC compound that emits non-toxic clear gas during fire incidents, giving vital escape time and zero circuit degradation.',
    testCertificate: 'IS 694 with CE & RoHS Certification',
    supplierName: 'Polycab Authorized Distributor',
    supplierCity: 'Bengaluru & Pan-India'
  },
  {
    id: 'mat-plumbing-ashirvad',
    name: 'Ashirvad FlowGuard Plus CPVC Hot & Cold Pipes',
    category: 'Plumbing',
    brand: 'Ashirvad Pipes',
    gradeSpec: 'SDR 11 Class 1 (3/4" - 20mm) IS 15778',
    unit: '3 Meter Length',
    basePrice: 380,
    bulkPrice50: 360,
    bulkPrice100: 345,
    minOrder: '20 Pipes',
    rating: 4.9,
    reviewsCount: 310,
    inStock: true,
    deliveryTime: 'Same Day Delivery',
    features: ['Withstands temperature up to 93°C', 'Zero bacterial biofilm growth', '100% corrosion and scaling resistant', '50+ year design service life'],
    description: 'Ashirvad FlowGuard Plus is manufactured using specialty Lubrizol CPVC compound. NSF certified for drinking water safety with superior hydrostatic burst pressure.',
    testCertificate: 'NSF-61 International Drinking Water Certified',
    supplierName: 'Ashirvad Direct Logistics',
    supplierCity: 'Bengaluru'
  }
];

