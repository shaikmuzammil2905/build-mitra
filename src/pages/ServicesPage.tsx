import React, { useState } from 'react';
import { HOME_SERVICES_CATALOG, HomeService } from '../data/servicesData';
import { 
  Hammer, 
  ShieldCheck, 
  CheckCircle2, 
  Star, 
  Clock, 
  MapPin, 
  ArrowRight,
  Sparkles,
  Search,
  Filter
} from 'lucide-react';

interface ServicesPageProps {
  onOpenBooking: (serviceName: string) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ onOpenBooking }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Waterproofing', 'Painting', 'Electrical', 'Plumbing', 'Civil Works', 'Carpentry'];

  const filteredServices = HOME_SERVICES_CATALOG.filter(s => {
    const matchesCat = selectedCategory === 'All' || s.category === selectedCategory;
    const matchesQuery = !searchQuery || 
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      s.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.shortDesc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  return (
    <div className="pt-24 pb-20 bg-slate-50 min-h-screen">
      
      {/* Page Header */}
      <div className="bg-bm-navy text-white py-14 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold uppercase tracking-wider">
              <Hammer className="w-3.5 h-3.5" />
              <span>Module 03 • GPS-Verified On-Demand Trades</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              On-Demand Home & Civil Services
            </h1>
            <p className="text-base text-slate-300 leading-relaxed">
              Book certified civil contractors, waterproofing specialists, master plumbers, electricians, and turnkey painters. 100% background-checked with upfront transparent rate matrices and warranty guarantees.
            </p>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20 space-y-8">
        
        {/* Filter & Search Bar */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-lg border border-slate-200/90 flex flex-col md:flex-row items-center justify-between gap-4">
          
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search electrician, waterproofing..."
              className="w-full pl-9 pr-4 py-2 bg-slate-50 rounded-xl border border-slate-200 text-xs sm:text-sm font-medium focus:outline-none focus:border-blue-500"
            />
          </div>

        </div>

        {/* Services List Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="p-6 space-y-4">
                
                {/* Header Tag & Rating */}
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md">
                    {service.category}
                  </span>
                  <div className="flex items-center gap-1 bg-amber-50 text-amber-700 font-bold px-2 py-0.5 rounded-full text-xs">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{service.rating} ({service.reviewsCount})</span>
                  </div>
                </div>

                {/* Service Title */}
                <div>
                  <h3 className="text-xl font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
                    {service.name}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1 font-medium">
                    <Clock className="w-3.5 h-3.5 text-blue-600" />
                    <span>{service.eta}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {service.shortDesc}
                </p>

                {/* Pricing & Insurance Card */}
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-slate-400 uppercase font-semibold">Standard Pricing</span>
                    <div className="text-xl font-extrabold text-slate-900">{service.startingPrice}</div>
                    <div className="text-[11px] text-slate-500">{service.priceUnit}</div>
                  </div>

                  <div className="text-right text-xs">
                    <span className="text-[11px] text-slate-400 uppercase font-semibold">Coverage</span>
                    <div className="font-bold text-emerald-600">{service.insuranceCover}</div>
                    <div className="text-[11px] text-slate-500">Verified Pros</div>
                  </div>
                </div>

                {/* Scope of Work */}
                <div className="space-y-1.5 pt-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Standard Scope of Work:
                  </span>
                  {service.deliverables.slice(0, 3).map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-600">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

              </div>

              {/* Action Button */}
              <div className="p-6 pt-0">
                <button
                  onClick={() => onOpenBooking(`Book ${service.name}`)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-3 px-4 rounded-xl shadow-md transition-all active:scale-95 flex items-center justify-center gap-2"
                >
                  <span>Book Verified Service</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
