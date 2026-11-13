import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  MessageCircle, 
  Send, 
  Clock, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles 
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Procurement Inquiry');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;
    setSubmitted(true);
  };

  return (
    <div className="pt-24 pb-20 bg-slate-50 min-h-screen">
      
      {/* Page Header */}
      <div className="bg-bm-navy text-white py-14 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold uppercase tracking-wider">
              <Phone className="w-3.5 h-3.5" />
              <span>Helpline & Headquarters</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              Contact BuildMitra
            </h1>
            <p className="text-base text-slate-300 leading-relaxed">
              Reach out to our procurement advisory, civil engineering support desk, or founder’s office. We’re here to assist your construction and property journey.
            </p>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20 space-y-8">
        
        {/* Contact Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <a
            href="tel:+917676942386"
            className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-lg transition-all group"
          >
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Phone className="w-6 h-6" />
            </div>
            <div className="text-xs text-slate-400 font-bold uppercase">Phone Helpline</div>
            <div className="text-base font-extrabold text-slate-900 mt-1">+91 76769 42386</div>
            <div className="text-xs text-blue-600 font-semibold mt-2">Mon - Sat: 8 AM - 8 PM</div>
          </a>

          <a
            href="https://wa.me/917676942386"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-lg transition-all group"
          >
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <MessageCircle className="w-6 h-6" />
            </div>
            <div className="text-xs text-slate-400 font-bold uppercase">WhatsApp Instant Desk</div>
            <div className="text-base font-extrabold text-slate-900 mt-1">+91 76769 42386</div>
            <div className="text-xs text-emerald-600 font-semibold mt-2">Instant Chat & RFQ</div>
          </a>

          <a
            href="mailto:mcreddy17@gmail.com"
            className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-lg transition-all group"
          >
            <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Mail className="w-6 h-6" />
            </div>
            <div className="text-xs text-slate-400 font-bold uppercase">Executive Email</div>
            <div className="text-base font-extrabold text-slate-900 mt-1 break-all">mcreddy17@gmail.com</div>
            <div className="text-xs text-red-600 font-semibold mt-2">Direct Founder Inbox</div>
          </a>

          <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4">
              <MapPin className="w-6 h-6" />
            </div>
            <div className="text-xs text-slate-400 font-bold uppercase">Registered Office</div>
            <div className="text-xs font-bold text-slate-800 mt-1 leading-snug">
              No:1114, LBS Nagar, 2nd Block, Anjanapura BDA Layout, Bengaluru – 560108, India.
            </div>
          </div>

        </div>

        {/* Contact Form & Office Map */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/90 space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                Direct Communication Channel
              </span>
              <h2 className="text-2xl font-extrabold text-bm-navy mt-0.5">
                Send Us a Message
              </h2>
              <p className="text-xs text-slate-500">
                Submit your inquiry and our team will respond within 30 minutes.
              </p>
            </div>

            {submitted ? (
              <div className="p-8 text-center bg-emerald-50 rounded-2xl border border-emerald-200 space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h3 className="text-xl font-extrabold text-slate-900">Message Delivered!</h3>
                <p className="text-xs text-slate-600 max-w-sm mx-auto">
                  Thank you, <strong>{name}</strong>. Our procurement coordinator has received your inquiry and will contact you at <strong>{phone}</strong> promptly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="bg-bm-navy text-white font-bold text-xs px-5 py-2.5 rounded-xl"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Suresh Kumar"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Mobile Number *</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@domain.com"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Inquiry Category</label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-blue-500 bg-white"
                    >
                      <option value="Procurement Inquiry">Construction Material Procurement</option>
                      <option value="Reverse Auction Tender">Reverse Auction Tender Setup</option>
                      <option value="Home & Civil Services">Home & Civil Services Booking</option>
                      <option value="Labour Net Gang Booking">Labour Net Tradesmen Booking</option>
                      <option value="Property Valuation">Real Estate / Land Valuation</option>
                      <option value="Architectural Floor Plans">2D/3D Floor Plan Consultation</option>
                      <option value="Affiliate Partnership">Channel Partner / Affiliate Program</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Your Requirements / Message</label>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Provide details about your construction site, estimated quantities, or questions..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-blue-500"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm py-3 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 active:scale-95"
                >
                  <Send className="w-4 h-4" />
                  <span>Transmit Inquiry to BuildMitra Desk</span>
                </button>
              </form>
            )}

          </div>

          {/* Map & Office Card */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/90 space-y-5">
            <h3 className="text-lg font-extrabold text-bm-navy">
              Headquarters Location
            </h3>

            {/* Embedded Visual Map Card */}
            <div className="h-64 rounded-2xl overflow-hidden border border-slate-200 relative bg-slate-100 flex items-center justify-center">
              <img 
                src="/assets/real-estate.jpg" 
                alt="Bengaluru Location Map" 
                className="w-full h-full object-cover filter brightness-90"
              />
              <div className="absolute inset-0 bg-slate-950/40 flex items-center justify-center p-4 text-center">
                <div className="bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-white/40 max-w-xs space-y-1">
                  <MapPin className="w-6 h-6 text-red-600 mx-auto" />
                  <div className="text-xs font-bold text-slate-900">BuildMitra Corporate Desk</div>
                  <div className="text-[11px] text-slate-600">
                    Anjanapura BDA Layout, 2nd Block, Bengaluru - 560108
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-2 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>2.5 km from Green Line Namma Metro (Anjanapura Station)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Dedicated visitor parking and material testing display room</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
