import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Search, 
  Filter, 
  MapPin, 
  Building, 
  Bed, 
  Bath, 
  Maximize2, 
  Phone, 
  Share2, 
  Heart,
  ShieldCheck,
  Check
} from 'lucide-react';
import { REAL_ESTATE_INSIGHTS } from '../data/propertiesData';

export const RealEstateAppPage: React.FC = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState<'Buy' | 'Rent' | 'Sell'>('Buy');
  const [locationFilter, setLocationFilter] = useState('All');
  const [selectedProperty, setSelectedProperty] = useState<any | null>(null);
  const [contactSuccess, setContactSuccess] = useState(false);

  const sampleProperties = [
    {
      id: 'RE-101',
      title: '3 BHK Luxury Apartment in Gachibowli',
      type: 'Apartment',
      category: 'Buy',
      price: '₹75,00,000',
      priceNum: 7500000,
      location: 'Hyderabad, Telangana',
      area: '1,850 sq.ft',
      beds: 3,
      baths: 3,
      furnishing: 'Semi-Furnished',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
      verified: true,
      owner: 'K. S. Rao',
      ownerPhone: '+91 98480 12345'
    },
    {
      id: 'RE-102',
      title: '4 BHK Independent Modern Villa',
      type: 'Villa',
      category: 'Buy',
      price: '₹1,45,00,000',
      priceNum: 14500000,
      location: 'Kokapet, Hyderabad',
      area: '3,200 sq.ft',
      beds: 4,
      baths: 4,
      furnishing: 'Fully-Furnished',
      image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80',
      verified: true,
      owner: 'M. Reddy',
      ownerPhone: '+91 94400 54321'
    },
    {
      id: 'RE-103',
      title: '2 BHK Premium High-Rise Gated Flat',
      type: 'Apartment',
      category: 'Rent',
      price: '₹32,000 / month',
      priceNum: 32000,
      location: 'Hitec City, Hyderabad',
      area: '1,250 sq.ft',
      beds: 2,
      baths: 2,
      furnishing: 'Fully-Furnished',
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
      verified: true,
      owner: 'Anil Verma',
      ownerPhone: '+91 91234 56789'
    },
    {
      id: 'RE-104',
      title: 'Commercial Office Space & Retail Hub',
      type: 'Commercial',
      category: 'Rent',
      price: '₹85,000 / month',
      priceNum: 85000,
      location: 'Madhapur, Hyderabad',
      area: '2,400 sq.ft',
      beds: 0,
      baths: 2,
      furnishing: 'Warm Shell',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
      verified: true,
      owner: 'BuildMitra Commercial Desk',
      ownerPhone: '+91 76769 42386'
    }
  ];

  const filteredProperties = sampleProperties.filter(p => {
    if (tab === 'Sell') return true;
    return p.category === tab;
  });

  return (
    <div className="min-h-screen bg-slate-50 pb-24 max-w-md mx-auto pt-16">
      {/* Top App Header */}
      <div className="bg-white border-b border-slate-100 px-4 py-3 sticky top-12 z-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => navigate(-1)} 
            className="p-1.5 rounded-full hover:bg-slate-100 text-slate-700 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-lg font-bold text-slate-900">Real Estate</h1>
        </div>
      </div>

      {/* Segment Tabs: Buy / Rent / Sell (Screen 10 Reference) */}
      <div className="bg-white border-b border-slate-100 px-4 py-2.5">
        <div className="bg-slate-100 p-1 rounded-xl flex">
          {(['Buy', 'Rent', 'Sell'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
                tab === t 
                  ? 'bg-blue-600 text-white shadow-xs' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* If Sell is selected */}
      {tab === 'Sell' ? (
        <div className="p-4">
          <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-xs">
            <h2 className="text-base font-bold text-slate-900 mb-1">List Your Property for Sale / Rent</h2>
            <p className="text-xs text-slate-500 mb-4">Connect with 10,000+ verified home buyers with zero brokerage.</p>

            <form onSubmit={(e) => { e.preventDefault(); setContactSuccess(true); }} className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Property Title</label>
                <input 
                  type="text" 
                  required 
                  placeholder="e.g. 3 BHK Luxury Flat in Banjara Hills" 
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Expected Price (₹)</label>
                  <input 
                    type="number" 
                    required 
                    placeholder="7500000" 
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Area (sq.ft)</label>
                  <input 
                    type="number" 
                    required 
                    placeholder="1850" 
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Your Mobile Number</label>
                <input 
                  type="tel" 
                  required 
                  defaultValue="+91 98765 43210" 
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              {contactSuccess ? (
                <div className="p-3 bg-emerald-50 text-emerald-800 rounded-xl text-xs font-semibold flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Property listing submitted! Our manager will review and publish within 2 hours.</span>
                </div>
              ) : (
                <button 
                  type="submit" 
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-xl text-xs shadow-xs"
                >
                  Submit Listing
                </button>
              )}
            </form>
          </div>
        </div>
      ) : (
        /* Listings */
        <div className="p-4 space-y-4">
          {filteredProperties.map((prop) => (
            <div 
              key={prop.id} 
              className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-xs hover:border-blue-200 transition-all"
            >
              <div className="relative h-44 w-full">
                <img 
                  src={prop.image} 
                  alt={prop.title} 
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-slate-900 font-bold text-xs px-2.5 py-1 rounded-full shadow-xs flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                  Verified Listing
                </span>
                <span className="absolute bottom-3 right-3 bg-blue-600 text-white font-black text-sm px-3 py-1 rounded-xl shadow-md">
                  {prop.price}
                </span>
              </div>

              <div className="p-4">
                <h3 className="font-bold text-slate-900 text-sm mb-1 line-clamp-1">{prop.title}</h3>
                <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-3">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>{prop.location}</span>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-600 py-2 border-y border-slate-100 mb-3">
                  <div className="flex items-center gap-1">
                    <Maximize2 className="w-3.5 h-3.5 text-slate-400" />
                    <span>{prop.area}</span>
                  </div>
                  {prop.beds > 0 && (
                    <div className="flex items-center gap-1">
                      <Bed className="w-3.5 h-3.5 text-slate-400" />
                      <span>{prop.beds} BHK</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1">
                    <Building className="w-3.5 h-3.5 text-slate-400" />
                    <span>{prop.furnishing}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-[11px] text-slate-500">
                    Owner: <span className="font-semibold text-slate-700">{prop.owner}</span>
                  </div>
                  <button 
                    onClick={() => setSelectedProperty(prop)}
                    className="text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white px-3.5 py-1.5 rounded-xl shadow-xs flex items-center gap-1.5"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Contact</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Contact Modal */}
      {selectedProperty && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fade-in">
          <div className="bg-white rounded-t-3xl sm:rounded-2xl max-w-sm w-full p-5 space-y-4">
            <h3 className="font-bold text-base text-slate-900">Contact Property Owner</h3>
            <p className="text-xs text-slate-600">{selectedProperty.title} ({selectedProperty.price})</p>
            
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-2">
              <div className="text-xs font-semibold text-slate-700">Owner: {selectedProperty.owner}</div>
              <div className="text-xs font-bold text-blue-600 flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>{selectedProperty.ownerPhone}</span>
              </div>
            </div>

            <div className="flex gap-2">
              <button 
                onClick={() => setSelectedProperty(null)}
                className="flex-1 py-2 text-xs font-bold rounded-xl border border-slate-200 text-slate-600"
              >
                Close
              </button>
              <a 
                href={`tel:${selectedProperty.ownerPhone}`}
                className="flex-1 py-2 text-xs font-bold rounded-xl bg-blue-600 text-white text-center flex items-center justify-center gap-1 shadow-xs"
              >
                <Phone className="w-3.5 h-3.5" />
                Call Now
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default RealEstateAppPage;
