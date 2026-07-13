import { ArrowLeft, ChevronRight, Star, TrendingUp } from 'lucide-react'
import { useNav } from '../context/NavContext'
import { StatusBar } from '../components/shared'

const SERVICES=[
  {name:'General Cleaning',   price:'150 QR',duration:'2-3 hrs',bookings:45,rating:4.9,trend:'+12%',color:'bg-blue-100',   tc:'text-blue-600',   emoji:'🧹'},
  {name:'Deep Cleaning',      price:'280 QR',duration:'4-6 hrs',bookings:23,rating:4.8,trend:'+8%', color:'bg-purple-100', tc:'text-purple-600', emoji:'✨'},
  {name:'Move-in / Move-out', price:'350 QR',duration:'5-7 hrs',bookings:12,rating:4.9,trend:'+5%', color:'bg-teal-100',   tc:'text-teal-600',   emoji:'📦'},
  {name:'Office Cleaning',    price:'200 QR',duration:'3-4 hrs',bookings:3, rating:4.7,trend:'+2%', color:'bg-orange-100', tc:'text-orange-600', emoji:'🏢'},
]

export default function ServicesListPage(){
  const {goBack,navigate}=useNav()
  return(
    <div className="flex flex-col flex-1 bg-[#F4F6FF] overflow-y-auto">
      <StatusBar/>
      <div className="flex items-center justify-between px-4 pt-2 pb-3">
        <div className="flex items-center gap-3">
          <button onClick={goBack} className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center"><ArrowLeft size={20} className="text-gray-600"/></button>
          <div><h1 className="text-[18px] font-bold text-gray-900">My Services</h1><p className="text-[11px] text-gray-400">{SERVICES.length} active services</p></div>
        </div>
        <button onClick={()=>navigate('manage-services')} className="text-brand-500 text-[12px] font-semibold bg-blue-50 px-3 py-2 rounded-xl">Manage</button>
      </div>
      <div className="flex-1 overflow-visible px-4 pb-6 space-y-3">
        {SERVICES.map(s=>(
          <button key={s.name} onClick={()=>navigate('manage-services')} className="w-full bg-white rounded-2xl shadow-sm p-4 text-left">
            <div className="flex items-start gap-3">
              <div className={`w-12 h-12 rounded-xl ${s.color} flex items-center justify-center shrink-0 text-2xl`}>{s.emoji}</div>
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <p className="text-[14px] font-bold text-gray-900">{s.name}</p>
                  <ChevronRight size={16} className="text-gray-300"/>
                </div>
                <p className={`text-[12px] font-semibold ${s.tc} mt-0.5`}>{s.price} · {s.duration}</p>
                <div className="flex items-center gap-3 mt-2">
                  <div className="flex items-center gap-1"><Star size={11} className="text-amber-400 fill-amber-400"/><span className="text-[11px] font-semibold text-gray-700">{s.rating}</span></div>
                  <span className="text-[11px] text-gray-400">{s.bookings} bookings</span>
                  <div className="flex items-center gap-0.5"><TrendingUp size={11} className="text-green-500"/><span className="text-[11px] font-semibold text-green-500">{s.trend}</span></div>
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
