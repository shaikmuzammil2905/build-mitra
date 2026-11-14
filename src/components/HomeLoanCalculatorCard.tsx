import React, { useState } from 'react';
import { Landmark, ArrowRight, ShieldCheck, Percent, Calendar, DollarSign } from 'lucide-react';

interface HomeLoanCalculatorCardProps {
  onApplyLoan: (loanDetails: { amount: number; tenure: number; emi: number }) => void;
}

export const HomeLoanCalculatorCard: React.FC<HomeLoanCalculatorCardProps> = ({ onApplyLoan }) => {
  const [loanAmount, setLoanAmount] = useState<number>(5000000); // ₹50 Lakhs
  const [interestRate, setInterestRate] = useState<number>(8.5); // 8.5%
  const [tenureYears, setTenureYears] = useState<number>(20); // 20 years

  // EMI formula: E = P * r * (1 + r)^n / ((1 + r)^n - 1)
  const monthlyRate = interestRate / (12 * 100);
  const totalMonths = tenureYears * 12;
  const emi = Math.round(
    (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
    (Math.pow(1 + monthlyRate, totalMonths) - 1)
  );

  const totalPayment = emi * totalMonths;
  const totalInterest = totalPayment - loanAmount;
  const principalPercent = Math.round((loanAmount / totalPayment) * 100);
  const interestPercent = 100 - principalPercent;

  return (
    <div className="bg-gradient-to-br from-white via-blue-50/40 to-slate-50 rounded-3xl p-5 sm:p-7 border border-blue-200/80 shadow-md">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-200/80">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-xs">
            <Landmark className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                Home Loan EMI Calculator
              </h3>
              <span className="text-[10px] font-bold bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                Instant Rates
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Calculate monthly instalments & check eligibility across top banks (SBI, HDFC, ICICI)
            </p>
          </div>
        </div>

        <div className="text-left sm:text-right">
          <span className="text-[10px] font-bold text-slate-400 block uppercase">Starting from</span>
          <span className="text-base sm:text-lg font-black text-emerald-600">8.40% p.a.</span>
        </div>
      </div>

      {/* Main Grid: Inputs & Output */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-5 items-center">
        
        {/* Left Column: Sliders */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* Loan Amount */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-slate-700">Loan Amount</label>
              <span className="text-xs sm:text-sm font-black text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                ₹{(loanAmount / 100000).toFixed(1)} Lakhs
              </span>
            </div>
            <input 
              type="range"
              min={500000}
              max={20000000}
              step={100000}
              value={loanAmount}
              onChange={(e) => setLoanAmount(Number(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              <span>₹5 Lakhs</span>
              <span>₹1 Crore</span>
              <span>₹2 Crores</span>
            </div>
          </div>

          {/* Interest Rate */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-slate-700">Interest Rate (% p.a.)</label>
              <span className="text-xs sm:text-sm font-black text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                {interestRate}%
              </span>
            </div>
            <input 
              type="range"
              min={7.5}
              max={15.0}
              step={0.1}
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              <span>7.5%</span>
              <span>10.0%</span>
              <span>15.0%</span>
            </div>
          </div>

          {/* Tenure Years */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-slate-700">Tenure (Years)</label>
              <span className="text-xs sm:text-sm font-black text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                {tenureYears} Years ({totalMonths} Mos)
              </span>
            </div>
            <input 
              type="range"
              min={1}
              max={30}
              step={1}
              value={tenureYears}
              onChange={(e) => setTenureYears(Number(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              <span>1 Year</span>
              <span>15 Years</span>
              <span>30 Years</span>
            </div>
          </div>

        </div>

        {/* Right Column: Calculated Results Card */}
        <div className="lg:col-span-5 bg-gradient-to-br from-blue-900 via-slate-900 to-indigo-950 text-white rounded-2xl p-5 shadow-md flex flex-col justify-between space-y-4">
          
          <div>
            <span className="text-[11px] font-bold text-blue-300 uppercase tracking-wider block">
              Estimated Monthly EMI
            </span>
            <div className="text-2xl sm:text-3xl font-black text-amber-400 mt-1">
              ₹{emi.toLocaleString('en-IN')} <span className="text-xs font-semibold text-slate-300">/ month</span>
            </div>
          </div>

          <div className="space-y-2 pt-3 border-t border-white/10 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-300">Principal Amount:</span>
              <span className="font-bold text-white">₹{loanAmount.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-300">Total Interest Payable:</span>
              <span className="font-bold text-amber-300">₹{totalInterest.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex items-center justify-between font-black text-sm pt-1 border-t border-white/10">
              <span className="text-white">Total Amount:</span>
              <span className="text-emerald-400">₹{totalPayment.toLocaleString('en-IN')}</span>
            </div>
          </div>

          {/* Visual Breakdown Bar */}
          <div>
            <div className="h-2 w-full bg-slate-700 rounded-full overflow-hidden flex">
              <div style={{ width: `${principalPercent}%` }} className="bg-blue-500 h-full"></div>
              <div style={{ width: `${interestPercent}%` }} className="bg-amber-400 h-full"></div>
            </div>
            <div className="flex justify-between text-[10px] text-slate-300 mt-1">
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-500 inline-block"></span> Principal ({principalPercent}%)</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-400 inline-block"></span> Interest ({interestPercent}%)</span>
            </div>
          </div>

          <button
            onClick={() => onApplyLoan({ amount: loanAmount, tenure: tenureYears, emi })}
            className="w-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-black text-xs py-2.5 rounded-xl shadow-xs flex items-center justify-center gap-1.5 transition-all active:scale-95"
          >
            <span>Apply for Home Loan</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

        </div>

      </div>

    </div>
  );
};

export default HomeLoanCalculatorCard;