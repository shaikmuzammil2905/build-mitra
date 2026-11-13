export interface LabourProfile {
  id: string;
  name: string;
  trade: 'Master Mason' | 'Bar Bender' | 'Shuttering Carpenter' | 'Site Helper' | 'Tile Layer' | 'Structural Welder';
  experienceYears: number;
  dailyWage: number;
  unit: string;
  city: string;
  area: string;
  rating: number;
  completedSites: number;
  skills: string[];
  availability: 'Available Immediately' | 'Booked for 2 Days' | 'On Active Site';
  isVerified: boolean;
  gangSizeAvailable: number; // can bring a crew of N workers
  badge: string;
}

export const LABOUR_WORKFORCE: LabourProfile[] = [
  {
    id: 'lab-mason-1',
    name: 'Muniyappa G. & Crew',
    trade: 'Master Mason',
    experienceYears: 18,
    dailyWage: 1100,
    unit: 'Day (8 Hours)',
    city: 'Bengaluru',
    area: 'South Bengaluru (Kanakapura / Anjanapura / JP Nagar)',
    rating: 4.9,
    completedSites: 142,
    skills: ['English & Flemish Bond Brickwork', 'Solid Concrete Blockwork', 'Coping & Parapet Masonry', 'Laser Line Leveling'],
    availability: 'Available Immediately',
    isVerified: true,
    gangSizeAvailable: 8,
    badge: 'Master Craftsman'
  },
  {
    id: 'lab-barbender-1',
    name: 'Rameshwar Kumar',
    trade: 'Bar Bender',
    experienceYears: 12,
    dailyWage: 950,
    unit: 'Day (8 Hours)',
    city: 'Bengaluru',
    area: 'Whitefield / Marathahalli / Sarjapur',
    rating: 4.8,
    completedSites: 98,
    skills: ['IS 2502 Bar Bending Schedule (BBS) Execution', 'Column Cage Tying', 'Slab Distribution Cranks', 'Stirrup Pin Bending'],
    availability: 'Available Immediately',
    isVerified: true,
    gangSizeAvailable: 6,
    badge: 'Structural Certified'
  },
  {
    id: 'lab-shuttering-1',
    name: 'Suresh Patil & Gang',
    trade: 'Shuttering Carpenter',
    experienceYears: 15,
    dailyWage: 1050,
    unit: 'Day (8 Hours)',
    city: 'Bengaluru',
    area: 'North Bengaluru (Hebbal / Yelahanka / Sahakar Nagar)',
    rating: 4.9,
    completedSites: 120,
    skills: ['Film-Faced Plywood Centering', 'Adjustable MS Prop Alignment', 'Beam Bottom Shuttering', 'Staircase Riser Formwork'],
    availability: 'Available Immediately',
    isVerified: true,
    gangSizeAvailable: 12,
    badge: 'High Precision Formwork'
  },
  {
    id: 'lab-tilelayer-1',
    name: 'Venkatesh Babu',
    trade: 'Tile Layer',
    experienceYears: 14,
    dailyWage: 1150,
    unit: 'Day (8 Hours)',
    city: 'Bengaluru',
    area: 'Central / Koramangala / HSR Layout',
    rating: 5.0,
    completedSites: 165,
    skills: ['Large Slab Vitrified Tiles (4x2, 6x4)', 'Laser Line Zero-Tolerance Laying', 'Epoxy Grout Filling', 'Italian Marble Leveling'],
    availability: 'Booked for 2 Days',
    isVerified: true,
    gangSizeAvailable: 4,
    badge: 'Precision Finisher'
  },
  {
    id: 'lab-helper-1',
    name: 'Construction Site Beldar Gang (Lead: Santosh)',
    trade: 'Site Helper',
    experienceYears: 6,
    dailyWage: 650,
    unit: 'Day per Helper',
    city: 'Bengaluru',
    area: 'Electronic City / Bannerghatta Road',
    rating: 4.7,
    completedSites: 210,
    skills: ['Concrete Batch Feeding', 'Material Loading/Unloading', 'Mortar Mixing & Head Pan Carting', 'Site Curing & Housekeeping'],
    availability: 'Available Immediately',
    isVerified: true,
    gangSizeAvailable: 15,
    badge: 'Vigorous Workforce'
  },
  {
    id: 'lab-welder-1',
    name: 'Mohammed Aslam',
    trade: 'Structural Welder',
    experienceYears: 11,
    dailyWage: 1000,
    unit: 'Day (8 Hours)',
    city: 'Bengaluru',
    area: 'Peenya / Rajajinagar / Yeshwantpur',
    rating: 4.8,
    completedSites: 85,
    skills: ['Arc & MIG Welding', 'MS Tubular Roof Truss Fabrication', 'Main Gate & Safety Grill Erection', 'Spiral Metal Staircases'],
    availability: 'Available Immediately',
    isVerified: true,
    gangSizeAvailable: 3,
    badge: 'Certified Welder'
  }
];
