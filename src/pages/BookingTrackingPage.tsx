import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { 
  ChevronLeft, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Phone, 
  ShieldCheck, 
  Navigation, 
  ArrowRight,
  Eye,
  Check,
  Circle
} from 'lucide-react';

export const BookingTrackingPage: React.FC = () => {
  const { bookingId } = useParams<{ bookingId: string }>();
  const { bookings, updateBookingStatus } = useApp();
  const navigate = useNavigate();

  const [mapExpanded, setMapExpanded] = useState(false);

  // Find booking or use the first active booking
  const booking = bookings.find(b => b.id === bookingId || b.id === `#${bookingId}`) || bookings[0];

  const handleSimulateStatus = (nextStatus: typeof booking['status']) => {
    updateBookingStatus(booking.id, nextStatus);
    if (nextStatus === 'Completed') {
      navigate(`/booking-success/${booking.id.replace('#', '')}`);
    }
  };

  const steps = [
    { title: 'Request Placed', desc: 'Thu, 14 Nov • 09:20 AM' },
    { title: 'Provider Accepted', desc: 'Thu, 14 Nov • 09:35 AM' },
    { title: 'On the Way', desc: 'Arriving in 15 min', extraAvatar: booking.provider?.avatar },
    { title: 'In Progress', desc: 'Work under execution' },
    { title: 'Completed', desc: 'Final invoice handover' }
  ];

  const getCurrentStepIndex = () => {
    switch (booking.status) {
      case 'Request Placed': return 0;
      case 'Provider Accepted': return 1;
      case 'On the Way': return 2;
      case 'In Progress': return 3;
      case 'Completed': return 4;
      default: return 1;
    }
  };

  const currentIdx = getCurrentStepIndex();

  return (
    <div className="pb-24 pt-3 max-w-xl mx-auto px-4 sm:px-6 space-y-4">
      
      {/* Top Header with Back Button (per image copy 14.png Screen 9) */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate('/my-bookings')}
          className="w-9 h-9 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-700 hover:text-slate-950 transition-colors shadow-2xs"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <h1 className="text-lg font-black text-slate-900 tracking-tight">
          My Booking
        </h1>
        <div className="w-9"></div>
      </div>

      {/* Booking Card Header (per image copy 14.png Screen 9) */}
      <div className="bg-white p-5 rounded-3xl border border-slate-200/90 shadow-xs space-y-4">
        
        <div className="flex items-center justify-between">
          <div className="font-mono text-lg font-black text-slate-900">
            {booking.id}
          </div>
          <span className="bg-emerald-50 text-emerald-700 text-xs font-black px-3 py-1 rounded-full border border-emerald-200">
            {booking.status}
          </span>
        </div>

        <div className="flex items-center gap-3.5 pt-1">
          <div className="w-16 h-16 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
            <img 
              src={booking.serviceImage || '/assets/services.jpg'} 
              alt={booking.serviceName} 
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h3 className="text-base font-extrabold text-slate-900 leading-snug">
              {booking.serviceName}
            </h3>
            <div className="text-xs text-slate-500 font-semibold mt-0.5">
              {booking.bookingDate} • {booking.bookingTime}
            </div>
            <div className="text-xs font-black text-blue-600 mt-1">
              ₹ {booking.amount?.toLocaleString('en-IN')} (Paid via UPI)
            </div>
          </div>
        </div>

        {/* Assigned Provider Details */}
        {booking.provider && (
          <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden border border-slate-200 shrink-0">
                <img src={booking.provider.avatar} alt={booking.provider.name} className="w-full h-full object-cover" />
              </div>
              <div>
                <div className="text-xs font-extrabold text-slate-900">{booking.provider.name}</div>
                <div className="text-[11px] text-slate-500 font-medium">{booking.provider.specialization}</div>
              </div>
            </div>
            <a
              href={`tel:${booking.provider.phone}`}
              className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center hover:bg-emerald-200 transition-colors"
            >
              <Phone className="w-4 h-4" />
            </a>
          </div>
        )}

      </div>

      {/* Real-Time Stepper (per image copy 14.png Screen 9) */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-xs space-y-6">
        <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">
          Live Service Progress
        </h3>

        <div className="relative pl-6 space-y-6">
          {/* Vertical Connecting Line */}
          <div className="absolute left-2.5 top-2 bottom-4 w-0.5 bg-slate-200"></div>

          {steps.map((step, idx) => {
            const isCompleted = idx < currentIdx;
            const isCurrent = idx === currentIdx;

            return (
              <div key={idx} className="relative flex items-start gap-4">
                
                {/* Node Dot */}
                <div className={`absolute -left-6 top-0.5 w-5 h-5 rounded-full flex items-center justify-center transition-all ${
                  isCompleted 
                    ? 'bg-emerald-500 text-white shadow-xs' 
                    : isCurrent 
                    ? 'bg-blue-600 text-white ring-4 ring-blue-100' 
                    : 'bg-white border-2 border-slate-300 text-transparent'
                }`}>
                  {isCompleted && <Check className="w-3 h-3 stroke-[3]" />}
                  {isCurrent && <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div>}
                </div>

                {/* Step Info */}
                <div className="flex-1 flex items-center justify-between">
                  <div>
                    <div className={`text-sm font-extrabold ${
                      isCurrent ? 'text-blue-600' : isCompleted ? 'text-slate-900' : 'text-slate-400'
                    }`}>
                      {step.title}
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5 font-medium">
                      {step.desc}
                    </div>
                  </div>

                  {step.extraAvatar && isCurrent && (
                    <div className="w-8 h-8 rounded-full overflow-hidden border border-blue-400 shadow-xs animate-bounce">
                      <img src={step.extraAvatar} alt="Partner" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>

              </div>
            );
          })}
        </div>

        {/* View Map Action Button (per image copy 14.png Screen 9) */}
        <button
          onClick={() => setMapExpanded(!mapExpanded)}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs sm:text-sm py-3.5 px-4 rounded-2xl shadow-md transition-all active:scale-95 text-center flex items-center justify-center gap-2"
        >
          <Navigation className="w-4 h-4" />
          <span>{mapExpanded ? 'Hide Live Map' : 'View Map'}</span>
        </button>

        {/* Expandable Live Route Map Simulation */}
        {mapExpanded && (
          <div className="relative h-56 rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 shadow-inner animate-fade-in">
            <svg className="w-full h-full opacity-60" xmlns="http://www.w3.org/2000/svg">
              <rect width="100%" height="100%" fill="#f1f5f9" />
              <path d="M 50 200 Q 150 100 350 80" stroke="#3b82f6" strokeWidth="6" strokeDasharray="6 6" fill="none" />
            </svg>
            <div className="absolute bottom-3 left-3 bg-slate-900/90 text-white text-[10px] font-bold px-3 py-1.5 rounded-xl shadow-md">
              📍 Provider arriving via Outer Ring Road (~ 12 mins)
            </div>
          </div>
        )}

      </div>

      {/* DEV / QA STATUS ADVANCE CONTROLS (for testing all 5 stages seamlessly) */}
      <div className="bg-slate-100 p-4 rounded-3xl border border-slate-200 space-y-2">
        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
          Demo Workflow Simulation Controls
        </div>
        <div className="flex flex-wrap gap-2 text-xs">
          <button
            onClick={() => handleSimulateStatus('Provider Accepted')}
            className="px-3 py-1 rounded-xl bg-white border border-slate-200 font-bold hover:bg-blue-50 hover:text-blue-600 transition-colors"
          >
            Accept
          </button>
          <button
            onClick={() => handleSimulateStatus('On the Way')}
            className="px-3 py-1 rounded-xl bg-white border border-slate-200 font-bold hover:bg-blue-50 hover:text-blue-600 transition-colors"
          >
            On the Way
          </button>
          <button
            onClick={() => handleSimulateStatus('In Progress')}
            className="px-3 py-1 rounded-xl bg-white border border-slate-200 font-bold hover:bg-blue-50 hover:text-blue-600 transition-colors"
          >
            In Progress
          </button>
          <button
            onClick={() => handleSimulateStatus('Completed')}
            className="px-3 py-1 rounded-xl bg-emerald-600 text-white font-extrabold hover:bg-emerald-700 transition-colors"
          >
            Mark Completed & Rate ★
          </button>
        </div>
      </div>

    </div>
  );
};
