import { ArrowLeft, CalendarDays, CheckCircle2, CreditCard, Megaphone, PartyPopper, ShieldCheck, Sparkles } from 'lucide-react'
import { StatusBar } from '../components/shared'
import { useNav } from '../context/NavContext'

const PROMO_RATE_PER_DAY = 19

const daysFromDuration = (duration: string) => Number(duration.split(' ')[0]) || 0

const DEFAULT_OFFER = {
  promotionKind: 'service',
  title: 'Summer Cleaning Deal',
  description: 'Get a professional cleaning package at a limited-time promoted price.',
  target: 'General Cleaning',
  duration: '7 days',
  dealLabel: '20% OFF',
  promoFee: '133',
}

export default function OfferPaymentPage() {
  const { goBack, navigate, params } = useNav()
  const offer = { ...DEFAULT_OFFER, ...(params || {}) }
  const isEvent = offer.promotionKind === 'event'
  const durationDays = daysFromDuration(offer.duration)

  return (
    <div className="flex flex-col flex-1 bg-[#F4F6FF] overflow-hidden">
      <StatusBar />
      <div className="flex items-center gap-3 px-4 pt-2 pb-3">
        <button onClick={goBack} className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center">
          <ArrowLeft size={20} className="text-gray-600" />
        </button>
        <div>
          <h1 className="text-[18px] font-bold text-gray-900">Review & Pay</h1>
          <p className="text-[11px] text-gray-400">Confirm promotion details</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-6 space-y-4">
        <div className="bg-white rounded-3xl shadow-sm p-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-brand-50 flex items-center justify-center">
              {isEvent ? <PartyPopper size={22} className="text-brand-500" /> : <Megaphone size={22} className="text-brand-500" />}
            </div>
            <div>
              <p className="text-[15px] font-bold text-gray-900">{offer.title}</p>
              <p className="text-[11px] text-gray-400">{isEvent ? 'Event promotion' : 'Service offer'} · {offer.target}</p>
            </div>
          </div>

          <div className="rounded-3xl border border-gray-100 bg-gradient-to-br from-amber-50 to-white p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-100 flex items-center justify-center">
                  {isEvent ? <PartyPopper size={18} className="text-amber-500" /> : <Sparkles size={18} className="text-amber-500" />}
                </div>
                <div>
                  <p className="text-[13px] font-bold text-gray-900">Customer app preview</p>
                  <p className="text-[11px] text-gray-500 mt-0.5">{offer.target}</p>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-600 text-[10px] font-bold">{offer.dealLabel}</span>
            </div>
            <p className="text-[12px] text-gray-500 leading-relaxed mt-3">{offer.description}</p>
            <div className="flex items-center gap-1.5 text-[11px] font-semibold text-gray-500 mt-4 pt-3 border-t border-amber-100">
              <CalendarDays size={13} />
              Runs for {offer.duration}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-sm p-4">
          <p className="text-[15px] font-bold text-gray-900">Payment summary</p>
          <div className="space-y-3 mt-4">
            <div className="flex items-center justify-between">
              <span className="text-[12px] text-gray-500">Promotion fee</span>
              <span className="text-[13px] font-bold text-gray-900">{offer.promoFee} QR</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[12px] text-gray-500">Rate</span>
              <span className="text-[13px] font-bold text-gray-900">{PROMO_RATE_PER_DAY} QR/day</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[12px] text-gray-500">Duration</span>
              <span className="text-[13px] font-bold text-gray-900">{durationDays} days</span>
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
              <span className="text-[13px] font-bold text-gray-900">Total</span>
              <span className="text-[18px] font-bold text-brand-500">{offer.promoFee} QR</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-sm p-4">
          <p className="text-[15px] font-bold text-gray-900">Payment method</p>
          <button className="w-full mt-3 rounded-2xl border border-brand-200 bg-brand-50 px-4 py-3 flex items-center gap-3 text-left">
            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center">
              <CreditCard size={18} className="text-brand-500" />
            </div>
            <div className="flex-1">
              <p className="text-[13px] font-bold text-gray-900">Visa ending 4242</p>
              <p className="text-[11px] text-gray-400">Default payment method</p>
            </div>
            <CheckCircle2 size={18} className="text-brand-500" />
          </button>
          <div className="mt-3 flex items-center gap-2 rounded-2xl bg-green-50 px-3 py-2">
            <ShieldCheck size={15} className="text-green-500" />
            <p className="text-[11px] text-green-600 font-semibold">Secure payment. Promotion starts after confirmation.</p>
          </div>
        </div>

        <button
          onClick={() => navigate('offer-success', offer)}
          className="w-full bg-brand-500 text-white rounded-2xl py-4 shadow-sm flex items-center justify-center gap-2 active:scale-[0.98] transition-transform"
        >
          <CreditCard size={18} />
          <span className="text-[14px] font-bold">Pay {offer.promoFee} QR</span>
        </button>
      </div>
    </div>
  )
}
