import React, { useState } from 'react';
import { 
  Building, 
  Percent, 
  Calendar, 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2, 
  UserPlus, 
  TrendingUp, 
  Sparkles,
  HelpCircle
} from 'lucide-react';

interface HomeLoansPageProps {
  onOpenEnquiry: (topic?: string) => void;
}

export const HomeLoansPage: React.FC<HomeLoansPageProps> = ({ onOpenEnquiry }) => {
  const [loanAmount, setLoanAmount] = useState<number>(5000000); // 50 Lakhs
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

  // Construction Stage Disbursement Planner
  const stages = [
    { stage: 'Stage 1: Foundation & Basement PCC', percent: 15, amount: Math.round(loanAmount * 0.15) },
    { stage: 'Stage 2: Plinth Beam & Damp Proof Course', percent: 10, amount: Math.round(loanAmount * 0.10) },
    { stage: 'Stage 3: RCC Roof Slabs & Columns', percent: 25, amount: Math.round(loanAmount * 0.25) },
    { stage: 'Stage 4: Brick Masonry & Internal Plaster', percent: 20, amount: Math.round(loanAmount * 0.20) },
    { stage: 'Stage 5: Flooring, Plumbing & Electrical', percent: 20, amount: Math.round(loanAmount * 0.20) },
    { stage: 'Stage 6: Final Painting & Occupancy Handover', percent: 10, amount: Math.round(loanAmount * 0.10) },
  ];

  return (
    <div className="pt-24 pb-20 bg-slate-50 min-h-screen">
      
      {/* Page Header */}
      <div className="hidden md:block bg-bm-navy text-white py-14 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Module 08 • Banking & Financial Architecture</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              Home Loan & Affiliate Partner Portal
            </h1>
            <p className="text-base text-slate-300 leading-relaxed">
              Plan self-construction loans, calculate stage-wise milestone disbursements, compare competitive interest rates across leading banks (SBI, HDFC, ICICI), and register as an authorized referral partner.
            </p>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-2 md:-mt-6 relative z-20 space-y-8">
        
        {/* Interactive Construction Loan EMI Calculator */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-lg border border-slate-200/90 space-y-8">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-purple-600">
                Interactive Financial Tool
              </span>
              <h2 className="text-2xl font-extrabold text-bm-navy mt-0.5">
                Construction & Home Loan EMI Optimizer
              </h2>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-bold bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
              <CheckCircle2 className="w-4 h-4" />
              <span>Lowest ROI starting at 8.40% p.a.</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Sliders Form */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Loan Amount Slider */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                  <span>Loan Amount</span>
                  <span className="font-mono text-base font-extrabold text-blue-700">
                    ₹ {loanAmount.toLocaleString('en-IN')}
                  </span>
                </div>
                <input
                  type="range"
                  min={500000}
                  max={20000000}
                  step={100000}
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  className="w-full accent-blue-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
                />
                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>₹ 5 Lakhs</span>
                  <span>₹ 1 Crore</span>
                  <span>₹ 2 Crores</span>
                </div>
              </div>

              {/* Interest Rate Slider */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                  <span>Annual Interest Rate (% p.a.)</span>
                  <span className="font-mono text-base font-extrabold text-purple-700">
                    {interestRate}%
                  </span>
                </div>
                <input
                  type="range"
                  min={7.5}
                  max={14.0}
                  step={0.1}
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full accent-purple-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
                />
                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>7.5%</span>
                  <span>10.0%</span>
                  <span>14.0%</span>
                </div>
              </div>

              {/* Tenure Slider */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                  <span>Loan Tenure</span>
                  <span className="font-mono text-base font-extrabold text-amber-700">
                    {tenureYears} Years ({totalMonths} Months)
                  </span>
                </div>
                <input
                  type="range"
                  min={5}
                  max={30}
                  step={1}
                  value={tenureYears}
                  onChange={(e) => setTenureYears(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer h-2 bg-slate-200 rounded-lg"
                />
                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>5 Years</span>
                  <span>15 Years</span>
                  <span>30 Years</span>
                </div>
              </div>

            </div>

            {/* Results Output Box */}
            <div className="lg:col-span-5 bg-gradient-to-br from-bm-navy via-slate-900 to-purple-950 text-white p-6 sm:p-7 rounded-3xl shadow-xl space-y-5 border border-slate-800">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-purple-300">
                  Monthly Repayment
                </span>
                <div className="text-3xl sm:text-4xl font-black text-amber-400 tracking-tight mt-1">
                  ₹ {emi.toLocaleString('en-IN')}
                </div>
                <div className="text-xs text-slate-400 mt-0.5">per month</div>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-800 text-xs">
                <div className="flex justify-between text-slate-300">
                  <span>Principal Amount:</span>
                  <span className="font-mono font-bold text-white">₹ {loanAmount.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Total Interest Payable:</span>
                  <span className="font-mono font-bold text-purple-300">₹ {totalInterest.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-sm font-extrabold text-white pt-2 border-t border-slate-800">
                  <span>Total Landed Repayment:</span>
                  <span className="font-mono text-emerald-400">₹ {totalPayment.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <button
                onClick={() => onOpenEnquiry(`Apply for ₹${loanAmount / 100000} Lakhs Construction Loan`)}
                className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold text-xs py-3 rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
              >
                <span>Check Bank Loan Eligibility</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

        {/* Construction Loan Stage-Wise Disbursement Planner */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/90 space-y-6">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
              Stage Disbursement Planner
            </span>
            <h3 className="text-xl font-extrabold text-bm-navy">
              Milestone Construction Fund Releases
            </h3>
            <p className="text-xs text-slate-500">
              Unlike normal ready-home loans, construction loans disburse in tranches as your engineer submits stage completion certificates.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {stages.map((st, i) => (
              <div key={i} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded">
                    {st.percent}% Tranche
                  </span>
                  <span className="text-slate-500 font-mono font-bold">
                    ₹ {st.amount.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="text-xs font-bold text-slate-900 leading-snug">
                  {st.stage}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Affiliate Partner Registration Banner */}
        <div className="bg-gradient-to-br from-emerald-900 via-slate-900 to-bm-navy text-white rounded-3xl p-8 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 border border-emerald-800">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Earn Up to 1.5% Direct Referral Commission</span>
            </div>
            <h3 className="text-2xl font-extrabold text-white">
              Join the BuildMitra Channel Partner Network
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Are you an architect, civil engineer, contractor, or real estate consultant? Refer materials procurement, home loans, or turnkey construction to earn monthly commissions with real-time payout tracking.
            </p>
          </div>

          <button
            onClick={() => onOpenEnquiry('Affiliate Partner Registration')}
            className="w-full md:w-auto bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs py-3.5 px-6 rounded-xl shadow-lg transition-all shrink-0 flex items-center justify-center gap-2"
          >
            <UserPlus className="w-4 h-4" />
            <span>Register as Channel Partner</span>
          </button>
        </div>

      </div>
    </div>
  );
};

