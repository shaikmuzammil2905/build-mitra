import React from 'react';
import { Link } from 'react-router-dom';
import { 
  CheckCircle2, 
  ArrowRight, 
  Award, 
  ShieldCheck, 
  Building, 
  TrendingUp, 
  BadgeCheck 
} from 'lucide-react';

export const LeadershipSection: React.FC = () => {
  return (
    <section className="py-20 bg-bm-navy text-white relative overflow-hidden">
      {/* Decorative gradients */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Leadership Content */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs sm:text-sm font-semibold">
              <Award className="w-4 h-4 text-amber-400" />
              <span>Proven Industry Heritage</span>
            </div>

            <div className="space-y-3">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
                31+ Years <br className="hidden sm:inline" />
                <span className="text-amber-400">of Leadership Experience</span>
              </h2>
              <p className="text-base sm:text-lg text-slate-300 font-medium leading-relaxed">
                BuildMitra is a newly launched digital platform backed by 31+ years of senior leadership experience in real estate strategic procurement, supply chain logistics, and materials management.
              </p>
            </div>

            {/* Founder Highlight Card */}
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-5 border border-white/10 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-emerald-500 text-white font-bold flex items-center justify-center text-sm shadow-md">
                  MCR
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-1.5">
                    <span>M. Chinnappa Reddy</span>
                    <BadgeCheck className="w-5 h-5 text-blue-400" />
                  </h3>
                  <div className="text-xs text-slate-400">
                    Founder & Managing Director • Real Estate Procurement Strategist
                  </div>
                </div>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                "Our mission is to eliminate material opacity, middlemen markups, and structural quality compromises by empowering developers, builders, and individual home makers with verified pricing, reverse auction transparency, and engineering precision."
              </p>
            </div>

            {/* 5 Core Pillars with Green Ticks */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-center gap-3 bg-white/5 p-3 rounded-xl border border-white/5">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <div>
                  <div className="text-sm font-bold text-white">Transparency</div>
                  <div className="text-xs text-slate-400">No hidden margins or inflated rates</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3 bg-white/5 p-3 rounded-xl border border-white/5">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <div>
                  <div className="text-sm font-bold text-white">Engineering Accuracy</div>
                  <div className="text-xs text-slate-400">IS-code compliant formulations</div>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-white/5 p-3 rounded-xl border border-white/5">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <div>
                  <div className="text-sm font-bold text-white">Fair Pricing</div>
                  <div className="text-xs text-slate-400">Direct factory & yard benchmark rates</div>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-white/5 p-3 rounded-xl border border-white/5">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <div>
                  <div className="text-sm font-bold text-white">Verified Quality</div>
                  <div className="text-xs text-slate-400">NABL lab certified materials only</div>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-white/5 p-3 rounded-xl border border-white/5 sm:col-span-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <div>
                  <div className="text-sm font-bold text-white">Customer Trust</div>
                  <div className="text-xs text-slate-400">Milestone-based escrow releases and dedicated technical on-site support</div>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-2">
              <Link
                to="/about"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold text-sm px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all"
              >
                <span>Know More About Our Leadership</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

          </div>

          {/* Right Column: Visual Portrait Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Outer decorative ring */}
              <div className="absolute -inset-3 rounded-3xl bg-gradient-to-tr from-amber-500/30 via-blue-500/30 to-emerald-500/30 blur-lg"></div>

              {/* Main Photo Card */}
              <div className="relative rounded-2xl overflow-hidden border border-white/20 shadow-2xl bg-slate-900">
                <img 
                  src="/assets/leadership.jpg" 
                  alt="Senior Construction Procurement Leader M. Chinnappa Reddy on Site" 
                  className="w-full h-[460px] object-cover object-top hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                
                {/* Floating Bottom Card Over Image */}
                <div className="absolute bottom-4 left-4 right-4 bg-slate-950/85 backdrop-blur-md p-4 rounded-xl border border-white/10 space-y-1">
                  <div className="flex items-center justify-between text-xs text-amber-400 font-bold">
                    <span>M. Chinnappa Reddy</span>
                    <span>31+ Years Legacy</span>
                  </div>
                  <div className="text-[12px] text-slate-300 leading-snug">
                    Strategic Materials Procurement & Large-Scale Construction Management
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

