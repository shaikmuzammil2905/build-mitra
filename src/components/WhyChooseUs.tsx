import React from 'react';
import { 
  ShieldCheck, 
  Zap, 
  Users, 
  Headphones, 
  CheckCircle2, 
  ArrowRight 
} from 'lucide-react';

interface WhyChooseUsProps {
  onSelectFeature: (title: string, desc: string) => void;
}

export const WhyChooseUs: React.FC<WhyChooseUsProps> = ({ onSelectFeature }) => {
  const features = [
    {
      id: 'verified',
      title: '100% Verified Professionals',
      shortDesc: 'Aadhaar, trade license, and police background checked contractors and masons.',
      icon: <ShieldCheck className="w-8 h-8 text-emerald-600" />,
      bg: 'bg-emerald-50/60',
      border: 'border-emerald-200/80',
      tag: 'Zero Risk'
    },
    {
      id: 'realtime',
      title: 'Real-Time Information',
      shortDesc: 'Live city-wise cement, steel and sand rates direct from primary manufacturer yards.',
      icon: <Zap className="w-8 h-8 text-amber-500" />,
      bg: 'bg-amber-50/60',
      border: 'border-amber-200/80',
      tag: 'Live Feeds'
    },
    {
      id: 'nomiddlemen',
      title: 'No Middlemen, No Hidden Costs',
      shortDesc: 'Reverse auction bidding connects you directly to primary factories and distributors.',
      icon: <Users className="w-8 h-8 text-blue-600" />,
      bg: 'bg-blue-50/60',
      border: 'border-blue-200/80',
      tag: 'Direct B2B'
    },
    {
      id: 'support',
      title: 'Dedicated Support',
      shortDesc: 'On-site civil engineer supervision, phone helpline, and milestone escrow guarantees.',
      icon: <Headphones className="w-8 h-8 text-sky-600" />,
      bg: 'bg-sky-50/60',
      border: 'border-sky-200/80',
      tag: '24/7 Helpline'
    }
  ];

  return (
    <section className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-14">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-bm-navy tracking-tight">
            Why Choose BuildMitra?
          </h2>
          <p className="text-sm sm:text-base text-slate-500">
            Engineered for transparency, built on decades of procurement excellence
          </p>
          <div className="w-20 h-1 brand-ribbon mx-auto rounded-full mt-2"></div>
        </div>

        {/* 4 Cards Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feat) => (
            <div
              key={feat.id}
              onClick={() => onSelectFeature(feat.title, feat.shortDesc)}
              className={`rounded-2xl p-6 border ${feat.border} ${feat.bg} shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between cursor-pointer group hover:-translate-y-1.5`}
            >
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                  {feat.icon}
                </div>

                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    {feat.tag}
                  </span>
                  <h3 className="font-extrabold text-slate-900 text-base group-hover:text-blue-600 transition-colors leading-snug">
                    {feat.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed pt-1">
                    {feat.shortDesc}
                  </p>
                </div>
              </div>

              <div className="pt-4 mt-2 border-t border-slate-200/60 flex items-center justify-between text-xs font-bold text-slate-700 group-hover:text-blue-600">
                <span>Learn more</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
