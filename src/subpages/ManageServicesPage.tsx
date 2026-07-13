import { useState } from 'react'
import { ArrowLeft, Plus, Edit2, Trash2, ToggleLeft, ToggleRight } from 'lucide-react'
import { useNav } from '../context/NavContext'
import { StatusBar } from '../components/shared'

const INIT_SERVICES = [
  { id:1, name:'General Cleaning',   price:'150',  duration:'2-3 hrs', active:true,  bookings:45, color:'bg-blue-100',   textColor:'text-blue-600' },
  { id:2, name:'Deep Cleaning',      price:'280',  duration:'4-6 hrs', active:true,  bookings:23, color:'bg-purple-100', textColor:'text-purple-600' },
  { id:3, name:'Move-in / Move-out', price:'350',  duration:'5-7 hrs', active:true,  bookings:12, color:'bg-teal-100',   textColor:'text-teal-600' },
  { id:4, name:'Office Cleaning',    price:'200',  duration:'3-4 hrs', active:false, bookings:3,  color:'bg-orange-100', textColor:'text-orange-600' },
]

export default function ManageServicesPage() {
  const { goBack } = useNav()
  const [services, setServices] = useState(INIT_SERVICES)
  const toggle = (id: number) => setServices(s => s.map(x => x.id === id ? {...x, active: !x.active} : x))
  const remove = (id: number) => setServices(s => s.filter(x => x.id !== id))

  return (
    <div className="flex flex-col flex-1 bg-[#F4F6FF] overflow-y-auto">
      <StatusBar />
      <div className="flex items-center justify-between px-4 pt-2 pb-3">
        <div className="flex items-center gap-3">
          <button onClick={goBack} className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center">
            <ArrowLeft size={20} className="text-gray-600" />
          </button>
          <div>
            <h1 className="text-[18px] font-bold text-gray-900">Manage Services</h1>
            <p className="text-[11px] text-gray-400">{services.filter(s => s.active).length} active services</p>
          </div>
        </div>
        <button className="flex items-center gap-1.5 bg-brand-500 text-white text-[12px] font-semibold px-3 py-2 rounded-xl">
          <Plus size={14}/> Add
        </button>
      </div>

      <div className="flex-1 overflow-visible px-4 pb-6 space-y-3">
        {services.map(s => (
          <div key={s.id} className={`bg-white rounded-2xl shadow-sm p-4 transition-opacity ${s.active ? '' : 'opacity-65'}`}>
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <div className={`w-10 h-10 rounded-xl ${s.color} flex items-center justify-center shrink-0`}>
                  <span className="text-lg">🧹</span>
                </div>
                <div>
                  <p className="text-[14px] font-bold text-gray-900">{s.name}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${s.color} ${s.textColor}`}>{s.duration}</span>
                  </div>
                </div>
              </div>
              <button onClick={() => toggle(s.id)} className="shrink-0">
                {s.active
                  ? <ToggleRight size={28} className="text-brand-500"/>
                  : <ToggleLeft size={28} className="text-gray-300"/>}
              </button>
            </div>

            <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-50">
              <div className="flex items-center gap-4">
                <div><p className="text-[10px] text-gray-400">Price</p><p className="text-[14px] font-bold text-gray-900">{s.price} QR</p></div>
                <div><p className="text-[10px] text-gray-400">Bookings</p><p className="text-[14px] font-bold text-gray-900">{s.bookings}</p></div>
                <div><p className="text-[10px] text-gray-400">Status</p><p className={`text-[11px] font-bold ${s.active ? 'text-green-500' : 'text-gray-400'}`}>{s.active ? 'Active' : 'Paused'}</p></div>
              </div>
              <div className="flex gap-2">
                <button className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center"><Edit2 size={14} className="text-brand-500"/></button>
                <button onClick={() => remove(s.id)} className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center"><Trash2 size={14} className="text-red-400"/></button>
              </div>
            </div>
          </div>
        ))}

        {/* Tips */}
        <div className="bg-blue-50 rounded-2xl p-4">
          <p className="text-[13px] font-bold text-gray-800">💡 Pro Tip</p>
          <p className="text-[12px] text-gray-500 mt-1 leading-relaxed">Vendors with 3+ active services get 40% more bookings. Consider adding Office Cleaning to your lineup!</p>
        </div>
      </div>
    </div>
  )
}
