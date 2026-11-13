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
  HelpCircle,
  ChevronDown,
  ChevronUp,
  FileText,
  Landmark,
  Calculator,
  Award
} from 'lucide-react';

interface HomeLoansPageProps {
  onOpenEnquiry: (topic?: string) => void;
}

export const HomeLoansPage: React.FC<HomeLoansPageProps> = ({ onOpenEnquiry }) => {
  const [loanAmount, setLoanAmount] = useState<number>(5000000); // 50 Lakhs
  const [interestRate, setInterestRate] = useState<number>(8.5); // 8.5%
  const [tenureYears, setTenureYears] = useState<number>(20); // 20 years
  const [openFaq, setOpenFaq] = useState<number | null>(0);

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

  const bankRates = [
    { bank: 'State Bank of India (SBI)', roi: '8.40% – 8.75%', maxLtv: 'Up to 90%', procFee: '0.35% (Max ₹10k)', womenDiscount: '0.05% Concession' },
    { bank: 'HDFC Bank', roi: '8.45% – 8.85%', maxLtv: 'Up to 85%', procFee: '0.50% (Max ₹15k)', womenDiscount: '0.05% Concession' },
    { bank: 'ICICI Bank', roi: '8.50% – 8.90%', maxLtv: 'Up to 85%', procFee: '0.50% (Max ₹12k)', womenDiscount: 'Special Health Cover' },
    { bank: 'Bank of Baroda (BoB)', roi: '8.40% – 8.70%', maxLtv: 'Up to 90%', procFee: 'Zero for < 50L', womenDiscount: '0.05% Concession' },
    { bank: 'Canara Bank', roi: '8.45% – 8.80%', maxLtv: 'Up to 85%', procFee: '0.25% (Max ₹8k)', womenDiscount: 'Low Processing' },
    { bank: 'Axis Bank', roi: '8.55% – 9.00%', maxLtv: 'Up to 80%', procFee: '0.50% (Max ₹15k)', womenDiscount: '12 EMI Waiver Option' }
  ];

  const docChecklist = [
    { cat: 'KYC & Income', items: 'PAN, Aadhaar, 3 Years ITR with Computation, 6 Months Bank Statement, Salary Slips or Form 16.' },
    { cat: 'Property & Title', items: 'Registered Sale Deed, Mother Deed (30 Yrs), Nil Encumbrance Certificate (Form 15), Latest RTC/Pahani.' },
    { cat: 'Technical & Civil', items: 'Approved Building Sanction Plan from BBMP/BDA/Panchayat, Architect Detailed Cost Estimate, Foundation Layout.' },
    { cat: 'Revenue Clearances', items: 'Up-to-date Property Tax Paid Receipts, Khata Certificate & Extract, DC Conversion Order (if applicable).' }
  ];

  const faqs = [
    {
      q: 'How does a self-construction loan differ from a regular home purchase loan?',
      a: 'Unlike ready-to-move apartment loans where funds are disbursed in a single lump sum, self-construction loans disburse money in tranches tied to on-site physical progress (e.g. foundation, slab casting, plastering) verified by a bank-empanelled engineer.'
    },
    {
      q: 'Can BuildMitra provide the required Detailed Engineer Cost Estimate for the bank?',
      a: 'Yes. Our chartered civil engineers prepare the bank-format detailed cost estimate, IS code structural drawings, and BOQ necessary for swift loan appraisal across all leading banks.'
    },
    {
      q: 'Is pre-EMI interest charged during construction?',
      a: 'Yes. During construction, borrowers typically pay pre-EMI (interest only on the actual amount disbursed to date). Full EMI repayment begins once the final handover disbursement occurs.'
    },
    {
      q: 'What is the maximum Loan-to-Value (LTV) ratio permitted by RBI?',
      a: 'For loans up to ₹ 30 Lakhs, LTV can be up to 90%. For loans between ₹ 30 Lakhs and ₹ 75 Lakhs, LTV is up to 80%. For loans exceeding ₹ 75 Lakhs, maximum LTV is 75% of the total project cost.'
    }
  ];

  return (
    <div className="pt-24 pb-20 bg-slate-50 min-h-screen">
      
      {/* DESKTOP ONLY Page Header */}
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-2 md:-mt-6 relative z-20 space-y-12">
        
        {/* SECTION 1: INTERACTIVE CONSTRUCTION LOAN EMI CALCULATOR */}
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
            
            <div className="lg:col-span-7 space-y-6">
              
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold text-slate-700">
                  <span>Required Loan Amount</span>
                  <span className="font-mono text-base text-purple-600">
                    ₹ {(loanAmount / 100000).toFixed(1)} Lakhs
                  </span>
                </div>
                <input
                  type="range"
                  min={500000}
                  max={25000000}
                  step={100000}
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  className="w-full accent-purple-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-slate-400 font-mono">
                  <span>₹ 5 Lakhs</span>
                  <span>₹ 1.25 Crore</span>
                  <span>₹ 2.50 Crore</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold text-slate-700">
                  <span>Annual Interest Rate (%)</span>
                  <span className="font-mono text-base text-purple-600">{interestRate}% p.a.</span>
                </div>
                <input
                  type="range"
                  min={7.5}
                  max={14.0}
                  step={0.1}
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full accent-purple-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-slate-400 font-mono">
                  <span>7.5% (Prime PSU)</span>
                  <span>10.5% (Private Bank)</span>
                  <span>14.0% (NBFC)</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold text-slate-700">
                  <span>Tenure Duration</span>
                  <span className="font-mono text-base text-purple-600">{tenureYears} Years</span>
                </div>
                <input
                  type="range"
                  min={5}
                  max={30}
                  step={1}
                  value={tenureYears}
                  onChange={(e) => setTenureYears(Number(e.target.value))}
                  className="w-full accent-purple-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-slate-400 font-mono">
                  <span>5 Years</span>
                  <span>15 Years</span>
                  <span>30 Years</span>
                </div>
              </div>

            </div>

            <div className="lg:col-span-5 bg-gradient-to-br from-purple-900 via-bm-navy to-slate-900 text-white rounded-3xl p-6 sm:p-7 space-y-6 shadow-xl border border-purple-800">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-purple-300">
                  Estimated Monthly EMI
                </span>
                <div className="text-3xl sm:text-4xl font-black text-white mt-1">
                  ₹ {emi.toLocaleString('en-IN')} <span className="text-sm font-normal text-slate-300">/ mo</span>
                </div>
              </div>

              <div className="space-y-3 pt-3 border-t border-white/10 text-xs">
                <div className="flex justify-between text-slate-300">
                  <span>Principal Borrowed:</span>
                  <span className="font-mono font-bold text-white">₹ {loanAmount.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Total Interest Payable:</span>
                  <span className="font-mono font-bold text-amber-400">₹ {totalInterest.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-slate-300 pt-2 border-t border-white/10">
                  <span>Total Amount Payable:</span>
                  <span className="font-mono font-extrabold text-white">₹ {totalPayment.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <button
                onClick={() => onOpenEnquiry(`Home Loan Pre-Approval for ₹${(loanAmount/100000).toFixed(1)} Lakhs at ${interestRate}%`)}
                className="w-full bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs py-3 px-4 rounded-xl shadow-md transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                <span>Apply for Instant Loan Pre-Approval</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

        {/* SECTION 2: CONSTRUCTION STAGE DISBURSEMENT PLANNER */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/90 space-y-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider mb-2">
              <Calendar className="w-3.5 h-3.5" />
              <span>RBI Regulated Tranche Releases</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900">
              Stage-Wise Construction Loan Disbursement Schedule
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Banks disburse funds incrementally as your building foundation, RCC framing, and finishes advance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {stages.map((stg, idx) => (
              <div key={idx} className="bg-slate-50 p-5 rounded-2xl border border-slate-200/80 space-y-2 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono font-bold text-purple-600">Tranche 0{idx+1}</span>
                    <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">{stg.percent}% of Loan</span>
                  </div>
                  <h4 className="text-sm font-extrabold text-slate-900 mt-2">{stg.stage}</h4>
                </div>
                <div className="pt-3 border-t border-slate-200">
                  <div className="text-xs text-slate-500">Disbursement Value</div>
                  <div className="text-lg font-black text-slate-900">₹ {stg.amount.toLocaleString('en-IN')}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 3: LEADING BANK INTEREST RATE & LTV COMPARISON TABLE */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/90 space-y-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-2">
              <Landmark className="w-3.5 h-3.5" />
              <span>Multi-Bank Comparison</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900">
              Leading Bank Home Loan Interest Rate Matrix (2024–2026)
            </h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-800 font-extrabold border-b border-slate-200">
                  <th className="p-3.5 rounded-l-xl">Lending Institution</th>
                  <th className="p-3.5">Interest Rate (p.a.)</th>
                  <th className="p-3.5">Max LTV Ratio</th>
                  <th className="p-3.5">Processing Charges</th>
                  <th className="p-3.5 rounded-r-xl">Special Benefits</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {bankRates.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-3.5 font-bold text-slate-900">{row.bank}</td>
                    <td className="p-3.5 font-mono text-purple-700 font-bold">{row.roi}</td>
                    <td className="p-3.5 font-mono text-slate-700">{row.maxLtv}</td>
                    <td className="p-3.5 text-slate-600">{row.procFee}</td>
                    <td className="p-3.5 text-emerald-700 font-semibold">{row.womenDiscount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* SECTION 4: DOCUMENT CHECKLIST */}
        <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="max-w-2xl space-y-2">
            <div className="text-xs font-bold text-purple-400 uppercase tracking-wider">
              Verification Dossier
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              Self-Construction Loan Document Checklist
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {docChecklist.map((item, idx) => (
              <div key={idx} className="bg-white/5 p-5 rounded-2xl border border-white/10 space-y-2">
                <div className="text-sm font-extrabold text-amber-400">{item.cat}</div>
                <p className="text-xs text-slate-300 leading-relaxed">{item.items}</p>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 5: AFFILIATE PARTNER PORTAL */}
        <div className="bg-gradient-to-r from-bm-navy via-slate-900 to-purple-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold uppercase tracking-wider">
              <UserPlus className="w-3.5 h-3.5 text-amber-400" />
              <span>BuildMitra Channel Partner Network</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              Register as an Authorized Loan Referral Affiliate
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
              Civil engineers, architects, real estate agents, and contractors: earn 0.40% to 0.75% commission on every sanctioned construction and home loan referral with automated tracking.
            </p>
          </div>
          <button
            onClick={() => onOpenEnquiry('Affiliate Channel Partner Registration Inquiry')}
            className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs sm:text-sm py-3.5 px-6 rounded-xl shadow-md transition-all active:scale-95 shrink-0"
          >
            Become an Affiliate Partner
          </button>
        </div>

        {/* SECTION 6: HOME LOANS FAQ ACCORDION */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/90 space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold uppercase tracking-wider">
              <HelpCircle className="w-3.5 h-3.5 text-purple-600" />
              <span>Banking Insights</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900">
              Construction Financing FAQs
            </h3>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div key={index} className="rounded-2xl border border-slate-200 overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-extrabold text-xs sm:text-sm text-slate-900 hover:text-purple-600 transition-colors"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? <ChevronUp className="w-4 h-4 text-purple-600 shrink-0" /> : <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />}
                  </button>
                  {isOpen && (
                    <div className="px-4 sm:px-5 pb-5 text-xs text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};
