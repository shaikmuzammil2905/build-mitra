import React, { useState } from 'react';
import { HeroSection } from '../components/HeroSection';
import { CoreModules } from '../components/CoreModules';
import { LiveMaterialRates } from '../components/LiveMaterialRates';
import { LeadershipSection } from '../components/LeadershipSection';
import { EngineeringToolsGrid } from '../components/EngineeringToolsGrid';
import { WhyChooseUs } from '../components/WhyChooseUs';
import { PlatformModule } from '../data/modulesData';
import { EngineeringCalculator } from '../data/calculatorsData';
import { 
  ShieldCheck, 
  Truck, 
  Clock, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  Calculator, 
  TrendingDown, 
  Star, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp,
  Layers,
  Users,
  Building,
  FileCheck2,
  Award
} from 'lucide-react';

interface HomePageProps {
  onSearchSubmit: (q: string) => void;
  onOpenEnquiry: (topic?: string) => void;
  onQuickView: (module: PlatformModule) => void;
  onOpenCalculator: (calc: EngineeringCalculator) => void;
  onOpenBOQ: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onSearchSubmit,
  onOpenEnquiry,
  onQuickView,
  onOpenCalculator,
  onOpenBOQ
}) => {
  // Interactive Cost Estimator State
  const [builtUpArea, setBuiltUpArea] = useState<number>(2000);
  const [packageType, setPackageType] = useState<'Standard' | 'Premium' | 'Luxury'>('Premium');
  
  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const ratesPerSqft = {
    Standard: 1650,
    Premium: 1980,
    Luxury: 2550
  };

  const totalEstimate = builtUpArea * ratesPerSqft[packageType];
  const foundationCost = Math.round(totalEstimate * 0.15);
  const structureCost = Math.round(totalEstimate * 0.30);
  const masonryCost = Math.round(totalEstimate * 0.18);
  const finishesCost = Math.round(totalEstimate * 0.17);
  const mepCost = Math.round(totalEstimate * 0.20);

  const faqs = [
    {
      q: 'How does BuildMitra ensure the authenticity of cement and TMT steel?',
      a: 'All materials listed on BuildMitra are dispatched directly from primary manufacturer depots or authorized tier-1 stockists. Every shipment comes accompanied by a manufacturer test certificate (MTC) and passes random NABL-accredited third-party cube and tensile testing.'
    },
    {
      q: 'What is the BuildMitra Reverse Auction Engine and how does it save costs?',
      a: 'Instead of accepting fixed retail quotes, builders upload their Bill of Quantities (BOQ). Verified regional distributors and mill representatives place competing bids in real-time, driving landed prices down by an average of 12% to 18%.'
    },
    {
      q: 'Are workers and civil contractors on Labour Net verified?',
      a: 'Yes. Every tradesperson and contractor team undergoes physical Aadhaar KYC verification, skill assessment, past project reference checks, and police verification. Daily wages are benchmarked according to official Karnataka minimum wage standards.'
    },
    {
      q: 'How does the Milestone Escrow payment model protect homeowners?',
      a: 'Funds deposited by the client are held safely in a regulated escrow account. Disbursements to civil contractors or material suppliers are released only after our structural engineer conducts an on-site quality inspection and signs off on the completed stage.'
    },
    {
      q: 'Can I export a dynamic Bill of Quantities (BOQ) with live market rates?',
      a: 'Yes! Our Engineering Calculators allow you to input your building dimensions, automatically calculate materials compliant with IS 456, and generate an itemized, downloadable Excel or PDF BOQ with real-time Bengaluru yard prices.'
    },
    {
      q: 'What real estate services are offered under the Property Hub?',
      a: 'We provide satellite-based DIY land boundary measurement, BDA/BMRDA title due diligence checklists, and real-time guidance value vs. market value comparisons backed by Karnataka Kaveri 2.0 registered transaction benchmarks.'
    }
  ];

  return (
    <div className="space-y-0">
      
      {/* 01. Hero Section */}
      <HeroSection 
        onSearchSubmit={onSearchSubmit} 
        onOpenEnquiry={onOpenEnquiry} 
      />

      {/* 02. Upgraded Large Prominent Trust Bar (per image copy 5.png & image copy 13.png: icon on top, content below in mobile view) */}
      <div className="bg-white border-y border-slate-200/80 py-6 sm:py-8 shadow-sm relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-6">
            
            {/* Card 1: 100% Quality Tested */}
            <div className="bg-gradient-to-br from-emerald-50 via-white to-white p-4 sm:p-5 rounded-2xl border border-emerald-200/80 shadow-xs hover:shadow-md transition-all flex flex-col sm:flex-row items-center text-center sm:text-left gap-2.5 sm:gap-3.5 group">
              <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-sm group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <div className="text-sm sm:text-base font-extrabold text-slate-900 leading-snug">
                  100% Quality Tested
                </div>
                <div className="text-xs text-emerald-700 font-semibold mt-0.5">
                  NABL Lab Certified Stocks
                </div>
              </div>
            </div>

            {/* Card 2: Direct From Primary Mills */}
            <div className="bg-gradient-to-br from-blue-50 via-white to-white p-4 sm:p-5 rounded-2xl border border-blue-200/80 shadow-xs hover:shadow-md transition-all flex flex-col sm:flex-row items-center text-center sm:text-left gap-2.5 sm:gap-3.5 group">
              <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-sm group-hover:scale-110 transition-transform">
                <Truck className="w-6 h-6" />
              </div>
              <div>
                <div className="text-sm sm:text-base font-extrabold text-slate-900 leading-snug">
                  Direct From Primary Mills
                </div>
                <div className="text-xs text-blue-700 font-semibold mt-0.5">
                  No Multi-Tier Wholesalers
                </div>
              </div>
            </div>

            {/* Card 3: On-Time Site Delivery */}
            <div className="bg-gradient-to-br from-amber-50 via-white to-white p-4 sm:p-5 rounded-2xl border border-amber-200/80 shadow-xs hover:shadow-md transition-all flex flex-col sm:flex-row items-center text-center sm:text-left gap-2.5 sm:gap-3.5 group">
              <div className="w-12 h-12 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center shrink-0 shadow-sm group-hover:scale-110 transition-transform">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <div className="text-sm sm:text-base font-extrabold text-slate-900 leading-snug">
                  On-Time Site Delivery
                </div>
                <div className="text-xs text-amber-800 font-semibold mt-0.5">
                  Fleet GPS Real-Time Tracked
                </div>
              </div>
            </div>

            {/* Card 4: Milestone Escrow */}
            <div className="bg-gradient-to-br from-purple-50 via-white to-white p-4 sm:p-5 rounded-2xl border border-purple-200/80 shadow-xs hover:shadow-md transition-all flex flex-col sm:flex-row items-center text-center sm:text-left gap-2.5 sm:gap-3.5 group">
              <div className="w-12 h-12 rounded-xl bg-purple-600 text-white flex items-center justify-center shrink-0 shadow-sm group-hover:scale-110 transition-transform">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <div className="text-sm sm:text-base font-extrabold text-slate-900 leading-snug">
                  Milestone Escrow
                </div>
                <div className="text-xs text-purple-700 font-semibold mt-0.5">
                  100% Secure Fund Release
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* 03. 8 Core Solutions Grid */}
      <CoreModules onQuickView={onQuickView} />

      {/* 04. How BuildMitra Works (4-Step End-to-End Lifecycle) */}
      <section className="py-16 sm:py-20 bg-slate-100 border-y border-slate-200/80 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>Streamlined Digital Execution</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              How BuildMitra Powers Your Construction
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              From the initial architectural floor plan to final site handover, experience a transparent, zero-conflict digital construction workflow.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            
            {/* Step 1 */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 relative group flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center text-lg font-black shadow-md">
                  01
                </div>
                <h3 className="text-lg font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors">
                  Plan & BOQ Estimate
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Input your plot dimensions into our 19 IS Code engineering calculators or choose a Vastu-compliant 2D/3D floor plan to generate an instant, itemized Bill of Quantities.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-100 mt-6 flex items-center gap-1.5 text-xs font-bold text-blue-600">
                <CheckCircle2 className="w-4 h-4" /> Accurate IS 456 Standards
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 relative group flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center text-lg font-black shadow-md">
                  02
                </div>
                <h3 className="text-lg font-extrabold text-slate-900 group-hover:text-emerald-600 transition-colors">
                  Reverse Auction Sourcing
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Submit your BOQ to verified primary manufacturers and tier-1 stockists. Watch live competing bids drive your cement, steel, and sand costs down by 12% to 18%.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-100 mt-6 flex items-center gap-1.5 text-xs font-bold text-emerald-600">
                <CheckCircle2 className="w-4 h-4" /> Direct Mill Factory Invoicing
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 relative group flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center text-lg font-black shadow-md">
                  03
                </div>
                <h3 className="text-lg font-extrabold text-slate-900 group-hover:text-amber-600 transition-colors">
                  Verified Labour & Civil Team
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Deploy KYC-verified master masons, bar benders, shuttering teams, and turnkey civil contractors with transparent daily wages benchmarked against Karnataka state norms.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-100 mt-6 flex items-center gap-1.5 text-xs font-bold text-amber-700">
                <CheckCircle2 className="w-4 h-4" /> 100% Aadhaar KYC & Safety
              </div>
            </div>

            {/* Step 4 */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 relative group flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-purple-600 text-white flex items-center justify-center text-lg font-black shadow-md">
                  04
                </div>
                <h3 className="text-lg font-extrabold text-slate-900 group-hover:text-purple-600 transition-colors">
                  Milestone Escrow Handover
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Your payments remain securely held in escrow. Payouts are released incrementally only after our civil engineers conduct site quality audits and certify milestone completion.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-100 mt-6 flex items-center gap-1.5 text-xs font-bold text-purple-600">
                <CheckCircle2 className="w-4 h-4" /> Zero Financial Risk
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 05. Live Material Rates Section */}
      <LiveMaterialRates 
        onOpenAllRates={(city) => onOpenEnquiry(`View All Rates for ${city}`)}
        onRequestQuote={(material, city) => onOpenEnquiry(`Quotation for ${material} in ${city}`)}
      />

      {/* 06. Interactive Construction Cost Estimator */}
      <section className="py-16 sm:py-20 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-200">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider mb-2">
                <Calculator className="w-3.5 h-3.5" />
                <span>Real-Time Estimation Tool</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
                Quick Construction Cost Estimator
              </h2>
              <p className="text-sm text-slate-600 mt-1 max-w-2xl">
                Estimate the complete turnkey building cost for your residential or commercial project in Bengaluru based on updated 2024–2026 material and labor index.
              </p>
            </div>

            <button
              onClick={onOpenBOQ}
              className="bg-bm-navy hover:bg-slate-800 text-white font-bold text-xs sm:text-sm py-3 px-6 rounded-xl shadow-md transition-all active:scale-95 flex items-center gap-2 shrink-0 self-start md:self-auto"
            >
              <span>Explore Dynamic BOQ</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Input Controls */}
            <div className="lg:col-span-6 bg-slate-50 p-6 sm:p-8 rounded-3xl border border-slate-200/90 space-y-6">
              
              {/* Built-Up Area Slider */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-extrabold text-slate-900">
                    Total Built-Up Area (Sq.Ft)
                  </label>
                  <span className="text-lg font-black text-blue-600 bg-blue-50 px-3 py-1 rounded-xl border border-blue-200">
                    {builtUpArea.toLocaleString()} Sq.Ft
                  </span>
                </div>
                <input
                  type="range"
                  min="600"
                  max="10000"
                  step="100"
                  value={builtUpArea}
                  onChange={(e) => setBuiltUpArea(Number(e.target.value))}
                  className="w-full accent-blue-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
                />
                <div className="flex justify-between text-[11px] text-slate-400 font-mono">
                  <span>600 Sq.Ft (Compact)</span>
                  <span>4,000 Sq.Ft (Duplex Villa)</span>
                  <span>10,000 Sq.Ft (Apartment)</span>
                </div>
              </div>

              {/* Package Type Selection */}
              <div className="space-y-3">
                <label className="text-sm font-extrabold text-slate-900">
                  Specification & Quality Package
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {(['Standard', 'Premium', 'Luxury'] as const).map((pkg) => (
                    <button
                      key={pkg}
                      onClick={() => setPackageType(pkg)}
                      className={`p-3.5 rounded-2xl border text-center transition-all ${
                        packageType === pkg
                          ? 'bg-blue-600 text-white border-blue-600 shadow-md ring-2 ring-blue-200'
                          : 'bg-white text-slate-800 border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="text-xs font-black uppercase tracking-wider">{pkg}</div>
                      <div className="text-[11px] mt-1 opacity-90">₹{ratesPerSqft[pkg]}/sq.ft</div>
                    </button>
                  ))}
                </div>
                <p className="text-xs text-slate-500 leading-relaxed pt-1">
                  {packageType === 'Standard' && '• Standard: OPC 43/53 cement, Fe 500D steel, 6" concrete solid blocks, vitrified tiles, Anchor electricals.'}
                  {packageType === 'Premium' && '• Premium: UltraTech/ACC cement, Fe 550D Tata/JSW steel, Red wire-cut bricks, teak wood joinery, Jaguar plumbing.'}
                  {packageType === 'Luxury' && '• Luxury: Italian marble/granite flooring, automated lighting, double-glazed UPVC, Kohler sanitary, complete interior package.'}
                </p>
              </div>

            </div>

            {/* Output Summary Card */}
            <div className="lg:col-span-6 bg-gradient-to-br from-bm-navy via-slate-900 to-blue-950 text-white p-6 sm:p-8 rounded-3xl shadow-xl border border-slate-800 space-y-6">
              
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-amber-400">
                  Turnkey Construction Budget
                </div>
                <div className="text-3xl sm:text-5xl font-black text-white mt-1">
                  ₹ {(totalEstimate / 100000).toFixed(2)} <span className="text-xl sm:text-2xl font-bold text-slate-300">Lakhs</span>
                </div>
                <div className="text-xs text-slate-400 mt-1">
                  Estimated at ₹{ratesPerSqft[packageType]} per Sq.Ft for {builtUpArea.toLocaleString()} Sq.Ft built-up structure.
                </div>
              </div>

              {/* Stage-wise Breakdown */}
              <div className="space-y-3 pt-4 border-t border-white/10">
                <div className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Stage-Wise Disbursement Allocation
                </div>
                
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between items-center bg-white/5 p-2 rounded-xl">
                    <span className="text-slate-300">Foundation & Substructure (15%)</span>
                    <span className="font-mono font-bold text-white">₹ {(foundationCost / 100000).toFixed(2)} Lakhs</span>
                  </div>
                  <div className="flex justify-between items-center bg-white/5 p-2 rounded-xl">
                    <span className="text-slate-300">RCC Superstructure & Slab (30%)</span>
                    <span className="font-mono font-bold text-white">₹ {(structureCost / 100000).toFixed(2)} Lakhs</span>
                  </div>
                  <div className="flex justify-between items-center bg-white/5 p-2 rounded-xl">
                    <span className="text-slate-300">Brick Masonry & Plastering (18%)</span>
                    <span className="font-mono font-bold text-white">₹ {(masonryCost / 100000).toFixed(2)} Lakhs</span>
                  </div>
                  <div className="flex justify-between items-center bg-white/5 p-2 rounded-xl">
                    <span className="text-slate-300">Flooring, Doors & Windows (17%)</span>
                    <span className="font-mono font-bold text-white">₹ {(finishesCost / 100000).toFixed(2)} Lakhs</span>
                  </div>
                  <div className="flex justify-between items-center bg-white/5 p-2 rounded-xl">
                    <span className="text-slate-300">Plumbing, Electrical & Painting (20%)</span>
                    <span className="font-mono font-bold text-white">₹ {(mepCost / 100000).toFixed(2)} Lakhs</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => onOpenEnquiry(`Construction estimate inquiry for ${builtUpArea} sqft ${packageType} package (₹${(totalEstimate/100000).toFixed(2)} Lakhs)`)}
                className="w-full bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs sm:text-sm py-3.5 px-6 rounded-xl shadow-md transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                <span>Request Detailed Engineering BOQ</span>
                <ArrowRight className="w-4 h-4" />
              </button>

            </div>

          </div>

        </div>
      </section>

      {/* 07. 31+ Years Leadership Heritage */}
      <LeadershipSection />

      {/* 08. Powerful Engineering Tools & Calculators Grid */}
      <EngineeringToolsGrid 
        onOpenCalculator={onOpenCalculator}
        onOpenBOQ={onOpenBOQ}
      />

      {/* 09. Why Choose BuildMitra */}
      <WhyChooseUs 
        onSelectFeature={(title) => onOpenEnquiry(`Inquiry about ${title}`)}
      />

      {/* 10. Verified Client Case Studies & Projects */}
      <section className="py-16 sm:py-20 bg-slate-50 border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold uppercase tracking-wider">
              <Award className="w-3.5 h-3.5 text-emerald-600" />
              <span>Proven Bengaluru Track Record</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Featured Client Projects & Case Studies
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              Real projects delivered across Bengaluru with verified procurement savings and on-time structural handovers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Case 1 */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-xl transition-all space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
                    Whitefield, Bengaluru
                  </span>
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                </div>
                <h3 className="text-base font-extrabold text-slate-900">
                  4BHK Contemporary Villa (3,600 Sq.Ft)
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  "Saved ₹4.8 Lakhs on primary TMT steel and UltraTech cement through BuildMitra's Reverse Auction engine. The milestone escrow gave us complete peace of mind throughout foundation and slab casting."
                </p>
              </div>
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <div>
                  <div className="font-extrabold text-slate-900">Rajesh & Priya Nair</div>
                  <div className="text-[11px] text-slate-400">Homeowners • Turnkey Delivery</div>
                </div>
                <div className="text-right font-mono font-bold text-emerald-600">
                  ₹ 4.8L Saved
                </div>
              </div>
            </div>

            {/* Case 2 */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-xl transition-all space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full">
                    Kanakapura Road
                  </span>
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                </div>
                <h3 className="text-base font-extrabold text-slate-900">
                  Commercial G+3 Complex (8,400 Sq.Ft)
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  "Hired our entire 14-member bar bending and RCC slab casting gang via Labour Net. Zero absenteeism, strict safety gear compliance, and completed the structural frame 40 days ahead of schedule."
                </p>
              </div>
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <div>
                  <div className="font-extrabold text-slate-900">K. V. Subrahmanyam</div>
                  <div className="text-[11px] text-slate-400">Managing Director • Apex Builders</div>
                </div>
                <div className="text-right font-mono font-bold text-blue-600">
                  40 Days Saved
                </div>
              </div>
            </div>

            {/* Case 3 */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-xl transition-all space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-purple-600 bg-purple-50 px-2.5 py-1 rounded-full">
                    Anjanapura BDA Layout
                  </span>
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                </div>
                <h3 className="text-base font-extrabold text-slate-900">
                  3BHK Duplex Residence (2,400 Sq.Ft)
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  "Used the 30x40 Pragathi floor plan from the 2D/3D studio. The material quantity schedules matched within 3% of our actual site consumption. No material wastage or surprise billing."
                </p>
              </div>
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <div>
                  <div className="font-extrabold text-slate-900">Dr. Anand Murthy</div>
                  <div className="text-[11px] text-slate-400">Independent Home Builder</div>
                </div>
                <div className="text-right font-mono font-bold text-purple-600">
                  97% Accuracy
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 11. Frequently Asked Questions (FAQ Accordion) */}
      <section className="py-16 sm:py-20 bg-white border-t border-slate-200/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold uppercase tracking-wider">
              <HelpCircle className="w-3.5 h-3.5 text-blue-600" />
              <span>Clear Answers</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-sm text-slate-600">
              Everything you need to know about material procurement, engineering calculations, and escrow guarantees.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div 
                  key={index}
                  className="rounded-2xl border border-slate-200 bg-slate-50/60 overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-extrabold text-sm sm:text-base text-slate-900 hover:text-blue-600 transition-colors"
                  >
                    <span>{faq.q}</span>
                    <div className="w-8 h-8 rounded-xl bg-white border border-slate-200 flex items-center justify-center shrink-0">
                      {isOpen ? <ChevronUp className="w-4 h-4 text-blue-600" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                    </div>
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-200/60 bg-white">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

    </div>
  );
};
