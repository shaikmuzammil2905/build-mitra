const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, 'data');
const DB_FILE = path.join(DATA_DIR, 'buildmitra_db.json');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initial default schema & rich seed state across all 28 modules
const INITIAL_DATABASE = {
  users: [
    {
      id: 'USR-ADMIN-01',
      name: 'BuildMitra Super Admin',
      email: 'admin@buildmitra.com',
      phone: '+91 98450 00001',
      role: 'Super Admin',
      status: 'Active',
      registeredAt: '2026-01-01T00:00:00.000Z',
      plan: 'Enterprise Admin',
      calculatorUsage: 45,
      pdfPurchases: 12
    },
    {
      id: 'USR-CUST-101',
      name: 'Ananya Sharma',
      email: 'ananya.s@gmail.com',
      phone: '+91 98765 43210',
      role: 'User',
      status: 'Active',
      registeredAt: '2026-02-10T10:30:00.000Z',
      plan: 'Free Member',
      calculatorUsage: 8,
      pdfPurchases: 3
    },
    {
      id: 'USR-SELLER-201',
      name: 'Sri City Developers & Realtors',
      email: 'sales@sricitydev.in',
      phone: '+91 99001 22334',
      role: 'Real Estate Seller',
      status: 'Active',
      registeredAt: '2026-02-15T14:20:00.000Z',
      plan: 'Professional Seller',
      calculatorUsage: 14,
      pdfPurchases: 5
    },
    {
      id: 'USR-CUST-102',
      name: 'Vikramaditya Rao',
      email: 'vikram.rao@infra.org',
      phone: '+91 98220 55441',
      role: 'Real Estate Buyer',
      status: 'Active',
      registeredAt: '2026-02-18T16:45:00.000Z',
      plan: 'Investor Premium',
      calculatorUsage: 22,
      pdfPurchases: 6
    },
    {
      id: 'USR-CUST-103',
      name: 'Pooja Hegde',
      email: 'pooja.h@outlook.com',
      phone: '+91 97412 88990',
      role: 'User',
      status: 'Active',
      registeredAt: '2026-02-28T09:10:00.000Z',
      plan: 'Free Member',
      calculatorUsage: 5,
      pdfPurchases: 2
    }
  ],
  partnerCategories: [
    { id: 'cat-re', name: 'Real Estate Agents', count: 18, active: true },
    { id: 'cat-builder', name: 'Builders & Developers', count: 12, active: true },
    { id: 'cat-civil', name: 'Civil Contractors', count: 34, active: true },
    { id: 'cat-arch', name: 'Architects', count: 21, active: true },
    { id: 'cat-eng', name: 'Civil Engineers', count: 28, active: true },
    { id: 'cat-paint', name: 'Painters', count: 46, active: true },
    { id: 'cat-elec', name: 'Electricians', count: 52, active: true },
    { id: 'cat-plumb', name: 'Plumbers', count: 39, active: true },
    { id: 'cat-carp', name: 'Carpenters', count: 31, active: true },
    { id: 'cat-interior', name: 'Interior Designers', count: 25, active: true },
    { id: 'cat-helper', name: 'Construction Helpers', count: 78, active: true },
    { id: 'cat-labour', name: 'Labour Contractors', count: 29, active: true },
    { id: 'cat-other', name: 'Other Construction Pros', count: 14, active: true }
  ],
  partners: [
    {
      id: 'PTR-1001',
      userId: 'USR-PTR-1001',
      name: 'Ramesh Kumar',
      businessName: 'Ramesh Quality Painters & Finishers',
      phone: '+91 98450 11223',
      email: 'ramesh.paint@gmail.com',
      category: 'Painters',
      experienceYears: 8,
      serviceLocations: ['Hyderabad', 'Secunderabad', 'Gachibowli'],
      status: 'Pending Approval',
      rejectionReason: '',
      documents: [
        { name: 'Aadhaar Card', url: 'https://buildmitra-mumbai-storage.s3.ap-south-1.amazonaws.com/kyc/sample_aadhaar.pdf', verified: false },
        { name: 'Work Experience Certificate', url: 'https://buildmitra-mumbai-storage.s3.ap-south-1.amazonaws.com/kyc/sample_exp.pdf', verified: false }
      ],
      subscriptionPlan: 'Professional',
      subscriptionStatus: 'Trial',
      registeredAt: '2026-03-01T09:15:00.000Z'
    },
    {
      id: 'PTR-1002',
      userId: 'USR-PTR-1002',
      name: 'Suresh Varma',
      businessName: 'Varma Civil & Structural Infra',
      phone: '+91 97000 88990',
      email: 'suresh@varmainfra.com',
      category: 'Civil Contractors',
      experienceYears: 12,
      serviceLocations: ['Bengaluru', 'Whitefield', 'Electronic City'],
      status: 'Approved',
      rejectionReason: '',
      documents: [
        { name: 'GST Certificate', url: 'https://buildmitra-mumbai-storage.s3.ap-south-1.amazonaws.com/kyc/gst_cert.pdf', verified: true }
      ],
      subscriptionPlan: 'Premium Enterprise',
      subscriptionStatus: 'Active',
      registeredAt: '2026-02-20T11:00:00.000Z'
    },
    {
      id: 'PTR-1003',
      userId: 'USR-PTR-1003',
      name: 'Ar. Rajesh Nambiar',
      businessName: 'Studio Nambiar Architectural Studio',
      phone: '+91 98451 99887',
      email: 'rajesh@nambiararch.com',
      category: 'Architects',
      experienceYears: 14,
      serviceLocations: ['Bengaluru', 'Indiranagar', 'Koramangala'],
      status: 'Approved',
      rejectionReason: '',
      documents: [
        { name: 'Council of Architecture (COA) License', url: 'https://buildmitra-mumbai-storage.s3.ap-south-1.amazonaws.com/kyc/coa_license.pdf', verified: true }
      ],
      subscriptionPlan: 'Premium Enterprise',
      subscriptionStatus: 'Active',
      registeredAt: '2026-02-12T10:00:00.000Z'
    },
    {
      id: 'PTR-1004',
      userId: 'USR-PTR-1004',
      name: 'Mohammed Mansoor',
      businessName: 'Mansoor Master Electricals & Solar',
      phone: '+91 99801 33445',
      email: 'mansoor.elec@gmail.com',
      category: 'Electricians',
      experienceYears: 9,
      serviceLocations: ['Hyderabad', 'Banjara Hills', 'Jubilee Hills', 'Kukatpally'],
      status: 'Approved',
      rejectionReason: '',
      documents: [
        { name: 'State Electrical Contractor License', url: 'https://buildmitra-mumbai-storage.s3.ap-south-1.amazonaws.com/kyc/elec_license.pdf', verified: true }
      ],
      subscriptionPlan: 'Professional',
      subscriptionStatus: 'Active',
      registeredAt: '2026-02-25T14:30:00.000Z'
    },
    {
      id: 'PTR-1005',
      userId: 'USR-PTR-1005',
      name: 'Gurpreet Singh',
      businessName: 'Singh Labour & Civil Manpower Net',
      phone: '+91 98110 77665',
      email: 'gurpreet.labour@gmail.com',
      category: 'Labour Contractors',
      experienceYears: 11,
      serviceLocations: ['Bengaluru', 'Hyderabad', 'Chennai'],
      status: 'Pending Approval',
      rejectionReason: '',
      documents: [
        { name: 'Labour Dept Registration', url: 'https://buildmitra-mumbai-storage.s3.ap-south-1.amazonaws.com/kyc/labour_reg.pdf', verified: false }
      ],
      subscriptionPlan: 'Basic Partner',
      subscriptionStatus: 'Trial',
      registeredAt: '2026-03-02T16:20:00.000Z'
    }
  ],
  properties: [
    {
      id: 'PROP-501',
      title: '3BHK Luxury Gated Villa - Gachibowli Hills',
      category: 'Villa',
      type: 'Sale',
      price: '₹ 1.85 Cr',
      areaSqFt: 2400,
      city: 'Hyderabad',
      locality: 'Gachibowli',
      sellerName: 'Sri City Developers',
      status: 'Active',
      images: ['https://buildmitra-mumbai-storage.s3.ap-south-1.amazonaws.com/media/villa_hero.jpg'],
      createdAt: '2026-02-25T16:00:00.000Z'
    },
    {
      id: 'PROP-502',
      title: 'Commercial Office Space 4500 Sq.Ft',
      category: 'Commercial',
      type: 'Lease',
      price: '₹ 2.4 Lakh/mo',
      areaSqFt: 4500,
      city: 'Bengaluru',
      locality: 'ORR Marathahalli',
      sellerName: 'Deccan Commercials',
      status: 'Active',
      images: ['https://buildmitra-mumbai-storage.s3.ap-south-1.amazonaws.com/media/office_comm.jpg'],
      createdAt: '2026-03-02T12:00:00.000Z'
    },
    {
      id: 'PROP-503',
      title: '4BHK Sky Mansion Penthouse with Infinity Terrace',
      category: 'Apartment',
      type: 'Sale',
      price: '₹ 3.60 Cr',
      areaSqFt: 3850,
      city: 'Bengaluru',
      locality: 'Koramangala 4th Block',
      sellerName: 'Prestige Partner Realty',
      status: 'Active',
      images: ['https://buildmitra-mumbai-storage.s3.ap-south-1.amazonaws.com/media/penthouse.jpg'],
      createdAt: '2026-03-01T15:30:00.000Z'
    },
    {
      id: 'PROP-504',
      title: 'Approved RERA Villa Plots (30x40 & 30x50)',
      category: 'Plot',
      type: 'Sale',
      price: '₹ 45.0 Lakh',
      areaSqFt: 1200,
      city: 'Hyderabad',
      locality: 'Mokila Tech Valley',
      sellerName: 'Urban Greens Developers',
      status: 'Active',
      images: ['https://buildmitra-mumbai-storage.s3.ap-south-1.amazonaws.com/media/plot_valley.jpg'],
      createdAt: '2026-02-27T11:15:00.000Z'
    }
  ],
  auctions: [
    {
      id: 'AUC-101',
      title: 'Fe 550D TMT Steel Primary Lot',
      material: 'Fe 550D TMT Steel (Primary)',
      quantity: '25 Metric Tons',
      city: 'Bengaluru',
      startingPrice: '₹ 64,000 / MT',
      reservePrice: '₹ 59,000 / MT',
      currentLowest: '₹ 61,200 / MT',
      lowestBidder: 'JSW Steel Authorized Primary Stockyard',
      status: 'Active',
      bidsCount: 14,
      expiresAt: '2026-12-31T23:59:59.000Z',
      createdAt: '2026-03-01T10:00:00.000Z'
    },
    {
      id: 'AUC-102',
      title: 'OPC 53 Grade Cement Pallet Lot',
      material: 'OPC 53 Grade Cement',
      quantity: '800 Bags',
      city: 'Hyderabad',
      startingPrice: '₹ 380 / Bag',
      reservePrice: '₹ 340 / Bag',
      currentLowest: '₹ 345 / Bag',
      lowestBidder: 'UltraTech Regional Depot Hub',
      status: 'Active',
      bidsCount: 8,
      expiresAt: '2026-12-31T23:59:59.000Z',
      createdAt: '2026-03-02T08:30:00.000Z'
    },
    {
      id: 'AUC-103',
      title: 'Washed Concrete M-Sand Zone-II',
      material: 'Manufactured Sand (M-Sand)',
      quantity: '400 Metric Tons',
      city: 'Bengaluru',
      startingPrice: '₹ 1,450 / MT',
      reservePrice: '₹ 1,280 / MT',
      currentLowest: '₹ 1,310 / MT',
      lowestBidder: 'Robo Silicon Quarry Products',
      status: 'Active',
      bidsCount: 11,
      expiresAt: '2026-12-31T23:59:59.000Z',
      createdAt: '2026-03-02T11:00:00.000Z'
    }
  ],
  auctionBids: [
    {
      id: 'BID-901',
      auctionId: 'AUC-101',
      bidderName: 'JSW Steel Authorized Primary Stockyard',
      bidderPhone: '+91 98888 11111',
      bidAmount: '₹ 61,200 / MT',
      status: 'Lowest',
      timestamp: '2026-03-02T14:15:00.000Z'
    },
    {
      id: 'BID-902',
      auctionId: 'AUC-101',
      bidderName: 'Tata Tiscon Regional Depot Hub',
      bidderPhone: '+91 97777 22222',
      bidAmount: '₹ 62,100 / MT',
      status: 'Outbid',
      timestamp: '2026-03-02T13:45:00.000Z'
    },
    {
      id: 'BID-903',
      auctionId: 'AUC-102',
      bidderName: 'UltraTech Regional Depot Hub',
      bidderPhone: '+91 96666 33333',
      bidAmount: '₹ 345 / Bag',
      status: 'Lowest',
      timestamp: '2026-03-02T15:20:00.000Z'
    }
  ],
  calculators: [
    { id: 'concrete', name: 'Concrete Mix & Grade Calculator', category: 'Civil', defaultRate: 4800, pdfPrice: 20, usageCount: 420 },
    { id: 'steel', name: 'Steel Reinforcement (TMT) Calculator', category: 'Structural', defaultRate: 64, pdfPrice: 20, usageCount: 560 },
    { id: 'brickwork', name: 'Brickwork & Masonry Calculator', category: 'Masonry', defaultRate: 9, pdfPrice: 20, usageCount: 310 },
    { id: 'plastering', name: 'Plastering Mortar Calculator', category: 'Civil', defaultRate: 35, pdfPrice: 20, usageCount: 240 },
    { id: 'paint', name: 'Paint & Primer Area Estimator', category: 'Finishes', defaultRate: 16, pdfPrice: 20, usageCount: 680 },
    { id: 'tile', name: 'Flooring & Wall Tile Estimator', category: 'Finishes', defaultRate: 75, pdfPrice: 20, usageCount: 290 },
    { id: 'turnkey', name: 'Turnkey Construction Cost Calculator', category: 'Comprehensive', defaultRate: 1850, pdfPrice: 20, usageCount: 890 }
  ],
  pdfPurchases: [
    {
      id: 'PDF-7001',
      reportNo: 'BM-EST-2026-8812',
      userPhone: '+91 98765 43210',
      calculatorName: 'Turnkey Construction Cost Calculator',
      areaSqFt: 1500,
      totalEstimate: '₹ 27,75,000',
      amountPaid: 20,
      paymentId: 'pay_live_sample8823',
      s3PdfUrl: 'https://buildmitra-mumbai-storage.s3.ap-south-1.amazonaws.com/reports/sample_report_8812.pdf',
      createdAt: '2026-03-02T15:00:00.000Z'
    },
    {
      id: 'PDF-7002',
      reportNo: 'BM-EST-2026-8813',
      userPhone: '+91 98220 55441',
      calculatorName: 'Steel Reinforcement (TMT) Calculator',
      areaSqFt: 2400,
      totalEstimate: '₹ 6,14,400',
      amountPaid: 20,
      paymentId: 'pay_live_sample8824',
      s3PdfUrl: 'https://buildmitra-mumbai-storage.s3.ap-south-1.amazonaws.com/reports/sample_report_8813.pdf',
      createdAt: '2026-03-02T16:15:00.000Z'
    },
    {
      id: 'PDF-7003',
      reportNo: 'BM-EST-2026-8814',
      userPhone: '+91 97412 88990',
      calculatorName: 'Concrete Mix & Grade Calculator',
      areaSqFt: 1800,
      totalEstimate: '₹ 4,32,000',
      amountPaid: 20,
      paymentId: 'pay_live_sample8825',
      s3PdfUrl: 'https://buildmitra-mumbai-storage.s3.ap-south-1.amazonaws.com/reports/sample_report_8814.pdf',
      createdAt: '2026-03-02T17:40:00.000Z'
    }
  ],
  ai3DModels: [
    {
      id: '3D-201',
      plotDimensions: '30 x 40 Ft (1200 Sq.Ft)',
      buildingType: 'Modern Contemporary Villa (G+2)',
      floors: 3,
      bedrooms: 4,
      bathrooms: 4,
      style: 'Minimalist Glass Facade with Cantilever Balcony',
      requestedBy: '+91 98765 43210',
      status: 'Ready for Review',
      modelUrl: 'https://buildmitra-mumbai-storage.s3.ap-south-1.amazonaws.com/models/villa_3d_render.glb',
      createdAt: '2026-03-01T12:00:00.000Z'
    },
    {
      id: '3D-202',
      plotDimensions: '40 x 60 Ft (2400 Sq.Ft)',
      buildingType: 'Courtyard Haveli Style Independent House (G+1)',
      floors: 2,
      bedrooms: 5,
      bathrooms: 5,
      style: 'Traditional Kerala Timber & Clay Tile Vernacular',
      requestedBy: '+91 98220 55441',
      status: 'Generating 3D Assets',
      modelUrl: '',
      createdAt: '2026-03-02T14:30:00.000Z'
    }
  ],
  payments: [
    {
      id: 'PAY-101',
      orderId: 'order_live_99238',
      paymentId: 'pay_live_sample8823',
      userPhone: '+91 98765 43210',
      amount: 20,
      currency: 'INR',
      purpose: 'PDF Engineering Estimation Report (Turnkey)',
      status: 'Captured',
      createdAt: '2026-03-02T15:00:00.000Z'
    },
    {
      id: 'PAY-102',
      orderId: 'order_live_99239',
      paymentId: 'pay_live_ptr_9901',
      userPhone: '+91 98450 11223',
      amount: 1499,
      currency: 'INR',
      purpose: 'Partner Professional Subscription (Monthly)',
      status: 'Captured',
      createdAt: '2026-03-01T09:14:00.000Z'
    },
    {
      id: 'PAY-103',
      orderId: 'order_live_99240',
      paymentId: 'pay_live_ptr_9902',
      userPhone: '+91 97000 88990',
      amount: 3999,
      currency: 'INR',
      purpose: 'Premium Enterprise Contractor Tier (3 Months)',
      status: 'Captured',
      createdAt: '2026-02-20T11:00:00.000Z'
    },
    {
      id: 'PAY-104',
      orderId: 'order_live_99241',
      paymentId: 'pay_live_sample8824',
      userPhone: '+91 98220 55441',
      amount: 20,
      currency: 'INR',
      purpose: 'PDF Engineering Estimation Report (Steel)',
      status: 'Captured',
      createdAt: '2026-03-02T16:15:00.000Z'
    }
  ],
  subscriptionPlans: [
    { id: 'plan-free', name: 'Free Member', price: 0, duration: 'Lifetime', features: ['Public Directory Browsing', 'Basic Calculator Usage', 'Enquiry Submission'], active: true },
    { id: 'plan-basic', name: 'Basic Partner', price: 799, duration: '1 Month', features: ['Verified Badge', 'Up to 10 Client Leads/month', 'Standard Support'], active: true },
    { id: 'plan-pro', name: 'Professional Partner', price: 1499, duration: '1 Month', features: ['Priority Search Ranking', 'Unlimited Client Leads', 'Direct Call Connect', 'S3 Portfolio Showcase'], active: true },
    { id: 'plan-premium', name: 'Premium Enterprise', price: 3999, duration: '3 Months', features: ['Top Homepage Feature', 'Reverse Auction Supplier Access', 'Dedicated Account Manager', 'Verified GST Badge'], active: true }
  ],
  courses: [
    {
      id: 'CRS-01',
      title: 'Advanced Civil Site Execution & Quality Control (IS 456)',
      category: 'Civil Engineering',
      price: 999,
      isFree: false,
      thumbnailUrl: 'https://buildmitra-mumbai-storage.s3.ap-south-1.amazonaws.com/media/course_civil.jpg',
      description: 'Master concrete pour inspection, rebar tying checks, slump tests, and curing protocols.',
      lessonsCount: 16,
      isPublished: true,
      enrollmentsCount: 84
    },
    {
      id: 'CRS-02',
      title: 'Practical Quantity Surveying & Bar Bending Schedule (BBS)',
      category: 'Quantity Surveying',
      price: 1499,
      isFree: false,
      thumbnailUrl: 'https://buildmitra-mumbai-storage.s3.ap-south-1.amazonaws.com/media/course_bbs.jpg',
      description: 'Hands-on calculation of steel cutting length, wastage minimization, and vendor BOQ audits.',
      lessonsCount: 22,
      isPublished: true,
      enrollmentsCount: 112
    },
    {
      id: 'CRS-03',
      title: 'MEP Project Execution: Electrical, Plumbing & HVAC Coordination',
      category: 'MEP Services',
      price: 1299,
      isFree: false,
      thumbnailUrl: 'https://buildmitra-mumbai-storage.s3.ap-south-1.amazonaws.com/media/course_mep.jpg',
      description: 'Zero-clash MEP conduit routing, pressure testing pipes, and switchboard distribution.',
      lessonsCount: 18,
      isPublished: true,
      enrollmentsCount: 65
    }
  ],
  products: [
    { id: 'PRD-01', name: 'Fe 550D TMT Rebar (Primary Steel)', brand: 'JSW Steel & Tata Tiscon', unit: 'Metric Ton', price: '₹ 61,200/MT', stock: 'In Stock' },
    { id: 'PRD-02', name: 'OPC 53 Grade High-Strength Cement', brand: 'UltraTech & ACC', unit: '50 Kg Bag', price: '₹ 345/Bag', stock: 'In Stock' },
    { id: 'PRD-03', name: 'Double Washed Concrete M-Sand', brand: 'Certified Quarries', unit: 'Tonne', price: '₹ 1,310/MT', stock: 'Ready for Dispatch' },
    { id: 'PRD-04', name: 'First Class Red Kiln Burnt Clay Bricks', brand: 'Standard 9x4x3', unit: '1,000 Pcs', price: '₹ 8,900/Lot', stock: 'In Stock' }
  ],
  services: [
    { id: 'SRV-01', name: 'Turnkey Civil Construction', rate: '₹ 1,850/Sq.Ft', turnaround: '6-9 Months', activeProviders: 34 },
    { id: 'SRV-02', name: 'Premium Interior Painting & Primer', rate: '₹ 16/Sq.Ft', turnaround: '2-4 Days', activeProviders: 46 },
    { id: 'SRV-03', name: 'Complete House Wiring & Circuit Protection', rate: '₹ 22/Sq.Ft', turnaround: '3-5 Days', activeProviders: 52 },
    { id: 'SRV-04', name: 'Sanitary & Concealed Plumbing', rate: '₹ 18/Sq.Ft', turnaround: '2-3 Days', activeProviders: 39 }
  ],
  cmsSections: {
    hero: {
      title: 'Build Smart. Build Better.',
      subtitle: "India's Premier Digital Ecosystem for Construction, Real Estate Intelligence & On-Demand Home Services",
      ctaPrimaryText: 'Explore Verified Services',
      ctaPrimaryLink: '/services',
      ctaSecondaryText: 'Reverse Auction Procurement',
      ctaSecondaryLink: '/reverse-auction',
      heroImageUrl: 'https://buildmitra-mumbai-storage.s3.ap-south-1.amazonaws.com/media/hero_main.png',
      published: true
    },
    announcement: {
      text: '🚀 AWS S3 Storage & Razorpay Live Gateway Activated across Mumbai (ap-south-1)',
      active: true,
      link: '/reverse-auction'
    },
    about: {
      heading: 'About BuildMitra Ecosystem',
      body: 'BuildMitra connects verified civil contractors, skilled tradesmen, primary material suppliers, and real estate developers with property owners through transparent digital pricing, reverse auctions, and engineering calculators.',
      published: true
    }
  },
  mediaAssets: [
    {
      id: 'MED-01',
      originalName: 'buildmitra_logo.png',
      s3Url: 'https://buildmitra-mumbai-storage.s3.ap-south-1.amazonaws.com/media/logo.png',
      s3Key: 'media/logo.png',
      mimeType: 'image/png',
      size: 84231,
      category: 'Branding',
      uploadedAt: '2026-03-01T00:00:00.000Z'
    },
    {
      id: 'MED-02',
      originalName: 'gachibowli_villa_render.jpg',
      s3Url: 'https://buildmitra-mumbai-storage.s3.ap-south-1.amazonaws.com/media/villa_hero.jpg',
      s3Key: 'media/villa_hero.jpg',
      mimeType: 'image/jpeg',
      size: 428190,
      category: 'Real Estate',
      uploadedAt: '2026-03-01T14:20:00.000Z'
    },
    {
      id: 'MED-03',
      originalName: 'fe550d_tmt_steel_yard.jpg',
      s3Url: 'https://buildmitra-mumbai-storage.s3.ap-south-1.amazonaws.com/media/steel_yard.jpg',
      s3Key: 'media/steel_yard.jpg',
      mimeType: 'image/jpeg',
      size: 382100,
      category: 'Materials',
      uploadedAt: '2026-03-02T10:15:00.000Z'
    }
  ],
  notifications: [
    { id: 'NOTIF-01', title: 'Reverse Auction Live', body: 'New lot of 25 MT Fe 550D TMT Steel open for bids in Bengaluru.', date: 'Today, 2:15 PM', type: 'Auction' },
    { id: 'NOTIF-02', title: 'Partner KYC Submitted', body: 'Ramesh Quality Painters submitted Aadhaar & experience proof for review.', date: 'Today, 11:30 AM', type: 'KYC' },
    { id: 'NOTIF-03', title: 'Payment Settled', body: 'Razorpay Live captured ₹1,499 from Varma Civil Infra.', date: 'Yesterday, 4:20 PM', type: 'Payment' }
  ],
  supportRequests: [
    {
      id: 'TKT-101',
      name: 'Dr. Srinivas Reddy',
      phone: '+91 94401 22889',
      email: 'srinivas.r@gmail.com',
      subject: 'Turnkey Construction Quote for 3000 Sq.Ft Plot in Jubilee Hills',
      message: 'Looking for a verified civil contractor to execute G+2 RCC construction. Need soil testing report integration.',
      status: 'Open',
      timestamp: '2026-03-02T11:45:00.000Z'
    },
    {
      id: 'TKT-102',
      name: 'Meenakshi Sundaram',
      phone: '+91 98840 55112',
      email: 'meenakshi@gmail.com',
      subject: 'Clarification regarding ₹20 Detailed Estimation Report',
      message: 'Downloaded the Turnkey Calculator PDF report. Needed assistance with interpreting M-Sand ratio.',
      status: 'Resolved',
      timestamp: '2026-03-01T15:20:00.000Z'
    }
  ],
  adminUsers: [
    { id: 'ADM-01', name: 'Master Super Admin', email: 'admin@buildmitra.com', role: 'Super Admin', permissions: 'Full Access (All 28 Modules)', lastLogin: 'Today, 6:30 PM' },
    { id: 'ADM-02', name: 'Pradeep Chawla', email: 'pradeep.ops@buildmitra.com', role: 'Operations Admin', permissions: 'KYC Approvals & Partner Mgmt', lastLogin: 'Today, 3:15 PM' },
    { id: 'ADM-03', name: 'Kavitha Swaminathan', email: 'kavitha.finance@buildmitra.com', role: 'Finance Admin', permissions: 'Razorpay & Revenue Ledger', lastLogin: 'Yesterday, 5:45 PM' }
  ],
  auditLogs: [
    {
      id: 'LOG-01',
      action: 'SYSTEM_BOOT',
      user: 'SYSTEM',
      details: 'BuildMitra Backend API & S3 Storage initialized in Mumbai ap-south-1',
      timestamp: '2026-03-01T00:00:00.000Z'
    },
    {
      id: 'LOG-02',
      action: 'RAZORPAY_CAPTURE',
      user: 'rzp_live_U3Cm82CFvT9y1U',
      details: 'Captured ₹20 fee for report BM-EST-2026-8812',
      timestamp: '2026-03-02T15:00:00.000Z'
    },
    {
      id: 'LOG-03',
      action: 'PARTNER_APPROVAL',
      user: 'ADMIN',
      details: 'Approved partner PTR-1002 (Varma Civil & Structural Infra)',
      timestamp: '2026-03-02T16:00:00.000Z'
    }
  ],
  systemSettings: {
    platformName: 'BuildMitra',
    contactEmail: 'contact@buildmitra.com',
    contactPhone: '+91 98450 00001',
    pdfDefaultPrice: 20,
    s3Bucket: 'buildmitra-mumbai-storage',
    awsRegion: 'ap-south-1',
    razorpayActive: true,
    maintenanceMode: false
  }
};

class Database {
  constructor() {
    this.data = this.load();
  }

  load() {
    try {
      if (fs.existsSync(DB_FILE)) {
        const raw = fs.readFileSync(DB_FILE, 'utf8');
        return JSON.parse(raw);
      }
    } catch (err) {
      console.error('Error loading DB file, fallback to initial schema:', err);
    }
    this.save(INITIAL_DATABASE);
    return INITIAL_DATABASE;
  }

  save(data = this.data) {
    try {
      const tempFile = `${DB_FILE}.tmp`;
      fs.writeFileSync(tempFile, JSON.stringify(data, null, 2), 'utf8');
      fs.renameSync(tempFile, DB_FILE);
    } catch (err) {
      console.error('Error saving DB file:', err);
    }
  }

  logAudit(action, user, details) {
    const entry = {
      id: `LOG-${Date.now()}`,
      action,
      user: user || 'ADMIN',
      details: typeof details === 'object' ? JSON.stringify(details) : String(details),
      timestamp: new Date().toISOString()
    };
    this.data.auditLogs.unshift(entry);
    if (this.data.auditLogs.length > 500) this.data.auditLogs.pop();
    this.save();
    return entry;
  }
}

const db = new Database();

module.exports = db;
