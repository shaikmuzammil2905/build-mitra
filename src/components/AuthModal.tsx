import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { X, ArrowRight, ShieldCheck, Mail, Phone, CheckCircle2, ChevronLeft } from 'lucide-react';

export const AuthModal: React.FC = () => {
  const { 
    authModalOpen, 
    setAuthModalOpen, 
    authStep, 
    setAuthStep, 
    tempPhone, 
    setTempPhone, 
    loginUser 
  } = useApp();

  const [mobileNumber, setMobileNumber] = useState('9876543210');
  const [emailInput, setEmailInput] = useState('');
  const [otpDigits, setOtpDigits] = useState(['1', '2', '3', '4', '5', '6']);
  const [resendTimer, setResendTimer] = useState(30);
  const [isEmailLogin, setIsEmailLogin] = useState(false);

  useEffect(() => {
    let interval: any;
    if (authStep === 'otp' && resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [authStep, resendTimer]);

  if (!authModalOpen) return null;

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mobileNumber.trim()) return;
    setTempPhone(`+91 ${mobileNumber}`);
    setResendTimer(30);
    setAuthStep('otp');
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    loginUser(tempPhone, 'Hemanth Kumar');
  };

  const handleDigitChange = (index: number, val: string) => {
    if (val.length > 1) val = val.slice(-1);
    const updated = [...otpDigits];
    updated[index] = val;
    setOtpDigits(updated);

    // Auto-focus next input
    if (val && index < 5) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      nextInput?.focus();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-sm bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200">
        
        {/* Close Button */}
        <button
          onClick={() => setAuthModalOpen(false)}
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:text-slate-900 flex items-center justify-center transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* SCREEN 1: WELCOME SCREEN (per image copy 14.png Screen 1) */}
        {authStep === 'welcome' && (
          <div className="p-6 text-center space-y-6 flex flex-col justify-between min-h-[480px]">
            <div className="pt-4 space-y-2">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-white shadow-sm border border-slate-100 p-2 flex items-center justify-center">
                <img src="/assets/logo.png" alt="BuildMitra" className="w-full h-full object-contain" />
              </div>
              <div className="font-black text-2xl tracking-tight text-bm-navy">
                BUILD<span className="text-bm-red">MITRA</span>
              </div>
              <p className="text-xs font-bold text-slate-500">
                Build • Service • Live Better
              </p>
            </div>

            <div className="relative rounded-2xl overflow-hidden shadow-md my-2 h-44 bg-slate-100 border border-slate-200">
              <img 
                src="/assets/hero-desktop.png" 
                alt="BuildMitra Living" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent"></div>
              <div className="absolute bottom-3 left-3 right-3 text-white text-xs font-bold text-left">
                India's Trusted On-Demand Home Services & Construction Platform
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <button
                onClick={() => setAuthStep('login')}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm py-3 px-4 rounded-2xl shadow-md transition-all active:scale-95"
              >
                Get Started
              </button>
              <button
                onClick={() => setAuthStep('login')}
                className="w-full text-slate-600 hover:text-blue-600 font-bold text-xs py-2 transition-colors"
              >
                Already have an account? <span className="text-blue-600 font-extrabold">Login</span>
              </button>
            </div>
          </div>
        )}

        {/* SCREEN 2: LOGIN SCREEN (per image copy 14.png Screen 2) */}
        {authStep === 'login' && (
          <div className="p-6 space-y-5">
            <button
              onClick={() => setAuthStep('welcome')}
              className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-slate-900 font-bold"
            >
              <ChevronLeft className="w-4 h-4" /> Back
            </button>

            <div className="text-center space-y-1">
              <div className="w-12 h-12 mx-auto rounded-xl bg-white shadow-xs border border-slate-100 p-1.5 flex items-center justify-center">
                <img src="/assets/logo.png" alt="BuildMitra" className="w-full h-full object-contain" />
              </div>
              <h2 className="text-xl font-black text-slate-900 mt-2">Login</h2>
              <p className="text-xs text-slate-500">
                {isEmailLogin ? 'Enter your email address to continue' : 'Enter your mobile number to continue'}
              </p>
            </div>

            {/* Mobile Form */}
            {!isEmailLogin ? (
              <form onSubmit={handleSendOtp} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Mobile Number</label>
                  <div className="flex items-center rounded-2xl border border-slate-200 bg-slate-50 p-1.5 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 transition-all">
                    <span className="flex items-center gap-1 px-3 py-1 text-xs font-bold text-slate-700 border-r border-slate-200">
                      🇮🇳 +91
                    </span>
                    <input
                      type="tel"
                      required
                      maxLength={10}
                      value={mobileNumber}
                      onChange={(e) => setMobileNumber(e.target.value)}
                      placeholder="98765 43210"
                      className="w-full px-3 py-1.5 text-xs sm:text-sm font-bold text-slate-900 bg-transparent focus:outline-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm py-3 px-4 rounded-2xl shadow-md transition-all active:scale-95"
                >
                  Send OTP
                </button>

                <div className="relative my-4 text-center">
                  <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200"></div></div>
                  <span className="relative px-3 bg-white text-[11px] font-bold text-slate-400 uppercase">OR</span>
                </div>

                <button
                  type="button"
                  onClick={() => setIsEmailLogin(true)}
                  className="w-full bg-slate-50 hover:bg-slate-100 text-slate-800 font-bold text-xs py-3 px-4 rounded-2xl border border-slate-200 transition-colors flex items-center justify-center gap-2"
                >
                  <Mail className="w-4 h-4 text-blue-600" />
                  <span>Continue with Email</span>
                </button>
              </form>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); loginUser(emailInput || 'hemanth.kumar@example.com', 'Hemanth Kumar'); }} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Email Address</label>
                  <div className="flex items-center rounded-2xl border border-slate-200 bg-slate-50 p-2 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 transition-all">
                    <Mail className="w-4 h-4 text-slate-400 ml-2" />
                    <input
                      type="email"
                      required
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                      placeholder="user@example.com"
                      className="w-full px-3 py-1 text-xs sm:text-sm font-bold text-slate-900 bg-transparent focus:outline-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm py-3 px-4 rounded-2xl shadow-md transition-all active:scale-95"
                >
                  Login with Email
                </button>

                <button
                  type="button"
                  onClick={() => setIsEmailLogin(false)}
                  className="w-full text-blue-600 font-bold text-xs text-center block pt-2"
                >
                  Use Mobile Number instead
                </button>
              </form>
            )}

            <p className="text-[10px] text-slate-400 text-center leading-relaxed">
              By continuing, you agree to our <a href="#" className="underline">Terms & Conditions</a> and <a href="#" className="underline">Privacy Policy</a>
            </p>
          </div>
        )}

        {/* SCREEN 3: VERIFY OTP SCREEN (per image copy 14.png Screen 3) */}
        {authStep === 'otp' && (
          <div className="p-6 space-y-6">
            <button
              onClick={() => setAuthStep('login')}
              className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-slate-900 font-bold"
            >
              <ChevronLeft className="w-4 h-4" /> Back
            </button>

            <div className="text-center space-y-1">
              <div className="w-12 h-12 mx-auto rounded-xl bg-white shadow-xs border border-slate-100 p-1.5 flex items-center justify-center">
                <img src="/assets/logo.png" alt="BuildMitra" className="w-full h-full object-contain" />
              </div>
              <h2 className="text-xl font-black text-slate-900 mt-2">Verify OTP</h2>
              <p className="text-xs text-slate-500">
                Enter the 6 digit code sent to <strong className="text-slate-800">{tempPhone}</strong>
              </p>
            </div>

            <form onSubmit={handleVerifyOtp} className="space-y-6">
              {/* 6 Digit Input Boxes */}
              <div className="flex justify-between gap-2 max-w-[280px] mx-auto">
                {otpDigits.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-input-${index}`}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleDigitChange(index, e.target.value)}
                    className="w-10 h-12 rounded-xl text-center text-lg font-black text-blue-700 bg-slate-50 border border-slate-200 focus:outline-none focus:border-blue-600 focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all"
                  />
                ))}
              </div>

              <div className="text-center text-xs">
                {resendTimer > 0 ? (
                  <span className="text-slate-400 font-medium">
                    Resend OTP (00:{resendTimer < 10 ? `0${resendTimer}` : resendTimer})
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={() => setResendTimer(30)}
                    className="text-blue-600 font-bold hover:underline"
                  >
                    Resend OTP Now
                  </button>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm py-3.5 px-4 rounded-2xl shadow-md transition-all active:scale-95"
              >
                Verify
              </button>
            </form>
          </div>
        )}

      </div>
    </div>
  );
};
