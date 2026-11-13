import React, { useState } from 'react';
import { REAL_ESTATE_INSIGHTS, MICRO_MARKET_BENCHMARKS, PropertyInsight } from '../data/propertiesData';
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
  Calculator,
  Search,
  FileCheck
} from 'lucide-react';

interface RealEstatePageProps {
  onOpenEnquiry: (topic?: string) => void;
}

export const RealEstatePage: React.FC<RealEstatePageProps> = ({ onOpenEnquiry }) => {
  const [selectedProperty, setSelectedProperty] = useState<PropertyInsight>(REAL_ESTATE_INSIGHTS[0]);
  const [simulatedPoints, setSimulatedPoints] = useState<number>(4);
  const [propertyValueInput, setPropertyValueInput] = useState<number>(5000000); // 50 Lakhs

  // Stamp duty calculation (Karnataka standard: 5% Stamp Duty + 2% Surcharge/Cess + 1% Registration = ~5.6% - 6.6%)
  const stampDuty = Math.round(propertyValueInput * 0.05);
  const cessSurcharge = Math.round(stampDuty * 0.10); // 10% of stamp duty
  const regFee = Math.round(propertyValueInput * 0.01);
  const totalGovtCharges = stampDuty + cessSurcharge + regFee;

  return (
    <div className="pt-16 sm:pt-20 pb-20 bg-slate-50 min-h-screen">
      
      {/* DESKTOP ONLY Page Header - REMOVED ON MOBILE per image copy 8.png */}
      <div className="hidden md:block bg-bm-navy text-white py-12 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/20 text-sky-300 text-xs font-bold uppercase tracking-wider">
              <Compass className="w-3.5 h-3.5" />
              <span>Module 05 • Property Intelligence & Satellite Survey</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Real Estate Hub & DIY Land Survey
            </h1>
            <p className="text-sm text-slate-300 leading-relaxed">
              Unbiased property valuation benchmarks comparing Sub-Registrar guidance values, registered deed transaction averages, 1-year capital appreciation forecasts, and satellite DIY boundary demarcation.
            </p>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 space-y-8">
        
        {/* Interactive Satellite DIY Demarcation Simulation Box */}
        <div className="bg-white rounded-3xl p-5 sm:p-8 shadow-sm border border-slate-200/90 space-y-5">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-4 border-b border-slate-200">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-600 uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Satellite GPS Polygon Demarcation</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-bm-navy mt-0.5">
                DIY Land Boundary & Area Measurement Studio
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500">Polygon:</span>
              <span className="bg-sky-50 text-sky-700 font-mono text-xs font-bold px-3 py-1 rounded-lg border border-sky-200">
                {simulatedPoints} Coordinates Locked
              </span>
            </div>
          </div>

          {/* Interactive Visual Map Preview */}
          <div className="relative h-72 sm:h-96 rounded-2xl overflow-hidden border border-slate-200 bg-slate-900 shadow-inner group">
            <img 
              src="/assets/real-estate.jpg" 
              alt="Satellite Land Demarcation Visual" 
              className="w-full h-full object-cover opacity-85 group-hover:scale-105 transition-transform duration-700"
            />
            
            {/* Digital Grid & Boundary Overlay */}
            <div className="absolute inset-0 bg-blue-950/30 flex items-center justify-center pointer-events-none p-4">
              <div className="border-2 border-emerald-400 bg-emerald-500/20 w-64 h-44 rounded-lg relative shadow-lg flex items-center justify-center animate-pulse-subtle">
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
            <div className="absolute bottom-3 left-3 right-3 bg-slate-950/80 backdrop-blur-md p-3 sm:p-4 rounded-xl border border-white/10 text-white flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>GPS Accuracy: ± 0.5m • WGS84 Geodetic Datum</span>
              </div>
              <button
                onClick={() => onOpenEnquiry('Order Official Total Station Land Survey')}
                className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2 rounded-lg transition-colors text-center"
              >
                Book DGPS Site Land Survey
              </button>
            </div>
          </div>
        </div>

        {/* BENGALURU MICRO-MARKET VALUATION BENCHMARKS TABLE */}
        <div className="bg-white rounded-3xl p-5 sm:p-8 shadow-sm border border-slate-200/90 space-y-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
              Government vs Real Market Data
            </span>
            <h3 className="text-xl font-extrabold text-bm-navy mt-0.5">
              Micro-Market Guidance Value Index (Bengaluru)
            </h3>
            <p className="text-xs text-slate-500">
              Official Sub-Registrar guidance rate vs actual registered sales deed benchmarks
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-50 text-slate-700 font-bold uppercase text-[11px] border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Micro Market Locality</th>
                  <th className="py-3 px-4">Govt Guidance Rate</th>
                  <th className="py-3 px-4">Fair Market Rate</th>
                  <th className="py-3 px-4">Market Premium</th>
                  <th className="py-3 px-4">Growth Trend</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {MICRO_MARKET_BENCHMARKS.map((m, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3 px-4 font-bold text-slate-900">{m.area}</td>
                    <td className="py-3 px-4 font-mono font-semibold text-slate-600">{m.guidance} / sqft</td>
                    <td className="py-3 px-4 font-mono font-extrabold text-blue-700">{m.market} / sqft</td>
                    <td className="py-3 px-4 font-mono font-bold text-emerald-600">{m.delta}</td>
                    <td className="py-3 px-4 text-xs font-medium text-slate-600">{m.trend}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* STAMP DUTY & REGISTRATION ESTIMATOR */}
        <div className="bg-gradient-to-br from-slate-900 via-bm-navy to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-800 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400">
                <Calculator className="w-3.5 h-3.5" />
                <span>Statutory Fee Estimator</span>
              </div>
              <h3 className="text-xl font-extrabold text-white mt-1">
                Karnataka Stamp Duty & Registration Calculator
              </h3>
            </div>
            <span className="text-xs text-slate-400">
              Department of Stamps & Registration (Kaveri 2.0)
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <label className="block text-xs font-bold text-slate-300">
                Property Consideration / Guidance Value:
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min={1000000}
                  max={30000000}
                  step={500000}
                  value={propertyValueInput}
                  onChange={(e) => setPropertyValueInput(Number(e.target.value))}
                  className="w-full accent-amber-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
                />
                <span className="font-mono text-sm sm:text-base font-bold text-amber-400 whitespace-nowrap">
                  ₹ {(propertyValueInput / 100000).toFixed(1)} Lakhs
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Computes 5% basic stamp duty + 10% cess/surcharge on duty + 1% registration charges.
              </p>
            </div>

            <div className="lg:col-span-5 bg-white/5 p-4 rounded-2xl border border-white/10 space-y-2 text-xs">
              <div className="flex justify-between text-slate-300">
                <span>Stamp Duty (5%):</span>
                <span className="font-mono font-bold text-white">₹ {stampDuty.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Cess & Surcharge (10% of Duty):</span>
                <span className="font-mono font-bold text-white">₹ {cessSurcharge.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Registration Fee (1%):</span>
                <span className="font-mono font-bold text-white">₹ {regFee.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-sm font-black text-amber-400 pt-2 border-t border-white/10">
                <span>Total Statutory Charges:</span>
                <span className="font-mono">₹ {totalGovtCharges.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>
        </div>

        {/* EXPANDED VERIFIED PROPERTY LISTINGS */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-extrabold text-bm-navy">
              Verified Properties & Land Parcels ({REAL_ESTATE_INSIGHTS.length})
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {REAL_ESTATE_INSIGHTS.map((prop) => (
              <div
                key={prop.id}
                className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-xs hover:shadow-xl transition-all space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-sky-700 bg-sky-50 px-2.5 py-1 rounded-md">
                      {prop.type}
                    </span>
                    <span className="font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-md flex items-center gap-1">
                      <TrendingUp className="w-3.5 h-3.5" /> +{prop.oneYearGrowthForecast}% Growth
                    </span>
                  </div>

                  <div>
                    <h4 className="text-base font-extrabold text-slate-900 leading-snug">
                      {prop.title}
                    </h4>
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1">
                      <MapPin className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      <span className="truncate">{prop.location}</span>
                    </div>
                  </div>

                  {/* 3-Way Valuation Matrix */}
                  <div className="grid grid-cols-3 gap-2 bg-slate-50 p-3 rounded-2xl border border-slate-100 text-center">
                    <div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase">Guidance</div>
                      <div className="text-xs sm:text-sm font-extrabold text-slate-700 mt-0.5">
                        ₹{prop.govtGuidanceValue}
                      </div>
                    </div>
                    <div className="border-x border-slate-200">
                      <div className="text-[10px] font-bold text-slate-400 uppercase">Reg Avg</div>
                      <div className="text-xs sm:text-sm font-extrabold text-slate-900 mt-0.5">
                        ₹{prop.registeredTransactionAverage}
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] font-bold text-blue-600 uppercase">Market</div>
                      <div className="text-xs sm:text-sm font-extrabold text-blue-700 mt-0.5">
                        ₹{prop.fairMarketValue}
                      </div>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="space-y-1 pt-1">
                    {prop.features.slice(0, 2).map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-1.5 text-xs text-slate-600">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-slate-700">{prop.khataType}</span>
                  <button
                    onClick={() => onOpenEnquiry(`Legal & Valuation Report for ${prop.title}`)}
                    className="inline-flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-3.5 py-2 rounded-xl shadow-xs transition-all"
                  >
                    <span>Title Verification</span>
                    <ArrowRight className="w-3 h-3" />
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
