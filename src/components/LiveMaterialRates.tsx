import React, { useState } from 'react';
import { CITIES_DATA, CityRates } from '../data/ratesData';
import { 
  TrendingUp, 
  TrendingDown, 
  Clock, 
  MapPin, 
  ArrowRight, 
  ShieldCheck, 
  FileText 
} from 'lucide-react';

interface LiveMaterialRatesProps {
  onOpenAllRates: (cityName: string) => void;
  onRequestQuote: (materialName: string, city: string) => void;
}

export const LiveMaterialRates: React.FC<LiveMaterialRatesProps> = ({ onOpenAllRates, onRequestQuote }) => {
  const [selectedCity, setSelectedCity] = useState<string>('Bengaluru');
  const cityData: CityRates = CITIES_DATA[selectedCity] || CITIES_DATA['Bengaluru'];

  // 4 primary materials displayed on homepage
  const primaryMaterials = cityData.rates.slice(0, 4);

  return (
    <section className="py-16 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Container with subtle border and shadow */}
        <div className="bg-gradient-to-br from-slate-50 via-white to-blue-50/30 rounded-3xl p-6 sm:p-8 lg:p-10 border border-slate-200/90 shadow-sm">
          
          {/* Top Bar with City Selector & Timestamp */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-slate-200">
            <div>
              <div className="inline-flex items-center gap-2 text-amber-600 font-bold text-xs uppercase tracking-wider mb-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Verified Yard Benchmark</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-bm-navy tracking-tight flex items-center gap-2">
                <span>Live Material Rates</span>
              </h2>
              <p className="text-sm text-slate-500 mt-0.5">
                Daily city-wise benchmark rates for your construction needs
              </p>
            </div>

            {/* City Selector and Action Button */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 bg-white px-3.5 py-2 rounded-xl border border-slate-300 shadow-sm">
                <MapPin className="w-4 h-4 text-blue-600 shrink-0" />
                <span className="text-xs font-semibold text-slate-500">Select City:</span>
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="bg-transparent font-bold text-sm text-slate-900 focus:outline-none cursor-pointer"
                >
                  {Object.keys(CITIES_DATA).map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <button
                onClick={() => onOpenAllRates(selectedCity)}
                className="inline-flex items-center gap-1.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold text-sm px-5 py-2.5 rounded-xl shadow-sm hover:shadow transition-all"
              >
                <span>View Rates</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* 4 Cards Grid - Matches screenshot in image.png */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 pt-8">
            {primaryMaterials.map((mat) => {
              // Custom badge icon or color
              let colorClass = 'from-amber-500/10 to-transparent';
              if (mat.id === 'cement') colorClass = 'from-blue-500/10 to-transparent';
              if (mat.id === 'steel') colorClass = 'from-slate-500/10 to-transparent';
              if (mat.id === 'msand') colorClass = 'from-amber-500/10 to-transparent';
              if (mat.id === 'bricks') colorClass = 'from-red-500/10 to-transparent';

              return (
                <div 
                  key={mat.id}
                  className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group relative overflow-hidden"
                >
                  <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl ${colorClass} rounded-bl-full pointer-events-none`}></div>

                  <div>
                    {/* Header with category and trend */}
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">
                        {mat.name.split(' ')[0]}
                      </span>
                      {mat.trend === 'up' && (
                        <span className="inline-flex items-center text-[11px] font-semibold text-red-600 bg-red-50 px-2 py-0.5 rounded-full">
                          <TrendingUp className="w-3 h-3 mr-0.5" /> +{mat.change}%
                        </span>
                      )}
                      {mat.trend === 'down' && (
                        <span className="inline-flex items-center text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                          <TrendingDown className="w-3 h-3 mr-0.5" /> {mat.change}%
                        </span>
                      )}
                      {mat.trend === 'stable' && (
                        <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                          Stable
                        </span>
                      )}
                    </div>

                    {/* Material Title */}
                    <h3 className="font-bold text-slate-900 text-sm sm:text-base group-hover:text-blue-600 transition-colors line-clamp-1">
                      {mat.name.split('(')[0].trim()}
                    </h3>

                    {/* Price and Unit */}
                    <div className="mt-3">
                      <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                        ₹ {mat.price.toLocaleString('en-IN')}
                      </div>
                      <div className="text-xs text-slate-500 font-medium">
                        / {mat.unit}
                      </div>
                    </div>
                  </div>

                  {/* Specification & Action */}
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-slate-500 truncate max-w-[120px]">Min: {mat.minOrder}</span>
                    <button
                      onClick={() => onRequestQuote(mat.name, selectedCity)}
                      className="text-blue-600 hover:text-blue-700 font-bold hover:underline"
                    >
                      Enquire
                    </button>
                  </div>

                </div>
              );
            })}
          </div>

          {/* Bottom Info Note */}
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2 pt-4 border-t border-slate-100">
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>Rates updated: <strong className="text-slate-700">{cityData.lastUpdated}</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Prices reflect wholesale yard benchmarks exclusive of local transport and GST.</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

