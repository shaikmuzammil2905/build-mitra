import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  RotateCw, 
  Maximize, 
  CheckCircle, 
  Share2, 
  Layers, 
  FileText,
  Send,
  Eye,
  Check
} from 'lucide-react';
import { HOUSE_DESIGNS_CATALOG, HouseDesign3D } from '../data/houseDesignsData';

export const HouseDesigns3DPage: React.FC = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState<'Exterior' | 'Interior'>('Exterior');
  const [selectedDesign, setSelectedDesign] = useState<HouseDesign3D>(HOUSE_DESIGNS_CATALOG[0]);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [quotationModalOpen, setQuotationModalOpen] = useState(false);
  const [quotationSubmitted, setQuotationSubmitted] = useState(false);

  const filteredDesigns = HOUSE_DESIGNS_CATALOG.filter(d => d.category === tab);

  const handleRotate = () => {
    setRotationAngle((prev) => (prev + 45) % 360);
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-24 max-w-md mx-auto pt-16">
      {/* Top Header */}
      <div className="bg-white border-b border-slate-100 px-4 py-3 sticky top-12 z-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => navigate(-1)} 
            className="p-1.5 rounded-full hover:bg-slate-100 text-slate-700 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-lg font-bold text-slate-900">3D House Designs</h1>
        </div>
      </div>

      {/* Segment Tabs: Exterior | Interior (Screen 11) */}
      <div className="bg-white border-b border-slate-100 px-4 py-2.5">
        <div className="bg-slate-100 p-1 rounded-xl flex">
          {(['Exterior', 'Interior'] as const).map((t) => (
            <button
              key={t}
              onClick={() => {
                setTab(t);
                const first = HOUSE_DESIGNS_CATALOG.find(d => d.category === t);
                if (first) setSelectedDesign(first);
              }}
              className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
                tab === t 
                  ? 'bg-blue-600 text-white shadow-xs' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {t} Designs
            </button>
          ))}
        </div>
      </div>

      {/* Main 3D Viewer Canvas Mockup */}
      <div className="p-4">
        <div className="relative rounded-3xl overflow-hidden bg-slate-900 shadow-lg border border-slate-800">
          <div className="relative h-64 w-full flex items-center justify-center overflow-hidden">
            <img 
              src={selectedDesign.heroImage} 
              alt={selectedDesign.title} 
              style={{ transform: `scale(1.05) rotate(${rotationAngle}deg)`, transition: 'transform 0.5s ease-out' }}
              className="w-full h-full object-cover opacity-90"
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/30"></div>

            {/* 3D Badge */}
            <span className="absolute top-3 left-3 bg-blue-600 text-white font-black text-[10px] tracking-wider uppercase px-2.5 py-1 rounded-full shadow-md flex items-center gap-1">
              <Eye className="w-3 h-3" />
              3D Interactive View
            </span>

            {/* Rotation Controls */}
            <button 
              onClick={handleRotate}
              className="absolute bottom-3 right-3 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white p-2.5 rounded-full shadow-lg border border-white/30 active:scale-95 transition-all flex items-center gap-1 text-xs font-bold"
              title="Rotate 3D model"
            >
              <RotateCw className="w-4 h-4 animate-spin-slow" />
              <span>Rotate</span>
            </button>
          </div>

          <div className="p-4 bg-slate-900 text-white">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-base font-bold text-white">{selectedDesign.title}</h2>
                <p className="text-xs text-slate-400 mt-0.5">{selectedDesign.floors} • {selectedDesign.builtUpArea}</p>
              </div>
              <div className="text-right">
                <span className="text-xs text-amber-400 font-bold block">{selectedDesign.startingPrice}</span>
                <span className="text-[10px] text-slate-400">Turnkey Execution</span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800 flex gap-2">
              <button 
                onClick={() => { setQuotationModalOpen(true); setQuotationSubmitted(false); }}
                className="flex-1 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black py-2.5 rounded-xl text-xs shadow-md flex items-center justify-center gap-1.5"
              >
                <FileText className="w-4 h-4" />
                <span>Request Quotation</span>
              </button>
            </div>
          </div>
        </div>

        {/* Design Thumbnails */}
        <div className="mt-5">
          <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2.5">
            Browse {tab} Catalogue ({filteredDesigns.length})
          </h3>

          <div className="grid grid-cols-2 gap-3">
            {filteredDesigns.map((des) => (
              <div 
                key={des.id}
                onClick={() => setSelectedDesign(des)}
                className={`bg-white rounded-2xl overflow-hidden border p-2 cursor-pointer transition-all ${
                  selectedDesign.id === des.id
                    ? 'border-blue-600 ring-2 ring-blue-500/20 shadow-md'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <img 
                  src={des.heroImage} 
                  alt={des.title} 
                  className="w-full h-24 object-cover rounded-xl mb-2"
                />
                <h4 className="text-xs font-bold text-slate-900 line-clamp-1">{des.title}</h4>
                <div className="text-[11px] text-blue-600 font-semibold">{des.startingPrice}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quotation Request Modal */}
      {quotationModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fade-in">
          <div className="bg-white rounded-t-3xl sm:rounded-2xl max-w-sm w-full p-5 space-y-4">
            <h3 className="font-bold text-base text-slate-900">Request 3D Construction Quotation</h3>
            <p className="text-xs text-slate-600">Get a detailed BOQ cost estimate for <span className="font-bold text-blue-600">{selectedDesign.title}</span>.</p>

            {quotationSubmitted ? (
              <div className="p-4 bg-emerald-50 text-emerald-800 rounded-xl text-xs font-semibold flex flex-col items-center text-center gap-2">
                <Check className="w-8 h-8 text-emerald-600" />
                <span>Quotation request received! Our civil architect will contact you with 3D blueprints within 24 hours.</span>
                <button 
                  onClick={() => setQuotationModalOpen(false)}
                  className="mt-2 text-xs bg-emerald-600 text-white font-bold px-4 py-1.5 rounded-lg"
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setQuotationSubmitted(true); }} className="space-y-3">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Your Name</label>
                  <input type="text" required defaultValue="Hemanth Kumar" className="w-full text-xs p-2.5 rounded-xl border border-slate-200" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Mobile (+91)</label>
                  <input type="tel" required defaultValue="+91 98765 43210" className="w-full text-xs p-2.5 rounded-xl border border-slate-200" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Plot Area (sq.ft)</label>
                  <input type="number" required defaultValue="1500" className="w-full text-xs p-2.5 rounded-xl border border-slate-200" />
                </div>
                <div className="flex gap-2 pt-2">
                  <button 
                    type="button" 
                    onClick={() => setQuotationModalOpen(false)}
                    className="flex-1 py-2 text-xs font-bold rounded-xl border border-slate-200 text-slate-600"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="flex-1 py-2 text-xs font-bold rounded-xl bg-blue-600 text-white shadow-xs"
                  >
                    Submit Request
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
export default HouseDesigns3DPage;
