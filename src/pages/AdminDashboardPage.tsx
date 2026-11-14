import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  ShieldCheck, 
  Users, 
  Calendar, 
  Mail, 
  Settings, 
  Check, 
  X, 
  Clock, 
  Send, 
  AlertTriangle,
  FileText,
  DollarSign,
  TrendingUp,
  Server
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const AdminDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { 
    partner, 
    adminApprovePartner, 
    bookings, 
    updateBookingStatus,
    smtpConfig,
    setSmtpConfig,
    sendTestEmail,
    emailLogs,
    supportTickets,
    replySupportTicket
  } = useApp();

  const [activeTab, setActiveTab] = useState<'partners' | 'bookings' | 'smtp' | 'tickets'>('partners');
  const [testEmailTo, setTestEmailTo] = useState('client@example.com');
  const [smtpForm, setSmtpForm] = useState(smtpConfig);
  const [smtpSaved, setSmtpSaved] = useState(false);
  const [ticketReplyText, setTicketReplyText] = useState<{ [id: string]: string }>({});

  const handleSaveSmtp = (e: React.FormEvent) => {
    e.preventDefault();
    setSmtpConfig(smtpForm);
    setSmtpSaved(true);
    setTimeout(() => setSmtpSaved(false), 3000);
  };

  const handleSendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    sendTestEmail(testEmailTo);
  };

  return (
    <div className="min-h-screen bg-slate-100 pb-24 max-w-5xl mx-auto pt-16 px-4">
      {/* Top Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => navigate(-1)} 
            className="p-1.5 rounded-full hover:bg-slate-100 text-slate-700 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-black text-slate-900">BuildMitra Central Command Panel</h1>
              <span className="text-[10px] font-bold bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">
                ADMIN V2.0
              </span>
            </div>
            <p className="text-xs text-slate-500">Approvals, bookings, partner subscriptions & SMTP gateways</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link 
            to="/partner/dashboard" 
            className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-xl border border-blue-200"
          >
            Partner Portal
          </Link>
          <Link 
            to="/" 
            className="text-xs font-bold text-slate-700 bg-slate-100 px-3 py-1.5 rounded-xl"
          >
            Customer App
          </Link>
        </div>
      </div>

      {/* Admin KPIs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-xs text-slate-400 font-bold uppercase">Pending KYC</span>
          <div className="text-2xl font-black text-amber-600 mt-1">
            {partner.status === 'Pending Approval' ? 1 : 0}
          </div>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-xs text-slate-400 font-bold uppercase">Active Bookings</span>
          <div className="text-2xl font-black text-blue-600 mt-1">{bookings.length}</div>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-xs text-slate-400 font-bold uppercase">Support Tickets</span>
          <div className="text-2xl font-black text-purple-600 mt-1">{supportTickets.length}</div>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-xs text-slate-400 font-bold uppercase">Emails Sent</span>
          <div className="text-2xl font-black text-emerald-600 mt-1">{emailLogs.length}</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-2xl border border-slate-200 p-1.5 flex gap-1 mb-4 shadow-xs overflow-x-auto">
        <button
          onClick={() => setActiveTab('partners')}
          className={`flex-1 py-2 px-3 text-xs font-bold rounded-xl whitespace-nowrap transition-all ${
            activeTab === 'partners' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Partner Approvals ({partner.status === 'Pending Approval' ? '1 Pending' : 'Verified'})
        </button>
        <button
          onClick={() => setActiveTab('bookings')}
          className={`flex-1 py-2 px-3 text-xs font-bold rounded-xl whitespace-nowrap transition-all ${
            activeTab === 'bookings' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Bookings Manager ({bookings.length})
        </button>
        <button
          onClick={() => setActiveTab('smtp')}
          className={`flex-1 py-2 px-3 text-xs font-bold rounded-xl whitespace-nowrap transition-all ${
            activeTab === 'smtp' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          SMTP Email Settings
        </button>
        <button
          onClick={() => setActiveTab('tickets')}
          className={`flex-1 py-2 px-3 text-xs font-bold rounded-xl whitespace-nowrap transition-all ${
            activeTab === 'tickets' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Support Tickets ({supportTickets.length})
        </button>
      </div>

      {/* Tab 1: Partner Approvals */}
      {activeTab === 'partners' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-900">Partner Enrollment & KYC Verification</h2>
            <span className={`text-xs font-bold px-3 py-1 rounded-full ${
              partner.status === 'Approved' 
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                : 'bg-amber-50 text-amber-700 border border-amber-200'
            }`}>
              {partner.status}
            </span>
          </div>

          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img src={partner.avatar} alt={partner.name} className="w-12 h-12 rounded-full object-cover border-2 border-slate-300" />
              <div>
                <h3 className="text-sm font-bold text-slate-900">{partner.name}</h3>
                <div className="text-xs text-slate-500">ID: {partner.id} • {partner.serviceCategory} • {partner.experienceYears} Years Exp</div>
                <div className="text-xs text-slate-600 mt-1">{partner.phone} • {partner.email}</div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button 
                onClick={() => adminApprovePartner(partner.id, true)}
                className="text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl flex items-center gap-1 shadow-xs"
              >
                <Check className="w-4 h-4" />
                Approve & Verify Partner
              </button>
              <button 
                onClick={() => adminApprovePartner(partner.id, false)}
                className="text-xs font-bold bg-red-50 hover:bg-red-100 text-red-600 px-3 py-2 rounded-xl border border-red-200"
              >
                Reject
              </button>
            </div>
          </div>

          {/* KYC Documents inspection */}
          <div className="border-t border-slate-100 pt-3">
            <h4 className="text-xs font-bold text-slate-700 mb-2">Uploaded Verification Files</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                <span className="text-slate-400 block text-[10px]">Aadhaar Proof</span>
                <span className="font-semibold text-blue-600">{partner.kycDocuments.aadhaarProof || 'Verified'}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                <span className="text-slate-400 block text-[10px]">Address Proof</span>
                <span className="font-semibold text-blue-600">{partner.kycDocuments.addressProof || 'Verified'}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                <span className="text-slate-400 block text-[10px]">Work Photos</span>
                <span className="font-semibold text-blue-600">2 Site Photos Verified</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Bookings Manager */}
      {activeTab === 'bookings' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
          <h2 className="text-sm font-bold text-slate-900">Live Customer Bookings & Dispatch Controls</h2>
          
          <div className="space-y-3">
            {bookings.map((bk) => (
              <div key={bk.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <span className="text-xs font-bold text-blue-600">Booking #{bk.id}</span>
                    <h4 className="text-sm font-bold text-slate-900">{bk.serviceName}</h4>
                    <p className="text-xs text-slate-500">Customer: {bk.customerName} ({bk.customerPhone})</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold px-2.5 py-1 bg-white rounded-lg border border-slate-200">
                      Current: <strong className="text-blue-600">{bk.status}</strong>
                    </span>
                    <div className="text-xs font-bold text-slate-900 mt-1">₹{bk.amount}</div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-200">
                  <span className="text-xs text-slate-500 font-semibold self-center mr-2">Override Status:</span>
                  {(['Request Placed', 'Provider Accepted', 'On the Way', 'In Progress', 'Completed'] as const).map((st) => (
                    <button
                      key={st}
                      onClick={() => updateBookingStatus(bk.id, st)}
                      className={`text-xs px-2.5 py-1 rounded-lg border font-semibold transition-all ${
                        bk.status === st 
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: SMTP Settings (Phase 4 of Master Prompt) */}
      {activeTab === 'smtp' && (
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Server className="w-5 h-5 text-blue-600" />
                <h2 className="text-sm font-bold text-slate-900">SMTP Gateway Configuration</h2>
              </div>
              {smtpSaved && (
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  Settings Saved Successfully ✓
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500 mb-4">
              Configure outgoing SMTP parameters to dispatch automated booking confirmations, partner approval letters, and customer invoices.
            </p>

            <form onSubmit={handleSaveSmtp} className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">SMTP Host</label>
                <input 
                  type="text" 
                  value={smtpForm.host}
                  onChange={(e) => setSmtpForm({ ...smtpForm, host: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-white" 
                />
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1">Port</label>
                <input 
                  type="number" 
                  value={smtpForm.port}
                  onChange={(e) => setSmtpForm({ ...smtpForm, port: Number(e.target.value) })}
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-white" 
                />
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1">Username / Access Key</label>
                <input 
                  type="text" 
                  value={smtpForm.username}
                  onChange={(e) => setSmtpForm({ ...smtpForm, username: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-white" 
                />
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1">Password</label>
                <input 
                  type="password" 
                  value={smtpForm.password}
                  onChange={(e) => setSmtpForm({ ...smtpForm, password: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-white" 
                />
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1">From Email</label>
                <input 
                  type="email" 
                  value={smtpForm.fromEmail}
                  onChange={(e) => setSmtpForm({ ...smtpForm, fromEmail: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-white" 
                />
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1">Sender Name</label>
                <input 
                  type="text" 
                  value={smtpForm.fromName}
                  onChange={(e) => setSmtpForm({ ...smtpForm, fromName: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-white" 
                />
              </div>
              <div className="sm:col-span-2 pt-2">
                <button 
                  type="submit" 
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-5 rounded-xl shadow-xs"
                >
                  Save SMTP Configuration
                </button>
              </div>
            </form>
          </div>

          {/* Test Email Sender */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">Test Live Email Dispatch</h3>
            <form onSubmit={handleSendEmail} className="flex gap-2 text-xs">
              <input 
                type="email" 
                value={testEmailTo}
                onChange={(e) => setTestEmailTo(e.target.value)}
                placeholder="recipient@example.com"
                className="flex-1 p-2.5 rounded-xl border border-slate-200"
              />
              <button 
                type="submit"
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2.5 rounded-xl flex items-center gap-1.5 shadow-xs shrink-0"
              >
                <Send className="w-3.5 h-3.5" />
                Send Test Email
              </button>
            </form>

            {/* Email Logs */}
            <div className="mt-4 pt-3 border-t border-slate-100">
              <h4 className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">Recent Outgoing Logs</h4>
              <div className="space-y-1.5 text-xs">
                {emailLogs.map((log) => (
                  <div key={log.id} className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100">
                    <div>
                      <span className="font-semibold text-slate-800">{log.to}</span>
                      <span className="text-slate-400 ml-2">({log.subject})</span>
                    </div>
                    <span className="font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full text-[11px]">
                      {log.status} • {log.timestamp}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Support Tickets */}
      {activeTab === 'tickets' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
          <h2 className="text-sm font-bold text-slate-900">Customer Support Inquiries</h2>
          <div className="space-y-3">
            {supportTickets.map((t) => (
              <div key={t.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50 text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="font-bold text-blue-600">Ticket #{t.id} • {t.subject}</span>
                  <span className="font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full">{t.status}</span>
                </div>
                <p className="text-slate-700 bg-white p-3 rounded-xl border border-slate-200">{t.message}</p>
                <div className="text-[11px] text-slate-500">From: {t.name} ({t.phone}, {t.email}) • {t.timestamp}</div>

                {t.adminReply ? (
                  <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800">
                    <strong>Admin Reply:</strong> {t.adminReply}
                  </div>
                ) : (
                  <div className="flex gap-2 pt-1">
                    <input 
                      type="text" 
                      placeholder="Type official reply to customer..."
                      value={ticketReplyText[t.id] || ''}
                      onChange={(e) => setTicketReplyText({ ...ticketReplyText, [t.id]: e.target.value })}
                      className="flex-1 p-2 rounded-lg border border-slate-200 bg-white"
                    />
                    <button 
                      onClick={() => {
                        if (ticketReplyText[t.id]) {
                          replySupportTicket(t.id, ticketReplyText[t.id]);
                        }
                      }}
                      className="bg-blue-600 text-white font-bold px-3 py-1.5 rounded-lg text-xs"
                    >
                      Reply
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
export default AdminDashboardPage;
