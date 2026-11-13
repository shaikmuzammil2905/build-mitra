import React from 'react';
import { HeroSection } from '../components/HeroSection';
import { CoreModules } from '../components/CoreModules';
import { LiveMaterialRates } from '../components/LiveMaterialRates';
import { LeadershipSection } from '../components/LeadershipSection';
import { EngineeringToolsGrid } from '../components/EngineeringToolsGrid';
import { WhyChooseUs } from '../components/WhyChooseUs';
import { PlatformModule } from '../data/modulesData';
import { EngineeringCalculator } from '../data/calculatorsData';
import { ShieldCheck, Truck, Clock, Sparkles, CheckCircle2 } from 'lucide-react';

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

      {/* Upgraded Large Prominent Trust Bar (per image copy 5.png) */}
      <div className="bg-white border-y border-slate-200/80 py-6 sm:py-8 shadow-sm relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            
            {/* Card 1: 100% Quality Tested */}
            <div className="bg-gradient-to-br from-emerald-50 via-white to-white p-4 sm:p-5 rounded-2xl border border-emerald-200/80 shadow-xs hover:shadow-md transition-all flex items-center gap-3.5 group">
              <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-sm group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <div className="text-sm sm:text-base font-extrabold text-slate-900 leading-snug">
                  100% Quality Tested
                </div>
                <div className="text-xs text-emerald-700 font-semibold mt-0.5">
                  NABL Lab Certified Stocks
                </div>
              </div>
            </div>

            {/* Card 2: Direct From Primary Mills */}
            <div className="bg-gradient-to-br from-blue-50 via-white to-white p-4 sm:p-5 rounded-2xl border border-blue-200/80 shadow-xs hover:shadow-md transition-all flex items-center gap-3.5 group">
              <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-sm group-hover:scale-110 transition-transform">
                <Truck className="w-6 h-6" />
              </div>
              <div>
                <div className="text-sm sm:text-base font-extrabold text-slate-900 leading-snug">
                  Direct From Primary Mills
                </div>
                <div className="text-xs text-blue-700 font-semibold mt-0.5">
                  No Multi-Tier Wholesalers
                </div>
              </div>
            </div>

            {/* Card 3: On-Time Site Delivery */}
            <div className="bg-gradient-to-br from-amber-50 via-white to-white p-4 sm:p-5 rounded-2xl border border-amber-200/80 shadow-xs hover:shadow-md transition-all flex items-center gap-3.5 group">
              <div className="w-12 h-12 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center shrink-0 shadow-sm group-hover:scale-110 transition-transform">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <div className="text-sm sm:text-base font-extrabold text-slate-900 leading-snug">
                  On-Time Site Delivery
                </div>
                <div className="text-xs text-amber-800 font-semibold mt-0.5">
                  Fleet GPS Real-Time Tracked
                </div>
              </div>
            </div>

            {/* Card 4: Milestone Escrow */}
            <div className="bg-gradient-to-br from-purple-50 via-white to-white p-4 sm:p-5 rounded-2xl border border-purple-200/80 shadow-xs hover:shadow-md transition-all flex items-center gap-3.5 group">
              <div className="w-12 h-12 rounded-xl bg-purple-600 text-white flex items-center justify-center shrink-0 shadow-sm group-hover:scale-110 transition-transform">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <div className="text-sm sm:text-base font-extrabold text-slate-900 leading-snug">
                  Milestone Escrow
                </div>
                <div className="text-xs text-purple-700 font-semibold mt-0.5">
                  100% Secure Fund Release
                </div>
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
