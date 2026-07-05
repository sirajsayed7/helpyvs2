import { Bell, Menu, User, CalendarDays, Briefcase, CheckCircle2, ChevronRight, TrendingUp, CalendarPlus, Clock3, ClipboardList, Star, Megaphone, Trophy } from 'lucide-react'
import { StatusBar, WavyBackground } from '../components/shared'
import { useNav } from '../context/NavContext'

const weekData=[{day:'Mon',v:2200},{day:'Tue',v:3800},{day:'Wed',v:6400},{day:'Thu',v:4100},{day:'Fri',v:6200},{day:'Sat',v:3600},{day:'Sun',v:8000}]
const W=560,H=160,PX=36,PY=16,MAX=9000
const xOf=(i:number)=>PX+(i/(weekData.length-1))*(W-PX*2)
const yOf=(v:number)=>PY+(1-v/MAX)*(H-PY*2)
const pts=weekData.map((d,i)=>({x:xOf(i),y:yOf(d.v)}))
const linePath=pts.map((p,i)=>{if(i===0)return`M ${p.x},${p.y}`;const pr=pts[i-1],cx=(pr.x+p.x)/2;return`C ${cx},${pr.y} ${cx},${p.y} ${p.x},${p.y}`}).join(' ')
const areaPath=linePath+` L ${pts[pts.length-1].x},${H-PY} L ${pts[0].x},${H-PY} Z`

export default function HomePage(){
  const {navigate, setActiveTab} = useNav()
  return(
    <div className="relative flex flex-col flex-1 overflow-hidden">
      <WavyBackground/>
      <div className="relative flex flex-col flex-1" style={{zIndex:1}}>
        <StatusBar/>
        <div className="flex items-center justify-between px-5 pt-1 pb-3">
          <button className="w-10 h-10 glass rounded-xl shadow-sm flex items-center justify-center"><Menu size={20} className="text-gray-600"/></button>
          <div className="flex items-center gap-3">
            <button onClick={()=>navigate('notification-settings')} className="relative w-10 h-10 glass rounded-xl shadow-sm flex items-center justify-center">
              <Bell size={20} className="text-gray-600"/>
              <span className="absolute top-2 right-2.5 w-2 h-2 rounded-full bg-red-500 border border-white"/>
            </button>
            <button onClick={()=>setActiveTab('profile')} className="relative w-11 h-11">
              <div className="w-11 h-11 rounded-full border-2 border-white/80 shadow-md bg-gradient-to-br from-emerald-300 to-emerald-600 flex items-center justify-center"><User size={20} className="text-white"/></div>
              <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-400 border-2 border-white"/>
            </button>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-4">
          <div className="px-1 pt-1 pb-1">
            <p className="text-[14px] text-gray-500 font-medium">Good morning, Ahmed 👋</p>
            <h1 className="text-[26px] font-bold text-gray-900 leading-snug mt-0.5">Let's get more<br/>bookings today!</h1>
          </div>
          {/* Availability banner */}
          <button onClick={()=>navigate('availability')} className="w-full glass rounded-2xl shadow-sm p-4 flex items-center gap-3 text-left">
            <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center shrink-0"><CalendarDays size={22} className="text-blue-500"/></div>
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-bold text-gray-800">You're all set!</p>
              <p className="text-[11px] text-gray-400 mt-0.5 leading-snug">Keep your availability updated to stay booked.</p>
            </div>
            <span className="shrink-0 px-3 py-2 rounded-xl border border-blue-400 text-blue-500 text-[11px] font-semibold whitespace-nowrap">Update Availability</span>
          </button>
          {/* Stat cards */}
          <div className="flex gap-3">
            {[
              {icon:<CalendarDays size={17} className="text-blue-500"/>,  bg:'bg-blue-100',  v:8,  label:'Bookings',          sub:'Upcoming',    screen:'bookings'},
              {icon:<Briefcase    size={17} className="text-amber-500"/>, bg:'bg-amber-100', v:2,  label:'Ongoing Service',   sub:'In progress', screen:'ongoing-service'},
              {icon:<CheckCircle2 size={17} className="text-green-500"/>, bg:'bg-green-100', v:15, label:'Service Completed', sub:'This month',  screen:'completed-service'},
            ].map(c=>(
              <button key={c.label} onClick={()=>c.screen==='bookings'?setActiveTab('bookings'):navigate(c.screen as any)} className="relative flex-1 glass rounded-2xl px-3.5 py-2.5 shadow-sm flex flex-col gap-1.5 text-left">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${c.bg}`}>{c.icon}</div>
                <div>
                  <p className="text-[22px] font-bold text-gray-900 leading-tight">{c.v}</p>
                  <p className="text-[11px] font-semibold text-gray-700 mt-0.5 leading-tight">{c.label}</p>
                  <p className="text-[10px] text-gray-400 mt-0.5">{c.sub}</p>
                </div>
                <ChevronRight size={14} className="absolute bottom-2.5 right-3 text-gray-300"/>
              </button>
            ))}
          </div>
          {/* Earnings chart */}
          <button onClick={()=>setActiveTab('earnings')} className="w-full glass rounded-2xl shadow-sm p-5 text-left">
            <div className="flex items-center justify-between mb-2">
              <p className="text-[15px] font-bold text-gray-900">Earnings Overview</p>
              <span className="flex items-center gap-1 text-[11px] font-semibold text-gray-500 bg-gray-100 rounded-lg px-2.5 py-1.5">This Week <ChevronRight size={10}/></span>
            </div>
            <p className="text-[27px] font-bold text-gray-900 tracking-tight">12,650.00 <span className="text-[17px] font-semibold">QR</span></p>
            <div className="flex items-center justify-between mt-1 mb-3">
              <div className="flex items-center gap-1.5"><TrendingUp size={13} className="text-green-500"/><span className="text-[11px] font-semibold text-green-500">18% from last week</span></div>
              <span className="text-[11px] font-bold text-blue-500">6,250 QR</span>
            </div>
            <svg viewBox={`0 0 ${W} ${H+28}`} className="w-full" preserveAspectRatio="none" style={{height:120}}>
              <defs><linearGradient id="ca" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#3B5BF6" stopOpacity="0.18"/><stop offset="100%" stopColor="#3B5BF6" stopOpacity="0.01"/></linearGradient></defs>
              {[0,2000,4000,6000,8000].map(v=><text key={v} x={PX-4} y={yOf(v)+4} textAnchor="end" fontSize="11" fill="#9ca3af" fontFamily="DM Sans">{v===0?'0':`${v/1000}K`}</text>)}
              <path d={areaPath} fill="url(#ca)"/>
              <path d={linePath} fill="none" stroke="#3B5BF6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              {pts.map((p,i)=><circle key={i} cx={p.x} cy={p.y} r="4" fill="#3B5BF6" stroke="white" strokeWidth="2"/>)}
              {weekData.map((d,i)=><text key={d.day} x={xOf(i)} y={H+18} textAnchor="middle" fontSize="11" fill="#9ca3af" fontFamily="DM Sans">{d.day}</text>)}
            </svg>
          </button>
          {/* Quick Access */}
          <div>
            <p className="text-[15px] font-bold text-gray-900 mb-3 px-0.5">Quick Access</p>
            <div className="flex gap-2.5">
              {[
                {icon:<CalendarPlus  size={17} className="text-blue-500"/>  ,bg:'bg-blue-100'  ,label:'New Booking'     ,screen:'new-booking'},
                {icon:<Clock3        size={17} className="text-purple-500"/>,bg:'bg-purple-100',label:'Availability'    ,screen:'availability'},
                {icon:<ClipboardList size={17} className="text-green-500"/> ,bg:'bg-green-100' ,label:'Manage Services' ,screen:'manage-services'},
                {icon:<Star          size={17} className="text-amber-500"/> ,bg:'bg-amber-100' ,label:'Reviews'         ,screen:'reviews'},
              ].map(c=>(
                <button key={c.label} onClick={()=>navigate(c.screen as any)} className="flex-1 glass rounded-2xl p-3.5 shadow-sm flex flex-col items-start gap-2 active:scale-95 transition-transform duration-150">
                  <div className={`mx-auto w-9 h-9 rounded-xl flex items-center justify-center ${c.bg}`}>{c.icon}</div>
                  <div className="flex items-center justify-between w-full"><p className="text-[11px] font-semibold text-gray-700 leading-tight">{c.label}</p><ChevronRight size={12} className="text-gray-300"/></div>
                </button>
              ))}
            </div>
          </div>
          {/* Offers promo */}
          <button onClick={()=>navigate('offers')} className="w-full overflow-hidden rounded-2xl bg-gradient-to-r from-rose-500 to-orange-400 p-4 shadow-sm text-left text-white active:scale-[0.99] transition-transform duration-150">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center shrink-0">
                <Megaphone size={22}/>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-[14px] font-bold">Promote your services</p>
                  <span className="px-2 py-0.5 rounded-full bg-white/20 text-[9px] font-bold">NEW</span>
                </div>
                <p className="text-[11px] text-white/80 mt-0.5 leading-snug">Create offers and boost visibility on the customer app.</p>
              </div>
              <span className="shrink-0 flex items-center gap-1 rounded-xl bg-white px-3 py-2 text-[11px] font-bold text-rose-500">
                Create <ChevronRight size={13}/>
              </span>
            </div>
          </button>
          {/* Performance */}
          <button onClick={()=>navigate('performance')} className="w-full bg-blue-50/80 rounded-2xl p-4 flex items-center gap-3 text-left">
            <div className="w-14 h-14 rounded-full bg-blue-200/60 flex items-center justify-center shrink-0 relative">
              <Trophy size={26} className="text-yellow-500"/>
              <span className="absolute -top-1 -right-0.5 text-sm">✨</span>
            </div>
            <div className="flex-1">
              <p className="text-[13px] font-bold text-gray-800">Keep it up, Ahmed! 🎉</p>
              <p className="text-[11px] text-gray-500 mt-0.5 leading-snug">You have a 98% success rate this month.</p>
            </div>
            <span className="shrink-0 flex items-center gap-0.5 text-blue-500 text-[11px] font-semibold whitespace-nowrap">View Performance <ChevronRight size={13}/></span>
          </button>
        </div>
      </div>
    </div>
  )
}
