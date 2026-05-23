import { ArrowLeft, MapPin, CalendarDays, Clock, MessageCircle, Phone, Star, CheckCircle2, AlertCircle } from 'lucide-react'
import { useNav } from '../context/NavContext'
import { StatusBar } from '../components/shared'

export default function BookingDetail() {
  const { goBack, params, navigate } = useNav()
  const b = params || { name:'Aisha Al Thani', service:'General Cleaning', date:'May 30, 2024', time:'12:00 PM', location:'Viva Bahriya, The Pearl-Qatar', status:'Confirmed', avatar:'A', price:'180.00' }
  const isPending = b.status === 'Pending'
  const isCompleted = b.status === 'Completed'
  const isCancelled = b.status === 'Cancelled'

  const statusColor = isPending ? 'bg-orange-100 text-orange-500' : isCompleted ? 'bg-blue-100 text-blue-600' : isCancelled ? 'bg-red-100 text-red-500' : 'bg-green-100 text-green-600'

  return (
    <div className="flex flex-col flex-1 bg-[#F4F6FF] overflow-hidden">
      <StatusBar />
      <div className="flex items-center gap-3 px-4 pt-2 pb-4">
        <button onClick={goBack} className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center">
          <ArrowLeft size={20} className="text-gray-600" />
        </button>
        <h1 className="text-[18px] font-bold text-gray-900">Booking Details</h1>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-6 space-y-4">
        {/* Client card */}
        <div className="bg-white rounded-2xl shadow-sm p-5">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-rose-300 to-rose-500 flex items-center justify-center text-white text-xl font-bold">
              {b.avatar}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <p className="text-[17px] font-bold text-gray-900">{b.name}</p>
                <span className={`text-[11px] font-semibold px-3 py-1 rounded-full ${statusColor}`}>{b.status}</span>
              </div>
              <p className="text-[13px] text-brand-500 font-semibold mt-0.5">{b.service}</p>
              <div className="flex items-center gap-1 mt-1">
                <Star size={12} className="text-amber-400 fill-amber-400" />
                <span className="text-[12px] text-gray-500">4.9 rating • 12 bookings</span>
              </div>
            </div>
          </div>
        </div>

        {/* Details */}
        <div className="bg-white rounded-2xl shadow-sm p-5 space-y-4">
          <p className="text-[14px] font-bold text-gray-800">Booking Information</p>
          {[
            { icon: CalendarDays, label: 'Date', value: b.date },
            { icon: Clock, label: 'Time', value: b.time },
            { icon: MapPin, label: 'Location', value: b.location },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center">
                <Icon size={16} className="text-brand-500" />
              </div>
              <div>
                <p className="text-[11px] text-gray-400">{label}</p>
                <p className="text-[13px] font-semibold text-gray-800">{value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Price */}
        <div className="bg-white rounded-2xl shadow-sm p-5">
          <p className="text-[14px] font-bold text-gray-800 mb-3">Payment Summary</p>
          <div className="space-y-2">
            <div className="flex justify-between"><span className="text-[13px] text-gray-500">Service fee</span><span className="text-[13px] font-semibold text-gray-800">{b.price || '180.00'} QR</span></div>
            <div className="flex justify-between"><span className="text-[13px] text-gray-500">Platform fee</span><span className="text-[13px] font-semibold text-gray-800">18.00 QR</span></div>
            <div className="h-px bg-gray-100 my-2" />
            <div className="flex justify-between"><span className="text-[14px] font-bold text-gray-900">Total</span><span className="text-[14px] font-bold text-brand-500">{b.price || '180.00'} QR</span></div>
          </div>
        </div>

        {/* Special instructions */}
        <div className="bg-white rounded-2xl shadow-sm p-5">
          <p className="text-[14px] font-bold text-gray-800 mb-2">Special Instructions</p>
          <p className="text-[13px] text-gray-500 leading-relaxed">Please bring eco-friendly cleaning supplies. The client has a small dog — please be careful when entering. Focus on kitchen and bathrooms.</p>
        </div>

        {/* Status-specific info */}
        {isCancelled && (
          <div className="bg-red-50 rounded-2xl p-4 flex gap-3">
            <AlertCircle size={20} className="text-red-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-[13px] font-bold text-red-600">Booking Cancelled</p>
              <p className="text-[12px] text-red-400 mt-0.5">This booking was cancelled by the client on May 26, 2024. No charges applied.</p>
            </div>
          </div>
        )}
        {isCompleted && (
          <div className="bg-green-50 rounded-2xl p-4 flex gap-3">
            <CheckCircle2 size={20} className="text-green-500 shrink-0 mt-0.5" />
            <div>
              <p className="text-[13px] font-bold text-green-700">Job Completed</p>
              <p className="text-[12px] text-green-600 mt-0.5">Payment of {b.price || '180.00'} QR has been added to your wallet.</p>
            </div>
          </div>
        )}

        {/* Actions */}
        {!isCancelled && !isCompleted && (
          <div className="flex gap-3 pb-2">
            <button onClick={() => navigate('chat', b)} className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl border border-gray-200 bg-white text-gray-700 text-[13px] font-semibold">
              <MessageCircle size={16} /> Message
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl border border-gray-200 bg-white text-gray-700 text-[13px] font-semibold">
              <Phone size={16} /> Call
            </button>
          </div>
        )}
        {isPending && (
          <button className="w-full py-3.5 rounded-2xl bg-brand-500 text-white text-[14px] font-bold shadow-sm">
            ✓ Accept Booking
          </button>
        )}
      </div>
    </div>
  )
}
