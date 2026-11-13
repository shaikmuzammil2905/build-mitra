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
  Sparkles
} from 'lucide-react';

interface LabourNetPageProps {
  onHireWorker: (workerName: string, trade: string) => void;
}

export const LabourNetPage: React.FC<LabourNetPageProps> = ({ onHireWorker }) => {
  const [selectedTrade, setSelectedTrade] = useState<string>('All');
  const [searchLocation, setSearchLocation] = useState('');

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
    <div className="pt-24 pb-20 bg-slate-50 min-h-screen">
      
      {/* Page Header */}
      <div className="bg-bm-navy text-white py-14 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-300 text-xs font-bold uppercase tracking-wider">
              <Users className="w-3.5 h-3.5" />
              <span>Module 04 • Skilled Construction Workforce Network</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              Labour Net
            </h1>
            <p className="text-base text-slate-300 leading-relaxed">
              India’s first dedicated verified construction tradesmen network. Hire certified master masons, bar benders, shuttering gangs, and site helpers with government and admin-benchmarked daily wages.
            </p>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl pointer-events-none"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20 space-y-8">
        
        {/* Search & Filter Bar */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-lg border border-slate-200/90 flex flex-col md:flex-row items-center justify-between gap-4">
          
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {trades.map((tr) => (
              <button
                key={tr}
                onClick={() => setSelectedTrade(tr)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  selectedTrade === tr
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {tr}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={searchLocation}
              onChange={(e) => setSearchLocation(e.target.value)}
              placeholder="Search area (e.g. JP Nagar, Hebbal)..."
              className="w-full pl-9 pr-4 py-2 bg-slate-50 rounded-xl border border-slate-200 text-xs sm:text-sm font-medium focus:outline-none focus:border-blue-500"
            />
          </div>

        </div>

        {/* Labour Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLabour.map((worker) => (
            <div
              key={worker.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="p-6 space-y-4">
                
                {/* Header Tag & Rating */}
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md">
                    {worker.badge}
                  </span>
                  <div className="flex items-center gap-1 bg-amber-50 text-amber-700 font-bold px-2 py-0.5 rounded-full text-xs">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{worker.rating} ({worker.completedSites} sites)</span>
                  </div>
                </div>

                {/* Worker Name & Trade */}
                <div>
                  <h3 className="text-xl font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug flex items-center gap-2">
                    <span>{worker.name}</span>
                    <ShieldCheck className="w-5 h-5 text-emerald-600" />
                  </h3>
                  <div className="text-xs font-semibold text-slate-600 mt-1">
                    {worker.trade} • {worker.experienceYears} Years On-Site Experience
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0" />
                    <span className="truncate">{worker.area}</span>
                  </div>
                </div>

                {/* Wage Benchmark Card */}
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-slate-400 uppercase font-semibold">Benchmarked Wage</span>
                    <div className="text-2xl font-black text-slate-900">₹ {worker.dailyWage}</div>
                    <div className="text-[11px] text-slate-500">per {worker.unit}</div>
                  </div>

                  <div className="text-right text-xs">
                    <span className="text-[11px] text-slate-400 uppercase font-semibold">Gang / Crew</span>
                    <div className="font-bold text-blue-700">Up to {worker.gangSizeAvailable} Workers</div>
                    <div className="text-[11px] text-emerald-600 font-semibold">{worker.availability}</div>
                  </div>
                </div>

                {/* Skills tags */}
                <div className="space-y-1.5 pt-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Verified Competencies:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {worker.skills.map((sk, idx) => (
                      <span key={idx} className="text-[11px] bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg">
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>

              </div>

              {/* Action Button */}
              <div className="p-6 pt-0">
                <button
                  onClick={() => onHireWorker(worker.name, worker.trade)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-3 px-4 rounded-xl shadow-md transition-all active:scale-95 flex items-center justify-center gap-2"
                >
                  <UserCheck className="w-4 h-4" />
                  <span>Hire / Book Tradesman</span>
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
