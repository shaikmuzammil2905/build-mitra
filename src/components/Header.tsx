import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Phone, 
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
  Users
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
      setScrolled(window.scrollY > 20);
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
            ? 'bg-white/95 backdrop-blur-md shadow-md py-2.5' 
            : 'bg-white/90 backdrop-blur-sm shadow-sm py-3'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            
            {/* Logo - No white patch work, clean transparent */}
            <Link to="/" className="flex items-center gap-2 group focus:outline-none">
              <img 
                src="/assets/logo.png" 
                alt="BuildMitra Logo" 
                className="h-10 sm:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                loading="eager"
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              <Link 
                to="/" 
                className={`px-3 py-1.5 rounded-full text-sm font-semibold transition-all ${
                  isActive('/') 
                    ? 'bg-blue-600 text-white shadow-sm' 
                    : 'text-slate-700 hover:text-blue-600 hover:bg-slate-100'
                }`}
              >
                Home
              </Link>

              <Link 
                to="/materials" 
                className={`px-3 py-1.5 rounded-full text-sm font-semibold transition-all ${
                  isActive('/materials') 
                    ? 'bg-blue-600 text-white shadow-sm' 
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
                  className={`px-3 py-1.5 rounded-full text-sm font-semibold transition-all flex items-center gap-1 ${
                    isActive('/services') || isActive('/reverse-auction')
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-700 hover:text-blue-600 hover:bg-slate-100'
                  }`}
                >
                  Services
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${servicesDropdownOpen ? 'rotate-180' : ''}`} />
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
                className={`px-3 py-1.5 rounded-full text-sm font-semibold transition-all ${
                  isActive('/labour') 
                    ? 'bg-blue-600 text-white shadow-sm' 
                    : 'text-slate-700 hover:text-blue-600 hover:bg-slate-100'
                }`}
              >
                Labour
              </Link>

              <Link 
                to="/real-estate" 
                className={`px-3 py-1.5 rounded-full text-sm font-semibold transition-all ${
                  isActive('/real-estate') 
                    ? 'bg-blue-600 text-white shadow-sm' 
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
                  className={`px-3 py-1.5 rounded-full text-sm font-semibold transition-all flex items-center gap-1 ${
                    isActive('/calculators') || isActive('/floor-plans') || isActive('/loans')
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-700 hover:text-blue-600 hover:bg-slate-100'
                  }`}
                >
                  Tools
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${toolsDropdownOpen ? 'rotate-180' : ''}`} />
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
                className={`px-3 py-1.5 rounded-full text-sm font-semibold transition-all ${
                  isActive('/about') 
                    ? 'bg-blue-600 text-white shadow-sm' 
                    : 'text-slate-700 hover:text-blue-600 hover:bg-slate-100'
                }`}
              >
                About Us
              </Link>

              <Link 
                to="/contact" 
                className={`px-3 py-1.5 rounded-full text-sm font-semibold transition-all ${
                  isActive('/contact') 
                    ? 'bg-blue-600 text-white shadow-sm' 
                    : 'text-slate-700 hover:text-blue-600 hover:bg-slate-100'
                }`}
              >
                Contact Us
              </Link>
            </nav>

            {/* Right Action Buttons */}
            <div className="hidden sm:flex items-center gap-3">
              {/* Search trigger */}
              <button
                onClick={onOpenSearch}
                aria-label="Search platform"
                className="p-2 text-slate-600 hover:text-blue-600 hover:bg-slate-100 rounded-full transition-colors"
                title="Search materials, services, labour"
              >
                <Search className="w-4 h-4" />
              </button>

              {/* Call button */}
              <a 
                href="tel:+917676942386" 
                className="hidden xl:flex items-center gap-2 text-slate-800 font-bold text-sm hover:text-blue-600 transition-colors py-1.5 px-3 rounded-full hover:bg-blue-50"
              >
                <div className="w-7 h-7 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center">
                  <Phone className="w-3.5 h-3.5" />
                </div>
                <span>+91 76769 42386</span>
              </a>

              {/* Get Started CTA */}
              <button 
                onClick={() => onOpenEnquiry('Get Started with BuildMitra')}
                className="inline-flex items-center gap-1.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold text-sm px-4 py-2 rounded-full shadow-sm hover:shadow-md transition-all active:scale-95"
              >
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Mobile Hamburger & Call */}
            <div className="flex sm:hidden items-center gap-2">
              <a 
                href="tel:+917676942386"
                aria-label="Call BuildMitra"
                className="w-9 h-9 rounded-full bg-blue-50 text-blue-700 flex items-center justify-center border border-blue-200"
              >
                <Phone className="w-4 h-4" />
              </a>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle navigation menu"
                className="p-2 text-slate-800 rounded-lg hover:bg-slate-100 transition-colors"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Slide-Down Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-2 max-h-[85vh] overflow-y-auto shadow-2xl animate-fade-in">
            {/* Quick search input in mobile menu */}
            <div 
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenSearch();
              }}
              className="flex items-center gap-2 bg-slate-100 text-slate-500 px-4 py-2.5 rounded-xl text-sm mb-3 cursor-pointer"
            >
              <Search className="w-4 h-4 text-slate-400" />
              <span>Search materials, services, labour...</span>
            </div>

            <div className="grid grid-cols-2 gap-2 pb-2 border-b border-slate-100">
              <Link 
                to="/" 
                className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-semibold ${
                  isActive('/') ? 'bg-blue-600 text-white' : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                Home
              </Link>
              <Link 
                to="/materials" 
                className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-semibold ${
                  isActive('/materials') ? 'bg-blue-600 text-white' : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                Materials
              </Link>
              <Link 
                to="/services" 
                className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-semibold ${
                  isActive('/services') ? 'bg-blue-600 text-white' : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                Services
              </Link>
              <Link 
                to="/reverse-auction" 
                className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-semibold ${
                  isActive('/reverse-auction') ? 'bg-blue-600 text-white' : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                Reverse Auction
              </Link>
              <Link 
                to="/labour" 
                className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-semibold ${
                  isActive('/labour') ? 'bg-blue-600 text-white' : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                Labour Net
              </Link>
              <Link 
                to="/real-estate" 
                className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-semibold ${
                  isActive('/real-estate') ? 'bg-blue-600 text-white' : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                Real Estate
              </Link>
              <Link 
                to="/floor-plans" 
                className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-semibold ${
                  isActive('/floor-plans') ? 'bg-blue-600 text-white' : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                2D/3D Plans
              </Link>
              <Link 
                to="/calculators" 
                className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-semibold ${
                  isActive('/calculators') ? 'bg-blue-600 text-white' : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                19 Calculators
              </Link>
              <Link 
                to="/loans" 
                className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-semibold ${
                  isActive('/loans') ? 'bg-blue-600 text-white' : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                Home Loans
              </Link>
              <Link 
                to="/about" 
                className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-semibold ${
                  isActive('/about') ? 'bg-blue-600 text-white' : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                About Us
              </Link>
              <Link 
                to="/contact" 
                className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-semibold ${
                  isActive('/contact') ? 'bg-blue-600 text-white' : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                Contact Us
              </Link>
            </div>

            <div className="pt-2 flex flex-col gap-2">
              <a 
                href="tel:+917676942386"
                className="flex items-center justify-center gap-2 bg-slate-100 text-slate-800 font-bold py-2.5 rounded-xl text-sm"
              >
                <Phone className="w-4 h-4 text-blue-600" />
                <span>Call Helpline: +91 76769 42386</span>
              </a>

              <button 
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenEnquiry('Get Started Mobile');
                }}
                className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold py-3 rounded-xl text-center shadow-md text-sm flex items-center justify-center gap-2"
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
