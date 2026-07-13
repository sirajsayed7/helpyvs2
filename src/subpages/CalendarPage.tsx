import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react'
import { useState } from 'react'
import { useNav } from '../context/NavContext'
import { StatusBar } from '../components/shared'

const DAYS = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December']

const BOOKED = [3,7,12,14,18,20,24,27,30]
const EVENTS: Record<number,{time:string,name:string,service:string}[]> = {
  3: [{time:'10:00 AM',name:'Layla Hassan',service:'General Cleaning'}],
  7: [{time:'09:00 AM',name:'Sara Al Mannai',service:'Deep Cleaning'}],
  12: [{time:'12:00 PM',name:'Aisha Al Thani',service:'General Cleaning'},{time:'03:00 PM',name:'Nour Al Thani',service:'Deep Cleaning'}],
  14: [{time:'02:00 PM',name:'Fatima Noor',service:'Move-in/Move-out'}],
  18: [{time:'11:00 AM',name:'Reem Al Sulaiti',service:'General Cleaning'}],
  20: [{time:'09:00 AM',name:'Omar Al Farsi',service:'Move-in/Move-out'}],
  24: [{time:'01:00 PM',name:'Khalid Al Dosari',service:'Office Cleaning'}],
  27: [{time:'10:00 AM',name:'Hassan Al Kuwari',service:'Office Cleaning'}],
  30: [{time:'12:00 PM',name:'Aisha Al Thani',service:'General Cleaning'}],
}

export default function CalendarPage() {
  const { goBack } = useNav()
  const [month, setMonth] = useState(4) // May = index 4
  const [year] = useState(2024)
  const [selected, setSelected] = useState(12)

  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  return (
    <div className="flex flex-col flex-1 bg-[#F4F6FF] overflow-y-auto">
      <StatusBar />
      <div className="flex items-center gap-3 px-4 pt-2 pb-3">
        <button onClick={goBack} className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center">
          <ArrowLeft size={20} className="text-gray-600" />
        </button>
        <h1 className="text-[18px] font-bold text-gray-900">My Calendar</h1>
      </div>

      <div className="flex-1 overflow-visible px-4 pb-6 space-y-4">
        <div className="bg-white rounded-2xl shadow-sm p-4">
          {/* Month nav */}
          <div className="flex items-center justify-between mb-4">
            <button onClick={() => setMonth(m => Math.max(0,m-1))} className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center">
              <ChevronLeft size={18} className="text-gray-600" />
            </button>
            <p className="text-[15px] font-bold text-gray-900">{MONTHS[month]} {year}</p>
            <button onClick={() => setMonth(m => Math.min(11,m+1))} className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center">
              <ChevronRight size={18} className="text-gray-600" />
            </button>
          </div>
          {/* Day headers */}
          <div className="grid grid-cols-7 mb-2">
            {DAYS.map(d => <p key={d} className="text-center text-[11px] font-semibold text-gray-400">{d}</p>)}
          </div>
          {/* Cells */}
          <div className="grid grid-cols-7 gap-y-1">
            {Array.from({length: firstDay}).map((_,i) => <div key={'e'+i}/>)}
            {Array.from({length: daysInMonth}).map((_,i) => {
              const day = i + 1
              const hasBooking = BOOKED.includes(day)
              const isSelected = selected === day
              return (
                <button key={day} onClick={() => setSelected(day)}
                  className={`aspect-square rounded-xl flex flex-col items-center justify-center text-[12px] font-semibold transition-all
                    ${isSelected ? 'bg-brand-500 text-white shadow-sm' : hasBooking ? 'bg-blue-50 text-brand-500' : 'text-gray-700 hover:bg-gray-50'}`}>
                  {day}
                  {hasBooking && !isSelected && <span className="w-1 h-1 rounded-full bg-brand-500 mt-0.5"/>}
                </button>
              )
            })}
          </div>
        </div>

        {/* Events for selected day */}
        <div>
          <p className="text-[15px] font-bold text-gray-900 mb-3">
            {EVENTS[selected] ? `${EVENTS[selected].length} Booking${EVENTS[selected].length > 1 ? 's' : ''} — ${MONTHS[month]} ${selected}` : `No bookings on ${MONTHS[month]} ${selected}`}
          </p>
          {(EVENTS[selected] || []).map((ev,i) => (
            <div key={i} className="bg-white rounded-2xl shadow-sm p-4 mb-3 flex items-center gap-3">
              <div className="w-2 h-12 rounded-full bg-brand-500"/>
              <div>
                <p className="text-[13px] font-bold text-gray-900">{ev.name}</p>
                <p className="text-[12px] text-brand-500 font-semibold">{ev.service}</p>
                <p className="text-[11px] text-gray-400 mt-0.5">🕐 {ev.time}</p>
              </div>
            </div>
          ))}
          {!EVENTS[selected] && (
            <div className="bg-white rounded-2xl shadow-sm p-8 flex flex-col items-center gap-2">
              <span className="text-4xl">📅</span>
              <p className="text-[13px] font-semibold text-gray-400">No bookings scheduled</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
