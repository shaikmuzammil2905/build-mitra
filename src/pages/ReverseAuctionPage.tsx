import React, { useState } from 'react';
import { 
  Truck, 
  Upload, 
  CheckCircle2, 
  Clock, 
  TrendingDown, 
  ShieldCheck, 
  ArrowRight,
  Gavel,
  FileSpreadsheet,
  AlertCircle
} from 'lucide-react';

interface ReverseAuctionPageProps {
  onOpenEnquiry: (topic?: string) => void;
}

export const ReverseAuctionPage: React.FC<ReverseAuctionPageProps> = ({ onOpenEnquiry }) => {
  const [activeTab, setActiveTab] = useState<'buyer' | 'supplier'>('buyer');
  const [rfqMaterial, setRfqMaterial] = useState('TMT Steel Fe 550D (Primary)');
  const [rfqQuantity, setRfqQuantity] = useState('25 Metric Tons');
  const [rfqCity, setRfqCity] = useState('Bengaluru');
  const [rfqCreated, setRfqCreated] = useState(false);

  // Simulated live auction comparison table
  const simulatedBids = [
    { rank: '#1', supplier: 'JSW Steel Authorized Primary Stockyard', bidRate: '₹ 61.20 / Kg', landedTotal: '₹ 15,30,000', delta: '-4.8%', status: 'Lowest Landed Price', verified: true },
    { rank: '#2', supplier: 'Tata Tiscon Regional Depot Hub', bidRate: '₹ 62.10 / Kg', landedTotal: '₹ 15,52,500', delta: '-3.2%', status: 'NABL Certified', verified: true },
    { rank: '#3', supplier: 'Jindal Panther Prime Distributor', bidRate: '₹ 62.80 / Kg', landedTotal: '₹ 15,70,000', delta: '-2.1%', status: 'Next Day Delivery', verified: true },
  ];

  const handleCreateRFQ = (e: React.FormEvent) => {
    e.preventDefault();
    setRfqCreated(true);
  };

  return (
    <div className="pt-16 sm:pt-20 pb-20 bg-slate-50 min-h-screen">
      
      {/* DESKTOP ONLY Page Header - REMOVED ON MOBILE per image copy 8.png */}
      <div className="hidden md:block bg-bm-navy text-white py-12 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold uppercase tracking-wider">
              <Gavel className="w-3.5 h-3.5" />
              <span>Module 02 • Competitive Procurement Architecture</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Reverse Auction Engine
            </h1>
            <p className="text-sm text-slate-300 leading-relaxed">
              Upload your Bill of Quantities (BOQ) and let verified primary manufacturers and tier-1 stockyards compete for your purchase order. Transparent lowest-landed price comparison with secure milestone escrow.
            </p>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 space-y-6">
        
        {/* Mode Selector */}
        <div className="bg-white rounded-2xl p-1.5 shadow-sm border border-slate-200/90 max-w-md mx-auto flex items-center">
          <button
            onClick={() => setActiveTab('buyer')}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all text-center ${
              activeTab === 'buyer' 
                ? 'bg-blue-600 text-white shadow-xs' 
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Buyer: Create RFQ / BOQ
          </button>
          <button
            onClick={() => setActiveTab('supplier')}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all text-center ${
              activeTab === 'supplier' 
                ? 'bg-blue-600 text-white shadow-xs' 
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Supplier: Join Bidding Portal
          </button>
        </div>

        {/* Live Reverse Auction Simulator & RFQ Submission */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          
          {/* Left Form: Create RFQ / Upload BOQ */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-5 sm:p-8 shadow-xs border border-slate-200/90 space-y-5">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-600">
                Step 1 of 3
              </span>
              <h3 className="text-xl font-extrabold text-bm-navy">
                Post Material Requirement (RFQ)
              </h3>
              <p className="text-xs text-slate-500">
                Submit quantities to invite pre-qualified suppliers for a 2-hour competitive reverse auction.
              </p>
            </div>

            {rfqCreated ? (
              <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-200 text-center space-y-3 animate-fade-in">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h4 className="font-extrabold text-slate-900 text-base">RFQ Successfully Broadcasted!</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Your tender for <strong>{rfqQuantity}</strong> of <strong>{rfqMaterial}</strong> in <strong>{rfqCity}</strong> is live. Pre-qualified primary mills will submit descending sealed bids.
                </p>
                <button
                  onClick={() => onOpenEnquiry('Connect with Reverse Auction Manager')}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-md transition-all"
                >
                  Manage Live Auction Room
                </button>
              </div>
            ) : (
              <form onSubmit={handleCreateRFQ} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Select Material Category
                  </label>
                  <select
                    value={rfqMaterial}
                    onChange={(e) => setRfqMaterial(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm font-medium focus:outline-none focus:border-blue-500 bg-white"
                  >
                    <option value="TMT Steel Fe 550D (Primary)">TMT Steel Fe 550D (Primary Billets)</option>
                    <option value="OPC 53 Grade Cement">OPC 53 Grade Cement (Bulk Sacks)</option>
                    <option value="VSI Washed M-Sand">VSI Washed M-Sand (10-Ton Tippers)</option>
                    <option value="Red Clay Wirecut Bricks">Red Clay Wirecut Bricks (Bulk Kiln)</option>
                    <option value="AAC Light Weight Blocks">AAC Light Weight Blocks (600x200x150mm)</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Required Quantity
                    </label>
                    <input
                      type="text"
                      value={rfqQuantity}
                      onChange={(e) => setRfqQuantity(e.target.value)}
                      placeholder="e.g. 500 Bags / 20 MT"
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm font-semibold focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Delivery City
                    </label>
                    <select
                      value={rfqCity}
                      onChange={(e) => setRfqCity(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm font-medium focus:outline-none focus:border-blue-500 bg-white"
                    >
                      <option value="Bengaluru">Bengaluru</option>
                      <option value="Hyderabad">Hyderabad</option>
                      <option value="Chennai">Chennai</option>
                      <option value="Mumbai">Mumbai</option>
                      <option value="Pune">Pune</option>
                    </select>
                  </div>
                </div>

                {/* Upload BOQ Spreadsheet Box */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Or Upload Project BOQ (Excel / PDF)
                  </label>
                  <div className="border-2 border-dashed border-slate-300 hover:border-blue-500 rounded-2xl p-4 text-center cursor-pointer transition-colors bg-slate-50">
                    <Upload className="w-6 h-6 text-slate-400 mx-auto mb-1" />
                    <span className="text-xs font-bold text-blue-600">Click to upload BOQ spreadsheet</span>
                    <p className="text-[11px] text-slate-400 mt-0.5">Supports .xlsx, .csv, .pdf up to 25MB</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-[11px] text-slate-500 bg-amber-50/60 p-2.5 rounded-xl border border-amber-200/60">
                  <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>Only pre-audited NABL verified manufacturers are eligible to place bids.</span>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold text-sm py-3 rounded-xl shadow-md transition-all active:scale-95 flex items-center justify-center gap-2"
                >
                  <Gavel className="w-4 h-4" />
                  <span>Launch 2-Hour Reverse Auction</span>
                </button>
              </form>
            )}

          </div>

          {/* Right Interface: Live Reverse Auction Room Simulation */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-5 sm:p-8 shadow-xs border border-slate-200/90 space-y-5">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200">
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span>Active Auction Session (Live Demo)</span>
                </div>
                <h3 className="text-base sm:text-lg font-extrabold text-bm-navy mt-0.5">
                  RFQ-BM-2026-9481 • Fe 550D TMT Steel (25 MT)
                </h3>
              </div>

              <div className="flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-xl font-mono text-xs font-bold text-slate-700">
                <Clock className="w-4 h-4 text-amber-500" />
                <span>Timer: 01h 14m remaining</span>
              </div>
            </div>

            <div className="flex items-start gap-2 bg-blue-50/70 p-3 rounded-xl border border-blue-200/60 text-xs text-blue-900 leading-snug">
              <AlertCircle className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <span>
                <strong>Transparent Landed Cost Architecture:</strong> Suppliers submit bids that automatically calculate factory base price + distance-calibrated freight + GST, guaranteeing the true lowest landed cost at your site gate.
              </span>
            </div>

            {/* Bids Table */}
            <div className="space-y-2.5">
              {simulatedBids.map((b, idx) => (
                <div 
                  key={idx}
                  className={`p-3.5 sm:p-4 rounded-2xl border transition-all ${
                    idx === 0 
                      ? 'bg-gradient-to-r from-emerald-50/50 to-white border-emerald-300 shadow-xs' 
                      : 'bg-white border-slate-200'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <span className={`w-8 h-8 rounded-xl font-mono font-bold text-xs flex items-center justify-center shrink-0 ${
                        idx === 0 ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-700'
                      }`}>
                        {b.rank}
                      </span>
                      <div>
                        <div className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-1.5">
                          <span>{b.supplier}</span>
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                        </div>
                        <div className="text-[11px] text-slate-500">{b.status}</div>
                      </div>
                    </div>

                    <div className="text-left sm:text-right">
                      <div className="text-sm sm:text-base font-extrabold text-slate-900">{b.bidRate}</div>
                      <div className="text-[11px] text-slate-500 font-mono">Landed: {b.landedTotal} ({b.delta})</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Auction Action Buttons */}
            <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-xs text-slate-500">
                Buyer savings on this tender: <strong className="text-emerald-600 font-bold">₹ 78,500 (4.8% below retail yard)</strong>
              </div>

              <button
                onClick={() => onOpenEnquiry('Accept Lowest Landed Bid for Steel')}
                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-xs transition-all flex items-center justify-center gap-2"
              >
                <span>Accept Lowest Landed Bid</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
