import React from 'react';
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
  BadgeCheck
} from 'lucide-react';

interface AboutPageProps {
  onOpenEnquiry: (topic?: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onOpenEnquiry }) => {
  return (
    <div className="pt-24 pb-20 bg-slate-50 min-h-screen">
      
      {/* Page Header */}
      <div className="bg-bm-navy text-white py-16 relative overflow-hidden">
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20 space-y-12">
        
        {/* Founder & Leadership Section */}
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
              Leadership Philosophy
            </span>
            <h2 className="text-3xl font-extrabold text-bm-navy leading-snug">
              Transforming Construction Through Transparency & Engineering Rigor
            </h2>
            
            <p className="text-sm text-slate-600 leading-relaxed">
              Having spearheaded strategic procurement across large-scale residential townships, commercial complexes, and infrastructure projects over the past 31+ years, <strong className="text-slate-900">M. Chinnappa Reddy</strong> founded BuildMitra to solve the fundamental pain points plaguing individual builders and contractors: opaque markups, fluctuating unverified material quality, and lack of accountability.
            </p>

            <p className="text-sm text-slate-600 leading-relaxed">
              <strong className="text-bm-navy">Note:</strong> The 31+ years refers specifically to senior leadership experience, not the age of the newly launched digital platform. BuildMitra harnesses cutting-edge digital reverse auctions, GIS satellite demarcation, and standardized civil engineering formulas to deliver unprecedented efficiency.
            </p>

            {/* 5 Core Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="text-xs font-bold text-slate-800">1. Transparency</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="text-xs font-bold text-slate-800">2. Engineering Accuracy</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="text-xs font-bold text-slate-800">3. Fair Pricing</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="text-xs font-bold text-slate-800">4. Verified Quality</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center gap-2.5 sm:col-span-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="text-xs font-bold text-slate-800">5. Customer Trust & Milestone Escrow</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => onOpenEnquiry('Schedule Meeting with Founder / Advisory')}
                className="inline-flex items-center gap-2 bg-bm-navy hover:bg-slate-800 text-white font-bold text-xs px-6 py-3 rounded-xl shadow-md transition-all"
              >
                <span>Connect with Our Executive Team</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

        {/* Vision & Mission Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-extrabold text-slate-900">Our Vision</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              To be India’s most reliable and comprehensive digital ecosystem uniting materials, verified tradesmen, property intelligence, and civil engineering technology.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-extrabold text-slate-900">Our Mission</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Empower builders, engineers, and homeowners with transparent direct factory pricing, reverse-auction cost savings, and 100% verified tradesmen.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-extrabold text-slate-900">Customer Promise</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Zero fake reviews, zero fake discounts, and zero material compromises. Every price benchmark is verified directly against primary manufacturer stockyards.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};
