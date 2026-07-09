import { CheckCircle2, Eye, Home, LayoutTemplate, Megaphone } from 'lucide-react'
import { StatusBar } from '../components/shared'
import { useNav } from '../context/NavContext'

export default function OfferSuccessPage() {
  const { navigate, params } = useNav()
  const title = params?.title || 'Summer Cleaning Deal'
  const target = params?.target || 'General Cleaning'
  const duration = params?.duration || '7 days'
  const promoFee = params?.promoFee || '133'
  const isBanner = params?.promotionKind === 'banner'

  return (
    <div className="flex flex-col flex-1 bg-[#F4F6FF] overflow-hidden">
      <StatusBar />
      <div className="flex-1 overflow-y-auto px-4 pb-6 pt-8">
        <div className="bg-white rounded-3xl shadow-sm p-6 text-center">
          <div className="mx-auto w-20 h-20 rounded-full bg-green-50 flex items-center justify-center">
            <CheckCircle2 size={44} className="text-green-500" />
          </div>
          <h1 className="text-[24px] font-bold text-gray-900 mt-5">{isBanner ? 'Banner submitted' : 'Payment successful'}</h1>
          <p className="text-[13px] text-gray-500 leading-relaxed mt-2">
            {isBanner
              ? 'Your homepage banner advert has been submitted for approval and the reservation payment has been captured.'
              : 'Your promotion is now queued for the customer app and will start showing shortly.'}
          </p>

          <div className="mt-6 rounded-3xl bg-gray-50 p-4 text-left">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-brand-50 flex items-center justify-center">
                {isBanner ? <LayoutTemplate size={20} className="text-brand-500" /> : <Megaphone size={20} className="text-brand-500" />}
              </div>
              <div>
                <p className="text-[14px] font-bold text-gray-900">{title}</p>
                <p className="text-[11px] text-gray-400">{isBanner ? 'Homepage banner' : target}</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 mt-4">
              <div className="rounded-2xl bg-white px-3 py-2">
                <p className="text-[10px] text-gray-400">Status</p>
                <p className={`text-[13px] font-bold ${isBanner ? 'text-amber-500' : 'text-green-500'}`}>{isBanner ? 'In review' : 'Active soon'}</p>
              </div>
              <div className="rounded-2xl bg-white px-3 py-2">
                <p className="text-[10px] text-gray-400">Duration</p>
                <p className="text-[13px] font-bold text-gray-900">{duration}</p>
              </div>
              <div className="rounded-2xl bg-white px-3 py-2">
                <p className="text-[10px] text-gray-400">Paid</p>
                <p className="text-[13px] font-bold text-gray-900">{promoFee} QR</p>
              </div>
            </div>
          </div>

          {isBanner && (
            <div className="mt-4 rounded-2xl bg-amber-50 px-4 py-3 text-left">
              <p className="text-[12px] font-bold text-amber-700">Next step</p>
              <p className="mt-1 text-[11px] leading-relaxed text-amber-600">
                Once approved, the banner will appear in the featured homepage slot and route customers into {target}.
              </p>
            </div>
          )}

          <div className="mt-6 space-y-3">
            <button onClick={() => navigate('offers', { scrollToTop: Date.now() })} className="w-full bg-brand-500 text-white rounded-2xl py-4 flex items-center justify-center gap-2">
              <Eye size={18} />
              <span className="text-[14px] font-bold">View promotions</span>
            </button>
            <button onClick={() => navigate('home')} className="w-full bg-gray-100 text-gray-700 rounded-2xl py-4 flex items-center justify-center gap-2">
              <Home size={18} />
              <span className="text-[14px] font-bold">Back to home</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
