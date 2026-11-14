import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Calendar, Building, User, Menu } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const BottomNav: React.FC = () => {
  const { bookings } = useApp();
  const activeBookingsCount = bookings.filter(b => b.status !== 'Completed' && b.status !== 'Cancelled').length;

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-t border-slate-200/90 shadow-2xl safe-area-bottom">
      <div className="grid grid-cols-4 max-w-md mx-auto py-2">
        
        {/* Home */}
        <NavLink 
          to="/" 
          end
          className={({ isActive }) => `flex flex-col items-center justify-center gap-1 transition-all ${
            isActive ? 'text-blue-600 font-extrabold scale-105' : 'text-slate-500 hover:text-slate-900 font-medium'
          }`}
        >
          <div className="relative">
            <Home className="w-5 h-5" />
          </div>
          <span className="text-[10px] tracking-tight">Home</span>
        </NavLink>

        {/* Bookings */}
        <NavLink 
          to="/my-bookings" 
          className={({ isActive }) => `flex flex-col items-center justify-center gap-1 transition-all ${
            isActive ? 'text-blue-600 font-extrabold scale-105' : 'text-slate-500 hover:text-slate-900 font-medium'
          }`}
        >
          <div className="relative">
            <Calendar className="w-5 h-5" />
            {activeBookingsCount > 0 && (
              <span className="absolute -top-1 -right-2 w-4 h-4 bg-emerald-500 text-white text-[9px] font-black rounded-full flex items-center justify-center animate-pulse">
                {activeBookingsCount}
              </span>
            )}
          </div>
          <span className="text-[10px] tracking-tight">Bookings</span>
        </NavLink>

        {/* Real Estate */}
        <NavLink 
          to="/real-estate" 
          className={({ isActive }) => `flex flex-col items-center justify-center gap-1 transition-all ${
            isActive ? 'text-blue-600 font-extrabold scale-105' : 'text-slate-500 hover:text-slate-900 font-medium'
          }`}
        >
          <div className="relative">
            <Building className="w-5 h-5" />
          </div>
          <span className="text-[10px] tracking-tight">Real Estate</span>
        </NavLink>

        {/* More / Profile */}
        <NavLink 
          to="/profile" 
          className={({ isActive }) => `flex flex-col items-center justify-center gap-1 transition-all ${
            isActive ? 'text-blue-600 font-extrabold scale-105' : 'text-slate-500 hover:text-slate-900 font-medium'
          }`}
        >
          <div className="relative">
            <Menu className="w-5 h-5" />
          </div>
          <span className="text-[10px] tracking-tight">More</span>
        </NavLink>

      </div>
    </div>
  );
};
