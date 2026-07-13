import { ArrowLeft, Clock, ChevronRight, AlertCircle } from 'lucide-react'
import { useNav } from '../context/NavContext'
import { StatusBar } from '../components/shared'

const PENDING=[
  {name:'Aisha Al Thani',  service:'General Cleaning',   amount:'180.00',date:'May 30, 2024',eta:'Jun 2, 2024'},
  {name:'Fatima Noor',     service:'Move-in / Move-out', amount:'250.00',date:'Jun 1, 2024', eta:'Jun 4, 2024'},
  {name:'Ahmed Hassan',    service:'General Cleaning',   amount:'150.00',date:'Jun 2, 2024', eta:'Jun 5, 2024'},
  {name:'Sara Al Mannai',  service:'Deep Cleaning',      amount:'280.00',date:'Jun 3, 2024', eta:'Jun 6, 2024'},
]

export default function PendingPayoutPage(){
  const {goBack,navigate}=useNav()
  const total=PENDING.reduce((s,p)=>s+parseFloat(p.amount),0).toFixed(2)
  return(
    <div className="flex flex-col flex-1 bg-[#F4F6FF] overflow-y-auto">
      <StatusBar/>
      <div className="flex items-center gap-3 px-4 pt-2 pb-3">
        <button onClick={goBack} className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center"><ArrowLeft size={20} className="text-gray-600"/></button>
        <div><h1 className="text-[18px] font-bold text-gray-900">Pending Payout</h1><p className="text-[11px] text-gray-400">Will be paid within 1-3 business days</p></div>
      </div>
      <div className="flex-1 overflow-visible px-4 pb-6 space-y-4">
        {/* Total */}
        <div className="bg-white rounded-2xl shadow-sm p-5 flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-purple-100 flex items-center justify-center shrink-0"><Clock size={24} className="text-purple-500"/></div>
          <div>
            <p className="text-[13px] text-gray-500">Total Pending</p>
            <p className="text-[28px] font-bold text-gray-900">{total} QR</p>
            <div className="flex items-center gap-1 mt-0.5"><AlertCircle size={12} className="text-amber-500"/><p className="text-[11px] text-amber-600 font-semibold">Processing — ETA 3 business days</p></div>
          </div>
        </div>
        <p className="text-[15px] font-bold text-gray-900 px-0.5">Pending Payments</p>
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden divide-y divide-gray-50">
          {PENDING.map((p,i)=>(
            <div key={i} className="flex items-center gap-3 p-4">
              <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center shrink-0"><Clock size={16} className="text-purple-500"/></div>
              <div className="flex-1">
                <p className="text-[13px] font-bold text-gray-900">{p.name}</p>
                <p className="text-[11px] text-gray-400">{p.service} · {p.date}</p>
                <p className="text-[10px] text-amber-500 font-semibold mt-0.5">ETA: {p.eta}</p>
              </div>
              <p className="text-[14px] font-bold text-gray-900">{p.amount} QR</p>
              <ChevronRight size={14} className="text-gray-300"/>
            </div>
          ))}
        </div>
        <div className="bg-amber-50 rounded-2xl p-4">
          <p className="text-[13px] font-bold text-amber-800 mb-1">ℹ️ About Pending Payouts</p>
          <p className="text-[12px] text-amber-700 leading-relaxed">Payments are processed within 1-3 business days after job completion. Funds are transferred to your registered bank account or wallet automatically.</p>
        </div>
        <button onClick={()=>navigate('withdraw')} className="w-full py-3.5 rounded-2xl bg-brand-500 text-white text-[14px] font-bold">Request Early Withdrawal</button>
      </div>
    </div>
  )
}
