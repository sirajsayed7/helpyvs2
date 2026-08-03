import { useState } from 'react'
import { ArrowLeft, ArrowRight, Building2, Check, FileBadge2, UserRound } from 'lucide-react'
import { useNav } from '../context/NavContext'

type AccountType = 'business' | 'freelancer'

const OPTIONS = [
  {
    id: 'business' as const,
    title: 'Business',
    eyebrow: 'Registered company',
    description: 'For registered companies and service providers operating under a commercial registration.',
    requirement: 'A valid CR number is required',
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
              <button key={option.id} type="button" role="radio" aria-checked={isSelected} onClick={() => setSelected(option.id)} className={`relative w-full rounded-3xl border-2 p-4 text-left transition-all active:scale-[0.99] ${isSelected ? option.selectedStyle : 'border-white bg-white/95 shadow-[0_12px_32px_rgba(54,101,145,0.10)]'}`}>
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

        <div className="mt-auto pt-6">
          <button type="button" disabled={!selected} onClick={() => selected && navigate('sign-up', { accountType: selected })} className="flex h-[54px] w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 text-[15px] font-bold text-white shadow-[0_10px_24px_rgba(37,99,235,0.25)] transition active:scale-[0.99] disabled:cursor-not-allowed disabled:from-slate-300 disabled:to-slate-300 disabled:shadow-none">
            Continue <ArrowRight size={18} />
          </button>
          <p className="mt-3 text-center text-[11px] leading-4 text-slate-400">You can update your account details later from your profile.</p>
        </div>
      </div>
    </main>
  )
}
