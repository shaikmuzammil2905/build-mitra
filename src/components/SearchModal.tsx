import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MATERIALS_CATALOG } from '../data/materialsData';
import { HOME_SERVICES_CATALOG } from '../data/servicesData';
import { LABOUR_WORKFORCE } from '../data/labourData';
import { ALL_19_CALCULATORS } from '../data/calculatorsData';
import { FLOOR_PLANS_CATALOG } from '../data/floorPlansData';
import { REAL_ESTATE_INSIGHTS } from '../data/propertiesData';
import { 
  Search, 
  X, 
  Layers, 
  Hammer, 
  Users, 
  Calculator, 
  Building2, 
  MapPin, 
  ArrowRight 
} from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialQuery?: string;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, initialQuery = '' }) => {
  const [query, setQuery] = useState(initialQuery);
  const navigate = useNavigate();

  useEffect(() => {
    if (initialQuery) setQuery(initialQuery);
  }, [initialQuery]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const q = query.toLowerCase().trim();

  // Search matches
  const matchedMaterials = q ? MATERIALS_CATALOG.filter(m => 
    m.name.toLowerCase().includes(q) || 
    m.category.toLowerCase().includes(q) ||
    m.brand.toLowerCase().includes(q)
  ) : [];

  const matchedServices = q ? HOME_SERVICES_CATALOG.filter(s => 
    s.name.toLowerCase().includes(q) || 
    s.category.toLowerCase().includes(q) ||
    s.shortDesc.toLowerCase().includes(q)
  ) : [];

  const matchedLabour = q ? LABOUR_WORKFORCE.filter(l => 
    l.name.toLowerCase().includes(q) || 
    l.trade.toLowerCase().includes(q) ||
    l.city.toLowerCase().includes(q)
  ) : [];

  const matchedCalculators = q ? ALL_19_CALCULATORS.filter(c => 
    c.title.toLowerCase().includes(q) || 
    c.category.toLowerCase().includes(q) ||
    c.description.toLowerCase().includes(q)
  ) : [];

  const matchedFloorPlans = q ? FLOOR_PLANS_CATALOG.filter(p => 
    p.title.toLowerCase().includes(q) || 
    p.type.toLowerCase().includes(q) ||
    p.plotDimensions.toLowerCase().includes(q)
  ) : [];

  const matchedProperties = q ? REAL_ESTATE_INSIGHTS.filter(r => 
    r.title.toLowerCase().includes(q) || 
    r.location.toLowerCase().includes(q) ||
    r.subRegistrarZone.toLowerCase().includes(q)
  ) : [];

  const totalResults = matchedMaterials.length + matchedServices.length + matchedLabour.length + matchedCalculators.length + matchedFloorPlans.length + matchedProperties.length;

  const handleSelect = (path: string) => {
    onClose();
    navigate(path);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:p-6 pt-16 sm:pt-20 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-950/75 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />

      {/* Search Container */}
      <div className="relative bg-white rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl z-10 border border-slate-100 flex flex-col max-h-[85vh] animate-scale-in">
        
        {/* Search Input Bar */}
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center gap-3 bg-slate-50">
          <Search className="w-5 h-5 text-blue-600 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type to search materials, calculators, tradesmen, floor plans..."
            className="w-full bg-transparent text-slate-900 font-semibold text-sm sm:text-base focus:outline-none placeholder-slate-400"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-full text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="px-3 py-1.5 rounded-xl bg-white text-xs font-bold text-slate-600 hover:bg-slate-200 border border-slate-200"
          >
            Esc
          </button>
        </div>

        {/* Results Area */}
        <div className="p-6 overflow-y-auto space-y-6">
          {!q ? (
            <div className="py-8 text-center space-y-4 text-slate-400">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 mx-auto flex items-center justify-center">
                <Search className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-700">Explore the BuildMitra Ecosystem</h4>
                <p className="text-xs text-slate-500 mt-1">Try searching for "Cement", "TMT Steel", "Concrete Calculator", "Plumber", "Vastu Plan", or "Anjanapura".</p>
              </div>

              {/* Quick Suggestion Pills */}
              <div className="flex flex-wrap justify-center gap-2 pt-2">
                {['UltraTech Cement', 'Tata Tiscon', 'Concrete Calculator', 'Waterproofing', 'Master Mason', '30x40 Duplex', 'BDA Plot'].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="px-3 py-1.5 rounded-full bg-slate-100 hover:bg-blue-50 hover:text-blue-600 text-xs font-medium text-slate-600 transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          ) : totalResults === 0 ? (
            <div className="py-12 text-center text-slate-500">
              <p className="text-sm font-semibold">No direct results found for "{query}".</p>
              <p className="text-xs text-slate-400 mt-1">Please try alternative keywords or browse our core modules.</p>
            </div>
          ) : (
            <div className="space-y-6">
              
              {/* Materials */}
              {matchedMaterials.length > 0 && (
                <div className="space-y-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-blue-600 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5" />
                    <span>Materials Marketplace ({matchedMaterials.length})</span>
                  </div>
                  <div className="divide-y divide-slate-100 bg-slate-50 rounded-2xl overflow-hidden border border-slate-200/80">
                    {matchedMaterials.map((m) => (
                      <div 
                        key={m.id}
                        onClick={() => handleSelect(`/materials`)}
                        className="p-3.5 hover:bg-blue-50/50 cursor-pointer flex items-center justify-between transition-colors"
                      >
                        <div>
                          <div className="text-sm font-bold text-slate-900">{m.name}</div>
                          <div className="text-xs text-slate-500">{m.brand} • {m.gradeSpec}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-black text-slate-900">₹ {m.basePrice}</div>
                          <div className="text-[11px] text-slate-400">/ {m.unit}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Engineering Calculators */}
              {matchedCalculators.length > 0 && (
                <div className="space-y-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-indigo-600 flex items-center gap-1.5">
                    <Calculator className="w-3.5 h-3.5" />
                    <span>Engineering Calculators ({matchedCalculators.length})</span>
                  </div>
                  <div className="divide-y divide-slate-100 bg-slate-50 rounded-2xl overflow-hidden border border-slate-200/80">
                    {matchedCalculators.map((c) => (
                      <div 
                        key={c.id}
                        onClick={() => handleSelect(`/calculators`)}
                        className="p-3.5 hover:bg-indigo-50/50 cursor-pointer flex items-center justify-between transition-colors"
                      >
                        <div>
                          <div className="text-sm font-bold text-slate-900">{c.title}</div>
                          <div className="text-xs text-slate-500">{c.isStandard}</div>
                        </div>
                        <span className="text-xs font-bold text-indigo-600 flex items-center gap-1">
                          Open <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Services */}
              {matchedServices.length > 0 && (
                <div className="space-y-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-emerald-600 flex items-center gap-1.5">
                    <Hammer className="w-3.5 h-3.5" />
                    <span>Home & Civil Services ({matchedServices.length})</span>
                  </div>
                  <div className="divide-y divide-slate-100 bg-slate-50 rounded-2xl overflow-hidden border border-slate-200/80">
                    {matchedServices.map((s) => (
                      <div 
                        key={s.id}
                        onClick={() => handleSelect(`/services`)}
                        className="p-3.5 hover:bg-emerald-50/50 cursor-pointer flex items-center justify-between transition-colors"
                      >
                        <div>
                          <div className="text-sm font-bold text-slate-900">{s.name}</div>
                          <div className="text-xs text-slate-500">{s.shortDesc}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-xs font-bold text-emerald-600">{s.startingPrice}</div>
                          <div className="text-[11px] text-slate-400">{s.priceUnit}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Labour */}
              {matchedLabour.length > 0 && (
                <div className="space-y-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-amber-600 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5" />
                    <span>Labour Net Tradesmen ({matchedLabour.length})</span>
                  </div>
                  <div className="divide-y divide-slate-100 bg-slate-50 rounded-2xl overflow-hidden border border-slate-200/80">
                    {matchedLabour.map((l) => (
                      <div 
                        key={l.id}
                        onClick={() => handleSelect(`/labour`)}
                        className="p-3.5 hover:bg-amber-50/50 cursor-pointer flex items-center justify-between transition-colors"
                      >
                        <div>
                          <div className="text-sm font-bold text-slate-900">{l.name} ({l.trade})</div>
                          <div className="text-xs text-slate-500">{l.area} • {l.experienceYears} yrs exp</div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-bold text-slate-900">₹ {l.dailyWage}</div>
                          <div className="text-[11px] text-slate-400">/ {l.unit}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Floor Plans */}
              {matchedFloorPlans.length > 0 && (
                <div className="space-y-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-red-600 flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5" />
                    <span>Floor Plans ({matchedFloorPlans.length})</span>
                  </div>
                  <div className="divide-y divide-slate-100 bg-slate-50 rounded-2xl overflow-hidden border border-slate-200/80">
                    {matchedFloorPlans.map((p) => (
                      <div 
                        key={p.id}
                        onClick={() => handleSelect(`/floor-plans`)}
                        className="p-3.5 hover:bg-red-50/50 cursor-pointer flex items-center justify-between transition-colors"
                      >
                        <div>
                          <div className="text-sm font-bold text-slate-900">{p.title}</div>
                          <div className="text-xs text-slate-500">{p.plotDimensions} • {p.facing}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-xs font-bold text-red-600">{p.estCostTurnkey}</div>
                          <div className="text-[11px] text-slate-400">{p.builtUpArea} sq.ft</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Properties */}
              {matchedProperties.length > 0 && (
                <div className="space-y-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-sky-600 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Real Estate Insights ({matchedProperties.length})</span>
                  </div>
                  <div className="divide-y divide-slate-100 bg-slate-50 rounded-2xl overflow-hidden border border-slate-200/80">
                    {matchedProperties.map((r) => (
                      <div 
                        key={r.id}
                        onClick={() => handleSelect(`/real-estate`)}
                        className="p-3.5 hover:bg-sky-50/50 cursor-pointer flex items-center justify-between transition-colors"
                      >
                        <div>
                          <div className="text-sm font-bold text-slate-900">{r.title}</div>
                          <div className="text-xs text-slate-500">{r.location}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-xs font-bold text-sky-600">Guidance: ₹{r.govtGuidanceValue}/sqft</div>
                          <div className="text-[11px] text-slate-400">Market: ₹{r.fairMarketValue}/sqft</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          )}
        </div>

      </div>
    </div>
  );
};
