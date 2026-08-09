import { useState } from 'react'
import { ArrowLeft, ArrowRight, Building2, Check, FileBadge2, ShieldCheck, UserRound, X } from 'lucide-react'
import { useNav } from '../context/NavContext'

type AccountType = 'business' | 'freelancer'

const OPTIONS = [
  {
    id: 'business' as const,
    title: 'Business',
    eyebrow: 'Registered company',
    description: 'For registered companies and service providers operating under a commercial registration.',
    requirement: 'CR number can be added later',
    icon: Building2,
    selectedStyle: 'border-blue-500 bg-blue-50/80 shadow-[0_12px_30px_rgba(37,99,235,0.12)]',
    iconStyle: 'bg-blue-600 text-white',
  },
  {
    id: 'freelancer' as const,
    title: 'Freelancer',
    eyebrow: 'Independent professional',
    description: 'For individuals offering professional services independently without a commercial registration.',
    requirement: 'No CR number is needed',
    icon: UserRound,
    selectedStyle: 'border-cyan-500 bg-cyan-50/80 shadow-[0_12px_30px_rgba(6,182,212,0.12)]',
    iconStyle: 'bg-cyan-500 text-white',
  },
]

export default function AccountTypePage() {
  const { goBack, navigate } = useNav()
  const [selected, setSelected] = useState<AccountType | null>(null)
  const [businessModalOpen, setBusinessModalOpen] = useState(false)
  const [crNumber, setCrNumber] = useState('')

  const chooseAccountType = (accountType: AccountType) => {
    setSelected(accountType)
    if (accountType === 'freelancer') {
      localStorage.setItem('helpy_vendor_account_type', 'freelancer')
      localStorage.removeItem('helpy_vendor_cr_number')
      navigate('sign-up', { accountType: 'freelancer' })
      return
    }
    setBusinessModalOpen(true)
  }

  const closeBusinessModal = () => {
    setBusinessModalOpen(false)
  }

  const continueAsBusiness = () => {
    const cleanedCrNumber = crNumber.trim()
    localStorage.setItem('helpy_vendor_account_type', 'business')
    if (cleanedCrNumber) localStorage.setItem('helpy_vendor_cr_number', cleanedCrNumber)
    else localStorage.removeItem('helpy_vendor_cr_number')
    navigate('sign-up', { accountType: 'business', crNumber: cleanedCrNumber })
  }

  return (
    <main className="relative h-full overflow-hidden bg-[#EBF5FF]">
      <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 430 932" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <linearGradient id="accountTop" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#B9D9FA" stopOpacity="0.74" />
            <stop offset="100%" stopColor="#DDEEFF" stopOpacity="0.30" />
          </linearGradient>
          <linearGradient id="accountWave" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#CDE4FB" stopOpacity="0.28" />
          </linearGradient>
        </defs>
        <path d="M0 0H430V55C350 75 320 125 252 168C170 219 91 229 0 205Z" fill="url(#accountTop)" />
        <path d="M430 98C352 137 326 207 249 257C166 312 75 340 0 394V536C89 466 179 448 267 387C345 333 389 260 430 233Z" fill="url(#accountWave)" />
        <path d="M0 583C79 525 169 529 248 579C327 629 380 609 430 570V739C350 788 288 758 210 712C132 666 65 677 0 727Z" fill="#D5E9FC" fillOpacity="0.34" />
        <path d="M0 824C87 861 166 862 237 835C316 804 367 808 430 839V932H0Z" fill="#FFFFFF" fillOpacity="0.38" />
      </svg>

      <div className="relative z-10 flex h-full flex-col overflow-y-auto px-5 pb-[max(24px,env(safe-area-inset-bottom))] pt-[max(16px,env(safe-area-inset-top))]">
        <div className="flex items-center justify-between">
          <button type="button" onClick={goBack} aria-label="Go back" className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/80 bg-white/70 text-slate-700 shadow-sm backdrop-blur-md transition active:scale-95">
            <ArrowLeft size={23} />
          </button>
          <div className="h-11 w-11" />
        </div>

        <div className="mt-2 flex justify-center">
          <img src="/brand/helpy-logo-transparent.png" alt="Helpy" className="h-14 w-28 object-contain" />
        </div>

        <div className="mt-10 px-1">
          <span className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-blue-600">Account setup</span>
          <h1 className="mt-2 text-[29px] font-extrabold leading-tight tracking-tight text-slate-950">How will you join Helpy?</h1>
          <p className="mt-2 max-w-[350px] text-[14px] leading-5 text-slate-500">Choose the option that best describes how you provide services.</p>
        </div>

        <div className="mt-6 space-y-3" role="radiogroup" aria-label="Account type">
          {OPTIONS.map((option) => {
            const Icon = option.icon
            const isSelected = selected === option.id
            return (
              <button key={option.id} type="button" role="radio" aria-checked={isSelected} onClick={() => chooseAccountType(option.id)} className={`relative w-full rounded-3xl border-2 p-4 text-left transition-all active:scale-[0.99] ${isSelected ? option.selectedStyle : 'border-white bg-white/95 shadow-[0_12px_32px_rgba(54,101,145,0.10)]'}`}>
                <div className="flex items-start gap-3.5">
                  <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${isSelected ? option.iconStyle : 'bg-slate-100 text-slate-600'}`}>
                    <Icon size={23} />
                  </div>
                  <div className="min-w-0 flex-1 pr-8">
                    <p className="text-[10px] font-bold uppercase tracking-[0.11em] text-slate-400">{option.eyebrow}</p>
                    <h2 className="mt-0.5 text-[17px] font-extrabold text-slate-900">{option.title}</h2>
                    <p className="mt-1.5 text-[12px] leading-[18px] text-slate-500">{option.description}</p>
                  </div>
                </div>
                <div className={`mt-3 flex items-center gap-2 rounded-2xl px-3 py-2 ${isSelected ? 'bg-white/75' : 'bg-slate-50'}`}>
                  <FileBadge2 size={15} className={option.id === 'business' ? 'text-blue-600' : 'text-cyan-600'} />
                  <span className="text-[11px] font-bold text-slate-700">{option.requirement}</span>
                </div>
                <span className={`absolute right-4 top-4 flex h-6 w-6 items-center justify-center rounded-full border-2 transition ${isSelected ? 'border-blue-600 bg-blue-600 text-white' : 'border-slate-200 bg-white text-transparent'}`}>
                  <Check size={14} strokeWidth={3} />
                </span>
              </button>
            )
          })}
        </div>

        <p className="mt-auto pt-6 text-center text-[11px] leading-4 text-slate-400">Select an account type to continue.</p>
      </div>

      {businessModalOpen && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-slate-950/35 px-5 backdrop-blur-[3px]" role="dialog" aria-modal="true" aria-labelledby="cr-dialog-title">
          <div className="w-full rounded-[28px] border border-white bg-white p-5 shadow-[0_26px_70px_rgba(15,43,75,0.28)]">
            <div className="flex items-start justify-between gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white shadow-[0_8px_20px_rgba(37,99,235,0.24)]">
                <Building2 size={23} />
              </div>
              <button type="button" onClick={closeBusinessModal} aria-label="Close" className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-500 transition active:scale-95">
                <X size={18} />
              </button>
            </div>

            <div className="mt-4">
              <p className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-blue-600">Business verification</p>
              <h2 id="cr-dialog-title" className="mt-1 text-[22px] font-extrabold tracking-tight text-slate-950">Enter your CR number</h2>
              <p className="mt-1.5 text-[13px] leading-5 text-slate-500">Provide the Commercial Registration number associated with your business.</p>
            </div>

            <label className="mt-5 block">
              <span className="mb-1.5 flex items-center gap-1.5 px-1 text-[12px] font-bold text-slate-800">
                Commercial Registration Number
                <span className="font-medium text-slate-400">(Optional for now)</span>
              </span>
              <div className="flex h-[54px] items-center rounded-2xl border border-slate-200 bg-[#F8FBFF] px-4 transition focus-within:border-sky-300 focus-within:bg-white focus-within:ring-4 focus-within:ring-sky-100/70">
                <FileBadge2 size={19} className="mr-3 shrink-0 text-blue-600" />
                <input autoFocus value={crNumber} onChange={(event) => setCrNumber(event.target.value.replace(/\D/g, ''))} onKeyDown={(event) => event.key === 'Enter' && continueAsBusiness()} inputMode="numeric" placeholder="Enter your CR number" className="min-w-0 flex-1 bg-transparent text-[14px] font-semibold text-slate-900 outline-none placeholder:font-normal placeholder:text-slate-400" />
              </div>
            </label>

            <div className="mt-4 flex items-start gap-2.5 rounded-2xl bg-blue-50 px-3.5 py-3">
              <ShieldCheck size={17} className="mt-0.5 shrink-0 text-blue-600" />
              <p className="text-[11px] leading-4 text-slate-600">This is optional for now. You can add your CR number later from your business profile.</p>
            </div>

            <div className="mt-5 grid grid-cols-[0.38fr_1fr] gap-3">
              <button type="button" onClick={closeBusinessModal} className="h-[50px] rounded-2xl border border-slate-200 bg-white text-[13px] font-bold text-slate-600 transition active:scale-[0.98]">Cancel</button>
              <button type="button" onClick={continueAsBusiness} className="flex h-[50px] items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 text-[14px] font-bold text-white shadow-[0_8px_20px_rgba(37,99,235,0.22)] transition active:scale-[0.98]">
                Continue <ArrowRight size={17} />
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
