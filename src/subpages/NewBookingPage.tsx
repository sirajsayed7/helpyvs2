import { useState } from 'react'
import { ArrowLeft, CalendarDays, MapPin, Clock, ChevronDown, CheckCircle2 } from 'lucide-react'
import { useNav } from '../context/NavContext'
import { StatusBar } from '../components/shared'

const SERVICES=['General Cleaning','Deep Cleaning','Move-in / Move-out','Office Cleaning']
const TIMES=['8:00 AM','9:00 AM','10:00 AM','11:00 AM','12:00 PM','1:00 PM','2:00 PM','3:00 PM','4:00 PM']

export default function NewBookingPage(){
  const {goBack}=useNav()
  const [service,setService]=useState(SERVICES[0])
  const [date,setDate]=useState('2024-06-10')
  const [time,setTime]=useState('10:00 AM')
  const [location,setLocation]=useState('')
  const [notes,setNotes]=useState('')
  const [done,setDone]=useState(false)

  if(done)return(
    <div className="flex flex-col flex-1 bg-[#F4F6FF] items-center justify-center px-8 gap-4">
      <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center"><CheckCircle2 size={40} className="text-green-500"/></div>
      <p className="text-[22px] font-bold text-gray-900 text-center">Booking Created!</p>
      <p className="text-[13px] text-gray-500 text-center leading-relaxed">Your new booking for <strong>{service}</strong> on <strong>{date}</strong> at <strong>{time}</strong> has been submitted.</p>
      <button onClick={goBack} className="w-full py-3.5 rounded-2xl bg-brand-500 text-white text-[14px] font-bold mt-4">Back to Bookings</button>
    </div>
  )

  return(
    <div className="flex flex-col flex-1 bg-[#F4F6FF] overflow-hidden">
      <StatusBar/>
      <div className="flex items-center gap-3 px-4 pt-2 pb-3">
        <button onClick={goBack} className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center"><ArrowLeft size={20} className="text-gray-600"/></button>
        <div><h1 className="text-[18px] font-bold text-gray-900">New Booking</h1><p className="text-[11px] text-gray-400">Fill in the details below</p></div>
      </div>
      <div className="flex-1 overflow-y-auto px-4 pb-6 space-y-4">
        {/* Service */}
        <div className="bg-white rounded-2xl shadow-sm p-5 space-y-3">
          <p className="text-[14px] font-bold text-gray-800">Service Type</p>
          <div className="grid grid-cols-2 gap-2">
            {SERVICES.map(s=>(
              <button key={s} onClick={()=>setService(s)}
                className={`py-2.5 px-3 rounded-xl text-[12px] font-semibold text-left transition-all ${service===s?'bg-brand-500 text-white':'bg-gray-50 text-gray-700'}`}>{s}</button>
            ))}
          </div>
        </div>
        {/* Date & Time */}
        <div className="bg-white rounded-2xl shadow-sm p-5 space-y-4">
          <p className="text-[14px] font-bold text-gray-800">Date & Time</p>
          <div>
            <p className="text-[11px] text-gray-400 mb-1.5 flex items-center gap-1"><CalendarDays size={12}/>Select Date</p>
            <input type="date" value={date} onChange={e=>setDate(e.target.value)} className="w-full bg-gray-50 rounded-xl px-4 py-3 text-[13px] font-semibold text-gray-800 outline-none"/>
          </div>
          <div>
            <p className="text-[11px] text-gray-400 mb-1.5 flex items-center gap-1"><Clock size={12}/>Select Time</p>
            <div className="flex gap-2 flex-wrap">
              {TIMES.map(t=>(
                <button key={t} onClick={()=>setTime(t)}
                  className={`px-3 py-1.5 rounded-xl text-[12px] font-semibold transition-all ${time===t?'bg-brand-500 text-white':'bg-gray-50 text-gray-600'}`}>{t}</button>
              ))}
            </div>
          </div>
        </div>
        {/* Location */}
        <div className="bg-white rounded-2xl shadow-sm p-5 space-y-3">
          <p className="text-[14px] font-bold text-gray-800">Location</p>
          <div className="flex items-center gap-2 bg-gray-50 rounded-xl px-3 py-3">
            <MapPin size={16} className="text-brand-500 shrink-0"/>
            <input value={location} onChange={e=>setLocation(e.target.value)} placeholder="Enter service address..." className="flex-1 bg-transparent text-[13px] outline-none placeholder:text-gray-400"/>
          </div>
          {['Viva Bahriya, The Pearl','West Bay, Doha','Lusail City','Al Sadd, Doha'].map(a=>(
            <button key={a} onClick={()=>setLocation(a)} className="w-full flex items-center gap-2 text-left py-2 border-b border-gray-50 last:border-0">
              <MapPin size={13} className="text-gray-400"/><span className="text-[12px] text-gray-600">{a}</span>
            </button>
          ))}
        </div>
        {/* Notes */}
        <div className="bg-white rounded-2xl shadow-sm p-5">
          <p className="text-[14px] font-bold text-gray-800 mb-2">Special Notes</p>
          <textarea value={notes} onChange={e=>setNotes(e.target.value)} placeholder="Any special instructions..." rows={3} className="w-full bg-gray-50 rounded-xl px-4 py-3 text-[13px] outline-none placeholder:text-gray-400 resize-none"/>
        </div>
        {/* Summary */}
        <div className="bg-blue-50 rounded-2xl p-4 space-y-2">
          <p className="text-[13px] font-bold text-gray-800">Booking Summary</p>
          <div className="flex justify-between"><span className="text-[12px] text-gray-500">Service</span><span className="text-[12px] font-semibold text-gray-800">{service}</span></div>
          <div className="flex justify-between"><span className="text-[12px] text-gray-500">Date</span><span className="text-[12px] font-semibold text-gray-800">{date}</span></div>
          <div className="flex justify-between"><span className="text-[12px] text-gray-500">Time</span><span className="text-[12px] font-semibold text-gray-800">{time}</span></div>
          <div className="h-px bg-blue-100"/>
          <div className="flex justify-between"><span className="text-[13px] font-bold text-gray-900">Estimated Fee</span><span className="text-[13px] font-bold text-brand-500">{service==='Deep Cleaning'?'280':service==='Move-in / Move-out'?'350':service==='Office Cleaning'?'200':'150'}.00 QR</span></div>
        </div>
        <button onClick={()=>setDone(true)} className="w-full py-4 rounded-2xl bg-brand-500 text-white text-[14px] font-bold shadow-sm">Confirm Booking</button>
      </div>
    </div>
  )
}
