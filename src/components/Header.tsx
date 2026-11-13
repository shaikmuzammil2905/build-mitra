import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Menu, 
  X, 
  ChevronDown, 
  Search, 
  ArrowRight,
  ShieldCheck,
  Calculator,
  Hammer,
  Truck,
  Building2,
  Users,
  Home,
  Layers,
  MapPin,
  FileSpreadsheet,
  Info,
  PhoneCall,
  ChevronRight
} from 'lucide-react';

interface HeaderProps {
  onOpenSearch: () => void;
  onOpenEnquiry: (topic?: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenSearch, onOpenEnquiry }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toolsDropdownOpen, setToolsDropdownOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setToolsDropdownOpen(false);
    setServicesDropdownOpen(false);
  }, [location.pathname]);

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <>
      {/* Top micro ribbon */}
      <div className="brand-ribbon h-1 w-full fixed top-0 left-0 z-50"></div>

      <header 
        className={`fixed top-1 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled 
            ? 'bg-white/95 backdrop-blur-md shadow-md py-2' 
            : 'bg-white/95 backdrop-blur-sm shadow-xs py-2.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-2">
            
            {/* Logo - No white patch work, clean transparent */}
            <Link to="/" className="flex items-center gap-2 group shrink-0 focus:outline-none">
              <img 
                src="/assets/logo.png" 
                alt="BuildMitra Logo" 
                className="h-9 sm:h-11 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                loading="eager"
              />
            </Link>

            {/* Desktop Navigation - All items fit strictly on a single line */}
            <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1.5 whitespace-nowrap">
              <Link 
                to="/" 
                className={`px-3 py-1.5 rounded-full text-xs xl:text-sm font-semibold transition-all ${
                  isActive('/') 
                    ? 'bg-blue-600 text-white shadow-xs' 
                    : 'text-slate-700 hover:text-blue-600 hover:bg-slate-100'
                }`}
              >
                Home
              </Link>

              <Link 
                to="/materials" 
                className={`px-3 py-1.5 rounded-full text-xs xl:text-sm font-semibold transition-all ${
                  isActive('/materials') 
                    ? 'bg-blue-600 text-white shadow-xs' 
                    : 'text-slate-700 hover:text-blue-600 hover:bg-slate-100'
                }`}
              >
                Materials
              </Link>

              {/* Services Dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => setServicesDropdownOpen(true)}
                onMouseLeave={() => setServicesDropdownOpen(false)}
              >
                <Link
                  to="/services"
                  className={`px-3 py-1.5 rounded-full text-xs xl:text-sm font-semibold transition-all flex items-center gap-1 ${
                    isActive('/services') || isActive('/reverse-auction')
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-700 hover:text-blue-600 hover:bg-slate-100'
                  }`}
                >
                  Services
                  <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${servicesDropdownOpen ? 'rotate-180' : ''}`} />
                </Link>

                {servicesDropdownOpen && (
                  <div className="absolute top-full left-0 w-64 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 animate-fade-in z-50">
                    <Link to="/services" className="flex items-center gap-3 px-4 py-2.5 hover:bg-slate-50 transition-colors">
                      <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                        <Hammer className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-slate-900">Home & Civil Services</div>
                        <div className="text-xs text-slate-500">Electrician, Plumber, Painter</div>
                      </div>
                    </Link>
                    <Link to="/reverse-auction" className="flex items-center gap-3 px-4 py-2.5 hover:bg-slate-50 transition-colors">
                      <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                        <Truck className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-slate-900">Reverse Auction Engine</div>
                        <div className="text-xs text-slate-500">Live Bidding & BOQ RFQ</div>
                      </div>
                    </Link>
                  </div>
                )}
              </div>

              <Link 
                to="/labour" 
                className={`px-3 py-1.5 rounded-full text-xs xl:text-sm font-semibold transition-all ${
                  isActive('/labour') 
                    ? 'bg-blue-600 text-white shadow-xs' 
                    : 'text-slate-700 hover:text-blue-600 hover:bg-slate-100'
                }`}
              >
                Labour Net
              </Link>

              <Link 
                to="/real-estate" 
                className={`px-3 py-1.5 rounded-full text-xs xl:text-sm font-semibold transition-all ${
                  isActive('/real-estate') 
                    ? 'bg-blue-600 text-white shadow-xs' 
                    : 'text-slate-700 hover:text-blue-600 hover:bg-slate-100'
                }`}
              >
                Real Estate
              </Link>

              {/* Tools Dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => setToolsDropdownOpen(true)}
                onMouseLeave={() => setToolsDropdownOpen(false)}
              >
                <Link
                  to="/calculators"
                  className={`px-3 py-1.5 rounded-full text-xs xl:text-sm font-semibold transition-all flex items-center gap-1 ${
                    isActive('/calculators') || isActive('/floor-plans') || isActive('/loans')
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-700 hover:text-blue-600 hover:bg-slate-100'
                  }`}
                >
                  Tools
                  <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${toolsDropdownOpen ? 'rotate-180' : ''}`} />
                </Link>

                {toolsDropdownOpen && (
                  <div className="absolute top-full left-0 w-72 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 animate-fade-in z-50">
                    <Link to="/calculators" className="flex items-center gap-3 px-4 py-2.5 hover:bg-slate-50 transition-colors">
                      <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                        <Calculator className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-slate-900">19 Civil Calculators</div>
                        <div className="text-xs text-slate-500">Concrete, Steel, Tiles & BOQ</div>
                      </div>
                    </Link>
                    <Link to="/floor-plans" className="flex items-center gap-3 px-4 py-2.5 hover:bg-slate-50 transition-colors">
                      <div className="w-8 h-8 rounded-lg bg-red-50 text-red-600 flex items-center justify-center">
                        <Building2 className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-slate-900">2D/3D Floor Plans</div>
                        <div className="text-xs text-slate-500">Vastu Plans & Turnkey Budgets</div>
                      </div>
                    </Link>
                    <Link to="/loans" className="flex items-center gap-3 px-4 py-2.5 hover:bg-slate-50 transition-colors">
                      <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
                        <ShieldCheck className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-slate-900">Home Loan & Partner Portal</div>
                        <div className="text-xs text-slate-500">EMI & Stage Disbursement</div>
                      </div>
                    </Link>
                  </div>
                )}
              </div>

              <Link 
                to="/about" 
                className={`px-3 py-1.5 rounded-full text-xs xl:text-sm font-semibold transition-all ${
                  isActive('/about') 
                    ? 'bg-blue-600 text-white shadow-xs' 
                    : 'text-slate-700 hover:text-blue-600 hover:bg-slate-100'
                }`}
              >
                About Us
              </Link>

              <Link 
                to="/contact" 
                className={`px-3 py-1.5 rounded-full text-xs xl:text-sm font-semibold transition-all ${
                  isActive('/contact') 
                    ? 'bg-blue-600 text-white shadow-xs' 
                    : 'text-slate-700 hover:text-blue-600 hover:bg-slate-100'
                }`}
              >
                Contact Us
              </Link>
            </nav>

            {/* Right Action Buttons - Phone number removed per image copy 6.png */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              {/* Search trigger */}
              <button
                onClick={onOpenSearch}
                aria-label="Search platform"
                className="p-2 text-slate-600 hover:text-blue-600 hover:bg-slate-100 rounded-full transition-colors"
                title="Search materials, services, labour"
              >
                <Search className="w-4 h-4" />
              </button>

              {/* Get Started CTA */}
              <button 
                onClick={() => onOpenEnquiry('Get Started with BuildMitra')}
                className="inline-flex items-center gap-1.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold text-xs sm:text-sm px-4 py-2 rounded-full shadow-xs hover:shadow-sm transition-all active:scale-95"
              >
                <span>Get Started</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              {/* Mobile Hamburger toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle navigation menu"
                className="lg:hidden p-2 text-slate-800 rounded-lg hover:bg-slate-100 transition-colors"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Menu Bar - Stacked ONE BY ONE per image copy 11.png */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-3 max-h-[88vh] overflow-y-auto shadow-2xl animate-fade-in">
            {/* Quick search input */}
            <div 
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenSearch();
              }}
              className="flex items-center gap-2.5 bg-slate-100 hover:bg-slate-200/80 text-slate-600 px-4 py-3 rounded-2xl text-sm cursor-pointer transition-colors"
            >
              <Search className="w-4 h-4 text-slate-400 shrink-0" />
              <span className="text-xs font-medium">Search materials, services, labour...</span>
            </div>

            {/* List of options displayed ONE BY ONE */}
            <div className="flex flex-col space-y-1.5 pt-1">
              {[
                { to: '/', label: 'Home', icon: <Home className="w-4 h-4 text-blue-600" /> },
                { to: '/materials', label: 'Materials Marketplace', icon: <Layers className="w-4 h-4 text-blue-600" /> },
                { to: '/services', label: 'Home & Civil Services', icon: <Hammer className="w-4 h-4 text-emerald-600" /> },
                { to: '/reverse-auction', label: 'Reverse Auction Engine', icon: <Truck className="w-4 h-4 text-amber-600" /> },
                { to: '/labour', label: 'Labour Net Directory', icon: <Users className="w-4 h-4 text-yellow-600" /> },
                { to: '/real-estate', label: 'Real Estate Hub & DIY Survey', icon: <MapPin className="w-4 h-4 text-sky-600" /> },
                { to: '/floor-plans', label: '2D/3D Floor Plans Studio', icon: <Building2 className="w-4 h-4 text-red-600" /> },
                { to: '/calculators', label: '19 Civil Engineering Calculators', icon: <Calculator className="w-4 h-4 text-indigo-600" /> },
                { to: '/loans', label: 'Home Loan & Partner Portal', icon: <ShieldCheck className="w-4 h-4 text-purple-600" /> },
                { to: '/about', label: 'About Us & Leadership', icon: <Info className="w-4 h-4 text-slate-600" /> },
                { to: '/contact', label: 'Contact Us', icon: <PhoneCall className="w-4 h-4 text-slate-600" /> },
              ].map((item) => {
                const active = isActive(item.to);
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={`flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-semibold transition-all ${
                      active
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'bg-slate-50 text-slate-800 hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                        active ? 'bg-white/20 text-white' : 'bg-white text-slate-700 shadow-2xs'
                      }`}>
                        {item.icon}
                      </div>
                      <span>{item.label}</span>
                    </div>
                    <ChevronRight className={`w-4 h-4 ${active ? 'text-white' : 'text-slate-400'}`} />
                  </Link>
                );
              })}
            </div>

            {/* Helpline and CTA buttons */}
            <div className="pt-2 flex flex-col gap-2">
              <a 
                href="tel:+917676942386"
                className="flex items-center justify-center gap-2 bg-slate-100 text-slate-800 font-bold py-3 rounded-xl text-xs hover:bg-slate-200 transition-colors"
              >
                <PhoneCall className="w-4 h-4 text-blue-600" />
                <span>Call Helpline: +91 76769 42386</span>
              </a>

              <button 
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenEnquiry('Get Started Mobile Menu');
                }}
                className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold py-3.5 rounded-xl text-center shadow-md text-xs sm:text-sm flex items-center justify-center gap-2 active:scale-95"
              >
                <span>Get Started Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
