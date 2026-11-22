const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, 'data');
const DB_FILE = path.join(DATA_DIR, 'buildmitra_db.json');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initial default schema & seed state
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
      calculatorUsage: 6,
      pdfPurchases: 2
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
    }
  ],
  partnerCategories: [
    { id: 'cat-re', name: 'Real Estate Agents', count: 12, active: true },
    { id: 'cat-builder', name: 'Builders & Developers', count: 8, active: true },
    { id: 'cat-civil', name: 'Civil Contractors', count: 24, active: true },
    { id: 'cat-arch', name: 'Architects', count: 15, active: true },
    { id: 'cat-eng', name: 'Civil Engineers', count: 18, active: true },
    { id: 'cat-paint', name: 'Painters', count: 32, active: true },
    { id: 'cat-elec', name: 'Electricians', count: 40, active: true },
    { id: 'cat-plumb', name: 'Plumbers', count: 29, active: true },
    { id: 'cat-carp', name: 'Carpenters', count: 22, active: true },
    { id: 'cat-interior', name: 'Interior Designers', count: 16, active: true },
    { id: 'cat-helper', name: 'Construction Helpers', count: 55, active: true },
    { id: 'cat-labour', name: 'Labour Contractors', count: 19, active: true },
    { id: 'cat-other', name: 'Other Construction Pros', count: 7, active: true }
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
      status: 'Pending Approval', // 'Pending Approval' | 'Approved' | 'Rejected' | 'Suspended'
      rejectionReason: '',
      documents: [
        { name: 'Aadhaar Card', url: 'https://buildmitra-mumbai-storage.s3.ap-south-1.amazonaws.com/kyc/sample_aadhaar.pdf', verified: false },
        { name: 'Work Experience Certificate', url: 'https://buildmitra-mumbai-storage.s3.ap-south-1.amazonaws.com/kyc/sample_exp.pdf', verified: false }
      ],
      subscriptionPlan: 'Professional',
      subscriptionStatus: 'Active',
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
    }
  ],
  auctions: [
    {
      id: 'AUC-101',
      title: 'Fe 550D TMT Steel Primary Lot',
      material: 'Fe 550D TMT Steel',
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
      lowestBidder: 'UltraTech Depot Hub',
      status: 'Active',
      bidsCount: 8,
      expiresAt: '2026-12-31T23:59:59.000Z',
      createdAt: '2026-03-02T08:30:00.000Z'
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
      purpose: 'PDF Engineering Estimation Report',
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
    }
  ],
  subscriptionPlans: [
    { id: 'plan-free', name: 'Free Tier', price: 0, duration: 'Lifetime', features: ['Public Directory Browsing', 'Basic Calculator Usage', 'Enquiry Submission'], active: true },
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
    }
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
    }
  ],
  auditLogs: [
    {
      id: 'LOG-01',
      action: 'SYSTEM_BOOT',
      user: 'SYSTEM',
      details: 'BuildMitra Backend API & S3 Storage initialized in Mumbai ap-south-1',
      timestamp: '2026-03-01T00:00:00.000Z'
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
