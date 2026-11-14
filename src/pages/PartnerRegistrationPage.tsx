import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  UploadCloud, 
  CheckCircle2, 
  ShieldCheck, 
  FileCheck, 
  Camera, 
  Building2,
  ChevronRight,
  Clock
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const PartnerRegistrationPage: React.FC = () => {
  const navigate = useNavigate();
  const { registerPartner, uploadKycDocuments } = useApp();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  
  // Step 1 fields (Screen 14)
  const [name, setName] = useState('Ramesh Kumar');
  const [phone, setPhone] = useState('+91 98450 11223');
  const [category, setCategory] = useState('Painting');
  const [experience, setExperience] = useState(8);

  // Step 2 uploads (Screen 15)
  const [aadhaarUploaded, setAadhaarUploaded] = useState(true);
  const [addressUploaded, setAddressUploaded] = useState(true);
  const [workPhotosUploaded, setWorkPhotosUploaded] = useState(true);

  const categories = [
    'Painting',
    'Construction',
    'Repairs',
    'Cleaning',
    'Plumbing',
    'Electrical',
    'Carpentry',
    'Others'
  ];

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handleStep2Submit = (e: React.FormEvent) => {
    e.preventDefault();
    registerPartner({
      name,
      phone,
      serviceCategory: category,
      experienceYears: experience
    });
    uploadKycDocuments({
      aadhaarProof: 'aadhaar_card_verified.pdf',
      addressProof: 'utility_bill_verified.pdf',
      workPhotos: ['work_site_1.jpg', 'work_site_2.jpg']
    });
    setStep(3);
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-24 max-w-md mx-auto pt-0">
      {/* Top Header */}
      <div className="bg-white border-b border-slate-100 px-4 py-3 sticky top-14 sm:top-16 z-20 flex items-center justify-between shadow-2xs">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => step > 1 && step < 3 ? setStep(step - 1 as any) : navigate(-1)} 
            className="p-1.5 rounded-full hover:bg-slate-100 text-slate-700 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-lg font-bold text-slate-900">
            {step === 3 ? 'Application Status' : 'Partner Registration'}
          </h1>
        </div>
        <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
          Step {step} of 3
        </span>
      </div>

      {/* Screen 14: Step 1 - Partner Basic Details */}
      {step === 1 && (
        <form onSubmit={handleStep1Submit} className="p-4 space-y-4">
          <div className="bg-blue-600 text-white rounded-2xl p-4 shadow-sm">
            <h2 className="text-base font-bold">Join 5,000+ Verified Service Partners</h2>
            <p className="text-xs text-blue-100 mt-1">
              Earn steady daily income with zero onboarding commission during MVP trial.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-xs space-y-3">
            <div>
              <label className="text-xs font-bold text-slate-800 block mb-1">Full Name</label>
              <input 
                type="text" 
                required 
                value={name} 
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Ramesh Kumar" 
                className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-800 block mb-1">Mobile (+91)</label>
              <input 
                type="tel" 
                required 
                value={phone} 
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98765 43210" 
                className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-800 block mb-1">Primary Service Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full text-xs p-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-800 block mb-1">Years of Experience</label>
              <input 
                type="number" 
                min={1} 
                max={40}
                required 
                value={experience} 
                onChange={(e) => setExperience(Number(e.target.value))}
                className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

          <button 
            type="submit" 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-2xl shadow-md text-sm flex items-center justify-center gap-2"
          >
            <span>Continue to KYC Upload</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </form>
      )}

      {/* Screen 15: Step 2 - KYC Document Upload */}
      {step === 2 && (
        <form onSubmit={handleStep2Submit} className="p-4 space-y-4">
          <div className="bg-amber-500 text-slate-950 rounded-2xl p-4 shadow-sm">
            <h2 className="text-sm font-black">KYC Document Upload</h2>
            <p className="text-xs text-slate-900 mt-0.5">
              Admin verifies documents to award the 'Verified Partner' badge.
            </p>
          </div>

          <div className="space-y-3">
            {/* Aadhaar */}
            <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-xs flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Aadhaar Card / Government ID</h4>
                  <p className="text-[11px] text-slate-500">Front and back scan copy</p>
                </div>
              </div>
              <button 
                type="button" 
                onClick={() => setAadhaarUploaded(!aadhaarUploaded)}
                className={`text-xs font-bold px-3 py-1.5 rounded-xl border transition-all ${
                  aadhaarUploaded 
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-300' 
                    : 'bg-slate-100 text-slate-700 border-slate-200'
                }`}
              >
                {aadhaarUploaded ? 'Uploaded ✓' : 'Upload File'}
              </button>
            </div>

            {/* Address Proof */}
            <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-xs flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <FileCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Address Proof</h4>
                  <p className="text-[11px] text-slate-500">Electricity bill, rent agreement</p>
                </div>
              </div>
              <button 
                type="button" 
                onClick={() => setAddressUploaded(!addressUploaded)}
                className={`text-xs font-bold px-3 py-1.5 rounded-xl border transition-all ${
                  addressUploaded 
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-300' 
                    : 'bg-slate-100 text-slate-700 border-slate-200'
                }`}
              >
                {addressUploaded ? 'Uploaded ✓' : 'Upload File'}
              </button>
            </div>

            {/* Work Photos */}
            <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-xs flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                  <Camera className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Past Work Site Photos</h4>
                  <p className="text-[11px] text-slate-500">2-4 photos of finished work</p>
                </div>
              </div>
              <button 
                type="button" 
                onClick={() => setWorkPhotosUploaded(!workPhotosUploaded)}
                className={`text-xs font-bold px-3 py-1.5 rounded-xl border transition-all ${
                  workPhotosUploaded 
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-300' 
                    : 'bg-slate-100 text-slate-700 border-slate-200'
                }`}
              >
                {workPhotosUploaded ? '2 Photos ✓' : 'Add Photos'}
              </button>
            </div>
          </div>

          <button 
            type="submit" 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-2xl shadow-md text-sm flex items-center justify-center gap-2"
          >
            <span>Submit Partner Application</span>
            <CheckCircle2 className="w-4 h-4" />
          </button>
        </form>
      )}

      {/* Screen 17: Step 3 - Application Submitted */}
      {step === 3 && (
        <div className="p-4 space-y-5">
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-4 border-4 border-emerald-100">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h2 className="text-lg font-bold text-slate-900">Application Submitted!</h2>
            <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
              Your partner application is under review by BuildMitra Admin. Verification completes within 24 hours.
            </p>

            <div className="mt-5 p-3.5 bg-slate-50 rounded-2xl text-left border border-slate-200 text-xs space-y-1.5">
              <div className="flex justify-between">
                <span className="text-slate-500">Partner ID:</span>
                <span className="font-bold text-blue-600">BMPT2456</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Applicant Name:</span>
                <span className="font-semibold text-slate-800">{name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Trade Category:</span>
                <span className="font-semibold text-slate-800">{category}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Status:</span>
                <span className="font-bold text-amber-600">Pending Approval</span>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-2">
              <Link 
                to="/partner/dashboard"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl text-xs shadow-xs text-center"
              >
                Go to Partner Dashboard
              </Link>

              <Link 
                to="/admin"
                className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-2.5 rounded-xl text-xs text-center"
              >
                Open Admin Approval Panel
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default PartnerRegistrationPage;
