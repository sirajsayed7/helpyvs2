import { useState } from 'react'
import { ArrowLeft, CalendarDays, User, ChevronRight, Eye, EyeOff, Download, Clock, TrendingUp } from 'lucide-react'
import { StatusBar } from '../components/shared'
import { useNav } from '../context/NavContext'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, TooltipProps } from 'recharts'

const weekData=[{d:'Mon',v:2200},{d:'Tue',v:3800},{d:'Wed',v:6400},{d:'Thu',v:4100},{d:'Fri',v:6200},{d:'Sat',v:3600},{d:'Sun',v:8000}]
const BREAKDOWN=[
  {label:'General Cleaning',   color:'#3B5BF6',amount:'7,250 QR',pct:'57%',pctNum:57},
  {label:'Deep Cleaning',      color:'#22C55E',amount:'3,100 QR',pct:'24%',pctNum:24},
  {label:'Move-in / Move-out', color:'#A855F7',amount:'1,800 QR',pct:'14%',pctNum:14},
  {label:'Office Cleaning',    color:'#F97316',amount:'500 QR',  pct:'5%', pctNum:5},
]
const TX=[
  {name:'Aisha Al Thani',  service:'General Cleaning',   amount:'+180.00',date:'May 30, 2024'},
  {name:'Fatima Noor',     service:'Move-in / Move-out', amount:'+250.00',date:'May 30, 2024'},
  {name:'Mohammed Khalid', service:'Deep Cleaning',      amount:'+200.00',date:'May 30, 2024'},
]

function Donut(){
  const R=60,cx=80,cy=75,sw=22,circ=2*Math.PI*R
  let off=0
  const segs=BREAKDOWN.map(b=>{const dash=(b.pctNum/100)*circ;const gap=circ-dash;const s={...b,dash,gap,off};off+=dash;return s})
  return(
    <svg viewBox="0 0 160 150" className="w-full" style={{maxWidth:160}}>
      {segs.map((s,i)=><circle key={i} cx={cx} cy={cy} r={R} fill="none" stroke={s.color} strokeWidth={sw} strokeDasharray={`${s.dash} ${s.gap}`} strokeDashoffset={-s.off} style={{transform:'rotate(-90deg)',transformOrigin:`${cx}px ${cy}px`}}/>)}
      <text x={cx} y={cy-6} textAnchor="middle" fontSize="13" fontWeight="700" fill="#1e293b">12,650</text>
      <text x={cx} y={cy+10} textAnchor="middle" fontSize="10" fill="#9ca3af">Total QR</text>
    </svg>
  )
}
function CTip({active,payload,label}:TooltipProps<number,string>){
  if(!active||!payload?.length)return null
  return <div style={{background:'#3B5BF6',borderRadius:10,padding:'6px 12px',boxShadow:'0 4px 12px rgba(59,91,246,.35)'}}><p style={{color:'rgba(255,255,255,.75)',fontSize:10,marginBottom:2}}>{label}</p><p style={{color:'white',fontSize:13,fontWeight:700}}>{payload[0].value?.toLocaleString()} QR</p></div>
}

export default function EarningsPage(){
  const {navigate}=useNav()
  const [vis,setVis]=useState(true)
  const [apt,setApt]=useState<{d:string,v:number}|null>(null)
  return(
    <div className="flex flex-col flex-1 bg-[#F0F4FF] overflow-hidden">
      <StatusBar/>
      <div className="flex items-center justify-between px-5 pt-1 pb-3">
        <div><h1 className="text-[24px] font-bold text-gray-900">Earnings</h1><p className="text-[12px] text-gray-400 mt-0.5">Track your income and manage payouts</p></div>
        <div className="flex items-center gap-2">
          <button onClick={()=>navigate('calendar')} className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center"><CalendarDays size={18} className="text-gray-600"/></button>
          <div className="relative w-10 h-10"><div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-300 to-emerald-600 flex items-center justify-center"><User size={18} className="text-white"/></div><span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-green-400 border-2 border-white"/></div>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto px-4 pb-6 space-y-4">
        {/* Balance card */}
        <div className="rounded-3xl overflow-hidden relative p-6 min-h-[200px]" style={{background:'linear-gradient(135deg,#4F6EF7 0%,#3B5BF6 40%,#2141E8 100%)'}}>
          <svg className="absolute bottom-0 left-0 right-0 opacity-20" viewBox="0 0 390 80"><path d="M0,40 C60,10 120,70 180,40 C240,10 300,70 390,30 L390,80 L0,80 Z" fill="white"/><path d="M0,55 C80,25 160,75 240,45 C300,22 350,60 390,40 L390,80 L0,80 Z" fill="white" opacity="0.5"/></svg>
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <p className="text-white/80 text-[13px] font-medium">Total Balance</p>
                <button onClick={()=>setVis(v=>!v)}>{vis?<Eye size={15} className="text-white/60"/>:<EyeOff size={15} className="text-white/60"/>}</button>
              </div>
              <p className="text-white text-[36px] font-bold tracking-tight leading-none">{vis?'4,250.00':'••••••'} <span className="text-[22px]">QR</span></p>
              <p className="text-white/70 text-[13px] mt-2">Available to withdraw</p>
            </div>
          </div>
          <button onClick={()=>navigate('withdraw')} className="mt-6 flex items-center gap-2 bg-white rounded-2xl px-5 py-2.5 shadow-sm"><span className="text-brand-500 text-[14px] font-bold">→</span><span className="text-brand-500 text-[14px] font-bold">Withdraw</span></button>
        </div>
        {/* Stats row */}
        <div className="flex gap-3">
          <div className="flex-1 bg-white rounded-2xl shadow-sm p-4">
            <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center mb-3"><CalendarDays size={18} className="text-blue-500"/></div>
            <p className="text-[13px] font-semibold text-gray-500">Total Earnings</p>
            <p className="text-[20px] font-bold text-gray-900 mt-1 leading-tight">12,650.00 QR</p>
            <div className="flex items-center gap-1 mt-1.5"><TrendingUp size={13} className="text-green-500"/><span className="text-[12px] font-semibold text-green-500">18%</span></div>
          </div>
          <div className="flex-1 bg-white rounded-2xl shadow-sm p-4">
            <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center mb-3"><Download size={18} className="text-green-500"/></div>
            <p className="text-[13px] font-semibold text-gray-500">Withdrawn</p>
            <p className="text-[20px] font-bold text-gray-900 mt-1 leading-tight">8,400.00 QR</p>
            <div className="flex items-center gap-1 mt-1.5"><TrendingUp size={13} className="text-green-500"/><span className="text-[12px] font-semibold text-green-500">12%</span></div>
          </div>
        </div>
        {/* Pending payout */}
        <button onClick={()=>navigate('pending-payout')} className="w-full bg-white rounded-2xl shadow-sm p-4 flex items-center gap-4 text-left">
          <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center shrink-0"><Clock size={20} className="text-purple-500"/></div>
          <div className="flex-1"><p className="text-[13px] font-semibold text-gray-500">Pending Payout</p><p className="text-[20px] font-bold text-gray-900 leading-tight">2,350.00 QR</p><p className="text-[11px] text-gray-400 mt-0.5">Will be paid soon</p></div>
          <ChevronRight size={18} className="text-gray-300"/>
        </button>
        {/* Earnings overview chart */}
        <div className="bg-white rounded-2xl shadow-sm p-5">
          <div className="flex items-center justify-between mb-1">
            <p className="text-[16px] font-bold text-gray-900">Earnings Overview</p>
            <button className="flex items-center gap-1 text-[11px] font-semibold text-gray-500 border border-gray-200 rounded-xl px-3 py-1.5">This Week<svg width="9" height="5" viewBox="0 0 9 5" fill="none"><path d="M1 1L4.5 4.5L8 1" stroke="#6b7280" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg></button>
          </div>
          <p className="text-[26px] font-bold text-gray-900 mt-2 leading-none">12,650.00 QR</p>
          <div className="flex items-center gap-1.5 mt-1 mb-4"><TrendingUp size={13} className="text-green-500"/><span className="text-[12px] font-semibold text-green-500">18% from last month</span></div>
          {apt&&<div className="mb-2 flex justify-center"><div className="bg-brand-500 text-white text-[11px] font-semibold rounded-full px-3 py-1 shadow">{apt.d}: {apt.v.toLocaleString()} QR</div></div>}
          <div style={{height:200}}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weekData} margin={{top:10,right:8,bottom:0,left:0}}
                onMouseMove={(e:any)=>{if(e.activePayload?.length)setApt({d:e.activePayload[0].payload.d,v:e.activePayload[0].payload.v})}}
                onMouseLeave={()=>setApt(null)}>
                <defs><linearGradient id="eg2" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#3B5BF6" stopOpacity="0.18"/><stop offset="100%" stopColor="#3B5BF6" stopOpacity="0.02"/></linearGradient></defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false}/>
                <XAxis dataKey="d" tick={{fontSize:11,fill:'#9ca3af',fontFamily:'DM Sans'}} tickLine={false} axisLine={false}/>
                <YAxis tick={{fontSize:10,fill:'#9ca3af',fontFamily:'DM Sans'}} tickLine={false} axisLine={false} tickFormatter={v=>`${v/1000}K`} width={32}/>
                <Tooltip content={<CTip/>}/>
                <Area type="monotone" dataKey="v" stroke="#3B5BF6" strokeWidth={2.5} fill="url(#eg2)"
                  dot={{r:4,fill:'#3B5BF6',stroke:'white',strokeWidth:2}}
                  activeDot={{r:6,fill:'#3B5BF6',stroke:'white',strokeWidth:2.5,cursor:'pointer'}}/>
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        {/* Breakdown */}
        <div className="bg-white rounded-2xl shadow-sm p-5">
          <p className="text-[16px] font-bold text-gray-900 mb-4">Earnings Breakdown</p>
          <div className="flex items-center gap-4">
            <div className="shrink-0" style={{width:140}}><Donut/></div>
            <div className="flex-1 space-y-3">
              {BREAKDOWN.map(b=>(
                <div key={b.label} className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0"><span className="w-2.5 h-2.5 rounded-full shrink-0" style={{background:b.color}}/><span className="text-[11px] text-gray-500 leading-tight">{b.label}</span></div>
                  <div className="text-right shrink-0"><span className="text-[12px] font-bold text-gray-800">{b.amount}</span><span className="text-[11px] text-gray-400 ml-1.5">{b.pct}</span></div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Transactions */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <p className="text-[16px] font-bold text-gray-900">Recent Transactions</p>
            <button onClick={()=>navigate('all-transactions')} className="text-brand-500 text-[12px] font-semibold">View All</button>
          </div>
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden divide-y divide-gray-50">
            {TX.map((t,i)=>(
              <button key={i} onClick={()=>navigate('all-transactions')} className="w-full flex items-center gap-3 p-4 active:bg-gray-50">
                <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center shrink-0"><svg width="18" height="18" viewBox="0 0 24 24" fill="none"><rect x="3" y="5" width="18" height="14" rx="2" stroke="#22C55E" strokeWidth="1.8"/><path d="M7 9h4M7 13h8M7 17h5" stroke="#22C55E" strokeWidth="1.5" strokeLinecap="round"/><path d="M16 9l1.5 1.5L20 8" stroke="#22C55E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></div>
                <div className="flex-1 text-left"><p className="text-[13px] font-bold text-gray-900">{t.name}</p><p className="text-[11px] text-gray-400 mt-0.5">{t.service}</p></div>
                <div className="text-right shrink-0"><p className="text-[14px] font-bold text-green-500">{t.amount} QR</p><p className="text-[11px] text-gray-400 mt-0.5">{t.date}</p></div>
                <ChevronRight size={15} className="text-gray-300 shrink-0 ml-1"/>
              </button>
            ))}
          </div>
        </div>
        {/* Keep growing */}
        <div className="bg-white rounded-2xl shadow-sm p-5 flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center shrink-0"><span className="text-2xl">💳</span></div>
          <div className="flex-1"><p className="text-[16px] font-bold text-gray-900 leading-snug">Keep your earnings<br/>growing! 🚀</p><p className="text-[12px] text-gray-400 mt-1 leading-snug">Withdraw your earnings or keep your balance ready.</p></div>
          <button onClick={()=>navigate('withdraw')} className="shrink-0 bg-brand-500 text-white text-[12px] font-bold px-4 py-3 rounded-2xl shadow-sm active:opacity-90">Withdraw<br/>Now</button>
        </div>
      </div>
    </div>
  )
}
