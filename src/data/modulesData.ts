export interface PlatformModule {
  id: string;
  number: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  route: string;
  image: string;
  accentColor: string;
  badge: string;
  features: string[];
}

export const CORE_MODULES: PlatformModule[] = [
  {
    id: 'marketplace',
    number: '01',
    title: 'Construction Material Marketplace',
    shortDesc: 'Live Rates & Bulk Discounts',
    fullDesc: 'Direct B2B/B2C procurement of top-grade construction materials including Cement, TMT Steel, M-Sand, Bricks, Plumbing & Electrical with daily city-wise rates.',
    route: '/materials',
    image: '/assets/materials.jpg',
    accentColor: 'border-l-blue-600 hover:shadow-blue-500/20',
    badge: 'Direct Procurement',
    features: ['Daily City-Wise Rates', 'Direct B2B/B2C Procurement', 'Bulk Tiered Discounts', 'Verified Quality Testing Reports']
  },
  {
    id: 'reverse-auction',
    number: '02',
    title: 'Reverse Auction Engine',
    shortDesc: 'Get the Lowest Landed Price',
    fullDesc: 'Upload your Bill of Quantities (BOQ), submit requirements, and let verified manufacturers and tier-1 distributors compete in real time for your purchase order.',
    route: '/reverse-auction',
    image: '/assets/reverse-auction.jpg',
    accentColor: 'border-l-amber-500 hover:shadow-amber-500/20',
    badge: 'Save Up to 18%',
    features: ['Instant BOQ Upload', 'Transparent Live Bidding', 'Lowest Landed Price Logic', 'Secure Milestone Escrow']
  },
  {
    id: 'home-services',
    number: '03',
    title: 'On-Demand Home & Civil Services',
    shortDesc: 'Book & Compare Verified Pros',
    fullDesc: 'Instant GPS-based discovery of vetted civil contractors, certified electricians, master plumbers, waterproofing experts, and professional painting crews.',
    route: '/services',
    image: '/assets/services.jpg',
    accentColor: 'border-l-emerald-500 hover:shadow-emerald-500/20',
    badge: '100% Background-Checked',
    features: ['GPS Real-Time Discovery', 'Transparent Standard Rates', 'Multiple Quotation Matrix', 'Milestone-Based Releases']
  },
  {
    id: 'labour-net',
    number: '04',
    title: 'Labour Net',
    shortDesc: 'Hire Verified Skilled Labour',
    fullDesc: 'India’s dedicated construction workforce network for hiring master masons, bar benders, shuttering carpenters, and certified site supervisors with wage benchmarks.',
    route: '/labour',
    image: '/assets/labour.jpg',
    accentColor: 'border-l-yellow-500 hover:shadow-yellow-500/20',
    badge: 'Fair Wage Benchmark',
    features: ['Skill-Tested Tradesmen', 'Daily/Weekly Benchmarked Rates', 'Attendance & Gang Booking', 'Site Safety Insured']
  },
  {
    id: 'real-estate',
    number: '05',
    title: 'Real Estate Hub & DIY Land Survey',
    shortDesc: 'Property Insights & Survey',
    fullDesc: 'Unbiased property intelligence with registered transaction data, Sub-Registrar guidance values, 1-year growth forecasts, and satellite DIY boundary demarcation.',
    route: '/real-estate',
    image: '/assets/real-estate.jpg',
    accentColor: 'border-l-sky-500 hover:shadow-sky-500/20',
    badge: 'Govt Guidance Values',
    features: ['Registered Price Index', 'Govt Guidance vs Market Value', 'Satellite Land Demarcation', 'Litigation & Title Verification']
  },
  {
    id: 'floor-plans',
    number: '06',
    title: '2D/3D Drawing Studio & Floor Plans',
    shortDesc: 'Design Your Dream Home',
    fullDesc: 'Explore hundreds of Vastu-compliant architectural floor plans, photorealistic 3D elevations, structural engineering drawings, and instant turnkey cost estimates.',
    route: '/floor-plans',
    image: '/assets/floor-plans.jpg',
    accentColor: 'border-l-red-500 hover:shadow-red-500/20',
    badge: '100% Vastu Compliant',
    features: ['Interactive CAD 2D Plans', 'Photorealistic 3D Renders', 'Custom Structural Engineering', 'Turnkey Cost Breakdown']
  },
  {
    id: 'calculators',
    number: '07',
    title: 'Engineering Calculators & Dynamic BOQ',
    shortDesc: '19+ Powerful Civil Tools',
    fullDesc: 'Full suite of 19 accurate civil engineering calculators: Concrete, Steel, Tile, Paint, Blockwork, Excavation, and live Dynamic BOQ exportable to PDF and Excel.',
    route: '/calculators',
    image: '/assets/engineering.jpg',
    accentColor: 'border-l-blue-700 hover:shadow-blue-500/20',
    badge: 'IS Code Compliant',
    features: ['19 Specialized Calculators', 'Dynamic Cost Formulation', 'Exportable PDF / Excel BOQ', 'IS 456 & Civil Standards']
  },
  {
    id: 'home-loans',
    number: '08',
    title: 'Home Loan & Partner Portal',
    shortDesc: 'Instant EMI & Disbursement',
    fullDesc: 'Compare construction and plot loans from top nationalized and private banks, calculate stage-wise disbursements, and register as an affiliate partner.',
    route: '/loans',
    image: '/assets/home-loans.jpg',
    accentColor: 'border-l-purple-600 hover:shadow-purple-500/20',
    badge: 'Lowest Interest Rates',
    features: ['Construction Stage Disbursement', 'Real-Time EMI Optimizer', 'Multi-Bank Comparison', 'Affiliate Partner Dashboard']
  }
];

