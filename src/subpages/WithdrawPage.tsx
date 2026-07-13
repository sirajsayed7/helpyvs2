import { useState } from 'react'
import { ArrowLeft, ChevronRight, Building2, CreditCard, Smartphone } from 'lucide-react'
import { useNav } from '../context/NavContext'
import { StatusBar } from '../components/shared'

const METHODS = [
  { id:'bank', icon:Building2, label:'Bank Transfer',  sub:'QNB Bank •••• 4521', color:'bg-blue-50', tc:'text-blue-500' },
  { id:'card', icon:CreditCard,label:'Debit Card',     sub:'Visa •••• 8834',     color:'bg-purple-50', tc:'text-purple-500' },
  { id:'qpay', icon:Smartphone, label:'QPay',          sub:'Linked mobile wallet', color:'bg-green-50', tc:'text-green-500' },
]
const PRESETS = ['500','1000','2000','4250']

export default function WithdrawPage() {
  const { goBack } = useNav()
  const [amount, setAmount] = useState('4250')
  const [method, setMethod] = useState('bank')
  const [done, setDone] = useState(false)

  if (done) return (
    <div className="flex flex-col flex-1 bg-[#F4F6FF] items-center justify-center px-8 gap-4">
      <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center text-4xl">✅</div>
      <p className="text-[20px] font-bold text-gray-900 text-center">Withdrawal Requested!</p>
      <p className="text-[13px] text-gray-500 text-center leading-relaxed">{amount} QR will be transferred to your {METHODS.find(m=>m.id===method)?.label} within 1–3 business days.</p>
      <button onClick={goBack} className="w-full py-3.5 rounded-2xl bg-brand-500 text-white text-[14px] font-bold mt-4">Back to Earnings</button>
    </div>
  )

  return (
    <div className="flex flex-col flex-1 bg-[#F4F6FF] overflow-y-auto">
      <StatusBar />
      <div className="flex items-center gap-3 px-4 pt-2 pb-3">
        <button onClick={goBack} className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center">
          <ArrowLeft size={20} className="text-gray-600" />
        </button>
        <div>
          <h1 className="text-[18px] font-bold text-gray-900">Withdraw Funds</h1>
          <p className="text-[11px] text-gray-400">Available: 4,250.00 QR</p>
        </div>
      </div>

      <div className="flex-1 overflow-visible px-4 pb-6 space-y-4">
        {/* Amount input */}
        <div className="bg-white rounded-2xl shadow-sm p-5">
          <p className="text-[13px] font-semibold text-gray-500 mb-3">Withdrawal Amount</p>
          <div className="flex items-center gap-3 bg-gray-50 rounded-2xl px-4 py-3">
            <span className="text-[20px] font-bold text-gray-400">QR</span>
            <input type="number" value={amount} onChange={e => setAmount(e.target.value)}
              className="flex-1 bg-transparent text-[28px] font-bold text-gray-900 outline-none" />
          </div>
          <div className="flex gap-2 mt-3">
            {PRESETS.map(p => (
              <button key={p} onClick={() => setAmount(p)}
                className={`flex-1 py-2 rounded-xl text-[12px] font-semibold transition-all ${amount===p ? 'bg-brand-500 text-white' : 'bg-gray-100 text-gray-600'}`}>
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* Payment method */}
        <div className="bg-white rounded-2xl shadow-sm p-5">
          <p className="text-[13px] font-semibold text-gray-500 mb-3">Payment Method</p>
          <div className="space-y-2">
            {METHODS.map(m => (
              <button key={m.id} onClick={() => setMethod(m.id)}
                className={`w-full flex items-center gap-3 p-3 rounded-xl border-2 transition-all ${method===m.id ? 'border-brand-500 bg-blue-50' : 'border-gray-100 bg-gray-50'}`}>
                <div className={`w-10 h-10 rounded-xl ${m.color} flex items-center justify-center`}>
                  <m.icon size={18} className={m.tc}/>
                </div>
                <div className="flex-1 text-left">
                  <p className="text-[13px] font-bold text-gray-900">{m.label}</p>
                  <p className="text-[11px] text-gray-400">{m.sub}</p>
                </div>
                <div className={`w-4 h-4 rounded-full border-2 ${method===m.id ? 'border-brand-500 bg-brand-500' : 'border-gray-300'} flex items-center justify-center`}>
                  {method===m.id && <span className="w-1.5 h-1.5 rounded-full bg-white"/>}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Summary */}
        <div className="bg-white rounded-2xl shadow-sm p-5 space-y-2">
          <div className="flex justify-between"><span className="text-[13px] text-gray-500">Withdrawal amount</span><span className="text-[13px] font-semibold">{amount} QR</span></div>
          <div className="flex justify-between"><span className="text-[13px] text-gray-500">Processing fee</span><span className="text-[13px] font-semibold text-green-500">FREE</span></div>
          <div className="h-px bg-gray-100"/>
          <div className="flex justify-between"><span className="text-[14px] font-bold text-gray-900">You receive</span><span className="text-[14px] font-bold text-brand-500">{amount} QR</span></div>
        </div>

        <button onClick={() => setDone(true)}
          className="w-full py-4 rounded-2xl bg-brand-500 text-white text-[14px] font-bold shadow-sm">
          Confirm Withdrawal → {amount} QR
        </button>
      </div>
    </div>
  )
}
