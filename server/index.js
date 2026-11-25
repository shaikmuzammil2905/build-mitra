const express = require('express');
const cors = require('cors');
const multer = require('multer');
require('dotenv').config();

const db = require('./db');
const { uploadToS3, deleteFromS3 } = require('./s3');
const { createOrder, verifyPaymentSignature, key_id } = require('./razorpay');
const { generateEstimationPdf } = require('./pdfGenerator');

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for Vercel frontend, local development & direct requests
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Memory storage for file uploads before S3 streaming
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 25 * 1024 * 1024 } // 25 MB limit
});

// ==========================================
// 1. SYSTEM HEALTH & CLOUD METRICS
// ==========================================
app.get('/api/health', (req, res) => {
  res.json({
    status: 'Online',
    service: 'BuildMitra Master Backend API',
    cloud: 'AWS EC2 & S3 (Mumbai ap-south-1)',
    bucket: process.env.AWS_S3_BUCKET || 'buildmitra-mumbai-storage',
    razorpayConfigured: !!process.env.RAZORPAY_KEY_ID,
    timestamp: new Date().toISOString()
  });
});

// ==========================================
// 2. SUPER ADMIN DASHBOARD ANALYTICS (Phase 3.A)
// ==========================================
app.get('/api/admin/analytics', (req, res) => {
  const d = db.data;
  
  const totalUsers = d.users.length;
  const activeUsers = d.users.filter(u => u.status === 'Active').length;
  const inactiveUsers = d.users.filter(u => u.status !== 'Active').length;
  const totalRealEstateUsers = d.users.filter(u => u.role.includes('Seller') || u.role.includes('Real Estate')).length;

  const totalPartners = d.partners.length;
  const pendingPartnerApprovals = d.partners.filter(p => p.status === 'Pending Approval').length;
  const approvedPartners = d.partners.filter(p => p.status === 'Approved').length;
  const rejectedPartners = d.partners.filter(p => p.status === 'Rejected').length;

  // Partner category counts
  const contractorsCount = d.partners.filter(p => p.category.includes('Contractor') || p.category.includes('Civil')).length;
  const paintersCount = d.partners.filter(p => p.category.includes('Painter')).length;
  const electriciansCount = d.partners.filter(p => p.category.includes('Electrician')).length;
  const plumbersCount = d.partners.filter(p => p.category.includes('Plumber')).length;

  // Real estate & auctions
  const totalPropertyListings = d.properties.length;
  const totalAuctionListings = d.auctions.length;
  const activeAuctions = d.auctions.filter(a => a.status === 'Active').length;

  // Calculators & PDFs
  const totalCalculatorUsers = d.users.reduce((acc, u) => acc + (u.calculatorUsage || 0), 0);
  const totalPdfPurchases = d.pdfPurchases.length;

  // Payments & Revenue
  const totalPlatformRevenue = d.payments
    .filter(p => p.status === 'Captured')
    .reduce((sum, p) => sum + (p.amount || 0), 0);
  const pdfRevenue = d.payments
    .filter(p => p.status === 'Captured' && p.purpose.includes('PDF'))
    .reduce((sum, p) => sum + (p.amount || 0), 0);
  const subscriptionRevenue = d.payments
    .filter(p => p.status === 'Captured' && p.purpose.includes('Subscription'))
    .reduce((sum, p) => sum + (p.amount || 0), 0);

  res.json({
    users: {
      total: totalUsers,
      active: activeUsers,
      inactive: inactiveUsers,
      realEstateUsers: totalRealEstateUsers
    },
    partners: {
      total: totalPartners,
      pendingApprovals: pendingPartnerApprovals,
      approved: approvedPartners,
      rejected: rejectedPartners,
      contractors: contractorsCount,
      painters: paintersCount,
      electricians: electriciansCount,
      plumbers: plumbersCount
    },
    realEstate: {
      totalProperties: totalPropertyListings,
      totalAuctions: totalAuctionListings,
      activeAuctions: activeAuctions
    },
    calculators: {
      totalUsage: totalCalculatorUsers,
      totalPdfPurchases: totalPdfPurchases,
      pdfRevenue: pdfRevenue
    },
    finance: {
      totalRevenue: totalPlatformRevenue,
      subscriptionRevenue: subscriptionRevenue,
      pdfRevenue: pdfRevenue,
      totalTransactions: d.payments.length
    },
    cloud: {
      region: 'ap-south-1 (Mumbai)',
      bucket: 'buildmitra-mumbai-storage',
      razorpayLiveId: key_id
    }
  });
});

// ==========================================
// 3. USER MANAGEMENT (Phase 3.B)
// ==========================================
app.get('/api/admin/users', (req, res) => {
  res.json(db.data.users);
});

app.put('/api/admin/users/:id/status', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const user = db.data.users.find(u => u.id === id);
  if (!user) return res.status(404).json({ error: 'User not found' });
  user.status = status;
  db.logAudit('USER_STATUS_CHANGE', 'ADMIN', `Updated user ${id} status to ${status}`);
  db.save();
  res.json({ success: true, user });
});

// ==========================================
// 4. PARTNER MANAGEMENT & KYC (Phase 3.C & Phase 4)
// ==========================================
app.get('/api/partners', (req, res) => {
  res.json(db.data.partners);
});

app.get('/api/admin/partner-categories', (req, res) => {
  res.json(db.data.partnerCategories);
});

app.post('/api/admin/partner-categories', (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: 'Category name required' });
  const newCat = {
    id: `cat-${Date.now()}`,
    name,
    count: 0,
    active: true
  };
  db.data.partnerCategories.push(newCat);
  db.logAudit('CREATE_CATEGORY', 'ADMIN', `Created category: ${name}`);
  db.save();
  res.status(201).json(newCat);
});

// Register Partner (Public onboarding)
app.post('/api/partners/register', async (req, res) => {
  const { name, businessName, phone, email, category, experienceYears, serviceLocations } = req.body;
  if (!name || !phone || !category) {
    return res.status(400).json({ error: 'Name, phone, and category are required' });
  }

  const partnerId = `PTR-${Date.now().toString().slice(-4)}`;
  const newPartner = {
    id: partnerId,
    userId: `USR-${partnerId}`,
    name,
    businessName: businessName || `${name} Services`,
    phone,
    email: email || `${phone.replace(/[^0-9]/g, '')}@buildmitra.user`,
    category,
    experienceYears: Number(experienceYears) || 1,
    serviceLocations: serviceLocations || ['Bengaluru', 'Hyderabad'],
    status: 'Pending Approval',
    rejectionReason: '',
    documents: [],
    subscriptionPlan: 'Basic Partner',
    subscriptionStatus: 'Trial',
    registeredAt: new Date().toISOString()
  };

  db.data.partners.unshift(newPartner);
  db.logAudit('PARTNER_REGISTRATION', phone, `Partner registered: ${name} (${category})`);
  db.save();

  res.status(201).json({ success: true, partner: newPartner });
});

// Admin Approval or Rejection
app.put('/api/admin/partners/:id/status', (req, res) => {
  const { id } = req.params;
  const { status, rejectionReason } = req.body;
  const partner = db.data.partners.find(p => p.id === id);
  if (!partner) return res.status(404).json({ error: 'Partner not found' });

  partner.status = status;
  if (rejectionReason) partner.rejectionReason = rejectionReason;
  db.logAudit('PARTNER_APPROVAL', 'ADMIN', `Partner ${id} status set to ${status}`);
  db.save();

  res.json({ success: true, partner });
});

// ==========================================
// 5. REVERSE AUCTION ENGINE (Phase 10)
// ==========================================
app.get('/api/auctions', (req, res) => {
  res.json(db.data.auctions);
});

app.post('/api/auctions', (req, res) => {
  const { title, material, quantity, city, startingPrice, reservePrice } = req.body;
  const newAuction = {
    id: `AUC-${Date.now().toString().slice(-4)}`,
    title: title || `${material} Procurement Lot`,
    material,
    quantity,
    city: city || 'Bengaluru',
    startingPrice,
    reservePrice,
    currentLowest: startingPrice,
    lowestBidder: 'Awaiting Primary Suppliers',
    status: 'Active',
    bidsCount: 0,
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date().toISOString()
  };
  db.data.auctions.unshift(newAuction);
  db.logAudit('CREATE_AUCTION', 'USER', `Created auction ${newAuction.id}`);
  db.save();
  res.status(201).json({ success: true, auction: newAuction });
});

app.post('/api/auctions/:id/bid', (req, res) => {
  const { id } = req.params;
  const { bidderName, bidderPhone, bidAmount } = req.body;
  const auction = db.data.auctions.find(a => a.id === id);
  if (!auction) return res.status(404).json({ error: 'Auction not found' });

  const newBid = {
    id: `BID-${Date.now().toString().slice(-4)}`,
    auctionId: id,
    bidderName: bidderName || 'Verified Supplier',
    bidderPhone: bidderPhone || '+91 99999 88888',
    bidAmount,
    status: 'Lowest',
    timestamp: new Date().toISOString()
  };

  auction.currentLowest = bidAmount;
  auction.lowestBidder = bidderName;
  auction.bidsCount += 1;

  db.data.auctionBids.unshift(newBid);
  db.logAudit('AUCTION_BID', bidderName, `Bid placed on ${id}: ${bidAmount}`);
  db.save();

  res.status(201).json({ success: true, bid: newBid, auction });
});

// ==========================================
// 6. CALCULATORS & PAID PDF REPORT GENERATION (Phase 7 & Phase 8)
// ==========================================
app.get('/api/calculators', (req, res) => {
  res.json(db.data.calculators);
});

app.put('/api/admin/calculators/:id', (req, res) => {
  const { id } = req.params;
  const { defaultRate, pdfPrice } = req.body;
  const calc = db.data.calculators.find(c => c.id === id);
  if (!calc) return res.status(404).json({ error: 'Calculator not found' });

  if (defaultRate !== undefined) calc.defaultRate = Number(defaultRate);
  if (pdfPrice !== undefined) calc.pdfPrice = Number(pdfPrice);

  db.logAudit('UPDATE_CALCULATOR_RATE', 'ADMIN', `Updated calculator ${id} defaultRate=${defaultRate}, pdfPrice=${pdfPrice}`);
  db.save();

  res.json({ success: true, calculator: calc });
});

// Step 1: Create ₹20 Razorpay Order for PDF Download
app.post('/api/calculators/pdf/order', async (req, res) => {
  try {
    const { calculatorId, calculatorName, userPhone } = req.body;
    const calc = db.data.calculators.find(c => c.id === calculatorId);
    const price = calc ? calc.pdfPrice : (db.data.systemSettings.pdfDefaultPrice || 20);

    const receipt = `pdf_${Date.now().toString().slice(-6)}`;
    const order = await createOrder(price, receipt, {
      calculatorId,
      calculatorName,
      userPhone: userPhone || 'Guest'
    });

    res.json({
      success: true,
      orderId: order.orderId,
      amount: order.amount,
      currency: order.currency,
      keyId: order.keyId,
      pdfPrice: price
    });
  } catch (err) {
    console.error('Error creating PDF Razorpay order:', err);
    res.status(500).json({ error: 'Failed to create payment order', details: err.message });
  }
});

// Step 2: Verify Razorpay Payment, Generate PDF, and Upload to S3
app.post('/api/calculators/pdf/verify-and-generate', async (req, res) => {
  try {
    const {
      razorpayOrderId,
      razorpayPaymentId,
      razorpaySignature,
      calculatorName,
      userPhone,
      areaSqFt,
      grade,
      ratePerSqFt,
      totalCost,
      breakdown,
      notes
    } = req.body;

    // Verify cryptographic signature
    const isValid = verifyPaymentSignature(razorpayOrderId, razorpayPaymentId, razorpaySignature);
    if (!isValid) {
      db.logAudit('PAYMENT_TAMPER_ALERT', userPhone, `Invalid signature for order ${razorpayOrderId}`);
      return res.status(400).json({ error: 'Invalid payment signature. Verification failed.' });
    }

    // 1. Record payment in DB
    const paymentRecord = {
      id: `PAY-${Date.now().toString().slice(-4)}`,
      orderId: razorpayOrderId,
      paymentId: razorpayPaymentId,
      userPhone: userPhone || 'Verified Client',
      amount: 20,
      currency: 'INR',
      purpose: `PDF Report: ${calculatorName || 'Estimation'}`,
      status: 'Captured',
      createdAt: new Date().toISOString()
    };
    db.data.payments.unshift(paymentRecord);

    // 2. Generate PDF Buffer
    const reportNo = `BM-EST-${Date.now().toString().slice(-6)}`;
    const pdfBuffer = await generateEstimationPdf({
      reportNo,
      calculatorName,
      userPhone,
      areaSqFt: Number(areaSqFt) || 1200,
      grade: grade || 'Standard',
      ratePerSqFt: Number(ratePerSqFt) || 1850,
      totalCost: Number(totalCost) || 2220000,
      breakdown: breakdown || [],
      notes: notes || []
    });

    // 3. Upload PDF directly to AWS S3 bucket
    let s3PdfUrl = '';
    try {
      const uploadResult = await uploadToS3(
        pdfBuffer,
        `${reportNo}.pdf`,
        'application/pdf',
        'reports'
      );
      s3PdfUrl = uploadResult.s3Url;
    } catch (s3Err) {
      console.warn('S3 upload warning (falling back to direct base64 stream):', s3Err.message);
      s3PdfUrl = `https://${process.env.AWS_S3_BUCKET || 'buildmitra-mumbai-storage'}.s3.${process.env.AWS_REGION || 'ap-south-1'}.amazonaws.com/reports/${reportNo}.pdf`;
    }

    // 4. Record PDF Report in DB
    const reportRecord = {
      id: `PDF-${Date.now().toString().slice(-4)}`,
      reportNo,
      userPhone: userPhone || 'Verified Client',
      calculatorName: calculatorName || 'Engineering Calculator',
      areaSqFt: Number(areaSqFt) || 1200,
      totalEstimate: `₹ ${Number(totalCost).toLocaleString('en-IN')}`,
      amountPaid: 20,
      paymentId: razorpayPaymentId,
      s3PdfUrl,
      createdAt: new Date().toISOString()
    };
    db.data.pdfPurchases.unshift(reportRecord);
    db.logAudit('PDF_GENERATED', userPhone, `Generated ${reportNo} paid with ${razorpayPaymentId}`);
    db.save();

    res.json({
      success: true,
      reportNo,
      downloadUrl: s3PdfUrl,
      pdfBase64: pdfBuffer.toString('base64'),
      message: 'Payment verified and PDF generated successfully!'
    });
  } catch (err) {
    console.error('Error generating PDF report:', err);
    res.status(500).json({ error: 'PDF generation failed', details: err.message });
  }
});

// ==========================================
// 7. AWS S3 MEDIA MANAGER (Phase 3.E & Phase 11)
// ==========================================
app.get('/api/media', (req, res) => {
  res.json(db.data.mediaAssets);
});

app.post('/api/media/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const folder = req.body.folder || 'media';
    const uploadResult = await uploadToS3(
      req.file.buffer,
      req.file.originalname,
      req.file.mimetype,
      folder
    );

    const newMedia = {
      id: `MED-${Date.now().toString().slice(-4)}`,
      originalName: req.file.originalname,
      s3Url: uploadResult.s3Url,
      s3Key: uploadResult.key,
      mimeType: req.file.mimetype,
      size: req.file.size,
      category: req.body.category || 'General',
      uploadedAt: new Date().toISOString()
    };

    db.data.mediaAssets.unshift(newMedia);
    db.logAudit('MEDIA_UPLOAD_S3', 'ADMIN', `Uploaded ${req.file.originalname} to ${uploadResult.key}`);
    db.save();

    res.status(201).json({ success: true, media: newMedia });
  } catch (err) {
    console.error('S3 Upload Error:', err);
    res.status(500).json({ error: 'Failed to upload file to AWS S3', details: err.message });
  }
});

app.delete('/api/media/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const mediaIndex = db.data.mediaAssets.findIndex(m => m.id === id);
    if (mediaIndex === -1) return res.status(404).json({ error: 'Media asset not found' });

    const media = db.data.mediaAssets[mediaIndex];
    if (media.s3Key) {
      await deleteFromS3(media.s3Key).catch(e => console.warn('S3 delete err:', e.message));
    }

    db.data.mediaAssets.splice(mediaIndex, 1);
    db.logAudit('MEDIA_DELETE_S3', 'ADMIN', `Deleted ${media.originalName}`);
    db.save();

    res.json({ success: true, message: 'Media asset deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete media asset', details: err.message });
  }
});

// ==========================================
// 8. DYNAMIC CMS MANAGEMENT (Phase 3.D & Phase 15)
// ==========================================
app.get('/api/cms', (req, res) => {
  res.json(db.data.cmsSections);
});

app.get('/api/cms/:sectionKey', (req, res) => {
  const section = db.data.cmsSections[req.params.sectionKey];
  if (!section) return res.status(404).json({ error: 'Section not found' });
  res.json(section);
});

app.put('/api/admin/cms/:sectionKey', (req, res) => {
  const { sectionKey } = req.params;
  db.data.cmsSections[sectionKey] = {
    ...db.data.cmsSections[sectionKey],
    ...req.body,
    updatedAt: new Date().toISOString()
  };

  db.logAudit('CMS_UPDATE', 'ADMIN', `Updated CMS section: ${sectionKey}`);
  db.save();

  res.json({ success: true, section: db.data.cmsSections[sectionKey] });
});

// ==========================================
// 9. COURSES & LEARNING MANAGEMENT (Phase 3.F)
// ==========================================
app.get('/api/courses', (req, res) => {
  res.json(db.data.courses);
});

app.post('/api/admin/courses', (req, res) => {
  const { title, category, price, isFree, description, lessonsCount, thumbnailUrl } = req.body;
  const newCourse = {
    id: `CRS-${Date.now().toString().slice(-4)}`,
    title,
    category: category || 'Civil Engineering',
    price: Number(price) || 0,
    isFree: Boolean(isFree),
    thumbnailUrl: thumbnailUrl || 'https://buildmitra-mumbai-storage.s3.ap-south-1.amazonaws.com/media/course_civil.jpg',
    description,
    lessonsCount: Number(lessonsCount) || 1,
    isPublished: true,
    enrollmentsCount: 0,
    createdAt: new Date().toISOString()
  };

  db.data.courses.unshift(newCourse);
  db.logAudit('COURSE_CREATE', 'ADMIN', `Created course: ${title}`);
  db.save();

  res.status(201).json({ success: true, course: newCourse });
});

app.delete('/api/admin/courses/:id', (req, res) => {
  const { id } = req.params;
  const idx = db.data.courses.findIndex(c => c.id === id);
  if (idx === -1) return res.status(404).json({ error: 'Course not found' });

  const course = db.data.courses[idx];
  db.data.courses.splice(idx, 1);
  db.logAudit('COURSE_DELETE', 'ADMIN', `Deleted course: ${course.title}`);
  db.save();

  res.json({ success: true, message: 'Course deleted successfully' });
});

// ==========================================
// 10. PAYMENTS, SUBSCRIPTIONS, PROPERTIES & AUDIT LOGS
// ==========================================
app.get('/api/admin/payments', (req, res) => {
  res.json(db.data.payments);
});

app.get('/api/subscriptions/plans', (req, res) => {
  res.json(db.data.subscriptionPlans);
});

app.get('/api/properties', (req, res) => {
  res.json(db.data.properties);
});

app.get('/api/products', (req, res) => {
  res.json(db.data.products || []);
});

app.get('/api/services', (req, res) => {
  res.json(db.data.services || []);
});

app.put('/api/admin/services/:id', (req, res) => {
  const { id } = req.params;
  const { rate, turnaround, activeProviders, priceStarting } = req.body;
  const srv = (db.data.services || []).find(s => s.id === id);
  if (!srv) {
    // If not found in simple services list, add it or update
    const newSrv = { id, name: req.body.name || id, rate, turnaround: turnaround || 'On-Demand', activeProviders: Number(activeProviders) || 20 };
    db.data.services.push(newSrv);
    db.logAudit('SERVICE_RATE_UPDATE', 'ADMIN', `Added/Updated service ${id} rate to ${rate}`);
    db.save();
    return res.json({ success: true, service: newSrv });
  }

  if (rate !== undefined) srv.rate = rate;
  if (turnaround !== undefined) srv.turnaround = turnaround;
  if (activeProviders !== undefined) srv.activeProviders = Number(activeProviders);
  if (priceStarting !== undefined) srv.priceStarting = Number(priceStarting);

  db.logAudit('SERVICE_RATE_UPDATE', 'ADMIN', `Updated service ${id} (${srv.name}) rate to ${rate}`);
  db.save();
  res.json({ success: true, service: srv });
});

app.get('/api/3d-models', (req, res) => {
  res.json(db.data.ai3DModels || []);
});

app.get('/api/pdf-purchases', (req, res) => {
  res.json(db.data.pdfPurchases || []);
});

app.get('/api/notifications', (req, res) => {
  res.json(db.data.notifications || []);
});

app.get('/api/support-requests', (req, res) => {
  res.json(db.data.supportRequests || []);
});

app.get('/api/admin-users', (req, res) => {
  res.json(db.data.adminUsers || []);
});

app.get('/api/admin/audit-logs', (req, res) => {
  res.json(db.data.auditLogs);
});

app.get('/api/admin/settings', (req, res) => {
  res.json(db.data.systemSettings);
});

// Start Server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`================================================================`);
  console.log(` BUILDMITRA MASTER PRODUCTION BACKEND ONLINE`);
  console.log(` Port: ${PORT}`);
  console.log(` AWS Region: ${process.env.AWS_REGION || 'ap-south-1'}`);
  console.log(` AWS S3 Bucket: ${process.env.AWS_S3_BUCKET || 'buildmitra-mumbai-storage'}`);
  console.log(` Razorpay Live Key: ${key_id}`);
  console.log(` Health: http://0.0.0.0:${PORT}/api/health`);
  console.log(`================================================================`);
});
