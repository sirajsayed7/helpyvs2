import { ArrowLeft, MapPin, Phone, MessageCircle, CheckCircle2, Clock, Navigation } from 'lucide-react'
import { useNav } from '../context/NavContext'
import { StatusBar } from '../components/shared'

const STEPS=[
  {label:'Booking Confirmed',  done:true,  time:'9:00 AM'},
  {label:'On the Way',         done:true,  time:'9:45 AM'},
  {label:'Arrived at Location',done:true,  time:'10:05 AM'},
  {label:'Service In Progress',done:true,  time:'10:10 AM'},
  {label:'Job Completed',      done:false, time:'—'},
]

export default function OngoingServicePage(){
  const {goBack,navigate,params}=useNav()
  const b=params||{name:'Sara Al Mannai',service:'Deep Cleaning',location:'Al Sadd, Doha',time:'09:00 AM',av:'S',price:'280.00'}
  return(
    <div className="flex flex-col flex-1 bg-[#F4F6FF] overflow-hidden">
      <StatusBar/>
      <div className="flex items-center gap-3 px-4 pt-2 pb-3">
        <button onClick={goBack} className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center"><ArrowLeft size={20} className="text-gray-600"/></button>
        <div><h1 className="text-[18px] font-bold text-gray-900">Job In Progress</h1><p className="text-[11px] text-green-500 font-semibold">● Live tracking active</p></div>
      </div>
      <div className="flex-1 overflow-y-auto px-4 pb-6 space-y-4">
        {/* Client */}
        <div className="bg-white rounded-2xl shadow-sm p-4 flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-sky-400 flex items-center justify-center text-white text-xl font-bold">{b.av||b.name?.[0]}</div>
          <div className="flex-1">
            <p className="text-[16px] font-bold text-gray-900">{b.name}</p>
            <p className="text-[13px] text-brand-500 font-semibold">{b.service}</p>
            <div className="flex items-center gap-1 mt-1"><MapPin size={12} className="text-gray-400"/><span className="text-[11px] text-gray-500">{b.location}</span></div>
          </div>
          <span className="bg-amber-100 text-amber-600 text-[11px] font-bold px-3 py-1 rounded-full">In Progress</span>
        </div>
        {/* Map placeholder */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden" style={{height:180}}>
          <div className="w-full h-full bg-gradient-to-br from-blue-50 to-blue-100 flex flex-col items-center justify-center gap-2 relative">
            <div className="absolute inset-0 opacity-10" style={{backgroundImage:'repeating-linear-gradient(0deg,#3B5BF6 0,#3B5BF6 1px,transparent 1px,transparent 40px),repeating-linear-gradient(90deg,#3B5BF6 0,#3B5BF6 1px,transparent 1px,transparent 40px)'}}/>
            <Navigation size={32} className="text-brand-500"/>
            <p className="text-[13px] font-bold text-brand-500">Live Location Active</p>
            <p className="text-[11px] text-gray-400">{b.location}</p>
            <div className="absolute bottom-3 right-3 bg-white rounded-xl px-3 py-1.5 shadow-sm flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"/><span className="text-[11px] font-semibold text-gray-700">On-site</span></div>
          </div>
        </div>
        {/* Progress tracker */}
        <div className="bg-white rounded-2xl shadow-sm p-5">
          <p className="text-[15px] font-bold text-gray-900 mb-4">Service Progress</p>
          <div className="relative">
            {STEPS.map((s,i)=>(
              <div key={i} className="flex items-start gap-3 mb-4">
                <div className="flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${s.done?'bg-brand-500':'bg-gray-100'}`}>
                    {s.done?<CheckCircle2 size={16} className="text-white"/>:<Clock size={14} className="text-gray-400"/>}
                  </div>
                  {i<STEPS.length-1&&<div className={`w-0.5 h-8 mt-1 ${s.done&&STEPS[i+1].done?'bg-brand-500':'bg-gray-200'}`}/>}
                </div>
                <div className="flex-1 pt-1">
                  <p className={`text-[13px] font-semibold ${s.done?'text-gray-900':'text-gray-400'}`}>{s.label}</p>
                  <p className="text-[11px] text-gray-400 mt-0.5">{s.time}</p>
                </div>
                {i===3&&<span className="text-[10px] font-bold text-amber-500 bg-amber-50 px-2 py-0.5 rounded-full">NOW</span>}
              </div>
            ))}
          </div>
        </div>
        {/* Timer */}
        <div className="bg-brand-500 rounded-2xl p-5 text-center">
          <p className="text-white/80 text-[13px] mb-1">Time Elapsed</p>
          <p className="text-white text-[36px] font-bold tracking-widest">01:24:33</p>
          <p className="text-white/70 text-[12px] mt-1">Started at 10:10 AM</p>
        </div>
        {/* Actions */}
        <div className="flex gap-3">
          <button onClick={()=>navigate('chat',b)} className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl bg-white shadow-sm text-gray-700 text-[13px] font-semibold"><MessageCircle size={16}/>Message</button>
          <button className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl bg-white shadow-sm text-gray-700 text-[13px] font-semibold"><Phone size={16}/>Call Client</button>
        </div>
        <button className="w-full py-4 rounded-2xl bg-green-500 text-white text-[14px] font-bold shadow-sm">✓ Mark Job as Completed</button>
      </div>
    </div>
  )
}
