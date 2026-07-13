import { ArrowLeft, BadgeCheck, CalendarDays, CheckCircle2, Clock3, CreditCard, Edit3, FileImage, LayoutTemplate, ShieldCheck, Wand2 } from 'lucide-react'
import { StatusBar } from '../components/shared'
import { useNav } from '../context/NavContext'

const DEFAULT_APPROVAL = {
  promotionKind: 'banner',
  title: 'Uploaded homepage banner',
  description: 'Put your featured offer on the customer app homepage banner carousel.',
  bannerCreativeMode: 'upload',
  bannerFileName: '',
  bannerDesignBrief: 'Create a clean homepage banner for a trusted cleaning service in Qatar, using a bright city-service feel and clear booking CTA.',
  ctaLabel: 'Book Now',
  target: 'General Cleaning',
  duration: '1 week',
  promoFee: '199',
}

export default function OfferApprovalPage() {
  const { goBack, navigate, params } = useNav()
  const draft = { ...DEFAULT_APPROVAL, ...(params || {}) }
  const isBanner = draft.promotionKind === 'banner'
  const isUpload = draft.bannerCreativeMode !== 'request'
  const creativeLabel = isUpload ? 'Uploaded banner image' : 'Requested banner design'
  const creativeDetail = isUpload ? draft.bannerFileName || 'Image pending upload' : draft.bannerDesignBrief

  return (
    <div className="flex flex-col flex-1 bg-[#F4F6FF] overflow-y-auto">
      <StatusBar />
      <div className="flex items-center gap-3 px-4 pt-2 pb-3">
        <button onClick={goBack} className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center">
          <ArrowLeft size={20} className="text-gray-600" />
        </button>
        <div>
          <h1 className="text-[18px] font-bold text-gray-900">Approval Review</h1>
          <p className="text-[11px] text-gray-400">Submit and confirm campaign details</p>
        </div>
      </div>

      <div className="flex-1 overflow-visible px-4 pb-6 space-y-4">
        <div className="rounded-3xl bg-white p-4 shadow-sm">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-brand-50 flex items-center justify-center">
                <LayoutTemplate size={22} className="text-brand-500" />
              </div>
              <div>
                <p className="text-[15px] font-bold text-gray-900">{creativeLabel}</p>
                <p className="text-[11px] text-gray-400">{isBanner ? 'Homepage banner advert' : 'Promotion campaign'}</p>
              </div>
            </div>
            <span className="rounded-full bg-amber-50 px-2.5 py-1 text-[10px] font-bold text-amber-600">Pending review</span>
          </div>

          <div className="mt-4 rounded-3xl border border-gray-100 bg-gradient-to-br from-sky-50 via-white to-amber-50 p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand-500">Customer homepage banner</p>
                <p className="mt-2 text-[21px] font-bold leading-tight text-slate-900">{creativeLabel}</p>
                <p className="mt-2 max-w-[220px] text-[12px] leading-relaxed text-slate-600">{creativeDetail}</p>
              </div>
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-3xl bg-brand-100/70">
                {isUpload ? <FileImage size={24} className="text-brand-500" /> : <Wand2 size={24} className="text-brand-500" />}
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between border-t border-white/80 pt-3">
              <span className="rounded-full bg-brand-500 px-3 py-2 text-[11px] font-bold text-white">{draft.ctaLabel}</span>
              <span className="text-[11px] font-semibold text-slate-500">{draft.target}</span>
            </div>
          </div>
        </div>

        <div className="rounded-3xl bg-white p-4 shadow-sm">
          <p className="text-[15px] font-bold text-gray-900">Approval checklist</p>
          <div className="mt-4 space-y-3">
            {[
              ['Homepage placement', 'Banner will appear in the customer app featured slot.'],
              ['Creative source', isUpload ? draft.bannerFileName || 'Vendor will upload a banner image.' : 'Helpy design team will create the banner image.'],
              ['Campaign duration', `${draft.duration} at 199 QR per week.`],
              ['Linked service', `Customers will land on ${draft.target}.`],
            ].map(([label, detail]) => (
              <div key={label} className="flex items-start gap-3 rounded-2xl bg-gray-50 px-3.5 py-3">
                <BadgeCheck size={18} className="mt-0.5 shrink-0 text-brand-500" />
                <div>
                  <p className="text-[12px] font-bold text-gray-900">{label}</p>
                  <p className="text-[11px] leading-relaxed text-gray-500">{detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl bg-white p-4 shadow-sm">
          <p className="text-[15px] font-bold text-gray-900">Approval status</p>
          <div className="mt-4 space-y-3">
            <div className="flex items-center gap-3 rounded-2xl bg-green-50 px-3.5 py-3">
              <CheckCircle2 size={18} className="text-green-500" />
              <div>
                <p className="text-[12px] font-bold text-green-700">Draft submitted for approval</p>
                <p className="text-[11px] text-green-600">Campaign content is ready for platform review.</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-2xl bg-amber-50 px-3.5 py-3">
              <Clock3 size={18} className="text-amber-500" />
              <div>
                <p className="text-[12px] font-bold text-amber-700">Estimated review time</p>
                <p className="text-[11px] text-amber-600">Usually reviewed within 2 business hours.</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-2xl bg-slate-50 px-3.5 py-3">
              <ShieldCheck size={18} className="text-slate-500" />
              <div>
                <p className="text-[12px] font-bold text-slate-700">Payment reservation</p>
                <p className="text-[11px] text-slate-500">Proceed to payment to reserve the banner slot for {draft.duration}.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={goBack}
            className="rounded-2xl bg-white py-3.5 text-[13px] font-bold text-gray-700 shadow-sm flex items-center justify-center gap-2"
          >
            <Edit3 size={16} />
            Edit
          </button>
          <button
            type="button"
            onClick={() => navigate('offer-payment', draft)}
            className="rounded-2xl bg-brand-500 py-3.5 text-[13px] font-bold text-white shadow-sm flex items-center justify-center gap-2"
          >
            <CreditCard size={16} />
            Pay {draft.promoFee} QR
          </button>
        </div>

        <div className="rounded-3xl bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-[12px] text-gray-500">Placement</span>
            <span className="text-[13px] font-bold text-gray-900">Customer app homepage</span>
          </div>
          <div className="mt-3 flex items-center justify-between">
            <span className="text-[12px] text-gray-500">Duration</span>
            <span className="flex items-center gap-1 text-[13px] font-bold text-gray-900">
              <CalendarDays size={14} className="text-gray-400" />
              {draft.duration}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
