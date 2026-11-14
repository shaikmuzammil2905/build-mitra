import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { 
  ChevronLeft, 
  ChevronRight, 
  Star, 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  ArrowRight,
  Info
} from 'lucide-react';

export const CategoryServicesPage: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const { categories, getCategory } = useApp();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<'services' | 'about'>('services');

  // Fallback to painting if 'all' or not found
  const category = (categoryId && categoryId !== 'all') 
    ? (getCategory(categoryId) || categories[0]) 
    : categories[0];

  return (
    <div className="pb-24 pt-3 max-w-2xl mx-auto px-4 sm:px-6 space-y-4">
      
      {/* Top Header with Back Button (per image copy 14.png Screen 6) */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate('/')}
          className="w-9 h-9 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-700 hover:text-slate-950 transition-colors shrink-0 shadow-2xs"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <h1 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
          {category.name} Services
        </h1>
      </div>

      {/* Hero Banner with Paint Roller Graphic (per image copy 14.png Screen 6) */}
      <div className="relative rounded-3xl overflow-hidden h-44 sm:h-52 bg-slate-900 shadow-md">
        <img 
          src={category.bannerImage || '/assets/services.jpg'} 
          alt={category.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent"></div>
        <div className="absolute bottom-3 left-4 right-4 text-white">
          <div className="text-xs uppercase font-mono font-bold text-amber-400">BuildMitra Verified</div>
          <div className="text-base sm:text-lg font-black">{category.name} Solutions</div>
        </div>
      </div>

      {/* Tabs: [ Services | About ] (per image copy 14.png Screen 6) */}
      <div className="flex border-b border-slate-200 text-xs sm:text-sm font-extrabold">
        <button
          onClick={() => setActiveTab('services')}
          className={`flex-1 py-3 text-center transition-all border-b-2 ${
            activeTab === 'services'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Services
        </button>
        <button
          onClick={() => setActiveTab('about')}
          className={`flex-1 py-3 text-center transition-all border-b-2 ${
            activeTab === 'about'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          About
        </button>
      </div>

      {/* Tab 1: Services List (per image copy 14.png Screen 6) */}
      {activeTab === 'services' ? (
        <div className="space-y-3">
          {category.subServices.map((sub) => (
            <div
              key={sub.id}
              onClick={() => navigate(`/service/${sub.id}`)}
              className="bg-white p-3.5 sm:p-4 rounded-3xl border border-slate-200/90 shadow-2xs hover:shadow-md transition-all cursor-pointer flex items-center justify-between gap-3 group hover:border-blue-500"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden bg-slate-100 shrink-0 border border-slate-100">
                  <img 
                    src={sub.image} 
                    alt={sub.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {sub.name}
                  </h3>
                  <div className="text-xs font-black text-slate-900 mt-0.5">
                    {sub.priceDisplay}
                  </div>
                  <div className="flex items-center gap-1 text-[11px] text-slate-500 mt-1">
                    <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    <span>{sub.rating} ({sub.reviewsCount.toLocaleString()} reviews)</span>
                  </div>
                </div>
              </div>

              <div className="w-8 h-8 rounded-full bg-slate-50 group-hover:bg-blue-50 flex items-center justify-center text-slate-400 group-hover:text-blue-600 transition-colors shrink-0">
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          ))}

          {/* Sticky Book Now Button (per image copy 14.png Screen 6) */}
          <div className="pt-2">
            <button
              onClick={() => navigate(`/service/${category.subServices[0].id}`)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm py-3.5 px-4 rounded-2xl shadow-md transition-all active:scale-95 text-center flex items-center justify-center gap-2"
            >
              <span>Book Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        /* Tab 2: About Category */
        <div className="bg-white p-5 rounded-3xl border border-slate-200/90 space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
          <div>
            <h3 className="font-extrabold text-slate-900 text-base mb-1">About {category.name} by BuildMitra</h3>
            <p>{category.description}</p>
          </div>

          <div className="space-y-2 pt-2 border-t border-slate-100">
            <div className="flex items-center gap-2 text-slate-800 font-bold">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>100% Background-Checked Local Partners</span>
            </div>
            <div className="flex items-center gap-2 text-slate-800 font-bold">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Standard Fixed & Transparent Pricing</span>
            </div>
            <div className="flex items-center gap-2 text-slate-800 font-bold">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Full Service Warranty & Milestone Escrow Safety</span>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
