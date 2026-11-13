import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Phone, 
  Mail, 
  MapPin, 
  MessageCircle, 
  ExternalLink,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-bm-navy text-slate-300 relative overflow-hidden border-t border-slate-800">
      {/* Flowing Colorful Brand Ribbon */}
      <div className="brand-ribbon h-2 w-full"></div>

      {/* Background ambient lighting */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-slate-800">
          
          {/* Col 1 & 2: Brand & Leadership Overview */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-block group focus:outline-none">
              <img 
                src="/assets/logo-stacked-footer.png" 
                alt="BuildMitra — Build Smart. Build Better." 
                className="h-16 w-auto object-contain transition-transform group-hover:scale-105"
                loading="lazy"
              />
            </Link>

            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              <strong className="text-white font-medium">Build Smart. Build Better.</strong><br />
              India’s trusted digital ecosystem for direct construction materials, live reverse auction bidding, vetted civil tradesmen, and AI property intelligence.
            </p>

            <div className="flex items-center gap-2 pt-2 text-xs text-emerald-400 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Backed by 31+ Years of Senior Real Estate Leadership</span>
            </div>

            {/* Quick stats pills */}
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs bg-slate-800/80 text-blue-300 border border-slate-700">
                <CheckCircle2 className="w-3 h-3 text-blue-400" /> IS Code Compliant
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs bg-slate-800/80 text-emerald-300 border border-slate-700">
                <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Zero Middlemen
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs bg-slate-800/80 text-amber-300 border border-slate-700">
                <CheckCircle2 className="w-3 h-3 text-amber-400" /> Milestone Escrow
              </span>
            </div>
          </div>

          {/* Col 3: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider border-l-2 border-blue-500 pl-2">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-white transition-colors flex items-center gap-1.5">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors flex items-center gap-1.5">
                  About Us & Leadership
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors flex items-center gap-1.5">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/calculators" className="hover:text-white transition-colors flex items-center gap-1.5">
                  Engineering Tools
                </Link>
              </li>
              <li>
                <Link to="/floor-plans" className="hover:text-white transition-colors flex items-center gap-1.5">
                  2D/3D Floor Plans
                </Link>
              </li>
              <li>
                <Link to="/loans" className="hover:text-white transition-colors flex items-center gap-1.5">
                  Home Loan & Partner Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Our Services */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider border-l-2 border-emerald-500 pl-2">
              Our Solutions
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/materials" className="hover:text-white transition-colors">
                  Materials Marketplace
                </Link>
              </li>
              <li>
                <Link to="/reverse-auction" className="hover:text-white transition-colors">
                  Reverse Auction Engine
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-white transition-colors">
                  Home & Civil Services
                </Link>
              </li>
              <li>
                <Link to="/labour" className="hover:text-white transition-colors">
                  Labour Net Directory
                </Link>
              </li>
              <li>
                <Link to="/real-estate" className="hover:text-white transition-colors">
                  Real Estate Hub & DIY Survey
                </Link>
              </li>
              <li>
                <Link to="/calculators" className="hover:text-white transition-colors">
                  Dynamic BOQ Generator
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Contact Details */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider border-l-2 border-amber-500 pl-2">
              Contact Us
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a 
                  href="tel:+917676942386" 
                  className="hover:text-white transition-colors flex items-start gap-2.5 group"
                >
                  <Phone className="w-4 h-4 text-blue-400 shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                  <div>
                    <div className="text-xs text-slate-400">Direct Helpline</div>
                    <div className="font-semibold text-white">+91 76769 42386</div>
                  </div>
                </a>
              </li>
              <li>
                <a 
                  href="https://wa.me/917676942386" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-start gap-2.5 group"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                  <div>
                    <div className="text-xs text-slate-400">WhatsApp Support</div>
                    <div className="font-semibold text-white">+91 76769 42386</div>
                  </div>
                </a>
              </li>
              <li>
                <a 
                  href="mailto:mcreddy17@gmail.com" 
                  className="hover:text-white transition-colors flex items-start gap-2.5 group"
                >
                  <Mail className="w-4 h-4 text-red-400 shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                  <div>
                    <div className="text-xs text-slate-400">Executive Email</div>
                    <div className="font-semibold text-white break-all">mcreddy17@gmail.com</div>
                  </div>
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-xs text-slate-400 leading-snug">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>No:1114, LBS Nagar, 2nd Block, Anjanapura BDA Layout, Bengaluru, Karnataka – 560108, India.</span>
              </li>
            </ul>

            {/* Social media icons */}
            <div className="pt-2 flex items-center gap-3">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noreferrer" 
                aria-label="Facebook"
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-blue-600 text-white flex items-center justify-center transition-colors text-xs font-bold"
              >
                f
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noreferrer" 
                aria-label="YouTube"
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-red-600 text-white flex items-center justify-center transition-colors text-xs font-bold"
              >
                yt
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noreferrer" 
                aria-label="LinkedIn"
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-blue-700 text-white flex items-center justify-center transition-colors text-xs font-bold"
              >
                in
              </a>
              <a 
                href="https://x.com" 
                target="_blank" 
                rel="noreferrer" 
                aria-label="X / Twitter"
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center transition-colors text-xs font-bold"
              >
                𝕏
              </a>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 text-center sm:text-left">
          <div>
            © 2026 BuildMitra. All Rights Reserved. | Your Trusted Construction & Real Estate Ecosystem Partner
          </div>
          <div className="flex items-center gap-4 text-xs">
            <Link to="/contact" className="hover:text-white transition-colors">Privacy Policy</Link>
            <span>•</span>
            <Link to="/contact" className="hover:text-white transition-colors">Terms & Conditions</Link>
            <span>•</span>
            <Link to="/contact" className="hover:text-white transition-colors">Security & Escrow</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};

