import { useState } from 'react'
import { ArrowLeft, LockKeyhole, WalletCards } from 'lucide-react'
import { useNav } from '../context/NavContext'

type Plan = 'Monthly' | '6 Months' | '1 Year'
type PaymentMethod = 'visa' | 'amex' | 'naps' | 'google-pay'

const METHODS: { id: PaymentMethod; name: string; detail: string; mark: string; markClass: string }[] = [
  { id: 'visa', name: 'Visa / Mastercard', detail: 'Credit or debit card', mark: 'VISA', markClass: 'bg-blue-50 text-blue-700' },
  { id: 'amex', name: 'American Express', detail: 'American Express card', mark: 'AMEX', markClass: 'bg-sky-600 text-white' },
  { id: 'naps', name: 'NAPS', detail: 'Qatar debit card', mark: 'NAPS', markClass: 'border border-slate-300 bg-white text-slate-900' },
  { id: 'google-pay', name: 'Google Pay', detail: 'Fast, secure checkout', mark: 'G Pay', markClass: 'border border-slate-300 bg-white text-slate-800' },
]

export default function PlanPaymentPage() {
  const { goBack, params, setActiveTab, setSubscriptionPlan } = useNav()
  const plan = (params?.plan || 'Monthly') as Plan
  const planName = params?.name || 'Basic'
  const price = params?.price || '130 QR'
  const [method, setMethod] = useState<PaymentMethod>('visa')

  const pay = () => {
    setSubscriptionPlan(plan)
    setActiveTab('home')
  }

  return (
    <main className="relative h-full overflow-hidden bg-[#EBF5FF]">
      <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 430 932" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <linearGradient id="paymentTop" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#B9D9FA" stopOpacity="0.72" />
            <stop offset="100%" stopColor="#DDEEFF" stopOpacity="0.28" />
          </linearGradient>
          <linearGradient id="paymentWave" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.50" />
            <stop offset="100%" stopColor="#CDE4FB" stopOpacity="0.30" />
          </linearGradient>
        </defs>
        <path d="M0 0H430V42C356 65 320 116 252 160C174 211 95 225 0 196Z" fill="url(#paymentTop)" />
        <path d="M430 92C356 134 327 206 250 257C166 313 74 338 0 392V520C84 455 178 439 267 378C345 324 386 252 430 226Z" fill="url(#paymentWave)" />
        <path d="M0 494C84 436 172 448 251 498C330 548 381 526 430 487V655C352 704 287 674 210 628C132 581 66 594 0 643Z" fill="#D5E9FC" fillOpacity="0.34" />
        <path d="M0 800C91 844 163 846 235 817C315 785 366 787 430 818V932H0Z" fill="#FFFFFF" fillOpacity="0.36" />
      </svg>

      <div className="relative z-10 flex h-full flex-col overflow-y-auto px-5 pb-[max(28px,env(safe-area-inset-bottom))] pt-[max(16px,env(safe-area-inset-top))]">
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
          <h1 className="text-[29px] font-extrabold tracking-tight text-slate-950">Payment Method</h1>
          <p className="mt-1 text-[14px] text-slate-500">Select how you would like to pay for your subscription.</p>
        </div>

        <div className="mt-5 flex items-center gap-3 rounded-3xl border border-white bg-white/95 p-4 shadow-[0_12px_34px_rgba(54,101,145,0.10)] backdrop-blur-md">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
            <WalletCards size={22} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[11px] font-bold uppercase tracking-wide text-slate-400">{planName} plan</p>
            <p className="mt-0.5 text-[13px] font-semibold text-slate-700">Subscription total</p>
          </div>
          <p className="text-[23px] font-extrabold tracking-tight text-blue-600">{price}</p>
        </div>

        <p className="mb-2 mt-5 px-1 text-[12px] font-bold text-slate-800">Choose a payment method</p>
        <div className="space-y-3">
          {METHODS.map((item) => {
            const active = method === item.id
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setMethod(item.id)}
                className={`flex w-full items-center gap-3 rounded-3xl border bg-white/95 p-4 text-left shadow-[0_10px_28px_rgba(54,101,145,0.09)] backdrop-blur-md transition active:scale-[0.99] ${active ? 'border-blue-400 ring-4 ring-blue-100/70' : 'border-white'}`}
              >
                <span className={`flex h-11 w-[62px] shrink-0 items-center justify-center rounded-xl text-[12px] font-extrabold italic ${item.markClass}`}>{item.mark}</span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[13px] font-bold text-slate-900">{item.name}</span>
                  <span className="mt-0.5 block text-[10px] text-slate-400">{item.detail}</span>
                </span>
                <span className="relative block h-6 w-6 shrink-0 rounded-full border-2 bg-white" style={{ borderColor: active ? '#2563EB' : '#CBD5E1', boxSizing: 'border-box' }}>
                  {active && <span aria-hidden="true" style={{ position: 'absolute', left: '50%', top: '50%', width: 12, height: 12, borderRadius: 9999, backgroundColor: '#2563EB', transform: 'translate(-50%, -50%)' }} />}
                </span>
              </button>
            )
          })}
        </div>

        <div className="mt-auto shrink-0 pt-6">
          <div className="mb-3 flex items-center justify-center gap-1.5 text-[10px] font-medium text-slate-500">
            <LockKeyhole size={13} className="text-emerald-500" /> Secure encrypted payment
          </div>
          <button
            type="button"
            onClick={pay}
            className="h-16 min-h-16 w-full shrink-0 rounded-2xl border border-white/20 bg-gradient-to-r from-blue-600 to-cyan-500 px-6 text-[22px] font-bold leading-none text-white shadow-[0_10px_24px_rgba(37,99,235,0.25)] transition active:scale-[0.99] active:shadow-md"
            style={{ height: 64, minHeight: 64, borderRadius: 20 }}
          >
            Pay {price}
          </button>
        </div>
      </div>
    </main>
  )
}
