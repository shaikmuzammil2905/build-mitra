import React, { useState } from 'react';
import { HOME_SERVICES_CATALOG, HomeService } from '../data/servicesData';
import { 
  Hammer, 
  ShieldCheck, 
  CheckCircle2, 
  Star, 
  Clock, 
  MapPin, 
  ArrowRight,
  Search,
  ChevronDown,
  ChevronRight,
  Sparkles
} from 'lucide-react';

interface ServicesPageProps {
  onOpenBooking: (serviceName: string) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ onOpenBooking }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Visual Category Tiles per image copy 9.png
  const visualCategories = [
    { id: 'Waterproofing', name: 'Waterproofing', image: '/assets/services.jpg', subtitle: 'Terrace & Sump' },
    { id: 'Painting', name: 'Painting', image: '/assets/services.jpg', subtitle: 'Interior & Exterior' },
    { id: 'Electrical', name: 'Electrical', image: '/assets/cat_electrical.jpg', subtitle: 'Wiring & Panels' },
    { id: 'Plumbing', name: 'Plumbing', image: '/assets/cat_plumbing.jpg', subtitle: 'Piping & Pumps' },
    { id: 'Civil Works', name: 'Civil Works', image: '/assets/engineering.jpg', subtitle: 'Turnkey & Remodel' },
    { id: 'Carpentry', name: 'Carpentry', image: '/assets/floor-plans.jpg', subtitle: 'Modular & Doors' },
  ];

  const categories = ['All', 'Waterproofing', 'Painting', 'Electrical', 'Plumbing', 'Civil Works', 'Carpentry'];

  const filteredServices = HOME_SERVICES_CATALOG.filter(s => {
    const matchesCat = selectedCategory === 'All' || s.category === selectedCategory;
    const matchesQuery = !searchQuery || 
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      s.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.shortDesc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  return (
    <div className="pt-16 sm:pt-20 pb-20 bg-slate-50 min-h-screen">
      
      {/* DESKTOP ONLY Page Header - REMOVED ON MOBILE per image copy 8.png */}
      <div className="hidden md:block bg-bm-navy text-white py-12 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold uppercase tracking-wider">
              <Hammer className="w-3.5 h-3.5" />
              <span>Module 03 • GPS-Verified On-Demand Trades</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              On-Demand Home & Civil Services
            </h1>
            <p className="text-sm text-slate-300 leading-relaxed">
              Book certified civil contractors, waterproofing specialists, master plumbers, electricians, and turnkey painters. 100% background-checked with upfront transparent rate matrices and warranty guarantees.
            </p>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 space-y-6">
        
        {/* TOP SEARCH & DROPDOWN BAR (per image copy 9.png) */}
        <div className="bg-white rounded-3xl p-4 sm:p-5 shadow-sm border border-slate-200/90 space-y-4">
          
          <div className="flex flex-col sm:flex-row items-stretch gap-3">
            {/* Search Input Box with Search Button */}
            <div className="relative flex-1 flex items-center bg-slate-50 rounded-2xl border border-slate-200 p-1.5 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 transition-all">
              <Search className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400 ml-2.5 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search electrician, plumber, painting, waterproofing..."
                className="w-full px-3 py-1.5 bg-transparent text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none"
              />
              <button
                onClick={() => {}}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-xs transition-all shrink-0 active:scale-95"
              >
                Search
              </button>
            </div>

            {/* Category Dropdown */}
            <div className="relative w-full sm:w-56 shrink-0">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full h-full px-4 py-3 bg-slate-50 hover:bg-slate-100 rounded-2xl border border-slate-200 text-xs sm:text-sm font-bold text-slate-800 focus:outline-none focus:border-blue-500 cursor-pointer appearance-none transition-colors"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c === 'All' ? '🛠️ All Services' : `🔧 ${c}`}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-slate-500 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* VISUAL SERVICE TILES (per image copy 9.png) */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <div className="text-xs sm:text-sm font-extrabold text-slate-900 flex items-center gap-1.5">
                <span className="w-1.5 h-3.5 bg-emerald-500 rounded-full"></span>
                <span>Service Categories</span>
              </div>
              <button 
                onClick={() => setSelectedCategory('All')}
                className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-0.5"
              >
                View All <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Category Photos Grid */}
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2.5 sm:gap-4 overflow-x-auto pb-1 scrollbar-none">
              {visualCategories.map((cat) => {
                const isSelected = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`group rounded-2xl p-2 sm:p-2.5 transition-all text-center flex flex-col items-center justify-between border ${
                      isSelected
                        ? 'bg-emerald-50 border-emerald-500 ring-2 ring-emerald-200 shadow-sm'
                        : 'bg-white border-slate-200/90 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-slate-100 mb-1.5 shadow-2xs group-hover:scale-105 transition-transform">
                      <img 
                        src={cat.image} 
                        alt={cat.name} 
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <div className="font-extrabold text-[11px] sm:text-xs text-slate-900 leading-tight">
                      {cat.name}
                    </div>
                    <div className="text-[10px] text-slate-400 mt-0.5 hidden sm:block">
                      {cat.subtitle}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* FEATURED SERVICES LIST */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="text-base sm:text-lg font-extrabold text-slate-900 flex items-center gap-1.5">
              <span className="w-1.5 h-4 bg-emerald-600 rounded-full"></span>
              <span>Verified Home & Civil Services ({filteredServices.length})</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredServices.map((service) => (
              <div
                key={service.id}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
              >
                {/* Visual Header Image */}
                <div className="relative h-44 bg-slate-100 overflow-hidden">
                  <img
                    src={
                      service.category === 'Electrical' ? '/assets/cat_electrical.jpg' :
                      service.category === 'Plumbing' ? '/assets/cat_plumbing.jpg' :
                      service.category === 'Civil Works' ? '/assets/engineering.jpg' :
                      service.category === 'Carpentry' ? '/assets/floor-plans.jpg' :
                      '/assets/services.jpg'
                    }
                    alt={service.name}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 bg-emerald-600 text-white font-mono text-[11px] font-bold px-2.5 py-0.5 rounded-md shadow-xs">
                    {service.category}
                  </div>
                  <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm text-amber-700 text-[11px] font-bold px-2 py-0.5 rounded-md shadow-xs flex items-center gap-1">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" /> {service.rating}
                  </div>
                </div>

                <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-base font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
                      {service.name}
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1 font-medium">
                      <Clock className="w-3.5 h-3.5 text-blue-600" />
                      <span>{service.eta}</span>
                    </div>
                    <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                      {service.shortDesc}
                    </p>
                  </div>

                  {/* Pricing and Insurance Card */}
                  <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-bold">Standard Rate</span>
                      <div className="text-lg font-black text-slate-900">{service.startingPrice}</div>
                      <div className="text-[10px] text-slate-500">{service.priceUnit}</div>
                    </div>
                    <div className="text-right text-xs">
                      <span className="text-[10px] text-slate-400 uppercase font-bold">Warranty</span>
                      <div className="font-bold text-emerald-600 text-xs">{service.insuranceCover}</div>
                      <div className="text-[10px] text-slate-500">100% Insured</div>
                    </div>
                  </div>

                  {/* Action CTA */}
                  <div className="pt-2 border-t border-slate-100">
                    <button
                      onClick={() => onOpenBooking(`Book ${service.name}`)}
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-3 px-4 rounded-xl shadow-xs transition-all active:scale-95 flex items-center justify-center gap-1.5"
                    >
                      <span>Book Verified Professional</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                </div>

              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
