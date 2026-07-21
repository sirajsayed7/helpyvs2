import { useState } from 'react'
import { ArrowLeft, Check, Crown, Sparkles, Zap } from 'lucide-react'
import { useNav } from '../context/NavContext'

type Plan = 'Monthly' | '6 Months' | '1 Year'

const PLANS: {
  value: Plan
  name: string
  period: string
  price: string
  description: string
  features: string[]
  icon: typeof Zap
  accent: string
}[] = [
  {
    value: 'Monthly',
    name: 'Basic',
    period: 'Monthly plan',
    price: '130 QR',
    description: 'A flexible start for independent vendors.',
    features: [
      'Full vendor dashboard access',
      'List your services',
      'Bookings and customer management',
    ],
    icon: Zap,
    accent: 'bg-sky-50 text-sky-600',
  },
  {
    value: '6 Months',
    name: 'Growth',
    period: '6-month plan',
    price: '650 QR',
    description: 'More visibility for growing businesses.',
    features: [
      'Full vendor dashboard access',
      'List your services',
      'Bookings and customer management',
      '1 month in Featured Services',
    ],
    icon: Sparkles,
    accent: 'bg-violet-50 text-violet-600',
  },
  {
    value: '1 Year',
    name: 'Premium',
    period: 'Annual plan',
    price: '1,299 QR',
    description: 'Maximum reach and long-term value.',
    features: [
      'Full vendor dashboard access',
      'List your services',
      'Bookings and customer management',
      '2 months in Featured Services',
      '1 week in the homepage banner',
    ],
    icon: Crown,
    accent: 'bg-amber-50 text-amber-600',
  },
]

export default function ChoosePlanPage() {
  const { goBack, navigate, setActiveTab, subscriptionPlan } = useNav()
  const [selected, setSelected] = useState<Plan>(subscriptionPlan)

  const subscribe = () => {
    const plan = PLANS.find((item) => item.value === selected)
    navigate('plan-payment', { plan: selected, name: plan?.name, price: plan?.price })
  }

  return (
    <main className="relative h-full overflow-hidden bg-[#EBF5FF]">
      <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 430 932" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <linearGradient id="planTop" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#B9D9FA" stopOpacity="0.72" />
            <stop offset="100%" stopColor="#DDEEFF" stopOpacity="0.28" />
          </linearGradient>
          <linearGradient id="planWave" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.50" />
            <stop offset="100%" stopColor="#CDE4FB" stopOpacity="0.30" />
          </linearGradient>
        </defs>
        <path d="M0 0H430V42C356 65 320 116 252 160C174 211 95 225 0 196Z" fill="url(#planTop)" />
        <path d="M430 92C356 134 327 206 250 257C166 313 74 338 0 392V520C84 455 178 439 267 378C345 324 386 252 430 226Z" fill="url(#planWave)" />
        <path d="M0 494C84 436 172 448 251 498C330 548 381 526 430 487V655C352 704 287 674 210 628C132 581 66 594 0 643Z" fill="#D5E9FC" fillOpacity="0.34" />
        <path d="M0 800C91 844 163 846 235 817C315 785 366 787 430 818V932H0Z" fill="#FFFFFF" fillOpacity="0.36" />
      </svg>

      <div className="relative z-10 h-full overflow-y-auto px-5 pb-[max(28px,env(safe-area-inset-bottom))] pt-[max(16px,env(safe-area-inset-top))]">
        <div className="flex items-center justify-between">
          <button type="button" onClick={goBack} aria-label="Go back" className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/80 bg-white/70 text-slate-700 shadow-sm backdrop-blur-md transition active:scale-95">
            <ArrowLeft size={23} />
          </button>
          <div className="h-11 w-11" />
        </div>

        <div className="mt-2 flex justify-center">
          <img src="/brand/helpy-logo-transparent.png" alt="Helpy" className="h-14 w-28 object-contain" />
        </div>

        <div className="mt-8 px-1">
          <h1 className="text-[29px] font-extrabold tracking-tight text-slate-950">Subscription Plans</h1>
          <p className="mt-1 text-[14px] leading-5 text-slate-500">Choose the plan that fits your business. You can change it later from your profile.</p>
        </div>

        <div className="mt-5 space-y-3">
          {PLANS.map((plan) => {
            const active = selected === plan.value
            const Icon = plan.icon
            return (
              <button
                type="button"
                key={plan.value}
                onClick={() => setSelected(plan.value)}
                className={`w-full rounded-3xl border bg-white/95 px-4 pb-2 pt-4 text-left shadow-[0_12px_34px_rgba(54,101,145,0.10)] backdrop-blur-md transition active:scale-[0.99] ${active ? 'border-blue-400 ring-4 ring-blue-100/70' : 'border-white'}`}
              >
                <div className="flex items-start gap-3">
                  <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${plan.accent}`}>
                    <Icon size={20} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <h2 className="text-[16px] font-extrabold text-slate-900">{plan.name}</h2>
                      <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[9px] font-bold text-slate-500">{plan.period}</span>
                    </div>
                    <p className="mt-0.5 text-[11px] text-slate-500">{plan.description}</p>
                  </div>
                  <span
                    className="relative block h-6 w-6 shrink-0 rounded-full border-2 bg-white"
                    style={{ borderColor: active ? '#2563EB' : '#CBD5E1', boxSizing: 'border-box' }}
                  >
                    {active && (
                      <span
                        aria-hidden="true"
                        style={{ position: 'absolute', left: '50%', top: '50%', width: 12, height: 12, borderRadius: 9999, backgroundColor: '#2563EB', transform: 'translate(-50%, -50%)' }}
                      />
                    )}
                  </span>
                </div>

                <div className="mt-3 space-y-1.5 rounded-2xl bg-slate-50/90 p-3">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-2">
                      <Check size={13} className="mt-0.5 shrink-0 text-emerald-500" strokeWidth={2.5} />
                      <span className="text-[10px] leading-4 text-slate-600">{feature}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-1 w-full pr-3 text-right leading-none">
                  <span className="text-[22px] font-extrabold leading-none tracking-tight text-blue-600">{plan.price}</span>
                </div>
              </button>
            )
          })}
        </div>

        <button type="button" onClick={subscribe} className="mt-5 h-[52px] w-full rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 text-[16px] font-bold text-white shadow-[0_10px_24px_rgba(37,99,235,0.25)] transition active:scale-[0.99]">
          Subscribe to {PLANS.find((plan) => plan.value === selected)?.name}
        </button>
        <button type="button" onClick={() => setActiveTab('home')} className="mt-2 h-11 w-full rounded-2xl text-[13px] font-bold text-blue-600 transition active:bg-white/50">
          Skip for now
        </button>
      </div>
    </main>
  )
}
