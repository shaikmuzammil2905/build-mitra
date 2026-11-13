import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles,
  ShieldCheck,
  TrendingUp,
  SlidersHorizontal
} from 'lucide-react';

interface HeroSectionProps {
  onSearchSubmit: (query: string) => void;
  onOpenEnquiry: (topic?: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onSearchSubmit, onOpenEnquiry }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearchSubmit(searchQuery.trim());
    }
  };

  return (
    <section className="relative min-h-[92vh] sm:min-h-[88vh] lg:min-h-[85vh] flex items-center pt-24 pb-16 overflow-hidden">
      
      {/* DESKTOP BACKGROUND IMAGE (image copy 2.png) - Animated in desktop view only */}
      <div className="hidden md:block absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <img 
          src="/assets/hero-desktop.png" 
          alt="Modern Architectural Development with Construction Crane"
          className="w-full h-full object-cover object-center lg:object-right-bottom animate-hero-desktop"
          loading="eager"
        />
        {/* Elegant light/dark overlay ensuring 100% text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-transparent md:w-[68%] lg:w-[58%] z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-transparent to-transparent z-10 h-32 bottom-0"></div>
        {/* Sunray shimmer effect */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl sunray-pulse z-10"></div>
      </div>

      {/* MOBILE BACKGROUND IMAGE (image copy 3.png) - Bright look and animated in mobile view only */}
      <div className="block md:hidden absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <img 
          src="/assets/hero-mobile.png" 
          alt="Modern Architectural Building"
          className="w-full h-full object-cover object-top animate-hero-mobile filter brightness-110 contrast-105"
          loading="eager"
        />
        {/* Mobile translucent frosted overlay for ultra-clear readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/95 via-white/90 to-white/95 z-10"></div>
      </div>

      {/* Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full">
        <div className="max-w-2xl lg:max-w-xl space-y-6">
          
          {/* Top Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-xs sm:text-sm font-semibold shadow-sm animate-fade-in">
            <Sparkles className="w-4 h-4 text-amber-500 animate-spin" style={{ animationDuration: '6s' }} />
            <span>Digital Construction & Real Estate Ecosystem</span>
          </div>

          {/* Main Headline */}
          <div className="space-y-1 sm:space-y-2">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-bm-navy tracking-tight leading-[1.12]">
              Build Smart.<br />
              <span className="text-bm-red">Build Better.</span>
            </h1>
            <p className="text-lg sm:text-xl font-bold text-slate-800 leading-snug pt-1">
              Your Complete Construction & Real Estate Ecosystem — All in One Platform
            </p>
          </div>

          {/* Supporting Description */}
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            Discover transparent material pricing, reverse auction bidding, verified professionals, smart engineering calculators, property intelligence and complete construction solutions.
          </p>

          {/* 4 Green Tick Benefit Points */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
            <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-slate-800">
              <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              </div>
              <span>Real-Time Material Rates</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-slate-800">
              <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              </div>
              <span>Trusted Professionals</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-slate-800">
              <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              </div>
              <span>Smart Tools & Calculators</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-slate-800">
              <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              </div>
              <span>Transparent & Fair Pricing</span>
            </div>
          </div>

          {/* Functional Search Bar */}
          <form 
            onSubmit={handleSearch}
            className="pt-2"
          >
            <div className="flex items-center bg-white rounded-full p-1.5 shadow-lg border border-slate-200 focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-100 transition-all max-w-xl">
              <div className="pl-3 text-slate-400">
                <Search className="w-5 h-5" />
              </div>
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search materials, services, labour or properties..." 
                className="w-full px-3 py-2 text-sm text-slate-800 placeholder-slate-400 bg-transparent focus:outline-none"
              />
              <button 
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm px-6 py-2.5 rounded-full shadow-sm hover:shadow-md transition-all shrink-0 active:scale-95"
              >
                Search
              </button>
            </div>
          </form>

          {/* Quick CTA Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link 
              to="/materials" 
              className="inline-flex items-center gap-2 bg-bm-navy hover:bg-slate-800 text-white font-bold text-sm px-5 py-2.5 rounded-full shadow-md hover:shadow-lg transition-all active:scale-95"
            >
              <span>Explore Solutions</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <button 
              onClick={() => onOpenEnquiry('Hero Get Started')}
              className="inline-flex items-center gap-1.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold text-sm px-5 py-2.5 rounded-full shadow-md hover:shadow-lg transition-all active:scale-95"
            >
              <span>Get Started</span>
            </button>

            <Link 
              to="/contact" 
              className="inline-flex items-center gap-1.5 bg-white/90 hover:bg-white text-slate-700 font-bold text-sm px-4 py-2.5 rounded-full border border-slate-200 shadow-sm hover:shadow transition-all"
            >
              <span>Contact Us</span>
            </Link>
          </div>

        </div>
      </div>

    </section>
  );
};
