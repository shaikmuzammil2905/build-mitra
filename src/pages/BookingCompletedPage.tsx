import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { 
  CheckCircle2, 
  Star, 
  ChevronRight, 
  Download, 
  ArrowRight,
  ShieldCheck,
  ChevronLeft
} from 'lucide-react';

export const BookingCompletedPage: React.FC = () => {
  const { bookingId } = useParams<{ bookingId: string }>();
  const { bookings, rateBooking } = useApp();
  const navigate = useNavigate();

  const booking = bookings.find(b => b.id === bookingId || b.id === `#${bookingId}`) || bookings[0];

  const [rating, setRating] = useState<number>(booking.rating || 5);
  const [reviewText, setReviewText] = useState(booking.review || '');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmitRating = (e: React.FormEvent) => {
    e.preventDefault();
    rateBooking(booking.id, rating, reviewText);
    setSubmitted(true);
  };

  return (
    <div className="pb-24 pt-4 max-w-md mx-auto px-4 space-y-6 animate-fade-in">
      
      {/* Top Header */}
      <div className="flex items-center">
        <button
          onClick={() => navigate('/')}
          className="w-9 h-9 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-700 hover:text-slate-950 transition-colors shadow-2xs"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
      </div>

      {/* Celebration Checkmark & Status (per image copy 14.png Screen 13) */}
      <div className="text-center space-y-3 pt-2">
        <div className="w-20 h-20 mx-auto rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center border-4 border-emerald-100 shadow-lg animate-bounce">
          <CheckCircle2 className="w-12 h-12 stroke-[2.5]" />
        </div>
        
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Your service has been completed!
          </h1>
          <p className="text-xs font-mono font-bold text-slate-500 mt-1">
            Booking <span className="text-blue-600">{booking.id}</span>
          </p>
        </div>
      </div>

      {/* Rate Your Provider (per image copy 14.png Screen 13) */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-sm space-y-4 text-center">
        <div className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">
          Rate Your Provider
        </div>

        {/* 5 Interactive Stars */}
        <div className="flex items-center justify-center gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              className="p-1 text-amber-400 hover:scale-125 transition-transform"
            >
              <Star 
                className={`w-8 h-8 ${star <= rating ? 'fill-amber-400 text-amber-400' : 'text-slate-200'}`} 
              />
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmitRating} className="space-y-3 pt-2">
          <textarea
            rows={2}
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            placeholder="Write a quick review about the partner's service..."
            className="w-full p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs focus:outline-none focus:border-blue-500 resize-none font-medium text-slate-800"
          ></textarea>

          <button
            type="submit"
            className="w-full bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs py-2.5 rounded-xl transition-all"
          >
            {submitted ? '✓ Review Saved' : 'Submit Review'}
          </button>
        </form>
      </div>

      {/* Payment Receipt Card (per image copy 14.png Screen 13) */}
      <div className="bg-white p-5 rounded-3xl border border-slate-200/90 shadow-sm flex items-center justify-between">
        <div>
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Payment Receipt
          </div>
          <div className="text-2xl font-black text-slate-900 mt-0.5">
            ₹{booking.amount?.toLocaleString('en-IN') || '2,000'}
          </div>
          <div className="text-[10px] text-emerald-600 font-bold flex items-center gap-1 mt-0.5">
            <CheckCircle2 className="w-3 h-3" /> Paid via Online UPI
          </div>
        </div>

        <button
          onClick={() => alert(`BuildMitra Official Tax Invoice for ${booking.id}\nAmount: ₹${booking.amount}\nService: ${booking.serviceName}\nStatus: Paid in Full`)}
          className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 bg-blue-50 px-3 py-2 rounded-xl transition-colors"
        >
          <span>View Invoice</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Return Home Button */}
      <div className="pt-2">
        <button
          onClick={() => navigate('/')}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm py-3.5 px-4 rounded-2xl shadow-md transition-all active:scale-95 text-center flex items-center justify-center gap-2"
        >
          <span>Back to Home</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
