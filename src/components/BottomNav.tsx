import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Calculator, Building, Calendar } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const BottomNav: React.FC = () => {
  const { bookings } = useApp();
  const activeBookingsCount = bookings.filter(b => b.status !== 'Completed' && b.status !== 'Cancelled').length;

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-t border-slate-200/90 shadow-2xl safe-area-bottom">
      <div className="grid grid-cols-4 max-w-md mx-auto py-2">
        
        {/* 1. Home */}
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
          <span className="text-[10px] tracking-tight font-bold">Home</span>
        </NavLink>

        {/* 2. Calculator (at the place of Bookings per image copy 23.png) */}
        <NavLink 
          to="/calculator" 
          className={({ isActive }) => `flex flex-col items-center justify-center gap-1 transition-all ${
            isActive ? 'text-blue-600 font-extrabold scale-105' : 'text-slate-500 hover:text-slate-900 font-medium'
          }`}
        >
          <div className="relative">
            <Calculator className="w-5 h-5" />
          </div>
          <span className="text-[10px] tracking-tight font-bold">Calculator</span>
        </NavLink>

        {/* 3. Real Estate */}
        <NavLink 
          to="/real-estate" 
          className={({ isActive }) => `flex flex-col items-center justify-center gap-1 transition-all ${
            isActive ? 'text-blue-600 font-extrabold scale-105' : 'text-slate-500 hover:text-slate-900 font-medium'
          }`}
        >
          <div className="relative">
            <Building className="w-5 h-5" />
          </div>
          <span className="text-[10px] tracking-tight font-bold">Real Estate</span>
        </NavLink>

        {/* 4. Bookings (at the place of More per image copy 24.png) */}
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
          <span className="text-[10px] tracking-tight font-bold">Bookings</span>
        </NavLink>

      </div>
    </div>
  );
};
