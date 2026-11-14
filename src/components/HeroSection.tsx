import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ArrowRight, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

interface HeroSectionProps {
  onSearchSubmit: (query: string) => void;
  onOpenEnquiry?: (topic?: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onSearchSubmit }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const navigate = useNavigate();

  // 4 Dynamic Automatic Slides (per image copy 28.png)
  const slides = [
    {
      id: 0,
      title: 'Professional Home Services at Your Fingertips',
      subtitle: 'Verified electricians, plumbers, painters, carpenters & cleaning specialists',
      ctaText: 'Book Now',
      ctaPath: '/services',
      image: '/assets/banner_painter.jpg',
      bgGradient: 'from-blue-700 via-blue-600 to-sky-500',
      badge: 'Certified Technicians'
    },
    {
      id: 1,
      title: 'Reverse Auction Engine: Live Material Bidding',
      subtitle: 'Upload BOQ & verified primary suppliers bid downward in real time for lowest price',
      ctaText: 'Start Live Bidding',
      ctaPath: '/reverse-auction',
      image: '/assets/reverse-auction.jpg',
      bgGradient: 'from-slate-950 via-blue-950 to-indigo-900',
      badge: 'Lowest Landed Price'
    },
    {
      id: 2,
      title: 'Instant Home Loan & Construction Finance',
      subtitle: 'Starting from 8.40% p.a. • Instant bank eligibility across SBI, HDFC & ICICI',
      ctaText: 'Calculate Loan EMI',
      ctaPath: '/home-loans',
      image: '/assets/home-loans.jpg',
      bgGradient: 'from-indigo-900 via-purple-950 to-slate-900',
      badge: 'Top Banks (SBI, HDFC)'
    },
    {
      id: 3,
      title: 'Turnkey Construction & 3D House Designs',
      subtitle: 'IS 456 Structural engineering guarantee with milestone escrow payment safety',
      ctaText: 'Inspect 3D Designs',
      ctaPath: '/3d-designs',
      image: '/assets/floor-plans.jpg',
      bgGradient: 'from-amber-600 via-amber-700 to-slate-900',
      badge: '10-Year Warranty'
    }
  ];

  // Auto-advance slider every 4 seconds (per image copy 28.png)
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [isPaused, slides.length]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearchSubmit(searchQuery.trim());
    }
  };

  const active = slides[currentSlide];

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

      {/* 2. Automatic Dynamic Slider with 4 Banners (image copy 28.png) */}
      <div 
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        className="relative overflow-hidden rounded-3xl text-white shadow-md border border-slate-200/40 min-h-[175px] sm:min-h-[210px] lg:min-h-[240px]"
      >
        {/* Active Banner Slide */}
        <div className={`w-full h-full p-5 sm:p-8 lg:p-10 flex items-center justify-between bg-gradient-to-r ${active.bgGradient} transition-all duration-700`}>
          
          {/* Left: Headline & CTA Button */}
          <div className="relative z-10 max-w-[62%] sm:max-w-md lg:max-w-lg space-y-2.5 sm:space-y-3.5 animate-fade-in">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-xs text-[10px] sm:text-xs font-bold text-amber-300">
              <Sparkles className="w-3 h-3" />
              <span>{active.badge}</span>
            </span>

            <h1 className="text-lg sm:text-2xl lg:text-3xl font-black text-white leading-tight tracking-tight drop-shadow-xs">
              {active.title}
            </h1>

            <p className="text-xs sm:text-sm text-slate-200 line-clamp-2 leading-relaxed hidden sm:block">
              {active.subtitle}
            </p>
            
            <button
              onClick={() => navigate(active.ctaPath)}
              className="inline-flex items-center gap-1.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs sm:text-sm px-4 sm:px-6 py-2 sm:py-2.5 rounded-full shadow-md active:scale-95 transition-all"
            >
              <span>{active.ctaText}</span>
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
          </div>

          {/* Right: Visual Image with Smooth Gradient Overlay */}
          <div className="absolute right-0 top-0 bottom-0 w-[45%] sm:w-[42%] lg:w-[38%] flex items-center justify-end pointer-events-none">
            <img 
              src={active.image} 
              alt={active.title} 
              className="h-full w-full object-cover object-left-top mix-blend-normal opacity-95 contrast-105"
            />
            <div className="absolute inset-y-0 left-0 w-12 sm:w-20 bg-gradient-to-r from-slate-950/60 to-transparent"></div>
          </div>

        </div>

        {/* Previous / Next Arrow Controls */}
        <button
          onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
          className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black/30 hover:bg-black/60 text-white flex items-center justify-center backdrop-blur-xs transition-colors z-20"
          title="Previous Banner"
          aria-label="Previous Slide"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <button
          onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black/30 hover:bg-black/60 text-white flex items-center justify-center backdrop-blur-xs transition-colors z-20"
          title="Next Banner"
          aria-label="Next Slide"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        {/* Slide Indicator Dots (4 Dots) */}
        <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-20">
          {slides.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => setCurrentSlide(idx)}
              className={`h-1.5 rounded-full transition-all ${
                currentSlide === idx ? 'w-6 bg-amber-400' : 'w-2 bg-white/50 hover:bg-white/80'
              }`}
              title={`Slide ${idx + 1}`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

      </div>

    </div>
  );
};

export default HeroSection;