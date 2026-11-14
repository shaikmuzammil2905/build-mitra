import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ArrowRight } from 'lucide-react';

interface HeroSectionProps {
  onSearchSubmit: (query: string) => void;
  onOpenEnquiry?: (topic?: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onSearchSubmit }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearchSubmit(searchQuery.trim());
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pt-3 sm:pt-6 space-y-4 sm:space-y-6">
      
      {/* 1. App-Style Search Bar (Exact Match to image copy 20.png) */}
      <form onSubmit={handleSearch} className="relative w-full max-w-3xl mx-auto">
        <input 
          type="text" 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for services..."
          className="w-full bg-white text-slate-800 placeholder-slate-400 pl-11 pr-24 py-3 sm:py-3.5 rounded-full text-xs sm:text-sm font-medium border border-slate-200/90 shadow-2xs hover:border-blue-400 focus:border-blue-600 focus:outline-none transition-all"
        />
        <Search className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
        <button
          type="submit"
          className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-3.5 py-1.5 sm:py-2 rounded-full transition-colors active:scale-95"
        >
          Search
        </button>
      </form>

      {/* 2. Grand Hero Banner with Painter (Exact Match to image copy 20.png) */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-700 via-blue-600 to-sky-500 text-white shadow-md border border-blue-600/30 p-5 sm:p-8 lg:p-10 flex items-center justify-between min-h-[170px] sm:min-h-[210px] lg:min-h-[240px]">
        
        {/* Left: Headline & CTA Button */}
        <div className="relative z-10 max-w-[62%] sm:max-w-md lg:max-w-lg space-y-3 sm:space-y-4">
          <h1 className="text-lg sm:text-2xl lg:text-3xl font-black text-white leading-tight tracking-tight drop-shadow-xs">
            Professional Home Services <br />at Your Fingertips
          </h1>
          
          <button
            onClick={() => navigate('/services')}
            className="inline-flex items-center gap-1.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs sm:text-sm px-4 sm:px-6 py-2 sm:py-2.5 rounded-full shadow-md active:scale-95 transition-all"
          >
            <span>Book Now</span>
            <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
        </div>

        {/* Right: Verified Professional Painter Image with Hardhat (image copy 20.png) */}
        <div className="absolute right-0 top-0 bottom-0 w-[45%] sm:w-[42%] lg:w-[38%] flex items-center justify-end pointer-events-none">
          <img 
            src="/assets/banner_painter.jpg" 
            alt="Professional Technician with Yellow Hardhat" 
            className="h-full w-full object-cover object-left-top mix-blend-normal opacity-98 contrast-105"
          />
          {/* Subtle gradient blend on left edge */}
          <div className="absolute inset-y-0 left-0 w-12 sm:w-20 bg-gradient-to-r from-blue-600 to-transparent"></div>
        </div>

      </div>

    </div>
  );
};

export default HeroSection;