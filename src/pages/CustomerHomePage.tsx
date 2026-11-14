import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { 
  Search, 
  ArrowRight, 
  Paintbrush, 
  Building2, 
  Wrench, 
  Sparkles, 
  Droplets, 
  Zap, 
  Hammer, 
  MoreHorizontal, 
  Clock, 
  ShieldCheck, 
  Star, 
  MapPin, 
  Calendar,
  Building,
  Calculator,
  ChevronRight,
  Briefcase
} from 'lucide-react';

export const CustomerHomePage: React.FC = () => {
  const { categories, bookings, activeBooking } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

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

  const activeJob = bookings.find(b => b.status === 'In Progress' || b.status === 'On the Way' || b.status === 'Request Placed');

  return (
    <div className="pb-24 pt-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
      
      {/* 1. SEARCH BAR (per image copy 14.png Screen 5) */}
      <div className="relative">
        <div className="flex items-center bg-white rounded-2xl p-2 shadow-xs border border-slate-200 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 transition-all">
          <Search className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400 ml-2.5 shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for services..."
            className="w-full px-3 py-1.5 text-xs sm:text-sm text-slate-900 placeholder-slate-400 bg-transparent focus:outline-none"
          />
        </div>
      </div>

      {/* 2. ACTIVE BOOKING STATUS STRIP (if user has active job) */}
      {activeJob && (
        <div 
          onClick={() => navigate(`/booking/${activeJob.id}`)}
          className="bg-gradient-to-r from-blue-900 via-bm-navy to-indigo-950 text-white p-4 rounded-3xl shadow-lg border border-blue-800 flex items-center justify-between gap-3 cursor-pointer hover:shadow-xl transition-all group"
        >
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-white/10 flex items-center justify-center shrink-0 border border-white/20">
              <Clock className="w-5 h-5 text-amber-400 animate-spin" style={{ animationDuration: '8s' }} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-xs text-amber-400">{activeJob.id}</span>
                <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-extrabold px-2 py-0.5 rounded-full border border-emerald-400/30">
                  {activeJob.status}
                </span>
              </div>
              <div className="font-extrabold text-sm text-white mt-0.5">
                {activeJob.serviceName}
              </div>
              <div className="text-[11px] text-slate-300">
                {activeJob.provider?.name} • Arriving soon
              </div>
            </div>
          </div>
          <div className="text-right flex items-center gap-1 text-xs font-bold text-amber-400 group-hover:translate-x-1 transition-transform">
            <span>Track</span>
            <ChevronRight className="w-4 h-4" />
          </div>
        </div>
      )}

      {/* 3. HERO PROMOTIONAL BANNER (per image copy 14.png Screen 5) */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 text-white shadow-xl min-h-[170px] sm:min-h-[200px] flex items-center justify-between p-6 sm:p-8">
        <div className="space-y-3 max-w-[62%] sm:max-w-md z-10">
          <h2 className="text-lg sm:text-2xl font-black leading-tight tracking-tight">
            Professional Home Services at Your Fingertips
          </h2>
          <button
            onClick={() => navigate('/services/painting')}
            className="inline-flex items-center gap-1.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs sm:text-sm px-4 sm:px-5 py-2.5 rounded-full shadow-md transition-all active:scale-95"
          >
            <span>Book Now</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Banner Graphic on Right (Painter photo from services.jpg) */}
        <div className="absolute right-0 top-0 bottom-0 w-[42%] sm:w-[35%] overflow-hidden">
          <img 
            src="/assets/services.jpg" 
            alt="Painter at work" 
            className="w-full h-full object-cover object-center filter brightness-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-700 via-blue-700/40 to-transparent"></div>
        </div>
      </div>

      {/* 4. OUR SERVICES GRID (per image copy 14.png Screen 5) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
            Our Services
          </h3>
          <Link 
            to="/services/all" 
            className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-0.5"
          >
            <span>See all</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        {/* 8 Categories Grid (Painting, Construction, Repairs, Cleaning, Plumbing, Electrical, Carpentry, Others) */}
        <div className="grid grid-cols-4 sm:grid-cols-4 lg:grid-cols-8 gap-2.5 sm:gap-3.5">
          {categories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => navigate(`/services/${cat.id}`)}
              className="group cursor-pointer rounded-2xl p-2.5 sm:p-3 transition-all flex flex-col items-center justify-between text-center bg-white border border-slate-200/90 shadow-2xs hover:shadow-md hover:-translate-y-1"
            >
              <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center mb-1.5 transition-transform group-hover:scale-110 border ${getCategoryColor(cat.id)}`}>
                {getCategoryIcon(cat.id)}
              </div>
              <div className="font-extrabold text-[11px] sm:text-xs text-slate-800 leading-tight">
                {cat.name}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. QUICK APP ACCESS CARDS (Real Estate, 3D Designs, Cost Calculator) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
        
        {/* Real Estate Hub */}
        <div
          onClick={() => navigate('/real-estate')}
          className="bg-white p-4 rounded-3xl border border-slate-200 shadow-xs hover:shadow-md transition-all cursor-pointer flex items-center gap-3.5 group"
        >
          <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
            <Building className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-sky-600">Buy • Rent • Sell</div>
            <div className="text-sm font-extrabold text-slate-900">Real Estate Hub</div>
            <div className="text-[11px] text-slate-500">Verified Plots & Villas</div>
          </div>
        </div>

        {/* 3D House Designs */}
        <div
          onClick={() => navigate('/3d-designs')}
          className="bg-white p-4 rounded-3xl border border-slate-200 shadow-xs hover:shadow-md transition-all cursor-pointer flex items-center gap-3.5 group"
        >
          <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-rose-600">Architectural Plans</div>
            <div className="text-sm font-extrabold text-slate-900">3D House Designs</div>
            <div className="text-[11px] text-slate-500">Exterior & Interior Models</div>
          </div>
        </div>

        {/* Construction Calculator */}
        <div
          onClick={() => navigate('/calculator')}
          className="bg-white p-4 rounded-3xl border border-slate-200 shadow-xs hover:shadow-md transition-all cursor-pointer flex items-center gap-3.5 group"
        >
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
            <Calculator className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-emerald-600">Instant Estimate</div>
            <div className="text-sm font-extrabold text-slate-900">Cost Calculator</div>
            <div className="text-[11px] text-slate-500">Sq.Ft × Material Grade</div>
          </div>
        </div>

      </div>

      {/* 6. POPULAR PACKAGES STRIP */}
      <div className="bg-slate-100 rounded-3xl p-5 border border-slate-200/90 space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-600">Most Booked Today</span>
            <h4 className="text-sm sm:text-base font-black text-slate-900">Trending Services Near You</h4>
          </div>
          <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-red-500" />
            <span>Hyderabad Central</span>
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          
          <div 
            onClick={() => navigate('/service/interior-painting')}
            className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs flex items-center gap-3 cursor-pointer hover:border-blue-500 transition-colors"
          >
            <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-100 shrink-0">
              <img src="/assets/services.jpg" alt="Interior Painting" className="w-full h-full object-cover" />
            </div>
            <div className="flex-1">
              <div className="text-xs font-extrabold text-slate-900">Interior Painting</div>
              <div className="text-[11px] font-bold text-blue-600">₹2,000 onwards</div>
              <div className="flex items-center gap-1 text-[10px] text-slate-400 mt-0.5">
                <Star className="w-3 h-3 text-amber-400 fill-amber-400" /> 4.6 (12k)
              </div>
            </div>
          </div>

          <div 
            onClick={() => navigate('/service/seepage-repair')}
            className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs flex items-center gap-3 cursor-pointer hover:border-blue-500 transition-colors"
          >
            <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-100 shrink-0">
              <img src="/assets/engineering.jpg" alt="Seepage Repair" className="w-full h-full object-cover" />
            </div>
            <div className="flex-1">
              <div className="text-xs font-extrabold text-slate-900">Seepage Repair</div>
              <div className="text-[11px] font-bold text-blue-600">₹1,200 onwards</div>
              <div className="flex items-center gap-1 text-[10px] text-slate-400 mt-0.5">
                <Star className="w-3 h-3 text-amber-400 fill-amber-400" /> 4.8 (6.5k)
              </div>
            </div>
          </div>

          <div 
            onClick={() => navigate('/service/concealed-plumbing')}
            className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs flex items-center gap-3 cursor-pointer hover:border-blue-500 transition-colors"
          >
            <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-100 shrink-0">
              <img src="/assets/cat_plumbing.jpg" alt="Plumbing" className="w-full h-full object-cover" />
            </div>
            <div className="flex-1">
              <div className="text-xs font-extrabold text-slate-900">CPVC Plumbing</div>
              <div className="text-[11px] font-bold text-blue-600">₹1,100 onwards</div>
              <div className="flex items-center gap-1 text-[10px] text-slate-400 mt-0.5">
                <Star className="w-3 h-3 text-amber-400 fill-amber-400" /> 4.7 (8.9k)
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* 7. PARTNER ONBOARDING BANNER (per image copy 14.png Screen 14) */}
      <div className="bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 text-slate-950 p-5 sm:p-6 rounded-3xl shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-white text-slate-950 flex items-center justify-center shrink-0 shadow-sm">
            <Briefcase className="w-6 h-6 text-amber-600" />
          </div>
          <div>
            <h4 className="text-sm sm:text-base font-black">Are You a Contractor or Tradesman?</h4>
            <p className="text-xs text-slate-900/80">Join as a verified BuildMitra Service Partner and receive daily local jobs with zero commission.</p>
          </div>
        </div>
        <button
          onClick={() => navigate('/partner/register')}
          className="w-full sm:w-auto bg-slate-950 hover:bg-slate-900 text-white font-extrabold text-xs py-2.5 px-5 rounded-2xl transition-all shrink-0 active:scale-95 text-center"
        >
          Register as Partner
        </button>
      </div>

    </div>
  );
};
