import { useEffect, useState } from 'react'
import { ArrowLeft, Cloud, Loader2 } from 'lucide-react'
import { useNav } from '../context/NavContext'
import { StatusBar } from '../components/shared'
import { listAvailability, marketplaceConfigured, saveAvailability } from '../lib/marketplace'

const DAYS_OF_WEEK = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']
const TIME_SLOTS = ['6:00 AM','7:00 AM','8:00 AM','9:00 AM','10:00 AM','11:00 AM','12:00 PM','1:00 PM','2:00 PM','3:00 PM','4:00 PM','5:00 PM','6:00 PM','7:00 PM','8:00 PM']
const DAY_INDEX: Record<string, number> = { Sunday: 0, Monday: 1, Tuesday: 2, Wednesday: 3, Thursday: 4, Friday: 5, Saturday: 6 }
type DaySchedule = { active: boolean; start: string; end: string }

const toDatabaseTime = (value: string) => {
  const [clock, period] = value.split(' ')
  const [rawHour, minute] = clock.split(':').map(Number)
  const hour = period === 'PM' && rawHour !== 12 ? rawHour + 12 : period === 'AM' && rawHour === 12 ? 0 : rawHour
  return `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`
}

const fromDatabaseTime = (value: string) => {
  const [rawHour, minute] = value.slice(0, 5).split(':').map(Number)
  const period = rawHour >= 12 ? 'PM' : 'AM'
  return `${rawHour % 12 || 12}:${String(minute).padStart(2, '0')} ${period}`
}

const INITIAL_SCHEDULE: Record<string, DaySchedule> = {
  Monday: {active:true, start:'8:00 AM', end:'6:00 PM'}, Tuesday: {active:true, start:'8:00 AM', end:'6:00 PM'},
  Wednesday: {active:true, start:'8:00 AM', end:'6:00 PM'}, Thursday: {active:true, start:'8:00 AM', end:'6:00 PM'},
  Friday: {active:true, start:'9:00 AM', end:'4:00 PM'}, Saturday: {active:true, start:'10:00 AM', end:'3:00 PM'},
  Sunday: {active:false, start:'9:00 AM', end:'5:00 PM'},
}

export default function AvailabilityPage() {
  const { goBack } = useNav()
  const [schedule, setSchedule] = useState<Record<string, DaySchedule>>(INITIAL_SCHEDULE)
  const [saved, setSaved] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    void listAvailability().then(days => {
      if (!days.length) return
      setSchedule(current => Object.fromEntries(DAYS_OF_WEEK.map(day => {
        const value = days.find(item => item.day_of_week === DAY_INDEX[day])
        return [day, value ? { active: value.enabled, start: fromDatabaseTime(value.start_time), end: fromDatabaseTime(value.end_time) } : current[day]]
      })))
    }).catch(cause => setError(cause instanceof Error ? cause.message : 'Unable to load availability'))
  }, [])

  const toggle = (day: string) => setSchedule(current => ({...current, [day]: {...current[day], active: !current[day].active}}))
  const update = (day: string, field: 'start'|'end', value: string) => setSchedule(current => ({...current, [day]: {...current[day], [field]: value}}))

  const persist = async () => {
    setSaving(true)
    setError('')
    try {
      await saveAvailability(DAYS_OF_WEEK.map(day => ({ day_of_week: DAY_INDEX[day], enabled: schedule[day].active, start_time: toDatabaseTime(schedule[day].start), end_time: toDatabaseTime(schedule[day].end) })))
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Unable to save availability')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="flex flex-1 flex-col overflow-y-auto bg-[#F4F6FF]">
      <StatusBar />
      <div className="flex items-center gap-3 px-4 pb-3 pt-2">
        <button onClick={goBack} className="flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-sm"><ArrowLeft size={20} className="text-gray-600" /></button>
        <div><h1 className="text-[18px] font-bold text-gray-900">Availability</h1><p className="text-[11px] text-gray-400">Set the hours customers can book</p></div>
      </div>

      <div className="flex-1 space-y-3 overflow-visible px-4 pb-6">
        <div className={`flex items-center gap-2 rounded-2xl px-3 py-2 text-[11px] font-semibold ${marketplaceConfigured ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}><Cloud size={14} /> {marketplaceConfigured ? 'Customer availability sync is active' : 'Demo mode — connect Supabase for customer sync'}</div>
        {error && <div className="rounded-2xl bg-red-50 px-4 py-3 text-[11px] font-semibold text-red-600">{error}</div>}

        <div className="flex flex-wrap gap-2">{DAYS_OF_WEEK.filter(day => schedule[day].active).map(day => <span key={day} className="rounded-full bg-blue-50 px-3 py-1 text-[11px] font-semibold text-brand-500">{day.slice(0,3)}</span>)}</div>

        {DAYS_OF_WEEK.map(day => {
          const value = schedule[day]
          return (
            <div key={day} className={`rounded-2xl bg-white p-4 shadow-sm transition-opacity ${value.active ? '' : 'opacity-60'}`}>
              <div className="mb-3 flex items-center justify-between">
                <p className="text-[14px] font-bold text-gray-900">{day}</p>
                <button onClick={() => toggle(day)} className={`relative h-6 w-11 rounded-full transition-colors ${value.active ? 'bg-brand-500' : 'bg-gray-200'}`}><span className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition-all ${value.active ? 'left-6' : 'left-1'}`}/></button>
              </div>
              {value.active ? (
                <div className="flex items-center gap-3">
                  <div className="flex-1"><p className="mb-1 text-[10px] text-gray-400">Start</p><select value={value.start} onChange={event => update(day,'start',event.target.value)} className="w-full rounded-xl bg-gray-50 px-3 py-2 text-[12px] font-semibold text-gray-800 outline-none">{TIME_SLOTS.map(time => <option key={time}>{time}</option>)}</select></div>
                  <span className="mt-4 text-gray-400">→</span>
                  <div className="flex-1"><p className="mb-1 text-[10px] text-gray-400">End</p><select value={value.end} onChange={event => update(day,'end',event.target.value)} className="w-full rounded-xl bg-gray-50 px-3 py-2 text-[12px] font-semibold text-gray-800 outline-none">{TIME_SLOTS.map(time => <option key={time}>{time}</option>)}</select></div>
                </div>
              ) : <p className="text-[12px] text-gray-400">Day off</p>}
            </div>
          )
        })}

        <button onClick={() => void persist()} disabled={saving} className={`w-full rounded-2xl py-4 text-[14px] font-bold text-white shadow-sm transition-colors ${saved ? 'bg-green-500' : 'bg-brand-500'} disabled:opacity-60`}>
          {saving ? <span className="flex items-center justify-center gap-2"><Loader2 size={16} className="animate-spin"/> Saving…</span> : saved ? '✓ Availability Saved!' : 'Save Availability'}
        </button>
      </div>
    </div>
  )
}
