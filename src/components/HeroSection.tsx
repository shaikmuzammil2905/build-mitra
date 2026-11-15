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

  // 4 Dynamic Automatic Slides strictly focused on Building Construction 🏗️
  const slides = [
    {
      id: 0,
      title: 'Turnkey Building Construction 🏗️',
      subtitle: 'From foundation digging to key handover • IS 456 structural guarantee & milestone escrow safety',
      ctaText: 'Start Construction',
      ctaPath: '/services',
      image: '/assets/building_construction_site.jpg',
      bgGradient: 'from-blue-900 via-blue-800 to-indigo-950',
      patchGradient: 'from-blue-900',
      badge: '🏗️ Turnkey Construction',
      patchBadge: 'IS 456 Certified Build'
    },
    {
      id: 1,
      title: 'Primary Materials: Direct Jobsite Delivery',
      subtitle: 'Live reverse auction bidding for TMT steel rebars, 53 grade cement & RMC concrete at mill rates',
      ctaText: 'Start Material Bidding',
      ctaPath: '/reverse-auction',
      image: '/assets/heavy_construction_materials.jpg',
      bgGradient: 'from-slate-950 via-slate-900 to-blue-950',
      patchGradient: 'from-slate-950',
      badge: '🏗️ Live Material Bidding',
      patchBadge: 'Verified Primary Mills'
    },
    {
      id: 2,
      title: 'Structural Engineering & 19 Civil Calculators',
      subtitle: 'Instant concrete, steel, brickwork & BOQ estimation with IS 456 structural audit verification',
      ctaText: 'Open 19 Calculators',
      ctaPath: '/calculator',
      image: '/assets/structural_civil_engineers.jpg',
      bgGradient: 'from-indigo-950 via-slate-900 to-blue-900',
      patchGradient: 'from-indigo-950',
      badge: '🏗️ Structural Engineering',
      patchBadge: '19 Civil Calculators'
    },
    {
      id: 3,
      title: '3D Architectural Plans & Structural Drawings',
      subtitle: 'Vastu-compliant 3D elevations, beam-column schedules, BIM modeling & municipal approvals',
      ctaText: 'View 3D Designs',
      ctaPath: '/3d-designs',
      image: '/assets/turnkey_architectural_construction.jpg',
      bgGradient: 'from-amber-950 via-slate-900 to-blue-950',
      patchGradient: 'from-amber-950',
      badge: '🏗️ 3D Architectural Plans',
      patchBadge: 'Vastu & Municipal Approved'
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

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pt-3 sm:pt-6 space-y-4 sm:space-y-6">
      
      {/* 1. App-Style Search Bar (Exact Match to image copy 20.png) */}
      <form onSubmit={handleSearch} className="relative w-full max-w-3xl mx-auto">
        <input 
          type="text" 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search materials, construction services, civil calculators..."
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

      {/* 2. Automatic Dynamic Slider with 4 Banners & Patchwork Transition (image copy 28.png) */}
      <div 
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        className="relative overflow-hidden rounded-3xl text-white shadow-xl border border-slate-200/50 min-h-[195px] sm:min-h-[235px] lg:min-h-[265px]"
      >
        {/* Render all 4 slides for smooth synchronized content + image transitions */}
        {slides.map((slide, idx) => {
          const isCurrent = currentSlide === idx;
          return (
            <div 
              key={slide.id}
              className={`absolute inset-0 w-full h-full flex items-center justify-between bg-gradient-to-r ${slide.bgGradient} transition-all duration-700 ease-in-out ${
                isCurrent ? 'opacity-100 z-10 scale-100' : 'opacity-0 z-0 scale-[1.02] pointer-events-none'
              }`}
            >
              {/* Left: Content Text & CTA Button */}
              <div className="relative z-20 max-w-[58%] sm:max-w-md lg:max-w-lg p-5 sm:p-8 lg:p-10 space-y-2.5 sm:space-y-3.5">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-xs text-[10px] sm:text-xs font-black text-amber-300 border border-white/20 shadow-xs">
                  <Sparkles className="w-3 h-3 text-amber-300 shrink-0" />
                  <span>{slide.badge}</span>
                </span>

                <h1 className="text-base sm:text-2xl lg:text-3xl font-black text-white leading-tight tracking-tight drop-shadow-md">
                  {slide.title}
                </h1>

                <p className="text-xs sm:text-sm text-slate-200 line-clamp-2 leading-relaxed hidden sm:block">
                  {slide.subtitle}
                </p>
                
                <button
                  onClick={() => navigate(slide.ctaPath)}
                  className="inline-flex items-center gap-1.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs sm:text-sm px-4 sm:px-6 py-2 sm:py-2.5 rounded-full shadow-md active:scale-95 transition-all"
                >
                  <span>{slide.ctaText}</span>
                  <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>
              </div>

              {/* Right: Construction Picture with Stylized Patchwork Transition */}
              <div className="absolute right-0 top-0 bottom-0 w-[48%] sm:w-[46%] lg:w-[42%] flex items-center justify-end overflow-hidden">
                {/* Construction Picture synced with content */}
                <img 
                  src={slide.image} 
                  alt={slide.title} 
                  className={`h-full w-full object-cover object-center transition-transform duration-1000 ease-out ${
                    isCurrent ? 'scale-100' : 'scale-110'
                  }`}
                  loading="eager"
                />

                {/* Stylized Angled Geometric Patchwork Divider between Content & Picture */}
                <div 
                  className={`absolute inset-0 bg-gradient-to-r ${slide.bgGradient} opacity-95 pointer-events-none`}
                  style={{
                    clipPath: 'polygon(0% 0%, 28% 0%, 0% 100%)'
                  }}
                />

                {/* Feathered Soft Gradient Patchwork Blend */}
                <div 
                  className={`absolute inset-y-0 left-0 w-16 sm:w-28 bg-gradient-to-r ${slide.patchGradient} to-transparent pointer-events-none`}
                />

                {/* Floating Assurance Patchwork Badge */}
                <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 hidden xs:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-white/20 text-white text-[9px] sm:text-[11px] font-black shadow-lg">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>{slide.patchBadge}</span>
                </div>
              </div>

            </div>
          );
        })}

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