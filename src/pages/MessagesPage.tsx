import { useState } from 'react'
import { Search, PenSquare, SlidersHorizontal, ChevronRight } from 'lucide-react'
import { StatusBar } from '../components/shared'
import { useNav } from '../context/NavContext'

const MSGS=[
  {id:1,name:'Aisha Al Thani',  tag:'General Cleaning',   tColor:'bg-blue-100 text-blue-600',    meta:'May 30, 12:00 PM',preview:"Hi! I'll be at home. Please call me when you arrive.",time:'10:30 AM',unread:2,online:true, bg:'bg-rose-400',  av:'A'},
  {id:2,name:'Mohammed Khalid', tag:'Deep Cleaning',      tColor:'bg-purple-100 text-purple-600',meta:'May 31, 10:00 AM',preview:"Can you let me know when you're on the way?",       time:'Yesterday',unread:1,online:true, bg:'bg-amber-400', av:'M'},
  {id:3,name:'Helpy Support',   tag:'Support',            tColor:'bg-blue-100 text-blue-600',    meta:null,              preview:'Thank you for reaching out. How can we assist?',   time:'Yesterday',unread:0,online:false,bg:'bg-brand-500', av:'🎧'},
  {id:4,name:'Fatima Noor',     tag:'Move-in / Move-out', tColor:'bg-teal-100 text-teal-600',    meta:'Jun 1, 02:00 PM', preview:'Is it possible to reschedule our booking?',          time:'May 28', unread:0,online:false,bg:'bg-teal-400',  av:'F'},
  {id:5,name:'Ahmed Hassan',    tag:'General Cleaning',   tColor:'bg-blue-100 text-blue-600',    meta:'Jun 2, 11:00 AM', preview:'Thanks a lot! Great service.',                       time:'May 27', unread:0,online:true, bg:'bg-violet-400',av:'A'},
  {id:6,name:'Helpy Offers',    tag:'Offer',              tColor:'bg-pink-100 text-pink-600',    meta:null,              preview:'Special offer! Get 20% OFF on your next booking.',  time:'May 25', unread:0,online:false,bg:'bg-pink-400',  av:'%'},
]
const FTABS=[{id:'all',label:'All',count:8},{id:'bookings',label:'Bookings',count:4},{id:'offers',label:'Offers',count:2},{id:'support',label:'Support',count:2}]
const QUICK=[{icon:'🚗',text:'On my way'},{icon:'⏰',text:'Running 10 mins late'},{icon:'✅',text:'Job completed'},{icon:'📍',text:'Can you confirm address?'}]

export default function MessagesPage(){
  const {navigate}=useNav()
  const [ft,setFt]=useState('all')
  const [q,setQ]=useState('')
  const filtered=MSGS.filter(m=>{
    const matchQ=m.name.toLowerCase().includes(q.toLowerCase())||m.preview.toLowerCase().includes(q.toLowerCase())
    const matchF=ft==='all'||
      (ft==='bookings'&&['General Cleaning','Deep Cleaning','Move-in / Move-out'].includes(m.tag))||
      (ft==='offers'&&m.tag==='Offer')||
      (ft==='support'&&m.tag==='Support')
    return matchQ&&matchF
  })
  return(
    <div className="flex flex-col flex-1 bg-[#F4F6FF] overflow-hidden">
      <StatusBar/>
      <div className="flex items-center justify-between px-5 pt-2 pb-1">
        <div><h1 className="text-[24px] font-bold text-gray-900">Messages</h1><p className="text-[12px] text-gray-400 mt-0.5">Stay connected with your customers</p></div>
        <div className="flex items-center gap-2">
          <button className="w-9 h-9 bg-white rounded-xl shadow-sm flex items-center justify-center"><Search size={17} className="text-gray-500"/></button>
          <button className="w-9 h-9 bg-white rounded-xl shadow-sm flex items-center justify-center"><PenSquare size={17} className="text-brand-500"/></button>
        </div>
      </div>
      {/* Search */}
      <div className="flex items-center gap-2 px-4 mt-3">
        <div className="flex-1 flex items-center gap-2 bg-white rounded-2xl px-3 py-2.5 shadow-sm">
          <Search size={16} className="text-gray-400"/>
          <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search messages..." className="flex-1 bg-transparent text-[13px] outline-none placeholder:text-gray-400"/>
        </div>
        <button className="relative w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center"><SlidersHorizontal size={17} className="text-gray-500"/><span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full bg-brand-500"/></button>
      </div>
      {/* Filter tabs */}
      <div className="flex items-center gap-2 px-4 mt-3 overflow-x-auto">
        {FTABS.map(f=>(
          <button key={f.id} onClick={()=>setFt(f.id)} className={`shrink-0 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[12px] font-semibold transition-all ${ft===f.id?'bg-brand-500 text-white shadow-sm':'bg-white text-gray-600 shadow-sm'}`}>
            {f.label}
            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${ft===f.id?'bg-white/20':'bg-gray-100'}`}>{f.count}</span>
          </button>
        ))}
      </div>
      <div className="flex-1 overflow-y-auto px-4 mt-3 pb-4">
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden divide-y divide-gray-50">
          {filtered.map(m=>(
            <button key={m.id} onClick={()=>navigate('chat',{name:m.name,service:m.tag})} className="w-full flex items-start gap-3 p-4 active:bg-gray-50 transition-colors text-left">
              <div className="relative shrink-0">
                <div className={`w-12 h-12 rounded-full ${m.bg} flex items-center justify-center text-white font-bold text-base`}>
                  {m.av.length>1?<span className="text-lg">{m.av}</span>:m.av}
                </div>
                {m.online&&<span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-400 border-2 border-white"/>}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-[13px] font-bold text-gray-900 truncate">{m.name}</p>
                  <span className="text-[11px] text-gray-400 shrink-0">{m.time}</span>
                </div>
                <div className="flex items-center gap-1 mt-0.5">
                  <span className={`inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full ${m.tColor}`}>{m.tag}</span>
                  {m.meta&&<span className="text-[10px] text-gray-400">• {m.meta}</span>}
                </div>
                <p className="text-[12px] text-gray-500 mt-1 leading-snug line-clamp-2">{m.preview}</p>
              </div>
              <div className="flex flex-col items-end gap-1 shrink-0">
                {m.unread?<span className="min-w-[20px] h-5 px-1.5 rounded-full bg-brand-500 text-white text-[10px] font-bold flex items-center justify-center">{m.unread}</span>:<ChevronRight size={15} className="text-gray-300"/>}
              </div>
            </button>
          ))}
          {filtered.length===0&&<div className="py-12 flex flex-col items-center gap-2"><span className="text-3xl">💬</span><p className="text-[13px] text-gray-400 font-semibold">No messages found</p></div>}
        </div>
        {/* Quick Replies */}
        <div className="mt-5">
          <div className="flex items-center justify-between mb-3"><p className="text-[15px] font-bold text-gray-900">Quick Replies</p><button className="text-brand-500 text-[12px] font-semibold">Edit</button></div>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {QUICK.map(q=>(
              <button key={q.text} onClick={()=>navigate('chat',{name:'Customer',service:''})} className="shrink-0 flex flex-col items-center gap-1.5 bg-white rounded-2xl px-4 py-3 shadow-sm min-w-[80px]">
                <span className="text-xl">{q.icon}</span>
                <p className="text-[10px] font-semibold text-gray-600 text-center leading-tight">{q.text}</p>
              </button>
            ))}
            <button className="shrink-0 flex items-center justify-center bg-white rounded-2xl px-4 shadow-sm min-w-[44px]"><ChevronRight size={16} className="text-brand-500"/></button>
          </div>
        </div>
      </div>
    </div>
  )
}
