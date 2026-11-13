import React from 'react';
import { Link } from 'react-router-dom';
import { CORE_MODULES, PlatformModule } from '../data/modulesData';
import { ArrowRight, Eye, CheckCircle2, Sparkles } from 'lucide-react';

interface CoreModulesProps {
  onQuickView: (module: PlatformModule) => void;
}

export const CoreModules: React.FC<CoreModulesProps> = ({ onQuickView }) => {
  return (
    <section className="py-20 bg-slate-50 relative overflow-hidden" id="solutions">
      {/* Decorative ambient background */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-blue-100/50 rounded-full blur-3xl pointer-events-none -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-emerald-100/40 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>Comprehensive Digital Infrastructure</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-bm-navy tracking-tight">
            Our <span className="text-blue-600">8 Core</span> Solutions
          </h2>
          <p className="text-base text-slate-600">
            Everything you need for construction, real estate intelligence and verified home services
          </p>
          <div className="w-24 h-1 brand-ribbon mx-auto rounded-full mt-2"></div>
        </div>

        {/* 8 Core Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {CORE_MODULES.map((mod, index) => (
            <div 
              key={mod.id}
              className={`group bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1.5 relative`}
              style={{ animationDelay: `${index * 80}ms` }}
            >
              {/* Card top banner image */}
              <div className="relative h-44 overflow-hidden bg-slate-100">
                <img 
                  src={mod.image} 
                  alt={mod.title}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent"></div>
                
                {/* Module Number & Badge */}
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className="bg-bm-navy/90 backdrop-blur-sm text-white font-mono text-xs font-bold px-2.5 py-1 rounded-md shadow-sm">
                    {mod.number}
                  </span>
                  <span className="bg-white/95 backdrop-blur-sm text-slate-900 font-bold text-[11px] px-2.5 py-1 rounded-md shadow-sm">
                    {mod.badge}
                  </span>
                </div>

                {/* Quick View Button on Image Hover */}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    onQuickView(mod);
                  }}
                  className="absolute bottom-3 right-3 bg-white/90 hover:bg-white text-slate-800 p-2 rounded-lg shadow-md transition-all opacity-90 group-hover:opacity-100 flex items-center gap-1.5 text-xs font-semibold"
                  title="Quick Preview"
                >
                  <Eye className="w-3.5 h-3.5 text-blue-600" />
                  <span className="hidden sm:inline">Quick View</span>
                </button>
              </div>

              {/* Card Content Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
                    <Link to={mod.route} className="focus:outline-none">
                      {mod.title}
                    </Link>
                  </h3>
                  
                  <div className="text-xs font-semibold text-amber-600 flex items-center gap-1">
                    <span>{mod.shortDesc}</span>
                  </div>

                  <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                    {mod.fullDesc}
                  </p>

                  {/* Bullet features */}
                  <ul className="space-y-1.5 pt-2">
                    {mod.features.slice(0, 3).map((feat, i) => (
                      <li key={i} className="flex items-center gap-2 text-[12px] text-slate-600">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span className="truncate">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card CTA Footer */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <button
                    onClick={() => onQuickView(mod)}
                    className="text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
                  >
                    Details
                  </button>

                  <Link 
                    to={mod.route}
                    className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 group-hover:text-blue-700 transition-colors bg-blue-50 group-hover:bg-blue-100/80 px-3 py-1.5 rounded-full"
                  >
                    <span>Explore Page</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>

              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
