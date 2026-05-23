import { useState } from 'react'
import { ArrowLeft, ChevronRight } from 'lucide-react'
import { useNav } from '../context/NavContext'
import { StatusBar } from '../components/shared'

const DAYS_OF_WEEK = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']
const TIME_SLOTS = ['6:00 AM','7:00 AM','8:00 AM','9:00 AM','10:00 AM','11:00 AM','12:00 PM','1:00 PM','2:00 PM','3:00 PM','4:00 PM','5:00 PM','6:00 PM','7:00 PM','8:00 PM']

type DaySchedule = { active: boolean; start: string; end: string }

export default function AvailabilityPage() {
  const { goBack } = useNav()
  const [schedule, setSchedule] = useState<Record<string,DaySchedule>>({
    Monday:    {active:true,  start:'8:00 AM',  end:'6:00 PM'},
    Tuesday:   {active:true,  start:'8:00 AM',  end:'6:00 PM'},
    Wednesday: {active:true,  start:'8:00 AM',  end:'6:00 PM'},
    Thursday:  {active:true,  start:'8:00 AM',  end:'6:00 PM'},
    Friday:    {active:true,  start:'9:00 AM',  end:'4:00 PM'},
    Saturday:  {active:true,  start:'10:00 AM', end:'3:00 PM'},
    Sunday:    {active:false, start:'9:00 AM',  end:'5:00 PM'},
  })
  const [saved, setSaved] = useState(false)

  const toggle = (day: string) => setSchedule(s => ({...s, [day]: {...s[day], active: !s[day].active}}))
  const update = (day: string, field: 'start'|'end', val: string) => setSchedule(s => ({...s, [day]: {...s[day], [field]: val}}))

  return (
    <div className="flex flex-col flex-1 bg-[#F4F6FF] overflow-hidden">
      <StatusBar />
      <div className="flex items-center gap-3 px-4 pt-2 pb-3">
        <button onClick={goBack} className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center">
          <ArrowLeft size={20} className="text-gray-600" />
        </button>
        <div>
          <h1 className="text-[18px] font-bold text-gray-900">Availability</h1>
          <p className="text-[11px] text-gray-400">Set your working hours</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-6 space-y-3">
        {/* Summary chips */}
        <div className="flex gap-2 flex-wrap">
          {DAYS_OF_WEEK.filter(d => schedule[d].active).map(d => (
            <span key={d} className="text-[11px] font-semibold text-brand-500 bg-blue-50 px-3 py-1 rounded-full">{d.slice(0,3)}</span>
          ))}
        </div>

        {DAYS_OF_WEEK.map(day => {
          const s = schedule[day]
          return (
            <div key={day} className={`bg-white rounded-2xl shadow-sm p-4 transition-opacity ${s.active ? '' : 'opacity-60'}`}>
              <div className="flex items-center justify-between mb-3">
                <p className="text-[14px] font-bold text-gray-900">{day}</p>
                {/* Toggle */}
                <button onClick={() => toggle(day)}
                  className={`w-11 h-6 rounded-full transition-colors relative ${s.active ? 'bg-brand-500' : 'bg-gray-200'}`}>
                  <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-all ${s.active ? 'left-6' : 'left-1'}`}/>
                </button>
              </div>
              {s.active && (
                <div className="flex items-center gap-3">
                  <div className="flex-1">
                    <p className="text-[10px] text-gray-400 mb-1">Start</p>
                    <select value={s.start} onChange={e => update(day,'start',e.target.value)}
                      className="w-full text-[12px] font-semibold text-gray-800 bg-gray-50 rounded-xl px-3 py-2 border-none outline-none">
                      {TIME_SLOTS.map(t => <option key={t}>{t}</option>)}
                    </select>
                  </div>
                  <span className="text-gray-400 mt-4">→</span>
                  <div className="flex-1">
                    <p className="text-[10px] text-gray-400 mb-1">End</p>
                    <select value={s.end} onChange={e => update(day,'end',e.target.value)}
                      className="w-full text-[12px] font-semibold text-gray-800 bg-gray-50 rounded-xl px-3 py-2 border-none outline-none">
                      {TIME_SLOTS.map(t => <option key={t}>{t}</option>)}
                    </select>
                  </div>
                </div>
              )}
              {!s.active && <p className="text-[12px] text-gray-400">Day off</p>}
            </div>
          )
        })}

        <button onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 2000) }}
          className={`w-full py-4 rounded-2xl text-white text-[14px] font-bold shadow-sm transition-colors ${saved ? 'bg-green-500' : 'bg-brand-500'}`}>
          {saved ? '✓ Availability Saved!' : 'Save Availability'}
        </button>
      </div>
    </div>
  )
}
