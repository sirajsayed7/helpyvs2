import { ArrowLeft, Star, Download, ChevronRight, CheckCircle2 } from 'lucide-react'
import { useNav } from '../context/NavContext'
import { StatusBar } from '../components/shared'

const COMPLETED=[
  {name:'Layla Hassan',    service:'General Cleaning',   date:'May 25, 2024',price:'180.00',rating:5, av:'L',bg:'bg-lime-500'},
  {name:'Omar Al Farsi',   service:'Move-in / Move-out', date:'May 22, 2024',price:'350.00',rating:5, av:'O',bg:'bg-violet-400'},
  {name:'Nour Al Thani',   service:'Deep Cleaning',      date:'May 20, 2024',price:'280.00',rating:4, av:'N',bg:'bg-sky-400'},
  {name:'Reem Al Sulaiti', service:'General Cleaning',   date:'May 18, 2024',price:'150.00',rating:4, av:'R',bg:'bg-pink-400'},
  {name:'Fatima Noor',     service:'Move-in / Move-out', date:'May 15, 2024',price:'350.00',rating:5, av:'F',bg:'bg-teal-400'},
  {name:'Ahmed Hassan',    service:'General Cleaning',   date:'May 12, 2024',price:'180.00',rating:5, av:'A',bg:'bg-amber-400'},
  {name:'Sara Al Mannai',  service:'Deep Cleaning',      date:'May 10, 2024',price:'280.00',rating:5, av:'S',bg:'bg-rose-400'},
]

export default function CompletedServicePage(){
  const {goBack,navigate}=useNav()
  const total=COMPLETED.reduce((s,c)=>s+parseFloat(c.price),0).toFixed(2)
  return(
    <div className="flex flex-col flex-1 bg-[#F4F6FF] overflow-y-auto">
      <StatusBar/>
      <div className="flex items-center gap-3 px-4 pt-2 pb-3">
        <button onClick={goBack} className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center"><ArrowLeft size={20} className="text-gray-600"/></button>
        <div><h1 className="text-[18px] font-bold text-gray-900">Completed Services</h1><p className="text-[11px] text-gray-400">{COMPLETED.length} jobs this month</p></div>
      </div>
      <div className="flex-1 overflow-visible px-4 pb-6 space-y-4">
        {/* Summary */}
        <div className="rounded-2xl p-5" style={{background:'linear-gradient(135deg,#22C55E,#16A34A)'}}>
          <div className="flex items-center gap-2 mb-1"><CheckCircle2 size={18} className="text-white"/><p className="text-white/80 text-[13px] font-medium">Total Earned This Month</p></div>
          <p className="text-white text-[32px] font-bold tracking-tight">{total} QR</p>
          <div className="flex items-center gap-4 mt-3">
            <div><p className="text-white/70 text-[11px]">Jobs Done</p><p className="text-white text-[18px] font-bold">{COMPLETED.length}</p></div>
            <div><p className="text-white/70 text-[11px]">Avg Rating</p><p className="text-white text-[18px] font-bold">4.9 ⭐</p></div>
            <div><p className="text-white/70 text-[11px]">On Time</p><p className="text-white text-[18px] font-bold">100%</p></div>
          </div>
        </div>
        {/* List */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden divide-y divide-gray-50">
          {COMPLETED.map((c,i)=>(
            <button key={i} onClick={()=>navigate('booking-detail',{...c,status:'Completed',avatar:c.av})} className="w-full flex items-center gap-3 p-4 active:bg-gray-50 text-left">
              <div className={`w-11 h-11 rounded-full ${c.bg} flex items-center justify-center text-white font-bold`}>{c.av}</div>
              <div className="flex-1">
                <p className="text-[13px] font-bold text-gray-900">{c.name}</p>
                <p className="text-[11px] text-gray-400">{c.service} · {c.date}</p>
                <div className="flex gap-0.5 mt-1">{[1,2,3,4,5].map(s=><Star key={s} size={10} className={s<=c.rating?'text-amber-400 fill-amber-400':'text-gray-200 fill-gray-200'}/>)}</div>
              </div>
              <div className="text-right"><p className="text-[14px] font-bold text-green-500">+{c.price} QR</p><div className="flex items-center gap-1 mt-1 justify-end"><Download size={12} className="text-gray-400"/><span className="text-[11px] text-gray-400">Receipt</span></div></div>
              <ChevronRight size={14} className="text-gray-300"/>
            </button>
          ))}
        </div>
        <button onClick={()=>navigate('all-transactions')} className="w-full py-3.5 rounded-2xl bg-white shadow-sm text-brand-500 text-[13px] font-bold border border-blue-100">View All Transactions →</button>
      </div>
    </div>
  )
}
