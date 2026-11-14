import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { 
  MapPin, 
  Bell, 
  ChevronDown, 
  User, 
  Search, 
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
  ShieldCheck
} from 'lucide-react';

export const CustomerHeader: React.FC = () => {
  const { 
    currentUser, 
    setAuthModalOpen, 
    setAuthStep, 
    selectedCity, 
    setSelectedCity,
    notifications,
    markNotificationRead,
    logoutUser 
  } = useApp();

  const [cityDropdownOpen, setCityDropdownOpen] = useState(false);
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const cities = ['Hyderabad', 'Bengaluru', 'Chennai', 'Mumbai'];
  const unreadCount = notifications.filter(n => !n.read).length;

  // Auto-close dropdowns and mobile drawer on page navigation
  useEffect(() => {
    setMobileMenuOpen(false);
    setCityDropdownOpen(false);
    setNotifDropdownOpen(false);
  }, [location.pathname]);

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  const navMenuItems = [
    { name: 'Home', path: '/', icon: Home, color: 'text-blue-600 bg-blue-50' },
    { name: 'Explore Services', path: '/services', icon: Wrench, color: 'text-emerald-600 bg-emerald-50' },
    { name: 'GPS Nearby Providers', path: '/nearby-providers', icon: MapPin, color: 'text-red-600 bg-red-50' },
    { name: 'Real Estate Marketplace', path: '/real-estate', icon: Building2, color: 'text-indigo-600 bg-indigo-50' },
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
          <div className="flex items-center justify-between h-14 sm:h-16 gap-1.5 sm:gap-3">
            
            {/* Left: Brand Logo + Location Selector */}
            <div className="flex items-center gap-1 sm:gap-2.5 shrink-0">
              <Link to="/" className="flex items-center gap-1 group shrink-0" title="BuildMitra Home">
                <img 
                  src="/assets/logo.png" 
                  alt="BuildMitra Logo" 
                  className="h-7 sm:h-9 w-auto object-contain transition-transform group-hover:scale-105" 
                />
              </Link>

              <div className="relative">
                <button
                  onClick={() => {
                    setCityDropdownOpen(!cityDropdownOpen);
                    setNotifDropdownOpen(false);
                  }}
                  className="flex items-center gap-1 text-[11px] sm:text-xs font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 px-1.5 sm:px-2.5 py-1 sm:py-1.5 rounded-full border border-slate-200 transition-colors"
                  title="Change Location"
                >
                  <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-blue-600 shrink-0" />
                  <span className="max-w-[55px] xs:max-w-[70px] sm:max-w-none truncate">{selectedCity}</span>
                  <ChevronDown className="w-3 h-3 text-slate-400 shrink-0" />
                </button>

                {cityDropdownOpen && (
                  <div className="absolute left-0 mt-2 w-44 bg-white rounded-2xl shadow-xl border border-slate-200 p-2 z-50 animate-fade-in">
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
                to="/real-estate" 
                className={`px-3 py-1.5 rounded-full transition-all ${
                  isActive('/real-estate') 
                    ? 'text-blue-600 font-bold bg-blue-50 border border-blue-200' 
                    : 'text-slate-700 hover:text-blue-600 hover:bg-slate-50'
                }`}
              >
                Real Estate
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

            {/* Right: Search + Notifications + Sign In / Register + Menu Bar */}
            <div className="flex items-center gap-1 sm:gap-2 shrink-0">
              
              {/* Search Trigger */}
              <button
                onClick={() => {
                  navigate('/');
                  const inputEl = document.querySelector('input[type="text"]') as HTMLInputElement;
                  if (inputEl) inputEl.focus();
                }}
                className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-full text-slate-600 hover:text-blue-600 hover:bg-slate-100 transition-colors"
                title="Search Services"
              >
                <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>

              {/* Notifications Bell */}
              <div className="relative">
                <button
                  onClick={() => {
                    setNotifDropdownOpen(!notifDropdownOpen);
                    setCityDropdownOpen(false);
                  }}
                  className="relative w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-full text-slate-600 hover:text-blue-600 hover:bg-slate-100 transition-colors"
                  title="Notifications"
                >
                  <Bell className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  {unreadCount > 0 && (
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white animate-pulse"></span>
                  )}
                </button>

                {notifDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-72 sm:w-80 bg-white rounded-3xl shadow-2xl border border-slate-200 p-4 z-50 animate-fade-in">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                      <div className="font-extrabold text-sm text-slate-900">Notifications</div>
                      <span className="text-[11px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                        {unreadCount} new
                      </span>
                    </div>

                    <div className="divide-y divide-slate-100 max-h-72 overflow-y-auto">
                      {notifications.map((n) => (
                        <div 
                          key={n.id} 
                          onClick={() => markNotificationRead(n.id)}
                          className={`py-3 px-1 cursor-pointer transition-colors ${n.read ? 'opacity-70' : 'bg-blue-50/40 rounded-xl'}`}
                        >
                          <div className="text-xs font-extrabold text-slate-900">{n.title}</div>
                          <div className="text-xs text-slate-600 mt-0.5 leading-relaxed">{n.message}</div>
                          <div className="text-[10px] text-slate-400 mt-1">{n.timestamp}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

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

              {/* Desktop Only: Amber "Get Started" CTA (Removed on Mobile per user request) */}
              <button
                onClick={() => {
                  setAuthStep('welcome');
                  setAuthModalOpen(true);
                }}
                className="hidden md:inline-flex items-center gap-1.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black text-xs px-3.5 py-1.5 rounded-full shadow-xs active:scale-95 whitespace-nowrap transition-all"
                title="Get Started with BuildMitra"
              >
                <span>Get Started</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              {/* Mobile View: Menu Bar Hamburger Toggle (Visible on mobile & tablets) */}
              <button
                onClick={() => {
                  setMobileMenuOpen(!mobileMenuOpen);
                  setCityDropdownOpen(false);
                  setNotifDropdownOpen(false);
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