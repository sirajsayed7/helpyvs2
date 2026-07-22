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
  FileImage,
  ImagePlus,
  LayoutTemplate,
  Megaphone,
  PartyPopper,
  Sparkles,
  Tag,
  UploadCloud,
  Wand2,
  Video,
} from 'lucide-react'
import { useNav } from '../context/NavContext'
import { StatusBar } from '../components/shared'

type PromotionKind = 'service' | 'event' | 'banner'
type OfferType = 'discount' | 'fixed'
type BannerCreativeMode = 'upload' | 'request'

const SERVICES = ['General Cleaning', 'Deep Cleaning', 'Move-in / Move-out', 'Office Cleaning', 'Sofa Cleaning']
const EVENTS = ['Eid Home Refresh', 'Wedding Cleanup', 'Corporate Event Cleaning', 'Ramadan Preparation', 'Move-in Weekend']
const OFFER_DURATION_OPTIONS = ['3 days', '7 days', '14 days', '30 days']
const BANNER_DURATION_OPTIONS = ['1 week', '2 weeks', '3 weeks', '4 weeks']
const OFFER_PROMO_RATE_PER_DAY = 19
const BANNER_RATE_PER_WEEK = 199

const ACTIVE_OFFERS = [
  { title: 'Weekend Deep Clean', kind: 'Service', target: 'Deep Cleaning', deal: '20% OFF', price: '224 QR', daysLeft: 5, bookings: 9 },
  { title: 'Wedding Cleanup Boost', kind: 'Event', target: 'Wedding Cleanup', deal: 'From 499 QR', price: '499 QR', daysLeft: 8, bookings: 6 },
]

const BANNER_CAMPAIGNS = [
  { title: 'Summer Home Spotlight', duration: '2 weeks', status: 'Pending review', cta: 'Book Now', target: 'General Cleaning' },
  { title: 'Office Refresh Feature', duration: '1 week', status: 'Scheduled', cta: 'Explore', target: 'Office Cleaning' },
]

const numberFromDuration = (duration: string) => Number(duration.split(' ')[0]) || 0

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
        className="mt-1 flex w-full items-center justify-between gap-2 rounded-2xl border border-gray-100 bg-gray-50 px-3 py-3 text-left"
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
              className={`flex w-full items-center justify-between gap-2 px-3.5 py-2.5 text-left ${value === item ? 'bg-brand-50 text-brand-600' : 'text-gray-600 hover:bg-gray-50'}`}
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
  const [targetMenuOpen, setTargetMenuOpen] = useState(false)
  const [durationMenuOpen, setDurationMenuOpen] = useState(false)
  const [bannerCreativeMode, setBannerCreativeMode] = useState<BannerCreativeMode>('upload')
  const [bannerFileName, setBannerFileName] = useState('')
  const [bannerDesignBrief, setBannerDesignBrief] = useState('Create a clean homepage banner for a trusted cleaning service in Qatar, using a bright city-service feel and clear booking CTA.')
  const [ctaLabel, setCtaLabel] = useState('Book Now')

  const isBanner = promotionKind === 'banner'
  const targetOptions = promotionKind === 'event' ? EVENTS : SERVICES
  const durationOptions = isBanner ? BANNER_DURATION_OPTIONS : OFFER_DURATION_OPTIONS
  const durationCount = numberFromDuration(duration)
  const promoFee = String(durationCount * (isBanner ? BANNER_RATE_PER_WEEK : OFFER_PROMO_RATE_PER_DAY))
  const dealLabel = offerType === 'discount' ? `${dealValue || 0}% OFF` : `${dealValue || 0} QR`

  const campaignDraft = {
    promotionKind,
    offerType,
    title: isBanner ? (bannerCreativeMode === 'upload' ? 'Uploaded homepage banner' : 'Requested homepage banner design') : title,
    description,
    target,
    duration,
    dealValue,
    dealLabel,
    promoFee,
    bannerCreativeMode,
    bannerFileName,
    bannerDesignBrief,
    ctaLabel,
  }

  useLayoutEffect(() => {
    const scrollToTop = () => {
      if (scrollRef.current) scrollRef.current.scrollTop = 0
      window.scrollTo(0, 0)
    }

    scrollToTop()
    requestAnimationFrame(scrollToTop)
  }, [params?.scrollToTop])

  const setMode = (kind: PromotionKind) => {
    setPromotionKind(kind)
    setTargetMenuOpen(false)
    setDurationMenuOpen(false)

    if (kind === 'service') {
      setTitle('Summer Cleaning Deal')
      setDescription('Get a professional cleaning package at a limited-time promoted price. Ideal for apartments and family homes.')
      setTarget(SERVICES[0])
      setDuration('7 days')
      setOfferType('discount')
      setDealValue('20')
      return
    }

    if (kind === 'event') {
      setTitle('Eid Home Refresh')
      setDescription('Limited-time event promotion for customers preparing their homes for Eid and family gatherings.')
      setTarget(EVENTS[0])
      setDuration('7 days')
      setOfferType('fixed')
      setDealValue('499')
      return
    }

    setTitle('Homepage Spotlight Banner')
    setDescription('Place a featured banner on the customer app homepage and route customers directly to your chosen service.')
    setTarget(SERVICES[0])
    setDuration('1 week')
    setOfferType('fixed')
    setDealValue('299')
    setBannerCreativeMode('upload')
    setBannerFileName('')
    setBannerDesignBrief('Create a clean homepage banner for a trusted cleaning service in Qatar, using a bright city-service feel and clear booking CTA.')
    setCtaLabel('Book Now')
  }

  return (
    <div className="flex flex-1 flex-col overflow-hidden bg-[#F4F6FF]">
      <StatusBar />
      <div className="flex items-center justify-between px-4 pt-2 pb-3">
        <div className="flex items-center gap-3">
          <button onClick={goBack} className="flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-sm">
            <ArrowLeft size={20} className="text-gray-600" />
          </button>
          <div>
            <h1 className="text-[18px] font-bold text-gray-900">Offers</h1>
            <p className="text-[11px] text-gray-400">Promote deals, events, and banners</p>
          </div>
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto px-4 pb-6">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-500 to-indigo-600 px-4 py-4 text-white shadow-sm">
          <div className="absolute -right-7 -top-9 h-24 w-24 rounded-full bg-white/10" />
          <div className="absolute right-8 bottom-4 h-11 w-11 rounded-full bg-white/10" />
          <div className="relative">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white/18">
                <Megaphone size={20} />
              </div>
              <div className="flex-1">
                <p className="text-[17px] font-bold leading-tight">Promotions manager</p>
                <p className="mt-1 text-[11px] leading-relaxed text-white/75">Create promotional offers or reserve a premium homepage banner slot.</p>
              </div>
            </div>
            <div className="mt-3 grid grid-cols-3 gap-2">
              {[
                ['3', 'Live'],
                ['1', 'In review'],
                ['244', 'Views'],
              ].map(([value, label]) => (
                <div key={label} className="rounded-2xl bg-white/12 px-3 py-1.5">
                  <p className="text-[14px] font-bold">{value}</p>
                  <p className="text-[9px] text-white/70">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-3xl bg-white p-4 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-[15px] font-bold text-gray-900">Create campaign</p>
              <p className="mt-0.5 text-[11px] text-gray-400">Choose what you want customers to see</p>
            </div>
            <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold text-emerald-600">Draft</span>
          </div>

          <div className="space-y-3">
            <div>
              <span className="text-[11px] font-bold text-gray-500">Placement type</span>
              <div className="mt-1 grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setMode('service')}
                  className={`rounded-2xl border px-3 py-3 text-left transition-colors ${promotionKind === 'service' ? 'border-brand-200 bg-brand-50' : 'border-gray-100 bg-gray-50'}`}
                >
                  <Sparkles size={16} className={promotionKind === 'service' ? 'text-brand-500' : 'text-gray-400'} />
                  <p className="mt-1 text-[12px] font-bold text-gray-800">Service</p>
                  <p className="text-[10px] text-gray-400">Promoted deal</p>
                </button>
                <button
                  type="button"
                  onClick={() => setMode('event')}
                  className={`rounded-2xl border px-3 py-3 text-left transition-colors ${promotionKind === 'event' ? 'border-brand-200 bg-brand-50' : 'border-gray-100 bg-gray-50'}`}
                >
                  <PartyPopper size={16} className={promotionKind === 'event' ? 'text-brand-500' : 'text-gray-400'} />
                  <p className="mt-1 text-[12px] font-bold text-gray-800">Event</p>
                  <p className="text-[10px] text-gray-400">Seasonal push</p>
                </button>
                <button
                  type="button"
                  onClick={() => setMode('banner')}
                  className={`rounded-2xl border px-3 py-3 text-left transition-colors ${promotionKind === 'banner' ? 'border-brand-200 bg-brand-50' : 'border-gray-100 bg-gray-50'}`}
                >
                  <LayoutTemplate size={16} className={promotionKind === 'banner' ? 'text-brand-500' : 'text-gray-400'} />
                  <p className="mt-1 text-[12px] font-bold text-gray-800">Banner</p>
                  <p className="text-[10px] text-gray-400">Homepage advert</p>
                </button>
              </div>
            </div>

            {!isBanner && (
              <>
                <label className="block">
                  <span className="text-[11px] font-bold text-gray-500">Title</span>
                  <input
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    className="mt-1 w-full rounded-2xl border border-gray-100 bg-gray-50 px-4 py-3 text-[13px] font-semibold text-gray-800 outline-none focus:border-brand-300"
                  />
                </label>

                <label className="block">
                  <span className="text-[11px] font-bold text-gray-500">Description</span>
                  <textarea
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    rows={3}
                    className="mt-1 w-full resize-none rounded-2xl border border-gray-100 bg-gray-50 px-4 py-3 text-[12px] leading-relaxed text-gray-600 outline-none focus:border-brand-300"
                  />
                </label>
              </>
            )}

            {isBanner ? (
              <>
                <div className="grid grid-cols-2 gap-3">
                  <SelectMenu
                    label="Linked service"
                    value={target}
                    options={SERVICES}
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
                    label="Run time"
                    value={duration}
                    options={durationOptions}
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
                  <span className="text-[11px] font-bold text-gray-500">Banner creative</span>
                  <div className="mt-1 grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setBannerCreativeMode('upload')}
                      className={`rounded-2xl border px-3 py-3 text-left transition-colors ${bannerCreativeMode === 'upload' ? 'border-brand-200 bg-brand-50' : 'border-gray-100 bg-gray-50'}`}
                    >
                      <UploadCloud size={16} className={bannerCreativeMode === 'upload' ? 'text-brand-500' : 'text-gray-400'} />
                      <p className="mt-1 text-[12px] font-bold text-gray-800">Upload banner</p>
                      <p className="text-[10px] text-gray-400">Use your own image</p>
                    </button>
                    <button
                      type="button"
                      onClick={() => setBannerCreativeMode('request')}
                      className={`rounded-2xl border px-3 py-3 text-left transition-colors ${bannerCreativeMode === 'request' ? 'border-brand-200 bg-brand-50' : 'border-gray-100 bg-gray-50'}`}
                    >
                      <Wand2 size={16} className={bannerCreativeMode === 'request' ? 'text-brand-500' : 'text-gray-400'} />
                      <p className="mt-1 text-[12px] font-bold text-gray-800">Request design</p>
                      <p className="text-[10px] text-gray-400">Helpy makes it</p>
                    </button>
                  </div>
                </div>

                {bannerCreativeMode === 'upload' ? (
                  <label className="block rounded-2xl border border-dashed border-brand-200 bg-brand-50/60 px-4 py-4">
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={e => setBannerFileName(e.target.files?.[0]?.name || '')}
                    />
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white">
                        <FileImage size={19} className="text-brand-500" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-[13px] font-bold text-gray-900">{bannerFileName || 'Tap to upload banner image'}</p>
                        <p className="text-[11px] text-gray-500">Recommended size: 1080 x 420 PNG or JPG</p>
                      </div>
                    </div>
                  </label>
                ) : (
                  <label className="block">
                    <span className="text-[11px] font-bold text-gray-500">Design request</span>
                    <textarea
                      value={bannerDesignBrief}
                      onChange={e => setBannerDesignBrief(e.target.value)}
                      rows={4}
                      className="mt-1 w-full resize-none rounded-2xl border border-gray-100 bg-gray-50 px-4 py-3 text-[12px] leading-relaxed text-gray-600 outline-none focus:border-brand-300"
                    />
                  </label>
                )}

                <div className="grid grid-cols-[1fr_112px] gap-3">
                  <label className="block">
                    <span className="text-[11px] font-bold text-gray-500">Call to action</span>
                    <input
                      value={ctaLabel}
                      onChange={e => setCtaLabel(e.target.value)}
                      className="mt-1 w-full rounded-2xl border border-gray-100 bg-gray-50 px-4 py-3 text-[13px] font-semibold text-gray-800 outline-none focus:border-brand-300"
                    />
                  </label>
                  <label className="block">
                    <span className="text-[11px] font-bold text-gray-500">Offer price</span>
                    <div className="mt-1 flex items-center rounded-2xl border border-gray-100 bg-gray-50 px-4 py-3.5">
                      <input value={dealValue} onChange={e => setDealValue(e.target.value)} className="w-full bg-transparent text-[14px] font-bold text-gray-900 outline-none" />
                      <span className="text-[12px] font-bold text-gray-400">QR</span>
                    </div>
                  </label>
                </div>

                <div className="rounded-2xl border border-brand-100 bg-brand-50/70 px-4 py-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[12px] font-bold text-gray-900">Banner rate</p>
                      <p className="text-[11px] text-gray-500">Featured homepage slot</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[16px] font-bold text-brand-600">199 QR / week</p>
                      <p className="text-[10px] text-gray-400">Auto-calculated at checkout</p>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
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
                    options={durationOptions}
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
                  <div className="mt-1 grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setOfferType('discount')
                        setDealValue('20')
                      }}
                      className={`rounded-2xl border px-3 py-3 text-left transition-colors ${offerType === 'discount' ? 'border-brand-200 bg-brand-50' : 'border-gray-100 bg-gray-50'}`}
                    >
                      <BadgePercent size={16} className={offerType === 'discount' ? 'text-brand-500' : 'text-gray-400'} />
                      <p className="mt-1 text-[12px] font-bold text-gray-800">Discount</p>
                      <p className="text-[10px] text-gray-400">Example: 20% off</p>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setOfferType('fixed')
                        setDealValue(promotionKind === 'event' ? '499' : '199')
                      }}
                      className={`rounded-2xl border px-3 py-3 text-left transition-colors ${offerType === 'fixed' ? 'border-brand-200 bg-brand-50' : 'border-gray-100 bg-gray-50'}`}
                    >
                      <Tag size={16} className={offerType === 'fixed' ? 'text-brand-500' : 'text-gray-400'} />
                      <p className="mt-1 text-[12px] font-bold text-gray-800">Fixed price</p>
                      <p className="text-[10px] text-gray-400">Example: 199 QR</p>
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block">
                    <span className="text-[11px] font-bold text-gray-500">{offerType === 'discount' ? 'Discount' : 'Offer price'}</span>
                    <div className="mt-1 flex items-center rounded-2xl border border-gray-100 bg-gray-50 px-4 py-3.5">
                      <input value={dealValue} onChange={e => setDealValue(e.target.value)} className="w-full bg-transparent text-[14px] font-bold text-gray-900 outline-none" />
                      <span className="text-[12px] font-bold text-gray-400">{offerType === 'discount' ? '%' : 'QR'}</span>
                    </div>
                  </label>
                  <p className="mt-1.5 text-[10px] text-gray-400">
                    Promotion cost is calculated separately at {OFFER_PROMO_RATE_PER_DAY} QR/day when you continue.
                  </p>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="rounded-3xl bg-white p-4 shadow-sm">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <p className="text-[15px] font-bold text-gray-900">Customer preview</p>
              <p className="text-[11px] text-gray-400">{isBanner ? 'Homepage banner simulation' : 'How the promotion card can appear'}</p>
            </div>
            <Eye size={17} className="text-gray-400" />
          </div>

          {isBanner ? (
            <div className="overflow-hidden rounded-[28px] border border-sky-100 bg-gradient-to-r from-slate-50 via-sky-50 to-amber-50 p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand-500">Featured banner</p>
                  <p className="mt-2 max-w-[220px] text-[24px] font-bold leading-tight text-slate-900">
                    {bannerCreativeMode === 'upload' ? 'Uploaded banner image' : 'Banner design request'}
                  </p>
                  <p className="mt-2 max-w-[220px] text-[12px] leading-relaxed text-slate-600">
                    {bannerCreativeMode === 'upload'
                      ? bannerFileName || 'No file selected yet'
                      : bannerDesignBrief || 'Add a short design brief.'}
                  </p>
                </div>
                <div className="relative mt-1 flex h-28 w-24 shrink-0 items-center justify-center rounded-[26px] bg-white/70 shadow-inner">
                  <ImagePlus size={26} className="text-brand-300" />
                  <div className="absolute bottom-3 right-3 h-8 w-8 rounded-2xl bg-sky-100" />
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between gap-3 border-t border-white/80 pt-3">
                <button type="button" className="rounded-full bg-brand-500 px-4 py-2 text-[11px] font-bold text-white">
                  {ctaLabel || 'Book Now'}
                </button>
                <div className="text-right">
                  <p className="text-[11px] font-semibold text-slate-500">{target}</p>
                  <p className="text-[10px] text-slate-400">{duration}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="rounded-3xl border border-gray-100 bg-gradient-to-br from-amber-50 to-white p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-100">
                    {promotionKind === 'event' ? <PartyPopper size={20} className="text-amber-500" /> : <Sparkles size={20} className="text-amber-500" />}
                  </div>
                  <div>
                    <p className="text-[14px] font-bold text-gray-900">{title || 'Untitled promotion'}</p>
                    <p className="mt-0.5 text-[11px] text-gray-500">{target}</p>
                  </div>
                </div>
                <span className="rounded-full bg-amber-100 px-2.5 py-1 text-[10px] font-bold text-amber-600">{dealLabel}</span>
              </div>
              <p className="mt-3 text-[12px] leading-relaxed text-gray-500">{description || 'Add a short description for customers.'}</p>
              <div className="mt-4 flex items-center justify-between border-t border-amber-100 pt-3">
                <div className="flex items-center gap-1.5 text-[11px] font-semibold text-gray-500">
                  <CalendarDays size={13} />
                  Runs for {duration}
                </div>
                <button type="button" onClick={() => navigate('offer-payment', campaignDraft)} className="rounded-xl bg-gray-900 px-3 py-2 text-[11px] font-bold text-white">
                  Review
                </button>
              </div>
            </div>
          )}
        </div>

        <button
          onClick={() => navigate(isBanner ? 'offer-approval' : 'offer-payment', campaignDraft)}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-brand-500 py-4 text-white shadow-sm transition-transform active:scale-[0.98]"
        >
          <CreditCard size={18} />
          <span className="text-[14px] font-bold">{isBanner ? `Send for approval and pay ${promoFee} QR` : `Pay ${promoFee} QR to Promote`}</span>
        </button>

        <div>
          <p className="mb-2 px-0.5 text-[11px] font-bold uppercase tracking-[0.12em] text-gray-400">Marketing support</p>
          <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-violet-600 to-brand-600 p-4 text-white shadow-sm">
            <div className="flex items-start gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white/15"><Video size={21} /></div>
              <div className="min-w-0 flex-1">
                <p className="text-[15px] font-bold">Need a professional video?</p>
                <p className="mt-1 text-[11px] leading-relaxed text-white/75">Tell our marketing team what you want to showcase and we’ll create a customer-ready video for your business.</p>
              </div>
            </div>
            <button type="button" onClick={() => navigate('marketing-video-request')} className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-white py-3 text-[13px] font-bold text-violet-600 shadow-sm active:scale-[0.99]">
              <Video size={16} /> Request marketing video
            </button>
          </div>
        </div>

        {!isBanner && (
          <div>
            <p className="mb-3 px-0.5 text-[15px] font-bold text-gray-900">Active promotions</p>
            <div className="space-y-3">
              {ACTIVE_OFFERS.map(offer => (
                <button key={offer.title} onClick={() => navigate('offer-payment', { ...campaignDraft, title: offer.title, target: offer.target, dealLabel: offer.deal, promoFee: '199' })} className="w-full rounded-2xl bg-white p-4 text-left shadow-sm transition-transform active:scale-[0.99]">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-[14px] font-bold text-gray-900">{offer.title}</p>
                      <p className="mt-0.5 text-[11px] text-gray-400">{offer.kind} · {offer.target}</p>
                    </div>
                    <span className="flex items-center gap-1 rounded-full bg-green-50 px-2.5 py-1 text-[10px] font-bold text-green-600">
                      <CheckCircle2 size={11} />
                      Live
                    </span>
                  </div>
                  <div className="mt-4 grid grid-cols-4 gap-2">
                    {[
                      [offer.deal, 'Deal'],
                      [offer.price, 'Price'],
                      [`${offer.daysLeft}d`, 'Left'],
                      [String(offer.bookings), 'Bookings'],
                    ].map(([value, label]) => (
                      <div key={label} className="rounded-2xl bg-gray-50 px-2 py-2 text-center">
                        <p className="text-[12px] font-bold text-gray-900">{value}</p>
                        <p className="mt-0.5 text-[9px] text-gray-400">{label}</p>
                      </div>
                    ))}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {isBanner && (
          <div>
            <p className="mb-3 px-0.5 text-[15px] font-bold text-gray-900">Banner campaigns</p>
            <div className="space-y-3">
              {BANNER_CAMPAIGNS.map(campaign => (
                <button
                  key={campaign.title}
                  onClick={() =>
                    navigate('offer-approval', {
                      ...campaignDraft,
                      title: campaign.title,
                      duration: campaign.duration,
                      target: campaign.target,
                      ctaLabel: campaign.cta,
                      promoFee: String(numberFromDuration(campaign.duration) * BANNER_RATE_PER_WEEK),
                    })
                  }
                  className="w-full rounded-2xl bg-white p-4 text-left shadow-sm transition-transform active:scale-[0.99]"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-50">
                        <LayoutTemplate size={18} className="text-brand-500" />
                      </div>
                      <div>
                        <p className="text-[14px] font-bold text-gray-900">{campaign.title}</p>
                        <p className="mt-0.5 text-[11px] text-gray-400">Homepage banner · {campaign.target}</p>
                      </div>
                    </div>
                    <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${campaign.status === 'Pending review' ? 'bg-amber-50 text-amber-600' : 'bg-green-50 text-green-600'}`}>
                      {campaign.status}
                    </span>
                  </div>
                  <div className="mt-4 grid grid-cols-3 gap-2">
                    {[
                      [campaign.duration, 'Duration'],
                      [`${numberFromDuration(campaign.duration) * BANNER_RATE_PER_WEEK} QR`, 'Budget'],
                      [campaign.cta, 'CTA'],
                    ].map(([value, label]) => (
                      <div key={label} className="rounded-2xl bg-gray-50 px-2 py-2 text-center">
                        <p className="text-[12px] font-bold text-gray-900">{value}</p>
                        <p className="mt-0.5 text-[9px] text-gray-400">{label}</p>
                      </div>
                    ))}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
