import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Calculator, 
  Layers, 
  ShieldCheck, 
  ChevronRight, 
  Sparkles,
  CheckCircle,
  HelpCircle,
  Hammer
} from 'lucide-react';

export const ConstructionCalculatorAppPage: React.FC = () => {
  const navigate = useNavigate();
  const [area, setArea] = useState<number>(1200);
  const [materialGrade, setMaterialGrade] = useState<'Standard' | 'Premium' | 'Luxury'>('Standard');

  const gradeRates = {
    Standard: 1500,
    Premium: 1850,
    Luxury: 2300
  };

  const currentRate = gradeRates[materialGrade];
  const totalCost = area * currentRate;

  // Percentage cost breakdown
  const civilBreakdown = [
    { name: 'Cement & Concrete', pct: 16.4, cost: Math.round(totalCost * 0.164) },
    { name: 'Steel Reinforcement (TMT)', pct: 24.6, cost: Math.round(totalCost * 0.246) },
    { name: 'Sand & Aggregates', pct: 12.3, cost: Math.round(totalCost * 0.123) },
    { name: 'Bricks & Masonry Blocks', pct: 10.2, cost: Math.round(totalCost * 0.102) },
    { name: 'Labour & Masonry Execution', pct: 22.5, cost: Math.round(totalCost * 0.225) },
    { name: 'Plumbing, Electrical & Paint', pct: 14.0, cost: Math.round(totalCost * 0.14) }
  ];

  return (
    <div className="min-h-screen bg-slate-50 pb-24 max-w-md mx-auto pt-0">
      {/* Top Header */}
      <div className="bg-white border-b border-slate-100 px-4 py-3 sticky top-14 sm:top-16 z-20 flex items-center justify-between shadow-2xs">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => navigate(-1)} 
            className="p-1.5 rounded-full hover:bg-slate-100 text-slate-700 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-lg font-bold text-slate-900">Cost Calculator</h1>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* House Illustration & Dynamic Quote Card (Screen 12 Reference) */}
        <div className="bg-gradient-to-br from-blue-900 via-indigo-900 to-slate-900 text-white rounded-3xl p-5 shadow-lg relative overflow-hidden">
          <div className="relative z-10">
            <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider block mb-1">
              Estimated Construction Cost
            </span>
            <div className="text-3xl font-black text-white">
              ₹{totalCost.toLocaleString('en-IN')}
            </div>
            <p className="text-xs text-blue-200 mt-1">
              Based on {area} sq.ft @ ₹{currentRate}/sq.ft ({materialGrade} Grade)
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-blue-100 relative z-10">
            <div className="flex items-center gap-1">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>IS 456 Compliant</span>
            </div>
            <span>Turnkey Handover: ~6 Months</span>
          </div>

          <div className="absolute -right-8 -bottom-8 w-36 h-36 bg-blue-500/20 rounded-full blur-2xl"></div>
        </div>

        {/* Form Inputs (Screen 12) */}
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-xs space-y-4">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-slate-800">Plot / Built-up Area (sq.ft)</label>
              <span className="text-xs font-black text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">{area} sq.ft</span>
            </div>
            <input 
              type="range" 
              min={500} 
              max={5000} 
              step={50}
              value={area}
              onChange={(e) => setArea(Number(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              <span>500 sq.ft</span>
              <span>2,500 sq.ft</span>
              <span>5,000 sq.ft</span>
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-800 block mb-2">Material Quality Grade</label>
            <div className="grid grid-cols-3 gap-2">
              {(['Standard', 'Premium', 'Luxury'] as const).map((grade) => (
                <button
                  key={grade}
                  onClick={() => setMaterialGrade(grade)}
                  className={`py-2 px-2 rounded-xl text-xs font-bold border transition-all text-center ${
                    materialGrade === grade
                      ? 'border-blue-600 bg-blue-50 text-blue-700 ring-2 ring-blue-500/20'
                      : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <div>{grade}</div>
                  <div className="text-[10px] text-slate-500 font-normal">₹{gradeRates[grade]}/sq.ft</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Detailed Material & Labour Breakdown */}
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-xs">
          <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3">
            Estimated Material & Labour Breakdown
          </h3>

          <div className="space-y-2.5">
            {civilBreakdown.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                  <span className="text-slate-700">{item.name}</span>
                </div>
                <div className="text-right">
                  <span className="font-bold text-slate-900">₹{item.cost.toLocaleString('en-IN')}</span>
                  <span className="text-[10px] text-slate-400 ml-1">({item.pct}%)</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Primary CTA Button (Screen 12) */}
        <Link 
          to="/services/construction"
          className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold py-3.5 rounded-2xl shadow-md text-sm flex items-center justify-center gap-2 transition-all active:scale-95"
        >
          <Hammer className="w-4 h-4" />
          <span>Book Construction Service</span>
        </Link>
      </div>
    </div>
  );
};
export default ConstructionCalculatorAppPage;
