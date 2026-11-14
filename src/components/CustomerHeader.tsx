import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { 
  MapPin, 
  Bell, 
  ChevronDown, 
  User, 
  Search, 
  ShieldAlert, 
  Briefcase, 
  Check, 
  X,
  Smartphone,
  Home,
  Wrench,
  Building,
  Layers,
  Calculator,
  Calendar
} from 'lucide-react';

export const CustomerHeader: React.FC = () => {
  const { 
    currentUser, 
    setAuthModalOpen, 
    setAuthStep, 
    selectedCity, 
    setSelectedCity,
    notifications,
    markNotificationRead 
  } = useApp();

  const [cityDropdownOpen, setCityDropdownOpen] = useState(false);
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const cities = ['Hyderabad', 'Bengaluru', 'Chennai', 'Mumbai'];
  const unreadCount = notifications.filter(n => !n.read).length;

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-2xs">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        
        {/* Top App Bar */}
        <div className="flex items-center justify-between h-14 sm:h-16 gap-2">
          
          {/* Left: Location Dropdown (per image copy 14.png Screen 5) */}
          <div className="flex items-center gap-2">
            <div className="relative">
              <button
                onClick={() => setCityDropdownOpen(!cityDropdownOpen)}
                className="flex items-center gap-1.5 text-xs sm:text-sm font-extrabold text-slate-900 bg-slate-50 hover:bg-slate-100 px-3 py-1.5 rounded-full border border-slate-200 transition-colors"
              >
                <MapPin className="w-4 h-4 text-blue-600 shrink-0" />
                <span>{selectedCity}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
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

            {/* Brand Logo on Desktop & Mobile */}
            <Link to="/" className="flex items-center gap-2 ml-1">
              <img src="/assets/logo.png" alt="BuildMitra" className="h-8 sm:h-9 w-auto object-contain" />
            </Link>
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
              to="/services/painting" 
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

          {/* Right: Quick Portals Switcher + Notifications + Profile */}
          <div className="flex items-center gap-2">
            
            {/* Quick Portals Links (Desktop & Tablet) */}
            <div className="hidden sm:flex items-center gap-1.5 mr-1">
              <Link
                to="/partner/dashboard"
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100 transition-colors"
              >
                <Briefcase className="w-3.5 h-3.5 text-amber-600" />
                <span>Partner Portal</span>
              </Link>

              <Link
                to="/admin"
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold bg-purple-50 text-purple-800 border border-purple-200 hover:bg-purple-100 transition-colors"
              >
                <ShieldAlert className="w-3.5 h-3.5 text-purple-600" />
                <span>Admin</span>
              </Link>
            </div>

            {/* Notifications Bell (per image copy 14.png Screen 5) */}
            <div className="relative">
              <button
                onClick={() => setNotifDropdownOpen(!notifDropdownOpen)}
                className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-50 hover:bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 transition-colors"
                title="Notifications"
              >
                <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full ring-2 ring-white animate-pulse"></span>
                )}
              </button>

              {notifDropdownOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-3xl shadow-2xl border border-slate-200 p-4 z-50 animate-fade-in">
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

            {/* Customer Profile / Login (Screens 1, 2, 4) */}
            {currentUser.isLoggedIn ? (
              <Link
                to="/profile"
                className="flex items-center gap-2 pl-1 group"
                title="Open Profile"
              >
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden border-2 border-blue-500 shadow-xs group-hover:scale-105 transition-transform">
                  <img src={currentUser.avatar} alt={currentUser.name} className="w-full h-full object-cover" />
                </div>
              </Link>
            ) : (
              <button
                onClick={() => {
                  setAuthStep('welcome');
                  setAuthModalOpen(true);
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs px-3.5 py-2 rounded-full shadow-xs transition-all active:scale-95"
              >
                Login
              </button>
            )}

          </div>

        </div>

      </div>
    </header>
  );
};
export default CustomerHeader;
