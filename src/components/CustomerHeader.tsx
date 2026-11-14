import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { 
  MapPin, 
  ChevronDown, 
  User, 
  Check, 
  ArrowRight,
  LogOut,
  Menu,
  X,
  Home,
  Wrench,
  Building2,
  Sparkles,
  Calculator,
  Calendar,
  Briefcase,
  PhoneCall,
  ShieldCheck,
  ShoppingCart,
  Gavel,
  Landmark
} from 'lucide-react';

export const CustomerHeader: React.FC = () => {
  const { 
    currentUser, 
    setAuthModalOpen, 
    setAuthStep, 
    selectedCity, 
    setSelectedCity,
    bookings,
    logoutUser 
  } = useApp();

  const [cityDropdownOpen, setCityDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const cities = ['Hyderabad', 'Bengaluru', 'Chennai', 'Mumbai'];

  // Auto-close dropdowns and mobile drawer on page navigation
  useEffect(() => {
    setMobileMenuOpen(false);
    setCityDropdownOpen(false);
  }, [location.pathname]);

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  const navMenuItems = [
    { name: 'Home', path: '/', icon: Home, color: 'text-blue-600 bg-blue-50' },
    { name: 'Explore Services', path: '/services', icon: Wrench, color: 'text-emerald-600 bg-emerald-50' },
    { name: 'Reverse Auction Engine', path: '/reverse-auction', icon: Gavel, color: 'text-amber-600 bg-amber-50' },
    { name: 'Home Loan EMI Calculator', path: '/home-loans', icon: Landmark, color: 'text-indigo-600 bg-indigo-50' },
    { name: 'GPS Nearby Providers', path: '/nearby-providers', icon: MapPin, color: 'text-red-600 bg-red-50' },
    { name: '3D House Designs', path: '/3d-designs', icon: Sparkles, color: 'text-purple-600 bg-purple-50' },
    { name: 'Cost Estimator Calculator', path: '/calculator', icon: Calculator, color: 'text-amber-600 bg-amber-50' },
    { name: 'My Bookings', path: '/my-bookings', icon: Calendar, color: 'text-cyan-600 bg-cyan-50' },
    { name: 'Customer Profile', path: '/profile', icon: User, color: 'text-slate-600 bg-slate-100' },
    { name: 'Partner Portal', path: '/partner/dashboard', icon: Briefcase, color: 'text-orange-600 bg-orange-50' },
    { name: 'Help & Contact Us', path: '/contact', icon: PhoneCall, color: 'text-teal-600 bg-teal-50' },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-2xs">
        <div className="max-w-7xl mx-auto px-2.5 sm:px-6 lg:px-8">
          
          {/* Top App Bar - Grand & Responsive */}
          <div className="flex items-center justify-between min-h-[66px] sm:h-20 py-1.5 sm:py-2 gap-1.5 sm:gap-3">
            
            {/* Left: Big Brand Logo + Big Location Selector Below (image copy 22.png) */}
            <div className="flex flex-col items-start gap-1 shrink-0 py-0.5">
              <Link to="/" className="flex items-center group shrink-0" title="BuildMitra Home">
                <img 
                  src="/assets/logo.png" 
                  alt="BuildMitra Logo" 
                  className="h-8 sm:h-10 w-auto object-contain transition-transform group-hover:scale-105" 
                />
              </Link>

              <div className="relative">
                <button
                  onClick={() => {
                    setCityDropdownOpen(!cityDropdownOpen);
                  }}
                  className="flex items-center gap-1.5 text-xs sm:text-sm font-black text-slate-900 bg-slate-100 hover:bg-slate-200 px-3 py-1 sm:py-1.5 rounded-full border border-slate-200 shadow-2xs transition-all active:scale-95"
                  title="Change Location"
                >
                  <MapPin className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  <span>{selectedCity}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                </button>

                {cityDropdownOpen && (
                  <div className="absolute left-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-slate-200 p-2 z-50 animate-fade-in">
                    <div className="text-[10px] font-bold text-slate-400 uppercase px-2.5 py-1">Select City</div>
                    {cities.map((city) => (
                      <button
                        key={city}
                        onClick={() => {
                          setSelectedCity(city);
                          setCityDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 text-xs font-bold rounded-xl flex items-center justify-between transition-colors ${
                          selectedCity === city ? 'bg-blue-50 text-blue-700' : 'text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <span>{city}</span>
                        {selectedCity === city && <Check className="w-3.5 h-3.5 text-blue-600" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Center: Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-xs xl:text-sm font-semibold">
              <Link 
                to="/" 
                className={`px-3 py-1.5 rounded-full transition-all ${
                  isActive('/') 
                    ? 'text-blue-600 font-bold bg-blue-50 border border-blue-200' 
                    : 'text-slate-700 hover:text-blue-600 hover:bg-slate-50'
                }`}
              >
                Home
              </Link>
              <Link 
                to="/services" 
                className={`px-3 py-1.5 rounded-full transition-all ${
                  isActive('/services') 
                    ? 'text-blue-600 font-bold bg-blue-50 border border-blue-200' 
                    : 'text-slate-700 hover:text-blue-600 hover:bg-slate-50'
                }`}
              >
                Services
              </Link>
              <Link 
                to="/reverse-auction" 
                className={`px-3 py-1.5 rounded-full transition-all ${
                  isActive('/reverse-auction') 
                    ? 'text-blue-600 font-bold bg-blue-50 border border-blue-200' 
                    : 'text-slate-700 hover:text-blue-600 hover:bg-slate-50'
                }`}
              >
                Reverse Auction
              </Link>
              <Link 
                to="/home-loans" 
                className={`px-3 py-1.5 rounded-full transition-all ${
                  isActive('/home-loans') 
                    ? 'text-blue-600 font-bold bg-blue-50 border border-blue-200' 
                    : 'text-slate-700 hover:text-blue-600 hover:bg-slate-50'
                }`}
              >
                Home Loans
              </Link>
              <Link 
                to="/nearby-providers" 
                className={`px-3 py-1.5 rounded-full transition-all ${
                  isActive('/nearby-providers') 
                    ? 'text-blue-600 font-bold bg-blue-50 border border-blue-200' 
                    : 'text-slate-700 hover:text-blue-600 hover:bg-slate-50'
                }`}
              >
                GPS Nearby
              </Link>
              <Link 
                to="/3d-designs" 
                className={`px-3 py-1.5 rounded-full transition-all ${
                  isActive('/3d-designs') 
                    ? 'text-blue-600 font-bold bg-blue-50 border border-blue-200' 
                    : 'text-slate-700 hover:text-blue-600 hover:bg-slate-50'
                }`}
              >
                3D Designs
              </Link>
              <Link 
                to="/calculator" 
                className={`px-3 py-1.5 rounded-full transition-all ${
                  isActive('/calculator') 
                    ? 'text-blue-600 font-bold bg-blue-50 border border-blue-200' 
                    : 'text-slate-700 hover:text-blue-600 hover:bg-slate-50'
                }`}
              >
                Cost Calculator
              </Link>
              <Link 
                to="/my-bookings" 
                className={`px-3 py-1.5 rounded-full transition-all ${
                  isActive('/my-bookings') || isActive('/booking')
                    ? 'text-blue-600 font-bold bg-blue-50 border border-blue-200' 
                    : 'text-slate-700 hover:text-blue-600 hover:bg-slate-50'
                }`}
              >
                My Bookings
              </Link>
            </nav>

            {/* Right: Cart Button + Sign In / Register + Menu Bar (Exact Match to image copy 29.png) */}
            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              
              {/* Cart Button with Count Badge (Replaces Search & Bell per image copy 29.png) */}
              <Link
                to="/my-bookings"
                className="relative flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors shadow-2xs"
                title="View Bookings & Cart"
              >
                <ShoppingCart className="w-4 h-4 text-slate-800" />
                {bookings.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 text-white text-[9px] font-black rounded-full flex items-center justify-center animate-pulse shadow-xs">
                    {bookings.length}
                  </span>
                )}
              </Link>

              {/* User Authentication: Sign In / Register Option in both Mobile & Desktop */}
              {currentUser.isLoggedIn ? (
                <div className="flex items-center gap-1 sm:gap-1.5">
                  <Link
                    to="/profile"
                    className="flex items-center gap-1 bg-slate-100 hover:bg-slate-200 p-0.5 sm:px-2.5 sm:py-1 rounded-full border border-slate-200 transition-colors"
                    title="View Profile"
                  >
                    <img src={currentUser.avatar} alt={currentUser.name} className="w-6 h-6 rounded-full object-cover border border-blue-500" />
                    <span className="hidden sm:inline text-xs font-bold text-slate-800 max-w-[70px] truncate">{currentUser.name}</span>
                  </Link>

                  <button
                    onClick={logoutUser}
                    className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold text-red-600 bg-red-50 hover:bg-red-100 border border-red-200 transition-colors"
                    title="Sign Out"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span className="hidden md:inline">Sign Out</span>
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setAuthStep('login');
                    setAuthModalOpen(true);
                  }}
                  className="inline-flex items-center gap-1 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 transition-all active:scale-95 whitespace-nowrap"
                  title="Sign In / Register"
                >
                  <User className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-blue-600 shrink-0" />
                  <span className="sm:hidden">Sign In</span>
                  <span className="hidden sm:inline">Sign In / Register</span>
                </button>
              )}

              {/* Partner Portal Pill Button (Matching Image 3) */}
              <Link
                to="/partner/dashboard"
                className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-[#FFFDF5] hover:bg-[#FEFCE8] border border-[#FDE047] hover:border-amber-400 text-[#78350F] shadow-2xs transition-all active:scale-95 group shrink-0"
                title="BuildMitra Partner Portal"
              >
                <Briefcase className="w-3.5 h-3.5 text-[#B45309] shrink-0 transition-transform group-hover:scale-110" />
                <div className="flex flex-col text-left leading-[1.05]">
                  <span className="text-[10px] sm:text-[11px] font-black text-[#78350F] tracking-tight">Partner</span>
                  <span className="text-[9px] sm:text-[10px] font-bold text-[#92400E] tracking-tight">Portal</span>
                </div>
              </Link>

              {/* Mobile View: Menu Bar Hamburger Toggle (Visible on mobile & tablets) */}
              <button
                onClick={() => {
                  setMobileMenuOpen(!mobileMenuOpen);
                  setCityDropdownOpen(false);
                }}
                className="lg:hidden flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 transition-colors shrink-0"
                title={mobileMenuOpen ? 'Close Menu' : 'Open Menu Bar'}
                aria-label="Navigation Menu"
              >
                {mobileMenuOpen ? (
                  <X className="w-4 h-4 text-slate-900" />
                ) : (
                  <Menu className="w-4 h-4 text-slate-900" />
                )}
              </button>

            </div>

          </div>

        </div>

        {/* Mobile Navigation Drawer Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200/90 bg-white/98 backdrop-blur-xl shadow-2xl animate-fade-in max-h-[82vh] overflow-y-auto">
            
            {/* User Session Banner inside Mobile Drawer */}
            <div className="p-3.5 bg-gradient-to-r from-blue-50 via-indigo-50/50 to-slate-50 border-b border-slate-100 flex items-center justify-between">
              {currentUser.isLoggedIn ? (
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-2.5">
                    <img 
                      src={currentUser.avatar} 
                      alt={currentUser.name} 
                      className="w-10 h-10 rounded-full object-cover border-2 border-blue-600 shadow-xs" 
                    />
                    <div>
                      <div className="text-xs font-black text-slate-900 flex items-center gap-1">
                        {currentUser.name}
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      </div>
                      <div className="text-[11px] text-slate-500 font-medium">{currentUser.phone}</div>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      logoutUser();
                      setMobileMenuOpen(false);
                    }}
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-red-600 bg-red-50 hover:bg-red-100 px-2.5 py-1.5 rounded-full border border-red-200"
                  >
                    <LogOut className="w-3 h-3" />
                    <span>Sign Out</span>
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-between w-full">
                  <div>
                    <div className="text-xs font-black text-slate-900">Welcome to BuildMitra</div>
                    <div className="text-[11px] text-slate-500">Sign in to book services & track orders</div>
                  </div>
                  <button
                    onClick={() => {
                      setAuthStep('login');
                      setAuthModalOpen(true);
                      setMobileMenuOpen(false);
                    }}
                    className="text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 px-3 py-1.5 rounded-full shadow-xs"
                  >
                    Sign In / Register
                  </button>
                </div>
              )}
            </div>

            {/* Menu Links Grid */}
            <div className="p-3 grid grid-cols-1 sm:grid-cols-2 gap-1.5">
              {navMenuItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.path);
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                      active 
                        ? 'bg-blue-50/90 text-blue-700 font-black border border-blue-200' 
                        : 'text-slate-700 hover:bg-slate-50 font-bold'
                    }`}
                  >
                    <div className={`p-1.5 rounded-lg ${item.color}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-xs">{item.name}</span>
                    {active && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-600"></span>}
                  </Link>
                );
              })}
            </div>

            {/* Mobile Drawer Bottom Helpline */}
            <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
              <div className="flex items-center gap-1.5">
                <PhoneCall className="w-3.5 h-3.5 text-blue-600" />
                <span className="font-semibold">Support: 1800-BUILD-MITRA</span>
              </div>
              <span className="font-bold text-blue-600">All India Verified</span>
            </div>

          </div>
        )}
      </header>

      {/* Dimmed backdrop when mobile menu is open */}
      {mobileMenuOpen && (
        <div 
          onClick={() => setMobileMenuOpen(false)}
          className="lg:hidden fixed inset-0 top-14 sm:top-16 bg-slate-900/40 backdrop-blur-xs z-30 animate-fade-in"
        />
      )}
    </>
  );
};

export default CustomerHeader;