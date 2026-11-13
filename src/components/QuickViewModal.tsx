import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PlatformModule } from '../data/modulesData';
import { X, CheckCircle2, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

interface QuickViewModalProps {
  module: PlatformModule | null;
  onClose: () => void;
  onEnquire: (moduleTitle: string) => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({ module, onClose, onEnquire }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (module) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [module, onClose]);

  if (!module) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl z-10 border border-slate-100 animate-scale-in">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/80 hover:bg-white text-slate-700 flex items-center justify-center shadow-md transition-all active:scale-95"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero image banner */}
        <div className="relative h-56 sm:h-64 bg-slate-100 overflow-hidden">
          <img 
            src={module.image} 
            alt={module.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent"></div>
          
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="bg-blue-600 text-white font-mono text-xs font-bold px-2 py-0.5 rounded">
                Module {module.number}
              </span>
              <span className="bg-amber-400 text-slate-950 text-xs font-bold px-2 py-0.5 rounded">
                {module.badge}
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold leading-snug">
              {module.title}
            </h3>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6">
          <p className="text-sm text-slate-600 leading-relaxed">
            {module.fullDesc}
          </p>

          {/* Key Deliverables & Features */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>Core Architectural Highlights</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {module.features.map((f, i) => (
                <div key={i} className="flex items-center gap-2.5 text-xs text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span className="font-medium">{f}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Trust Banner */}
          <div className="flex items-center gap-2.5 text-xs text-slate-500 bg-blue-50/50 p-3 rounded-xl border border-blue-100/60">
            <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
            <span>All procurement & services covered under BuildMitra verified quality and escrow framework.</span>
          </div>

          {/* Action Footer */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-end gap-3 border-t border-slate-100">
            <button
              onClick={() => {
                onClose();
                onEnquire(module.title);
              }}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-colors"
            >
              Request Quick Consultation
            </button>

            <Link
              to={module.route}
              onClick={onClose}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition-all active:scale-95"
            >
              <span>Explore Dedicated Page</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
};
