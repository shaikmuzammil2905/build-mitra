import React, { useState } from 'react';
import { LABOUR_WORKFORCE, LabourProfile } from '../data/labourData';
import { 
  Users, 
  ShieldCheck, 
  CheckCircle2, 
  Star, 
  MapPin, 
  Calendar, 
  ArrowRight, 
  UserCheck, 
  Search, 
  ChevronDown,
  ChevronRight,
  Sparkles
} from 'lucide-react';

interface LabourNetPageProps {
  onHireWorker: (workerName: string, trade: string) => void;
}

export const LabourNetPage: React.FC<LabourNetPageProps> = ({ onHireWorker }) => {
  const [selectedTrade, setSelectedTrade] = useState<string>('All');
  const [searchLocation, setSearchLocation] = useState('');

  // Visual Category Tiles for Labour
  const visualCategories = [
    { id: 'Master Mason', name: 'Master Mason', image: '/assets/labour.jpg', subtitle: 'Brick & Block' },
    { id: 'Bar Bender', name: 'Bar Bender', image: '/assets/cat_steel.jpg', subtitle: 'Rebar BBS' },
    { id: 'Shuttering Carpenter', name: 'Shuttering', image: '/assets/floor-plans.jpg', subtitle: 'Formwork & Props' },
    { id: 'Tile Layer', name: 'Tile Layer', image: '/assets/engineering.jpg', subtitle: 'Vitrified & Granite' },
    { id: 'Site Helper', name: 'Site Helpers', image: '/assets/cat_aggregates.jpg', subtitle: 'Beldar Gangs' },
    { id: 'Structural Welder', name: 'Fabricator', image: '/assets/cat_steel.jpg', subtitle: 'Roof & Gates' },
  ];

  const trades = ['All', 'Master Mason', 'Bar Bender', 'Shuttering Carpenter', 'Tile Layer', 'Site Helper', 'Structural Welder'];

  const filteredLabour = LABOUR_WORKFORCE.filter(worker => {
    const matchesTrade = selectedTrade === 'All' || worker.trade === selectedTrade;
    const matchesLocation = !searchLocation || 
      worker.city.toLowerCase().includes(searchLocation.toLowerCase()) ||
      worker.area.toLowerCase().includes(searchLocation.toLowerCase()) ||
      worker.name.toLowerCase().includes(searchLocation.toLowerCase());
    return matchesTrade && matchesLocation;
  });

  return (
    <div className="pt-16 sm:pt-20 pb-20 bg-slate-50 min-h-screen">
      
      {/* DESKTOP ONLY Page Header - REMOVED ON MOBILE per image copy 8.png */}
      <div className="hidden md:block bg-bm-navy text-white py-12 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-300 text-xs font-bold uppercase tracking-wider">
              <Users className="w-3.5 h-3.5" />
              <span>Module 04 • Skilled Construction Workforce Network</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Labour Net
            </h1>
            <p className="text-sm text-slate-300 leading-relaxed">
              India’s first dedicated verified construction tradesmen network. Hire certified master masons, bar benders, shuttering gangs, and site helpers with government and admin-benchmarked daily wages.
            </p>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-80 h-80 bg-yellow-500/10 rounded-full blur-3xl pointer-events-none"></div>
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
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
                placeholder="Search tradesman, locality (e.g. JP Nagar, Whitefield)..."
                className="w-full px-3 py-1.5 bg-transparent text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none"
              />
              <button
                onClick={() => {}}
                className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-xs transition-all shrink-0 active:scale-95"
              >
                Search
              </button>
            </div>

            {/* Trade Dropdown */}
            <div className="relative w-full sm:w-56 shrink-0">
              <select
                value={selectedTrade}
                onChange={(e) => setSelectedTrade(e.target.value)}
                className="w-full h-full px-4 py-3 bg-slate-50 hover:bg-slate-100 rounded-2xl border border-slate-200 text-xs sm:text-sm font-bold text-slate-800 focus:outline-none focus:border-blue-500 cursor-pointer appearance-none transition-colors"
              >
                {trades.map((t) => (
                  <option key={t} value={t}>
                    {t === 'All' ? '👷 All Trades' : `🔨 ${t}`}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-slate-500 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* VISUAL TRADE TILES (per image copy 9.png) */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <div className="text-xs sm:text-sm font-extrabold text-slate-900 flex items-center gap-1.5">
                <span className="w-1.5 h-3.5 bg-amber-500 rounded-full"></span>
                <span>Workforce Categories</span>
              </div>
              <button 
                onClick={() => setSelectedTrade('All')}
                className="text-xs font-bold text-amber-600 hover:text-amber-700 flex items-center gap-0.5"
              >
                View All <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Category Photos Grid */}
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2.5 sm:gap-4 overflow-x-auto pb-1 scrollbar-none">
              {visualCategories.map((cat) => {
                const isSelected = selectedTrade === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedTrade(cat.id)}
                    className={`group rounded-2xl p-2 sm:p-2.5 transition-all text-center flex flex-col items-center justify-between border ${
                      isSelected
                        ? 'bg-amber-50 border-amber-500 ring-2 ring-amber-200 shadow-sm'
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

        {/* WORKFORCE LIST */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="text-base sm:text-lg font-extrabold text-slate-900 flex items-center gap-1.5">
              <span className="w-1.5 h-4 bg-amber-500 rounded-full"></span>
              <span>Available Tradesmen & Gangs ({filteredLabour.length})</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredLabour.map((worker) => (
              <div
                key={worker.id}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
              >
                <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-md">
                        {worker.badge}
                      </span>
                      <div className="flex items-center gap-1 bg-slate-100 text-slate-700 font-bold px-2 py-0.5 rounded-full text-[11px]">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        <span>{worker.rating} ({worker.completedSites} sites)</span>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors flex items-center gap-1.5 leading-snug">
                        <span>{worker.name}</span>
                        <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                      </h3>
                      <div className="text-xs font-semibold text-slate-600 mt-0.5">
                        {worker.trade} • {worker.experienceYears} Yrs Experience
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1">
                        <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0" />
                        <span className="truncate">{worker.area}</span>
                      </div>
                    </div>

                    {/* Wage Card */}
                    <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase font-bold">Admin Wage</span>
                        <div className="text-xl font-black text-slate-900">₹ {worker.dailyWage}</div>
                        <div className="text-[10px] text-slate-500">per {worker.unit}</div>
                      </div>

                      <div className="text-right text-xs">
                        <span className="text-[10px] text-slate-400 uppercase font-bold">Gang Capacity</span>
                        <div className="font-bold text-blue-700">{worker.gangSizeAvailable} Tradesmen</div>
                        <div className="text-[10px] text-emerald-600 font-semibold">{worker.availability}</div>
                      </div>
                    </div>

                    {/* Skills pills */}
                    <div className="flex flex-wrap gap-1 pt-1">
                      {worker.skills.slice(0, 3).map((sk, idx) => (
                        <span key={idx} className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md">
                          {sk}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action CTA */}
                  <div className="pt-3 border-t border-slate-100">
                    <button
                      onClick={() => onHireWorker(worker.name, worker.trade)}
                      className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs py-3 px-4 rounded-xl shadow-xs transition-all active:scale-95 flex items-center justify-center gap-1.5"
                    >
                      <UserCheck className="w-4 h-4" />
                      <span>Book Tradesman / Gang</span>
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
