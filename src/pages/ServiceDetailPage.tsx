import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { 
  ChevronLeft, 
  Heart, 
  Star, 
  CheckCircle2, 
  Calendar, 
  Clock, 
  ShieldCheck, 
  ArrowRight,
  Share2
} from 'lucide-react';

export const ServiceDetailPage: React.FC = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const { getSubService, categories } = useApp();
  const navigate = useNavigate();

  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedDate, setSelectedDate] = useState('Thu, Nov 14');
  const [selectedTime, setSelectedTime] = useState('10:00 AM');

  // Fallback to interior-painting if not found
  const service = (serviceId ? getSubService(serviceId) : null) || categories[0].subServices[0];

  const dateOptions = ['Thu, Nov 14', 'Fri, Nov 15', 'Sat, Nov 16', 'Sun, Nov 17'];
  const timeOptions = ['09:00 AM', '10:00 AM', '11:30 AM', '02:00 PM', '04:00 PM'];

  const handleBookService = () => {
    navigate(`/nearby-providers/${service.id}?date=${encodeURIComponent(selectedDate)}&time=${encodeURIComponent(selectedTime)}`);
  };

  return (
    <div className="pb-24 pt-3 max-w-xl mx-auto px-4 sm:px-6 space-y-4">
      
      {/* Top Navigation Bar with Back & Heart (per image copy 14.png Screen 7) */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="w-9 h-9 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-700 hover:text-slate-950 transition-colors shadow-2xs"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={() => setIsFavorite(!isFavorite)}
          className={`w-9 h-9 rounded-full bg-white border border-slate-200 flex items-center justify-center transition-colors shadow-2xs ${
            isFavorite ? 'text-red-500 fill-red-500' : 'text-slate-500 hover:text-red-500'
          }`}
        >
          <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
        </button>
      </div>

      {/* Large Image Preview Card (per image copy 14.png Screen 7) */}
      <div className="relative rounded-3xl overflow-hidden h-60 sm:h-72 bg-slate-100 shadow-md border border-slate-200">
        <img 
          src={service.image} 
          alt={service.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-bold text-slate-900 border border-slate-200 shadow-xs flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
          <span>BuildMitra Quality Insured</span>
        </div>
      </div>

      {/* Service Info (per image copy 14.png Screen 7) */}
      <div className="bg-white p-5 rounded-3xl border border-slate-200/90 shadow-xs space-y-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug">
            {service.name}
          </h1>
          
          <div className="flex items-center gap-2 mt-1">
            <div className="flex items-center gap-1 bg-amber-50 text-amber-800 font-extrabold text-xs px-2.5 py-0.5 rounded-md border border-amber-200">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{service.rating}</span>
            </div>
            <span className="text-xs text-slate-500 font-medium">
              ({service.reviewsCount.toLocaleString()} reviews)
            </span>
          </div>

          <div className="text-xl sm:text-2xl font-black text-blue-600 mt-2">
            {service.priceDisplay}
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
          {service.description}
        </p>

        {/* 3 Checkmark Guarantee Badges (per image copy 14.png Screen 7) */}
        <div className="space-y-2 pt-2 border-t border-slate-100">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Verified Partner</span>
          </div>
          <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>On-Time Service</span>
          </div>
          <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Quality Guarantee</span>
          </div>
        </div>

        {/* Select Date & Time (per image copy 14.png Screen 7) */}
        <div className="pt-3 border-t border-slate-100 space-y-2">
          <label className="text-xs font-black text-slate-900 block">Select Date & Time</label>
          
          <div className="flex items-center gap-2">
            {/* Date Pill Selector */}
            <div className="relative flex-1">
              <select
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full px-3 py-2.5 bg-blue-50 text-blue-700 font-extrabold text-xs rounded-xl border border-blue-200 focus:outline-none cursor-pointer appearance-none text-center"
              >
                {dateOptions.map(d => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>

            {/* Time Pill Selector */}
            <div className="relative flex-1">
              <select
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-50 text-slate-800 font-extrabold text-xs rounded-xl border border-slate-200 focus:outline-none cursor-pointer appearance-none text-center"
              >
                {timeOptions.map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Book Service Action Button (per image copy 14.png Screen 7) */}
        <div className="pt-2">
          <button
            onClick={handleBookService}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm py-3.5 px-4 rounded-2xl shadow-md transition-all active:scale-95 text-center flex items-center justify-center gap-2"
          >
            <span>Book Service</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>

    </div>
  );
};
