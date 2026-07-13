import { ArrowLeft, TrendingUp, Star, Zap, Award } from 'lucide-react'
import { useNav } from '../context/NavContext'
import { StatusBar } from '../components/shared'
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts'

const radarData = [
  {subject:'Speed',A:90},
  {subject:'Quality',A:98},
  {subject:'Communication',A:85},
  {subject:'Punctuality',A:88},
  {subject:'Value',A:92},
]

const MONTHS_PERF = [
  {month:'Jan',jobs:8, rating:4.7},
  {month:'Feb',jobs:11,rating:4.8},
  {month:'Mar',jobs:15,rating:4.7},
  {month:'Apr',jobs:13,rating:4.9},
  {month:'May',jobs:18,rating:4.8},
]

export default function PerformancePage() {
  const { goBack } = useNav()
  return (
    <div className="flex flex-col flex-1 bg-[#F4F6FF] overflow-y-auto">
      <StatusBar />
      <div className="flex items-center gap-3 px-4 pt-2 pb-3">
        <button onClick={goBack} className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center">
          <ArrowLeft size={20} className="text-gray-600" />
        </button>
        <h1 className="text-[18px] font-bold text-gray-900">My Performance</h1>
      </div>

      <div className="flex-1 overflow-visible px-4 pb-6 space-y-4">
        {/* Top badge */}
        <div className="rounded-2xl p-5 text-center" style={{background:'linear-gradient(135deg,#3B5BF6,#2141E8)'}}>
          <div className="text-5xl mb-2">🏆</div>
          <p className="text-white text-[18px] font-bold">Top Performer</p>
          <p className="text-white/70 text-[12px] mt-1">You're in the top 5% of vendors this month!</p>
          <div className="flex justify-center gap-3 mt-3">
            {['98% Success','4.8 Rating','65+ Jobs'].map(b => (
              <span key={b} className="text-[11px] font-semibold text-white bg-white/20 px-3 py-1 rounded-full">{b}</span>
            ))}
          </div>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 gap-3">
          {[
            {icon:'✅',label:'Completion Rate',val:'98%',sub:'2 cancelled all time',color:'text-green-500'},
            {icon:'⚡',label:'Response Time',val:'< 5 min',sub:'Average reply time',color:'text-amber-500'},
            {icon:'⭐',label:'Avg Rating',val:'4.8 / 5',sub:'From 128 reviews',color:'text-brand-500'},
            {icon:'🔁',label:'Repeat Clients',val:'73%',sub:'Come back again',color:'text-purple-500'},
          ].map(s => (
            <div key={s.label} className="bg-white rounded-2xl shadow-sm p-4">
              <span className="text-2xl">{s.icon}</span>
              <p className={`text-[20px] font-bold mt-2 ${s.color}`}>{s.val}</p>
              <p className="text-[12px] font-semibold text-gray-700">{s.label}</p>
              <p className="text-[10px] text-gray-400 mt-0.5">{s.sub}</p>
            </div>
          ))}
        </div>

        {/* Radar chart */}
        <div className="bg-white rounded-2xl shadow-sm p-5">
          <p className="text-[15px] font-bold text-gray-900 mb-3">Performance Breakdown</p>
          <div style={{height:200}}>
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid stroke="#e5e7eb"/>
                <PolarAngleAxis dataKey="subject" tick={{fontSize:10,fill:'#9ca3af'}}/>
                <Radar dataKey="A" stroke="#3B5BF6" fill="#3B5BF6" fillOpacity={0.15} strokeWidth={2}/>
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Monthly breakdown */}
        <div className="bg-white rounded-2xl shadow-sm p-5">
          <p className="text-[15px] font-bold text-gray-900 mb-3">Monthly Summary</p>
          <div className="space-y-3">
            {MONTHS_PERF.map(m => (
              <div key={m.month} className="flex items-center gap-3">
                <span className="text-[12px] font-semibold text-gray-500 w-8">{m.month}</span>
                <div className="flex-1 h-2 bg-gray-100 rounded-full">
                  <div className="h-full bg-brand-500 rounded-full" style={{width:`${(m.jobs/20)*100}%`}}/>
                </div>
                <span className="text-[12px] font-semibold text-gray-700 w-14 text-right">{m.jobs} jobs</span>
                <div className="flex items-center gap-0.5 w-10">
                  <Star size={11} className="text-amber-400 fill-amber-400"/>
                  <span className="text-[11px] text-gray-600">{m.rating}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
