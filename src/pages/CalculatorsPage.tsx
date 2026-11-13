import React, { useState } from 'react';
import { ALL_19_CALCULATORS, EngineeringCalculator } from '../data/calculatorsData';
import { 
  Calculator, 
  Layers, 
  Maximize2, 
  Grid, 
  Droplets, 
  Box, 
  Columns, 
  Zap, 
  Wrench, 
  Paintbrush, 
  Shovel, 
  Sun, 
  Wind, 
  Home, 
  Shield, 
  Compass, 
  Search,
  FileSpreadsheet,
  ArrowRight,
  Sparkles
} from 'lucide-react';

interface CalculatorsPageProps {
  onOpenCalculator: (calc: EngineeringCalculator) => void;
  onOpenBOQ: () => void;
}

export const CalculatorsPage: React.FC<CalculatorsPageProps> = ({ onOpenCalculator, onOpenBOQ }) => {
  const [selectedCat, setSelectedCat] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Structural', 'Finishes', 'MEP', 'Site & Civils', 'Specialized'];

  const filtered = ALL_19_CALCULATORS.filter((c) => {
    const matchesCat = selectedCat === 'All' || c.category === selectedCat;
    const matchesQuery = !searchQuery || 
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      c.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.isStandard.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  const getIcon = (id: string) => {
    switch (id) {
      case 'concrete': return <Layers className="w-5 h-5 text-blue-600" />;
      case 'steel': return <Maximize2 className="w-5 h-5 text-indigo-600" />;
      case 'tile': return <Grid className="w-5 h-5 text-emerald-600" />;
      case 'paint': return <Droplets className="w-5 h-5 text-amber-600" />;
      case 'blockwork': return <Box className="w-5 h-5 text-purple-600" />;
      case 'brickwork': return <Box className="w-5 h-5 text-red-600" />;
      case 'structural': return <Columns className="w-5 h-5 text-rose-600" />;
      case 'electrical': return <Zap className="w-5 h-5 text-yellow-500" />;
      case 'plumbing': return <Wrench className="w-5 h-5 text-teal-600" />;
      case 'plastering': return <Paintbrush className="w-5 h-5 text-amber-700" />;
      case 'excavation': return <Shovel className="w-5 h-5 text-orange-600" />;
      case 'flooring': return <Maximize2 className="w-5 h-5 text-lime-600" />;
      case 'water-tank': return <Droplets className="w-5 h-5 text-cyan-600" />;
      case 'roofing': return <Home className="w-5 h-5 text-red-500" />;
      case 'shuttering': return <Shield className="w-5 h-5 text-blue-800" />;
      case 'asphalt': return <Compass className="w-5 h-5 text-slate-700" />;
      case 'solar': return <Sun className="w-5 h-5 text-yellow-500" />;
      case 'hvac': return <Wind className="w-5 h-5 text-sky-500" />;
      default: return <Calculator className="w-5 h-5 text-blue-600" />;
    }
  };

  return (
    <div className="pt-24 pb-20 bg-slate-50 min-h-screen">
      
      {/* Page Header */}
      <div className="hidden md:block bg-bm-navy text-white py-14 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold uppercase tracking-wider">
              <Calculator className="w-3.5 h-3.5" />
              <span>Module 07 • IS Code Engineering Dashboard</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              19 Engineering Calculators & Dynamic BOQ
            </h1>
            <p className="text-base text-slate-300 leading-relaxed">
              Standardized formulas compliant with Bureau of Indian Standards (IS 456, IS 1786, IS 1200, IS 732, IS 15778). Input dimensions to compute material quantities, labor costs, and export an instant project Bill of Quantities.
            </p>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-2 md:-mt-6 relative z-20 space-y-8">
        
        {/* Dynamic BOQ Alert Banner */}
        <div className="bg-gradient-to-r from-bm-navy via-slate-900 to-blue-950 text-white rounded-3xl p-6 sm:p-7 shadow-xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center shrink-0 shadow-md">
              <FileSpreadsheet className="w-7 h-7" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                Project Estimation Suite
              </span>
              <h3 className="text-xl font-extrabold text-white">
                Consolidated Dynamic BOQ Engine
              </h3>
              <p className="text-xs text-slate-300 mt-0.5">
                Calculate any civil item below, click "Add to BOQ", and download a standardized Excel or PDF bill.
              </p>
            </div>
          </div>

          <button
            onClick={onOpenBOQ}
            className="w-full md:w-auto bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs py-3 px-6 rounded-xl shadow-md transition-all shrink-0 flex items-center justify-center gap-2 active:scale-95"
          >
            <span>Open Dynamic BOQ</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Filter and Search Bar */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-lg border border-slate-200/90 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCat(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  selectedCat === cat
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search calculator (e.g. steel, tile)..."
              className="w-full pl-9 pr-4 py-2 bg-slate-50 rounded-xl border border-slate-200 text-xs sm:text-sm font-medium focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        {/* 19 Calculators Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((calc) => (
            <div
              key={calc.id}
              className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="space-y-4">
                
                {/* Header */}
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-xl bg-slate-50 group-hover:bg-blue-50 flex items-center justify-center transition-colors">
                      {getIcon(calc.id)}
                    </div>
                    <span className="font-mono font-bold text-slate-500 text-xs">
                      #{calc.number}
                    </span>
                  </div>

                  <span className="font-bold text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-md text-[11px]">
                    {calc.category}
                  </span>
                </div>

                {/* Title & Standard */}
                <div>
                  <h3 className="text-lg font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
                    {calc.title}
                  </h3>
                  <div className="text-[11px] text-blue-600 font-mono mt-1 font-semibold">
                    {calc.isStandard}
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                  {calc.description}
                </p>

                {/* Input Fields Sample */}
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-[11px] text-slate-500 space-y-1">
                  <div className="font-bold text-slate-700">Configured Parameters:</div>
                  <div className="flex flex-wrap gap-1">
                    {calc.fields.map((f) => (
                      <span key={f.id} className="bg-white px-2 py-0.5 rounded border border-slate-200 text-slate-600">
                        {f.label}
                      </span>
                    ))}
                  </div>
                </div>

              </div>

              {/* Action Button */}
              <div className="pt-6">
                <button
                  onClick={() => onOpenCalculator(calc)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-3 px-4 rounded-xl shadow-md transition-all active:scale-95 flex items-center justify-center gap-2"
                >
                  <Calculator className="w-4 h-4" />
                  <span>Launch Calculator</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

