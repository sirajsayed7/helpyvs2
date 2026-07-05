import { useLayoutEffect, useRef, useState } from 'react'
import {
  ArrowLeft,
  BadgePercent,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronDown,
  CreditCard,
  Eye,
  Megaphone,
  PartyPopper,
  Plus,
  Sparkles,
  Tag,
} from 'lucide-react'
import { useNav } from '../context/NavContext'
import { StatusBar } from '../components/shared'

type PromotionKind = 'service' | 'event'
type OfferType = 'discount' | 'fixed'

const SERVICES = ['General Cleaning', 'Deep Cleaning', 'Move-in / Move-out', 'Office Cleaning', 'Sofa Cleaning']
const EVENTS = ['Eid Home Refresh', 'Wedding Cleanup', 'Corporate Event Cleaning', 'Ramadan Preparation', 'Move-in Weekend']
const DURATION_OPTIONS = ['3 days', '7 days', '14 days', '30 days']

const ACTIVE_OFFERS = [
  { title: 'Weekend Deep Clean', kind: 'Service', target: 'Deep Cleaning', deal: '20% OFF', price: '224 QR', daysLeft: 5, bookings: 9 },
  { title: 'Wedding Cleanup Boost', kind: 'Event', target: 'Wedding Cleanup', deal: 'From 499 QR', price: '499 QR', daysLeft: 8, bookings: 6 },
]

function SelectMenu({
  label,
  value,
  options,
  open,
  onToggle,
  onSelect,
}: {
  label: string
  value: string
  options: string[]
  open: boolean
  onToggle: () => void
  onSelect: (value: string) => void
}) {
  return (
    <div className="relative">
      <span className="text-[11px] font-bold text-gray-500">{label}</span>
      <button
        type="button"
        onClick={onToggle}
        className="mt-1 w-full rounded-2xl bg-gray-50 border border-gray-100 px-3 py-3 text-left flex items-center justify-between gap-2"
      >
        <span className="truncate text-[12px] font-semibold text-gray-700">{value}</span>
        <ChevronDown size={15} className={`shrink-0 text-gray-400 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="absolute left-0 right-0 top-[64px] z-30 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xl shadow-gray-200/70">
          {options.map(item => (
            <button
              key={item}
              type="button"
              onClick={() => onSelect(item)}
              className={`w-full px-3.5 py-2.5 text-left flex items-center justify-between gap-2 ${value === item ? 'bg-brand-50 text-brand-600' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              <span className="text-[12px] font-semibold">{item}</span>
              {value === item && <Check size={14} />}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default function OffersPage() {
  const { goBack, navigate, params } = useNav()
  const scrollRef = useRef<HTMLDivElement>(null)
  const [promotionKind, setPromotionKind] = useState<PromotionKind>('service')
  const [offerType, setOfferType] = useState<OfferType>('discount')
  const [title, setTitle] = useState('Summer Cleaning Deal')
  const [description, setDescription] = useState('Get a professional cleaning package at a limited-time promoted price. Ideal for apartments and family homes.')
  const [target, setTarget] = useState(SERVICES[0])
  const [duration, setDuration] = useState('7 days')
  const [dealValue, setDealValue] = useState('20')
  const [promoFee, setPromoFee] = useState('199')
  const [targetMenuOpen, setTargetMenuOpen] = useState(false)
  const [durationMenuOpen, setDurationMenuOpen] = useState(false)

  const targetOptions = promotionKind === 'service' ? SERVICES : EVENTS
  const dealLabel = offerType === 'discount' ? `${dealValue || 0}% OFF` : `${dealValue || 0} QR`

  const offerDraft = {
    promotionKind,
    offerType,
    title,
    description,
    target,
    duration,
    dealValue,
    dealLabel,
    promoFee,
  }

  const resetForm = () => {
    setPromotionKind('service')
    setOfferType('discount')
    setTitle('Summer Cleaning Deal')
    setDescription('Get a professional cleaning package at a limited-time promoted price. Ideal for apartments and family homes.')
    setTarget(SERVICES[0])
    setDuration('7 days')
    setDealValue('20')
    setPromoFee('199')
    scrollRef.current?.scrollTo({ top: 0 })
  }

  useLayoutEffect(() => {
    const scrollToTop = () => {
      if (scrollRef.current) scrollRef.current.scrollTop = 0
      window.scrollTo(0, 0)
    }

    scrollToTop()
    requestAnimationFrame(scrollToTop)
  }, [params?.scrollToTop])

  return (
    <div className="flex flex-col flex-1 bg-[#F4F6FF] overflow-hidden">
      <StatusBar />
      <div className="flex items-center justify-between px-4 pt-2 pb-3">
        <div className="flex items-center gap-3">
          <button onClick={goBack} className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center">
            <ArrowLeft size={20} className="text-gray-600" />
          </button>
          <div>
            <h1 className="text-[18px] font-bold text-gray-900">Offers</h1>
            <p className="text-[11px] text-gray-400">Promote deals and events</p>
          </div>
        </div>
        <button onClick={resetForm} className="w-10 h-10 rounded-xl bg-brand-500 text-white shadow-sm flex items-center justify-center">
          <Plus size={18} />
        </button>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 pb-6 space-y-4">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-500 to-indigo-600 px-4 py-3.5 text-white shadow-sm">
          <div className="absolute -right-7 -top-9 w-24 h-24 rounded-full bg-white/10" />
          <div className="absolute right-8 bottom-4 w-11 h-11 rounded-full bg-white/10" />
          <div className="relative">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-2xl bg-white/18 flex items-center justify-center shrink-0">
                <Megaphone size={20} />
              </div>
              <div className="flex-1">
                <p className="text-[17px] font-bold leading-tight">Promoted offers</p>
                <p className="text-[11px] text-white/75 leading-relaxed mt-1">Create a service or event promotion for the customer app.</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 mt-3">
              {[
                ['2', 'Active'],
                ['244', 'Views'],
                ['13', 'Bookings'],
              ].map(([value, label]) => (
                <div key={label} className="rounded-2xl bg-white/12 px-3 py-1.5">
                  <p className="text-[14px] font-bold">{value}</p>
                  <p className="text-[9px] text-white/70">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-sm p-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-[15px] font-bold text-gray-900">Create promotion</p>
              <p className="text-[11px] text-gray-400 mt-0.5">Set the deal customers will see</p>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-bold">Draft</span>
          </div>

          <div className="space-y-3">
            <div>
              <span className="text-[11px] font-bold text-gray-500">Promotion type</span>
              <div className="grid grid-cols-2 gap-2 mt-1">
                <button
                  type="button"
                  onClick={() => {
                    setPromotionKind('service')
                    setTarget(SERVICES[0])
                  }}
                  className={`rounded-2xl px-3 py-3 text-left border transition-colors ${promotionKind === 'service' ? 'bg-brand-50 border-brand-200' : 'bg-gray-50 border-gray-100'}`}
                >
                  <Sparkles size={16} className={promotionKind === 'service' ? 'text-brand-500' : 'text-gray-400'} />
                  <p className="text-[12px] font-bold text-gray-800 mt-1">Service</p>
                  <p className="text-[10px] text-gray-400">Promote a service</p>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setPromotionKind('event')
                    setTarget(EVENTS[0])
                    setTitle('Eid Home Refresh')
                    setDescription('Limited-time event promotion for customers preparing their homes for Eid and family gatherings.')
                  }}
                  className={`rounded-2xl px-3 py-3 text-left border transition-colors ${promotionKind === 'event' ? 'bg-brand-50 border-brand-200' : 'bg-gray-50 border-gray-100'}`}
                >
                  <PartyPopper size={16} className={promotionKind === 'event' ? 'text-brand-500' : 'text-gray-400'} />
                  <p className="text-[12px] font-bold text-gray-800 mt-1">Event</p>
                  <p className="text-[10px] text-gray-400">Promote event demand</p>
                </button>
              </div>
            </div>

            <label className="block">
              <span className="text-[11px] font-bold text-gray-500">Title</span>
              <input
                value={title}
                onChange={e => setTitle(e.target.value)}
                className="mt-1 w-full rounded-2xl bg-gray-50 border border-gray-100 px-4 py-3 text-[13px] font-semibold text-gray-800 outline-none focus:border-brand-300"
              />
            </label>

            <label className="block">
              <span className="text-[11px] font-bold text-gray-500">Description</span>
              <textarea
                value={description}
                onChange={e => setDescription(e.target.value)}
                rows={3}
                className="mt-1 w-full resize-none rounded-2xl bg-gray-50 border border-gray-100 px-4 py-3 text-[12px] leading-relaxed text-gray-600 outline-none focus:border-brand-300"
              />
            </label>

            <div className="grid grid-cols-2 gap-3">
              <SelectMenu
                label={promotionKind === 'service' ? 'Service' : 'Event'}
                value={target}
                options={targetOptions}
                open={targetMenuOpen}
                onToggle={() => {
                  setTargetMenuOpen(open => !open)
                  setDurationMenuOpen(false)
                }}
                onSelect={value => {
                  setTarget(value)
                  setTargetMenuOpen(false)
                }}
              />
              <SelectMenu
                label="Duration"
                value={duration}
                options={DURATION_OPTIONS}
                open={durationMenuOpen}
                onToggle={() => {
                  setDurationMenuOpen(open => !open)
                  setTargetMenuOpen(false)
                }}
                onSelect={value => {
                  setDuration(value)
                  setDurationMenuOpen(false)
                }}
              />
            </div>

            <div>
              <span className="text-[11px] font-bold text-gray-500">Offer type</span>
              <div className="grid grid-cols-2 gap-2 mt-1">
                <button
                  type="button"
                  onClick={() => {
                    setOfferType('discount')
                    setDealValue('20')
                  }}
                  className={`rounded-2xl px-3 py-3 text-left border transition-colors ${offerType === 'discount' ? 'bg-brand-50 border-brand-200' : 'bg-gray-50 border-gray-100'}`}
                >
                  <BadgePercent size={16} className={offerType === 'discount' ? 'text-brand-500' : 'text-gray-400'} />
                  <p className="text-[12px] font-bold text-gray-800 mt-1">Discount</p>
                  <p className="text-[10px] text-gray-400">Example: 20% off</p>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setOfferType('fixed')
                    setDealValue(promotionKind === 'event' ? '499' : '199')
                  }}
                  className={`rounded-2xl px-3 py-3 text-left border transition-colors ${offerType === 'fixed' ? 'bg-brand-50 border-brand-200' : 'bg-gray-50 border-gray-100'}`}
                >
                  <Tag size={16} className={offerType === 'fixed' ? 'text-brand-500' : 'text-gray-400'} />
                  <p className="text-[12px] font-bold text-gray-800 mt-1">Fixed price</p>
                  <p className="text-[10px] text-gray-400">Example: 199 QR</p>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <label className="block">
                <span className="text-[11px] font-bold text-gray-500">{offerType === 'discount' ? 'Discount' : 'Offer price'}</span>
                <div className="mt-1 flex items-center rounded-2xl bg-gray-50 border border-gray-100 px-4 py-3">
                  <input value={dealValue} onChange={e => setDealValue(e.target.value)} className="w-full bg-transparent text-[14px] font-bold text-gray-900 outline-none" />
                  <span className="text-[12px] font-bold text-gray-400">{offerType === 'discount' ? '%' : 'QR'}</span>
                </div>
              </label>
              <label className="block">
                <span className="text-[11px] font-bold text-gray-500">Promo fee</span>
                <div className="mt-1 flex items-center rounded-2xl bg-gray-50 border border-gray-100 px-4 py-3">
                  <input value={promoFee} onChange={e => setPromoFee(e.target.value)} className="w-full bg-transparent text-[14px] font-bold text-gray-900 outline-none" />
                  <span className="text-[12px] font-bold text-gray-400">QR</span>
                </div>
              </label>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-sm p-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-[15px] font-bold text-gray-900">Customer preview</p>
              <p className="text-[11px] text-gray-400">How the promotion card can appear</p>
            </div>
            <Eye size={17} className="text-gray-400" />
          </div>
          <div className="rounded-3xl border border-gray-100 bg-gradient-to-br from-amber-50 to-white p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className="w-11 h-11 rounded-2xl bg-amber-100 flex items-center justify-center">
                  {promotionKind === 'event' ? <PartyPopper size={20} className="text-amber-500" /> : <Sparkles size={20} className="text-amber-500" />}
                </div>
                <div>
                  <p className="text-[14px] font-bold text-gray-900">{title || 'Untitled promotion'}</p>
                  <p className="text-[11px] text-gray-500 mt-0.5">{target}</p>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-600 text-[10px] font-bold">{dealLabel}</span>
            </div>
            <p className="text-[12px] text-gray-500 leading-relaxed mt-3">{description || 'Add a short description for customers.'}</p>
            <div className="flex items-center justify-between mt-4 pt-3 border-t border-amber-100">
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-gray-500">
                <CalendarDays size={13} />
                Runs for {duration}
              </div>
              <button type="button" onClick={() => navigate('offer-payment', offerDraft)} className="px-3 py-2 rounded-xl bg-gray-900 text-white text-[11px] font-bold">Review</button>
            </div>
          </div>
        </div>

        <button onClick={() => navigate('offer-payment', offerDraft)} className="w-full bg-brand-500 text-white rounded-2xl py-4 shadow-sm flex items-center justify-center gap-2 active:scale-[0.98] transition-transform">
          <CreditCard size={18} />
          <span className="text-[14px] font-bold">Pay {promoFee || 199} QR to Promote</span>
        </button>

        <div>
          <p className="text-[15px] font-bold text-gray-900 mb-3 px-0.5">Active promotions</p>
          <div className="space-y-3">
            {ACTIVE_OFFERS.map(offer => (
              <button key={offer.title} onClick={() => navigate('offer-payment', { ...offerDraft, title: offer.title, target: offer.target, dealLabel: offer.deal, promoFee: '199' })} className="w-full bg-white rounded-2xl shadow-sm p-4 text-left active:scale-[0.99] transition-transform">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[14px] font-bold text-gray-900">{offer.title}</p>
                    <p className="text-[11px] text-gray-400 mt-0.5">{offer.kind} · {offer.target}</p>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-green-50 text-green-600 text-[10px] font-bold flex items-center gap-1">
                    <CheckCircle2 size={11} />
                    Live
                  </span>
                </div>
                <div className="grid grid-cols-4 gap-2 mt-4">
                  {[
                    [offer.deal, 'Deal'],
                    [offer.price, 'Price'],
                    [`${offer.daysLeft}d`, 'Left'],
                    [String(offer.bookings), 'Bookings'],
                  ].map(([value, label]) => (
                    <div key={label} className="rounded-2xl bg-gray-50 px-2 py-2 text-center">
                      <p className="text-[12px] font-bold text-gray-900">{value}</p>
                      <p className="text-[9px] text-gray-400 mt-0.5">{label}</p>
                    </div>
                  ))}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
