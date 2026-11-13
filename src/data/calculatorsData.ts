export interface CalculatorField {
  id: string;
  label: string;
  type: 'number' | 'select';
  defaultValue: number | string;
  unit?: string;
  options?: { label: string; value: string | number }[];
  step?: number;
  min?: number;
  max?: number;
}

export interface CalculatorResultItem {
  label: string;
  value: string | number;
  unit: string;
  highlight?: boolean;
}

export interface EngineeringCalculator {
  id: string;
  number: string;
  title: string;
  category: 'Structural' | 'Finishes' | 'MEP' | 'Site & Civils' | 'Specialized';
  icon: string;
  description: string;
  isStandard: string;
  fields: CalculatorField[];
  calculate: (inputs: Record<string, any>) => {
    results: CalculatorResultItem[];
    estimatedCost: number;
    notes: string[];
    boqItems: { item: string; quantity: number; unit: string; rate: number; total: number }[];
  };
}

export const ALL_19_CALCULATORS: EngineeringCalculator[] = [
  {
    id: 'concrete',
    number: '01',
    title: 'Concrete Mix & Materials Calculator',
    category: 'Structural',
    icon: 'Layers',
    description: 'Calculates volume, cement bags, fine aggregate (sand), coarse aggregate (20mm metal), and water for grades M10, M15, M20, M25 (IS 456).',
    isStandard: 'IS 456:2000 & IS 10262 Mix Design Standards',
    fields: [
      { id: 'length', label: 'Member Length', type: 'number', defaultValue: 10, unit: 'm', step: 0.1 },
      { id: 'width', label: 'Member Width', type: 'number', defaultValue: 4, unit: 'm', step: 0.1 },
      { id: 'depth', label: 'Thickness / Depth', type: 'number', defaultValue: 0.15, unit: 'm', step: 0.01 },
      {
        id: 'grade',
        label: 'Concrete Grade',
        type: 'select',
        defaultValue: 'M20',
        options: [
          { label: 'M10 (1 : 3 : 6) - PCC / Foundation Bed', value: 'M10' },
          { label: 'M15 (1 : 2 : 4) - Flooring & Mass Work', value: 'M15' },
          { label: 'M20 (1 : 1.5 : 3) - Standard RCC Slabs & Beams', value: 'M20' },
          { label: 'M25 (1 : 1 : 2) - Heavy RCC Columns & Footings', value: 'M25' },
        ]
      },
      { id: 'wastage', label: 'Safety Wastage Margin', type: 'number', defaultValue: 5, unit: '%', step: 1 }
    ],
    calculate: (inputs) => {
      const L = parseFloat(inputs.length) || 0;
      const W = parseFloat(inputs.width) || 0;
      const D = parseFloat(inputs.depth) || 0;
      const wastage = (parseFloat(inputs.wastage) || 0) / 100;
      const wetVol = L * W * D;
      const dryVol = wetVol * 1.54 * (1 + wastage); // Dry volume multiplier 1.54

      let cPart = 1, sPart = 1.5, aPart = 3;
      if (inputs.grade === 'M10') { cPart = 1; sPart = 3; aPart = 6; }
      else if (inputs.grade === 'M15') { cPart = 1; sPart = 2; aPart = 4; }
      else if (inputs.grade === 'M25') { cPart = 1; sPart = 1; aPart = 2; }
      const totalParts = cPart + sPart + aPart;

      const cementVol = (dryVol * cPart) / totalParts;
      const cementKg = cementVol * 1440; // 1440 kg/m3 density of cement
      const cementBags = Math.ceil(cementKg / 50);

      const sandVol = (dryVol * sPart) / totalParts;
      const sandTon = Math.round(sandVol * 1.6 * 10) / 10; // 1600 kg/m3

      const aggVol = (dryVol * aPart) / totalParts;
      const aggTon = Math.round(aggVol * 1.55 * 10) / 10;

      const waterLiters = Math.round(cementKg * 0.45); // w/c ratio 0.45

      const cementCost = cementBags * 380;
      const sandCost = sandTon * 1800;
      const aggCost = aggTon * 1250;
      const totalCost = cementCost + sandCost + aggCost;

      return {
        results: [
          { label: 'Wet Concrete Volume', value: wetVol.toFixed(2), unit: 'm³' },
          { label: 'Dry Batch Volume (with wastage)', value: dryVol.toFixed(2), unit: 'm³' },
          { label: 'Cement Required (50kg bags)', value: cementBags, unit: 'Bags', highlight: true },
          { label: 'M-Sand / Fine Aggregate', value: sandTon, unit: 'Tons' },
          { label: '20mm Coarse Aggregate', value: aggTon, unit: 'Tons' },
          { label: 'Water (w/c ratio 0.45)', value: waterLiters, unit: 'Liters' }
        ],
        estimatedCost: totalCost,
        notes: [
          'Calculated as per IS 456-2000 standard nominal mix ratios with dry volume conversion factor of 1.54.',
          'Always cure RCC elements for minimum 14 to 21 days for full compressive strength.'
        ],
        boqItems: [
          { item: `Cement 50kg Bags (${inputs.grade})`, quantity: cementBags, unit: 'Bags', rate: 380, total: cementCost },
          { item: 'M-Sand Washed', quantity: sandTon, unit: 'Tons', rate: 1800, total: sandCost },
          { item: 'Coarse Aggregate 20mm', quantity: aggTon, unit: 'Tons', rate: 1250, total: aggCost }
        ]
      };
    }
  },
  {
    id: 'steel',
    number: '02',
    title: 'TMT Steel & Rebar Weight Calculator',
    category: 'Structural',
    icon: 'Maximize2',
    description: 'Calculates rebar weight using standard IS formula (d²/162 * Length), bundle requirements, and cost estimates for Fe 500D / Fe 550D.',
    isStandard: 'IS 1786:2008 Standard Bar Weight Specifications',
    fields: [
      {
        id: 'diameter',
        label: 'Rebar Diameter (d)',
        type: 'select',
        defaultValue: '12',
        options: [
          { label: '8 mm (Stirrups / Ties)', value: '8' },
          { label: '10 mm (Slab Distribution)', value: '10' },
          { label: '12 mm (Main Slab / Light Column)', value: '12' },
          { label: '16 mm (Beam / Column Main Rebars)', value: '16' },
          { label: '20 mm (Heavy Structural Beams)', value: '20' },
          { label: '25 mm (Heavy Foundation Columns)', value: '25' },
          { label: '32 mm (Deep Foundations / Piers)', value: '32' },
        ]
      },
      { id: 'numBars', label: 'Number of Rebars (12m Standard Length)', type: 'number', defaultValue: 50, unit: 'Pcs', step: 1 },
      { id: 'customLength', label: 'Or Total Custom Length (m)', type: 'number', defaultValue: 600, unit: 'm', step: 5 },
      { id: 'ratePerKg', label: 'Current Steel Rate per Kg', type: 'number', defaultValue: 62, unit: '₹/Kg', step: 0.5 }
    ],
    calculate: (inputs) => {
      const d = parseFloat(inputs.diameter) || 12;
      const unitWeight = (d * d) / 162.28; // kg per meter as per IS 1786
      const length = parseFloat(inputs.customLength) || (parseFloat(inputs.numBars) * 12);
      const totalKg = Math.round(unitWeight * length);
      const metricTons = (totalKg / 1000).toFixed(2);
      const rate = parseFloat(inputs.ratePerKg) || 62;
      const totalCost = Math.round(totalKg * rate);

      return {
        results: [
          { label: 'Weight per Meter', value: unitWeight.toFixed(3), unit: 'kg/m' },
          { label: 'Standard 12m Bar Weight', value: (unitWeight * 12).toFixed(2), unit: 'kg/bar' },
          { label: 'Total Rebar Weight', value: totalKg, unit: 'Kg', highlight: true },
          { label: 'Metric Tons', value: metricTons, unit: 'MT' }
        ],
        estimatedCost: totalCost,
        notes: [
          'Calculated using the engineering derivation: W = d² / 162.28 kg/m based on 7850 kg/m³ steel density.',
          'Standard factory bundle sizes: 8mm (10 pcs), 10mm (7 pcs), 12mm (5 pcs), 16mm (3 pcs), 20mm (2 pcs).'
        ],
        boqItems: [
          { item: `TMT Rebar Fe 550D ${d}mm`, quantity: totalKg, unit: 'Kg', rate: rate, total: totalCost }
        ]
      };
    }
  },
  {
    id: 'tile',
    number: '03',
    title: 'Floor & Wall Tile Calculator',
    category: 'Finishes',
    icon: 'Grid',
    description: 'Calculates tile box quantities, adhesive cement bags, spacer joints, and floor laying costs with smart cut-piece wastage optimization.',
    isStandard: 'IS 15622 Ceramic & Vitrified Tile Standards',
    fields: [
      { id: 'roomLength', label: 'Room Length', type: 'number', defaultValue: 15, unit: 'ft', step: 0.5 },
      { id: 'roomWidth', label: 'Room Width', type: 'number', defaultValue: 12, unit: 'ft', step: 0.5 },
      {
        id: 'tileSize',
        label: 'Tile Dimensions',
        type: 'select',
        defaultValue: '2x2',
        options: [
          { label: '600 x 600 mm (2ft x 2ft) - 4 pcs/box', value: '2x2' },
          { label: '1200 x 600 mm (4ft x 2ft) - 2 pcs/box', value: '4x2' },
          { label: '800 x 800 mm (2.6ft x 2.6ft) - 3 pcs/box', value: '2.6x2.6' },
          { label: '300 x 450 mm (Wall Tile) - 6 pcs/box', value: '1x1.5' },
        ]
      },
      { id: 'wastage', label: 'Cutting Wastage & Skirting Margin', type: 'number', defaultValue: 10, unit: '%', step: 1 },
      { id: 'tileRate', label: 'Tile Price per Sq.Ft', type: 'number', defaultValue: 55, unit: '₹/sq.ft', step: 2 }
    ],
    calculate: (inputs) => {
      const L = parseFloat(inputs.roomLength) || 0;
      const W = parseFloat(inputs.roomWidth) || 0;
      const carpetSqft = L * W;
      const wastage = (parseFloat(inputs.wastage) || 10) / 100;
      const grossSqft = Math.round(carpetSqft * (1 + wastage));

      let boxCoverage = 16; // default 2x2 = 16 sqft/box
      if (inputs.tileSize === '4x2') boxCoverage = 15.5;
      else if (inputs.tileSize === '2.6x2.6') boxCoverage = 20.6;
      else if (inputs.tileSize === '1x1.5') boxCoverage = 9;

      const boxes = Math.ceil(grossSqft / boxCoverage);
      const adhesiveBags = Math.ceil(grossSqft / 55); // 1 bag of 20kg covers ~55 sqft at 3mm bed
      const tileRate = parseFloat(inputs.tileRate) || 55;
      const tileCost = grossSqft * tileRate;
      const adhesiveCost = adhesiveBags * 350;
      const laborCost = grossSqft * 22; // ₹22/sqft laying
      const totalCost = tileCost + adhesiveCost + laborCost;

      return {
        results: [
          { label: 'Carpet Area', value: carpetSqft.toFixed(1), unit: 'Sq.Ft' },
          { label: 'Gross Tile Area (incl. Skirting)', value: grossSqft, unit: 'Sq.Ft' },
          { label: 'Tile Boxes Required', value: boxes, unit: 'Boxes', highlight: true },
          { label: 'Tile Adhesive (20kg bags)', value: adhesiveBags, unit: 'Bags' },
          { label: 'Tile Spacers (2mm)', value: '1 Packet', unit: '100 pcs' }
        ],
        estimatedCost: totalCost,
        notes: [
          'Calculated assuming 10% allowance for diagonal cutting, corner cuts, and 4-inch wall perimeter skirting.',
          'Using polymer-modified tile adhesive prevents hollow sounds and tile debonding.'
        ],
        boqItems: [
          { item: 'Vitrified Tiles (Boxes)', quantity: boxes, unit: 'Boxes', rate: boxCoverage * tileRate, total: tileCost },
          { item: 'Tile Adhesive 20kg', quantity: adhesiveBags, unit: 'Bags', rate: 350, total: adhesiveCost },
          { item: 'Tile Laying Labour', quantity: grossSqft, unit: 'Sq.Ft', rate: 22, total: laborCost }
        ]
      };
    }
  },
  {
    id: 'paint',
    number: '04',
    title: 'Paint, Primer & Wall Putty Calculator',
    category: 'Finishes',
    icon: 'Droplets',
    description: 'Accurately estimates wall putty (in Kg), primer (in Liters), and premium emulsion paint (in Liters) for interior and exterior surfaces.',
    isStandard: 'IS 5410 & Asian Paints Technical Spreading Norms',
    fields: [
      { id: 'carpetArea', label: 'Built-up Carpet Area', type: 'number', defaultValue: 1200, unit: 'sq.ft', step: 50 },
      {
        id: 'surfaceType',
        label: 'Surface Finish',
        type: 'select',
        defaultValue: 'interior-fresh',
        options: [
          { label: 'Fresh Interior Plaster (Putty + Primer + 2 Coats Emulsion)', value: 'interior-fresh' },
          { label: 'Interior Repainting (Touch-up Putty + 2 Coats Emulsion)', value: 'interior-repaint' },
          { label: 'Exterior Walls (Weatherproof 2 Coats)', value: 'exterior' },
        ]
      },
      { id: 'coats', label: 'Number of Finish Coats', type: 'number', defaultValue: 2, unit: 'Coats', min: 1, max: 3 }
    ],
    calculate: (inputs) => {
      const carpet = parseFloat(inputs.carpetArea) || 0;
      // Multiplier rule for wall surface: Wall area approx 3.2x to 3.5x carpet area
      const wallArea = Math.round(carpet * 3.3);
      const isFresh = inputs.surfaceType === 'interior-fresh';

      const puttyKg = isFresh ? Math.ceil(wallArea / 12) : Math.ceil(wallArea / 35); // 1kg covers 10-14 sqft 2 coats
      const primerLiters = Math.ceil(wallArea / 130); // 1L covers 120-140 sqft
      const paintLiters = Math.ceil((wallArea * 2) / 140); // 1L covers 65-75 sqft 2 coats

      const puttyCost = puttyKg * 22; // ₹22/kg
      const primerCost = primerLiters * 180;
      const paintCost = paintLiters * 320;
      const laborCost = wallArea * 14;
      const totalCost = puttyCost + primerCost + paintCost + laborCost;

      return {
        results: [
          { label: 'Total Wall & Ceiling Area', value: wallArea, unit: 'Sq.Ft' },
          { label: 'Acrylic Wall Putty Required', value: puttyKg, unit: 'Kg', highlight: true },
          { label: 'Primer Required', value: primerLiters, unit: 'Liters' },
          { label: 'Premium Emulsion Paint', value: paintLiters, unit: 'Liters', highlight: true }
        ],
        estimatedCost: totalCost,
        notes: [
          'Wall surface calculated using 3.3x factor of carpet area including ceiling and deducting standard door/window openings.',
          'Allow 6-8 hours drying time between consecutive paint coats for optimum durability.'
        ],
        boqItems: [
          { item: 'White Cement Wall Putty', quantity: puttyKg, unit: 'Kg', rate: 22, total: puttyCost },
          { item: 'Water-based Wall Primer', quantity: primerLiters, unit: 'Liters', rate: 180, total: primerCost },
          { item: 'Premium Acrylic Emulsion', quantity: paintLiters, unit: 'Liters', rate: 320, total: paintCost },
          { item: 'Professional Painting Labour', quantity: wallArea, unit: 'Sq.Ft', rate: 14, total: laborCost }
        ]
      };
    }
  },
  {
    id: 'blockwork',
    number: '05',
    title: 'AAC Blockwork & Adhesive Calculator',
    category: 'Structural',
    icon: 'Box',
    description: 'Calculates Autoclaved Aerated Concrete (AAC) blocks count, thin-bed polymer adhesive bags, and joint volume for interior and exterior walls.',
    isStandard: 'IS 2185 (Part 3) Autoclaved Cellular Concrete Blocks',
    fields: [
      { id: 'wallLength', label: 'Wall Total Length', type: 'number', defaultValue: 30, unit: 'ft', step: 1 },
      { id: 'wallHeight', label: 'Wall Height', type: 'number', defaultValue: 10, unit: 'ft', step: 0.5 },
      {
        id: 'blockSize',
        label: 'Block Thickness',
        type: 'select',
        defaultValue: '150',
        options: [
          { label: '100 mm (4 inch) - Partition Walls', value: '100' },
          { label: '150 mm (6 inch) - Standard External Walls', value: '150' },
          { label: '200 mm (8 inch) - Heavy Load / Soundproof Walls', value: '200' },
        ]
      },
      { id: 'openings', label: 'Openings Deduction (Doors & Windows)', type: 'number', defaultValue: 45, unit: 'sq.ft', step: 5 }
    ],
    calculate: (inputs) => {
      const L = (parseFloat(inputs.wallLength) || 0) * 0.3048; // to meters
      const H = (parseFloat(inputs.wallHeight) || 0) * 0.3048;
      const openSqft = parseFloat(inputs.openings) || 0;
      const netWallAreaSqft = ((parseFloat(inputs.wallLength) || 0) * (parseFloat(inputs.wallHeight) || 0)) - openSqft;

      // AAC Block face dimensions: 600mm x 200mm = 0.6m x 0.2m = 0.12 m²
      const blockFaceAreaSqft = 0.6 * 0.2 * 10.764; // ~1.29 sqft
      const blocksCount = Math.ceil((netWallAreaSqft / blockFaceAreaSqft) * 1.05); // 5% wastage

      // Block joint adhesive: 1 bag (40kg) covers ~120-140 blocks of 150mm
      const adhesiveBags = Math.ceil(blocksCount / 120);

      const blockRate = inputs.blockSize === '100' ? 52 : inputs.blockSize === '150' ? 68 : 88;
      const blockCost = blocksCount * blockRate;
      const adhesiveCost = adhesiveBags * 450;
      const laborCost = Math.round(netWallAreaSqft * 18);
      const totalCost = blockCost + adhesiveCost + laborCost;

      return {
        results: [
          { label: 'Net Masonry Wall Area', value: netWallAreaSqft.toFixed(1), unit: 'Sq.Ft' },
          { label: 'AAC Blocks Required', value: blocksCount, unit: 'Blocks', highlight: true },
          { label: 'Thin Bed Joint Adhesive (40kg)', value: adhesiveBags, unit: 'Bags' },
          { label: 'Mortar Joint Thickness', value: '3 - 4', unit: 'mm' }
        ],
        estimatedCost: totalCost,
        notes: [
          'Using thin-bed polymer adhesive eliminates curing requirement and saves up to 75% on conventional sand-cement mortar.',
          'Blocks provide 3x better thermal insulation compared to traditional red bricks.'
        ],
        boqItems: [
          { item: `AAC Blocks 600x200x${inputs.blockSize}mm`, quantity: blocksCount, unit: 'Blocks', rate: blockRate, total: blockCost },
          { item: 'Polymer Block Joint Mortar (40kg)', quantity: adhesiveBags, unit: 'Bags', rate: 450, total: adhesiveCost },
          { item: 'Block Laying Skilled Masonry', quantity: Math.round(netWallAreaSqft), unit: 'Sq.Ft', rate: 18, total: laborCost }
        ]
      };
    }
  },
  {
    id: 'brickwork',
    number: '06',
    title: 'Red Clay Brick Masonry Calculator',
    category: 'Structural',
    icon: 'Square',
    description: 'Estimates red burnt clay bricks, cement bags, and river sand/M-sand for 9-inch and 4.5-inch walls with standard 1:6 or 1:4 mortar.',
    isStandard: 'IS 2212 Brick Masonry Code of Practice',
    fields: [
      { id: 'wallLength', label: 'Wall Length', type: 'number', defaultValue: 25, unit: 'ft', step: 1 },
      { id: 'wallHeight', label: 'Wall Height', type: 'number', defaultValue: 10, unit: 'ft', step: 0.5 },
      {
        id: 'wallThickness',
        label: 'Wall Thickness',
        type: 'select',
        defaultValue: '9',
        options: [
          { label: '9 inch (230 mm) - Main External Wall', value: '9' },
          { label: '4.5 inch (115 mm) - Internal Partition Wall', value: '4.5' },
        ]
      },
      {
        id: 'mortarMix',
        label: 'Cement Mortar Mix Ratio',
        type: 'select',
        defaultValue: '1:6',
        options: [
          { label: '1 : 6 (1 Cement : 6 Sand) - Standard', value: '1:6' },
          { label: '1 : 4 (1 Cement : 4 Sand) - High Strength / Parapet', value: '1:4' },
        ]
      }
    ],
    calculate: (inputs) => {
      const L = parseFloat(inputs.wallLength) || 0;
      const H = parseFloat(inputs.wallHeight) || 0;
      const areaSqft = L * H;
      const is9Inch = inputs.wallThickness === '9';

      // Rule of thumb: 1 sq.ft of 9-inch wall takes ~10.5 bricks, 4.5-inch takes ~5.25 bricks
      const bricksPerSqft = is9Inch ? 10.5 : 5.25;
      const bricksCount = Math.ceil(areaSqft * bricksPerSqft * 1.05); // 5% breakage

      // Mortar requirements
      const cementBags = is9Inch ? Math.ceil(areaSqft * 0.055) : Math.ceil(areaSqft * 0.028);
      const sandTons = is9Inch ? Math.round(areaSqft * 0.012 * 10) / 10 : Math.round(areaSqft * 0.006 * 10) / 10;

      const brickCost = bricksCount * 7.5;
      const cementCost = cementBags * 380;
      const sandCost = sandTons * 1800;
      const laborCost = areaSqft * (is9Inch ? 32 : 18);
      const totalCost = brickCost + cementCost + sandCost + laborCost;

      return {
        results: [
          { label: 'Wall Elevation Area', value: areaSqft, unit: 'Sq.Ft' },
          { label: 'Standard Red Bricks Required', value: bricksCount, unit: 'Pcs', highlight: true },
          { label: 'Cement Required (50kg bags)', value: cementBags, unit: 'Bags' },
          { label: 'Plastering / Masonry Sand', value: sandTons, unit: 'Tons' }
        ],
        estimatedCost: totalCost,
        notes: [
          'Calculated for standard modular red clay brick size 9" x 4" x 3" with 10mm mortar joints.',
          'Bricks must be immersed in water for at least 2 hours before laying to prevent moisture absorption from mortar.'
        ],
        boqItems: [
          { item: 'Red Clay Wirecut Bricks', quantity: bricksCount, unit: 'Pcs', rate: 7.5, total: brickCost },
          { item: 'OPC Cement 50kg Bags', quantity: cementBags, unit: 'Bags', rate: 380, total: cementCost },
          { item: 'M-Sand Washed', quantity: sandTons, unit: 'Tons', rate: 1800, total: sandCost },
          { item: 'Masonry Labour & Scaffolding', quantity: areaSqft, unit: 'Sq.Ft', rate: is9Inch ? 32 : 18, total: laborCost }
        ]
      };
    }
  },
  {
    id: 'structural',
    number: '07',
    title: 'Column & Beam Axial Load Calculator',
    category: 'Structural',
    icon: 'Columns',
    description: 'Preliminary structural estimation of column axial load capacity Pu = 0.4*fck*Ac + 0.67*fy*Asc as per IS 456 Clause 39.3.',
    isStandard: 'IS 456:2000 Clause 39.3 Short Columns Design',
    fields: [
      { id: 'colWidth', label: 'Column Breadth (b)', type: 'number', defaultValue: 300, unit: 'mm', step: 50 },
      { id: 'colDepth', label: 'Column Depth (D)', type: 'number', defaultValue: 450, unit: 'mm', step: 50 },
      {
        id: 'fck',
        label: 'Concrete Characteristic Strength (fck)',
        type: 'select',
        defaultValue: '25',
        options: [
          { label: 'M20 (20 N/mm²)', value: '20' },
          { label: 'M25 (25 N/mm²)', value: '25' },
          { label: 'M30 (30 N/mm²)', value: '30' },
        ]
      },
      { id: 'steelPercent', label: 'Longitudinal Rebar Percentage', type: 'number', defaultValue: 1.5, unit: '%', step: 0.1, min: 0.8, max: 4.0 },
      { id: 'numFloors', label: 'Number of Floors Supported', type: 'number', defaultValue: 2, unit: 'Floors', step: 1 }
    ],
    calculate: (inputs) => {
      const b = parseFloat(inputs.colWidth) || 300;
      const D = parseFloat(inputs.colDepth) || 450;
      const Ag = b * D; // gross area mm2
      const p = parseFloat(inputs.steelPercent) || 1.5;
      const Asc = (p / 100) * Ag; // steel area
      const Ac = Ag - Asc; // concrete area
      const fck = parseFloat(inputs.fck) || 25;
      const fy = 500; // Fe 500

      // IS 456 formula for axial load: Pu = 0.4*fck*Ac + 0.67*fy*Asc in Newtons
      const Pu_kN = Math.round((0.4 * fck * Ac + 0.67 * fy * Asc) / 1000);
      const safeLoadTons = Math.round(Pu_kN / (1.5 * 9.81)); // working load with 1.5 factor of safety

      return {
        results: [
          { label: 'Gross Cross-Section Area', value: (Ag / 10000).toFixed(1), unit: 'x10⁴ mm²' },
          { label: 'Longitudinal Rebar Area', value: Math.round(Asc), unit: 'mm²' },
          { label: 'Ultimate Axial Load (Pu)', value: Pu_kN, unit: 'kN', highlight: true },
          { label: 'Safe Working Load Capacity', value: safeLoadTons, unit: 'Metric Tons', highlight: true }
        ],
        estimatedCost: 18500, // sample benchmark column cost
        notes: [
          'Calculated in accordance with IS 456:2000 Clause 39.3 for short axial columns with minimum eccentricity.',
          'Formal structural drawings must be validated by a registered structural engineer for wind, seismic, and moment loads.'
        ],
        boqItems: [
          { item: `RCC Column ${b}x${D}mm (incl. shuttering & steel)`, quantity: parseFloat(inputs.numFloors) * 3, unit: 'R.Mtr', rate: 2200, total: parseFloat(inputs.numFloors) * 3 * 2200 }
        ]
      };
    }
  },
  {
    id: 'electrical',
    number: '08',
    title: 'Electrical Wiring & Conduit Pipe Calculator',
    category: 'MEP',
    icon: 'Zap',
    description: 'Calculates PVC conduit piping, wire coils (1.5 sq mm, 2.5 sq mm, 4 sq mm), modular switch boxes, and MCB distribution poles.',
    isStandard: 'IS 732 Wiring Installations & National Electrical Code (NEC)',
    fields: [
      { id: 'builtUpArea', label: 'Built-up Home Area', type: 'number', defaultValue: 1500, unit: 'sq.ft', step: 100 },
      { id: 'bedrooms', label: 'Number of Bedrooms', type: 'number', defaultValue: 3, unit: 'BHK', step: 1 },
      { id: 'acPoints', label: 'AC Power Points (16A / 25A)', type: 'number', defaultValue: 4, unit: 'Points', step: 1 },
      { id: 'geyserPoints', label: 'Geyser / Heavy Appliance Points', type: 'number', defaultValue: 3, unit: 'Points', step: 1 }
    ],
    calculate: (inputs) => {
      const area = parseFloat(inputs.builtUpArea) || 1500;
      const ac = parseFloat(inputs.acPoints) || 4;
      const geyser = parseFloat(inputs.geyserPoints) || 3;

      // Conduit rule: ~1.2 meters of 25mm PVC conduit per sq.ft
      const conduitPipes = Math.ceil((area * 0.35) / 3); // 3m pipe length
      const wire1_5 = Math.ceil(area / 300); // 90m coils for lighting
      const wire2_5 = Math.ceil(area / 400); // for 6A/16A socket circuits
      const wire4_0 = Math.ceil((ac + geyser) * 0.4); // for high-draw heavy appliances

      const totalCost = (conduitPipes * 110) + (wire1_5 * 1950) + (wire2_5 * 2850) + (wire4_0 * 4200) + (area * 35);

      return {
        results: [
          { label: 'Heavy Duty 25mm PVC Conduits (3m)', value: conduitPipes, unit: 'Pipes' },
          { label: '1.5 sq.mm FR Wire Coils (90m)', value: wire1_5, unit: 'Coils', highlight: true },
          { label: '2.5 sq.mm FR Wire Coils (90m)', value: wire2_5, unit: 'Coils' },
          { label: '4.0 sq.mm Power Wire Coils (90m)', value: wire4_0, unit: 'Coils' }
        ],
        estimatedCost: totalCost,
        notes: [
          'Wire sizing complies with IS 694 for Flame Retardant (FR) copper multi-strand conductors.',
          'Separate dedicated neutral and earth grounding must be provided for every high-wattage AC and geyser circuit.'
        ],
        boqItems: [
          { item: 'Finolex / Polycab 1.5 sq.mm Wire', quantity: wire1_5, unit: 'Coils', rate: 1950, total: wire1_5 * 1950 },
          { item: 'Finolex / Polycab 2.5 sq.mm Wire', quantity: wire2_5, unit: 'Coils', rate: 2850, total: wire2_5 * 2850 },
          { item: 'Finolex / Polycab 4.0 sq.mm Wire', quantity: wire4_0, unit: 'Coils', rate: 4200, total: wire4_0 * 4200 },
          { item: '25mm Heavy Duty PVC Conduit Pipes', quantity: conduitPipes, unit: 'Pcs', rate: 110, total: conduitPipes * 110 }
        ]
      };
    }
  },
  {
    id: 'plumbing',
    number: '09',
    title: 'Plumbing CPVC & UPVC Pipe Calculator',
    category: 'MEP',
    icon: 'Wrench',
    description: 'Calculates CPVC hot/cold water supply lines, SWR drainage pipes, brass fittings, valves, and sanitary rough-in requirements.',
    isStandard: 'IS 15778 CPVC & IS 13592 Drainage Piping Standards',
    fields: [
      { id: 'bathrooms', label: 'Number of Bathrooms', type: 'number', defaultValue: 3, unit: 'Toilets', step: 1 },
      { id: 'kitchens', label: 'Number of Kitchens', type: 'number', defaultValue: 1, unit: 'Kitchens', step: 1 },
      { id: 'numFloors', label: 'Building Storeys / Floors', type: 'number', defaultValue: 2, unit: 'Floors', step: 1 }
    ],
    calculate: (inputs) => {
      const baths = parseFloat(inputs.bathrooms) || 3;
      const kitchens = parseFloat(inputs.kitchens) || 1;
      const floors = parseFloat(inputs.numFloors) || 2;

      const cpvcPipes = (baths * 6) + (kitchens * 4) + (floors * 5); // 3m pipe pieces
      const drainPipes = (baths * 4) + (kitchens * 3) + (floors * 6);
      const brassFittings = (baths * 14) + (kitchens * 8);

      const totalCost = (cpvcPipes * 380) + (drainPipes * 620) + (brassFittings * 140) + (baths * 7500);

      return {
        results: [
          { label: 'CPVC Water Supply Pipes (3m)', value: cpvcPipes, unit: 'Pipes', highlight: true },
          { label: 'UPVC / SWR Waste Drainage Pipes', value: drainPipes, unit: 'Pipes' },
          { label: 'Brass Elbows & Concealed Fittings', value: brassFittings, unit: 'Pcs' },
          { label: 'Full Flow Ball Valves', value: baths + 2, unit: 'Units' }
        ],
        estimatedCost: totalCost,
        notes: [
          'CPVC SDR 11 pipes rated for hot and cold pressure up to 28 kg/cm².',
          'Always conduct hydraulic pressure leak testing at 10 kg/cm² before plastering and tile cladding.'
        ],
        boqItems: [
          { item: 'Ashirvad / Astral CPVC Pipes', quantity: cpvcPipes, unit: 'Pipes', rate: 380, total: cpvcPipes * 380 },
          { item: 'SWR 110mm / 75mm Drainage Pipes', quantity: drainPipes, unit: 'Pipes', rate: 620, total: drainPipes * 620 },
          { item: 'Sanitary & Concealed Brass Fittings', quantity: brassFittings, unit: 'Pcs', rate: 140, total: brassFittings * 140 }
        ]
      };
    }
  },
  {
    id: 'plastering',
    number: '10',
    title: 'Cement Plastering Materials Calculator',
    category: 'Finishes',
    icon: 'Paintbrush',
    description: 'Computes cement bags and fine sand for internal wall plaster (12mm at 1:4), external plaster (20mm double coat at 1:4), and ceiling (6mm at 1:3).',
    isStandard: 'IS 1661 Code of Practice for Cement Plaster',
    fields: [
      { id: 'surfaceArea', label: 'Total Plaster Surface Area', type: 'number', defaultValue: 1200, unit: 'sq.ft', step: 50 },
      {
        id: 'plasterType',
        label: 'Plaster Application Type',
        type: 'select',
        defaultValue: 'internal-12mm',
        options: [
          { label: 'Internal Wall Plaster (12 mm, Mix 1 : 4)', value: 'internal-12mm' },
          { label: 'Internal Wall Plaster (15 mm, Mix 1 : 6)', value: 'internal-15mm' },
          { label: 'External Double-Coat Plaster (20 mm, Mix 1 : 4)', value: 'external-20mm' },
          { label: 'Ceiling Smooth Plaster (6 mm, Mix 1 : 3)', value: 'ceiling-6mm' },
        ]
      }
    ],
    calculate: (inputs) => {
      const area = parseFloat(inputs.surfaceArea) || 0;
      let cementFactor = 0.024; // bags per sqft
      let sandFactor = 0.0035; // tons per sqft
      let thickness = '12 mm';

      if (inputs.plasterType === 'external-20mm') {
        cementFactor = 0.045;
        sandFactor = 0.0062;
        thickness = '20 mm';
      } else if (inputs.plasterType === 'ceiling-6mm') {
        cementFactor = 0.015;
        sandFactor = 0.0018;
        thickness = '6 mm';
      } else if (inputs.plasterType === 'internal-15mm') {
        cementFactor = 0.022;
        sandFactor = 0.0048;
        thickness = '15 mm';
      }

      const cementBags = Math.ceil(area * cementFactor);
      const sandTons = Math.round(area * sandFactor * 10) / 10;
      const totalCost = (cementBags * 380) + (sandTons * 1800) + (area * 18);

      return {
        results: [
          { label: 'Nominal Thickness', value: thickness, unit: 'mm' },
          { label: 'Cement Required (50kg)', value: cementBags, unit: 'Bags', highlight: true },
          { label: 'Plastering M-Sand (Fine)', value: sandTons, unit: 'Tons' },
          { label: 'Waterproofing Admixture', value: Math.ceil(cementBags * 0.2), unit: 'Liters' }
        ],
        estimatedCost: totalCost,
        notes: [
          'Calculated including 15% joint filling and 5% rebound wastage.',
          'For external plaster, add integral liquid waterproofing compound (IS 2645 compliant) at 200ml per cement bag.'
        ],
        boqItems: [
          { item: 'OPC / PPC Cement 50kg Bags', quantity: cementBags, unit: 'Bags', rate: 380, total: cementBags * 380 },
          { item: 'Fine Plastering Sand', quantity: sandTons, unit: 'Tons', rate: 1800, total: sandTons * 1800 },
          { item: 'Skilled Plastering Masonry Labour', quantity: area, unit: 'Sq.Ft', rate: 18, total: area * 18 }
        ]
      };
    }
  },
  {
    id: 'excavation',
    number: '11',
    title: 'Earthwork & Foundation Excavation Calculator',
    category: 'Site & Civils',
    icon: 'Shovel',
    description: 'Calculates pit and basement excavation volumes in brass / m³, soil swell factor, disposal tipper trips, and JCB hire duration.',
    isStandard: 'IS 1200 (Part 1) Earthwork Measurement Standard',
    fields: [
      { id: 'pitLength', label: 'Excavation Length', type: 'number', defaultValue: 40, unit: 'ft', step: 1 },
      { id: 'pitWidth', label: 'Excavation Width', type: 'number', defaultValue: 30, unit: 'ft', step: 1 },
      { id: 'pitDepth', label: 'Excavation Depth', type: 'number', defaultValue: 6, unit: 'ft', step: 0.5 },
      { id: 'tipperCapacity', label: 'Tipper Capacity (CFT)', type: 'number', defaultValue: 400, unit: 'CFT', step: 50 }
    ],
    calculate: (inputs) => {
      const L = parseFloat(inputs.pitLength) || 0;
      const W = parseFloat(inputs.pitWidth) || 0;
      const D = parseFloat(inputs.pitDepth) || 0;
      const bankCft = L * W * D;
      const bankCum = Math.round(bankCft * 0.0283168);
      const brass = (bankCft / 100).toFixed(1); // 1 Brass = 100 CFT
      const swellCft = bankCft * 1.25; // 25% swell factor for loose earth
      const trips = Math.ceil(swellCft / (parseFloat(inputs.tipperCapacity) || 400));
      const jcbHours = Math.ceil(bankCft / 450); // ~450 CFT excavated per hour

      const totalCost = (jcbHours * 1600) + (trips * 1200);

      return {
        results: [
          { label: 'Bank Measure Volume', value: bankCft, unit: 'CFT' },
          { label: 'Volume in Brass (1 Brass = 100 CFT)', value: brass, unit: 'Brass', highlight: true },
          { label: 'Volume in Cubic Meters', value: bankCum, unit: 'm³' },
          { label: '10-Wheel Tipper Disposal Trips', value: trips, unit: 'Trips' },
          { label: 'Estimated JCB Excavator Hours', value: jcbHours, unit: 'Hours' }
        ],
        estimatedCost: totalCost,
        notes: [
          'Calculated incorporating standard 25% soil expansion/bulking (swell) factor for loose excavated earth.',
          'Ensure safe 1:1 side batter or timber shoring when excavating deeper than 1.5 meters.'
        ],
        boqItems: [
          { item: 'JCB / Poclain Mechanical Excavation', quantity: jcbHours, unit: 'Hours', rate: 1600, total: jcbHours * 1600 },
          { item: 'Debris & Earth Tipper Carting', quantity: trips, unit: 'Trips', rate: 1200, total: trips * 1200 }
        ]
      };
    }
  },
  {
    id: 'flooring',
    number: '12',
    title: 'Granite & Marble Flooring Calculator',
    category: 'Finishes',
    icon: 'Maximize',
    description: 'Calculates natural stone slabs in Sq.Ft, base mortar bed cement bags, screed sand, diamond polishing, and epoxy sealant.',
    isStandard: 'IS 1130 Natural Marble & Granite Slabs',
    fields: [
      { id: 'floorArea', label: 'Flooring Area', type: 'number', defaultValue: 800, unit: 'sq.ft', step: 50 },
      { id: 'bedThickness', label: 'Mortar Bed Thickness', type: 'number', defaultValue: 50, unit: 'mm', step: 10 },
      { id: 'slabRate', label: 'Granite / Marble Rate', type: 'number', defaultValue: 140, unit: '₹/sq.ft', step: 10 }
    ],
    calculate: (inputs) => {
      const area = parseFloat(inputs.floorArea) || 0;
      const rate = parseFloat(inputs.slabRate) || 140;
      const grossArea = Math.round(area * 1.08); // 8% wastage
      const bedCement = Math.ceil(area * 0.05); // bags
      const bedSand = Math.round(area * 0.009 * 10) / 10; // tons

      const stoneCost = grossArea * rate;
      const mortarCost = (bedCement * 380) + (bedSand * 1800);
      const polishLaborCost = area * 55; // ₹55/sqft laying + mirror polishing
      const totalCost = stoneCost + mortarCost + polishLaborCost;

      return {
        results: [
          { label: 'Stone Slabs Area (8% cutting wastage)', value: grossArea, unit: 'Sq.Ft', highlight: true },
          { label: 'Bedding Cement (50kg bags)', value: bedCement, unit: 'Bags' },
          { label: 'Bedding River Sand', value: bedSand, unit: 'Tons' },
          { label: 'Diamond Mirror Polishing Area', value: area, unit: 'Sq.Ft' }
        ],
        estimatedCost: totalCost,
        notes: [
          'Calculated with 50mm coarse sand-cement mortar bed (1:5 mix) to ensure zero level variations and air cavities.',
          'Granite pre-sealing on underside prevents moisture capillary staining from mortar.'
        ],
        boqItems: [
          { item: 'Natural Granite / Marble Slabs', quantity: grossArea, unit: 'Sq.Ft', rate: rate, total: stoneCost },
          { item: 'Mortar Bed Materials', quantity: bedCement, unit: 'Bags', rate: 380, total: mortarCost },
          { item: 'Laying, Leveling & Diamond Polish', quantity: area, unit: 'Sq.Ft', rate: 55, total: polishLaborCost }
        ]
      };
    }
  },
  {
    id: 'water-tank',
    number: '13',
    title: 'Water Sump & Overhead Tank Calculator',
    category: 'MEP',
    icon: 'Cylinder',
    description: 'Calculates domestic water storage demand based on IS 1172 standards (135 LPCD), required tank dimensions, concrete, and waterproofing.',
    isStandard: 'IS 1172 Basic Requirements for Water Supply',
    fields: [
      { id: 'occupants', label: 'Number of House Occupants / Family Members', type: 'number', defaultValue: 6, unit: 'Persons', step: 1 },
      { id: 'storageDays', label: 'Reserve Storage Days', type: 'number', defaultValue: 3, unit: 'Days', step: 1 },
      {
        id: 'tankType',
        label: 'Tank Construction Type',
        type: 'select',
        defaultValue: 'underground-rcc',
        options: [
          { label: 'Underground RCC Sump (1:1.5:3 Concrete)', value: 'underground-rcc' },
          { label: 'Overhead RCC Sintex / Cast Tank', value: 'overhead-rcc' },
        ]
      }
    ],
    calculate: (inputs) => {
      const persons = parseFloat(inputs.occupants) || 6;
      const days = parseFloat(inputs.storageDays) || 3;
      // IS 1172 standard: 135 liters per capita per day (LPCD)
      const dailyLiters = persons * 135;
      const totalCapacity = dailyLiters * days;
      const cum = (totalCapacity / 1000).toFixed(1); // 1 m³ = 1000 liters

      // Tank dimensions approximation (e.g. 2m x 2m x H)
      const approxL = 2.0;
      const approxW = 1.8;
      const approxH = (parseFloat(cum) / (approxL * approxW)).toFixed(2);

      const rccCost = Math.round(totalCapacity * 8.5); // Approx ₹8.5 per liter for turnkey RCC sump

      return {
        results: [
          { label: 'Daily Water Consumption', value: dailyLiters, unit: 'Liters/day' },
          { label: 'Recommended Total Capacity', value: totalCapacity, unit: 'Liters', highlight: true },
          { label: 'Tank Volume', value: cum, unit: 'm³' },
          { label: 'Recommended Internal Dimensions', value: `${approxL}m x ${approxW}m x ${approxH}m`, unit: 'L x W x H' }
        ],
        estimatedCost: rccCost,
        notes: [
          'Calculated per IS 1172: 135 Liters Per Capita per Day (LPCD) for residential dwellings.',
          'Apply 2 coats of food-grade crystalline waterproofing slurry to internal walls.'
        ],
        boqItems: [
          { item: 'RCC Water Sump Construction Turnkey', quantity: totalCapacity, unit: 'Liters', rate: 8.5, total: rccCost }
        ]
      };
    }
  },
  {
    id: 'roofing',
    number: '14',
    title: 'Roofing Sheets & Steel Truss Calculator',
    category: 'Site & Civils',
    icon: 'Home',
    description: 'Calculates sloped roof surface area, color-coated Galvalume profile sheets, MS tubular purlins, ridge caps, and self-drilling fasteners.',
    isStandard: 'IS 800 Structural Steel & IS 277 Galvanized Sheets',
    fields: [
      { id: 'shedLength', label: 'Roof / Shed Length', type: 'number', defaultValue: 30, unit: 'ft', step: 1 },
      { id: 'shedSpan', label: 'Roof Span / Width', type: 'number', defaultValue: 20, unit: 'ft', step: 1 },
      { id: 'pitchAngle', label: 'Roof Pitch Slope (Degrees)', type: 'number', defaultValue: 15, unit: 'deg', step: 1 },
      { id: 'sheetRate', label: 'Color Coated Sheet Rate', type: 'number', defaultValue: 65, unit: '₹/sq.ft', step: 2 }
    ],
    calculate: (inputs) => {
      const L = parseFloat(inputs.shedLength) || 30;
      const S = parseFloat(inputs.shedSpan) || 20;
      const pitch = (parseFloat(inputs.pitchAngle) || 15) * (Math.PI / 180);
      const slopeLength = (S / 2) / Math.cos(pitch);
      const totalSlopedSqft = Math.round(2 * slopeLength * L * 1.1); // 10% overlap

      const sheetCount = Math.ceil(totalSlopedSqft / 30); // 3ft wide standard sheet
      const purlinKg = Math.round(totalSlopedSqft * 1.2); // ~1.2 kg MS tubes per sqft
      const screwsCount = sheetCount * 12;

      const sheetCost = totalSlopedSqft * (parseFloat(inputs.sheetRate) || 65);
      const steelCost = purlinKg * 72;
      const laborCost = totalSlopedSqft * 18;
      const totalCost = sheetCost + steelCost + laborCost;

      return {
        results: [
          { label: 'Total Sloped Roof Surface Area', value: totalSlopedSqft, unit: 'Sq.Ft' },
          { label: 'Profile Roofing Sheets (10ft length)', value: sheetCount, unit: 'Sheets', highlight: true },
          { label: 'MS Hollow Section Purlins', value: purlinKg, unit: 'Kg' },
          { label: 'EPDM Rubber Self-Drilling Screws', value: screwsCount, unit: 'Pcs' }
        ],
        estimatedCost: totalCost,
        notes: [
          'Profile sheet design accounts for 150mm end lap and 1-corrugation side lap.',
          'Minimum pitch of 1:4 (14°) recommended to prevent back-siphoning of heavy rainwater.'
        ],
        boqItems: [
          { item: '0.50mm Galvalume Color Coated Sheets', quantity: totalSlopedSqft, unit: 'Sq.Ft', rate: parseFloat(inputs.sheetRate) || 65, total: sheetCost },
          { item: 'MS Hollow Purlin Tubes', quantity: purlinKg, unit: 'Kg', rate: 72, total: steelCost },
          { item: 'Fabrication & Roofing Erection', quantity: totalSlopedSqft, unit: 'Sq.Ft', rate: 18, total: laborCost }
        ]
      };
    }
  },
  {
    id: 'shuttering',
    number: '15',
    title: 'Shuttering & Formwork Area Calculator',
    category: 'Structural',
    icon: 'Shield',
    description: 'Calculates contact formwork area for RCC slabs, beam bottoms, column faces, and telescopic MS prop support requirements.',
    isStandard: 'IS 14687 Formwork for Concrete Structures',
    fields: [
      { id: 'slabArea', label: 'Roof Slab Cast Area', type: 'number', defaultValue: 1200, unit: 'sq.ft', step: 50 },
      { id: 'beamLength', label: 'Total Beam Running Length', type: 'number', defaultValue: 180, unit: 'ft', step: 10 },
      { id: 'columnsCount', label: 'Number of RCC Columns', type: 'number', defaultValue: 14, unit: 'Columns', step: 1 }
    ],
    calculate: (inputs) => {
      const slab = parseFloat(inputs.slabArea) || 1200;
      const beamL = parseFloat(inputs.beamLength) || 180;
      const cols = parseFloat(inputs.columnsCount) || 14;

      const beamSidesSqft = beamL * 2.5; // average beam side depth 1.25ft both sides
      const colSidesSqft = cols * (4 * 1.2 * 10); // 4 faces x 1.2ft x 10ft height
      const totalFormworkSqft = Math.round(slab + beamSidesSqft + colSidesSqft);

      // Plywood sheets (8ft x 4ft = 32 sq.ft per sheet)
      const plySheets = Math.ceil(totalFormworkSqft / 32);
      const propsCount = Math.ceil(slab / 15); // 1 MS prop per 15 sqft of slab

      const shutteringCost = totalFormworkSqft * 38; // ₹38/sqft rental and erection

      return {
        results: [
          { label: 'Total Formwork Contact Area', value: totalFormworkSqft, unit: 'Sq.Ft', highlight: true },
          { label: '12mm Film-Faced Shuttering Ply (8x4)', value: plySheets, unit: 'Sheets' },
          { label: 'Adjustable Telescopic MS Props', value: propsCount, unit: 'Props' },
          { label: 'Stripping / De-shuttering Period', value: '14 - 21', unit: 'Days' }
        ],
        estimatedCost: shutteringCost,
        notes: [
          'Complies with IS 14687: props must not be released prematurely under cantilever and long-span beams.',
          'Apply shuttering oil or mold release agent before placing reinforcement to ensure clean concrete surface.'
        ],
        boqItems: [
          { item: 'Centering, Shuttering & Scaffolding Labour', quantity: totalFormworkSqft, unit: 'Sq.Ft', rate: 38, total: shutteringCost }
        ]
      };
    }
  },
  {
    id: 'asphalt',
    number: '16',
    title: 'Asphalt & Road Paving Calculator',
    category: 'Site & Civils',
    icon: 'Compass',
    description: 'Calculates Bituminous Concrete (BC) and Dense Bituminous Macadam (DBM) tonnage, tack coat, and roller passes for internal layout roads.',
    isStandard: 'MoRTH Specifications for Road and Bridge Works (Section 500)',
    fields: [
      { id: 'roadLength', label: 'Road Length', type: 'number', defaultValue: 100, unit: 'm', step: 10 },
      { id: 'roadWidth', label: 'Carriageway Width', type: 'number', defaultValue: 6, unit: 'm', step: 0.5 },
      { id: 'thicknessMm', label: 'Asphalt Layer Thickness', type: 'number', defaultValue: 50, unit: 'mm', step: 5 }
    ],
    calculate: (inputs) => {
      const L = parseFloat(inputs.roadLength) || 100;
      const W = parseFloat(inputs.roadWidth) || 6;
      const T = (parseFloat(inputs.thicknessMm) || 50) / 1000;
      const volumeM3 = L * W * T;
      // Compacted density of bituminous mix: 2.35 tons per m³
      const asphaltTons = Math.round(volumeM3 * 2.35 * 10) / 10;
      const tackCoatLiters = Math.round(L * W * 0.25); // 0.25 kg/m2 tack coat

      const asphaltCost = asphaltTons * 4200; // ₹4200/ton hot mix
      const layingCost = L * W * 60;
      const totalCost = asphaltCost + layingCost;

      return {
        results: [
          { label: 'Carriageway Paved Area', value: L * W, unit: 'm²' },
          { label: 'Hot Mix Asphalt Required', value: asphaltTons, unit: 'Metric Tons', highlight: true },
          { label: 'Bitumen Emulsion Tack Coat', value: tackCoatLiters, unit: 'Liters' },
          { label: 'Recommended Compaction Roller', value: '8 - 10', unit: 'Ton Tandem Roller' }
        ],
        estimatedCost: totalCost,
        notes: [
          'Calculated using MoRTH compacted bulk density of 2.35 g/cm³ for Bituminous Concrete.',
          'Lay and compact mix at a minimum temperature of 130°C to 150°C.'
        ],
        boqItems: [
          { item: 'Bituminous Concrete Hot Mix at Site', quantity: asphaltTons, unit: 'Tons', rate: 4200, total: asphaltCost },
          { item: 'Paver Laying, Rolling & Compaction', quantity: L * W, unit: 'm²', rate: 60, total: layingCost }
        ]
      };
    }
  },
  {
    id: 'solar',
    number: '17',
    title: 'Solar Rooftop & Energy Savings Calculator',
    category: 'Specialized',
    icon: 'Sun',
    description: 'Calculates recommended kW solar grid-tied capacity, required shadow-free roof area, daily units generated, and 25-year financial savings.',
    isStandard: 'MNRE Grid-Connected Rooftop Solar Technical Guidelines',
    fields: [
      { id: 'monthlyBill', label: 'Average Monthly Electricity Bill', type: 'number', defaultValue: 3500, unit: '₹/month', step: 250 },
      { id: 'roofArea', label: 'Available Shadow-Free Roof Area', type: 'number', defaultValue: 400, unit: 'sq.ft', step: 50 },
      { id: 'tariff', label: 'Grid Electricity Tariff Rate', type: 'number', defaultValue: 8.0, unit: '₹/kWh', step: 0.5 }
    ],
    calculate: (inputs) => {
      const bill = parseFloat(inputs.monthlyBill) || 3500;
      const tariff = parseFloat(inputs.tariff) || 8.0;
      const monthlyUnits = bill / tariff;
      const dailyUnits = monthlyUnits / 30;

      // 1 kW solar generates ~4 units per day and requires ~80-100 sq.ft
      const recommendedKW = Math.min(
        Math.ceil((dailyUnits / 4) * 2) / 2, // round to 0.5 kW
        Math.floor((parseFloat(inputs.roofArea) || 400) / 90)
      );

      const annualUnits = Math.round(recommendedKW * 4 * 365);
      const annualSavings = Math.round(annualUnits * tariff);
      const systemCost = recommendedKW * 58000; // ~₹58k/kW installed
      const govtSubsidy = recommendedKW <= 3 ? recommendedKW * 18000 : 78000;
      const netPayable = systemCost - govtSubsidy;
      const paybackYears = (netPayable / annualSavings).toFixed(1);

      return {
        results: [
          { label: 'Recommended Solar System Size', value: `${recommendedKW} kW`, unit: 'Grid-Tied', highlight: true },
          { label: 'Daily Clean Energy Generated', value: (recommendedKW * 4).toFixed(1), unit: 'Units (kWh)/day' },
          { label: 'Annual Electricity Savings', value: `₹ ${annualSavings.toLocaleString('en-IN')}`, unit: 'per Year', highlight: true },
          { label: 'PM Surya Ghar Central Subsidy', value: `₹ ${govtSubsidy.toLocaleString('en-IN')}`, unit: 'Subsidy' },
          { label: 'Estimated Payback Period', value: `${paybackYears} Years`, unit: 'ROI' }
        ],
        estimatedCost: netPayable,
        notes: [
          'Calculated using MNRE standard: 1 kWp system generates ~1,400 to 1,500 units annually in India.',
          'Eligible for PM Surya Ghar: Muft Bijli Yojana rooftop financial assistance.'
        ],
        boqItems: [
          { item: `Grid-Tied Solar Plant (${recommendedKW} kW) Mono PERC`, quantity: 1, unit: 'System', rate: netPayable, total: netPayable }
        ]
      };
    }
  },
  {
    id: 'hvac',
    number: '18',
    title: 'AC Room Tonnage & Heat Load Calculator',
    category: 'MEP',
    icon: 'Wind',
    description: 'Calculates precise air conditioner cooling tonnage (BTU/hr) based on room volume, window sun exposure, and occupants.',
    isStandard: 'ISHRAE Heat Load Calculation Handbook',
    fields: [
      { id: 'roomL', label: 'Room Length', type: 'number', defaultValue: 14, unit: 'ft', step: 1 },
      { id: 'roomW', label: 'Room Width', type: 'number', defaultValue: 12, unit: 'ft', step: 1 },
      { id: 'ceilingH', label: 'Ceiling Height', type: 'number', defaultValue: 10, unit: 'ft', step: 0.5 },
      { id: 'occupants', label: 'Typical Room Occupants', type: 'number', defaultValue: 2, unit: 'Persons', step: 1 },
      {
        id: 'sunExposure',
        label: 'Window Sunlight & Floor Level',
        type: 'select',
        defaultValue: 'medium',
        options: [
          { label: 'Intermediate Floor / Shaded Windows', value: 'low' },
          { label: 'Direct Sunlight / East or West Facing', value: 'medium' },
          { label: 'Top Floor / Direct Roof Sun Exposure', value: 'high' },
        ]
      }
    ],
    calculate: (inputs) => {
      const L = parseFloat(inputs.roomL) || 14;
      const W = parseFloat(inputs.roomW) || 12;
      const H = parseFloat(inputs.ceilingH) || 10;
      const volumeCft = L * W * H;

      let btu = volumeCft * 6; // base cooling factor
      btu += (parseFloat(inputs.occupants) || 2) * 500; // 500 BTU per person

      if (inputs.sunExposure === 'high') btu *= 1.25;
      else if (inputs.sunExposure === 'medium') btu *= 1.1;

      const tonsRaw = btu / 12000; // 1 Ton = 12000 BTU/hr
      let recommendedTon = '1.0 Ton';
      let estPrice = 36000;
      if (tonsRaw > 1.8) { recommendedTon = '2.0 Ton'; estPrice = 54000; }
      else if (tonsRaw > 1.25) { recommendedTon = '1.5 Ton'; estPrice = 43000; }

      return {
        results: [
          { label: 'Calculated Heat Load', value: Math.round(btu), unit: 'BTU / hr' },
          { label: 'Theoretical Capacity', value: tonsRaw.toFixed(2), unit: 'Tons' },
          { label: 'Recommended Inverter AC Size', value: recommendedTon, unit: 'Split AC', highlight: true },
          { label: 'BEE Star Rating Recommended', value: '5-Star Inverter', unit: 'Energy Saving' }
        ],
        estimatedCost: estPrice,
        notes: [
          'Calculated as per ISHRAE guidelines with 1 Ton = 12,000 BTU/hr (3.516 kW) thermal capacity.',
          'For top-floor bedrooms, choosing a 5-star heavy-duty dual inverter prevents compressor overload.'
        ],
        boqItems: [
          { item: `${recommendedTon} 5-Star Inverter Split AC with Copper Kit`, quantity: 1, unit: 'Unit', rate: estPrice, total: estPrice }
        ]
      };
    }
  },
  {
    id: 'boundary-wall',
    number: '19',
    title: 'Compound & Boundary Wall Calculator',
    category: 'Site & Civils',
    icon: 'Fence',
    description: 'Calculates masonry blocks/bricks, RCC boundary pillars, footing concrete, coping plaster, and total project turnkey cost for plot perimeters.',
    isStandard: 'IS 1905 Structural Use of Unreinforced Masonry',
    fields: [
      { id: 'perimeterLength', label: 'Plot Boundary Length', type: 'number', defaultValue: 150, unit: 'R.Ft (Running Feet)', step: 5 },
      { id: 'wallHeight', label: 'Wall Height Above Ground', type: 'number', defaultValue: 6, unit: 'ft', step: 0.5 },
      { id: 'pillarSpacing', label: 'Pillar to Pillar Spacing', type: 'number', defaultValue: 10, unit: 'ft', step: 1 },
      {
        id: 'wallMaterial',
        label: 'Wall Construction Material',
        type: 'select',
        defaultValue: 'solid-block',
        options: [
          { label: '6" Concrete Solid Blocks (High Strength)', value: 'solid-block' },
          { label: '9" Red Clay Wirecut Bricks', value: 'red-brick' },
          { label: 'Precast Ready-Made Concrete Panels', value: 'precast' },
        ]
      }
    ],
    calculate: (inputs) => {
      const length = parseFloat(inputs.perimeterLength) || 150;
      const height = parseFloat(inputs.wallHeight) || 6;
      const spacing = parseFloat(inputs.pillarSpacing) || 10;
      const wallArea = length * height;
      const pillars = Math.ceil(length / spacing) + 1;

      let blocksCount = Math.ceil(wallArea * 0.85); // 1 block ~ 1.25 sqft
      if (inputs.wallMaterial === 'red-brick') {
        blocksCount = Math.ceil(wallArea * 10.5);
      } else if (inputs.wallMaterial === 'precast') {
        blocksCount = Math.ceil(length / 7); // precast panels
      }

      const turnkeyRate = inputs.wallMaterial === 'precast' ? 380 : 520; // per R.ft
      const totalCost = length * turnkeyRate;

      return {
        results: [
          { label: 'Total Wall Face Area', value: wallArea, unit: 'Sq.Ft' },
          { label: 'RCC Stiffener Pillars', value: pillars, unit: 'Pillars', highlight: true },
          { label: 'Blocks / Bricks Required', value: blocksCount, unit: inputs.wallMaterial === 'precast' ? 'Panels' : 'Pcs' },
          { label: 'PCC Foundation Running Length', value: length, unit: 'R.Ft' }
        ],
        estimatedCost: totalCost,
        notes: [
          'Calculated including RCC stiffener columns every 10-12 feet to resist wind and earth lateral pressure.',
          'Provide 75mm weathered concrete coping on top to prevent rainwater seepage into masonry.'
        ],
        boqItems: [
          { item: 'Boundary Wall Construction Turnkey', quantity: length, unit: 'R.Ft', rate: turnkeyRate, total: totalCost }
        ]
      };
    }
  }
];
