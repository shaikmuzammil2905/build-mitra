import React, { useState } from 'react';
import { REAL_ESTATE_INSIGHTS, PropertyInsight } from '../data/propertiesData';
import { 
  Building2, 
  MapPin, 
  TrendingUp, 
  ShieldCheck, 
  Compass, 
  Layers, 
  CheckCircle2, 
  ArrowRight,
  Sparkles,
  Maximize2
} from 'lucide-react';

interface RealEstatePageProps {
  onOpenEnquiry: (topic?: string) => void;
}

export const RealEstatePage: React.FC<RealEstatePageProps> = ({ onOpenEnquiry }) => {
  const [selectedProperty, setSelectedProperty] = useState<PropertyInsight>(REAL_ESTATE_INSIGHTS[0]);
  const [simulatedPoints, setSimulatedPoints] = useState<number>(4);

  return (
    <div className="pt-24 pb-20 bg-slate-50 min-h-screen">
      
      {/* Page Header */}
      <div className="bg-bm-navy text-white py-14 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/20 text-sky-300 text-xs font-bold uppercase tracking-wider">
              <Compass className="w-3.5 h-3.5" />
              <span>Module 05 • Property Intelligence & Satellite Survey</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              Real Estate Hub & DIY Land Survey
            </h1>
            <p className="text-base text-slate-300 leading-relaxed">
              Unbiased property valuation benchmarks comparing Sub-Registrar guidance values, registered deed transaction averages, 1-year capital appreciation forecasts, and satellite DIY boundary demarcation.
            </p>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20 space-y-8">
        
        {/* Interactive Satellite DIY Demarcation Simulation Box */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-lg border border-slate-200/90 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-600 uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Satellite GPS Polygon Demarcation</span>
              </div>
              <h2 className="text-2xl font-extrabold text-bm-navy mt-1">
                DIY Land Boundary & Area Measurement Studio
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500">Active Polygon:</span>
              <span className="bg-sky-50 text-sky-700 font-mono text-xs font-bold px-3 py-1 rounded-lg border border-sky-200">
                {simulatedPoints} Corner Coordinates Locked
              </span>
            </div>
          </div>

          {/* Interactive Visual Map Preview */}
          <div className="relative h-80 sm:h-96 rounded-2xl overflow-hidden border border-slate-200 bg-slate-900 shadow-inner group">
            <img 
              src="/assets/real-estate.jpg" 
              alt="Satellite Land Demarcation Visual" 
              className="w-full h-full object-cover opacity-85 group-hover:scale-105 transition-transform duration-700"
            />
            
            {/* Digital Grid & Boundary Overlay */}
            <div className="absolute inset-0 bg-blue-950/30 flex items-center justify-center pointer-events-none">
              <div className="border-2 border-emerald-400 bg-emerald-500/20 w-64 h-48 rounded-lg relative shadow-lg flex items-center justify-center animate-pulse-subtle">
                <div className="absolute -top-2 -left-2 w-4 h-4 rounded-full bg-emerald-400 border-2 border-white shadow"></div>
                <div className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-emerald-400 border-2 border-white shadow"></div>
                <div className="absolute -bottom-2 -left-2 w-4 h-4 rounded-full bg-emerald-400 border-2 border-white shadow"></div>
                <div className="absolute -bottom-2 -right-2 w-4 h-4 rounded-full bg-emerald-400 border-2 border-white shadow"></div>
                
                <div className="bg-slate-950/85 text-white font-mono text-xs px-3 py-1.5 rounded-md shadow-md text-center">
                  <div className="font-bold text-emerald-400">Area: 2,400 Sq.Ft (222.9 m²)</div>
                  <div className="text-[10px] text-slate-300">Dimensions: 40.0 ft x 60.0 ft</div>
                </div>
              </div>
            </div>

            {/* Bottom floating HUD controls */}
            <div className="absolute bottom-4 left-4 right-4 bg-slate-950/80 backdrop-blur-md p-4 rounded-xl border border-white/10 text-white flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>GPS Accuracy: ± 0.5 meters • WGS84 Geodetic Datum</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onOpenEnquiry('Order Official Total Station Land Survey')}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2 rounded-lg transition-colors"
                >
                  Book On-Site DGPS Land Survey
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Property Valuation & Guidance Intelligence Cards */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-extrabold text-bm-navy">
                Verified Micro-Market Property Intelligence
              </h3>
              <p className="text-xs text-slate-500">
                Real benchmarks from Bengaluru Sub-Registrar registration data
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {REAL_ESTATE_INSIGHTS.map((prop) => (
              <div
                key={prop.id}
                className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-sm hover:shadow-xl transition-all space-y-5 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-sky-700 bg-sky-50 px-2.5 py-1 rounded-md">
                      {prop.type}
                    </span>
                    <span className="font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md flex items-center gap-1">
                      <TrendingUp className="w-3.5 h-3.5" /> +{prop.oneYearGrowthForecast}% 1-Yr Forecast
                    </span>
                  </div>

                  <div>
                    <h4 className="text-lg font-extrabold text-slate-900 leading-snug">
                      {prop.title}
                    </h4>
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1">
                      <MapPin className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      <span>{prop.location}</span>
                    </div>
                  </div>

                  {/* Benchmark 3-Way Valuation Matrix */}
                  <div className="grid grid-cols-3 gap-2 bg-slate-50 p-3.5 rounded-2xl border border-slate-100 text-center">
                    <div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase">Govt Guidance</div>
                      <div className="text-sm sm:text-base font-extrabold text-slate-700 mt-0.5">
                        ₹ {prop.govtGuidanceValue}
                      </div>
                      <div className="text-[10px] text-slate-400">/ sq.ft</div>
                    </div>

                    <div className="border-x border-slate-200">
                      <div className="text-[10px] font-bold text-slate-400 uppercase">Registered Avg</div>
                      <div className="text-sm sm:text-base font-extrabold text-slate-900 mt-0.5">
                        ₹ {prop.registeredTransactionAverage}
                      </div>
                      <div className="text-[10px] text-slate-400">/ sq.ft</div>
                    </div>

                    <div>
                      <div className="text-[10px] font-bold text-blue-600 uppercase">Fair Market</div>
                      <div className="text-sm sm:text-base font-extrabold text-blue-700 mt-0.5">
                        ₹ {prop.fairMarketValue}
                      </div>
                      <div className="text-[10px] text-slate-400">/ sq.ft</div>
                    </div>
                  </div>

                  {/* Features list */}
                  <div className="space-y-1.5 pt-1">
                    {prop.features.slice(0, 3).map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-600">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer action */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="text-xs text-slate-500 font-mono">
                    Khata: <strong className="text-slate-800">{prop.khataType}</strong>
                  </div>

                  <button
                    onClick={() => onOpenEnquiry(`Legal & Valuation Report for ${prop.title}`)}
                    className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-sm transition-all"
                  >
                    <span>Request Title Verification</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
