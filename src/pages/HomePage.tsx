import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { HeroSection } from '../components/HeroSection';
import { LiveMaterialRates } from '../components/LiveMaterialRates';
import { CoreModules } from '../components/CoreModules';
import { EngineeringToolsGrid } from '../components/EngineeringToolsGrid';
import { WhyChooseUs } from '../components/WhyChooseUs';
import { LeadershipSection } from '../components/LeadershipSection';
import { HomeLoanCalculatorCard } from '../components/HomeLoanCalculatorCard';
import { CalculatorModal } from '../components/CalculatorModal';
import { QuickViewModal } from '../components/QuickViewModal';
import { EnquiryModal } from '../components/EnquiryModal';
import { EngineeringCalculator } from '../data/calculatorsData';
import { PlatformModule } from '../data/modulesData';
import { 
  Paintbrush, 
  Building2, 
  Wrench, 
  Sparkles, 
  Droplets, 
  Zap, 
  Hammer, 
  Grid,
  Clock, 
  Star, 
  Building, 
  Calculator, 
  ChevronRight, 
  Layers,
  Check,
  CheckCircle2
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { categories, bookings, providers, selectedCity, setAuthModalOpen, setAuthStep } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  // Modals state for interactive features
  const [activeCalculator, setActiveCalculator] = useState<EngineeringCalculator | null>(null);
  const [quickViewModule, setQuickViewModule] = useState<PlatformModule | null>(null);
  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);
  const [enquiryTopic, setEnquiryTopic] = useState('General Consultation');

  // 8 Services matching Screen 5 & image copy 20.png
  const mainServices = [
    { id: 'painting', name: 'Painting', icon: Paintbrush, path: '/services/painting' },
    { id: 'construction', name: 'Construction', icon: Building2, path: '/services/construction' },
    { id: 'repairs', name: 'Repairs', icon: Wrench, path: '/services/repairs' },
    { id: 'cleaning', name: 'Cleaning', icon: Sparkles, path: '/services/cleaning' },
    { id: 'plumbing', name: 'Plumbing', icon: Droplets, path: '/services/plumbing' },
    { id: 'electrical', name: 'Electrical', icon: Zap, path: '/services/electrical' },
    { id: 'carpentry', name: 'Carpentry', icon: Hammer, path: '/services/carpentry' },
    { id: 'others', name: 'Others', icon: Grid, path: '/services' },
  ];

  // Product categories matching image copy 21.png
  const productSections = [
    {
      categoryId: 'cleaning',
      title: 'Housekeeping & Cleaning',
      serviceCount: '3 services',
      icon: Sparkles,
      iconBg: 'bg-emerald-100 text-emerald-700',
      items: [
        {
          id: 'cleaning-staff',
          name: 'Cleaning Staff',
          image: '/assets/cleaning_staff.jpg',
          available: true,
          desc: 'Deep house cleaning, washroom stain removal & surface sanitization',
          price: '₹1,000',
          unit: '/visit',
          serviceId: 'post-construction-cleaning'
        },
        {
          id: 'housekeeping-staff',
          name: 'Housekeeping Staff',
          image: '/assets/housekeeping_gloves.jpg',
          available: true,
          desc: 'Daily cleaning, dusting, dusting waste disposal & kitchen cleaning',
          price: '₹450',
          unit: '/day',
          serviceId: 'post-construction-cleaning'
        },
        {
          id: 'deep-scrubbing',
          name: 'Post-Construction Scrubbing',
          image: '/assets/services.jpg',
          available: true,
          desc: 'Industrial mechanized single-disc scrubbing for newly built homes',
          price: '₹3,500',
          unit: '/visit',
          serviceId: 'post-construction-cleaning'
        }
      ]
    },
    {
      categoryId: 'carpentry',
      title: 'Interior & Carpentry',
      serviceCount: '3 services',
      icon: Hammer,
      iconBg: 'bg-purple-100 text-purple-700',
      items: [
        {
          id: 'custom-carpentry',
          name: 'Custom Furniture & Wardrobes',
          image: '/assets/labour.jpg',
          available: true,
          desc: 'Plywood cutting, edge banding, modular kitchen cabinets crafting',
          price: '₹1,200',
          unit: '/day',
          serviceId: 'custom-furniture'
        },
        {
          id: 'door-lock-fitting',
          name: 'Door & Smart Lock Setup',
          image: '/assets/services.jpg',
          available: true,
          desc: 'Precision hinge alignment, biometric smart locks & master latch fitting',
          price: '₹499',
          unit: '/visit',
          serviceId: 'custom-furniture'
        },
        {
          id: 'wood-polishing',
          name: 'Wood Polish & PU Finish',
          image: '/assets/engineering.jpg',
          available: true,
          desc: 'Italian spray polish, teak restoration & melamine finish for furniture',
          price: '₹800',
          unit: '/visit',
          serviceId: 'custom-furniture'
        }
      ]
    },
    {
      categoryId: 'painting',
      title: 'Painting & Wall Care',
      serviceCount: '3 services',
      icon: Paintbrush,
      iconBg: 'bg-blue-100 text-blue-700',
      items: [
        {
          id: 'interior-painting',
          name: 'Turnkey Interior Painting',
          image: '/assets/services.jpg',
          available: true,
          desc: 'Asian Paints Royale, dust-free sanding & full furniture masking',
          price: '₹14',
          unit: '/sq.ft',
          serviceId: 'interior-painting'
        },
        {
          id: 'waterproofing-dampproof',
          name: 'Waterproof Dampproof Coating',
          image: '/assets/engineering.jpg',
          available: true,
          desc: 'Crystalline negative damp proofing, infrared scan, 10-year warranty',
          price: '₹38',
          unit: '/sq.ft',
          serviceId: 'waterproofing-paint'
        },
        {
          id: 'designer-textures',
          name: 'Designer Italian Wall Textures',
          image: '/assets/hero-desktop.png',
          available: true,
          desc: 'Artistic Italian stucco, metallic glaze & accent wall stencils',
          price: '₹2,500',
          unit: '/wall',
          serviceId: 'premium-finish'
        }
      ]
    },
    {
      categoryId: 'repairs',
      title: 'Electrical & Plumbing Repairs',
      serviceCount: '3 services',
      icon: Wrench,
      iconBg: 'bg-amber-100 text-amber-700',
      items: [
        {
          id: 'cpvc-piping',
          name: 'Concealed CPVC Pipe Setup',
          image: '/assets/cat_plumbing.jpg',
          available: true,
          desc: 'Astral CPVC, 10 kg/cm² pressure tested, leakproof solvent weld',
          price: '₹1,100',
          unit: '/point',
          serviceId: 'concealed-plumbing'
        },
        {
          id: 'db-dressing',
          name: 'Short-Circuit & DB Dressing',
          image: '/assets/cat_electrical.jpg',
          available: true,
          desc: 'MCB trip repair, load balancing, FRLS fire-retardant wiring',
          price: '₹399',
          unit: '/visit',
          serviceId: 'home-rewiring'
        },
        {
          id: 'booster-pump',
          name: 'Automatic Booster Pump Setup',
          image: '/assets/cat_plumbing.jpg',
          available: true,
          desc: 'Pressure switch, dry run protection, overhead tank bypass piping',
          price: '₹2,500',
          unit: '/job',
          serviceId: 'pump-installation'
        }
      ]
    }
  ];

  const activeJob = bookings.find(b => b.status === 'In Progress' || b.status === 'On the Way' || b.status === 'Request Placed' || b.status === 'Provider Accepted');

  return (
    <div className="pb-28">
      
      {/* 1. APP HERO SECTION (Clean Search Bar + Grand Blue Hero Banner with Painter as in image copy 20.png) */}
      <HeroSection 
        onSearchSubmit={(q) => {
          setSearchQuery(q);
          navigate(`/services?q=${encodeURIComponent(q)}`);
        }}
        onOpenEnquiry={(topic) => {
          setEnquiryTopic(topic || 'General Consultation');
          setEnquiryModalOpen(true);
        }}
      />

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 space-y-10 mt-6">

        {/* 2. "OUR SERVICES" - 8 Clean App Cards (Exact Match to image copy 20.png) */}
        <div>
          <div className="flex items-center justify-between mb-3 px-1">
            <h2 className="text-base sm:text-xl font-black text-slate-900 tracking-tight">
              Our Services
            </h2>
            <Link
              to="/services"
              className="text-xs sm:text-sm font-bold text-blue-600 hover:text-blue-700 flex items-center gap-0.5"
            >
              <span>See all</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-4 sm:grid-cols-4 lg:grid-cols-8 gap-2.5 sm:gap-4">
            {mainServices.map((svc) => {
              const Icon = svc.icon;
              return (
                <Link
                  key={svc.id}
                  to={svc.path}
                  className="group flex flex-col items-center text-center p-3 sm:p-4 rounded-2xl bg-white border border-slate-100 shadow-2xs hover:shadow-md hover:border-blue-300 transition-all"
                >
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-blue-50/80 border border-blue-100 flex items-center justify-center mb-2 transition-transform duration-300 group-hover:scale-110">
                    <Icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <span className="text-xs sm:text-sm font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
                    {svc.name}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* 3. HOME LOAN EMI CALCULATOR (Exact Match to image copy 26.png) */}
        <div>
          <HomeLoanCalculatorCard 
            onApplyLoan={(loanDetails) => {
              setEnquiryTopic(`Home Loan Application: ₹${(loanDetails.amount / 100000).toFixed(1)} Lakhs for ${loanDetails.tenure} Years (EMI: ₹${loanDetails.emi.toLocaleString('en-IN')})`);
              setEnquiryModalOpen(true);
            }}
          />
        </div>

        {/* 4. PRODUCT & SERVICE SHOWCASES (Exact Match to image copy 21.png) */}
        <div className="space-y-8">
          {productSections.map((section) => {
            const SectionIcon = section.icon;
            return (
              <div key={section.title} className="space-y-3">
                
                {/* Category Header with Pill Icon + Count + See all */}
                <div className="flex items-center justify-between px-1">
                  <div className="flex items-center gap-2.5">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${section.iconBg}`}>
                      <SectionIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-black text-slate-900 leading-tight">
                        {section.title}
                      </h3>
                      <span className="text-[11px] font-semibold text-slate-400">
                        {section.serviceCount}
                      </span>
                    </div>
                  </div>

                  <Link
                    to={`/services/${section.categoryId}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-full transition-colors"
                  >
                    <span>See all</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                {/* Horizontal Scrolling Product Cards (per image copy 21.png) */}
                <div className="flex gap-3 sm:gap-4 overflow-x-auto pb-2 pt-1 no-scrollbar sm:grid sm:grid-cols-3 sm:overflow-visible">
                  {section.items.map((prod) => (
                    <div 
                      key={prod.id}
                      className="w-[230px] sm:w-auto shrink-0 bg-white rounded-2xl border border-slate-100 shadow-2xs hover:shadow-md hover:border-slate-200 transition-all flex flex-col justify-between overflow-hidden group"
                    >
                      {/* Product Thumbnail with Available Badge */}
                      <div className="relative h-32 sm:h-36 w-full overflow-hidden bg-slate-100">
                        <img 
                          src={prod.image} 
                          alt={prod.name}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          loading="lazy"
                        />
                        {prod.available && (
                          <div className="absolute bottom-2.5 left-2.5 bg-emerald-600/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 backdrop-blur-xs shadow-xs">
                            <Check className="w-3 h-3 stroke-[3]" />
                            <span>Available</span>
                          </div>
                        )}
                      </div>

                      {/* Product Details */}
                      <div className="p-3.5 flex flex-col flex-1 justify-between gap-3">
                        <div>
                          <h4 className="text-xs sm:text-sm font-bold text-slate-900 line-clamp-1 group-hover:text-blue-600 transition-colors">
                            {prod.name}
                          </h4>
                          <p className="text-[11px] text-slate-500 line-clamp-2 mt-0.5 leading-relaxed">
                            {prod.desc}
                          </p>
                        </div>

                        {/* Price & Book Button (per image copy 21.png) */}
                        <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                          <div>
                            <span className="text-xs sm:text-sm font-black text-slate-900">{prod.price}</span>
                            <span className="text-[10px] text-slate-400 font-medium ml-0.5">{prod.unit}</span>
                          </div>

                          <Link
                            to={`/service/${prod.serviceId}`}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-3.5 py-1.5 rounded-xl shadow-xs transition-colors active:scale-95"
                          >
                            Book
                          </Link>
                        </div>
                      </div>

                    </div>
                  ))}
                </div>

              </div>
            );
          })}
        </div>

        {/* 4. ACTIVE BOOKING STATUS STRIP (if user has active request) */}
        {activeJob && (
          <div 
            onClick={() => navigate(`/booking/${activeJob.id}`)}
            className="bg-gradient-to-r from-blue-900 via-slate-900 to-indigo-950 text-white p-4 rounded-3xl shadow-md border border-blue-800 flex items-center justify-between gap-3 cursor-pointer hover:shadow-lg transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-white/10 flex items-center justify-center shrink-0 border border-white/20">
                <Clock className="w-5 h-5 text-amber-400 animate-spin" style={{ animationDuration: '8s' }} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-xs text-amber-400">#{activeJob.id}</span>
                  <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-extrabold px-2 py-0.5 rounded-full border border-emerald-400/30">
                    {activeJob.status}
                  </span>
                </div>
                <div className="font-extrabold text-sm text-white mt-0.5">
                  {activeJob.serviceName}
                </div>
                <div className="text-[11px] text-slate-300">
                  Assigned: {activeJob.provider?.name || 'Verified Specialist'} • Tap to track live
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1 text-xs font-bold text-amber-400 group-hover:translate-x-1 transition-transform shrink-0">
              <span>Track</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>
        )}

        {/* 5. DIGITAL ECOSYSTEM MODULE CARDS (Real Estate, 3D House Designs, Cost Calculator) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* Real Estate Module Card */}
          <Link 
            to="/real-estate"
            className="group bg-gradient-to-br from-indigo-900 via-blue-900 to-slate-900 text-white rounded-3xl p-5 shadow-sm hover:shadow-md border border-indigo-800 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center text-amber-300 mb-3 border border-white/20 group-hover:scale-110 transition-transform">
                <Building className="w-5 h-5" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white">Real Estate Marketplace</h3>
              <p className="text-xs sm:text-sm text-blue-200 mt-1 leading-relaxed">
                Buy, rent, and sell verified apartments, luxury villas, and commercial plots with zero brokerage.
              </p>
            </div>
            <div className="flex items-center gap-1 text-xs sm:text-sm font-bold text-amber-300 mt-4 group-hover:translate-x-1 transition-transform">
              <span>Browse Listings</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </Link>

          {/* 3D House Designs Card */}
          <Link 
            to="/3d-designs"
            className="group bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-900 text-white rounded-3xl p-5 shadow-sm hover:shadow-md border border-slate-800 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center text-emerald-400 mb-3 border border-white/20 group-hover:scale-110 transition-transform">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white">3D House & Villa Designs</h3>
              <p className="text-xs sm:text-sm text-blue-200 mt-1 leading-relaxed">
                Interactive 3D exterior and interior house designs, Vastu-compliant blueprints, and instant turnkey quotes.
              </p>
            </div>
            <div className="flex items-center gap-1 text-xs sm:text-sm font-bold text-emerald-400 mt-4 group-hover:translate-x-1 transition-transform">
              <span>Inspect 3D Models</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </Link>

          {/* Construction Cost Calculator Card */}
          <Link 
            to="/calculator"
            className="group bg-gradient-to-br from-blue-950 via-slate-900 to-blue-900 text-white rounded-3xl p-5 shadow-sm hover:shadow-md border border-blue-900 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center text-yellow-400 mb-3 border border-white/20 group-hover:scale-110 transition-transform">
                <Calculator className="w-5 h-5" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white">Construction Cost Calculator</h3>
              <p className="text-xs sm:text-sm text-blue-200 mt-1 leading-relaxed">
                Input area in sq.ft and material grades to calculate exact cement, steel, sand, and labour cost estimates.
              </p>
            </div>
            <div className="flex items-center gap-1 text-xs sm:text-sm font-bold text-yellow-400 mt-4 group-hover:translate-x-1 transition-transform">
              <span>Calculate Cost</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </Link>

        </div>

      </div>

      {/* 6. LIVE MATERIAL RATES & MARKET PRICING */}
      <div className="mt-12">
        <LiveMaterialRates 
          onOpenAllRates={(city) => {
            navigate('/materials');
          }}
          onRequestQuote={(material, city) => {
            setEnquiryTopic(`Material Bulk Quotation: ${material} in ${city}`);
            setEnquiryModalOpen(true);
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 space-y-12 mt-12">

        {/* 7. NEARBY TOP-RATED SERVICE PROVIDERS */}
        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-100 shadow-2xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-xl font-black text-slate-900">Top-Rated Nearby Providers</h2>
                <span className="text-[10px] font-bold bg-emerald-50 text-emerald-700 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  GPS Live
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-500">Instant matching based on real-time location in {selectedCity}</p>
            </div>
            <Link
              to="/nearby-providers"
              className="text-xs sm:text-sm font-bold text-blue-600 hover:text-blue-700 flex items-center gap-0.5"
            >
              <span>Open Map</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {providers.slice(0, 4).map((p) => (
              <div 
                key={p.id}
                className="p-3.5 rounded-2xl bg-slate-50/70 border border-slate-100 hover:border-blue-200 transition-all flex flex-col justify-between"
              >
                <div className="flex items-center gap-3 mb-2.5">
                  <img 
                    src={p.avatar} 
                    alt={p.name} 
                    className="w-11 h-11 rounded-full object-cover border-2 border-blue-500 shrink-0" 
                  />
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900">{p.name}</h4>
                    <div className="text-[11px] text-slate-500">{p.specialization}</div>
                    <div className="flex items-center gap-1 text-[11px] font-bold text-amber-600 mt-0.5">
                      <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                      <span>{p.rating} ({p.reviewsCount} reviews)</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-200/60 text-xs">
                  <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                    {p.distanceKm} km away • {p.etaMinutes} mins
                  </span>
                  <Link
                    to={`/services/${p.serviceCategory}`}
                    className="text-xs font-bold text-blue-600 hover:text-blue-700"
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* 8. CORE INFRASTRUCTURE MODULES */}
      <div className="mt-12">
        <CoreModules 
          onQuickView={(mod) => setQuickViewModule(mod)}
        />
      </div>

      {/* 9. SMART ENGINEERING CALCULATORS */}
      <div className="mt-8">
        <EngineeringToolsGrid 
          onOpenCalculator={(calc) => setActiveCalculator(calc)}
          onOpenBOQ={() => navigate('/calculator')}
        />
      </div>

      {/* 10. WHY CHOOSE BUILDMITRA */}
      <div className="mt-8">
        <WhyChooseUs 
          onSelectFeature={(title, desc) => {
            setEnquiryTopic(`Feature Query: ${title}`);
            setEnquiryModalOpen(true);
          }}
        />
      </div>

      {/* 11. LEADERSHIP & CIVIL ENGINEERING PEDIGREE */}
      <div className="mt-8">
        <LeadershipSection />
      </div>

      {/* 12. PARTNER ONBOARDING BANNER */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 mt-12">
        <div className="bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 text-slate-950 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-wider bg-black/10 px-2.5 py-0.5 rounded-full inline-block mb-1.5">
              Partner Recruitment Drive
            </span>
            <h3 className="text-lg sm:text-2xl font-black">
              Are You a Skilled Professional or Contractor?
            </h3>
            <p className="text-xs sm:text-sm text-slate-900 mt-1 max-w-xl">
              Join 5,000+ verified service partners. Get daily customer bookings in your locality with zero onboarding commission.
            </p>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <Link
              to="/partner/register"
              className="bg-slate-950 hover:bg-slate-900 text-white font-extrabold text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-md transition-all active:scale-95"
            >
              Register as Partner
            </Link>
            <Link
              to="/partner/dashboard"
              className="bg-white/80 hover:bg-white text-slate-900 font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl border border-slate-300 transition-all"
            >
              Partner Login
            </Link>
          </div>
        </div>
      </div>

      {/* Interactive Modals */}
      <CalculatorModal 
        calculator={activeCalculator}
        onClose={() => setActiveCalculator(null)}
        onAddToBOQ={() => {
          setActiveCalculator(null);
          navigate('/calculator');
        }}
      />

      <QuickViewModal 
        module={quickViewModule}
        onClose={() => setQuickViewModule(null)}
        onEnquire={(topic) => {
          setQuickViewModule(null);
          setEnquiryTopic(topic);
          setEnquiryModalOpen(true);
        }}
      />

      <EnquiryModal 
        isOpen={enquiryModalOpen}
        onClose={() => setEnquiryModalOpen(false)}
        defaultTopic={enquiryTopic}
      />

    </div>
  );
};

export default HomePage;