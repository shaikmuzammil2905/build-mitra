import React, { useState } from 'react';
import { FLOOR_PLANS_CATALOG, FloorPlan } from '../data/floorPlansData';
import { 
  Building2, 
  Compass, 
  CheckCircle2, 
  ArrowRight, 
  Layers, 
  Ruler, 
  Eye, 
  Sparkles,
  Download,
  Box,
  FileSpreadsheet
} from 'lucide-react';

interface FloorPlansPageProps {
  onOpenEnquiry: (topic?: string) => void;
}

export const FloorPlansPage: React.FC<FloorPlansPageProps> = ({ onOpenEnquiry }) => {
  const [selectedPlan, setSelectedPlan] = useState<FloorPlan>(FLOOR_PLANS_CATALOG[0]);

  return (
    <div className="pt-16 sm:pt-20 pb-20 bg-slate-50 min-h-screen">
      
      {/* DESKTOP ONLY Page Header - REMOVED ON MOBILE per image copy 8.png */}
      <div className="hidden md:block bg-bm-navy text-white py-12 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/20 text-red-300 text-xs font-bold uppercase tracking-wider">
              <Building2 className="w-3.5 h-3.5" />
              <span>Module 06 • Architectural Studio & CAD Plans</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              2D/3D Drawing Studio & Floor Plans
            </h1>
            <p className="text-sm text-slate-300 leading-relaxed">
              Explore 100% Vastu-compliant architectural floor plans with CAD dimensions, photorealistic 3D cutaways, structural column schedules, and accurate turnkey construction budgets.
            </p>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-80 h-80 bg-red-500/10 rounded-full blur-3xl pointer-events-none"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 space-y-8">
        
        {/* Main Floor Plan Showcase Card */}
        <div className="bg-white rounded-3xl p-5 sm:p-8 shadow-sm border border-slate-200/90 space-y-6">
          
          {/* Top Bar with Plan Selector Tabs */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-200">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-red-600">
                Architectural Plan Showcase
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-bm-navy mt-0.5">
                {selectedPlan.title}
              </h2>
            </div>

            {/* Plan Switcher Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              {FLOOR_PLANS_CATALOG.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setSelectedPlan(p)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                    selectedPlan.id === p.id
                      ? 'bg-red-600 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {p.type}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Visual Blueprint & 3D Render Area */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Visual Box */}
            <div className="lg:col-span-7 space-y-4">
              <div className="relative h-72 sm:h-96 rounded-2xl overflow-hidden border border-slate-200 bg-slate-900 group shadow-md">
                <img 
                  src="/assets/floor-plans.jpg" 
                  alt={selectedPlan.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                
                <div className="absolute top-4 left-4 bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-lg text-white text-xs font-mono border border-white/10">
                  <span>{selectedPlan.plotDimensions}</span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 bg-slate-950/85 backdrop-blur-md p-3.5 rounded-xl text-white text-xs flex items-center justify-between border border-white/10">
                  <div className="flex items-center gap-2">
                    <Compass className="w-4 h-4 text-amber-400" />
                    <span>{selectedPlan.facing}</span>
                  </div>
                  <div className="font-mono text-emerald-400 font-bold">
                    {selectedPlan.builtUpArea} Sq.Ft Built-up
                  </div>
                </div>
              </div>

              {/* Cost & Specifications Bar */}
              <div className="grid grid-cols-3 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200 text-center">
                <div>
                  <div className="text-[11px] text-slate-500 uppercase font-semibold">Storeys</div>
                  <div className="text-xs sm:text-sm font-bold text-slate-900 mt-0.5">{selectedPlan.floors}</div>
                </div>
                <div className="border-x border-slate-200">
                  <div className="text-[11px] text-slate-500 uppercase font-semibold">Rate / Sq.Ft</div>
                  <div className="text-xs sm:text-sm font-bold text-slate-900 mt-0.5">₹ {selectedPlan.estCostPerSqft}</div>
                </div>
                <div>
                  <div className="text-[11px] text-emerald-600 uppercase font-bold">Turnkey Budget</div>
                  <div className="text-sm sm:text-base font-extrabold text-emerald-700 mt-0.5">{selectedPlan.estCostTurnkey}</div>
                </div>
              </div>

              {/* Material Quantity Estimation Schedule */}
              <div className="bg-gradient-to-br from-slate-50 to-blue-50/40 p-4 rounded-2xl border border-blue-100/80 space-y-2">
                <div className="text-xs font-extrabold text-slate-900 flex items-center gap-1.5">
                  <FileSpreadsheet className="w-4 h-4 text-blue-600" />
                  <span>Estimated Structural Materials for this Design</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
                  <div className="bg-white p-2.5 rounded-xl border border-slate-200">
                    <div className="text-[10px] text-slate-400 uppercase font-bold">Cement</div>
                    <div className="font-mono font-black text-slate-900 text-sm mt-0.5">{selectedPlan.materialEstimates.cementBags} Bags</div>
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-slate-200">
                    <div className="text-[10px] text-slate-400 uppercase font-bold">Steel Rebars</div>
                    <div className="font-mono font-black text-slate-900 text-sm mt-0.5">{selectedPlan.materialEstimates.steelTons} MT</div>
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-slate-200">
                    <div className="text-[10px] text-slate-400 uppercase font-bold">M-Sand</div>
                    <div className="font-mono font-black text-slate-900 text-sm mt-0.5">{selectedPlan.materialEstimates.sandTons} Tons</div>
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-slate-200">
                    <div className="text-[10px] text-slate-400 uppercase font-bold">Bricks/Blocks</div>
                    <div className="font-mono font-black text-slate-900 text-sm mt-0.5">{selectedPlan.materialEstimates.bricksCount} Pcs</div>
                  </div>
                </div>
              </div>

            </div>

            {/* Room Dimensions & Vastu Schedule */}
            <div className="lg:col-span-5 space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <Ruler className="w-4 h-4 text-red-600" />
                <span>Room Dimensions & Vastu Alignment</span>
              </h3>

              <div className="divide-y divide-slate-100 rounded-2xl border border-slate-200 overflow-hidden bg-slate-50 max-h-72 overflow-y-auto">
                {selectedPlan.rooms.map((rm, idx) => (
                  <div key={idx} className="p-3 flex items-center justify-between text-xs hover:bg-white transition-colors">
                    <div>
                      <div className="font-bold text-slate-900">{rm.name}</div>
                      <div className="text-[11px] text-slate-500 font-mono">{rm.size}</div>
                    </div>
                    <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                      {rm.vastuDirection}
                    </span>
                  </div>
                ))}
              </div>

              {/* Plan Features */}
              <div className="space-y-1.5 pt-1">
                {selectedPlan.features.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-slate-600">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => onOpenEnquiry(`Consultation for ${selectedPlan.title}`)}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold text-xs py-3 px-4 rounded-xl shadow-md transition-all active:scale-95 flex items-center justify-center gap-2"
                >
                  <span>Book Architect Consultation</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => onOpenEnquiry(`Download CAD PDF for ${selectedPlan.title}`)}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs py-3 px-4 rounded-xl transition-colors flex items-center justify-center gap-1.5"
                >
                  <Download className="w-4 h-4" />
                  <span>CAD PDF</span>
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
