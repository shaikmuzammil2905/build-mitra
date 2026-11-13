import React from 'react';
import { Link } from 'react-router-dom';
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
  FileSpreadsheet, 
  ArrowRight,
  Sparkles
} from 'lucide-react';

interface EngineeringToolsGridProps {
  onOpenCalculator: (calc: EngineeringCalculator) => void;
  onOpenBOQ: () => void;
}

export const EngineeringToolsGrid: React.FC<EngineeringToolsGridProps> = ({ onOpenCalculator, onOpenBOQ }) => {
  // First 8 primary tools featured in the homepage grid matching screenshot
  const featuredTools = ALL_19_CALCULATORS.slice(0, 8);

  // Helper for icons
  const getToolIcon = (id: string) => {
    switch (id) {
      case 'concrete': return <Layers className="w-5 h-5 text-blue-600" />;
      case 'steel': return <Maximize2 className="w-5 h-5 text-indigo-600" />;
      case 'tile': return <Grid className="w-5 h-5 text-emerald-600" />;
      case 'paint': return <Droplets className="w-5 h-5 text-amber-600" />;
      case 'blockwork': return <Box className="w-5 h-5 text-purple-600" />;
      case 'structural': return <Columns className="w-5 h-5 text-red-600" />;
      case 'electrical': return <Zap className="w-5 h-5 text-yellow-500" />;
      case 'plumbing': return <Wrench className="w-5 h-5 text-teal-600" />;
      default: return <Calculator className="w-5 h-5 text-blue-600" />;
    }
  };

  return (
    <section className="py-20 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>Precision Civil Engineering Tools</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-bm-navy tracking-tight">
            Powerful Engineering Tools
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Design, Plan & Estimate with Precision — All 19 IS Code Calculators
          </p>
        </div>

        {/* Grid and Dynamic BOQ Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Left Grid: 8 Featured Calculator Buttons */}
          <div className="lg:col-span-9 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {featuredTools.map((calc) => (
              <button
                key={calc.id}
                onClick={() => onOpenCalculator(calc)}
                className="group bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md hover:border-blue-400 transition-all flex flex-col items-center text-center justify-between space-y-3 active:scale-95"
              >
                <div className="w-12 h-12 rounded-xl bg-slate-50 group-hover:bg-blue-50 flex items-center justify-center transition-colors">
                  {getToolIcon(calc.id)}
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-xs sm:text-sm group-hover:text-blue-600 transition-colors leading-snug">
                    {calc.title.split('&')[0].replace('Calculator', '').trim()}
                  </h3>
                  <span className="text-[11px] text-slate-400">Calculator</span>
                </div>
                <div className="text-[11px] font-bold text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">
                  Compute →
                </div>
              </button>
            ))}
          </div>

          {/* Right Banner: Dynamic BOQ Card */}
          <div className="lg:col-span-3 bg-gradient-to-br from-bm-navy via-slate-900 to-blue-950 text-white rounded-2xl p-6 flex flex-col justify-between shadow-lg relative overflow-hidden border border-slate-800">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl pointer-events-none"></div>

            <div className="space-y-4 relative z-10">
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-amber-400">
                <FileSpreadsheet className="w-6 h-6" />
              </div>

              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400">
                  Dynamic BOQ
                </span>
                <h3 className="text-xl font-extrabold text-white mt-1 leading-snug">
                  Download Instant PDF & Excel BOQ
                </h3>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                Generate project-ready Bills of Quantities with dynamic rate benchmarks, labor breakdown, and material quantities.
              </p>
            </div>

            <div className="pt-6 relative z-10 space-y-3">
              <button
                onClick={onOpenBOQ}
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs py-3 px-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
              >
                <span>Export Dynamic BOQ</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <Link
                to="/calculators"
                className="w-full bg-white/10 hover:bg-white/15 text-slate-200 font-semibold text-xs py-2.5 px-3 rounded-xl transition-all flex items-center justify-center gap-1.5"
              >
                <span>View All 19 Calculators</span>
              </Link>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
