import React, { useState } from 'react';
import { HeroSection } from '../components/HeroSection';
import { CoreModules } from '../components/CoreModules';
import { LiveMaterialRates } from '../components/LiveMaterialRates';
import { LeadershipSection } from '../components/LeadershipSection';
import { EngineeringToolsGrid } from '../components/EngineeringToolsGrid';
import { WhyChooseUs } from '../components/WhyChooseUs';
import { PlatformModule } from '../data/modulesData';
import { EngineeringCalculator } from '../data/calculatorsData';
import { ShieldCheck, Truck, Clock, Sparkles } from 'lucide-react';

interface HomePageProps {
  onSearchSubmit: (q: string) => void;
  onOpenEnquiry: (topic?: string) => void;
  onQuickView: (module: PlatformModule) => void;
  onOpenCalculator: (calc: EngineeringCalculator) => void;
  onOpenBOQ: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onSearchSubmit,
  onOpenEnquiry,
  onQuickView,
  onOpenCalculator,
  onOpenBOQ
}) => {
  return (
    <div className="space-y-0">
      
      {/* Hero Section */}
      <HeroSection 
        onSearchSubmit={onSearchSubmit} 
        onOpenEnquiry={onOpenEnquiry} 
      />

      {/* Floating Trust Bar */}
      <div className="bg-white border-y border-slate-200/80 py-4 shadow-xs relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center divide-y md:divide-y-0 md:divide-x divide-slate-100">
            <div className="flex items-center justify-center gap-2.5 pt-2 md:pt-0">
              <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
              <div className="text-left">
                <div className="text-xs font-bold text-slate-900">100% Quality Tested</div>
                <div className="text-[11px] text-slate-500">NABL Lab Certified Stocks</div>
              </div>
            </div>

            <div className="flex items-center justify-center gap-2.5 pt-2 md:pt-0">
              <Truck className="w-5 h-5 text-blue-600 shrink-0" />
              <div className="text-left">
                <div className="text-xs font-bold text-slate-900">Direct From Primary Mills</div>
                <div className="text-[11px] text-slate-500">No Multi-Tier Wholesalers</div>
              </div>
            </div>

            <div className="flex items-center justify-center gap-2.5 pt-2 md:pt-0">
              <Clock className="w-5 h-5 text-amber-500 shrink-0" />
              <div className="text-left">
                <div className="text-xs font-bold text-slate-900">On-Time Site Delivery</div>
                <div className="text-[11px] text-slate-500">Fleet GPS Real-Time Tracked</div>
              </div>
            </div>

            <div className="flex items-center justify-center gap-2.5 pt-2 md:pt-0">
              <Sparkles className="w-5 h-5 text-purple-600 shrink-0" />
              <div className="text-left">
                <div className="text-xs font-bold text-slate-900">Milestone Escrow</div>
                <div className="text-[11px] text-slate-500">100% Secure Fund Release</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 8 Core Solutions Grid */}
      <CoreModules onQuickView={onQuickView} />

      {/* Live Material Rates Section */}
      <LiveMaterialRates 
        onOpenAllRates={(city) => onOpenEnquiry(`View All Rates for ${city}`)}
        onRequestQuote={(material, city) => onOpenEnquiry(`Quotation for ${material} in ${city}`)}
      />

      {/* 31+ Years Leadership Heritage */}
      <LeadershipSection />

      {/* Powerful Engineering Tools & Calculators Grid */}
      <EngineeringToolsGrid 
        onOpenCalculator={onOpenCalculator}
        onOpenBOQ={onOpenBOQ}
      />

      {/* Why Choose BuildMitra */}
      <WhyChooseUs 
        onSelectFeature={(title, desc) => onOpenEnquiry(`Inquiry about ${title}`)}
      />

    </div>
  );
};
