import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Award, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  Building2, 
  TrendingUp, 
  HeartHandshake, 
  Users, 
  Compass, 
  BadgeCheck,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Target,
  Sparkles,
  Calendar,
  Layers,
  HardHat
} from 'lucide-react';

interface AboutPageProps {
  onOpenEnquiry: (topic?: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onOpenEnquiry }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const timeline = [
    { year: '1995–2005', title: 'Foundational Infrastructure Supply', desc: 'M. Chinnappa Reddy spearheaded strategic procurement of aggregates, cement, and river sand for marquee Bangalore infrastructure projects and arterial highway expansions.' },
    { year: '2006–2015', title: 'Township & Commercial Procurement', desc: 'Managed centralized material logistics, TMT steel contracts, and civil contractor workforces across major residential townships in South Bangalore and Kanakapura corridor.' },
    { year: '2016–2023', title: 'Supply Chain Modernization & NABL Benchmarking', desc: 'Pioneered transition to robotic M-Sand (Zone II) and factory-direct dispatch models to eliminate spurious retail adulteration.' },
    { year: '2024–2026', title: 'Launch of BuildMitra Ecosystem', desc: 'Synthesized 31+ years of on-ground domain expertise into South India’s complete digital construction, real estate intelligence, and milestone escrow ecosystem.' }
  ];

  const pillars = [
    { num: '01', title: 'Absolute Price Transparency', desc: 'Publishing daily factory gate and regional yard rates to eradicate arbitrary middleman dealer markups.' },
    { num: '02', title: 'IS Codal Rigor', desc: 'Embedding Bureau of Indian Standards (IS 456, IS 1786, IS 383) across every engineering calculator and material batch.' },
    { num: '03', title: 'Escrow Security Guarantee', desc: 'Safeguarding homeowner and developer capital by releasing payments strictly upon certified physical milestone audits.' },
    { num: '04', title: 'Workforce Dignity & Welfare', desc: 'Aadhaar-verified tradesmen network with benchmarked fair daily wages, personal protective equipment, and accident insurance.' }
  ];

  const faqs = [
    {
      q: 'Is BuildMitra an independent platform or owned by a cement manufacturer?',
      a: 'BuildMitra is a 100% independent digital construction and procurement ecosystem. We do not manufacture materials or favor single brands; our algorithms benchmark competitive landed prices from UltraTech, Tata Tiscon, JSW, ACC, and verified primary producers.'
    },
    {
      q: 'Where are BuildMitra’s headquarters and logistics yards located?',
      a: 'Our registered corporate office is located at No:1114, LBS Nagar, 2nd Block, Anjanapura BDA Layout, Bengaluru – 560108, backed by regional dispatch yards in Kanakapura, Jigani, Whitefield, and Nelamangala.'
    },
    {
      q: 'What is the background of Founder M. Chinnappa Reddy?',
      a: 'With over 31 years of distinguished leadership in South Indian construction procurement, M. Chinnappa Reddy has managed multi-crore supply chains, bulk aggregates quarries, and high-volume TMT steel contracts across Bengaluru Urban and Rural districts.'
    },
    {
      q: 'Can institutional real estate builders partner with BuildMitra for bulk procurement?',
      a: 'Yes. Our B2B Corporate Procurement Desk handles high-volume monthly steel and cement requirements via dedicated reverse auctions with credit terms and direct mill invoicing.'
    }
  ];

  return (
    <div className="pt-24 pb-20 bg-slate-50 min-h-screen">
      
      {/* DESKTOP ONLY Page Header */}
      <div className="hidden md:block bg-bm-navy text-white py-16 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold uppercase tracking-wider">
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <span>Decades of Real Estate & Procurement Leadership</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              About BuildMitra
            </h1>
            <p className="text-base text-slate-300 leading-relaxed">
              BuildMitra is a newly launched digital platform backed by 31+ years of senior leadership experience in real estate strategic procurement, supply chain logistics, and civil materials management.
            </p>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-2 md:-mt-6 relative z-20 space-y-12">
        
        {/* SECTION 1: FOUNDER & LEADERSHIP SECTION */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-lg border border-slate-200/90 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-xl bg-slate-900">
              <img 
                src="/assets/leadership.jpg" 
                alt="Founder M. Chinnappa Reddy" 
                className="w-full h-[460px] object-cover object-top"
              />
              <div className="absolute bottom-4 left-4 right-4 bg-slate-950/85 backdrop-blur-md p-4 rounded-xl border border-white/10 text-white space-y-1">
                <div className="flex items-center justify-between text-xs text-amber-400 font-bold">
                  <span>M. Chinnappa Reddy</span>
                  <span>Founder & MD</span>
                </div>
                <div className="text-[12px] text-slate-300">
                  31+ Years in Real Estate Procurement & Materials Strategy
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-5">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600">
              Founder's Vision
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-bm-navy leading-snug">
              Transforming Construction Through Transparency & Engineering Rigor
            </h2>
            
            <p className="text-sm text-slate-600 leading-relaxed">
              Having spearheaded strategic procurement across large-scale residential townships, commercial complexes, and infrastructure projects over the past 31+ years, <strong className="text-slate-900">M. Chinnappa Reddy</strong> founded BuildMitra to solve the fundamental pain points plaguing individual builders and contractors: opaque markups, fluctuating unverified material quality, and lack of accountability.
            </p>

            <p className="text-sm text-slate-600 leading-relaxed">
              <strong className="text-bm-navy">Note:</strong> The 31+ years refers specifically to senior leadership experience, not the age of the newly launched digital platform. BuildMitra harnesses cutting-edge digital reverse auctions, GIS satellite demarcation, and standardized civil engineering formulas to deliver unprecedented efficiency.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="text-xs font-bold text-slate-800">1. Transparency</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="text-xs font-bold text-slate-800">2. Reliability</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="text-xs font-bold text-slate-800">3. Affordability</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="text-xs font-bold text-slate-800">4. Customer-Centricity</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => onOpenEnquiry('Consultation with Founder Office')}
                className="bg-bm-navy hover:bg-slate-800 text-white font-bold text-xs py-3 px-6 rounded-xl shadow-md transition-all active:scale-95 flex items-center gap-2"
              >
                <span>Connect With Leadership Office</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

        {/* SECTION 2: 4-DECADE HISTORICAL TIMELINE */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/90 space-y-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider mb-2">
              <Calendar className="w-3.5 h-3.5" />
              <span>Heritage & Track Record</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900">
              3-Decade Construction Leadership Evolution
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {timeline.map((item, idx) => (
              <div key={idx} className="bg-slate-50 p-5 rounded-2xl border border-slate-200/80 space-y-2 flex flex-col justify-between">
                <div>
                  <div className="text-xs font-mono font-bold text-amber-600">{item.year}</div>
                  <h4 className="text-sm font-extrabold text-slate-900 mt-1">{item.title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed mt-2">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 3: THE 4 CORE COMMITMENTS */}
        <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="max-w-2xl space-y-2">
            <div className="text-xs font-bold text-amber-400 uppercase tracking-wider">
              Guiding Principles
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              The 4 Pillars of the BuildMitra Covenant
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {pillars.map((p, idx) => (
              <div key={idx} className="bg-white/5 p-5 rounded-2xl border border-white/10 space-y-2">
                <div className="text-2xl font-black text-amber-400">{p.num}</div>
                <div className="text-sm font-extrabold text-white">{p.title}</div>
                <p className="text-xs text-slate-300 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 4: WORKER WELFARE & CSR */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/90 space-y-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-2">
              <HardHat className="w-3.5 h-3.5" />
              <span>Social Impact</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900">
              Construction Tradesmen Welfare & Safety Program
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Building a responsible construction ecosystem where the hands that build our cities receive dignified wages and guaranteed on-site safety.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/80 space-y-2">
              <h4 className="text-sm font-extrabold text-slate-900">Free Safety PPE Kits</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Every verified tradesman registered on Labour Net receives complimentary ISI-marked safety helmets, reflective jackets, and steel-toe protective footwear.
              </p>
            </div>
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/80 space-y-2">
              <h4 className="text-sm font-extrabold text-slate-900">Zero Middleman Wage Cuts</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Direct-to-bank and UPI milestone wage payments eliminate traditional labor sub-contractor kickbacks, putting 100% of earned wages in workers' hands.
              </p>
            </div>
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/80 space-y-2">
              <h4 className="text-sm font-extrabold text-slate-900">Site Skill Upgradation</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Quarterly workshops conducted in collaboration with cement and rebar manufacturers on laser leveling, bar bending schedules, and modern waterproofing.
              </p>
            </div>
          </div>
        </div>

        {/* SECTION 5: ABOUT FAQS */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/90 space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold uppercase tracking-wider">
              <HelpCircle className="w-3.5 h-3.5 text-blue-600" />
              <span>Company Information</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900">
              About BuildMitra FAQs
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
