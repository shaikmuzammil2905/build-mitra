const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for all incoming requests (Vercel frontend + local dev)
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// 1. Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'Online',
    service: 'BuildMitra Backend API',
    cloud: 'AWS EC2 (Mumbai ap-south-1)',
    timestamp: new Date().toISOString()
  });
});

// 2. Services endpoint
app.get('/api/services', (req, res) => {
  res.json([
    { id: 'srv-1', name: 'Turnkey Construction', rate: '₹1,850/sq.ft', category: 'Construction' },
    { id: 'srv-2', name: 'Interior Painting', rate: '₹14/sq.ft', category: 'Finishing' },
    { id: 'srv-3', name: 'Structural Civil Engineering', rate: 'IS 456 Verified', category: 'Engineering' }
  ]);
});

// 3. Reverse Auction Bidding
let activeBids = [
  { id: 'BID-101', material: 'Fe 550D TMT Steel', quantity: '25 Metric Tons', currentLowest: '₹51,200/MT', status: 'Live Bidding' },
  { id: 'BID-102', material: 'OPC 53 Grade Cement', quantity: '800 Bags', currentLowest: '₹345/Bag', status: 'Live Bidding' }
];

app.get('/api/auction/bids', (req, res) => {
  res.json(activeBids);
});

app.post('/api/auction/bid', (req, res) => {
  const { material, quantity, offeredPrice, bidderName } = req.body;
  if (!material || !offeredPrice) {
    return res.status(400).json({ error: 'Material and offeredPrice are required' });
  }
  const newBid = {
    id: `BID-${Date.now().toString().slice(-4)}`,
    material,
    quantity: quantity || 'Standard Lot',
    currentLowest: offeredPrice,
    bidderName: bidderName || 'Verified Supplier',
    status: 'Live Bidding',
    timestamp: new Date().toISOString()
  };
  activeBids.unshift(newBid);
  res.status(201).json({ success: true, bid: newBid });
});

// 4. Booking & Enquiries
const bookings = [];
app.post('/api/bookings', (req, res) => {
  const { serviceName, customerName, phone, city } = req.body;
  const booking = {
    id: `BK-${Date.now().toString().slice(-5)}`,
    serviceName,
    customerName,
    phone,
    city: city || 'Hyderabad',
    status: 'Request Placed',
    createdAt: new Date().toISOString()
  };
  bookings.push(booking);
  res.status(201).json({ success: true, booking });
});

app.get('/api/bookings', (req, res) => {
  res.json(bookings);
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`===============================================`);
  console.log(` BuildMitra Backend Server Running on Port ${PORT}`);
  console.log(` Health check: http://0.0.0.0:${PORT}/api/health`);
  console.log(`===============================================`);
});
