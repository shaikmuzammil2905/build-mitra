import React, { useState } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { 
  ChevronLeft, 
  MapPin, 
  Star, 
  CheckCircle2, 
  Navigation, 
  ArrowRight,
  ShieldCheck,
  Phone
} from 'lucide-react';

export const NearbyProvidersPage: React.FC = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const { providers, getSubService, createBooking, categories, currentUser } = useApp();
  
  const date = searchParams.get('date') || 'Thu, Nov 14';
  const time = searchParams.get('time') || '10:00 AM';

  const service = (serviceId ? getSubService(serviceId) : null) || categories[0].subServices[0];
  const [selectedProviderId, setSelectedProviderId] = useState<string>(providers[0].id);

  const handleSelectProvider = (prov: typeof providers[0]) => {
    const booking = createBooking(
      service, 
      prov, 
      date, 
      time, 
      currentUser.addresses[0] || 'Madhapur, Hyderabad'
    );
    navigate(`/booking/${booking.id}`);
  };

  return (
    <div className="relative min-h-[92vh] flex flex-col justify-between max-w-xl mx-auto overflow-hidden bg-slate-100">
      
      {/* Top Floating App Bar (per image copy 14.png Screen 8) */}
      <div className="absolute top-3 left-4 right-4 z-30 flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="w-10 h-10 rounded-full bg-white/95 backdrop-blur-md shadow-md border border-slate-200 flex items-center justify-center text-slate-800 hover:text-slate-950 transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div className="bg-white/95 backdrop-blur-md px-4 py-2 rounded-full shadow-md border border-slate-200 text-xs font-black text-slate-900 flex items-center gap-1.5">
          <Navigation className="w-3.5 h-3.5 text-blue-600 animate-spin" style={{ animationDuration: '10s' }} />
          <span>Nearby Providers</span>
        </div>
        <div className="w-10"></div>
      </div>

      {/* Interactive Map View with Customer Pin & Provider Pins (per image copy 14.png Screen 8) */}
      <div className="relative flex-1 w-full h-full min-h-[55vh] bg-slate-200 overflow-hidden">
        {/* Stylized Vector Grid Road Map */}
        <svg className="w-full h-full opacity-60" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#cbd5e1" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="#f1f5f9" />
          <rect width="100%" height="100%" fill="url(#grid)" />
          {/* Main Road Lines */}
          <path d="M 0 140 Q 200 180 500 120" stroke="#94a3b8" strokeWidth="8" fill="none" />
          <path d="M 120 0 L 220 500" stroke="#cbd5e1" strokeWidth="12" fill="none" />
          <path d="M 0 320 Q 250 260 500 360" stroke="#cbd5e1" strokeWidth="10" fill="none" />
          <path d="M 320 0 L 260 500" stroke="#94a3b8" strokeWidth="6" fill="none" />
        </svg>

        {/* Customer Location Pin (Blue dot with pulsing radar wave) */}
        <div className="absolute top-[45%] left-[50%] -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center">
          <div className="relative">
            <div className="w-6 h-6 rounded-full bg-blue-600 border-4 border-white shadow-xl"></div>
            <div className="absolute -inset-3 rounded-full bg-blue-500/25 animate-ping pointer-events-none"></div>
            <div className="absolute -inset-6 rounded-full bg-blue-500/15 pointer-events-none"></div>
          </div>
          <span className="bg-slate-900/90 text-white text-[10px] font-black px-2 py-0.5 rounded-full mt-1.5 shadow">
            Your Location
          </span>
        </div>

        {/* Provider 1 Map Pin (Ramesh Enterprises - Red Pin) */}
        <div 
          onClick={() => setSelectedProviderId(providers[0].id)}
          className={`absolute top-[32%] left-[40%] -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer transition-transform ${
            selectedProviderId === providers[0].id ? 'scale-125 z-30' : 'hover:scale-110'
          }`}
        >
          <div className="w-8 h-8 rounded-full bg-red-600 border-2 border-white shadow-lg flex items-center justify-center text-white">
            <MapPin className="w-5 h-5 fill-current" />
          </div>
          <span className="bg-white/95 text-slate-900 text-[9px] font-black px-1.5 py-0.5 rounded shadow mt-0.5 block whitespace-nowrap border border-slate-200">
            Ramesh (2.1 km)
          </span>
        </div>

        {/* Provider 2 Map Pin (Sri Sai Services - Red Pin) */}
        <div 
          onClick={() => setSelectedProviderId(providers[1].id)}
          className={`absolute top-[58%] left-[68%] -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer transition-transform ${
            selectedProviderId === providers[1].id ? 'scale-125 z-30' : 'hover:scale-110'
          }`}
        >
          <div className="w-8 h-8 rounded-full bg-red-600 border-2 border-white shadow-lg flex items-center justify-center text-white">
            <MapPin className="w-5 h-5 fill-current" />
          </div>
          <span className="bg-white/95 text-slate-900 text-[9px] font-black px-1.5 py-0.5 rounded shadow mt-0.5 block whitespace-nowrap border border-slate-200">
            Sri Sai (3.5 km)
          </span>
        </div>

        {/* Provider 3 Map Pin */}
        <div 
          onClick={() => setSelectedProviderId(providers[2].id)}
          className={`absolute top-[22%] left-[72%] -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer transition-transform ${
            selectedProviderId === providers[2].id ? 'scale-125 z-30' : 'hover:scale-110'
          }`}
        >
          <div className="w-7 h-7 rounded-full bg-red-600 border-2 border-white shadow-lg flex items-center justify-center text-white">
            <MapPin className="w-4 h-4 fill-current" />
          </div>
        </div>

        {/* Provider 4 Map Pin */}
        <div 
          onClick={() => setSelectedProviderId(providers[3].id)}
          className={`absolute top-[68%] left-[30%] -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer transition-transform ${
            selectedProviderId === providers[3].id ? 'scale-125 z-30' : 'hover:scale-110'
          }`}
        >
          <div className="w-7 h-7 rounded-full bg-red-600 border-2 border-white shadow-lg flex items-center justify-center text-white">
            <MapPin className="w-4 h-4 fill-current" />
          </div>
        </div>
      </div>

      {/* Bottom Sheet Card Listing Nearby Providers (per image copy 14.png Screen 8) */}
      <div className="relative z-30 bg-white rounded-t-3xl shadow-2xl border-t border-slate-200/90 p-5 space-y-4 max-h-[45vh] overflow-y-auto">
        <div className="w-12 h-1.5 bg-slate-300 rounded-full mx-auto -mt-1 mb-2"></div>

        <div className="flex items-center justify-between">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Available Service Partners ({providers.length})
          </div>
          <span className="text-xs text-blue-600 font-bold">Sorted by Distance</span>
        </div>

        <div className="space-y-3">
          {providers.map((prov) => {
            const isSelected = selectedProviderId === prov.id;
            return (
              <div
                key={prov.id}
                onClick={() => setSelectedProviderId(prov.id)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                  isSelected
                    ? 'bg-blue-50/70 border-blue-500 ring-2 ring-blue-200 shadow-sm'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                    <img src={prov.avatar} alt={prov.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-slate-900 leading-snug">
                      {prov.name}
                    </h4>
                    <div className="flex items-center gap-1.5 text-xs text-slate-600 mt-0.5">
                      <div className="flex items-center gap-0.5 text-amber-500 font-bold">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        <span>{prov.rating}</span>
                      </div>
                      <span>({prov.reviewsCount})</span>
                      <span>•</span>
                      <span className="font-bold text-slate-900">{prov.distanceKm} km</span>
                    </div>
                    {prov.availableNow && (
                      <div className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full mt-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                        <span>Available Now</span>
                      </div>
                    )}
                  </div>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelectProvider(prov);
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs py-2 px-4 rounded-xl shadow-xs transition-all active:scale-95 shrink-0"
                >
                  Select
                </button>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
