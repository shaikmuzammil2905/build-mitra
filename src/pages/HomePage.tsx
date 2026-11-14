import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { HeroSection } from '../components/HeroSection';
import { LiveMaterialRates } from '../components/LiveMaterialRates';
import { CoreModules } from '../components/CoreModules';
import { EngineeringToolsGrid } from '../components/EngineeringToolsGrid';
import { WhyChooseUs } from '../components/WhyChooseUs';
import { LeadershipSection } from '../components/LeadershipSection';
import { CalculatorModal } from '../components/CalculatorModal';
import { QuickViewModal } from '../components/QuickViewModal';
import { EnquiryModal } from '../components/EnquiryModal';
import { EngineeringCalculator } from '../data/calculatorsData';
import { PlatformModule } from '../data/modulesData';
import { 
  Paintbrush, 
  Building2, 
  Wrench, 
  Sparkles, 
  Droplets, 
  Zap, 
  Hammer, 
  MoreHorizontal, 
  Clock, 
  Star, 
  Building, 
  Calculator, 
  ChevronRight, 
  Layers
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { categories, bookings, providers, selectedCity, setAuthModalOpen, setAuthStep } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  // Modals state for interactive sections
  const [activeCalculator, setActiveCalculator] = useState<EngineeringCalculator | null>(null);
  const [quickViewModule, setQuickViewModule] = useState<PlatformModule | null>(null);
  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);
  const [enquiryTopic, setEnquiryTopic] = useState('General Consultation');

  const getCategoryIcon = (id: string) => {
    switch (id) {
      case 'painting': return <Paintbrush className="w-6 h-6 text-blue-600" />;
      case 'construction': return <Building2 className="w-6 h-6 text-amber-600" />;
      case 'repairs': return <Wrench className="w-6 h-6 text-emerald-600" />;
      case 'cleaning': return <Sparkles className="w-6 h-6 text-purple-600" />;
      case 'plumbing': return <Droplets className="w-6 h-6 text-cyan-600" />;
      case 'electrical': return <Zap className="w-6 h-6 text-yellow-500" />;
      case 'carpentry': return <Hammer className="w-6 h-6 text-rose-600" />;
      default: return <MoreHorizontal className="w-6 h-6 text-slate-600" />;
    }
  };

  const getCategoryColor = (id: string) => {
    switch (id) {
      case 'painting': return 'bg-blue-50 border-blue-200/80 group-hover:bg-blue-100/80';
      case 'construction': return 'bg-amber-50 border-amber-200/80 group-hover:bg-amber-100/80';
      case 'repairs': return 'bg-emerald-50 border-emerald-200/80 group-hover:bg-emerald-100/80';
      case 'cleaning': return 'bg-purple-50 border-purple-200/80 group-hover:bg-purple-100/80';
      case 'plumbing': return 'bg-cyan-50 border-cyan-200/80 group-hover:bg-cyan-100/80';
      case 'electrical': return 'bg-yellow-50 border-yellow-200/80 group-hover:bg-yellow-100/80';
      case 'carpentry': return 'bg-rose-50 border-rose-200/80 group-hover:bg-rose-100/80';
      default: return 'bg-slate-50 border-slate-200 group-hover:bg-slate-100';
    }
  };

  const activeJob = bookings.find(b => b.status === 'In Progress' || b.status === 'On the Way' || b.status === 'Request Placed' || b.status === 'Provider Accepted');

  const filteredCategories = categories.filter(c => {
    if (searchQuery.trim() === '') return true;
    const q = searchQuery.toLowerCase();
    return c.name.toLowerCase().includes(q) || c.subServices.some(s => s.name.toLowerCase().includes(q));
  });

  return (
    <div className="pb-28">
      {/* SECTION 1: ARCHITECTURAL HERO SECTION */}
      <HeroSection 
        onSearchSubmit={(q) => setSearchQuery(q)}
        onOpenEnquiry={(topic) => {
          setEnquiryTopic(topic || 'General Consultation');
          setEnquiryModalOpen(true);
        }}
      />

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 space-y-12 mt-6">

        {/* SECTION 2: ACTIVE BOOKING STATUS STRIP (if user has active request) */}
        {activeJob && (
          <div 
            onClick={() => navigate(`/booking/${activeJob.id}`)}
            className="bg-gradient-to-r from-blue-900 via-slate-900 to-indigo-950 text-white p-4 rounded-3xl shadow-md border border-blue-800 flex items-center justify-between gap-3 cursor-pointer hover:shadow-lg transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-white/10 flex items-center justify-center shrink-0 border border-white/20">
                <Clock className="w-5 h-5 text-amber-400 animate-spin" style={{ animationDuration: '8s' }} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-xs text-amber-400">#{activeJob.id}</span>
                  <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-extrabold px-2 py-0.5 rounded-full border border-emerald-400/30">
                    {activeJob.status}
                  </span>
                </div>
                <div className="font-extrabold text-sm text-white mt-0.5">
                  {activeJob.serviceName}
                </div>
                <div className="text-[11px] text-slate-300">
                  Assigned: {activeJob.provider?.name || 'Verified Specialist'} • Tap to track live
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1 text-xs font-bold text-amber-400 group-hover:translate-x-1 transition-transform shrink-0">
              <span>Track</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>
        )}

        {/* SECTION 3: EXPLORE 8 VERIFIED SERVICES */}
        <div>
          <div className="flex items-center justify-between mb-4 px-1">
            <div>
              <h2 className="text-lg sm:text-2xl font-black text-slate-900">Explore Services</h2>
              <p className="text-xs sm:text-sm text-slate-500">Select a category to view verified services and upfront pricing</p>
            </div>
            <Link
              to="/services"
              className="text-xs sm:text-sm font-bold text-blue-600 hover:text-blue-700 flex items-center gap-0.5"
            >
              <span>View All</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-4 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4">
            {filteredCategories.map((cat) => (
              <Link
                key={cat.id}
                to={`/services/${cat.id}`}
                className="group flex flex-col items-center text-center p-3 sm:p-4 rounded-2xl bg-white border border-slate-100 shadow-2xs hover:shadow-md hover:border-blue-300 transition-all"
              >
                <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center border mb-2 transition-transform duration-300 group-hover:scale-110 ${getCategoryColor(cat.id)}`}>
                  {getCategoryIcon(cat.id)}
                </div>
                <span className="text-[11px] sm:text-xs font-bold text-slate-800 group-hover:text-blue-600 transition-colors line-clamp-1">
                  {cat.name}
                </span>
                <span className="text-[9px] text-slate-400 mt-0.5 hidden sm:block">
                  {cat.subServices.length} options
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* SECTION 4: DIGITAL ECOSYSTEM MODULE CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* Real Estate Module Card */}
          <Link 
            to="/real-estate"
            className="group bg-gradient-to-br from-indigo-900 via-blue-900 to-slate-900 text-white rounded-3xl p-5 shadow-sm hover:shadow-md border border-indigo-800 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center text-amber-300 mb-3 border border-white/20 group-hover:scale-110 transition-transform">
                <Building className="w-5 h-5" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white">Real Estate Marketplace</h3>
              <p className="text-xs sm:text-sm text-blue-200 mt-1 leading-relaxed">
                Buy, rent, and sell verified apartments, luxury villas, and commercial plots with zero brokerage.
              </p>
            </div>
            <div className="flex items-center gap-1 text-xs sm:text-sm font-bold text-amber-300 mt-4 group-hover:translate-x-1 transition-transform">
              <span>Browse Listings</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </Link>

          {/* 3D House Designs Card */}
          <Link 
            to="/3d-designs"
            className="group bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-900 text-white rounded-3xl p-5 shadow-sm hover:shadow-md border border-slate-800 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center text-emerald-400 mb-3 border border-white/20 group-hover:scale-110 transition-transform">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white">3D House & Villa Designs</h3>
              <p className="text-xs sm:text-sm text-blue-200 mt-1 leading-relaxed">
                Interactive 3D exterior and interior house designs, Vastu-compliant blueprints, and instant turnkey quotes.
              </p>
            </div>
            <div className="flex items-center gap-1 text-xs sm:text-sm font-bold text-emerald-400 mt-4 group-hover:translate-x-1 transition-transform">
              <span>Inspect 3D Models</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </Link>

          {/* Construction Cost Calculator Card */}
          <Link 
            to="/calculator"
            className="group bg-gradient-to-br from-blue-950 via-slate-900 to-blue-900 text-white rounded-3xl p-5 shadow-sm hover:shadow-md border border-blue-900 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center text-yellow-400 mb-3 border border-white/20 group-hover:scale-110 transition-transform">
                <Calculator className="w-5 h-5" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white">Construction Cost Calculator</h3>
              <p className="text-xs sm:text-sm text-blue-200 mt-1 leading-relaxed">
                Input area in sq.ft and material grades to calculate exact cement, steel, sand, and labour cost estimates.
              </p>
            </div>
            <div className="flex items-center gap-1 text-xs sm:text-sm font-bold text-yellow-400 mt-4 group-hover:translate-x-1 transition-transform">
              <span>Calculate Cost</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </Link>

        </div>

      </div>

      {/* SECTION 5: LIVE MATERIAL RATES & MARKET PRICING */}
      <div className="mt-12">
        <LiveMaterialRates 
          onOpenAllRates={(city) => {
            navigate('/materials');
          }}
          onRequestQuote={(material, city) => {
            setEnquiryTopic(`Material Bulk Quotation: ${material} in ${city}`);
            setEnquiryModalOpen(true);
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 space-y-12 mt-12">

        {/* SECTION 6: NEARBY VERIFIED SERVICE PROVIDERS */}
        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-100 shadow-2xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-xl font-black text-slate-900">Top-Rated Nearby Providers</h2>
                <span className="text-[10px] font-bold bg-emerald-50 text-emerald-700 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  GPS Live
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-500">Instant matching based on real-time location in {selectedCity}</p>
            </div>
            <Link
              to="/nearby-providers"
              className="text-xs sm:text-sm font-bold text-blue-600 hover:text-blue-700 flex items-center gap-0.5"
            >
              <span>Open Map</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {providers.slice(0, 4).map((p) => (
              <div 
                key={p.id}
                className="p-3.5 rounded-2xl bg-slate-50/70 border border-slate-100 hover:border-blue-200 transition-all flex flex-col justify-between"
              >
                <div className="flex items-center gap-3 mb-2.5">
                  <img 
                    src={p.avatar} 
                    alt={p.name} 
                    className="w-11 h-11 rounded-full object-cover border-2 border-blue-500 shrink-0" 
                  />
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900">{p.name}</h4>
                    <div className="text-[11px] text-slate-500">{p.specialization}</div>
                    <div className="flex items-center gap-1 text-[11px] font-bold text-amber-600 mt-0.5">
                      <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                      <span>{p.rating} ({p.reviewsCount} reviews)</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-200/60 text-xs">
                  <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                    {p.distanceKm} km away • {p.etaMinutes} mins
                  </span>
                  <Link
                    to={`/services/${p.serviceCategory}`}
                    className="text-xs font-bold text-blue-600 hover:text-blue-700"
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* SECTION 7: CORE PLATFORM MODULES (8 Core Solutions) */}
      <div className="mt-12">
        <CoreModules 
          onQuickView={(mod) => setQuickViewModule(mod)}
        />
      </div>

      {/* SECTION 8: SMART ENGINEERING CALCULATORS */}
      <div className="mt-8">
        <EngineeringToolsGrid 
          onOpenCalculator={(calc) => setActiveCalculator(calc)}
          onOpenBOQ={() => navigate('/calculator')}
        />
      </div>

      {/* SECTION 9: WHY CHOOSE BUILDMITRA / TRUST & SECURITY */}
      <div className="mt-8">
        <WhyChooseUs 
          onSelectFeature={(title, desc) => {
            setEnquiryTopic(`Feature Query: ${title}`);
            setEnquiryModalOpen(true);
          }}
        />
      </div>

      {/* SECTION 10: LEADERSHIP HERITAGE & CIVIL ENGINEERING PEDIGREE */}
      <div className="mt-8">
        <LeadershipSection />
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 mt-12">
        {/* SECTION 11: PARTNER ONBOARDING & ENROLLMENT DRIVE */}
        <div className="bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 text-slate-950 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-wider bg-black/10 px-2.5 py-0.5 rounded-full inline-block mb-1.5">
              Partner Recruitment Drive
            </span>
            <h3 className="text-lg sm:text-2xl font-black">
              Are You a Skilled Professional or Contractor?
            </h3>
            <p className="text-xs sm:text-sm text-slate-900 mt-1 max-w-xl">
              Join 5,000+ verified service partners. Get daily customer bookings in your locality with zero onboarding commission.
            </p>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <Link
              to="/partner/register"
              className="bg-slate-950 hover:bg-slate-900 text-white font-extrabold text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-md transition-all active:scale-95"
            >
              Register as Partner
            </Link>
            <Link
              to="/partner/dashboard"
              className="bg-white/80 hover:bg-white text-slate-900 font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl border border-slate-300 transition-all"
            >
              Partner Login
            </Link>
          </div>
        </div>
      </div>

      {/* Interactive Modals */}
      <CalculatorModal 
        calculator={activeCalculator}
        onClose={() => setActiveCalculator(null)}
        onAddToBOQ={() => {
          setActiveCalculator(null);
          navigate('/calculator');
        }}
      />

      <QuickViewModal 
        module={quickViewModule}
        onClose={() => setQuickViewModule(null)}
        onEnquire={(topic) => {
          setQuickViewModule(null);
          setEnquiryTopic(topic);
          setEnquiryModalOpen(true);
        }}
      />

      <EnquiryModal 
        isOpen={enquiryModalOpen}
        onClose={() => setEnquiryModalOpen(false)}
        defaultTopic={enquiryTopic}
      />

    </div>
  );
};

export default HomePage;