import React, { useState } from 'react';
import { HOME_SERVICES_CATALOG } from '../data/servicesData';
import { useApp } from '../context/AppContext';
import { 
  Hammer, 
  ShieldCheck, 
  CheckCircle2, 
  Star, 
  Clock, 
  ArrowRight,
  Search,
  ChevronDown,
  ChevronRight,
  Sparkles,
  HelpCircle,
  ChevronUp,
  FileCheck,
  Check,
  Award,
  Layers,
  Wrench,
  UserCheck
} from 'lucide-react';

interface ServicesPageProps {
  onOpenBooking: (serviceName: string) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ onOpenBooking }) => {
  const { serviceRates } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Visual Category Tiles per image copy 9.png
  const visualCategories = [
    { id: 'Waterproofing', name: 'Waterproofing', image: '/assets/services.jpg', subtitle: 'Terrace & Sump' },
    { id: 'Painting', name: 'Painting', image: '/assets/services.jpg', subtitle: 'Interior & Exterior' },
    { id: 'Electrical', name: 'Electrical', image: '/assets/cat_electrical.jpg', subtitle: 'Wiring & Panels' },
    { id: 'Plumbing', name: 'Plumbing', image: '/assets/cat_plumbing.jpg', subtitle: 'Piping & Pumps' },
    { id: 'Civil Works', name: 'Civil Works', image: '/assets/engineering.jpg', subtitle: 'Turnkey & Remodel' },
    { id: 'Carpentry', name: 'Carpentry', image: '/assets/floor-plans.jpg', subtitle: 'Modular & Doors' },
  ];

  const categories = ['All', 'Waterproofing', 'Painting', 'Electrical', 'Plumbing', 'Civil Works', 'Carpentry'];

  const filteredServices = HOME_SERVICES_CATALOG.map(s => {
    // Dynamic override from Admin Panel
    const override = serviceRates?.[s.id] 
      || (s.category === 'Waterproofing' ? serviceRates?.['service-waterproofing'] || serviceRates?.['SRV-05'] : undefined)
      || (s.category === 'Painting' ? serviceRates?.['service-painting'] || serviceRates?.['SRV-02'] : undefined)
      || (s.category === 'Electrical' ? serviceRates?.['service-electrician'] || serviceRates?.['SRV-03'] : undefined)
      || (s.category === 'Plumbing' ? serviceRates?.['service-plumber'] || serviceRates?.['SRV-04'] : undefined)
      || (s.category === 'Civil Works' ? serviceRates?.['service-civil'] || serviceRates?.['SRV-01'] : undefined)
      || (s.category === 'Carpentry' ? serviceRates?.['service-carpenter'] || serviceRates?.['SRV-06'] : undefined);

    if (override) {
      const parts = override.split('/');
      return { ...s, startingPrice: parts[0]?.trim() || s.startingPrice, priceUnit: parts[1] ? `per ${parts[1].trim()}` : s.priceUnit };
    }
    return s;
  }).filter(s => {
    const matchesCat = selectedCategory === 'All' || s.category === selectedCategory;
    const matchesQuery = !searchQuery || 
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      s.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.shortDesc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  const rateCard = [
    { trade: 'Internal Emulsion Painting (2 Coats + Primer)', unitRate: serviceRates?.['SRV-02'] || '₹ 14 – 18 / Sq.Ft', timeEstimate: '3–5 Days', materials: 'Asian Paints / Berger Premium' },
    { trade: 'External Weather-Proof Elastomeric Painting', unitRate: serviceRates?.['SRV-02'] ? `${serviceRates['SRV-02']} (Weather-Proof)` : '₹ 22 – 28 / Sq.Ft', timeEstimate: '5–8 Days', materials: 'Apex Ultima / WeatherCoat' },
    { trade: 'Crystalline Terrace Waterproofing + Screed', unitRate: serviceRates?.['SRV-05'] || serviceRates?.['service-waterproofing'] || '₹ 45 – 65 / Sq.Ft', timeEstimate: '4–6 Days', materials: 'Dr. Fixit / Fosroc Brushbond' },
    { trade: 'Underground Sump Chemical Epoxy Grouting', unitRate: serviceRates?.['SRV-05'] || '₹ 55 – 75 / Sq.Ft', timeEstimate: '2–3 Days', materials: 'Food-Grade Epoxy Grout' },
    { trade: 'Concealed CPVC Plumbing (Per Point)', unitRate: serviceRates?.['SRV-04'] || '₹ 650 – 850 / Point', timeEstimate: 'Per Bathroom: 2 Days', materials: 'Astral / Supreme CPVC' },
    { trade: 'Electrical Concealed Wiring (Per Point)', unitRate: serviceRates?.['SRV-03'] || '₹ 500 – 700 / Point', timeEstimate: '1–2 Days', materials: 'Finolex FRLS / Havells Wires' },
    { trade: 'Vitrified Floor Tile Laying (Laser Leveled)', unitRate: '₹ 28 – 35 / Sq.Ft', timeEstimate: '1000 Sq.Ft: 4 Days', materials: 'Laticrete Adhesive & Spacer' },
    { trade: 'Full Turnkey Civil Structure (Labour + Material)', unitRate: serviceRates?.['SRV-01'] || '₹ 1,750 – 2,200 / Sq.Ft', timeEstimate: '6–9 Months', materials: 'A-Grade Cement & Fe 550D Rebars' }
  ];

  const faqs = [
    {
      q: 'How does BuildMitra ensure contractors do not abandon the site midway?',
      a: 'All project milestones are managed through the BuildMitra Escrow Engine. Contractor payments are tied strictly to 4 verifiable civil milestones. If a contractor underperforms, our backup master contractor pool takes over with zero capital loss.'
    },
    {
      q: 'Are the materials included in the quotes, or is it labour-only?',
      a: 'You can choose between "Labour with Material" (where BuildMitra procures certified materials at mill prices) or "Labour Only" (where you provide materials and our verified trades execute the job).'
    },
    {
      q: 'What warranties are provided on waterproofing and structural repair?',
      a: 'We provide an official 5-year written warranty certificate on crystalline terrace waterproofing and structural dampness repair, backed by our NABL chemical adhesion audit.'
    },
    {
      q: 'Do you charge for initial site measurement and quotation?',
      a: 'No. Site inspection and preliminary quotation by a certified BuildMitra field supervisor is 100% free across Bengaluru, Kanakapura, Electronic City, Whitefield, and Yelahanka.'
    },
    {
      q: 'What is the background verification protocol for electricians and plumbers?',
      a: 'Every tradesperson is verified with Government Aadhaar KYC, ITI certification or minimum 5-year trade apprenticeship, police record clearance, and continuous customer rating audits.'
    }
  ];

  return (
    <div className="pt-16 sm:pt-20 pb-20 bg-slate-50 min-h-screen">
      
      {/* DESKTOP ONLY Page Header - REMOVED ON MOBILE per image copy 8.png */}
      <div className="hidden md:block bg-bm-navy text-white py-12 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold uppercase tracking-wider">
              <Hammer className="w-3.5 h-3.5" />
              <span>Module 03 • GPS-Verified On-Demand Trades</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              On-Demand Home & Civil Services
            </h1>
            <p className="text-sm text-slate-300 leading-relaxed">
              Book certified civil contractors, waterproofing specialists, master plumbers, electricians, and turnkey painters. 100% background-checked with upfront transparent rate matrices and warranty guarantees.
            </p>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 space-y-12">
        
        {/* SECTION 1: TOP SEARCH & DROPDOWN BAR (per image copy 9.png) */}
        <div className="bg-white rounded-3xl p-4 sm:p-5 shadow-sm border border-slate-200/90 space-y-4">
          
          <div className="flex flex-col sm:flex-row items-stretch gap-3">
            {/* Search Input Box with Search Button */}
            <div className="relative flex-1 flex items-center bg-slate-50 rounded-2xl border border-slate-200 p-1.5 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 transition-all">
              <Search className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400 ml-2.5 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search electrician, plumber, painting, waterproofing, contractor..."
                className="w-full px-3 py-1.5 bg-transparent text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none"
              />
              <button
                onClick={() => {}}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-xs transition-all shrink-0 active:scale-95"
              >
                Search
              </button>
            </div>

            {/* Category Dropdown */}
            <div className="relative w-full sm:w-56 shrink-0">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full h-full px-4 py-3 bg-slate-50 hover:bg-slate-100 rounded-2xl border border-slate-200 text-xs sm:text-sm font-bold text-slate-800 focus:outline-none focus:border-blue-500 cursor-pointer appearance-none transition-colors"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c === 'All' ? '🛠️ All Services' : `🔧 ${c}`}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-slate-500 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* VISUAL SERVICE TILES (per image copy 9.png) */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <div className="text-xs sm:text-sm font-extrabold text-slate-900 flex items-center gap-1.5">
                <span className="w-1.5 h-3.5 bg-emerald-500 rounded-full"></span>
                <span>Service Categories</span>
              </div>
              <button 
                onClick={() => setSelectedCategory('All')}
                className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-0.5"
              >
                View All <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Category Photos Grid */}
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2.5 sm:gap-4 overflow-x-auto pb-1 scrollbar-none">
              {visualCategories.map((cat) => {
                const isSelected = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`group rounded-2xl p-2 sm:p-2.5 transition-all text-center flex flex-col items-center justify-between border ${
                      isSelected
                        ? 'bg-emerald-50 border-emerald-500 ring-2 ring-emerald-200 shadow-sm'
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

        {/* SECTION 2: FEATURED SERVICES LIST */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="text-base sm:text-lg font-extrabold text-slate-900 flex items-center gap-1.5">
              <span className="w-1.5 h-4 bg-emerald-600 rounded-full"></span>
              <span>Verified Home & Civil Services ({filteredServices.length})</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredServices.map((service) => (
              <div
                key={service.id}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
              >
                <div className="relative h-44 bg-slate-100 overflow-hidden">
                  <img
                    src={
                      service.category === 'Electrical' ? '/assets/cat_electrical.jpg' :
                      service.category === 'Plumbing' ? '/assets/cat_plumbing.jpg' :
                      service.category === 'Civil Works' ? '/assets/engineering.jpg' :
                      service.category === 'Carpentry' ? '/assets/floor-plans.jpg' :
                      '/assets/services.jpg'
                    }
                    alt={service.name}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 bg-emerald-600 text-white font-mono text-[11px] font-bold px-2.5 py-0.5 rounded-md shadow-xs">
                    {service.category}
                  </div>
                  <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm text-amber-700 text-[11px] font-bold px-2 py-0.5 rounded-md shadow-xs flex items-center gap-1">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" /> {service.rating}
                  </div>
                </div>

                <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-base font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
                      {service.name}
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1 font-medium">
                      <Clock className="w-3.5 h-3.5 text-blue-600" />
                      <span>{service.eta}</span>
                    </div>
                    <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                      {service.shortDesc}
                    </p>
                  </div>

                  <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-bold">Standard Rate</span>
                      <div className="text-lg font-black text-slate-900">{service.startingPrice}</div>
                      <div className="text-[10px] text-slate-500">{service.priceUnit}</div>
                    </div>
                    <div className="text-right text-xs">
                      <span className="text-[10px] text-slate-400 uppercase font-bold">Warranty</span>
                      <div className="font-bold text-emerald-600 text-xs">{service.insuranceCover}</div>
                      <div className="text-[10px] text-slate-500">100% Insured</div>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-100">
                    <button
                      onClick={() => onOpenBooking(`Book ${service.name}`)}
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-3 px-4 rounded-xl shadow-xs transition-all active:scale-95 flex items-center justify-center gap-1.5"
                    >
                      <span>Book Verified Professional</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                </div>

              </div>
            ))}
          </div>
        </div>

        {/* SECTION 3: STANDARD TRANSPARENT RATE CARD (2024–2026) */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/90 space-y-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-2">
              <FileCheck className="w-3.5 h-3.5" />
              <span>Transparent Pricing Schedule</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900">
              Bengaluru Standard Trade Rate Card (2024–2026)
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Admin-benchmarked service rates to prevent arbitrary overcharging on residential and commercial sites.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-800 font-extrabold border-b border-slate-200">
                  <th className="p-3.5 rounded-l-xl">Service Scope / Trade</th>
                  <th className="p-3.5">Standard Unit Rate</th>
                  <th className="p-3.5">Estimated Duration</th>
                  <th className="p-3.5 rounded-r-xl">Materials Standard</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {rateCard.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-3.5 font-bold text-slate-900">{item.trade}</td>
                    <td className="p-3.5 font-mono text-emerald-700 font-bold">{item.unitRate}</td>
                    <td className="p-3.5 text-slate-600">{item.timeEstimate}</td>
                    <td className="p-3.5 text-slate-500">{item.materials}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* SECTION 4: 4-STAGE QUALITY AUDIT PROTOCOL */}
        <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="max-w-2xl space-y-2">
            <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
              Quality Assurance Framework
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              4-Stage Supervisor Inspection Checklist
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              BuildMitra deploys senior civil site engineers to physically inspect and sign off on your site work.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white/5 p-5 rounded-2xl border border-white/10 space-y-2">
              <div className="text-lg font-black text-emerald-400">Audit 01</div>
              <div className="text-sm font-extrabold text-white">Surface & Rebar Check</div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Verification of clear cover blocks, rebar spacing, shuttering oil application, and water tightness before concrete pour.
              </p>
            </div>

            <div className="bg-white/5 p-5 rounded-2xl border border-white/10 space-y-2">
              <div className="text-lg font-black text-blue-400">Audit 02</div>
              <div className="text-sm font-extrabold text-white">Plumbing Pressure Test</div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Hydrostatic pressure testing at 10 kg/cm² for 24 hours on concealed water supply pipes to eliminate concealed leaks.
              </p>
            </div>

            <div className="bg-white/5 p-5 rounded-2xl border border-white/10 space-y-2">
              <div className="text-lg font-black text-amber-400">Audit 03</div>
              <div className="text-sm font-extrabold text-white">Megger Insulation Test</div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Electrical insulation resistance verification across circuits and earthing pit resistance measurement below 1 Ohm.
              </p>
            </div>

            <div className="bg-white/5 p-5 rounded-2xl border border-white/10 space-y-2">
              <div className="text-lg font-black text-purple-400">Audit 04</div>
              <div className="text-sm font-extrabold text-white">Waterponding & Snags</div>
              <p className="text-xs text-slate-300 leading-relaxed">
                72-hour terrace water ponding test to certify waterproofing integrity, hollow-tile acoustics audit, and paint sheen inspection.
              </p>
            </div>
          </div>
        </div>

        {/* SECTION 5: ESCROW PROTECTION & GUARANTEES */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h4 className="text-base font-extrabold text-slate-900">
              Milestone Escrow Security
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Your money is locked in a regulated escrow account. Contractors receive payouts only after site engineers certify milestone sign-offs.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              <UserCheck className="w-6 h-6" />
            </div>
            <h4 className="text-base font-extrabold text-slate-900">
              100% Aadhaar KYC Verified
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Every master contractor and team lead is vetted with physical ID proof, police verification, and a minimum 5-year local track record.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
              <Award className="w-6 h-6" />
            </div>
            <h4 className="text-base font-extrabold text-slate-900">
              Up to 5-Year Warranty
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Written warranty cards for terrace waterproofing, anti-termite soil treatment, and structural renovations with free follow-up service.
            </p>
          </div>
        </div>

        {/* SECTION 6: SERVICES FAQ ACCORDION */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/90 space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold uppercase tracking-wider">
              <HelpCircle className="w-3.5 h-3.5 text-emerald-600" />
              <span>Everything Answered</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900">
              Home & Civil Services FAQs
            </h3>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div key={index} className="rounded-2xl border border-slate-200 overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-extrabold text-xs sm:text-sm text-slate-900 hover:text-emerald-600 transition-colors"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? <ChevronUp className="w-4 h-4 text-emerald-600 shrink-0" /> : <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />}
                  </button>
                  {isOpen && (
                    <div className="px-4 sm:px-5 pb-5 text-xs text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};
