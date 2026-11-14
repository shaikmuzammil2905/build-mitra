import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  MapPin, 
  ChevronRight, 
  CheckCircle2, 
  AlertCircle,
  Truck,
  RotateCcw
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const MyBookingsPage: React.FC = () => {
  const navigate = useNavigate();
  const { bookings } = useApp();
  const [tab, setTab] = useState<'active' | 'completed'>('active');

  const activeBookings = bookings.filter(b => b.status !== 'Completed' && b.status !== 'Cancelled');
  const pastBookings = bookings.filter(b => b.status === 'Completed' || b.status === 'Cancelled');

  const displayedList = tab === 'active' ? activeBookings : pastBookings;

  return (
    <div className="min-h-screen bg-slate-50 pb-24 max-w-md mx-auto pt-0">
      {/* Top Header */}
      <div className="bg-white border-b border-slate-100 px-4 py-3 sticky top-14 sm:top-16 z-20 flex items-center justify-between shadow-2xs">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => navigate(-1)} 
            className="p-1.5 rounded-full hover:bg-slate-100 text-slate-700 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-lg font-bold text-slate-900">My Bookings</h1>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-slate-100 px-4 py-2 flex gap-2">
        <button
          onClick={() => setTab('active')}
          className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
            tab === 'active'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Active Bookings ({activeBookings.length})
        </button>
        <button
          onClick={() => setTab('completed')}
          className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
            tab === 'completed'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Past Orders ({pastBookings.length})
        </button>
      </div>

      {/* Booking List */}
      <div className="p-4 space-y-3">
        {displayedList.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 text-center border border-slate-100">
            <Calendar className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-sm font-bold text-slate-800">No {tab} bookings found</h3>
            <p className="text-xs text-slate-500 mt-1 mb-4">Book home repairs, painting, cleaning and electrical services anytime.</p>
            <Link 
              to="/services" 
              className="inline-block text-xs font-bold bg-blue-600 text-white px-4 py-2 rounded-xl shadow-xs"
            >
              Browse Services
            </Link>
          </div>
        ) : (
          displayedList.map((bk) => (
            <div 
              key={bk.id} 
              className="bg-white rounded-2xl p-4 border border-slate-100 shadow-xs hover:border-blue-200 transition-all"
            >
              <div className="flex items-start justify-between border-b border-slate-100 pb-2.5 mb-3">
                <div>
                  <span className="text-xs font-bold text-blue-600">Booking #{bk.id}</span>
                  <h3 className="text-sm font-bold text-slate-900 mt-0.5">{bk.serviceName}</h3>
                </div>
                <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                  bk.status === 'Completed'
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    : bk.status === 'In Progress'
                    ? 'bg-amber-50 text-amber-700 border border-amber-200 animate-pulse'
                    : 'bg-blue-50 text-blue-700 border border-blue-200'
                }`}>
                  {bk.status}
                </span>
              </div>

              <div className="space-y-1.5 text-xs text-slate-600 mb-3">
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>{bk.bookingDate} • {bk.bookingTime}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span className="line-clamp-1">{bk.customerAddress}</span>
                </div>
                <div className="flex items-center gap-2 font-semibold text-slate-800 pt-1">
                  <span>Assigned Partner: {bk.provider?.name || 'Assigned Specialist'}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                <div className="text-sm font-black text-slate-900">
                  ₹{bk.amount.toLocaleString()}
                </div>
                <div className="flex items-center gap-2">
                  {bk.status === 'Completed' ? (
                    <Link
                      to={`/booking-success/${bk.id}`}
                      className="text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-xl border border-emerald-200 flex items-center gap-1"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      View Invoice
                    </Link>
                  ) : (
                    <Link
                      to={`/booking/${bk.id}`}
                      className="text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 px-3 py-1.5 rounded-xl shadow-xs flex items-center gap-1"
                    >
                      <Truck className="w-3.5 h-3.5" />
                      Track Live
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
export default MyBookingsPage;
