import React, { useState } from 'react';
import { MATERIALS_CATALOG, MaterialProduct } from '../data/materialsData';
import { 
  Search, 
  ChevronDown, 
  ShieldCheck, 
  CheckCircle2, 
  Truck, 
  Star, 
  ArrowRight,
  TrendingDown,
  Layers,
  Sparkles,
  ChevronRight
} from 'lucide-react';

interface MaterialsPageProps {
  onOpenEnquiry: (topic?: string) => void;
}

export const MaterialsPage: React.FC<MaterialsPageProps> = ({ onOpenEnquiry }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  // 6 visual categories with generated real photos per image copy 9.png
  const visualCategories = [
    { id: 'Cement', name: 'Cement', image: '/assets/cat_cement.jpg', subtitle: 'OPC & PPC' },
    { id: 'Steel', name: 'Steel', image: '/assets/cat_steel.jpg', subtitle: 'Fe 550D TMT' },
    { id: 'Aggregates', name: 'Aggregates', image: '/assets/cat_aggregates.jpg', subtitle: 'M-Sand & Metal' },
    { id: 'Bricks & Blocks', name: 'Bricks & Blocks', image: '/assets/cat_bricks.jpg', subtitle: 'Clay & AAC' },
    { id: 'Electrical', name: 'Electrical', image: '/assets/cat_electrical.jpg', subtitle: 'FR Wires & Pipes' },
    { id: 'Plumbing', name: 'Plumbing', image: '/assets/cat_plumbing.jpg', subtitle: 'CPVC & Valves' },
  ];

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
    <div className="pt-16 sm:pt-20 pb-20 bg-slate-50 min-h-screen">
      
      {/* DESKTOP ONLY Page Header - REMOVED ON MOBILE per image copy 8.png */}
      <div className="hidden md:block bg-bm-navy text-white py-12 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold uppercase tracking-wider">
              <Layers className="w-3.5 h-3.5" />
              <span>Module 01 • B2B / B2C Direct Procurement</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Construction Material Marketplace
            </h1>
            <p className="text-sm text-slate-300 leading-relaxed">
              Procure certified construction materials directly from primary manufacturers and verified tier-1 distributors. Daily city-wise yard rates with transparent bulk discount tiers.
            </p>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 space-y-6">
        
        {/* TOP SEARCH & DROPDOWN BAR (per image copy 9.png) */}
        <div className="bg-white rounded-3xl p-4 sm:p-5 shadow-sm border border-slate-200/90 space-y-4">
          
          <div className="flex flex-col sm:flex-row items-stretch gap-3">
            {/* Search Input Box with Search Button */}
            <div className="relative flex-1 flex items-center bg-slate-50 rounded-2xl border border-slate-200 p-1.5 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 transition-all">
              <Search className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400 ml-2.5 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for materials, steel, cement, pipes..."
                className="w-full px-3 py-1.5 bg-transparent text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none"
              />
              <button
                onClick={() => {}}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-xs transition-all shrink-0 active:scale-95"
              >
                Search
              </button>
            </div>

            {/* Category Dropdown (per image copy 9.png "easy to handle") */}
            <div className="relative w-full sm:w-56 shrink-0">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full h-full px-4 py-3 bg-slate-50 hover:bg-slate-100 rounded-2xl border border-slate-200 text-xs sm:text-sm font-bold text-slate-800 focus:outline-none focus:border-blue-500 cursor-pointer appearance-none transition-colors"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c === 'All' ? '📁 All Categories' : `📦 ${c}`}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-slate-500 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* VISUAL CATEGORY TILES (per image copy 9.png) */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <div className="text-xs sm:text-sm font-extrabold text-slate-900 flex items-center gap-1.5">
                <span className="w-1.5 h-3.5 bg-amber-500 rounded-full"></span>
                <span>Categories</span>
              </div>
              <button 
                onClick={() => setSelectedCategory('All')}
                className="text-xs font-bold text-amber-600 hover:text-amber-700 flex items-center gap-0.5"
              >
                View All <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Horizontal Scrollable / Responsive Grid of Category Photos */}
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2.5 sm:gap-4 overflow-x-auto pb-1 scrollbar-none">
              {visualCategories.map((cat) => {
                const isSelected = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`group rounded-2xl p-2 sm:p-2.5 transition-all text-center flex flex-col items-center justify-between border ${
                      isSelected
                        ? 'bg-blue-50 border-blue-500 ring-2 ring-blue-200 shadow-sm'
                        : 'bg-white border-slate-200/90 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-slate-100 mb-1.5 shadow-2xs group-hover:scale-105 transition-transform">
                      <img 
                        src={cat.image} 
                        alt={cat.name} 
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <div className="font-extrabold text-[11px] sm:text-xs text-slate-900 leading-tight">
                      {cat.name}
                    </div>
                    <div className="text-[10px] text-slate-400 mt-0.5 hidden sm:block">
                      {cat.subtitle}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* FEATURED PRODUCTS SECTION (per image copy 9.png) */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="text-base sm:text-lg font-extrabold text-slate-900 flex items-center gap-1.5">
              <span className="w-1.5 h-4 bg-blue-600 rounded-full"></span>
              <span>Featured Products ({filteredMaterials.length})</span>
            </div>
            {selectedCategory !== 'All' && (
              <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
                Filtering: {selectedCategory}
              </span>
            )}
          </div>

          {/* Product Catalog Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredMaterials.map((product) => (
              <div 
                key={product.id}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
              >
                {/* Product Image on top per image copy 9.png */}
                <div className="relative h-48 bg-slate-100 overflow-hidden">
                  <img
                    src={
                      product.category === 'Cement' ? '/assets/cat_cement.jpg' :
                      product.category === 'Steel' ? '/assets/cat_steel.jpg' :
                      product.category === 'Aggregates' ? '/assets/cat_aggregates.jpg' :
                      product.category === 'Bricks & Blocks' ? '/assets/cat_bricks.jpg' :
                      product.category === 'Electrical' ? '/assets/cat_electrical.jpg' :
                      product.category === 'Plumbing' ? '/assets/cat_plumbing.jpg' :
                      '/assets/materials.jpg'
                    }
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 bg-blue-600 text-white font-mono text-[11px] font-bold px-2.5 py-0.5 rounded-md shadow-xs">
                    {product.category}
                  </div>
                  <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm text-emerald-700 text-[11px] font-bold px-2 py-0.5 rounded-md shadow-xs flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" /> In Stock
                  </div>
                </div>

                <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-1.5">
                    <div className="text-xs font-bold text-slate-500 uppercase">
                      {product.brand}
                    </div>

                    <h3 className="text-base font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
                      {product.name}
                    </h3>
                    
                    <p className="text-xs text-slate-500 font-mono">
                      {product.gradeSpec}
                    </p>

                    <p className="text-xs text-slate-600 line-clamp-2 pt-1 leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  {/* Price Matrix */}
                  <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100 space-y-2 mt-2">
                    <div className="flex items-baseline justify-between">
                      <div>
                        <div className="text-xl sm:text-2xl font-black text-slate-900">
                          ₹ {product.basePrice.toLocaleString('en-IN')}
                        </div>
                        <div className="text-[11px] text-slate-400 font-medium">per {product.unit}</div>
                      </div>

                      <div className="text-right text-xs">
                        <div className="text-emerald-600 font-bold flex items-center justify-end gap-1">
                          <TrendingDown className="w-3.5 h-3.5" /> Bulk Tier
                        </div>
                        <div className="text-slate-600 font-mono">50+: ₹{product.bulkPrice50}</div>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px] text-slate-500">
                      <span>Min: <strong>{product.minOrder}</strong></span>
                      <span>Lead: <strong>{product.deliveryTime}</strong></span>
                    </div>
                  </div>

                  {/* Card CTA */}
                  <div className="pt-3 border-t border-slate-100">
                    <button
                      onClick={() => onOpenEnquiry(`Quotation for ${product.name} (${product.minOrder})`)}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-3 px-4 rounded-xl shadow-xs transition-all active:scale-95 flex items-center justify-center gap-1.5"
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
    </div>
  );
};
