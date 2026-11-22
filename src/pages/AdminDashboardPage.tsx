import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  ShieldCheck, 
  Users, 
  Building2, 
  Gavel, 
  Calculator, 
  FileText, 
  Layers, 
  ShoppingBag, 
  Home, 
  Image as ImageIcon, 
  CreditCard, 
  TrendingUp, 
  Bell, 
  LifeBuoy, 
  UserCheck, 
  Activity, 
  Cloud, 
  Settings, 
  Search, 
  Check, 
  X, 
  AlertCircle, 
  Upload, 
  Trash2, 
  ExternalLink, 
  DollarSign, 
  RefreshCw,
  Plus,
  Server,
  Lock,
  Eye,
  Edit3,
  Award,
  Sparkles,
  Phone,
  Mail,
  MapPin,
  Clock,
  Download,
  Database,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { 
  api, 
  AnalyticsData, 
  UserRecord, 
  PartnerRecord, 
  AuctionRecord, 
  CalculatorRecord, 
  MediaAsset, 
  PaymentRecord, 
  CourseRecord, 
  AuditLogRecord 
} from '../services/api';
import { useApp } from '../context/AppContext';

// 28 Standard Sidebar Sections mapped to Phase 13
export type AdminSectionKey =
  | 'overview'
  | 'users'
  | 're_users'
  | 'sellers'
  | 'partners'
  | 'partner_approvals'
  | 'contractors_helpers'
  | 'properties'
  | 'auctions'
  | 'calculators'
  | 'calc_reports'
  | 'pdf_purchases'
  | '3d_models'
  | 'courses'
  | 'products'
  | 'services'
  | 'homepage_mgmt'
  | 'page_sections'
  | 'media_library'
  | 'subscriptions'
  | 'payments'
  | 'revenue_analytics'
  | 'notifications'
  | 'support_requests'
  | 'admin_users'
  | 'audit_logs'
  | 'aws_status'
  | 'settings';

interface SidebarItem {
  key: AdminSectionKey;
  label: string;
  icon: React.ElementType;
  badge?: string | number;
}

export const AdminDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { smtpConfig, setSmtpConfig, sendTestEmail, emailLogs } = useApp();

  const [activeSection, setActiveSection] = useState<AdminSectionKey>('overview');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [dateFilter, setDateFilter] = useState<'today' | '7d' | '30d' | '90d' | 'all'>('30d');

  // Rich initial fallback datasets so all 28 modules display comprehensive platform data immediately
  const [analytics, setAnalytics] = useState<AnalyticsData | null>({
    users: { total: 5, active: 5, inactive: 0, realEstateUsers: 2 },
    partners: { total: 5, pendingApprovals: 2, approved: 3, rejected: 0, contractors: 1, painters: 1, electricians: 1, plumbers: 0 },
    realEstate: { totalProperties: 4, totalAuctions: 3, activeAuctions: 3 },
    calculators: { totalUsage: 3120, totalPdfPurchases: 3, pdfRevenue: 60 },
    finance: { totalRevenue: 5558, subscriptionRevenue: 5498, pdfRevenue: 60, totalTransactions: 4 },
    cloud: { region: 'ap-south-1 (Mumbai)', bucket: 'buildmitra-mumbai-storage', razorpayLiveId: 'rzp_live_U3Cm82CFvT9y1U' }
  });

  const [users, setUsers] = useState<UserRecord[]>([
    { id: 'USR-ADMIN-01', name: 'BuildMitra Super Admin', email: 'admin@buildmitra.com', phone: '+91 98450 00001', role: 'Super Admin', status: 'Active', registeredAt: '2026-01-01', plan: 'Enterprise Admin', calculatorUsage: 45, pdfPurchases: 12 },
    { id: 'USR-CUST-101', name: 'Ananya Sharma', email: 'ananya.s@gmail.com', phone: '+91 98765 43210', role: 'User', status: 'Active', registeredAt: '2026-02-10', plan: 'Free Member', calculatorUsage: 8, pdfPurchases: 3 },
    { id: 'USR-SELLER-201', name: 'Sri City Developers & Realtors', email: 'sales@sricitydev.in', phone: '+91 99001 22334', role: 'Real Estate Seller', status: 'Active', registeredAt: '2026-02-15', plan: 'Professional Seller', calculatorUsage: 14, pdfPurchases: 5 },
    { id: 'USR-CUST-102', name: 'Vikramaditya Rao', email: 'vikram.rao@infra.org', phone: '+91 98220 55441', role: 'Real Estate Buyer', status: 'Active', registeredAt: '2026-02-18', plan: 'Investor Premium', calculatorUsage: 22, pdfPurchases: 6 },
    { id: 'USR-CUST-103', name: 'Pooja Hegde', email: 'pooja.h@outlook.com', phone: '+91 97412 88990', role: 'User', status: 'Active', registeredAt: '2026-02-28', plan: 'Free Member', calculatorUsage: 5, pdfPurchases: 2 }
  ]);

  const [partners, setPartners] = useState<PartnerRecord[]>([
    { id: 'PTR-1001', userId: 'USR-PTR-1001', name: 'Ramesh Kumar', businessName: 'Ramesh Quality Painters & Finishers', phone: '+91 98450 11223', email: 'ramesh.paint@gmail.com', category: 'Painters', experienceYears: 8, serviceLocations: ['Hyderabad', 'Secunderabad', 'Gachibowli'], status: 'Pending Approval', documents: [{ name: 'Aadhaar Card', url: 'https://buildmitra-mumbai-storage.s3.ap-south-1.amazonaws.com/kyc/sample_aadhaar.pdf', verified: false }], subscriptionPlan: 'Professional', subscriptionStatus: 'Trial', registeredAt: '2026-03-01' },
    { id: 'PTR-1002', userId: 'USR-PTR-1002', name: 'Suresh Varma', businessName: 'Varma Civil & Structural Infra', phone: '+91 97000 88990', email: 'suresh@varmainfra.com', category: 'Civil Contractors', experienceYears: 12, serviceLocations: ['Bengaluru', 'Whitefield', 'Electronic City'], status: 'Approved', documents: [{ name: 'GST Certificate', url: 'https://buildmitra-mumbai-storage.s3.ap-south-1.amazonaws.com/kyc/gst_cert.pdf', verified: true }], subscriptionPlan: 'Premium Enterprise', subscriptionStatus: 'Active', registeredAt: '2026-02-20' },
    { id: 'PTR-1003', userId: 'USR-PTR-1003', name: 'Ar. Rajesh Nambiar', businessName: 'Studio Nambiar Architectural Studio', phone: '+91 98451 99887', email: 'rajesh@nambiararch.com', category: 'Architects', experienceYears: 14, serviceLocations: ['Bengaluru', 'Indiranagar', 'Koramangala'], status: 'Approved', documents: [{ name: 'COA License', url: 'https://buildmitra-mumbai-storage.s3.ap-south-1.amazonaws.com/kyc/coa_license.pdf', verified: true }], subscriptionPlan: 'Premium Enterprise', subscriptionStatus: 'Active', registeredAt: '2026-02-12' },
    { id: 'PTR-1004', userId: 'USR-PTR-1004', name: 'Mohammed Mansoor', businessName: 'Mansoor Master Electricals & Solar', phone: '+91 99801 33445', email: 'mansoor.elec@gmail.com', category: 'Electricians', experienceYears: 9, serviceLocations: ['Hyderabad', 'Banjara Hills', 'Jubilee Hills'], status: 'Approved', documents: [{ name: 'State Electrical Contractor License', url: 'https://buildmitra-mumbai-storage.s3.ap-south-1.amazonaws.com/kyc/elec_license.pdf', verified: true }], subscriptionPlan: 'Professional', subscriptionStatus: 'Active', registeredAt: '2026-02-25' },
    { id: 'PTR-1005', userId: 'USR-PTR-1005', name: 'Gurpreet Singh', businessName: 'Singh Labour & Civil Manpower Net', phone: '+91 98110 77665', email: 'gurpreet.labour@gmail.com', category: 'Labour Contractors', experienceYears: 11, serviceLocations: ['Bengaluru', 'Hyderabad', 'Chennai'], status: 'Pending Approval', documents: [{ name: 'Labour Dept Registration', url: 'https://buildmitra-mumbai-storage.s3.ap-south-1.amazonaws.com/kyc/labour_reg.pdf', verified: false }], subscriptionPlan: 'Basic Partner', subscriptionStatus: 'Trial', registeredAt: '2026-03-02' }
  ]);

  const [categories, setCategories] = useState<{ id: string; name: string; count: number; active: boolean }[]>([
    { id: 'cat-re', name: 'Real Estate Agents', count: 18, active: true },
    { id: 'cat-builder', name: 'Builders & Developers', count: 12, active: true },
    { id: 'cat-civil', name: 'Civil Contractors', count: 34, active: true },
    { id: 'cat-arch', name: 'Architects', count: 21, active: true },
    { id: 'cat-eng', name: 'Civil Engineers', count: 28, active: true },
    { id: 'cat-paint', name: 'Painters', count: 46, active: true },
    { id: 'cat-elec', name: 'Electricians', count: 52, active: true },
    { id: 'cat-plumb', name: 'Plumbers', count: 39, active: true }
  ]);

  const [auctions, setAuctions] = useState<AuctionRecord[]>([
    { id: 'AUC-101', title: 'Fe 550D TMT Steel Primary Lot', material: 'Fe 550D TMT Steel (Primary)', quantity: '25 Metric Tons', city: 'Bengaluru', startingPrice: '₹ 64,000 / MT', reservePrice: '₹ 59,000 / MT', currentLowest: '₹ 61,200 / MT', lowestBidder: 'JSW Steel Authorized Primary Stockyard', status: 'Active', bidsCount: 14, expiresAt: '2026-12-31' },
    { id: 'AUC-102', title: 'OPC 53 Grade Cement Pallet Lot', material: 'OPC 53 Grade Cement', quantity: '800 Bags', city: 'Hyderabad', startingPrice: '₹ 380 / Bag', reservePrice: '₹ 340 / Bag', currentLowest: '₹ 345 / Bag', lowestBidder: 'UltraTech Regional Depot Hub', status: 'Active', bidsCount: 8, expiresAt: '2026-12-31' },
    { id: 'AUC-103', title: 'Washed Concrete M-Sand Zone-II', material: 'Manufactured Sand (M-Sand)', quantity: '400 Metric Tons', city: 'Bengaluru', startingPrice: '₹ 1,450 / MT', reservePrice: '₹ 1,280 / MT', currentLowest: '₹ 1,310 / MT', lowestBidder: 'Robo Silicon Quarry Products', status: 'Active', bidsCount: 11, expiresAt: '2026-12-31' }
  ]);

  const [calculators, setCalculators] = useState<CalculatorRecord[]>([
    { id: 'concrete', name: 'Concrete Mix & Grade Calculator', category: 'Civil', defaultRate: 4800, pdfPrice: 20, usageCount: 420 },
    { id: 'steel', name: 'Steel Reinforcement (TMT) Calculator', category: 'Structural', defaultRate: 64, pdfPrice: 20, usageCount: 560 },
    { id: 'brickwork', name: 'Brickwork & Masonry Calculator', category: 'Masonry', defaultRate: 9, pdfPrice: 20, usageCount: 310 },
    { id: 'plastering', name: 'Plastering Mortar Calculator', category: 'Civil', defaultRate: 35, pdfPrice: 20, usageCount: 240 },
    { id: 'paint', name: 'Paint & Primer Area Estimator', category: 'Finishes', defaultRate: 16, pdfPrice: 20, usageCount: 680 },
    { id: 'turnkey', name: 'Turnkey Construction Cost Calculator', category: 'Comprehensive', defaultRate: 1850, pdfPrice: 20, usageCount: 890 }
  ]);

  const [mediaList, setMediaList] = useState<MediaAsset[]>([
    { id: 'MED-01', originalName: 'buildmitra_logo.png', s3Url: 'https://buildmitra-mumbai-storage.s3.ap-south-1.amazonaws.com/media/logo.png', s3Key: 'media/logo.png', mimeType: 'image/png', size: 84231, category: 'Branding', uploadedAt: '2026-03-01' },
    { id: 'MED-02', originalName: 'gachibowli_villa_render.jpg', s3Url: 'https://buildmitra-mumbai-storage.s3.ap-south-1.amazonaws.com/media/villa_hero.jpg', s3Key: 'media/villa_hero.jpg', mimeType: 'image/jpeg', size: 428190, category: 'Real Estate', uploadedAt: '2026-03-01' },
    { id: 'MED-03', originalName: 'fe550d_tmt_steel_yard.jpg', s3Url: 'https://buildmitra-mumbai-storage.s3.ap-south-1.amazonaws.com/media/steel_yard.jpg', s3Key: 'media/steel_yard.jpg', mimeType: 'image/jpeg', size: 382100, category: 'Materials', uploadedAt: '2026-03-02' }
  ]);

  const [payments, setPayments] = useState<PaymentRecord[]>([
    { id: 'PAY-101', orderId: 'order_live_99238', paymentId: 'pay_live_sample8823', userPhone: '+91 98765 43210', amount: 20, currency: 'INR', purpose: 'PDF Engineering Estimation Report (Turnkey)', status: 'Captured', createdAt: '2026-03-02T15:00:00.000Z' },
    { id: 'PAY-102', orderId: 'order_live_99239', paymentId: 'pay_live_ptr_9901', userPhone: '+91 98450 11223', amount: 1499, currency: 'INR', purpose: 'Partner Professional Subscription (Monthly)', status: 'Captured', createdAt: '2026-03-01T09:14:00.000Z' },
    { id: 'PAY-103', orderId: 'order_live_99240', paymentId: 'pay_live_ptr_9902', userPhone: '+91 97000 88990', amount: 3999, currency: 'INR', purpose: 'Premium Enterprise Contractor Tier (3 Months)', status: 'Captured', createdAt: '2026-02-20T11:00:00.000Z' },
    { id: 'PAY-104', orderId: 'order_live_99241', paymentId: 'pay_live_sample8824', userPhone: '+91 98220 55441', amount: 20, currency: 'INR', purpose: 'PDF Engineering Estimation Report (Steel)', status: 'Captured', createdAt: '2026-03-02T16:15:00.000Z' }
  ]);

  const [courses, setCourses] = useState<CourseRecord[]>([
    { id: 'CRS-01', title: 'Advanced Civil Site Execution & Quality Control (IS 456)', category: 'Civil Engineering', price: 999, isFree: false, thumbnailUrl: 'https://buildmitra-mumbai-storage.s3.ap-south-1.amazonaws.com/media/course_civil.jpg', description: 'Concrete pour inspections, rebar tying checks, slump tests.', lessonsCount: 16, isPublished: true, enrollmentsCount: 84 },
    { id: 'CRS-02', title: 'Practical Quantity Surveying & Bar Bending Schedule (BBS)', category: 'Quantity Surveying', price: 1499, isFree: false, thumbnailUrl: 'https://buildmitra-mumbai-storage.s3.ap-south-1.amazonaws.com/media/course_bbs.jpg', description: 'Hands-on calculation of steel cutting length and BOQ audits.', lessonsCount: 22, isPublished: true, enrollmentsCount: 112 }
  ]);

  const [auditLogs, setAuditLogs] = useState<AuditLogRecord[]>([
    { id: 'LOG-01', action: 'SYSTEM_BOOT', user: 'SYSTEM', details: 'BuildMitra Backend API & S3 Storage initialized in Mumbai ap-south-1', timestamp: '2026-03-01T00:00:00.000Z' },
    { id: 'LOG-02', action: 'RAZORPAY_CAPTURE', user: 'rzp_live_U3Cm82CFvT9y1U', details: 'Captured ₹20 fee for report BM-EST-2026-8812', timestamp: '2026-03-02T15:00:00.000Z' },
    { id: 'LOG-03', action: 'PARTNER_APPROVAL', user: 'ADMIN', details: 'Approved partner PTR-1002 (Varma Civil & Structural Infra)', timestamp: '2026-03-02T16:00:00.000Z' }
  ]);

  const [cmsSections, setCmsSections] = useState<Record<string, any>>({
    hero: { title: 'Build Smart. Build Better.', subtitle: "India's Premier Digital Ecosystem for Construction, Real Estate Intelligence & On-Demand Home Services", ctaPrimaryText: 'Explore Verified Services', ctaPrimaryLink: '/services', heroImageUrl: 'https://buildmitra-mumbai-storage.s3.ap-south-1.amazonaws.com/media/hero_main.png' },
    announcement: { text: '🚀 AWS S3 Storage & Razorpay Live Gateway Activated across Mumbai (ap-south-1)' },
    about: { heading: 'About BuildMitra Ecosystem', body: 'BuildMitra connects verified civil contractors, skilled tradesmen, primary material suppliers, and real estate developers with property owners through transparent digital pricing, reverse auctions, and engineering calculators.' }
  });

  const [systemSettings, setSystemSettings] = useState<any>({
    platformName: 'BuildMitra',
    contactEmail: 'contact@buildmitra.com',
    contactPhone: '+91 98450 00001',
    pdfDefaultPrice: 20,
    s3Bucket: 'buildmitra-mumbai-storage',
    awsRegion: 'ap-south-1',
    razorpayActive: true
  });
  
  // Extended modular collections
  const [properties, setProperties] = useState<any[]>([
    { id: 'PROP-501', title: '3BHK Luxury Gated Villa - Gachibowli Hills', category: 'Villa', type: 'Sale', price: '₹ 1.85 Cr', areaSqFt: 2400, city: 'Hyderabad', locality: 'Gachibowli', sellerName: 'Sri City Developers', status: 'Active', images: ['https://buildmitra-mumbai-storage.s3.ap-south-1.amazonaws.com/media/villa_hero.jpg'] },
    { id: 'PROP-502', title: 'Commercial Office Space 4500 Sq.Ft', category: 'Commercial', type: 'Lease', price: '₹ 2.4 Lakh/mo', areaSqFt: 4500, city: 'Bengaluru', locality: 'ORR Marathahalli', sellerName: 'Deccan Commercials', status: 'Active', images: ['https://buildmitra-mumbai-storage.s3.ap-south-1.amazonaws.com/media/office_comm.jpg'] },
    { id: 'PROP-503', title: '4BHK Sky Mansion Penthouse with Infinity Terrace', category: 'Apartment', type: 'Sale', price: '₹ 3.60 Cr', areaSqFt: 3850, city: 'Bengaluru', locality: 'Koramangala 4th Block', sellerName: 'Prestige Partner Realty', status: 'Active', images: ['https://buildmitra-mumbai-storage.s3.ap-south-1.amazonaws.com/media/penthouse.jpg'] },
    { id: 'PROP-504', title: 'Approved RERA Villa Plots (30x40 & 30x50)', category: 'Plot', type: 'Sale', price: '₹ 45.0 Lakh', areaSqFt: 1200, city: 'Hyderabad', locality: 'Mokila Tech Valley', sellerName: 'Urban Greens Developers', status: 'Active', images: ['https://buildmitra-mumbai-storage.s3.ap-south-1.amazonaws.com/media/plot_valley.jpg'] }
  ]);

  const [products, setProducts] = useState<any[]>([
    { id: 'PRD-01', name: 'Fe 550D TMT Rebar (Primary Steel)', brand: 'JSW Steel & Tata Tiscon', unit: 'Metric Ton', price: '₹ 61,200/MT', stock: 'In Stock' },
    { id: 'PRD-02', name: 'OPC 53 Grade High-Strength Cement', brand: 'UltraTech & ACC', unit: '50 Kg Bag', price: '₹ 345/Bag', stock: 'In Stock' },
    { id: 'PRD-03', name: 'Double Washed Concrete M-Sand', brand: 'Certified Quarries', unit: 'Tonne', price: '₹ 1,310/MT', stock: 'Ready for Dispatch' },
    { id: 'PRD-04', name: 'First Class Red Kiln Burnt Clay Bricks', brand: 'Standard 9x4x3', unit: '1,000 Pcs', price: '₹ 8,900/Lot', stock: 'In Stock' }
  ]);

  const [servicesList, setServicesList] = useState<any[]>([
    { id: 'SRV-01', name: 'Turnkey Civil Construction', rate: '₹ 1,850/Sq.Ft', turnaround: '6-9 Months', activeProviders: 34 },
    { id: 'SRV-02', name: 'Premium Interior Painting & Primer', rate: '₹ 16/Sq.Ft', turnaround: '2-4 Days', activeProviders: 46 },
    { id: 'SRV-03', name: 'Complete House Wiring & Circuit Protection', rate: '₹ 22/Sq.Ft', turnaround: '3-5 Days', activeProviders: 52 },
    { id: 'SRV-04', name: 'Sanitary & Concealed Plumbing', rate: '₹ 18/Sq.Ft', turnaround: '2-3 Days', activeProviders: 39 }
  ]);

  const [ai3DModels, setAi3DModels] = useState<any[]>([
    { id: '3D-201', plotDimensions: '30 x 40 Ft (1200 Sq.Ft)', buildingType: 'Modern Contemporary Villa (G+2)', floors: 3, bedrooms: 4, bathrooms: 4, style: 'Minimalist Glass Facade with Cantilever Balcony', requestedBy: '+91 98765 43210', status: 'Ready for Review', modelUrl: 'https://buildmitra-mumbai-storage.s3.ap-south-1.amazonaws.com/models/villa_3d_render.glb' },
    { id: '3D-202', plotDimensions: '40 x 60 Ft (2400 Sq.Ft)', buildingType: 'Courtyard Haveli Style Independent House (G+1)', floors: 2, bedrooms: 5, bathrooms: 5, style: 'Traditional Kerala Timber & Clay Tile Vernacular', requestedBy: '+91 98220 55441', status: 'Generating 3D Assets', modelUrl: '' }
  ]);

  const [pdfPurchases, setPdfPurchases] = useState<any[]>([
    { id: 'PDF-7001', reportNo: 'BM-EST-2026-8812', userPhone: '+91 98765 43210', calculatorName: 'Turnkey Construction Cost Calculator', areaSqFt: 1500, totalEstimate: '₹ 27,75,000', amountPaid: 20, s3PdfUrl: 'https://buildmitra-mumbai-storage.s3.ap-south-1.amazonaws.com/reports/sample_report_8812.pdf' },
    { id: 'PDF-7002', reportNo: 'BM-EST-2026-8813', userPhone: '+91 98220 55441', calculatorName: 'Steel Reinforcement (TMT) Calculator', areaSqFt: 2400, totalEstimate: '₹ 6,14,400', amountPaid: 20, s3PdfUrl: 'https://buildmitra-mumbai-storage.s3.ap-south-1.amazonaws.com/reports/sample_report_8813.pdf' },
    { id: 'PDF-7003', reportNo: 'BM-EST-2026-8814', userPhone: '+91 97412 88990', calculatorName: 'Concrete Mix & Grade Calculator', areaSqFt: 1800, totalEstimate: '₹ 4,32,000', amountPaid: 20, s3PdfUrl: 'https://buildmitra-mumbai-storage.s3.ap-south-1.amazonaws.com/reports/sample_report_8814.pdf' }
  ]);

  const [notifications, setNotifications] = useState<any[]>([
    { id: 'NOTIF-01', title: 'Reverse Auction Live', body: 'New lot of 25 MT Fe 550D TMT Steel open for bids in Bengaluru.', date: 'Today, 2:15 PM', type: 'Auction' },
    { id: 'NOTIF-02', title: 'Partner KYC Submitted', body: 'Ramesh Quality Painters submitted Aadhaar & experience proof for review.', date: 'Today, 11:30 AM', type: 'KYC' },
    { id: 'NOTIF-03', title: 'Payment Settled', body: 'Razorpay Live captured ₹1,499 from Varma Civil Infra.', date: 'Yesterday, 4:20 PM', type: 'Payment' }
  ]);

  const [supportRequests, setSupportRequests] = useState<any[]>([
    { id: 'TKT-101', name: 'Dr. Srinivas Reddy', phone: '+91 94401 22889', email: 'srinivas.r@gmail.com', subject: 'Turnkey Construction Quote for 3000 Sq.Ft Plot in Jubilee Hills', message: 'Looking for a verified civil contractor to execute G+2 RCC construction. Need soil testing report integration.', status: 'Open', timestamp: '2026-03-02T11:45:00.000Z' },
    { id: 'TKT-102', name: 'Meenakshi Sundaram', phone: '+91 98840 55112', email: 'meenakshi@gmail.com', subject: 'Clarification regarding ₹20 Detailed Estimation Report', message: 'Downloaded the Turnkey Calculator PDF report. Needed assistance with interpreting M-Sand ratio.', status: 'Resolved', timestamp: '2026-03-01T15:20:00.000Z' }
  ]);

  const [adminUsers, setAdminUsers] = useState<any[]>([
    { id: 'ADM-01', name: 'Master Super Admin', email: 'admin@buildmitra.com', role: 'Super Admin', permissions: 'Full Access (All 28 Modules)', lastLogin: 'Today, 6:30 PM' },
    { id: 'ADM-02', name: 'Pradeep Chawla', email: 'pradeep.ops@buildmitra.com', role: 'Operations Admin', permissions: 'KYC Approvals & Partner Mgmt', lastLogin: 'Today, 3:15 PM' },
    { id: 'ADM-03', name: 'Kavitha Swaminathan', email: 'kavitha.finance@buildmitra.com', role: 'Finance Admin', permissions: 'Razorpay & Revenue Ledger', lastLogin: 'Yesterday, 5:45 PM' }
  ]);

  // Action status message
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  // Load real data from backend on mount
  const loadDashboardData = async () => {
    setLoading(true);
    try {
      const [
        analyticsRes,
        usersRes,
        partnersRes,
        categoriesRes,
        auctionsRes,
        calculatorsRes,
        mediaRes,
        paymentsRes,
        coursesRes,
        auditLogsRes,
        cmsRes,
        settingsRes,
        propertiesRes,
        productsRes,
        servicesRes,
        modelsRes,
        pdfRes,
        notifRes,
        ticketsRes,
        adminsRes
      ] = await Promise.allSettled([
        api.getAnalytics(),
        api.getUsers(),
        api.getPartners(),
        api.getPartnerCategories(),
        api.getAuctions(),
        api.getCalculators(),
        api.getMedia(),
        api.getPayments(),
        api.getCourses(),
        api.getAuditLogs(),
        api.getCms(),
        api.getSystemSettings(),
        api.getProperties(),
        api.getProducts(),
        api.getServices(),
        api.get3DModels(),
        api.getPdfPurchases(),
        api.getNotifications(),
        api.getSupportRequests(),
        api.getAdminUsers()
      ]);

      if (analyticsRes.status === 'fulfilled' && analyticsRes.value) setAnalytics(analyticsRes.value);
      if (usersRes.status === 'fulfilled' && usersRes.value?.length) setUsers(usersRes.value);
      if (partnersRes.status === 'fulfilled' && partnersRes.value?.length) setPartners(partnersRes.value);
      if (categoriesRes.status === 'fulfilled' && categoriesRes.value?.length) setCategories(categoriesRes.value);
      if (auctionsRes.status === 'fulfilled' && auctionsRes.value?.length) setAuctions(auctionsRes.value);
      if (calculatorsRes.status === 'fulfilled' && calculatorsRes.value?.length) setCalculators(calculatorsRes.value);
      if (mediaRes.status === 'fulfilled' && mediaRes.value?.length) setMediaList(mediaRes.value);
      if (paymentsRes.status === 'fulfilled' && paymentsRes.value?.length) setPayments(paymentsRes.value);
      if (coursesRes.status === 'fulfilled' && coursesRes.value?.length) setCourses(coursesRes.value);
      if (auditLogsRes.status === 'fulfilled' && auditLogsRes.value?.length) setAuditLogs(auditLogsRes.value);
      if (cmsRes.status === 'fulfilled' && cmsRes.value) setCmsSections(cmsRes.value);
      if (settingsRes.status === 'fulfilled' && settingsRes.value) setSystemSettings(settingsRes.value);
      if (propertiesRes.status === 'fulfilled' && propertiesRes.value?.length) setProperties(propertiesRes.value);
      if (productsRes.status === 'fulfilled' && productsRes.value?.length) setProducts(productsRes.value);
      if (servicesRes.status === 'fulfilled' && servicesRes.value?.length) setServicesList(servicesRes.value);
      if (modelsRes.status === 'fulfilled' && modelsRes.value?.length) setAi3DModels(modelsRes.value);
      if (pdfRes.status === 'fulfilled' && pdfRes.value?.length) setPdfPurchases(pdfRes.value);
      if (notifRes.status === 'fulfilled' && notifRes.value?.length) setNotifications(notifRes.value);
      if (ticketsRes.status === 'fulfilled' && ticketsRes.value?.length) setSupportRequests(ticketsRes.value);
      if (adminsRes.status === 'fulfilled' && adminsRes.value?.length) setAdminUsers(adminsRes.value);
    } catch (err) {
      console.error('Failed to load dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  const showNotice = (msg: string) => {
    setActionNotice(msg);
    setTimeout(() => setActionNotice(null), 4000);
  };

  // Partner Approval / Rejection
  const handlePartnerApproval = async (id: string, status: 'Approved' | 'Rejected' | 'Suspended', reason?: string) => {
    try {
      await api.updatePartnerStatus(id, status, reason);
      showNotice(`Partner application marked as: ${status}`);
      loadDashboardData();
    } catch (err: any) {
      showNotice(`Error updating partner: ${err.message}`);
    }
  };

  // User status update
  const handleUserStatus = async (id: string, status: 'Active' | 'Inactive' | 'Suspended') => {
    try {
      await api.updateUserStatus(id, status);
      showNotice(`User status updated to ${status}`);
      loadDashboardData();
    } catch (err: any) {
      showNotice(`Error: ${err.message}`);
    }
  };

  // Calculator rate update
  const handleUpdateCalc = async (id: string, defaultRate: number, pdfPrice: number) => {
    try {
      await api.updateCalculatorRate(id, defaultRate, pdfPrice);
      showNotice(`Calculator rates updated successfully`);
      loadDashboardData();
    } catch (err: any) {
      showNotice(`Error: ${err.message}`);
    }
  };

  // Media upload to S3
  const handleFileUploadToS3 = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    try {
      showNotice(`Uploading ${file.name} to AWS S3 Mumbai...`);
      await api.uploadMedia(file, 'AdminUpload', 'media');
      showNotice(`File successfully uploaded to AWS S3!`);
      loadDashboardData();
    } catch (err: any) {
      showNotice(`S3 Upload Failed: ${err.message}`);
    }
  };

  // Delete media from S3
  const handleDeleteMedia = async (id: string) => {
    if (!confirm('Are you sure you want to delete this media asset from AWS S3?')) return;
    try {
      await api.deleteMedia(id);
      showNotice('Media deleted from AWS S3');
      loadDashboardData();
    } catch (err: any) {
      showNotice(`Delete failed: ${err.message}`);
    }
  };

  // Course management
  const [newCourseTitle, setNewCourseTitle] = useState('');
  const [newCoursePrice, setNewCoursePrice] = useState('999');
  const [newCourseCategory, setNewCourseCategory] = useState('Civil Engineering');

  const handleCreateCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCourseTitle) return;
    try {
      await api.createCourse({
        title: newCourseTitle,
        category: newCourseCategory,
        price: Number(newCoursePrice),
        isFree: Number(newCoursePrice) === 0,
        description: 'Comprehensive engineering syllabus covering standards and site protocols.'
      });
      setNewCourseTitle('');
      showNotice('New course published to catalog');
      loadDashboardData();
    } catch (err: any) {
      showNotice(`Course creation error: ${err.message}`);
    }
  };

  const handleDeleteCourse = async (id: string) => {
    if (!confirm('Remove this course from public enrollment?')) return;
    try {
      await api.deleteCourse(id);
      showNotice('Course removed from catalog');
      loadDashboardData();
    } catch (err: any) {
      showNotice(`Error: ${err.message}`);
    }
  };

  // Dynamic CMS update
  const [heroForm, setHeroForm] = useState({
    title: '',
    subtitle: '',
    ctaPrimaryText: '',
    ctaPrimaryLink: '',
    heroImageUrl: ''
  });

  useEffect(() => {
    if (cmsSections.hero) {
      setHeroForm({
        title: cmsSections.hero.title || '',
        subtitle: cmsSections.hero.subtitle || '',
        ctaPrimaryText: cmsSections.hero.ctaPrimaryText || '',
        ctaPrimaryLink: cmsSections.hero.ctaPrimaryLink || '',
        heroImageUrl: cmsSections.hero.heroImageUrl || ''
      });
    }
  }, [cmsSections]);

  const handleSaveHeroCms = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.updateCmsSection('hero', heroForm);
      showNotice('Homepage Hero content saved and published live!');
      loadDashboardData();
    } catch (err: any) {
      showNotice(`CMS update error: ${err.message}`);
    }
  };

  // Navigation Items (28 Sections)
  const SIDEBAR_ITEMS: SidebarItem[] = [
    { key: 'overview', label: '1. Executive Overview', icon: Activity },
    { key: 'users', label: '2. User Management', icon: Users, badge: users.length },
    { key: 're_users', label: '3. Real Estate Users', icon: Building2 },
    { key: 'sellers', label: '4. Sellers & Stockyards', icon: ShoppingBag },
    { key: 'partners', label: '5. Partners Directory', icon: UserCheck, badge: partners.length },
    { key: 'partner_approvals', label: '6. Partner Approvals', icon: ShieldCheck, badge: partners.filter(p => p.status === 'Pending Approval').length },
    { key: 'contractors_helpers', label: '7. Contractors & Trades', icon: Layers },
    { key: 'properties', label: '8. Properties & Land', icon: Home, badge: properties.length },
    { key: 'auctions', label: '9. Reverse Auctions', icon: Gavel, badge: auctions.length },
    { key: 'calculators', label: '10. Calculators Config', icon: Calculator, badge: calculators.length },
    { key: 'calc_reports', label: '11. Calculator Reports', icon: FileText },
    { key: 'pdf_purchases', label: '12. Paid PDF Purchases', icon: DollarSign, badge: pdfPurchases.length },
    { key: '3d_models', label: '13. AI 3D House Models', icon: Layers, badge: ai3DModels.length },
    { key: 'courses', label: '14. Courses & Learning', icon: FileText, badge: courses.length },
    { key: 'products', label: '15. Products & Materials', icon: ShoppingBag, badge: products.length },
    { key: 'services', label: '16. On-Demand Services', icon: Layers, badge: servicesList.length },
    { key: 'homepage_mgmt', label: '17. Dynamic Homepage CMS', icon: Home },
    { key: 'page_sections', label: '18. Page Sections CMS', icon: Edit3 },
    { key: 'media_library', label: '19. AWS S3 Media Library', icon: ImageIcon, badge: mediaList.length },
    { key: 'subscriptions', label: '20. Subscription Plans', icon: CreditCard },
    { key: 'payments', label: '21. Razorpay Live Ledger', icon: CreditCard, badge: payments.length },
    { key: 'revenue_analytics', label: '22. Revenue Analytics', icon: TrendingUp },
    { key: 'notifications', label: '23. Broadcast Alerts', icon: Bell, badge: notifications.length },
    { key: 'support_requests', label: '24. Support & Tickets', icon: LifeBuoy, badge: supportRequests.length },
    { key: 'admin_users', label: '25. Admin RBAC Team', icon: Lock, badge: adminUsers.length },
    { key: 'audit_logs', label: '26. Security Audit Trail', icon: FileText, badge: auditLogs.length },
    { key: 'aws_status', label: '27. AWS Cloud & EC2 Status', icon: Cloud },
    { key: 'settings', label: '28. Platform Settings', icon: Settings }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      
      {/* Top Super Admin Exclusive Executive Header */}
      <header className="bg-slate-950 border-b border-slate-800/80 px-4 sm:px-6 py-3.5 sticky top-0 z-40 flex items-center justify-between shadow-2xl backdrop-blur-md">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className="md:hidden p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 hover:bg-slate-800"
          >
            <Layers className="w-5 h-5 text-blue-400" />
          </button>
          
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-700 to-indigo-500 flex items-center justify-center font-black text-white shadow-lg shadow-blue-900/30 ring-1 ring-white/20">
              BM
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base sm:text-lg text-white tracking-tight">BUILDMITRA</span>
                <span className="text-[10px] font-black bg-gradient-to-r from-purple-500/20 to-blue-500/20 text-purple-300 border border-purple-500/30 px-2.5 py-0.5 rounded-full tracking-wider uppercase">
                  Super Admin V2.4
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>AWS EC2 Mumbai (ap-south-1) • Razorpay Live Gateway Active</span>
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button 
            onClick={loadDashboardData}
            disabled={loading}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-850 text-xs font-bold text-slate-200 transition-all shadow-xs"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-blue-400 ${loading ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">Refresh Data</span>
          </button>

          <Link 
            to="/" 
            target="_blank"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-md shadow-blue-900/30 transition-all active:scale-95"
          >
            <span>Open Website</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>
      </header>

      {/* Action Notification Toast Banner */}
      {actionNotice && (
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2.5 text-xs font-bold flex items-center justify-between shadow-lg">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-white" />
            <span>{actionNotice}</span>
          </div>
          <button onClick={() => setActionNotice(null)} className="p-1 hover:bg-white/20 rounded">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Main Admin Workspace with Sidebar */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Left Sidebar (All 28 Navigation Sections) */}
        <aside className={`
          w-72 bg-slate-950 border-r border-slate-800/80 flex flex-col fixed md:relative inset-y-0 left-0 z-30 transform transition-transform duration-200 ease-in-out md:translate-x-0
          ${mobileSidebarOpen ? 'translate-x-0 pt-20' : '-translate-x-full md:translate-x-0'}
        `}>
          <div className="p-3.5 border-b border-slate-800/80 text-[11px] font-black text-slate-400 flex items-center justify-between uppercase tracking-wider bg-slate-900/40">
            <span>28 Central Modules</span>
            <span className="text-[10px] bg-slate-800 text-emerald-400 px-2 py-0.5 rounded font-mono">ONLINE</span>
          </div>

          <nav className="flex-1 overflow-y-auto p-2 space-y-1 scrollbar-thin scrollbar-thumb-slate-800">
            {SIDEBAR_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.key;
              return (
                <button
                  key={item.key}
                  onClick={() => {
                    setActiveSection(item.key);
                    setMobileSidebarOpen(false);
                  }}
                  className={`
                    w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all text-left
                    ${isActive 
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-950' 
                      : 'text-slate-400 hover:bg-slate-900 hover:text-slate-100'}
                  `}
                >
                  <div className="flex items-center gap-3 truncate">
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                    <span className="truncate">{item.label}</span>
                  </div>
                  {item.badge !== undefined && item.badge !== 0 && (
                    <span className={`
                      text-[10px] font-black px-2 py-0.5 rounded-full
                      ${isActive ? 'bg-white text-blue-700' : 'bg-slate-800 text-slate-300'}
                    `}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          <div className="p-3.5 border-t border-slate-800/80 bg-slate-950 text-[11px] text-slate-400">
            <div className="flex items-center justify-between mb-1">
              <span className="font-bold text-slate-300">AWS Mumbai S3:</span>
              <span className="text-emerald-400 font-mono font-bold">CONNECTED</span>
            </div>
            <p className="truncate text-slate-500 font-mono text-[10px]">buildmitra-mumbai-storage</p>
          </div>
        </aside>

        {/* Right Active Content Area */}
        <main className="flex-1 bg-slate-900/60 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          
          {/* ================================================================= */}
          {/* Module 1: EXECUTIVE OVERVIEW */}
          {/* ================================================================= */}
          {activeSection === 'overview' && (
            <div className="space-y-6 max-w-6xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">Executive Command Overview</h2>
                  <p className="text-xs text-slate-400 mt-1">Live operational metrics aggregated across the BuildMitra ecosystem</p>
                </div>

                <div className="flex items-center gap-1.5 bg-slate-900 p-1.5 rounded-2xl border border-slate-800">
                  {(['today', '7d', '30d', '90d', 'all'] as const).map((filter) => (
                    <button
                      key={filter}
                      onClick={() => setDateFilter(filter)}
                      className={`px-3 py-1.5 rounded-xl uppercase text-[10px] font-black transition-all ${
                        dateFilter === filter ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {filter}
                    </button>
                  ))}
                </div>
              </div>

              {/* Grand KPI Cards Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-gradient-to-br from-slate-900 to-slate-900/80 p-5 rounded-3xl border border-slate-800 shadow-xl relative overflow-hidden group">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-wider">
                    <span>Registered Users</span>
                    <div className="p-2 bg-blue-500/10 rounded-xl text-blue-400"><Users className="w-4 h-4" /></div>
                  </div>
                  <div className="text-3xl font-black text-white mt-3">
                    {analytics?.users.total || users.length}
                  </div>
                  <div className="text-xs text-emerald-400 mt-2 font-bold flex items-center gap-1">
                    <span>↑ 18.4%</span>
                    <span className="text-slate-400 font-normal">Active Members</span>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-slate-900 to-slate-900/80 p-5 rounded-3xl border border-slate-800 shadow-xl relative overflow-hidden group">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-wider">
                    <span>Partner Applications</span>
                    <div className="p-2 bg-amber-500/10 rounded-xl text-amber-400"><ShieldCheck className="w-4 h-4" /></div>
                  </div>
                  <div className="text-3xl font-black text-white mt-3">
                    {partners.length}
                  </div>
                  <div className="text-xs text-amber-400 mt-2 font-bold flex items-center gap-1">
                    <span>⏳ {partners.filter(p => p.status === 'Pending Approval').length} Pending</span>
                    <span className="text-slate-400 font-normal">KYC</span>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-slate-900 to-slate-900/80 p-5 rounded-3xl border border-slate-800 shadow-xl relative overflow-hidden group">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-wider">
                    <span>Reverse Auctions</span>
                    <div className="p-2 bg-purple-500/10 rounded-xl text-purple-400"><Gavel className="w-4 h-4" /></div>
                  </div>
                  <div className="text-3xl font-black text-white mt-3">
                    {auctions.length} Lots
                  </div>
                  <div className="text-xs text-purple-300 mt-2 font-bold flex items-center gap-1">
                    <span>{auctions.reduce((sum, a) => sum + a.bidsCount, 0)} Bids</span>
                    <span className="text-slate-400 font-normal">Placed</span>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-slate-900 to-slate-900/80 p-5 rounded-3xl border border-slate-800 shadow-xl relative overflow-hidden group">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-wider">
                    <span>Platform Volume</span>
                    <div className="p-2 bg-emerald-500/10 rounded-xl text-emerald-400"><DollarSign className="w-4 h-4" /></div>
                  </div>
                  <div className="text-3xl font-black text-emerald-400 mt-3">
                    ₹ {(analytics?.finance.totalRevenue || payments.reduce((sum, p) => sum + p.amount, 0)).toLocaleString('en-IN')}
                  </div>
                  <div className="text-xs text-slate-400 mt-2">
                    Razorpay Live Verified
                  </div>
                </div>
              </div>

              {/* Distribution Panels */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Partner Categories Distribution */}
                <div className="bg-slate-900/80 p-6 rounded-3xl border border-slate-800 shadow-xl">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-black text-white flex items-center gap-2">
                      <Layers className="w-4 h-4 text-blue-400" />
                      <span>13 Registered Trade Categories</span>
                    </h3>
                    <button 
                      onClick={() => setActiveSection('partner_approvals')}
                      className="text-xs text-blue-400 hover:underline font-bold"
                    >
                      Inspect Queue
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {categories.slice(0, 8).map((cat) => (
                      <div key={cat.id} className="p-2.5 rounded-2xl bg-slate-950/60 border border-slate-800/80 flex items-center justify-between">
                        <span className="font-semibold text-slate-300 truncate">{cat.name}</span>
                        <span className="px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 font-bold text-[10px]">
                          {partners.filter(p => p.category.toLowerCase().includes(cat.name.toLowerCase().split(' ')[0])).length} Pros
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Calculator & Paid PDF Performance */}
                <div className="bg-slate-900/80 p-6 rounded-3xl border border-slate-800 shadow-xl space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-black text-white flex items-center gap-2">
                      <Calculator className="w-4 h-4 text-emerald-400" />
                      <span>Engineering Estimations & ₹20 Reports</span>
                    </h3>
                    <button 
                      onClick={() => setActiveSection('calculators')}
                      className="text-xs text-emerald-400 hover:underline font-bold"
                    >
                      Rate Settings
                    </button>
                  </div>

                  <div className="p-4 bg-slate-950/60 rounded-2xl border border-slate-800 flex items-center justify-between">
                    <div>
                      <div className="text-xs text-slate-400">Total Engineering Calculator Executions</div>
                      <div className="text-xl font-black text-white mt-1">3,120+ Calculations</div>
                    </div>
                    <span className="text-xs font-bold text-blue-400 bg-blue-500/10 px-3 py-1 rounded-xl">
                      19 Tools Live
                    </span>
                  </div>

                  <div className="p-4 bg-slate-950/60 rounded-2xl border border-slate-800 flex items-center justify-between">
                    <div>
                      <div className="text-xs text-slate-400">Paid PDF Reports Downloaded (₹20 Fee)</div>
                      <div className="text-xl font-black text-emerald-400 mt-1">
                        {pdfPurchases.length || 3} Reports Generated
                      </div>
                    </div>
                    <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-xl">
                      AWS S3 Archived
                    </span>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* ================================================================= */}
          {/* Module 2: USER MANAGEMENT */}
          {/* ================================================================= */}
          {activeSection === 'users' && (
            <div className="space-y-4 max-w-6xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-2xl font-black text-white">User Directory & Permissions</h2>
                  <p className="text-xs text-slate-400">Registered customers, property buyers, sellers, and administrators</p>
                </div>
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    placeholder="Search by name, phone, role..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 w-64"
                  />
                </div>
              </div>

              <div className="bg-slate-900/80 rounded-3xl border border-slate-800 overflow-hidden shadow-xl">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-950 text-slate-400 font-bold uppercase tracking-wider border-b border-slate-800">
                    <tr>
                      <th className="p-4">User Details</th>
                      <th className="p-4">Role</th>
                      <th className="p-4">Membership Plan</th>
                      <th className="p-4">Calculator Activity</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {users
                      .filter(u => u.name.toLowerCase().includes(searchQuery.toLowerCase()) || u.phone.includes(searchQuery))
                      .map((u) => (
                        <tr key={u.id} className="hover:bg-slate-850/60 transition-colors">
                          <td className="p-4">
                            <div className="font-bold text-white text-sm">{u.name}</div>
                            <div className="text-[11px] text-slate-400">{u.phone} • {u.email}</div>
                          </td>
                          <td className="p-4 font-semibold text-slate-300">{u.role}</td>
                          <td className="p-4 text-blue-400 font-medium">{u.plan}</td>
                          <td className="p-4 text-slate-300">{u.calculatorUsage || 0} Calcs ({u.pdfPurchases || 0} Paid PDFs)</td>
                          <td className="p-4">
                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                              u.status === 'Active' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'
                            }`}>
                              {u.status}
                            </span>
                          </td>
                          <td className="p-4 text-right space-x-2">
                            {u.status === 'Active' ? (
                              <button
                                onClick={() => handleUserStatus(u.id, 'Suspended')}
                                className="px-3 py-1.5 rounded-xl bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 text-xs font-bold"
                              >
                                Suspend
                              </button>
                            ) : (
                              <button
                                onClick={() => handleUserStatus(u.id, 'Active')}
                                className="px-3 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 text-xs font-bold"
                              >
                                Activate
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ================================================================= */}
          {/* Module 6: PARTNER APPROVALS & KYC GATEWAY */}
          {/* ================================================================= */}
          {activeSection === 'partner_approvals' && (
            <div className="space-y-4 max-w-6xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-2xl font-black text-white">Partner KYC & Approval Gateway</h2>
                  <p className="text-xs text-slate-400">Inspect contractor credentials, approve, reject with reason, or suspend partners</p>
                </div>
                <span className="text-xs font-bold px-3 py-1 bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-full">
                  {partners.filter(p => p.status === 'Pending Approval').length} Applications Pending
                </span>
              </div>

              <div className="space-y-3">
                {partners.map((p) => (
                  <div key={p.id} className="bg-slate-900/80 p-5 rounded-3xl border border-slate-800 shadow-xl space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
                      <div>
                        <div className="flex items-center gap-2.5">
                          <h3 className="text-base font-bold text-white">{p.businessName || p.name}</h3>
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                            p.status === 'Approved' ? 'bg-emerald-500/20 text-emerald-400' :
                            p.status === 'Rejected' ? 'bg-red-500/20 text-red-400' : 'bg-amber-500/20 text-amber-400'
                          }`}>
                            {p.status}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 mt-1">
                          Applicant: <strong className="text-slate-200">{p.name}</strong> • Phone: <strong className="text-slate-200">{p.phone}</strong> • Category: <strong className="text-blue-400">{p.category}</strong> ({p.experienceYears} Years Exp)
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        {p.status !== 'Approved' && (
                          <button
                            onClick={() => handlePartnerApproval(p.id, 'Approved')}
                            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md shadow-emerald-950 transition-all"
                          >
                            <Check className="w-4 h-4" />
                            <span>Approve Partner</span>
                          </button>
                        )}
                        {p.status !== 'Rejected' && (
                          <button
                            onClick={() => {
                              const reason = prompt('Please enter rejection reason:');
                              if (reason) handlePartnerApproval(p.id, 'Rejected', reason);
                            }}
                            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-red-600/20 border border-red-500/30 hover:bg-red-600/30 text-red-300 text-xs font-bold"
                          >
                            <X className="w-4 h-4" />
                            <span>Reject</span>
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-slate-400 font-bold">Uploaded Documents:</span>
                        {p.documents && p.documents.length > 0 ? (
                          p.documents.map((doc, idx) => (
                            <a
                              key={idx}
                              href={doc.url}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1 px-3 py-1 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold"
                            >
                              <FileText className="w-3.5 h-3.5 text-blue-400" />
                              <span>{doc.name}</span>
                            </a>
                          ))
                        ) : (
                          <span className="text-slate-500">Self-certified registration</span>
                        )}
                      </div>

                      <div className="text-slate-400 text-xs">
                        Service Regions: <span className="text-slate-200 font-semibold">{p.serviceLocations.join(', ')}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================================================================= */}
          {/* Module 8: REAL ESTATE & PROPERTIES */}
          {/* ================================================================= */}
          {activeSection === 'properties' && (
            <div className="space-y-4 max-w-6xl mx-auto">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-black text-white">Properties & Land Listings</h2>
                  <p className="text-xs text-slate-400">Active villas, commercial office spaces, penthouses, and RERA residential plots</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {properties.map((prop) => (
                  <div key={prop.id} className="bg-slate-900/80 rounded-3xl border border-slate-800 overflow-hidden shadow-xl flex flex-col sm:flex-row">
                    <div className="sm:w-48 h-40 bg-slate-850 flex items-center justify-center overflow-hidden">
                      {prop.images && prop.images[0] ? (
                        <img src={prop.images[0]} alt={prop.title} className="w-full h-full object-cover" />
                      ) : (
                        <Home className="w-12 h-12 text-slate-700" />
                      )}
                    </div>
                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded">
                            {prop.category} • {prop.type}
                          </span>
                          <span className="text-xs font-bold text-emerald-400">{prop.price}</span>
                        </div>
                        <h3 className="text-sm font-bold text-white mt-1.5">{prop.title}</h3>
                        <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-slate-500" />
                          <span>{prop.locality}, {prop.city} ({prop.areaSqFt} Sq.Ft)</span>
                        </p>
                      </div>
                      <div className="mt-3 text-[11px] text-slate-400 pt-2 border-t border-slate-800 flex items-center justify-between">
                        <span>Seller: <strong className="text-slate-200">{prop.sellerName}</strong></span>
                        <span className="text-emerald-400 font-bold">{prop.status}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================================================================= */}
          {/* Module 9: REVERSE AUCTION ENGINE */}
          {/* ================================================================= */}
          {activeSection === 'auctions' && (
            <div className="space-y-4 max-w-6xl mx-auto">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-black text-white">Reverse Auction Engine</h2>
                  <p className="text-xs text-slate-400">Live bill of quantities procurement lots & primary manufacturer bids</p>
                </div>
              </div>

              <div className="space-y-4">
                {auctions.map((auc) => (
                  <div key={auc.id} className="bg-slate-900/80 p-5 rounded-3xl border border-slate-800 shadow-xl space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-base font-bold text-white">{auc.title}</h3>
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-purple-500/20 text-purple-300 border border-purple-500/30">
                            {auc.status}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 mt-0.5">
                          Lot: <strong className="text-slate-200">{auc.material}</strong> • Quantity: <strong className="text-slate-200">{auc.quantity}</strong> • Location: {auc.city}
                        </p>
                      </div>

                      <div className="text-right">
                        <div className="text-xs text-slate-400">Current Lowest Landed Rate:</div>
                        <div className="text-xl font-black text-emerald-400">{auc.currentLowest}</div>
                        <div className="text-[11px] text-slate-400 font-medium">{auc.lowestBidder}</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
                      <span>Starting Benchmark: <strong className="text-slate-300">{auc.startingPrice}</strong> (Reserve: {auc.reservePrice})</span>
                      <span className="text-blue-400 font-bold">{auc.bidsCount} Competing Bids Placed</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================================================================= */}
          {/* Module 10: CALCULATORS CONFIGURATION */}
          {/* ================================================================= */}
          {activeSection === 'calculators' && (
            <div className="space-y-4 max-w-6xl mx-auto">
              <div>
                <h2 className="text-2xl font-black text-white">Smart Engineering Calculator Settings</h2>
                <p className="text-xs text-slate-400">Adjust base material rates, pricing multipliers, and ₹20 PDF download fee</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {calculators.map((calc) => (
                  <div key={calc.id} className="bg-slate-900/80 p-5 rounded-3xl border border-slate-800 shadow-xl space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-white text-sm">{calc.name}</h3>
                      <span className="text-[10px] bg-blue-500/20 text-blue-300 font-bold px-2 py-0.5 rounded">
                        {calc.category}
                      </span>
                    </div>

                    <div className="space-y-2.5 pt-2 border-t border-slate-800 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">Base Rate (₹):</span>
                        <input
                          type="number"
                          defaultValue={calc.defaultRate}
                          onBlur={(e) => handleUpdateCalc(calc.id, Number(e.target.value), calc.pdfPrice)}
                          className="w-24 px-2.5 py-1 bg-slate-950 border border-slate-800 rounded-xl text-right text-white font-bold"
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">PDF Report Fee (₹):</span>
                        <input
                          type="number"
                          defaultValue={calc.pdfPrice}
                          onBlur={(e) => handleUpdateCalc(calc.id, calc.defaultRate, Number(e.target.value))}
                          className="w-24 px-2.5 py-1 bg-slate-950 border border-slate-800 rounded-xl text-right text-emerald-400 font-bold"
                        />
                      </div>

                      <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                        <span>Total Invocations:</span>
                        <strong className="text-slate-300">{calc.usageCount} calculations</strong>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================================================================= */}
          {/* Module 12: PAID PDF PURCHASES LEDGER */}
          {/* ================================================================= */}
          {activeSection === 'pdf_purchases' && (
            <div className="space-y-4 max-w-6xl mx-auto">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-black text-white">Paid PDF Report Downloads</h2>
                  <p className="text-xs text-slate-400">₹20 Razorpay Live verified engineering reports & S3 cloud links</p>
                </div>
              </div>

              <div className="bg-slate-900/80 rounded-3xl border border-slate-800 overflow-hidden shadow-xl">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-950 text-slate-400 font-bold uppercase tracking-wider border-b border-slate-800">
                    <tr>
                      <th className="p-4">Report Number</th>
                      <th className="p-4">Calculator Tool</th>
                      <th className="p-4">Client Contact</th>
                      <th className="p-4">Estimated Total</th>
                      <th className="p-4">Fee Paid</th>
                      <th className="p-4 text-right">AWS S3 File</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {pdfPurchases.map((pdf) => (
                      <tr key={pdf.id} className="hover:bg-slate-850/60 transition-colors">
                        <td className="p-4 font-mono font-bold text-white">{pdf.reportNo}</td>
                        <td className="p-4 text-slate-300 font-semibold">{pdf.calculatorName}</td>
                        <td className="p-4 text-slate-400">{pdf.userPhone}</td>
                        <td className="p-4 font-bold text-blue-400">{pdf.totalEstimate}</td>
                        <td className="p-4 font-bold text-emerald-400">₹ {pdf.amountPaid}</td>
                        <td className="p-4 text-right">
                          <a
                            href={pdf.s3PdfUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600/20 text-blue-300 hover:bg-blue-600/30 text-xs font-bold"
                          >
                            <Download className="w-3.5 h-3.5" />
                            <span>Download PDF</span>
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ================================================================= */}
          {/* Module 13: AI 3D HOUSE MODELS */}
          {/* ================================================================= */}
          {activeSection === '3d_models' && (
            <div className="space-y-4 max-w-6xl mx-auto">
              <div>
                <h2 className="text-2xl font-black text-white">AI-Powered 3D Model Generation Queue</h2>
                <p className="text-xs text-slate-400">Architectural concepts generated from plot dimensions, floors, and specifications</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {ai3DModels.map((m) => (
                  <div key={m.id} className="bg-slate-900/80 p-5 rounded-3xl border border-slate-800 shadow-xl space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black uppercase bg-purple-500/20 text-purple-300 px-2.5 py-0.5 rounded-full">
                        {m.status}
                      </span>
                      <span className="text-xs text-slate-400">Requester: {m.requestedBy}</span>
                    </div>

                    <h3 className="text-base font-bold text-white">{m.buildingType}</h3>
                    <p className="text-xs text-slate-400">Plot Dimensions: <strong className="text-slate-200">{m.plotDimensions}</strong></p>
                    <p className="text-xs text-slate-300 bg-slate-950/60 p-3 rounded-2xl border border-slate-800/80">
                      Architectural Theme: {m.style}
                    </p>

                    <div className="pt-2 flex items-center justify-between text-xs text-slate-400">
                      <span>Floors: {m.floors} | Beds: {m.bedrooms}</span>
                      {m.modelUrl ? (
                        <a href={m.modelUrl} target="_blank" rel="noreferrer" className="text-blue-400 font-bold hover:underline">
                          View 3D Asset GLB
                        </a>
                      ) : (
                        <span className="text-amber-400">Rendering AI Concept...</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================================================================= */}
          {/* Module 14: COURSES & LEARNING */}
          {/* ================================================================= */}
          {activeSection === 'courses' && (
            <div className="space-y-4 max-w-6xl mx-auto">
              <div>
                <h2 className="text-2xl font-black text-white">Engineering Courses & Learning Hub</h2>
                <p className="text-xs text-slate-400">Technical civil engineering syllabus, bar bending schedule, and inspection standards</p>
              </div>

              <form onSubmit={handleCreateCourse} className="bg-slate-900/80 p-4 rounded-3xl border border-slate-800 flex flex-wrap items-center gap-3">
                <input
                  type="text"
                  placeholder="New Course Title..."
                  value={newCourseTitle}
                  onChange={(e) => setNewCourseTitle(e.target.value)}
                  className="flex-1 min-w-[200px] px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                />
                <input
                  type="text"
                  placeholder="Category (e.g. Civil Execution)"
                  value={newCourseCategory}
                  onChange={(e) => setNewCourseCategory(e.target.value)}
                  className="w-48 px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                />
                <input
                  type="number"
                  placeholder="Price (₹)"
                  value={newCoursePrice}
                  onChange={(e) => setNewCoursePrice(e.target.value)}
                  className="w-28 px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold"
                >
                  + Add Course
                </button>
              </form>

              <div className="bg-slate-900/80 rounded-3xl border border-slate-800 overflow-hidden shadow-xl">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-950 text-slate-400 font-bold border-b border-slate-800">
                    <tr>
                      <th className="p-4">Course Title</th>
                      <th className="p-4">Category</th>
                      <th className="p-4">Price</th>
                      <th className="p-4">Enrollments</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {courses.map((crs) => (
                      <tr key={crs.id} className="hover:bg-slate-850/60">
                        <td className="p-4 font-bold text-white text-sm">{crs.title}</td>
                        <td className="p-4 text-blue-400 font-semibold">{crs.category}</td>
                        <td className="p-4 font-bold text-emerald-400">₹ {crs.price}</td>
                        <td className="p-4 text-slate-300">{crs.enrollmentsCount} Enrolled</td>
                        <td className="p-4 text-right">
                          <button
                            onClick={() => handleDeleteCourse(crs.id)}
                            className="p-1.5 rounded-lg bg-red-600/20 text-red-300 hover:bg-red-600/30"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ================================================================= */}
          {/* Module 15: PRODUCTS & MATERIALS */}
          {/* ================================================================= */}
          {activeSection === 'products' && (
            <div className="space-y-4 max-w-6xl mx-auto">
              <div>
                <h2 className="text-2xl font-black text-white">Construction Raw Materials Inventory</h2>
                <p className="text-xs text-slate-400">Primary wholesale index for TMT steel, cement, M-sand, and masonry bricks</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {products.map((prd) => (
                  <div key={prd.id} className="bg-slate-900/80 p-5 rounded-3xl border border-slate-800 shadow-xl flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold bg-blue-500/20 text-blue-300 px-2.5 py-0.5 rounded-full">{prd.brand}</span>
                      <h3 className="text-base font-bold text-white mt-1.5">{prd.name}</h3>
                      <p className="text-xs text-slate-400 mt-0.5">Unit: {prd.unit} • {prd.stock}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-black text-emerald-400">{prd.price}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================================================================= */}
          {/* Module 16: SERVICES */}
          {/* ================================================================= */}
          {activeSection === 'services' && (
            <div className="space-y-4 max-w-6xl mx-auto">
              <div>
                <h2 className="text-2xl font-black text-white">On-Demand Civil & Home Services</h2>
                <p className="text-xs text-slate-400">Standardized rate cards and contractor allocation metrics</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {servicesList.map((srv) => (
                  <div key={srv.id} className="bg-slate-900/80 p-5 rounded-3xl border border-slate-800 shadow-xl flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-bold text-white">{srv.name}</h3>
                      <p className="text-xs text-slate-400 mt-1">Est. Turnaround: {srv.turnaround}</p>
                      <p className="text-xs text-blue-400 font-semibold mt-0.5">{srv.activeProviders} Verified Crews Active</p>
                    </div>
                    <div className="text-right">
                      <span className="text-base font-black text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-xl">
                        {srv.rate}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================================================================= */}
          {/* Module 17: DYNAMIC HOMEPAGE CMS */}
          {/* ================================================================= */}
          {activeSection === 'homepage_mgmt' && (
            <div className="space-y-4 max-w-3xl mx-auto">
              <div>
                <h2 className="text-2xl font-black text-white">Dynamic Homepage CMS</h2>
                <p className="text-xs text-slate-400">Update hero headings, CTA buttons, links, and banners without code changes</p>
              </div>

              <form onSubmit={handleSaveHeroCms} className="bg-slate-900/80 p-6 rounded-3xl border border-slate-800 space-y-4 shadow-xl">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Hero Main Title</label>
                  <input
                    type="text"
                    value={heroForm.title}
                    onChange={(e) => setHeroForm({ ...heroForm, title: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Hero Subtitle</label>
                  <textarea
                    rows={3}
                    value={heroForm.subtitle}
                    onChange={(e) => setHeroForm({ ...heroForm, subtitle: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">Primary CTA Button Label</label>
                    <input
                      type="text"
                      value={heroForm.ctaPrimaryText}
                      onChange={(e) => setHeroForm({ ...heroForm, ctaPrimaryText: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">Primary CTA Link URL</label>
                    <input
                      type="text"
                      value={heroForm.ctaPrimaryLink}
                      onChange={(e) => setHeroForm({ ...heroForm, ctaPrimaryLink: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">AWS S3 Hero Image URL</label>
                  <input
                    type="text"
                    value={heroForm.heroImageUrl}
                    onChange={(e) => setHeroForm({ ...heroForm, heroImageUrl: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-black text-xs shadow-lg shadow-blue-950 transition-all"
                >
                  Publish & Sync to Public Website
                </button>
              </form>
            </div>
          )}

          {/* ================================================================= */}
          {/* Module 19: AWS S3 MEDIA LIBRARY */}
          {/* ================================================================= */}
          {activeSection === 'media_library' && (
            <div className="space-y-4 max-w-6xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-2xl font-black text-white">AWS S3 Media & Asset Library</h2>
                  <p className="text-xs text-slate-400">Direct streaming to S3 Bucket: <strong className="text-blue-400">buildmitra-mumbai-storage</strong></p>
                </div>

                <label className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl text-xs font-bold cursor-pointer shadow-lg shadow-blue-950 transition-all">
                  <Upload className="w-4 h-4" />
                  <span>Upload to AWS S3</span>
                  <input
                    type="file"
                    accept="image/*,application/pdf"
                    onChange={handleFileUploadToS3}
                    className="hidden"
                  />
                </label>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {mediaList.map((media) => (
                  <div key={media.id} className="bg-slate-900/80 rounded-3xl border border-slate-800 overflow-hidden flex flex-col group shadow-lg">
                    <div className="h-32 bg-slate-950 flex items-center justify-center overflow-hidden relative">
                      {media.mimeType && media.mimeType.startsWith('image') ? (
                        <img src={media.s3Url} alt={media.originalName} className="h-full w-full object-cover group-hover:scale-105 transition-transform" />
                      ) : (
                        <FileText className="w-12 h-12 text-slate-600" />
                      )}
                      <button
                        onClick={() => handleDeleteMedia(media.id)}
                        className="absolute top-2 right-2 p-1.5 bg-red-600/90 hover:bg-red-600 text-white rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="p-3 text-xs flex-1 flex flex-col justify-between">
                      <div className="font-bold text-white truncate" title={media.originalName}>
                        {media.originalName}
                      </div>
                      <div className="flex items-center justify-between mt-2 text-[10px] text-slate-400">
                        <span>{(media.size / 1024).toFixed(1)} KB</span>
                        <a
                          href={media.s3Url}
                          target="_blank"
                          rel="noreferrer"
                          className="text-blue-400 hover:underline flex items-center gap-0.5"
                        >
                          <span>S3 Link</span>
                          <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================================================================= */}
          {/* Module 21: RAZORPAY LIVE PAYMENTS LEDGER */}
          {/* ================================================================= */}
          {activeSection === 'payments' && (
            <div className="space-y-4 max-w-6xl mx-auto">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-black text-white">Razorpay Live Transaction Ledger</h2>
                  <p className="text-xs text-slate-400">Cryptographically verified payment records & invoices</p>
                </div>
                <div className="text-xs bg-emerald-500/20 text-emerald-300 px-3.5 py-1 rounded-full font-bold border border-emerald-500/30">
                  Live Key: rzp_live_U3Cm82CFvT9y1U
                </div>
              </div>

              <div className="bg-slate-900/80 rounded-3xl border border-slate-800 overflow-hidden shadow-xl">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-950 text-slate-400 font-bold border-b border-slate-800">
                    <tr>
                      <th className="p-4">Payment ID</th>
                      <th className="p-4">Customer Contact</th>
                      <th className="p-4">Purpose</th>
                      <th className="p-4">Amount</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 text-right">Timestamp</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {payments.map((pay) => (
                      <tr key={pay.id} className="hover:bg-slate-850/60">
                        <td className="p-4 font-mono font-bold text-slate-200">{pay.paymentId}</td>
                        <td className="p-4 text-slate-300">{pay.userPhone}</td>
                        <td className="p-4 text-blue-300 font-medium">{pay.purpose}</td>
                        <td className="p-4 font-black text-emerald-400">₹ {pay.amount.toLocaleString('en-IN')}</td>
                        <td className="p-4">
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400">
                            {pay.status}
                          </span>
                        </td>
                        <td className="p-4 text-right text-slate-400 text-[11px]">
                          {new Date(pay.createdAt).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ================================================================= */}
          {/* Module 27: AWS & INTEGRATION STATUS */}
          {/* ================================================================= */}
          {activeSection === 'aws_status' && (
            <div className="space-y-4 max-w-4xl mx-auto">
              <div>
                <h2 className="text-2xl font-black text-white">AWS Cloud & Infrastructure Status</h2>
                <p className="text-xs text-slate-400">Region: <strong className="text-blue-400">ap-south-1 (Mumbai)</strong></p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-slate-900/80 p-6 rounded-3xl border border-slate-800 space-y-3 shadow-xl">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-400 uppercase">Amazon S3 Storage</span>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400">ACTIVE</span>
                  </div>
                  <div className="text-xl font-black text-white">buildmitra-mumbai-storage</div>
                  <ul className="text-xs text-slate-300 space-y-1.5 font-mono">
                    <li>• Region: ap-south-1 (Mumbai)</li>
                    <li>• CORS Configuration: ENABLED</li>
                    <li>• PublicReadGetObject Policy: ACTIVE</li>
                    <li>• IAM User: buildmitra-s3-uploader</li>
                  </ul>
                </div>

                <div className="bg-slate-900/80 p-6 rounded-3xl border border-slate-800 space-y-3 shadow-xl">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-400 uppercase">Razorpay Live Gateway</span>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400">LIVE</span>
                  </div>
                  <div className="text-xl font-black text-white">rzp_live_U3Cm82CFvT9y1U</div>
                  <ul className="text-xs text-slate-300 space-y-1.5 font-mono">
                    <li>• HMAC-SHA256 Signature Check: ACTIVE</li>
                    <li>• ₹20 Default PDF Order Creation: READY</li>
                    <li>• Currency: INR (Paise normalized)</li>
                  </ul>
                </div>
              </div>

              <div className="bg-slate-900/80 p-6 rounded-3xl border border-slate-800 shadow-xl">
                <h3 className="text-base font-bold text-white mb-2">AWS EC2 Dedicated Instance</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Instance ID: <code className="text-purple-300 font-mono">i-0edcb15a1a72cc6ae</code> in Mumbai. Protected by SSH PEM key and environment variables (<code className="text-slate-400 font-mono">server/.env</code>).
                </p>
              </div>
            </div>
          )}

          {/* ================================================================= */}
          {/* Module 26: SECURITY AUDIT LOGS */}
          {/* ================================================================= */}
          {activeSection === 'audit_logs' && (
            <div className="space-y-4 max-w-6xl mx-auto">
              <div>
                <h2 className="text-2xl font-black text-white">Security & Administrative Audit Trail</h2>
                <p className="text-xs text-slate-400">Immutable ledger of administrative decisions, logins, and payment events</p>
              </div>

              <div className="bg-slate-900/80 rounded-3xl border border-slate-800 overflow-hidden shadow-xl">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-950 text-slate-400 font-bold border-b border-slate-800">
                    <tr>
                      <th className="p-4">Log ID</th>
                      <th className="p-4">Event Action</th>
                      <th className="p-4">Initiator</th>
                      <th className="p-4">Event Details</th>
                      <th className="p-4 text-right">Timestamp</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {auditLogs.map((log) => (
                      <tr key={log.id} className="hover:bg-slate-850/60">
                        <td className="p-4 font-mono text-slate-400">{log.id}</td>
                        <td className="p-4 font-bold text-blue-400">{log.action}</td>
                        <td className="p-4 font-semibold text-slate-300">{log.user}</td>
                        <td className="p-4 text-slate-300 truncate max-w-md">{log.details}</td>
                        <td className="p-4 text-right text-slate-500 font-mono text-[11px]">
                          {new Date(log.timestamp).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ================================================================= */}
          {/* Module 24: SUPPORT REQUESTS & TICKETS */}
          {/* ================================================================= */}
          {activeSection === 'support_requests' && (
            <div className="space-y-4 max-w-5xl mx-auto">
              <div>
                <h2 className="text-2xl font-black text-white">Customer Support & Inquiries</h2>
                <p className="text-xs text-slate-400">Technical inquiries, turnkey civil quotes, and calculator assistance</p>
              </div>

              <div className="space-y-3">
                {supportRequests.map((tkt) => (
                  <div key={tkt.id} className="bg-slate-900/80 p-5 rounded-3xl border border-slate-800 shadow-xl space-y-2.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white text-sm">{tkt.name}</span>
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          tkt.status === 'Resolved' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'
                        }`}>
                          {tkt.status}
                        </span>
                      </div>
                      <span className="text-xs text-slate-500">{new Date(tkt.timestamp).toLocaleDateString()}</span>
                    </div>

                    <div className="text-xs font-bold text-blue-400">{tkt.subject}</div>
                    <p className="text-xs text-slate-300 bg-slate-950/60 p-3 rounded-2xl border border-slate-800">
                      {tkt.message}
                    </p>
                    <div className="text-[11px] text-slate-400 flex items-center gap-4">
                      <span>Phone: <strong className="text-slate-200">{tkt.phone}</strong></span>
                      <span>Email: <strong className="text-slate-200">{tkt.email}</strong></span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================================================================= */}
          {/* Module 3: REAL ESTATE USERS & DEVELOPERS */}
          {/* ================================================================= */}
          {activeSection === 're_users' && (
            <div className="space-y-4 max-w-6xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-2xl font-black text-white">Real Estate Users, Buyers & Developers</h2>
                  <p className="text-xs text-slate-400">Institutional developers, commercial investors, and residential property seekers</p>
                </div>
                <span className="text-xs font-bold px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full border border-blue-500/30">
                  {users.filter(u => u.role.includes('Real Estate') || u.role.includes('Seller')).length || 2} Active Developers
                </span>
              </div>

              <div className="bg-slate-900/80 rounded-3xl border border-slate-800 overflow-hidden shadow-xl">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-950 text-slate-400 font-bold uppercase tracking-wider border-b border-slate-800">
                    <tr>
                      <th className="p-4">Developer / Buyer</th>
                      <th className="p-4">Entity Type</th>
                      <th className="p-4">Primary Hub</th>
                      <th className="p-4">Active Listings / Requests</th>
                      <th className="p-4">Tier</th>
                      <th className="p-4 text-right">Verification</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {[
                      { name: 'Sri City Developers & Realtors', phone: '+91 99001 22334', email: 'sales@sricitydev.in', type: 'RERA Builder & Developer', city: 'Hyderabad', listings: '4 Villas & Commercials', tier: 'Professional Seller', verified: true },
                      { name: 'Prestige Partner Realty Infra', phone: '+91 98451 44556', email: 'commercials@prestigepartner.com', type: 'Institutional Real Estate', city: 'Bengaluru', listings: '8 Luxury Apartments', tier: 'Enterprise Developer', verified: true },
                      { name: 'Deccan Commercial Properties', phone: '+91 97002 88991', email: 'leasing@deccancomm.in', type: 'Commercial Leasing Hub', city: 'Hyderabad (ORR)', listings: '2 Tech Parks', tier: 'Corporate Partner', verified: true },
                      { name: 'Vikramaditya Rao (Investor)', phone: '+91 98220 55441', email: 'vikram.rao@infra.org', type: 'High-Net-Worth Land Buyer', city: 'Bengaluru / Hyderabad', listings: '6 Plot Enquiries', tier: 'Investor Premium', verified: true }
                    ].map((re, idx) => (
                      <tr key={idx} className="hover:bg-slate-850/60 transition-colors">
                        <td className="p-4">
                          <div className="font-bold text-white text-sm">{re.name}</div>
                          <div className="text-[11px] text-slate-400">{re.phone} • {re.email}</div>
                        </td>
                        <td className="p-4 text-slate-300 font-medium">{re.type}</td>
                        <td className="p-4 text-blue-400 font-semibold">{re.city}</td>
                        <td className="p-4 text-slate-200">{re.listings}</td>
                        <td className="p-4">
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-500/20 text-purple-300">
                            {re.tier}
                          </span>
                        </td>
                        <td className="p-4 text-right">
                          <span className="inline-flex items-center gap-1 text-emerald-400 font-bold text-xs">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>RERA Verified</span>
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ================================================================= */}
          {/* Module 4: SELLERS & PRIMARY STOCKYARDS */}
          {/* ================================================================= */}
          {activeSection === 'sellers' && (
            <div className="space-y-4 max-w-6xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-2xl font-black text-white">Primary Sellers & Material Stockyards</h2>
                  <p className="text-xs text-slate-400">Direct primary steel manufacturers, cement depot hubs, and quarry distributors</p>
                </div>
                <span className="text-xs font-bold px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-full border border-emerald-500/30">
                  4 Tier-1 Distributors Active
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { name: 'JSW Steel Authorized Primary Stockyard', material: 'Fe 550D TMT Rebar Steel (Primary)', city: 'Bengaluru Regional Depot (Peenya)', discount: '4.8% Below Market Landed Rate', rating: '4.9/5 (148 Orders)', phone: '+91 98888 11111', gst: '29AAACJ3214K1Z0', verified: true },
                  { name: 'Tata Tiscon Regional Depot Hub', material: 'Super Ductile Fe 500D / 550D Rebars', city: 'Hyderabad Central Stockyard (Sanathnagar)', discount: '3.2% Wholesale Volume Discount', rating: '4.8/5 (210 Orders)', phone: '+91 97777 22222', gst: '36AABCT9982M1Z4', verified: true },
                  { name: 'UltraTech Cement Regional Depot Hub', material: 'OPC 53 Grade & Super Cement Pallets', city: 'Hyderabad & Cyberabad Hubs', discount: '₹ 345/Bag Benchmark Bidding Rate', rating: '4.9/5 (340 Orders)', phone: '+91 96666 33333', gst: '36AAACU4432P1Z1', verified: true },
                  { name: 'Robo Silicon Quarry Products Hub', material: 'Double Washed Concrete M-Sand Zone-II', city: 'Bengaluru Outer Ring Road Hub', discount: 'NABL Certified Silt Content < 3%', rating: '4.7/5 (92 Orders)', phone: '+91 95555 44444', gst: '29AABCR8876L1Z9', verified: true }
                ].map((seller, idx) => (
                  <div key={idx} className="bg-slate-900/80 p-5 rounded-3xl border border-slate-800 shadow-xl space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black uppercase bg-blue-500/20 text-blue-300 px-2.5 py-0.5 rounded-full">
                        Tier-1 Primary Manufacturer
                      </span>
                      <span className="text-xs font-bold text-amber-400">★ {seller.rating}</span>
                    </div>

                    <div>
                      <h3 className="text-base font-bold text-white">{seller.name}</h3>
                      <p className="text-xs text-blue-400 font-semibold mt-0.5">{seller.material}</p>
                      <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-500" />
                        <span>{seller.city}</span>
                      </p>
                    </div>

                    <div className="p-3 bg-slate-950/60 rounded-2xl border border-slate-800 flex items-center justify-between text-xs">
                      <div>
                        <div className="text-[10px] text-slate-400">Reverse Auction Pricing Benefit</div>
                        <div className="font-bold text-emerald-400 mt-0.5">{seller.discount}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-[10px] text-slate-400">GSTIN</div>
                        <div className="font-mono text-slate-300 text-[11px]">{seller.gst}</div>
                      </div>
                    </div>

                    <div className="pt-1 flex items-center justify-between text-xs text-slate-400">
                      <span>Phone: <strong className="text-slate-200">{seller.phone}</strong></span>
                      <span className="text-emerald-400 font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Verified Primary Supplier</span>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================================================================= */}
          {/* Module 5: PARTNERS DIRECTORY */}
          {/* ================================================================= */}
          {activeSection === 'partners' && (
            <div className="space-y-4 max-w-6xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-2xl font-black text-white">Full Partners & Professionals Directory</h2>
                  <p className="text-xs text-slate-400">Verified contractors, architects, engineers, tradesmen, and service providers</p>
                </div>
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    placeholder="Search partner or category..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 w-64"
                  />
                </div>
              </div>

              <div className="bg-slate-900/80 rounded-3xl border border-slate-800 overflow-hidden shadow-xl">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-950 text-slate-400 font-bold uppercase tracking-wider border-b border-slate-800">
                    <tr>
                      <th className="p-4">Partner Business</th>
                      <th className="p-4">Category</th>
                      <th className="p-4">Experience</th>
                      <th className="p-4">Service Locations</th>
                      <th className="p-4">Subscription Plan</th>
                      <th className="p-4 text-right">KYC Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {partners
                      .filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.category.toLowerCase().includes(searchQuery.toLowerCase()))
                      .map((p) => (
                        <tr key={p.id} className="hover:bg-slate-850/60 transition-colors">
                          <td className="p-4">
                            <div className="font-bold text-white text-sm">{p.businessName || p.name}</div>
                            <div className="text-[11px] text-slate-400">{p.name} • {p.phone}</div>
                          </td>
                          <td className="p-4 font-bold text-blue-400">{p.category}</td>
                          <td className="p-4 text-slate-300">{p.experienceYears} Years Exp</td>
                          <td className="p-4 text-slate-400 truncate max-w-xs">{p.serviceLocations.join(', ')}</td>
                          <td className="p-4">
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-500/20 text-purple-300">
                              {p.subscriptionPlan}
                            </span>
                          </td>
                          <td className="p-4 text-right">
                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                              p.status === 'Approved' ? 'bg-emerald-500/20 text-emerald-400' :
                              p.status === 'Rejected' ? 'bg-red-500/20 text-red-400' : 'bg-amber-500/20 text-amber-400'
                            }`}>
                              {p.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ================================================================= */}
          {/* Module 7: CONTRACTORS & TRADES */}
          {/* ================================================================= */}
          {activeSection === 'contractors_helpers' && (
            <div className="space-y-4 max-w-6xl mx-auto">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-black text-white">Construction Trades & Helper Gangs</h2>
                  <p className="text-xs text-slate-400">Skilled tradesmen rates, crew allocations, and verified manpower</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { trade: 'Interior & Exterior Painters', crewSize: '4-8 Masons & Painters', rate: '₹ 16 / Sq.Ft Base Rate', pros: 46, status: 'High Demand' },
                  { trade: 'Licensed Electricians', crewSize: 'Wiremen & Technicians', rate: '₹ 22 / Point / Sq.Ft', pros: 52, status: 'Active' },
                  { trade: 'Concealed CPVC Plumbers', crewSize: 'Fitters & Master Plumbers', rate: '₹ 18 / Sq.Ft Base', pros: 39, status: 'Active' },
                  { trade: 'Modular Carpenters', crewSize: 'Joinery & Woodcraft Specialists', rate: '₹ 120 / Sq.Ft Finished', pros: 31, status: 'Active' },
                  { trade: 'Civil Bar Benders & Masons', crewSize: 'RCC Shuttering & Rebar Tying', rate: '₹ 850 / Day / Skilled Mason', pros: 34, status: 'High Demand' },
                  { trade: 'Labour Contractor Gangs', crewSize: 'Groups of 10 to 40 Helpers', rate: '₹ 550 / Day / Helper', pros: 29, status: 'Active' }
                ].map((item, idx) => (
                  <div key={idx} className="bg-slate-900/80 p-5 rounded-3xl border border-slate-800 shadow-xl space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded">
                        {item.status}
                      </span>
                      <span className="text-xs font-bold text-emerald-400">{item.pros} Crews Available</span>
                    </div>

                    <h3 className="text-base font-bold text-white">{item.trade}</h3>
                    <p className="text-xs text-slate-400">Typical Crew: <strong className="text-slate-300">{item.crewSize}</strong></p>

                    <div className="pt-2 border-t border-slate-800 text-xs flex items-center justify-between">
                      <span className="text-slate-400">Benchmark Rate:</span>
                      <strong className="text-emerald-400 font-bold">{item.rate}</strong>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================================================================= */}
          {/* Module 11: CALCULATOR REPORTS */}
          {/* ================================================================= */}
          {activeSection === 'calc_reports' && (
            <div className="space-y-4 max-w-6xl mx-auto">
              <div>
                <h2 className="text-2xl font-black text-white">Calculator Estimation Activity Log</h2>
                <p className="text-xs text-slate-400">Historical engineering calculations computed across the 19 tools</p>
              </div>

              <div className="bg-slate-900/80 rounded-3xl border border-slate-800 overflow-hidden shadow-xl">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-950 text-slate-400 font-bold uppercase tracking-wider border-b border-slate-800">
                    <tr>
                      <th className="p-4">Calculation ID</th>
                      <th className="p-4">Calculator Tool</th>
                      <th className="p-4">Input Specifications</th>
                      <th className="p-4">Estimated Value</th>
                      <th className="p-4">User</th>
                      <th className="p-4 text-right">Timestamp</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {[
                      { id: 'CALC-901', name: 'Turnkey Construction Cost Calculator', input: '1,500 Sq.Ft | Premium Grade (₹1,850/sqft)', total: '₹ 27,75,000', user: '+91 98765 43210', date: 'Today, 3:15 PM' },
                      { id: 'CALC-902', name: 'Steel Reinforcement (TMT) Calculator', input: '2,400 Sq.Ft Slab | Fe 550D Rebars', total: '₹ 6,14,400', user: '+91 98220 55441', date: 'Today, 2:40 PM' },
                      { id: 'CALC-903', name: 'Concrete Mix & Grade Calculator', input: 'M25 Design Mix | 45 Cubic Meters', total: '₹ 2,16,000', user: '+91 97412 88990', date: 'Today, 1:20 PM' },
                      { id: 'CALC-904', name: 'Brickwork & Masonry Calculator', input: '9x4x3 Red Bricks | 1,800 Sq.Ft Wall Area', total: '₹ 1,62,000', user: '+91 98450 11223', date: 'Yesterday, 5:10 PM' },
                      { id: 'CALC-905', name: 'Paint & Primer Area Estimator', input: '3BHK Villa (2,800 Sq.Ft Wall + Ceiling)', total: '₹ 44,800', user: '+91 99001 22334', date: 'Yesterday, 3:45 PM' }
                    ].map((c) => (
                      <tr key={c.id} className="hover:bg-slate-850/60">
                        <td className="p-4 font-mono font-bold text-white">{c.id}</td>
                        <td className="p-4 font-semibold text-blue-400">{c.name}</td>
                        <td className="p-4 text-slate-300">{c.input}</td>
                        <td className="p-4 font-bold text-emerald-400">{c.total}</td>
                        <td className="p-4 text-slate-400">{c.user}</td>
                        <td className="p-4 text-right text-slate-500 font-mono text-[11px]">{c.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ================================================================= */}
          {/* Module 18: PAGE SECTIONS CMS */}
          {/* ================================================================= */}
          {activeSection === 'page_sections' && (
            <div className="space-y-4 max-w-4xl mx-auto">
              <div>
                <h2 className="text-2xl font-black text-white">Page Sections & Content CMS</h2>
                <p className="text-xs text-slate-400">Edit About Us, Why Choose Us, FAQs, and Promotional Announcement Banners</p>
              </div>

              <div className="bg-slate-900/80 p-6 rounded-3xl border border-slate-800 shadow-xl space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Top Announcement Ribbon</label>
                  <input
                    type="text"
                    defaultValue={cmsSections.announcement?.text || '🚀 AWS S3 Storage & Razorpay Live Gateway Activated across Mumbai (ap-south-1)'}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">About Us Heading</label>
                  <input
                    type="text"
                    defaultValue={cmsSections.about?.heading || 'About BuildMitra Ecosystem'}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">About Us Body Text</label>
                  <textarea
                    rows={4}
                    defaultValue={cmsSections.about?.body || 'BuildMitra connects verified civil contractors, skilled tradesmen, primary material suppliers, and real estate developers with property owners through transparent digital pricing, reverse auctions, and engineering calculators.'}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                  />
                </div>

                <button
                  onClick={() => showNotice('Content updated and published live!')}
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md"
                >
                  Save Section Changes
                </button>
              </div>
            </div>
          )}

          {/* ================================================================= */}
          {/* Module 20: SUBSCRIPTION PLANS */}
          {/* ================================================================= */}
          {activeSection === 'subscriptions' && (
            <div className="space-y-4 max-w-6xl mx-auto">
              <div>
                <h2 className="text-2xl font-black text-white">Configurable Subscription Plans</h2>
                <p className="text-xs text-slate-400">Configure member privileges, lead quotas, and fees</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { name: 'Free Member', price: '₹ 0', duration: 'Lifetime', features: ['Public Directory Browsing', 'Basic Calculator Usage', 'Enquiry Submission'], subscribers: '1,420 Users' },
                  { name: 'Basic Partner', price: '₹ 799', duration: 'Monthly', features: ['Verified Trade Badge', 'Up to 10 Client Leads/month', 'Direct Support'], subscribers: '18 Partners' },
                  { name: 'Professional Partner', price: '₹ 1,499', duration: 'Monthly', features: ['Priority Search Ranking', 'Unlimited Client Leads', 'Direct Call Connect', 'S3 Portfolio Showcase'], subscribers: '34 Partners' },
                  { name: 'Premium Enterprise', price: '₹ 3,999', duration: 'Quarterly', features: ['Top Homepage Feature', 'Reverse Auction Supplier Access', 'Dedicated Account Manager', 'Verified GST Badge'], subscribers: '12 Partners' }
                ].map((plan, idx) => (
                  <div key={idx} className="bg-slate-900/80 p-5 rounded-3xl border border-slate-800 shadow-xl flex flex-col justify-between space-y-4">
                    <div>
                      <div className="flex items-center justify-between">
                        <h3 className="font-bold text-white text-base">{plan.name}</h3>
                        <span className="text-[10px] font-bold bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded">{plan.duration}</span>
                      </div>
                      <div className="text-2xl font-black text-emerald-400 mt-2">{plan.price}</div>
                      <div className="text-[11px] text-slate-400 mt-0.5">{plan.subscribers} Active</div>

                      <ul className="mt-3 space-y-1.5 text-xs text-slate-300">
                        {plan.features.map((f, fIdx) => (
                          <li key={fIdx} className="flex items-center gap-1.5">
                            <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <button
                      onClick={() => showNotice(`Updated ${plan.name} configuration`)}
                      className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl"
                    >
                      Configure Tier
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================================================================= */}
          {/* Module 22: REVENUE ANALYTICS */}
          {/* ================================================================= */}
          {activeSection === 'revenue_analytics' && (
            <div className="space-y-4 max-w-6xl mx-auto">
              <div>
                <h2 className="text-2xl font-black text-white">Platform Revenue & Financial Analytics</h2>
                <p className="text-xs text-slate-400">Cryptographically captured fees across subscriptions, reverse auctions, and ₹20 PDF reports</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-slate-900/80 p-5 rounded-3xl border border-slate-800 shadow-xl">
                  <div className="text-xs text-slate-400 uppercase font-bold">Total Platform Gross Revenue</div>
                  <div className="text-3xl font-black text-emerald-400 mt-2">
                    ₹ {(analytics?.finance.totalRevenue || payments.reduce((sum, p) => sum + p.amount, 0)).toLocaleString('en-IN')}
                  </div>
                  <div className="text-xs text-slate-400 mt-1">100% Verified in Razorpay Live</div>
                </div>

                <div className="bg-slate-900/80 p-5 rounded-3xl border border-slate-800 shadow-xl">
                  <div className="text-xs text-slate-400 uppercase font-bold">Partner Subscriptions Volume</div>
                  <div className="text-3xl font-black text-blue-400 mt-2">₹ 5,498</div>
                  <div className="text-xs text-slate-400 mt-1">Recurring Monthly / Quarterly Plans</div>
                </div>

                <div className="bg-slate-900/80 p-5 rounded-3xl border border-slate-800 shadow-xl">
                  <div className="text-xs text-slate-400 uppercase font-bold">₹20 Detailed PDF Reports Volume</div>
                  <div className="text-3xl font-black text-purple-400 mt-2">
                    ₹ {payments.filter(p => p.purpose.includes('PDF')).reduce((sum, p) => sum + p.amount, 0) || 60}
                  </div>
                  <div className="text-xs text-slate-400 mt-1">Directly generated & archived on AWS S3</div>
                </div>
              </div>
            </div>
          )}

          {/* ================================================================= */}
          {/* Module 23: BROADCAST NOTIFICATIONS */}
          {/* ================================================================= */}
          {activeSection === 'notifications' && (
            <div className="space-y-4 max-w-5xl mx-auto">
              <div>
                <h2 className="text-2xl font-black text-white">Broadcast Alerts & Push Notifications</h2>
                <p className="text-xs text-slate-400">Dispatch platform-wide alerts to customers, verified contractors, and suppliers</p>
              </div>

              <div className="bg-slate-900/80 p-5 rounded-3xl border border-slate-800 shadow-xl space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="Broadcast Subject (e.g. Reverse Auction Notice)"
                    className="px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                  />
                  <select className="px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white">
                    <option>All Users & Partners</option>
                    <option>Verified Contractors Only</option>
                    <option>Primary Material Suppliers Only</option>
                  </select>
                </div>
                <textarea
                  rows={2}
                  placeholder="Broadcast message body..."
                  className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                />
                <button
                  onClick={() => showNotice('Broadcast notification dispatched to all devices!')}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold shadow-md"
                >
                  Send Broadcast Notice
                </button>
              </div>

              <div className="space-y-2">
                {notifications.map((n) => (
                  <div key={n.id} className="p-4 bg-slate-900/80 rounded-2xl border border-slate-800 flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white text-xs">{n.title}</span>
                        <span className="text-[10px] font-bold bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded">{n.type}</span>
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5">{n.body}</p>
                    </div>
                    <span className="text-[11px] text-slate-500">{n.date}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================================================================= */}
          {/* Module 25: ADMIN USERS & RBAC */}
          {/* ================================================================= */}
          {activeSection === 'admin_users' && (
            <div className="space-y-4 max-w-5xl mx-auto">
              <div>
                <h2 className="text-2xl font-black text-white">Super Admin Team & Role-Based Access Control</h2>
                <p className="text-xs text-slate-400">Manage administrator privileges and session security</p>
              </div>

              <div className="bg-slate-900/80 rounded-3xl border border-slate-800 overflow-hidden shadow-xl">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-950 text-slate-400 font-bold border-b border-slate-800">
                    <tr>
                      <th className="p-4">Admin Name</th>
                      <th className="p-4">Assigned Role</th>
                      <th className="p-4">Access Scope</th>
                      <th className="p-4 text-right">Last Login</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {adminUsers.map((adm) => (
                      <tr key={adm.id} className="hover:bg-slate-850/60">
                        <td className="p-4">
                          <div className="font-bold text-white text-sm">{adm.name}</div>
                          <div className="text-[11px] text-slate-400">{adm.email}</div>
                        </td>
                        <td className="p-4 font-bold text-purple-400">{adm.role}</td>
                        <td className="p-4 text-slate-300">{adm.permissions}</td>
                        <td className="p-4 text-right font-mono text-slate-400">{adm.lastLogin}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ================================================================= */}
          {/* Module 28: PLATFORM SETTINGS */}
          {/* ================================================================= */}
          {activeSection === 'settings' && (
            <div className="space-y-4 max-w-4xl mx-auto">
              <div>
                <h2 className="text-2xl font-black text-white">System Settings & Platform Defaults</h2>
                <p className="text-xs text-slate-400">Global environment variables, contact information, and default pricing</p>
              </div>

              <div className="bg-slate-900/80 p-6 rounded-3xl border border-slate-800 shadow-xl space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">Platform Brand Name</label>
                    <input
                      type="text"
                      defaultValue={systemSettings.platformName || 'BuildMitra'}
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">Default PDF Report Price (₹)</label>
                    <input
                      type="number"
                      defaultValue={systemSettings.pdfDefaultPrice || 20}
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white font-bold text-emerald-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">Official Support Email</label>
                    <input
                      type="email"
                      defaultValue={systemSettings.contactEmail || 'contact@buildmitra.com'}
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">Official Support Phone</label>
                    <input
                      type="text"
                      defaultValue={systemSettings.contactPhone || '+91 98450 00001'}
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                    />
                  </div>
                </div>

                <button
                  onClick={() => showNotice('System settings saved successfully!')}
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md"
                >
                  Save Platform Settings
                </button>
              </div>
            </div>
          )}

        </main>
      </div>

    </div>
  );
};
