import { CheckCircle2, Eye, Home, Megaphone } from 'lucide-react'
import { StatusBar } from '../components/shared'
import { useNav } from '../context/NavContext'

export default function OfferSuccessPage() {
  const { navigate, params } = useNav()
  const title = params?.title || 'Summer Cleaning Deal'
  const target = params?.target || 'General Cleaning'
  const duration = params?.duration || '7 days'

  return (
    <div className="flex flex-col flex-1 bg-[#F4F6FF] overflow-hidden">
      <StatusBar />
      <div className="flex-1 overflow-y-auto px-4 pb-6 pt-8">
        <div className="bg-white rounded-3xl shadow-sm p-6 text-center">
          <div className="mx-auto w-20 h-20 rounded-full bg-green-50 flex items-center justify-center">
            <CheckCircle2 size={44} className="text-green-500" />
          </div>
          <h1 className="text-[24px] font-bold text-gray-900 mt-5">Payment successful</h1>
          <p className="text-[13px] text-gray-500 leading-relaxed mt-2">Your promotion is now queued for the customer app and will start showing shortly.</p>

          <div className="mt-6 rounded-3xl bg-gray-50 p-4 text-left">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-brand-50 flex items-center justify-center">
                <Megaphone size={20} className="text-brand-500" />
              </div>
              <div>
                <p className="text-[14px] font-bold text-gray-900">{title}</p>
                <p className="text-[11px] text-gray-400">{target}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-4">
              <div className="rounded-2xl bg-white px-3 py-2">
                <p className="text-[10px] text-gray-400">Status</p>
                <p className="text-[13px] font-bold text-green-500">Active soon</p>
              </div>
              <div className="rounded-2xl bg-white px-3 py-2">
                <p className="text-[10px] text-gray-400">Duration</p>
                <p className="text-[13px] font-bold text-gray-900">{duration}</p>
              </div>
            </div>
          </div>

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
