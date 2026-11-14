import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  User, 
  MapPin, 
  Calendar, 
  Star, 
  HelpCircle, 
  LogOut, 
  Plus, 
  Trash2, 
  ShieldCheck, 
  ChevronRight,
  Phone,
  Mail,
  Edit2
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const CustomerProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const { 
    currentUser, 
    logoutUser, 
    updateUserAddresses, 
    setAuthModalOpen, 
    loginUser 
  } = useApp();
  
  const [newAddress, setNewAddress] = useState('');
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [nameInput, setNameInput] = useState(currentUser.name);
  const [isEditingName, setIsEditingName] = useState(false);

  const handleSaveName = () => {
    loginUser(currentUser.phone, nameInput);
    setIsEditingName(false);
  };

  const handleAddAddr = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAddress.trim()) return;
    updateUserAddresses([...(currentUser.addresses || []), newAddress.trim()]);
    setNewAddress('');
    setIsAddingAddress(false);
  };

  const handleRemoveAddr = (idx: number) => {
    const updated = [...(currentUser.addresses || [])];
    updated.splice(idx, 1);
    updateUserAddresses(updated);
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-24 max-w-md mx-auto pt-0">
      {/* Top Header */}
      <div className="bg-white border-b border-slate-100 px-4 py-3 sticky top-14 sm:top-16 z-20 flex items-center justify-between shadow-2xs">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => navigate(-1)} 
            className="p-1.5 rounded-full hover:bg-slate-100 text-slate-700 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-lg font-bold text-slate-900">Profile</h1>
        </div>
        {currentUser.isLoggedIn ? (
          <span className="text-xs font-semibold px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-full flex items-center gap-1 border border-emerald-200">
            <ShieldCheck className="w-3.5 h-3.5" />
            Verified
          </span>
        ) : (
          <button 
            onClick={() => setAuthModalOpen(true)}
            className="text-xs font-bold px-3 py-1 bg-blue-600 text-white rounded-full hover:bg-blue-700"
          >
            Login
          </button>
        )}
      </div>

      {/* User Info Card (Screen 4 reference: Hemanth Kumar) */}
      <div className="bg-white p-5 border-b border-slate-100 flex items-center gap-4">
        <div className="relative">
          <img 
            src={currentUser.avatar} 
            alt={currentUser.name} 
            className="w-16 h-16 rounded-full object-cover border-2 border-blue-500 shadow-sm"
          />
          <div className="absolute bottom-0 right-0 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full"></div>
        </div>

        <div className="flex-1">
          {isEditingName ? (
            <div className="flex items-center gap-2 mb-1">
              <input 
                type="text" 
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                className="text-base font-bold text-slate-900 border border-slate-300 rounded px-2 py-0.5 w-full focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <button onClick={handleSaveName} className="text-xs bg-blue-600 text-white px-2 py-1 rounded font-semibold">
                Save
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900">{currentUser.name}</h2>
              <button onClick={() => setIsEditingName(true)} className="p-1 text-slate-400 hover:text-blue-600">
                <Edit2 className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-0.5">
            <Phone className="w-3 h-3 text-slate-400" />
            <span>{currentUser.phone}</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-0.5">
            <Mail className="w-3 h-3 text-slate-400" />
            <span>{currentUser.email}</span>
          </div>
        </div>
      </div>

      {/* Navigation List - Exact match to Screen 4 */}
      <div className="p-4 space-y-4">
        
        {/* Saved Addresses Section */}
        <div className="bg-white rounded-2xl p-4 shadow-xs border border-slate-100">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
              <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                <MapPin className="w-4 h-4" />
              </div>
              <span>Saved Addresses</span>
            </div>
            <button 
              onClick={() => setIsAddingAddress(!isAddingAddress)}
              className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add New</span>
            </button>
          </div>

          {isAddingAddress && (
            <form onSubmit={handleAddAddr} className="mb-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
              <textarea 
                rows={2}
                value={newAddress}
                onChange={(e) => setNewAddress(e.target.value)}
                placeholder="Enter complete address with flat/house no. & landmark"
                className="w-full text-xs p-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <div className="flex justify-end gap-2 mt-2">
                <button 
                  type="button" 
                  onClick={() => setIsAddingAddress(false)}
                  className="text-xs px-2.5 py-1 text-slate-600 font-semibold"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="text-xs px-3 py-1 bg-blue-600 text-white font-bold rounded-lg shadow-xs"
                >
                  Save Address
                </button>
              </div>
            </form>
          )}

          <div className="space-y-2">
            {(currentUser.addresses || []).map((addr: string, idx: number) => (
              <div key={idx} className="flex items-start justify-between p-2.5 rounded-xl bg-slate-50/80 border border-slate-100 text-xs">
                <div className="flex items-start gap-2">
                  <span className="font-bold text-blue-600 shrink-0">#{idx + 1}</span>
                  <span className="text-slate-700">{addr}</span>
                </div>
                <button 
                  onClick={() => handleRemoveAddr(idx)}
                  className="text-slate-400 hover:text-red-500 p-1"
                  title="Remove address"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* My Bookings */}
        <Link 
          to="/my-bookings" 
          className="bg-white rounded-2xl p-4 shadow-xs border border-slate-100 flex items-center justify-between hover:border-blue-200 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900">My Bookings</div>
              <div className="text-xs text-slate-500">Track active bookings & view invoices</div>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-slate-400" />
        </Link>

        {/* Ratings & Reviews */}
        <div className="bg-white rounded-2xl p-4 shadow-xs border border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Star className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900">Ratings & Reviews</div>
              <div className="text-xs text-slate-500">Verified feedback given to partners</div>
            </div>
          </div>
          <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">5 Reviews</span>
        </div>

        {/* Help & Support */}
        <Link 
          to="/contact" 
          className="bg-white rounded-2xl p-4 shadow-xs border border-slate-100 flex items-center justify-between hover:border-blue-200 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900">Support & FAQ</div>
              <div className="text-xs text-slate-500">24/7 dedicated customer assistance</div>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-slate-400" />
        </Link>

        {/* Partner Portal Shortcut */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-900 to-indigo-900 text-white flex items-center justify-between">
          <div>
            <div className="text-xs text-blue-200 font-medium">Looking for work?</div>
            <div className="text-sm font-bold">BuildMitra Partner Portal</div>
          </div>
          <Link 
            to="/partner/register" 
            className="text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 px-3 py-1.5 rounded-xl shadow-xs"
          >
            Enroll Now
          </Link>
        </div>

        {/* Logout Button */}
        {currentUser.isLoggedIn ? (
          <button 
            onClick={logoutUser}
            className="w-full bg-red-50 hover:bg-red-100 text-red-600 font-bold py-3 rounded-2xl flex items-center justify-center gap-2 text-sm border border-red-200 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Log Out of BuildMitra</span>
          </button>
        ) : (
          <button 
            onClick={() => setAuthModalOpen(true)}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-2xl flex items-center justify-center gap-2 text-sm shadow-md transition-colors"
          >
            <User className="w-4 h-4" />
            <span>Sign In / Register</span>
          </button>
        )}

      </div>
    </div>
  );
};
export default CustomerProfilePage;
