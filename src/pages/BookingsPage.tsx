import { useState } from 'react'
import { Search, SlidersHorizontal, CalendarDays, MapPin, MessageCircle, Eye, CheckCircle, X, ChevronRight, XCircle, Clock } from 'lucide-react'
import { StatusBar } from '../components/shared'
import { useNav } from '../context/NavContext'

type BStatus = 'Confirmed'|'Pending'|'Completed'|'Cancelled'
interface Booking { id:number;name:string;service:string;sColor:string;date:string;time:string;location:string;status:BStatus;online:boolean;av:string;tab:string;price:string }

const ALL:Booking[]=[
  {id:1,name:'Aisha Al Thani',  service:'General Cleaning',   sColor:'bg-blue-100 text-blue-600',    date:'May 30, 2024',time:'12:00 PM',location:'Viva Bahriya, The Pearl-Qatar',status:'Confirmed',online:true, av:'A',tab:'upcoming',  price:'180.00'},
  {id:2,name:'Mohammed Khalid', service:'Deep Cleaning',      sColor:'bg-purple-100 text-purple-600',date:'May 31, 2024',time:'10:00 AM',location:'West Bay Lagoon, Doha',         status:'Pending',  online:true, av:'M',tab:'upcoming',  price:'280.00'},
  {id:3,name:'Fatima Noor',     service:'Move-in / Move-out', sColor:'bg-teal-100 text-teal-600',    date:'Jun 1, 2024', time:'02:00 PM',location:'Lusail City, Doha',             status:'Confirmed',online:true, av:'F',tab:'upcoming',  price:'350.00'},
  {id:4,name:'Ahmed Hassan',    service:'General Cleaning',   sColor:'bg-blue-100 text-blue-600',    date:'Jun 2, 2024', time:'11:00 AM',location:'Al Wakrah, Doha',              status:'Pending',  online:false,av:'A',tab:'upcoming',  price:'150.00'},
  {id:5,name:'Sara Al Mannai',  service:'Deep Cleaning',      sColor:'bg-purple-100 text-purple-600',date:'May 29, 2024',time:'09:00 AM',location:'Al Sadd, Doha',                status:'Confirmed',online:true, av:'S',tab:'inprogress',price:'280.00'},
  {id:6,name:'Khalid Al Dosari',service:'Office Cleaning',    sColor:'bg-orange-100 text-orange-600',date:'May 29, 2024',time:'01:00 PM',location:'West Bay, Doha',               status:'Confirmed',online:true, av:'K',tab:'inprogress',price:'200.00'},
  {id:7,name:'Layla Hassan',    service:'General Cleaning',   sColor:'bg-blue-100 text-blue-600',    date:'May 25, 2024',time:'10:00 AM',location:'The Pearl-Qatar',              status:'Completed',online:false,av:'L',tab:'completed', price:'180.00'},
  {id:8,name:'Omar Al Farsi',   service:'Move-in / Move-out', sColor:'bg-teal-100 text-teal-600',    date:'May 22, 2024',time:'08:00 AM',location:'Lusail City, Doha',             status:'Completed',online:false,av:'O',tab:'completed', price:'350.00'},
  {id:9,name:'Nour Al Thani',   service:'Deep Cleaning',      sColor:'bg-purple-100 text-purple-600',date:'May 20, 2024',time:'02:00 PM',location:'Al Dafna, Doha',               status:'Completed',online:false,av:'N',tab:'completed', price:'280.00'},
  {id:10,name:'Reem Al Sulaiti',service:'General Cleaning',   sColor:'bg-blue-100 text-blue-600',    date:'May 18, 2024',time:'11:00 AM',location:'Msheireb Downtown, Doha',      status:'Completed',online:false,av:'R',tab:'completed', price:'150.00'},
  {id:11,name:'Hassan Al Kuwari',service:'Office Cleaning',   sColor:'bg-orange-100 text-orange-600',date:'May 27, 2024',time:'03:00 PM',location:'Al Corniche, Doha',            status:'Cancelled',online:false,av:'H',tab:'cancelled', price:'200.00'},
  {id:12,name:'Mona Al Emadi',  service:'Deep Cleaning',      sColor:'bg-purple-100 text-purple-600',date:'May 24, 2024',time:'10:00 AM',location:'Al Rayyan, Doha',              status:'Cancelled',online:false,av:'M',tab:'cancelled', price:'280.00'},
  {id:13,name:'Tariq Al Marri', service:'Move-in / Move-out', sColor:'bg-teal-100 text-teal-600',    date:'May 21, 2024',time:'09:00 AM',location:'Al Wakrah, Doha',              status:'Cancelled',online:false,av:'T',tab:'cancelled', price:'350.00'},
]
const AVCOL=['bg-rose-400','bg-amber-400','bg-teal-400','bg-violet-400','bg-sky-400','bg-pink-400','bg-lime-500','bg-indigo-400']
const STCOL:Record<BStatus,string>={Confirmed:'bg-green-100 text-green-600',Pending:'bg-orange-100 text-orange-500',Completed:'bg-blue-100 text-blue-600',Cancelled:'bg-red-100 text-red-500'}
type Tab='upcoming'|'inprogress'|'completed'|'cancelled'
const TABS:Tab[]=['upcoming','inprogress','completed','cancelled']
const TLABEL:Record<Tab,string>={upcoming:'Upcoming',inprogress:'In Progress',completed:'Completed',cancelled:'Cancelled'}
const THEAD:Record<Tab,string>={upcoming:'Upcoming Bookings',inprogress:'In Progress',completed:'Completed Jobs',cancelled:'Cancelled Bookings'}

function Card({b,tab}:{b:Booking;tab:Tab}){
  const {navigate} = useNav()
  return(
    <div className="bg-white rounded-2xl shadow-sm p-4">
      <button onClick={()=>navigate('booking-detail',b)} className="w-full flex items-start gap-3 text-left">
        <div className="relative shrink-0">
          <div className={`w-12 h-12 rounded-full ${AVCOL[b.id%AVCOL.length]} flex items-center justify-center text-white font-bold text-base`}>{b.av}</div>
          {b.online&&<span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-400 border-2 border-white"/>}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <p className="text-[14px] font-bold text-gray-900">{b.name}</p>
            <span className={`shrink-0 text-[10px] font-semibold px-2.5 py-0.5 rounded-full ${STCOL[b.status]}`}>{b.status}</span>
          </div>
          <span className={`inline-block text-[11px] font-semibold px-2.5 py-0.5 rounded-full mt-1 ${b.sColor}`}>{b.service}</span>
          <div className="flex items-center gap-1.5 mt-2"><CalendarDays size={13} className="text-gray-400 shrink-0"/><span className="text-[12px] text-gray-500">{b.date} • {b.time}</span></div>
          <div className="flex items-center gap-1.5 mt-1"><MapPin size={13} className="text-gray-400 shrink-0"/><span className="text-[12px] text-gray-500">{b.location}</span></div>
        </div>
        <ChevronRight size={16} className="text-gray-300 shrink-0 mt-1"/>
      </button>
      {tab==='cancelled'?(
        <div className="flex mt-4"><div className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-red-50 text-red-400 text-[13px] font-semibold"><XCircle size={15}/>Booking Cancelled</div></div>
      ):(
        <div className="flex gap-3 mt-4">
          <button onClick={()=>navigate('chat',b)} className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border border-gray-200 text-gray-600 text-[13px] font-semibold"><MessageCircle size={15}/>Message</button>
          {b.status==='Pending'?(
            <button onClick={()=>navigate('booking-detail',b)} className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-brand-500 text-white text-[13px] font-semibold"><CheckCircle size={15}/>Accept Booking</button>
          ):tab==='completed'?(
            <button onClick={()=>navigate('booking-detail',b)} className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-brand-500 text-white text-[13px] font-semibold"><Eye size={15}/>View Receipt</button>
          ):tab==='inprogress'?(
            <button onClick={()=>navigate('ongoing-service',b)} className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-amber-500 text-white text-[13px] font-semibold"><Clock size={15}/>Track Job</button>
          ):(
            <button onClick={()=>navigate('booking-detail',b)} className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-brand-500 text-white text-[13px] font-semibold"><Eye size={15}/>View Details</button>
          )}
        </div>
      )}
    </div>
  )
}

export default function BookingsPage(){
  const {navigate}=useNav()
  const [tab,setTab]=useState<Tab>('upcoming')
  const [banner,setBanner]=useState(true)
  const list=ALL.filter(b=>b.tab===tab)
  return(
    <div className="flex flex-col flex-1 bg-[#F4F6FF] overflow-hidden">
      <StatusBar/>
      <div className="flex items-center justify-between px-5 pt-2 pb-1">
        <div><h1 className="text-[24px] font-bold text-gray-900">My Bookings</h1><p className="text-[12px] text-gray-400 mt-0.5">Manage your upcoming and ongoing services</p></div>
        <div className="flex items-center gap-2">
          <button className="w-9 h-9 bg-white rounded-xl shadow-sm flex items-center justify-center"><Search size={17} className="text-gray-500"/></button>
          <button onClick={()=>navigate('calendar')} className="relative w-9 h-9 bg-white rounded-xl shadow-sm flex items-center justify-center"><SlidersHorizontal size={17} className="text-gray-500"/><span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-brand-500"/></button>
        </div>
      </div>
      <div className="px-4 mt-3"><div className="bg-gray-100 rounded-2xl p-1 flex gap-1">{TABS.map(t=><button key={t} onClick={()=>setTab(t)} className={`shrink-0 flex-1 py-2 rounded-xl text-[11px] font-semibold transition-all whitespace-nowrap ${tab===t?'bg-white text-brand-500 shadow-sm':'text-gray-500'}`}>{TLABEL[t]}</button>)}</div></div>
      <div className="flex-1 overflow-y-auto px-4 pt-4 pb-4 space-y-4">
        <div className="flex items-center justify-between px-0.5">
          <p className="text-[15px] font-bold text-gray-900">{THEAD[tab]}</p>
          {tab==='upcoming'&&<button onClick={()=>navigate('calendar')} className="flex items-center gap-1 text-brand-500 text-[12px] font-semibold">View Calendar <CalendarDays size={14}/></button>}
          {tab==='cancelled'&&<span className="text-[12px] text-red-400 font-semibold">{list.length} bookings</span>}
        </div>
        {list.length===0&&<div className="flex flex-col items-center justify-center py-16 gap-3"><div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center"><CalendarDays size={28} className="text-gray-300"/></div><p className="text-[15px] font-semibold text-gray-400">No bookings here</p></div>}
        {list.map(b=><Card key={b.id} b={b} tab={tab}/>)}
        {tab==='upcoming'&&banner&&(
          <div className="bg-blue-50 rounded-2xl p-4 flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center shrink-0 relative"><CalendarDays size={20} className="text-brand-500"/><span className="absolute -top-1 -right-1 text-xs">✨</span></div>
            <div className="flex-1"><p className="text-[10px] font-semibold text-brand-500">Stay organized</p><p className="text-[13px] font-bold text-gray-800">Sync your calendar</p><p className="text-[11px] text-gray-500 mt-0.5">Connect to never miss a booking.</p></div>
            <button onClick={()=>navigate('calendar')} className="shrink-0 text-brand-500 text-[12px] font-bold">Sync Now</button>
            <button onClick={()=>setBanner(false)}><X size={16} className="text-gray-400"/></button>
          </div>
        )}
      </div>
    </div>
  )
}
