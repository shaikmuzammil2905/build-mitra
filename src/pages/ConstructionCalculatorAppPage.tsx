import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ALL_19_CALCULATORS, EngineeringCalculator } from '../data/calculatorsData';
import { CalculatorModal } from '../components/CalculatorModal';
import { 
  ArrowLeft, 
  Calculator, 
  Layers, 
  ShieldCheck, 
  ChevronRight, 
  Sparkles,
  Hammer,
  HelpCircle,
  FileSpreadsheet
} from 'lucide-react';

export const ConstructionCalculatorAppPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'all' | 'estimator'>('all');
  const [activeCalculator, setActiveCalculator] = useState<EngineeringCalculator | null>(null);

  // Turnkey Estimator state
  const [area, setArea] = useState<number>(1200);
  const [materialGrade, setMaterialGrade] = useState<'Standard' | 'Premium' | 'Luxury'>('Standard');

  const gradeRates = {
    Standard: 1500,
    Premium: 1850,
    Luxury: 2300
  };

  const currentRate = gradeRates[materialGrade];
  const totalCost = area * currentRate;

  const civilBreakdown = [
    { name: 'Cement & Concrete', pct: 16.4, cost: Math.round(totalCost * 0.164) },
    { name: 'Steel Reinforcement (TMT)', pct: 24.6, cost: Math.round(totalCost * 0.246) },
    { name: 'Sand & Aggregates', pct: 12.3, cost: Math.round(totalCost * 0.123) },
    { name: 'Bricks & Masonry Blocks', pct: 10.2, cost: Math.round(totalCost * 0.102) },
    { name: 'Labour & Masonry Execution', pct: 22.5, cost: Math.round(totalCost * 0.225) },
    { name: 'Plumbing, Electrical & Paint', pct: 14.0, cost: Math.round(totalCost * 0.14) }
  ];

  // The 19 Calculators matching image copy 25.png
  const CALCULATOR_GRID_ITEMS = [
    { title: 'Concrete Calculator', calcId: 'concrete', emoji: '🧱', category: 'Civil' },
    { title: 'Steel Calculator', calcId: 'steel', emoji: '🔩', category: 'Structural' },
    { title: 'Tile Calculator', calcId: 'tile', emoji: '📐', category: 'Finishes' },
    { title: 'Paint Calculator', calcId: 'paint', emoji: '🎨', category: 'Finishes' },
    { title: 'Plaster Calculator', calcId: 'plastering', emoji: '🧱', category: 'Civil' },
    { title: 'Brick Work', calcId: 'brickwork', emoji: '🧱', category: 'Masonry' },
    { title: 'RCC Slab', calcId: 'structural', emoji: '🏗️', category: 'Structural' },
    { title: 'RCC + Steel + Blockwork', calcId: 'blockwork', emoji: '🏢', category: 'Comprehensive' },
    { title: 'Column Calculator', calcId: 'structural', emoji: '🏛️', category: 'Structural' },
    { title: 'Beam Calculator', calcId: 'structural', emoji: '📐', category: 'Structural' },
    { title: 'Footing Calculator', calcId: 'excavation', emoji: '🔻', category: 'Foundation' },
    { title: 'Staircase', calcId: 'shuttering', emoji: '🪜', category: 'Civil' },
    { title: 'Water Tank', calcId: 'water-tank', emoji: '💧', category: 'MEP' },
    { title: 'Septic Tank', calcId: 'plumbing', emoji: '🧪', category: 'Sanitary' },
    { title: 'Retaining Wall', calcId: 'boundary-wall', emoji: '🧱', category: 'Earthwork' },
    { title: 'Roof Truss', calcId: 'roofing', emoji: '🏠', category: 'Fabrication' },
    { title: 'Pile Foundation', calcId: 'excavation', emoji: '⛏️', category: 'Geotechnical' },
    { title: 'Lintel', calcId: 'structural', emoji: '📏', category: 'Structural' },
    { title: 'Land Survey Calculator', calcId: 'excavation', emoji: '🗺️', category: 'Surveying' }
  ];

  const handleOpenCalc = (calcId: string) => {
    const found = ALL_19_CALCULATORS.find(c => c.id === calcId) || ALL_19_CALCULATORS[0];
    setActiveCalculator(found);
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-28 max-w-md sm:max-w-2xl lg:max-w-4xl mx-auto pt-0">
      
      {/* Top Header (Matching image copy 25.png) */}
      <div className="bg-white border-b border-slate-100 px-4 py-3 sticky top-14 sm:top-16 z-20 flex items-center justify-between shadow-2xs">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => navigate(-1)} 
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-blue-700 text-xs font-bold transition-colors shadow-2xs active:scale-95"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back</span>
          </button>
          <h1 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
            Calculators
          </h1>
        </div>

        {/* Tab switch between 19 Grid and Area Estimator */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'all' ? 'bg-white text-blue-700 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All 19
          </button>
          <button
            onClick={() => setActiveTab('estimator')}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'estimator' ? 'bg-white text-blue-700 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Turnkey
          </button>
        </div>
      </div>

      <div className="p-3.5 sm:p-6 space-y-5">

        {/* TAB 1: THE 19 CALCULATORS 3-COLUMN GRID (Exact Match to image copy 25.png) */}
        {activeTab === 'all' && (
          <div className="space-y-4">
            
            <div className="bg-blue-50 border border-blue-200/80 rounded-2xl p-3 flex items-center justify-between text-xs text-blue-800">
              <span className="font-semibold">Tap any tool to calculate civil materials & export BOQ</span>
              <span className="font-bold bg-blue-600 text-white px-2 py-0.5 rounded-full text-[10px]">IS 456 Standards</span>
            </div>

            {/* 3-Column Grid per image copy 25.png */}
            <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-3 gap-2.5 sm:gap-3.5">
              {CALCULATOR_GRID_ITEMS.map((item, index) => (
                <button
                  key={`${item.title}-${index}`}
                  onClick={() => handleOpenCalc(item.calcId)}
                  className="bg-white rounded-2xl p-3 sm:p-4 border border-slate-200/80 shadow-2xs hover:shadow-md hover:border-blue-400 flex flex-col items-center text-center justify-center min-h-[105px] sm:min-h-[120px] transition-all group active:scale-95"
                >
                  <div className="text-2xl sm:text-3xl mb-1.5 transition-transform duration-200 group-hover:scale-110">
                    {item.emoji}
                  </div>
                  <span className="text-[11px] sm:text-xs font-black text-slate-800 group-hover:text-blue-700 leading-tight">
                    {item.title}
                  </span>
                </button>
              ))}
            </div>

            {/* Buyer Module Banner (Matching bottom of image copy 25.png) */}
            <div className="bg-gradient-to-r from-red-950 via-rose-950 to-slate-950 text-white rounded-3xl p-5 shadow-lg border border-rose-900/40 relative overflow-hidden mt-6">
              <div className="relative z-10 space-y-1.5">
                <span className="text-[10px] font-black uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  BUILDMITRA • BUYER MODULE
                </span>
                <h3 className="text-lg font-black text-white">
                  Buyer Dashboard
                </h3>
                <p className="text-xs text-rose-200">
                  Welcome, Buyer • Tap to manage procurement, BOQs, reverse auction bids & milestone escrow.
                </p>
                <div className="pt-2">
                  <Link
                    to="/calculator"
                    className="inline-flex items-center gap-1 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs px-4 py-2 rounded-full shadow-xs transition-colors"
                  >
                    <span>Open Full Engineering BOQ</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: TURNKEY HOUSE COST ESTIMATOR */}
        {activeTab === 'estimator' && (
          <div className="space-y-4">
            
            {/* House Quote Card */}
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
            </div>

            {/* Form Inputs */}
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

            {/* Primary CTA Button */}
            <Link 
              to="/services/construction"
              className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold py-3.5 rounded-2xl shadow-md text-sm flex items-center justify-center gap-2 transition-all active:scale-95"
            >
              <Hammer className="w-4 h-4" />
              <span>Book Construction Service</span>
            </Link>

          </div>
        )}

      </div>

      {/* Interactive Calculator Modal for all 19 Tools */}
      <CalculatorModal 
        calculator={activeCalculator}
        onClose={() => setActiveCalculator(null)}
        onAddToBOQ={() => {
          setActiveCalculator(null);
        }}
      />

    </div>
  );
};

export default ConstructionCalculatorAppPage;