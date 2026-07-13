import { ArrowLeft, ChevronRight, Search } from 'lucide-react'
import { useState } from 'react'
import { useNav } from '../context/NavContext'
import { StatusBar } from '../components/shared'

const ALL_TX = [
  { name:'Aisha Al Thani',  service:'General Cleaning',   amount:'+180.00', date:'May 30, 2024', type:'credit' },
  { name:'Fatima Noor',     service:'Move-in / Move-out', amount:'+250.00', date:'May 30, 2024', type:'credit' },
  { name:'Mohammed Khalid', service:'Deep Cleaning',      amount:'+200.00', date:'May 30, 2024', type:'credit' },
  { name:'Sara Al Mannai',  service:'Deep Cleaning',      amount:'+280.00', date:'May 29, 2024', type:'credit' },
  { name:'Bank Transfer',   service:'Withdrawal',          amount:'-1500.00',date:'May 28, 2024', type:'debit'  },
  { name:'Reem Al Sulaiti', service:'General Cleaning',   amount:'+150.00', date:'May 25, 2024', type:'credit' },
  { name:'Omar Al Farsi',   service:'Move-in / Move-out', amount:'+320.00', date:'May 22, 2024', type:'credit' },
  { name:'Bank Transfer',   service:'Withdrawal',          amount:'-2000.00',date:'May 20, 2024', type:'debit'  },
  { name:'Nour Al Thani',   service:'Deep Cleaning',      amount:'+260.00', date:'May 18, 2024', type:'credit' },
  { name:'Khalid Al Dosari',service:'Office Cleaning',    amount:'+190.00', date:'May 15, 2024', type:'credit' },
]

export default function AllTransactionsPage() {
  const { goBack } = useNav()
  const [filter, setFilter] = useState<'all'|'credit'|'debit'>('all')
  const filtered = ALL_TX.filter(t => filter === 'all' || t.type === filter)

  return (
    <div className="flex flex-col flex-1 bg-[#F4F6FF] overflow-y-auto">
      <StatusBar />
      <div className="flex items-center gap-3 px-4 pt-2 pb-3">
        <button onClick={goBack} className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center">
          <ArrowLeft size={20} className="text-gray-600" />
        </button>
        <h1 className="text-[18px] font-bold text-gray-900">All Transactions</h1>
      </div>

      <div className="px-4 pb-3 flex gap-2">
        {(['all','credit','debit'] as const).map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-4 py-1.5 rounded-full text-[12px] font-semibold transition-all ${filter===f ? 'bg-brand-500 text-white' : 'bg-white text-gray-500 shadow-sm'}`}>
            {f === 'all' ? 'All' : f === 'credit' ? '↑ Earnings' : '↓ Withdrawals'}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-visible px-4 pb-6">
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden divide-y divide-gray-50">
          {filtered.map((t,i) => (
            <div key={i} className="flex items-center gap-3 p-4">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${t.type==='credit' ? 'bg-green-50' : 'bg-red-50'}`}>
                <span className={`text-lg font-bold ${t.type==='credit' ? 'text-green-500' : 'text-red-400'}`}>{t.type==='credit' ? '↑' : '↓'}</span>
              </div>
              <div className="flex-1">
                <p className="text-[13px] font-bold text-gray-900">{t.name}</p>
                <p className="text-[11px] text-gray-400">{t.service} · {t.date}</p>
              </div>
              <p className={`text-[14px] font-bold ${t.type==='credit' ? 'text-green-500' : 'text-red-400'}`}>{t.amount} QR</p>
              <ChevronRight size={14} className="text-gray-300"/>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
