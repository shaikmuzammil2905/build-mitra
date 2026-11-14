import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Power,
  TrendingUp,
  CheckCircle2,
  Clock,
  MapPin,
  AlertCircle,
  Wallet,
  Phone,
  ShieldCheck,
  Calendar,
  X
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const PartnerDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { partner, togglePartnerOnline, bookings, updateBookingStatus } = useApp();

  const [activeTab, setActiveTab] = useState<'jobs' | 'earnings'>('jobs');

  const incomingRequests = bookings.filter(b => b.status === 'Request Placed' || b.status === 'Provider Accepted');

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
          <div>
            <h1 className="text-base font-bold text-slate-900 leading-tight">{partner.name}</h1>
            <span className="text-[11px] text-slate-400">ID: {partner.id}</span>
          </div>
        </div>

        {/* Online / Offline Toggle (Screen 16) */}
        <button
          onClick={togglePartnerOnline}
          className={`px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 border transition-all ${partner.isOnline
            ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
            : 'bg-slate-100 text-slate-600 border-slate-300'
            }`}
        >
          <span className={`w-2 h-2 rounded-full ${partner.isOnline ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`}></span>
          <span>{partner.isOnline ? 'Online' : 'Offline'}</span>
        </button>
      </div>

      <div className="p-4 space-y-4">
        {/* Status Alert Banner */}
        <div className={`p-4 rounded-2xl border flex items-start justify-between ${partner.status === 'Approved'
          ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
          : 'bg-amber-50 border-amber-200 text-amber-800'
          }`}>
          <div className="flex items-start gap-3">
            {partner.status === 'Approved' ? (
              <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            )}
            <div>
              <div className="text-xs font-black uppercase tracking-wider">
                Status: {partner.status}
              </div>
              <p className="text-xs mt-0.5 opacity-90">
                {partner.status === 'Approved'
                  ? 'Your KYC documents are verified. You are eligible to accept live leads.'
                  : 'Documents under review. You can simulate admin approval from Admin Panel.'}
              </p>
            </div>
          </div>
          {partner.status !== 'Approved' && (
            <Link
              to="/admin"
              className="text-[10px] font-bold bg-amber-600 text-white px-2.5 py-1 rounded-lg shrink-0 shadow-xs"
            >
              Approve
            </Link>
          )}
        </div>

        {/* Earnings KPI Cards (Screen 16 Reference) */}
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-white p-3 rounded-2xl border border-slate-100 shadow-xs text-center">
            <span className="text-[10px] font-semibold text-slate-400 uppercase">Total Earned</span>
            <div className="text-sm font-black text-slate-900 mt-1">₹{partner.earnings.total.toLocaleString()}</div>
          </div>
          <div className="bg-white p-3 rounded-2xl border border-slate-100 shadow-xs text-center">
            <span className="text-[10px] font-semibold text-slate-400 uppercase">Jobs Done</span>
            <div className="text-sm font-black text-blue-600 mt-1">{partner.earnings.completedJobs}</div>
          </div>
          <div className="bg-white p-3 rounded-2xl border border-slate-100 shadow-xs text-center">
            <span className="text-[10px] font-semibold text-slate-400 uppercase">Wallet</span>
            <div className="text-sm font-black text-emerald-600 mt-1">₹{partner.earnings.walletBalance.toLocaleString()}</div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-2 bg-slate-100 p-1 rounded-xl">
          <button
            onClick={() => setActiveTab('jobs')}
            className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${activeTab === 'jobs' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
              }`}
          >
            Live Job Requests ({incomingRequests.length})
          </button>
          <button
            onClick={() => setActiveTab('earnings')}
            className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${activeTab === 'earnings' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
              }`}
          >
            Payout History
          </button>
        </div>

        {/* Live Job Requests (Screen 16) */}
        {activeTab === 'jobs' ? (
          <div className="space-y-3">
            {incomingRequests.length === 0 ? (
              <div className="bg-white rounded-2xl p-6 text-center border border-slate-100">
                <Clock className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                <p className="text-xs text-slate-500">No active job requests right now. Ensure status is toggled to Online.</p>
              </div>
            ) : (
              incomingRequests.map((req) => (
                <div key={req.id} className="bg-white rounded-2xl p-4 border border-slate-100 shadow-xs space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                        #{req.id} • {req.serviceName}
                      </span>
                      <h4 className="text-sm font-bold text-slate-900 mt-1">{req.customerName}</h4>
                    </div>
                    <div className="text-sm font-black text-emerald-600">
                      ₹{req.amount}
                    </div>
                  </div>

                  <div className="text-xs text-slate-600 space-y-1 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>{req.bookingDate} at {req.bookingTime}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span className="line-clamp-1">{req.customerAddress}</span>
                    </div>
                  </div>

                  {req.status === 'Request Placed' ? (
                    <div className="flex gap-2">
                      <button
                        onClick={() => updateBookingStatus(req.id, 'Cancelled')}
                        className="flex-1 py-2 text-xs font-bold text-red-600 bg-red-50 hover:bg-red-100 rounded-xl border border-red-200"
                      >
                        Decline
                      </button>
                      <button
                        onClick={() => updateBookingStatus(req.id, 'Provider Accepted')}
                        className="flex-1 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-xs"
                      >
                        Accept Job
                      </button>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <button
                        onClick={() => updateBookingStatus(req.id, 'On the Way')}
                        className="flex-1 py-2 text-xs font-bold text-white bg-amber-600 hover:bg-amber-700 rounded-xl shadow-xs"
                      >
                        Start Trip (On the Way)
                      </button>
                      <button
                        onClick={() => updateBookingStatus(req.id, 'Completed')}
                        className="flex-1 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-xs"
                      >
                        Complete Job
                      </button>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        ) : (
          /* Earnings Tab */
          <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-xs space-y-3">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Weekly Disbursed Settlements</h3>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-2 border-b border-slate-100">
                <div>
                  <div className="font-semibold text-slate-800">Week 44 Payout (Direct Bank Transfer)</div>
                  <div className="text-[10px] text-slate-400">UTR: HDFC0092147 • 12 Nov 2026</div>
                </div>
                <span className="font-bold text-emerald-600">₹14,250</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <div>
                  <div className="font-semibold text-slate-800">Week 43 Payout (Direct Bank Transfer)</div>
                  <div className="text-[10px] text-slate-400">UTR: HDFC0083902 • 05 Nov 2026</div>
                </div>
                <span className="font-bold text-emerald-600">₹10,000</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default PartnerDashboardPage;
