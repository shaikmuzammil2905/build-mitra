import React, { useState } from 'react';
import { MATERIALS_CATALOG, MaterialProduct } from '../data/materialsData';
import { 
  Search, 
  Filter, 
  ShieldCheck, 
  CheckCircle2, 
  Truck, 
  Star, 
  ArrowRight,
  TrendingDown,
  Layers,
  Sparkles
} from 'lucide-react';

interface MaterialsPageProps {
  onOpenEnquiry: (topic?: string) => void;
}

export const MaterialsPage: React.FC<MaterialsPageProps> = ({ onOpenEnquiry }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Cement', 'Steel', 'Aggregates', 'Bricks & Blocks', 'Electrical', 'Plumbing'];

  const filteredMaterials = MATERIALS_CATALOG.filter(m => {
    const matchesCat = selectedCategory === 'All' || m.category === selectedCategory;
    const matchesQuery = !searchQuery || 
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      m.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  return (
    <div className="pt-24 pb-20 bg-slate-50 min-h-screen">
      
      {/* Page Header */}
      <div className="bg-bm-navy text-white py-14 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold uppercase tracking-wider">
              <Layers className="w-3.5 h-3.5" />
              <span>Module 01 • B2B / B2C Direct Procurement</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              Construction Material Marketplace
            </h1>
            <p className="text-base text-slate-300 leading-relaxed">
              Procure certified construction materials directly from primary manufacturers and verified tier-1 distributors. Daily city-wise yard rates with transparent bulk discount tiers.
            </p>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20">
        
        {/* Search & Filter Toolbar */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-lg border border-slate-200/90 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search cement, steel, sand..."
              className="w-full pl-9 pr-4 py-2 bg-slate-50 rounded-xl border border-slate-200 text-xs sm:text-sm font-medium focus:outline-none focus:border-blue-500"
            />
          </div>

        </div>

        {/* Product Catalog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {filteredMaterials.map((product) => (
            <div 
              key={product.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="p-6 space-y-4">
                
                {/* Brand & Stock */}
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md">
                    {product.brand}
                  </span>
                  <span className="flex items-center gap-1 text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full text-[11px]">
                    <CheckCircle2 className="w-3 h-3" /> In Stock
                  </span>
                </div>

                {/* Title & Specs */}
                <div>
                  <h3 className="text-lg font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
                    {product.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 font-mono">
                    {product.gradeSpec}
                  </p>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                  {product.description}
                </p>

                {/* Price Matrix */}
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-2">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <div className="text-2xl font-black text-slate-900">
                        ₹ {product.basePrice.toLocaleString('en-IN')}
                      </div>
                      <div className="text-[11px] text-slate-400 font-medium">per {product.unit}</div>
                    </div>

                    <div className="text-right text-xs">
                      <div className="text-emerald-600 font-bold flex items-center justify-end gap-1">
                        <TrendingDown className="w-3.5 h-3.5" /> Bulk Tier
                      </div>
                      <div className="text-slate-600 font-mono">50+ units: ₹{product.bulkPrice50}</div>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px] text-slate-500">
                    <span>Min Order: <strong>{product.minOrder}</strong></span>
                    <span>Lead: <strong>{product.deliveryTime}</strong></span>
                  </div>
                </div>

                {/* Features Checklist */}
                <div className="space-y-1.5 pt-1">
                  {product.features.slice(0, 3).map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-slate-600">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span className="truncate">{feat}</span>
                    </div>
                  ))}
                </div>

              </div>

              {/* Card Footer with Supplier & Action */}
              <div className="p-6 pt-0 space-y-3">
                <div className="flex items-center gap-2 text-xs text-slate-500 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
                  <span className="truncate">{product.testCertificate}</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onOpenEnquiry(`Quotation for ${product.name} (${product.minOrder})`)}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-3 px-4 rounded-xl shadow-md transition-all active:scale-95 flex items-center justify-center gap-1.5"
                  >
                    <span>Request Bulk Quote</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
