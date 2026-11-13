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
  Sparkles,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  Building,
  Navigation
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [department, setDepartment] = useState('Procurement & Materials');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;
    setSubmitted(true);
  };

  const departments = [
    { name: 'Bulk Materials & Mill Procurement', contact: '+91 76769 42386', email: 'mcreddy17@gmail.com', turnAround: '< 2 Hours' },
    { name: 'On-Demand Trades & Civil Contracting', contact: '+91 76769 42386', email: 'mcreddy17@gmail.com', turnAround: '< 4 Hours' },
    { name: 'Labour Net Squad Dispatch Desk', contact: '+91 76769 42386', email: 'mcreddy17@gmail.com', turnAround: 'Immediate (90 Mins)' },
    { name: 'Real Estate Title & Satellite Survey', contact: '+91 76769 42386', email: 'mcreddy17@gmail.com', turnAround: '< 24 Hours' },
    { name: 'Engineering BOQ & CAD Drawing Studio', contact: '+91 76769 42386', email: 'mcreddy17@gmail.com', turnAround: '< 12 Hours' },
    { name: 'Founder & Managing Director’s Office', contact: '+91 76769 42386', email: 'mcreddy17@gmail.com', turnAround: 'Confidential' },
  ];

  const yardLocations = [
    { area: 'South Bengaluru Central Yard', address: 'Anjanapura BDA Layout, 2nd Block, Bengaluru – 560108', coverage: 'Bannerghatta Road, Kanakapura Road, JP Nagar, Jayanagar' },
    { area: 'East Bengaluru Depot', address: 'Near Hope Farm Junction, Whitefield, Bengaluru – 560066', coverage: 'Whitefield, ITPL, Marathahalli, Varthur, Sarjapur' },
    { area: 'North Bengaluru Logistics Hub', address: 'Doddaballapur Main Road, Yelahanka, Bengaluru – 560064', coverage: 'Yelahanka, Devanahalli, Hebbal, Airport Corridor' },
    { area: 'West Industrial Yard', address: 'Tumkur Road Highway Intersection, Nelamangala – 562123', coverage: 'Peenya, Yeshwanthpur, Nagasandra, Nelamangala' }
  ];

  const faqs = [
    {
      q: 'Can I visit the Anjanapura BDA headquarters in person for architectural consultation?',
      a: 'Yes. Our head office at No:1114, LBS Nagar, 2nd Block, Anjanapura BDA Layout, Bengaluru – 560108 is open Monday through Saturday from 9:00 AM to 7:00 PM. We recommend booking an appointment so our senior civil architects can review your site plans.'
    },
    {
      q: 'What is the fastest way to request a live quotation for cement and TMT steel?',
      a: 'You can ping our WhatsApp Instant Desk at +91 76769 42386 with your required quantity and site delivery pin code. An itemized landing rate including GST and freight is generated within 15 minutes.'
    },
    {
      q: 'Do you offer 24/7 emergency site support for active concrete slab pours?',
      a: 'Yes. For active structural casting days where unexpected transit mixer delays, vibrator failures, or cement shortages occur, our emergency dispatch helpline operates around the clock.'
    },
    {
      q: 'How are vendor billing and escrow dispute resolutions handled?',
      a: 'All transactions are monitored by our centralized Ombudsman & Structural Audit Cell. In the rare event of a specification mismatch, our field engineer inspects the batch on-site and arbitrates within 4 hours.'
    }
  ];

  return (
    <div className="pt-24 pb-20 bg-slate-50 min-h-screen">
      
      {/* DESKTOP ONLY Page Header */}
      <div className="hidden md:block bg-bm-navy text-white py-14 relative overflow-hidden">
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-2 md:-mt-6 relative z-20 space-y-12">
        
        {/* SECTION 1: CONTACT CARDS GRID */}
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

          <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-lg transition-all">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4">
              <MapPin className="w-6 h-6" />
            </div>
            <div className="text-xs text-slate-400 font-bold uppercase">Corporate Headquarters</div>
            <div className="text-xs font-bold text-slate-900 mt-1 leading-snug">
              No:1114, LBS Nagar, 2nd Block, Anjanapura BDA Layout, Bengaluru – 560108
            </div>
            <div className="text-xs text-amber-600 font-semibold mt-2">South Bengaluru Central</div>
          </div>

        </div>

        {/* SECTION 2: INTERACTIVE INQUIRY FORM & OFFICE MAP */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-lg border border-slate-200/90 grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          <div className="lg:col-span-7 space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                Direct Communication
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-bm-navy mt-1">
                Send Us a Procurement or Project Requirement
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Our procurement specialists and structural engineers respond within 2 to 4 business hours.
              </p>
            </div>

            {submitted ? (
              <div className="bg-emerald-50 border border-emerald-200 p-8 rounded-2xl text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h3 className="text-lg font-extrabold text-emerald-900">Inquiry Dispatched Successfully!</h3>
                <p className="text-xs sm:text-sm text-emerald-700 max-w-md mx-auto">
                  Thank you, <strong>{name}</strong>. Your ticket has been routed to our {department} team. A specialist will call you at {phone} shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="bg-emerald-600 text-white font-bold text-xs px-4 py-2 rounded-xl mt-2"
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Suresh Kumar"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-blue-500 bg-slate-50"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Phone / WhatsApp *</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-blue-500 bg-slate-50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Email Address</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="suresh@example.com"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-blue-500 bg-slate-50"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Department</label>
                    <select
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-blue-500 bg-slate-50"
                    >
                      <option>Procurement & Materials</option>
                      <option>On-Demand Civil Services</option>
                      <option>Labour Net Gang Booking</option>
                      <option>Real Estate & Land Survey</option>
                      <option>2D/3D Drawing Studio</option>
                      <option>Dynamic BOQ Engineering</option>
                      <option>Home Loans & Financing</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Project / Site Details</label>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Describe your site location, material quantities required, or services needed..."
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-blue-500 bg-slate-50 resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs sm:text-sm py-3.5 px-6 rounded-xl shadow-md transition-all active:scale-95 flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Transmit Requirement to Engineering Desk</span>
                </button>
              </form>
            )}
          </div>

          <div className="lg:col-span-5 bg-slate-900 text-white rounded-3xl p-6 sm:p-8 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold uppercase tracking-wider">
                <Navigation className="w-3.5 h-3.5" />
                <span>Visiting The Office</span>
              </div>
              <h3 className="text-xl font-extrabold text-white">
                BuildMitra Headquarters
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Located conveniently in South Bengaluru, easily accessible via Kanakapura Road, Nice Ring Road, and Bannerghatta Road.
              </p>
              
              <div className="space-y-2 text-xs pt-2">
                <div className="flex items-center gap-2 text-slate-300">
                  <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Office Hours: 9:00 AM – 7:00 PM (Mon – Sat)</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Ample Dedicated Customer Parking Available</span>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-white/10 space-y-3">
              <div className="text-xs font-bold text-amber-400 uppercase">Emergency Site Assistance</div>
              <p className="text-xs text-slate-300">
                Experiencing unexpected concrete pour or material delays on site?
              </p>
              <a
                href="tel:+917676942386"
                className="inline-flex items-center gap-2 text-xs font-bold text-white bg-red-600 hover:bg-red-700 px-4 py-2.5 rounded-xl transition-colors"
              >
                <AlertTriangle className="w-4 h-4" />
                <span>Call Urgent Site Dispatch: +91 76769 42386</span>
              </a>
            </div>
          </div>

        </div>

        {/* SECTION 3: DEPARTMENT ESCALATION MATRIX */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/90 space-y-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider mb-2">
              <Building className="w-3.5 h-3.5" />
              <span>Dedicated Division Desks</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900">
              Department Direct Escalation Matrix
            </h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-800 font-extrabold border-b border-slate-200">
                  <th className="p-3.5 rounded-l-xl">Department Division</th>
                  <th className="p-3.5">Direct Helpline</th>
                  <th className="p-3.5">Dedicated Email</th>
                  <th className="p-3.5 rounded-r-xl">SLA Response Window</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {departments.map((d, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-3.5 font-bold text-slate-900">{d.name}</td>
                    <td className="p-3.5 font-mono text-blue-600 font-bold">{d.contact}</td>
                    <td className="p-3.5 font-mono text-slate-600">{d.email}</td>
                    <td className="p-3.5 text-emerald-700 font-semibold">{d.turnAround}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* SECTION 4: REGIONAL DISPATCH YARD NETWORK */}
        <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="max-w-2xl space-y-2">
            <div className="text-xs font-bold text-amber-400 uppercase tracking-wider">
              Logistics Network
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              Bengaluru Regional Dispatch Yards
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {yardLocations.map((y, idx) => (
              <div key={idx} className="bg-white/5 p-5 rounded-2xl border border-white/10 space-y-2">
                <div className="text-sm font-extrabold text-amber-400">{y.area}</div>
                <div className="text-xs text-slate-300 font-medium">{y.address}</div>
                <div className="text-[11px] text-slate-400 pt-2 border-t border-white/10">
                  Serving: {y.coverage}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 5: CONTACT FAQS */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/90 space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold uppercase tracking-wider">
              <HelpCircle className="w-3.5 h-3.5 text-blue-600" />
              <span>Assistance Guide</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900">
              Customer Support & Contact FAQs
            </h3>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div key={index} className="rounded-2xl border border-slate-200 overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-extrabold text-xs sm:text-sm text-slate-900 hover:text-blue-600 transition-colors"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? <ChevronUp className="w-4 h-4 text-blue-600 shrink-0" /> : <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />}
                  </button>
                  {isOpen && (
                    <div className="px-4 sm:px-5 pb-5 text-xs text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};
