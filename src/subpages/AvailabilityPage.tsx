import { useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { ArrowLeft, ArrowRight, Check, ChevronDown, Clock3, Cloud, Coffee, Loader2, Plus, Sparkles, Trash2, X } from 'lucide-react'
import { useNav } from '../context/NavContext'
import { StatusBar } from '../components/shared'
import { listAvailability, marketplaceConfigured, saveAvailability } from '../lib/marketplace'

const DAYS_OF_WEEK = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']
const DAY_INDEX: Record<string, number> = { Sunday: 0, Monday: 1, Tuesday: 2, Wednesday: 3, Thursday: 4, Friday: 5, Saturday: 6 }
const MAX_PERIODS = 3

type TimePeriod = { id: string; start: string; end: string }
type DaySchedule = { active: boolean; periods: TimePeriod[] }

const formatMinutesAsTime = (minutes: number) => {
  const rawHour = Math.floor(minutes / 60)
  const minute = minutes % 60
  const period = rawHour >= 12 ? 'PM' : 'AM'
  return `${rawHour % 12 || 12}:${String(minute).padStart(2, '0')} ${period}`
}

const HOURS = Array.from({ length: 12 }, (_, index) => index + 1)
const MINUTES = Array.from({ length: 60 }, (_, index) => index)

const toMinutes = (value: string) => {
  const [clock, period] = value.split(' ')
  const [rawHour, minute] = clock.split(':').map(Number)
  const hour = period === 'PM' && rawHour !== 12 ? rawHour + 12 : period === 'AM' && rawHour === 12 ? 0 : rawHour
  return hour * 60 + minute
}

const toDatabaseTime = (value: string) => {
  const minutes = toMinutes(value)
  return `${String(Math.floor(minutes / 60)).padStart(2, '0')}:${String(minutes % 60).padStart(2, '0')}`
}

const fromDatabaseTime = (value: string) => {
  const [rawHour, minute] = value.slice(0, 5).split(':').map(Number)
  return formatMinutesAsTime(rawHour * 60 + minute)
}

const newPeriodId = () => `${Date.now()}-${Math.random().toString(36).slice(2)}`

const formatDuration = (minutes: number) => {
  if (minutes < 0) return 'Invalid time'
  if (minutes === 0) return '0h'
  const hours = Math.floor(minutes / 60)
  const remainder = minutes % 60
  if (!hours) return `${remainder} min`
  return `${hours}h${remainder ? ` ${remainder}m` : ''}`
}

const scheduleIssue = (value: DaySchedule) => {
  if (!value.active) return ''
  for (let index = 0; index < value.periods.length; index += 1) {
    const period = value.periods[index]
    if (toMinutes(period.start) >= toMinutes(period.end)) return `Period ${index + 1} must end after it starts.`
    if (index > 0 && toMinutes(value.periods[index - 1].end) >= toMinutes(period.start)) return `Period ${index + 1} must start after the previous period ends.`
  }
  return ''
}

const INITIAL_SCHEDULE: Record<string, DaySchedule> = {
  Monday: {active:true, periods:[{id:'mon-1',start:'8:00 AM',end:'6:00 PM'}]},
  Tuesday: {active:true, periods:[{id:'tue-1',start:'8:00 AM',end:'6:00 PM'}]},
  Wednesday: {active:true, periods:[{id:'wed-1',start:'8:00 AM',end:'6:00 PM'}]},
  Thursday: {active:true, periods:[{id:'thu-1',start:'8:00 AM',end:'6:00 PM'}]},
  Friday: {active:true, periods:[{id:'fri-1',start:'9:00 AM',end:'4:00 PM'}]},
  Saturday: {active:true, periods:[{id:'sat-1',start:'10:00 AM',end:'3:00 PM'}]},
  Sunday: {active:false, periods:[{id:'sun-1',start:'9:00 AM',end:'5:00 PM'}]},
}

function TimePicker({ label, value, onChange }: {
  label: string
  value: string
  onChange: (value: string) => void
}) {
  const [open, setOpen] = useState(false)
  const hourListRef = useRef<HTMLDivElement>(null)
  const minuteListRef = useRef<HTMLDivElement>(null)
  const [clock, period] = value.split(' ')
  const [hourValue, minuteValue] = clock.split(':').map(Number)

  useEffect(() => {
    if (!open) return
    window.setTimeout(() => {
      if (hourListRef.current) hourListRef.current.scrollTop = Math.max(0, (hourValue - 1) * 38 - 55)
      if (minuteListRef.current) minuteListRef.current.scrollTop = Math.max(0, minuteValue * 38 - 55)
    }, 0)
  }, [open, hourValue, minuteValue])

  const updateTime = (nextHour = hourValue, nextMinute = minuteValue, nextPeriod = period) => {
    onChange(`${nextHour}:${String(nextMinute).padStart(2, '0')} ${nextPeriod}`)
  }

  return (
    <div className="relative min-w-0">
      <span className="mb-1 block text-[9px] font-bold uppercase tracking-wide text-slate-400">{label}</span>
      <button type="button" onClick={() => setOpen(current => !current)} aria-haspopup="dialog" aria-expanded={open} className={`flex h-10 w-full items-center gap-1.5 rounded-xl border bg-white px-2 text-left transition ${open ? 'border-blue-300 ring-2 ring-blue-100' : 'border-slate-100'}`}>
        <Clock3 size={13} className="shrink-0 text-blue-500" />
        <span className="min-w-0 flex-1 truncate text-[11px] font-bold text-slate-800">{value}</span>
        <ChevronDown size={12} className={`shrink-0 text-slate-400 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && createPortal(
        <div className="fixed inset-0 z-[300] flex items-end justify-center bg-slate-950/45 p-3 backdrop-blur-[3px] sm:items-center" onMouseDown={() => setOpen(false)}>
          <div className="w-full max-w-[390px] overflow-hidden rounded-[28px] border border-white bg-white shadow-[0_28px_80px_rgba(15,43,75,0.34)]" role="dialog" aria-modal="true" aria-label={`${label} time picker`} onMouseDown={event => event.stopPropagation()}>
            <div className="h-1.5 bg-gradient-to-r from-blue-600 to-cyan-500" />
            <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3.5">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-50 text-blue-600"><Clock3 size={18} /></span>
                <div><p className="text-[14px] font-extrabold text-slate-900">Choose {label.toLowerCase()} time</p><p className="text-[10px] text-slate-400">Select any hour and minute</p></div>
              </div>
              <button type="button" onClick={() => setOpen(false)} className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-500"><X size={17} /></button>
            </div>

            <div className="px-4 pt-4">
              <div className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-50 to-cyan-50 py-3">
                <Clock3 size={17} className="text-blue-600" />
                <span className="text-[22px] font-extrabold tracking-tight text-blue-700">{value}</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 px-4 py-4">
              <div className="min-w-0">
                <p className="mb-1.5 text-center text-[9px] font-extrabold uppercase tracking-[0.12em] text-slate-400">Hour</p>
                <div ref={hourListRef} className="h-[168px] space-y-1 overflow-y-auto rounded-2xl bg-slate-50 p-1.5 [scrollbar-width:thin]" role="listbox" aria-label="Hour">
                  {HOURS.map(hour => <button key={hour} type="button" onClick={() => updateTime(hour)} className={`flex h-9 w-full items-center justify-center rounded-xl text-[12px] font-bold transition ${hour === hourValue ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 hover:bg-white'}`}>{hour}</button>)}
                </div>
              </div>
              <div className="min-w-0">
                <p className="mb-1.5 text-center text-[9px] font-extrabold uppercase tracking-[0.12em] text-slate-400">Minute</p>
                <div ref={minuteListRef} className="h-[168px] space-y-1 overflow-y-auto rounded-2xl bg-slate-50 p-1.5 [scrollbar-width:thin]" role="listbox" aria-label="Minute">
                  {MINUTES.map(minute => <button key={minute} type="button" onClick={() => updateTime(hourValue, minute)} className={`flex h-9 w-full items-center justify-center rounded-xl text-[12px] font-bold transition ${minute === minuteValue ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 hover:bg-white'}`}>{String(minute).padStart(2, '0')}</button>)}
                </div>
              </div>
              <div className="min-w-0">
                <p className="mb-1.5 text-center text-[9px] font-extrabold uppercase tracking-[0.12em] text-slate-400">Period</p>
                <div className="space-y-2 rounded-2xl bg-slate-50 p-1.5">
                  {['AM','PM'].map(nextPeriod => <button key={nextPeriod} type="button" onClick={() => updateTime(hourValue, minuteValue, nextPeriod)} className={`flex h-[52px] w-full items-center justify-center rounded-xl text-[12px] font-extrabold transition ${nextPeriod === period ? 'bg-blue-600 text-white shadow-sm' : 'bg-white text-slate-600'}`}>{nextPeriod}</button>)}
                </div>
              </div>
            </div>

            <div className="px-4 pb-3">
              <p className="mb-2 text-[9px] font-extrabold uppercase tracking-[0.12em] text-slate-400">Quick minutes</p>
              <div className="grid grid-cols-4 gap-2">
                {[0,15,30,45].map(minute => <button key={minute} type="button" onClick={() => updateTime(hourValue, minute)} className={`h-9 rounded-xl text-[11px] font-bold ${minute === minuteValue ? 'bg-blue-50 text-blue-600 ring-1 ring-blue-200' : 'bg-slate-50 text-slate-500'}`}>:{String(minute).padStart(2, '0')}</button>)}
              </div>
            </div>

            <div className="border-t border-slate-100 p-4 pb-[max(16px,env(safe-area-inset-bottom))]">
              <button type="button" onClick={() => setOpen(false)} className="flex h-[50px] w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 text-[14px] font-bold text-white shadow-[0_10px_24px_rgba(37,99,235,0.22)]"><Check size={17} /> Use {value}</button>
            </div>
          </div>
        </div>,
        document.body,
      )}
    </div>
  )
}

function PeriodEditor({ period, index, removable, onChange, onRemove }: {
  period: TimePeriod
  index: number
  removable: boolean
  onChange: (field: 'start' | 'end', value: string) => void
  onRemove: () => void
}) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-slate-50/80 p-3">
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="flex h-6 min-w-6 items-center justify-center rounded-lg bg-white px-2 text-[10px] font-extrabold text-blue-600 shadow-sm">{index + 1}</span>
          <p className="text-[11px] font-bold text-slate-700">Operating period</p>
        </div>
        {removable && <button type="button" onClick={onRemove} aria-label={`Remove operating period ${index + 1}`} className="flex h-7 w-7 items-center justify-center rounded-lg bg-white text-slate-400 shadow-sm transition active:scale-95"><Trash2 size={13} /></button>}
      </div>
      <div className="grid grid-cols-[1fr_auto_1fr] items-end gap-2">
        <TimePicker label="From" value={period.start} onChange={value => onChange('start', value)} />
        <ArrowRight size={14} className="mb-3 text-slate-300" />
        <TimePicker label="Until" value={period.end} onChange={value => onChange('end', value)} />
      </div>
    </div>
  )
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
        if (!value) return [day, current[day]]
        const storedBlocks = Array.isArray(value.time_blocks) ? value.time_blocks : []
        const periods = storedBlocks.length
          ? storedBlocks.map((period, index) => ({ id: `${day}-${index}`, start: fromDatabaseTime(period.start_time), end: fromDatabaseTime(period.end_time) }))
          : [{ id: `${day}-1`, start: fromDatabaseTime(value.start_time), end: fromDatabaseTime(value.end_time) }]
        return [day, { active: value.enabled, periods }]
      })))
    }).catch(cause => setError(cause instanceof Error ? cause.message : 'Unable to load availability'))
  }, [])

  const activeDays = useMemo(() => DAYS_OF_WEEK.filter(day => schedule[day].active), [schedule])
  const weeklyMinutes = useMemo(() => activeDays.reduce((total, day) => total + schedule[day].periods.reduce((sum, period) => sum + Math.max(0, toMinutes(period.end) - toMinutes(period.start)), 0), 0), [activeDays, schedule])

  const toggle = (day: string) => {
    setError('')
    setSchedule(current => ({...current, [day]: {...current[day], active: !current[day].active}}))
  }

  const updatePeriod = (day: string, id: string, field: 'start' | 'end', value: string) => {
    setError('')
    setSchedule(current => ({
      ...current,
      [day]: { ...current[day], periods: current[day].periods.map(period => period.id === id ? { ...period, [field]: value } : period) },
    }))
  }

  const removePeriod = (day: string, id: string) => {
    setError('')
    setSchedule(current => ({ ...current, [day]: { ...current[day], periods: current[day].periods.filter(period => period.id !== id) } }))
  }

  const addBreak = (day: string) => {
    setError('')
    const periods = schedule[day].periods
    if (periods.length >= MAX_PERIODS) return

    let targetIndex = 0
    periods.forEach((period, index) => {
      const duration = toMinutes(period.end) - toMinutes(period.start)
      const longest = toMinutes(periods[targetIndex].end) - toMinutes(periods[targetIndex].start)
      if (duration > longest) targetIndex = index
    })
    const target = periods[targetIndex]
    const start = toMinutes(target.start)
    const end = toMinutes(target.end)
    if (end - start < 120) {
      setError(`${day} needs at least two hours to add a break.`)
      return
    }

    let firstEnd: number
    let secondStart: number
    if (periods.length === 1 && start < 720 && end > 840) {
      firstEnd = 720
      secondStart = 840
    } else {
      const breakLength = end - start >= 180 ? 60 : 30
      firstEnd = Math.floor((start + (end - start - breakLength) / 2) / 30) * 30
      secondStart = firstEnd + breakLength
    }

    const replacement = [
      { ...target, end: formatMinutesAsTime(firstEnd) },
      { id: newPeriodId(), start: formatMinutesAsTime(secondStart), end: target.end },
    ]
    setSchedule(current => ({
      ...current,
      [day]: { ...current[day], periods: current[day].periods.flatMap((period, index) => index === targetIndex ? replacement : [period]) },
    }))
  }

  const persist = async () => {
    const invalidDay = DAYS_OF_WEEK.find(day => scheduleIssue(schedule[day]))
    if (invalidDay) {
      setError(`${invalidDay}: ${scheduleIssue(schedule[invalidDay])}`)
      return
    }
    setSaving(true)
    setError('')
    try {
      await saveAvailability(DAYS_OF_WEEK.map(day => {
        const value = schedule[day]
        const first = value.periods[0]
        const last = value.periods[value.periods.length - 1]
        return {
          day_of_week: DAY_INDEX[day],
          enabled: value.active,
          start_time: toDatabaseTime(first.start),
          end_time: toDatabaseTime(last.end),
          time_blocks: value.periods.map(period => ({ start_time: toDatabaseTime(period.start), end_time: toDatabaseTime(period.end) })),
        }
      }))
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
        <div><h1 className="text-[18px] font-bold text-gray-900">Availability</h1><p className="text-[11px] text-gray-400">Set working periods and breaks</p></div>
      </div>

      <div className="flex-1 space-y-3 overflow-visible px-4 pb-6">
        <div className={`flex items-center gap-2 rounded-2xl px-3 py-2 text-[11px] font-semibold ${marketplaceConfigured ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}><Cloud size={14} /> {marketplaceConfigured ? 'Customer availability sync is active' : 'Demo mode — connect Supabase for customer sync'}</div>
        {error && <div className="rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-[11px] font-semibold text-red-600">{error}</div>}

        <section className="overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 to-cyan-500 p-4 text-white shadow-[0_14px_30px_rgba(37,99,235,0.18)]">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white/20"><Sparkles size={18} /></div>
            <div><p className="text-[14px] font-extrabold">Flexible working hours</p><p className="mt-0.5 text-[10px] leading-4 text-white/75">Split a day into operating periods. The time between periods becomes your break.</p></div>
          </div>
          <div className="mt-3 flex items-center justify-between rounded-2xl bg-white/[0.13] px-3 py-2.5 text-[9px] font-bold">
            <span>9:00 AM</span><ArrowRight size={11} className="text-white/55"/><span>12:00 PM</span><span className="rounded-full bg-white px-2 py-1 text-blue-600">Break</span><span>2:00 PM</span><ArrowRight size={11} className="text-white/55"/><span>9:00 PM</span>
          </div>
        </section>

        <div className="flex items-center justify-between px-1">
          <div className="flex flex-wrap gap-1.5">{activeDays.map(day => <span key={day} className="rounded-full bg-blue-50 px-2.5 py-1 text-[10px] font-bold text-brand-500">{day.slice(0,3)}</span>)}</div>
          <div className="ml-3 flex shrink-0 items-center gap-1 text-[10px] font-bold text-slate-500"><Clock3 size={12} className="text-blue-500" /> {formatDuration(weeklyMinutes)}/week</div>
        </div>

        {DAYS_OF_WEEK.map(day => {
          const value = schedule[day]
          const issue = scheduleIssue(value)
          const dailyMinutes = value.periods.reduce((total, period) => total + Math.max(0, toMinutes(period.end) - toMinutes(period.start)), 0)
          return (
            <div key={day} className={`rounded-3xl border bg-white p-4 shadow-sm transition-opacity ${issue ? 'border-red-200' : 'border-white'} ${value.active ? '' : 'opacity-65'}`}>
              <div className={`${value.active ? 'mb-3' : ''} flex items-center justify-between`}>
                <div>
                  <p className="text-[14px] font-extrabold text-gray-900">{day}</p>
                  <p className="mt-0.5 text-[10px] text-gray-400">{value.active ? `${value.periods.length} operating ${value.periods.length === 1 ? 'period' : 'periods'} · ${formatDuration(dailyMinutes)} available` : 'Not accepting bookings'}</p>
                </div>
                <button type="button" onClick={() => toggle(day)} aria-label={`${value.active ? 'Disable' : 'Enable'} ${day}`} className={`relative h-7 w-12 rounded-full transition-colors ${value.active ? 'bg-brand-500' : 'bg-gray-200'}`}><span className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow-sm transition-all ${value.active ? 'left-6' : 'left-1'}`}/></button>
              </div>

              {value.active && (
                <div className="space-y-2">
                  {value.periods.map((period, index) => {
                    const previous = value.periods[index - 1]
                    const breakMinutes = previous ? toMinutes(period.start) - toMinutes(previous.end) : 0
                    return (
                      <div key={period.id} className="space-y-2">
                        {previous && (
                          <div className="flex items-center gap-2 rounded-2xl border border-amber-100 bg-amber-50/80 px-3 py-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-white text-amber-500 shadow-sm"><Coffee size={15} /></div>
                            <div className="min-w-0 flex-1"><p className="text-[10px] font-extrabold text-amber-800">Break</p><p className="truncate text-[9px] text-amber-600">{previous.end} – {period.start}</p></div>
                            <span className="rounded-full bg-white px-2.5 py-1 text-[9px] font-extrabold text-amber-600 shadow-sm">{formatDuration(breakMinutes)}</span>
                          </div>
                        )}
                        <PeriodEditor period={period} index={index} removable={value.periods.length > 1} onChange={(field, nextValue) => updatePeriod(day, period.id, field, nextValue)} onRemove={() => removePeriod(day, period.id)} />
                      </div>
                    )
                  })}

                  {value.periods.length < MAX_PERIODS && (
                    <button type="button" onClick={() => addBreak(day)} className="flex h-10 w-full items-center justify-center gap-2 rounded-2xl border border-dashed border-blue-200 bg-blue-50/55 text-[11px] font-bold text-blue-600 transition active:scale-[0.99]"><Plus size={14} /> Add a break</button>
                  )}
                  {issue && <p className="px-1 text-[10px] font-semibold text-red-500">{issue}</p>}
                </div>
              )}
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
