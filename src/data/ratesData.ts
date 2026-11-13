export interface MaterialRate {
  id: string;
  name: string;
  category: string;
  unit: string;
  price: number;
  change: number; // percentage change vs yesterday (+ / -)
  trend: 'up' | 'down' | 'stable';
  minOrder: string;
  leadTime: string;
  spec: string;
  popularBrands: string[];
}

export interface CityRates {
  city: string;
  state: string;
  lastUpdated: string;
  rates: MaterialRate[];
}

export const CITIES_DATA: Record<string, CityRates> = {
  'Bengaluru': {
    city: 'Bengaluru',
    state: 'Karnataka',
    lastUpdated: 'Today at 09:30 AM IST (Verified Yard Benchmark)',
    rates: [
      {
        id: 'cement',
        name: 'Cement (OPC 53 Grade)',
        category: 'Binding Materials',
        unit: 'Bag (50 Kg)',
        price: 380,
        change: -1.2,
        trend: 'down',
        minOrder: '50 Bags',
        leadTime: 'Same Day Delivery',
        spec: 'IS 12269:2013 compliant, 28-day strength > 53 MPa',
        popularBrands: ['UltraTech', 'Dalmia DSP', 'Birla Super', 'ACC Suraksha']
      },
      {
        id: 'steel',
        name: 'TMT Steel (Fe 550D)',
        category: 'Structural Steel',
        unit: 'Kg',
        price: 62,
        change: 0.8,
        trend: 'up',
        minOrder: '500 Kg',
        leadTime: '24-48 Hours',
        spec: 'Primary billets, earthquake resistant Fe 550D ribbing',
        popularBrands: ['Tata Tiscon', 'JSW Neosteel', 'Kamdhenu', 'Jindal Panther']
      },
      {
        id: 'msand',
        name: 'M-Sand (Plastering & Masonry)',
        category: 'Aggregates',
        unit: 'Ton',
        price: 1800,
        change: 0.0,
        trend: 'stable',
        minOrder: '10 Tons (1 Tipper)',
        leadTime: 'Within 12 Hours',
        spec: 'Triple washed, VSI crusher manufactured, silt < 3%',
        popularBrands: ['VSI Washed Sand', 'RoboSilicon', 'Granite Source']
      },
      {
        id: 'bricks',
        name: 'Red Clay Wirecut Bricks',
        category: 'Masonry',
        unit: 'Pc',
        price: 7.50,
        change: -0.5,
        trend: 'down',
        minOrder: '2,000 Pcs',
        leadTime: 'Next Day Delivery',
        spec: 'Standard 9" x 4" x 3", crushing strength > 7.5 N/mm²',
        popularBrands: ['Malur Red Clay', 'Chintamani Kiln', 'EcoBricks']
      },
      {
        id: 'aac-blocks',
        name: 'AAC Blocks (600x200x150 mm)',
        category: 'Masonry',
        unit: 'Block',
        price: 68,
        change: 0.0,
        trend: 'stable',
        minOrder: '300 Blocks',
        leadTime: '24-48 Hours',
        spec: 'Dry density 550-650 kg/m³, thermal conductivity 0.16 W/m-K',
        popularBrands: ['Siporex', 'Birla Aerocon', 'Magicrete']
      },
      {
        id: 'aggregate-20mm',
        name: 'Blue Metal Aggregate 20mm',
        category: 'Aggregates',
        unit: 'Ton',
        price: 1250,
        change: 1.5,
        trend: 'up',
        minOrder: '10 Tons',
        leadTime: 'Same Day Delivery',
        spec: 'Granite cubical crushed, flakiness index < 15%',
        popularBrands: ['Hard Rock Quarries', 'Karnataka Blue Metal']
      }
    ]
  },
  'Hyderabad': {
    city: 'Hyderabad',
    state: 'Telangana',
    lastUpdated: 'Today at 09:15 AM IST (Verified Yard Benchmark)',
    rates: [
      {
        id: 'cement',
        name: 'Cement (OPC 53 Grade)',
        category: 'Binding Materials',
        unit: 'Bag (50 Kg)',
        price: 365,
        change: 0.0,
        trend: 'stable',
        minOrder: '50 Bags',
        leadTime: 'Same Day Delivery',
        spec: 'IS 12269:2013 compliant, 28-day strength > 53 MPa',
        popularBrands: ['KCP Cement', 'Priya Cement', 'Maha Cement', 'UltraTech']
      },
      {
        id: 'steel',
        name: 'TMT Steel (Fe 550D)',
        category: 'Structural Steel',
        unit: 'Kg',
        price: 60.50,
        change: -0.5,
        trend: 'down',
        minOrder: '500 Kg',
        leadTime: '24-48 Hours',
        spec: 'Primary billets, earthquake resistant Fe 550D ribbing',
        popularBrands: ['Tata Tiscon', 'Kamdhenu', 'JSW Neosteel', 'Simhadri TMT']
      },
      {
        id: 'msand',
        name: 'M-Sand (Plastering & Masonry)',
        category: 'Aggregates',
        unit: 'Ton',
        price: 1650,
        change: -1.0,
        trend: 'down',
        minOrder: '10 Tons (1 Tipper)',
        leadTime: 'Within 12 Hours',
        spec: 'Triple washed, VSI crusher manufactured, silt < 3%',
        popularBrands: ['RoboSilicon', 'Telangana Sands']
      },
      {
        id: 'bricks',
        name: 'Red Clay Wirecut Bricks',
        category: 'Masonry',
        unit: 'Pc',
        price: 7.20,
        change: 0.0,
        trend: 'stable',
        minOrder: '2,000 Pcs',
        leadTime: 'Next Day Delivery',
        spec: 'Standard 9" x 4" x 3", crushing strength > 7.5 N/mm²',
        popularBrands: ['Medak Kilns', 'Shamirpet Red Bricks']
      }
    ]
  },
  'Chennai': {
    city: 'Chennai',
    state: 'Tamil Nadu',
    lastUpdated: 'Today at 09:45 AM IST (Verified Yard Benchmark)',
    rates: [
      {
        id: 'cement',
        name: 'Cement (OPC 53 Grade)',
        category: 'Binding Materials',
        unit: 'Bag (50 Kg)',
        price: 395,
        change: 0.5,
        trend: 'up',
        minOrder: '50 Bags',
        leadTime: 'Same Day Delivery',
        spec: 'IS 12269:2013 compliant',
        popularBrands: ['Ramco Supercrete', 'Dalmia', 'Chettinad', 'UltraTech']
      },
      {
        id: 'steel',
        name: 'TMT Steel (Fe 550D)',
        category: 'Structural Steel',
        unit: 'Kg',
        price: 63.50,
        change: 1.0,
        trend: 'up',
        minOrder: '500 Kg',
        leadTime: '24-48 Hours',
        spec: 'Corrosion resistant Fe 550D primary grade',
        popularBrands: ['Tata Tiscon', 'JSW Neosteel', 'ARS TMT']
      },
      {
        id: 'msand',
        name: 'M-Sand (Plastering & Masonry)',
        category: 'Aggregates',
        unit: 'Ton',
        price: 1950,
        change: 0.0,
        trend: 'stable',
        minOrder: '10 Tons',
        leadTime: 'Within 24 Hours',
        spec: 'Graded fine aggregate silt < 2.5%',
        popularBrands: ['Kancheepuram Washed', 'Chengalpattu VSI']
      },
      {
        id: 'bricks',
        name: 'Red Clay Wirecut Bricks',
        category: 'Masonry',
        unit: 'Pc',
        price: 8.00,
        change: 0.0,
        trend: 'stable',
        minOrder: '2,000 Pcs',
        leadTime: 'Next Day Delivery',
        spec: 'Red burnt clay kiln bricks',
        popularBrands: ['Tiruvallur Kiln', 'Sriperumbudur Red']
      }
    ]
  },
  'Mumbai': {
    city: 'Mumbai',
    state: 'Maharashtra',
    lastUpdated: 'Today at 10:00 AM IST (Verified Yard Benchmark)',
    rates: [
      {
        id: 'cement',
        name: 'Cement (OPC 53 Grade)',
        category: 'Binding Materials',
        unit: 'Bag (50 Kg)',
        price: 410,
        change: 0.5,
        trend: 'up',
        minOrder: '50 Bags',
        leadTime: 'Same Day Delivery',
        spec: 'IS 12269:2013 compliant',
        popularBrands: ['Ambuja', 'ACC Concrete+', 'UltraTech']
      },
      {
        id: 'steel',
        name: 'TMT Steel (Fe 550D)',
        category: 'Structural Steel',
        unit: 'Kg',
        price: 64.00,
        change: -0.2,
        trend: 'down',
        minOrder: '500 Kg',
        leadTime: '24 Hours',
        spec: 'Fe 550D Primary Mill',
        popularBrands: ['Tata Tiscon', 'JSW Steel', 'SAIL TMT']
      },
      {
        id: 'msand',
        name: 'M-Sand (Plastering & Masonry)',
        category: 'Aggregates',
        unit: 'Ton',
        price: 2100,
        change: 1.2,
        trend: 'up',
        minOrder: '10 Tons',
        leadTime: 'Next Day',
        spec: 'Triple washed basalt sand',
        popularBrands: ['Navi Mumbai VSI', 'Thane Aggregates']
      },
      {
        id: 'bricks',
        name: 'Red Clay Wirecut Bricks',
        category: 'Masonry',
        unit: 'Pc',
        price: 8.50,
        change: 0.0,
        trend: 'stable',
        minOrder: '2,000 Pcs',
        leadTime: '24-48 Hours',
        spec: 'First class kiln burnt bricks',
        popularBrands: ['Kalyan Bricks', 'Panvel Red']
      }
    ]
  },
  'Pune': {
    city: 'Pune',
    state: 'Maharashtra',
    lastUpdated: 'Today at 09:00 AM IST (Verified Yard Benchmark)',
    rates: [
      {
        id: 'cement',
        name: 'Cement (OPC 53 Grade)',
        category: 'Binding Materials',
        unit: 'Bag (50 Kg)',
        price: 390,
        change: -0.8,
        trend: 'down',
        minOrder: '50 Bags',
        leadTime: 'Same Day Delivery',
        spec: 'IS 12269 certified',
        popularBrands: ['UltraTech', 'ACC', 'Birla A1']
      },
      {
        id: 'steel',
        name: 'TMT Steel (Fe 550D)',
        category: 'Structural Steel',
        unit: 'Kg',
        price: 62.50,
        change: 0.5,
        trend: 'up',
        minOrder: '500 Kg',
        leadTime: '24 Hours',
        spec: 'IS 1786 Fe 550D',
        popularBrands: ['Tata Tiscon', 'JSW', 'Kalika TMT']
      },
      {
        id: 'msand',
        name: 'M-Sand (Plastering & Masonry)',
        category: 'Aggregates',
        unit: 'Ton',
        price: 1850,
        change: 0.0,
        trend: 'stable',
        minOrder: '10 Tons',
        leadTime: 'Same Day',
        spec: 'Washed basalt crushed sand',
        popularBrands: ['Wagholi Crushers', 'Pune Sands']
      },
      {
        id: 'bricks',
        name: 'Red Clay Wirecut Bricks',
        category: 'Masonry',
        unit: 'Pc',
        price: 7.80,
        change: 0.0,
        trend: 'stable',
        minOrder: '2,000 Pcs',
        leadTime: 'Next Day',
        spec: 'Red clay kiln bricks',
        popularBrands: ['Daund Red Bricks', 'Saswad Kilns']
      }
    ]
  },
  'Delhi NCR': {
    city: 'Delhi NCR',
    state: 'Delhi / NCR',
    lastUpdated: 'Today at 09:30 AM IST (Verified Yard Benchmark)',
    rates: [
      {
        id: 'cement',
        name: 'Cement (OPC 53 Grade)',
        category: 'Binding Materials',
        unit: 'Bag (50 Kg)',
        price: 385,
        change: 0.0,
        trend: 'stable',
        minOrder: '50 Bags',
        leadTime: 'Same Day Delivery',
        spec: 'IS 12269 certified',
        popularBrands: ['Shree Ultra', 'JK Lakshmi', 'UltraTech', 'ACC']
      },
      {
        id: 'steel',
        name: 'TMT Steel (Fe 550D)',
        category: 'Structural Steel',
        unit: 'Kg',
        price: 61.00,
        change: -0.6,
        trend: 'down',
        minOrder: '500 Kg',
        leadTime: '24 Hours',
        spec: 'Fe 550D Primary billet',
        popularBrands: ['Rathi Shaktiman', 'Tata Tiscon', 'Jindal Panther']
      },
      {
        id: 'msand',
        name: 'M-Sand (Plastering & Masonry)',
        category: 'Aggregates',
        unit: 'Ton',
        price: 1750,
        change: 0.0,
        trend: 'stable',
        minOrder: '10 Tons',
        leadTime: 'Within 24 Hours',
        spec: 'Washed silica zone-II sand',
        popularBrands: ['Nuh Washed Sand', 'Faridabad Aggregates']
      },
      {
        id: 'bricks',
        name: 'Red Clay Wirecut Bricks',
        category: 'Masonry',
        unit: 'Pc',
        price: 7.00,
        change: 0.0,
        trend: 'stable',
        minOrder: '2,000 Pcs',
        leadTime: 'Same Day',
        spec: 'Red clay bhatta bricks No. 1',
        popularBrands: ['Baghpat Red Kiln', 'Jhajjar Marka']
      }
    ]
  }
};

