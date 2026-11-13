import React, { useState, useEffect } from 'react';
import { EngineeringCalculator } from '../data/calculatorsData';
import { X, Calculator, Plus, Check, FileSpreadsheet, Info, Sparkles } from 'lucide-react';

interface CalculatorModalProps {
  calculator: EngineeringCalculator | null;
  onClose: () => void;
  onAddToBOQ: (items: any[]) => void;
}

export const CalculatorModal: React.FC<CalculatorModalProps> = ({ calculator, onClose, onAddToBOQ }) => {
  const [inputs, setInputs] = useState<Record<string, any>>({});
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (calculator) {
      const defaults: Record<string, any> = {};
      calculator.fields.forEach((f) => {
        defaults[f.id] = f.defaultValue;
      });
      setInputs(defaults);
      setAdded(false);
    }
  }, [calculator]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (calculator) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [calculator, onClose]);

  if (!calculator) return null;

  const handleInputChange = (id: string, value: any) => {
    setInputs((prev) => ({ ...prev, [id]: value }));
    setAdded(false);
  };

  // Compute live calculation
  const calcResult = calculator.calculate(inputs);

  const handleAddBOQ = () => {
    onAddToBOQ(calcResult.boqItems);
    setAdded(true);
    setTimeout(() => setAdded(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-950/75 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative bg-white rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl z-10 border border-slate-100 flex flex-col max-h-[90vh] animate-scale-in">
        
        {/* Header */}
        <div className="p-6 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                  Tool #{calculator.number}
                </span>
                <span className="text-xs text-slate-500 font-medium">
                  {calculator.isStandard}
                </span>
              </div>
              <h3 className="text-lg font-extrabold text-bm-navy">
                {calculator.title}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close modal"
            className="w-9 h-9 rounded-full bg-white hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors shadow-sm"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            {calculator.description}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            
            {/* Input Controls Form */}
            <div className="md:col-span-6 space-y-4 bg-slate-50 p-5 rounded-2xl border border-slate-200/80">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-2 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                <span>Input Parameters</span>
              </h4>

              {calculator.fields.map((field) => (
                <div key={field.id} className="space-y-1">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                    <label htmlFor={field.id}>{field.label}</label>
                    {field.unit && <span className="text-slate-400 font-normal">({field.unit})</span>}
                  </div>

                  {field.type === 'select' ? (
                    <select
                      id={field.id}
                      value={inputs[field.id] || field.defaultValue}
                      onChange={(e) => handleInputChange(field.id, e.target.value)}
                      className="w-full px-3 py-2 bg-white rounded-xl border border-slate-300 text-xs sm:text-sm font-medium focus:outline-none focus:border-blue-500"
                    >
                      {field.options?.map((opt) => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type="number"
                      id={field.id}
                      step={field.step || 1}
                      min={field.min}
                      max={field.max}
                      value={inputs[field.id] ?? field.defaultValue}
                      onChange={(e) => handleInputChange(field.id, e.target.value)}
                      className="w-full px-3 py-2 bg-white rounded-xl border border-slate-300 text-xs sm:text-sm font-semibold focus:outline-none focus:border-blue-500"
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Live Calculation Output Card */}
            <div className="md:col-span-6 space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-2 flex items-center gap-1.5">
                <span>Real-Time Estimation Breakdown</span>
              </h4>

              {/* Highlight Output Box */}
              <div className="bg-gradient-to-br from-blue-600 to-blue-800 text-white p-5 rounded-2xl shadow-lg space-y-3">
                <div className="text-xs font-medium text-blue-100 uppercase tracking-wider">
                  Estimated Total Material & Laying Cost
                </div>
                <div className="text-3xl sm:text-4xl font-black tracking-tight">
                  ₹ {calcResult.estimatedCost.toLocaleString('en-IN')}
                </div>
                <div className="text-[11px] text-blue-100 flex items-center gap-1">
                  <span>Based on today’s active yard rates</span>
                </div>
              </div>

              {/* Results Matrix */}
              <div className="grid grid-cols-2 gap-2.5">
                {calcResult.results.map((res, i) => (
                  <div 
                    key={i} 
                    className={`p-3 rounded-xl border ${
                      res.highlight 
                        ? 'bg-amber-50/70 border-amber-200 text-slate-900' 
                        : 'bg-white border-slate-200 text-slate-800'
                    }`}
                  >
                    <div className="text-[11px] text-slate-500 truncate">{res.label}</div>
                    <div className="text-base font-extrabold mt-0.5">
                      {res.value} <span className="text-xs font-normal text-slate-500">{res.unit}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Notes */}
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-[11px] text-slate-600 space-y-1">
                <div className="font-bold flex items-center gap-1 text-slate-700">
                  <Info className="w-3.5 h-3.5 text-blue-600" />
                  <span>Engineering Notes:</span>
                </div>
                {calcResult.notes.map((note, idx) => (
                  <p key={idx}>• {note}</p>
                ))}
              </div>

            </div>

          </div>

        </div>

        {/* Footer with BOQ Action */}
        <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-slate-500 flex items-center gap-1.5">
            <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
            <span>Adds quantity lines to your project Bill of Quantities</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900"
            >
              Close
            </button>

            <button
              onClick={handleAddBOQ}
              className={`flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold shadow-md transition-all ${
                added 
                  ? 'bg-emerald-600 text-white' 
                  : 'bg-blue-600 hover:bg-blue-700 text-white active:scale-95'
              }`}
            >
              {added ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Added to Project BOQ!</span>
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  <span>Add to Dynamic BOQ</span>
                </>
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
