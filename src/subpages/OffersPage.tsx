import { useState } from 'react'
import {
  ArrowLeft,
  BadgePercent,
  CalendarDays,
  ChevronDown,
  CheckCircle2,
  Check,
  CreditCard,
  Eye,
  Megaphone,
  Plus,
  Sparkles,
  Tag,
} from 'lucide-react'
import { useNav } from '../context/NavContext'
import { StatusBar } from '../components/shared'

const SERVICES = ['General Cleaning', 'Deep Cleaning', 'Move-in / Move-out', 'Office Cleaning', 'Sofa Cleaning']
const DURATION_OPTIONS = ['3 days', '7 days', '14 days', '30 days']

const ACTIVE_OFFERS = [
  {
    title: 'Weekend Deep Clean',
    service: 'Deep Cleaning',
    discount: '20% OFF',
    price: '224 QR',
    daysLeft: 5,
    views: 148,
    bookings: 9,
  },
  {
    title: 'Office Refresh Package',
    service: 'Office Cleaning',
    discount: 'From 180 QR',
    price: '180 QR',
    daysLeft: 11,
    views: 96,
    bookings: 4,
  },
]

export default function OffersPage() {
  const { goBack } = useNav()
  const [offerType, setOfferType] = useState<'discount' | 'fixed'>('discount')
  const [service, setService] = useState(SERVICES[0])
  const [duration, setDuration] = useState('7 days')
  const [serviceMenuOpen, setServiceMenuOpen] = useState(false)
  const [durationMenuOpen, setDurationMenuOpen] = useState(false)

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
            <p className="text-[11px] text-gray-400">Promote deals on the customer app</p>
          </div>
        </div>
        <button className="w-10 h-10 rounded-xl bg-brand-500 text-white shadow-sm flex items-center justify-center">
          <Plus size={18} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-6 space-y-4">
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
                <p className="text-[11px] text-white/75 leading-relaxed mt-1">Create a customer-facing deal and promote it inside Helpy.</p>
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
              <p className="text-[15px] font-bold text-gray-900">Create offer</p>
              <p className="text-[11px] text-gray-400 mt-0.5">Set the deal customers will see</p>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-bold">Draft</span>
          </div>

          <div className="space-y-3">
            <label className="block">
              <span className="text-[11px] font-bold text-gray-500">Offer title</span>
              <input
                defaultValue="Summer Cleaning Deal"
                className="mt-1 w-full rounded-2xl bg-gray-50 border border-gray-100 px-4 py-3 text-[13px] font-semibold text-gray-800 outline-none focus:border-brand-300"
              />
            </label>

            <label className="block">
              <span className="text-[11px] font-bold text-gray-500">Description</span>
              <textarea
                defaultValue="Get a professional cleaning package at a limited-time promoted price. Ideal for apartments and family homes."
                rows={3}
                className="mt-1 w-full resize-none rounded-2xl bg-gray-50 border border-gray-100 px-4 py-3 text-[12px] leading-relaxed text-gray-600 outline-none focus:border-brand-300"
              />
            </label>

            <div className="grid grid-cols-2 gap-3">
              <div className="relative">
                <span className="text-[11px] font-bold text-gray-500">Service</span>
                <button
                  type="button"
                  onClick={() => {
                    setServiceMenuOpen(open => !open)
                    setDurationMenuOpen(false)
                  }}
                  className="mt-1 w-full rounded-2xl bg-gray-50 border border-gray-100 px-3 py-3 text-left flex items-center justify-between gap-2"
                >
                  <span className="truncate text-[12px] font-semibold text-gray-700">{service}</span>
                  <ChevronDown size={15} className={`shrink-0 text-gray-400 transition-transform ${serviceMenuOpen ? 'rotate-180' : ''}`} />
                </button>
                {serviceMenuOpen && (
                  <div className="absolute left-0 right-0 top-[64px] z-30 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xl shadow-gray-200/70">
                    {SERVICES.map(item => (
                      <button
                        key={item}
                        type="button"
                        onClick={() => {
                          setService(item)
                          setServiceMenuOpen(false)
                        }}
                        className={`w-full px-3.5 py-2.5 text-left flex items-center justify-between gap-2 ${service === item ? 'bg-brand-50 text-brand-600' : 'text-gray-600 hover:bg-gray-50'}`}
                      >
                        <span className="text-[12px] font-semibold">{item}</span>
                        {service === item && <Check size={14} />}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="relative">
                <span className="text-[11px] font-bold text-gray-500">Duration</span>
                <button
                  type="button"
                  onClick={() => {
                    setDurationMenuOpen(open => !open)
                    setServiceMenuOpen(false)
                  }}
                  className="mt-1 w-full rounded-2xl bg-gray-50 border border-gray-100 px-3 py-3 text-left flex items-center justify-between gap-2"
                >
                  <span className="truncate text-[12px] font-semibold text-gray-700">{duration}</span>
                  <ChevronDown size={15} className={`shrink-0 text-gray-400 transition-transform ${durationMenuOpen ? 'rotate-180' : ''}`} />
                </button>
                {durationMenuOpen && (
                  <div className="absolute left-0 right-0 top-[64px] z-30 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xl shadow-gray-200/70">
                    {DURATION_OPTIONS.map(item => (
                      <button
                        key={item}
                        type="button"
                        onClick={() => {
                          setDuration(item)
                          setDurationMenuOpen(false)
                        }}
                        className={`w-full px-3.5 py-2.5 text-left flex items-center justify-between gap-2 ${duration === item ? 'bg-brand-50 text-brand-600' : 'text-gray-600 hover:bg-gray-50'}`}
                      >
                        <span className="text-[12px] font-semibold">{item}</span>
                        {duration === item && <Check size={14} />}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div>
              <span className="text-[11px] font-bold text-gray-500">Offer type</span>
              <div className="grid grid-cols-2 gap-2 mt-1">
                <button
                  onClick={() => setOfferType('discount')}
                  className={`rounded-2xl px-3 py-3 text-left border transition-colors ${offerType === 'discount' ? 'bg-brand-50 border-brand-200' : 'bg-gray-50 border-gray-100'}`}
                >
                  <BadgePercent size={16} className={offerType === 'discount' ? 'text-brand-500' : 'text-gray-400'} />
                  <p className="text-[12px] font-bold text-gray-800 mt-1">Discount</p>
                  <p className="text-[10px] text-gray-400">Example: 20% off</p>
                </button>
                <button
                  onClick={() => setOfferType('fixed')}
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
                  <input defaultValue={offerType === 'discount' ? '20' : '199'} className="w-full bg-transparent text-[14px] font-bold text-gray-900 outline-none" />
                  <span className="text-[12px] font-bold text-gray-400">{offerType === 'discount' ? '%' : 'QR'}</span>
                </div>
              </label>
              <label className="block">
                <span className="text-[11px] font-bold text-gray-500">Promo fee</span>
                <div className="mt-1 flex items-center rounded-2xl bg-gray-50 border border-gray-100 px-4 py-3">
                  <input defaultValue="199" className="w-full bg-transparent text-[14px] font-bold text-gray-900 outline-none" />
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
              <p className="text-[11px] text-gray-400">How the offer card can appear</p>
            </div>
            <Eye size={17} className="text-gray-400" />
          </div>
          <div className="rounded-3xl border border-gray-100 bg-gradient-to-br from-amber-50 to-white p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className="w-11 h-11 rounded-2xl bg-amber-100 flex items-center justify-center">
                  <Sparkles size={20} className="text-amber-500" />
                </div>
                <div>
                  <p className="text-[14px] font-bold text-gray-900">Summer Cleaning Deal</p>
                  <p className="text-[11px] text-gray-500 mt-0.5">{service}</p>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-600 text-[10px] font-bold">{offerType === 'discount' ? '20% OFF' : '199 QR'}</span>
            </div>
            <p className="text-[12px] text-gray-500 leading-relaxed mt-3">Professional cleaning package at a limited-time promoted price.</p>
            <div className="flex items-center justify-between mt-4 pt-3 border-t border-amber-100">
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-gray-500">
                <CalendarDays size={13} />
                Runs for {duration}
              </div>
              <button className="px-3 py-2 rounded-xl bg-gray-900 text-white text-[11px] font-bold">Book now</button>
            </div>
          </div>
        </div>

        <button className="w-full bg-brand-500 text-white rounded-2xl py-4 shadow-sm flex items-center justify-center gap-2 active:scale-[0.98] transition-transform">
          <CreditCard size={18} />
          <span className="text-[14px] font-bold">Pay 199 QR to Promote</span>
        </button>

        <div>
          <p className="text-[15px] font-bold text-gray-900 mb-3 px-0.5">Active offers</p>
          <div className="space-y-3">
            {ACTIVE_OFFERS.map(offer => (
              <div key={offer.title} className="bg-white rounded-2xl shadow-sm p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[14px] font-bold text-gray-900">{offer.title}</p>
                    <p className="text-[11px] text-gray-400 mt-0.5">{offer.service}</p>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-green-50 text-green-600 text-[10px] font-bold flex items-center gap-1">
                    <CheckCircle2 size={11} />
                    Live
                  </span>
                </div>
                <div className="grid grid-cols-4 gap-2 mt-4">
                  {[
                    [offer.discount, 'Deal'],
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
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
