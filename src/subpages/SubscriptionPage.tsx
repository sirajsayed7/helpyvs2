import { useState } from 'react'
import {
  ArrowLeft,
  CalendarClock,
  Check,
  CheckCircle2,
  ChevronRight,
  Crown,
  RefreshCw,
  ShieldCheck,
} from 'lucide-react'
import { useNav } from '../context/NavContext'
import { StatusBar } from '../components/shared'

type Plan = 'Monthly' | '6 Months' | '1 Year'

const PLANS: {
  name: Plan
  label: string
  subtitle: string
  accent: string
  features: string[]
}[] = [
  {
    name: 'Monthly',
    label: 'Basic',
    subtitle: 'Monthly billing · Flexible renewal',
    accent: 'bg-sky-50 text-sky-600',
    features: [
      'Full vendor dashboard access',
      'List your services',
      'Bookings and customer management',
    ],
  },
  {
    name: '6 Months',
    label: 'Growth',
    subtitle: '6-month billing · Built for growing vendors',
    accent: 'bg-violet-50 text-violet-600',
    features: [
      'Full vendor dashboard access',
      'List your services',
      'Bookings and customer management',
      '1 month in Featured Services',
    ],
  },
  {
    name: '1 Year',
    label: 'Premium',
    subtitle: 'Annual billing · Long-term membership',
    accent: 'bg-amber-50 text-amber-600',
    features: [
      'Full vendor dashboard access',
      'List your services',
      'Bookings and customer management',
      '2 months in Featured Services',
      '1 week in the homepage banner',
    ],
  },
]

const PLAN_RANK: Record<Plan, number> = { Monthly: 0, '6 Months': 1, '1 Year': 2 }
const RENEWAL: Record<Plan, string> = {
  Monthly: '15 Aug 2026',
  '6 Months': '15 Jan 2027',
  '1 Year': '15 Jul 2027',
}
const PLAN_LABEL: Record<Plan, string> = {
  Monthly: 'Basic',
  '6 Months': 'Growth',
  '1 Year': 'Premium',
}

export default function SubscriptionPage() {
  const { goBack, subscriptionPlan, setSubscriptionPlan } = useNav()
  const [notice, setNotice] = useState('')

  const choosePlan = (plan: Plan) => {
    const direction = PLAN_RANK[plan] > PLAN_RANK[subscriptionPlan] ? 'upgraded' : 'changed'
    setSubscriptionPlan(plan)
    setNotice(`Your subscription has been ${direction} to the ${PLAN_LABEL[plan]} plan.`)
  }

  return (
    <div className="flex flex-1 flex-col overflow-y-auto bg-[#F4F6FF]">
      <StatusBar />
      <div className="flex items-center gap-3 px-4 pt-2 pb-3">
        <button onClick={goBack} className="flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-sm">
          <ArrowLeft size={20} className="text-gray-600" />
        </button>
        <div>
          <h1 className="text-[18px] font-bold text-gray-900">Subscription</h1>
          <p className="text-[11px] text-gray-400">Manage your Helpy membership</p>
        </div>
      </div>

      <div className="flex-1 space-y-4 overflow-visible px-4 pb-8">
        {notice && (
          <div className="flex items-start gap-3 rounded-2xl bg-emerald-50 p-4">
            <CheckCircle2 size={19} className="mt-0.5 shrink-0 text-emerald-500" />
            <div className="flex-1">
              <p className="text-[12px] font-bold text-emerald-800">Plan updated</p>
              <p className="mt-0.5 text-[11px] text-emerald-600">{notice}</p>
            </div>
            <button onClick={() => setNotice('')} className="text-[11px] font-bold text-emerald-700">
              Close
            </button>
          </div>
        )}

        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-blue-950 to-brand-600 p-5 text-white shadow-sm">
          <div className="absolute -right-10 -top-12 h-32 w-32 rounded-full bg-white/10" />
          <div className="relative">
            <div className="flex items-start justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15">
                <Crown size={23} />
              </div>
              <span className="rounded-full bg-emerald-400/20 px-3 py-1 text-[10px] font-bold text-emerald-200">ACTIVE</span>
            </div>
            <p className="mt-4 text-[22px] font-bold">{PLAN_LABEL[subscriptionPlan]} plan</p>
            <p className="mt-1 text-[11px] text-white/65">
              {subscriptionPlan} billing · Your subscription renews automatically.
            </p>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <div className="rounded-2xl bg-white/10 p-3">
                <p className="text-[9px] text-white/55">Date joined</p>
                <p className="mt-1 text-[12px] font-bold">15 Jan 2024</p>
              </div>
              <div className="rounded-2xl bg-white/10 p-3">
                <p className="text-[9px] text-white/55">Next renewal</p>
                <p className="mt-1 text-[12px] font-bold">{RENEWAL[subscriptionPlan]}</p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="mb-3 px-0.5">
            <p className="text-[15px] font-bold text-gray-900">Choose your plan</p>
            <p className="mt-0.5 text-[11px] text-gray-400">Changes are reflected immediately in this prototype</p>
          </div>
          <div className="space-y-3">
            {PLANS.map((plan) => {
              const current = plan.name === subscriptionPlan
              const upgrade = PLAN_RANK[plan.name] > PLAN_RANK[subscriptionPlan]

              return (
                <div
                  key={plan.name}
                  className={`rounded-3xl border bg-white p-4 shadow-sm ${current ? 'border-brand-300' : 'border-gray-100'}`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${plan.accent}`}>
                      <CalendarClock size={19} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <p className="text-[14px] font-bold text-gray-900">{plan.label}</p>
                        {current && (
                          <span className="rounded-full bg-brand-50 px-2 py-0.5 text-[9px] font-bold text-brand-600">
                            CURRENT
                          </span>
                        )}
                      </div>
                      <p className="mt-0.5 text-[11px] text-gray-400">{plan.subtitle}</p>
                    </div>
                  </div>

                  <div className="mt-3 space-y-1.5 rounded-2xl bg-gray-50 p-3">
                    {plan.features.map((item) => (
                      <div key={item} className="flex items-center gap-2">
                        <Check size={12} className="shrink-0 text-emerald-500" />
                        <p className="text-[10px] text-gray-600">{item}</p>
                      </div>
                    ))}
                  </div>

                  {current ? (
                    <div className="mt-3 flex items-center justify-center gap-2 rounded-2xl bg-gray-100 py-3 text-[12px] font-bold text-gray-500">
                      <ShieldCheck size={15} />
                      Current active plan
                    </div>
                  ) : (
                    <button
                      onClick={() => choosePlan(plan.name)}
                      className={`mt-3 flex w-full items-center justify-center gap-2 rounded-2xl py-3 text-[12px] font-bold ${upgrade ? 'bg-brand-500 text-white' : 'border border-gray-200 bg-white text-gray-700'}`}
                    >
                      {upgrade ? 'Upgrade' : 'Downgrade'} to {plan.label}
                      <ChevronRight size={14} />
                    </button>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        <div className="flex items-start gap-3 rounded-2xl bg-blue-50 p-4">
          <RefreshCw size={17} className="mt-0.5 shrink-0 text-brand-500" />
          <div>
            <p className="text-[12px] font-bold text-gray-800">Automatic renewal</p>
            <p className="mt-0.5 text-[11px] leading-relaxed text-gray-500">
              Your selected plan renews automatically on the renewal date. Plan changes update the next billing cycle shown above.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
