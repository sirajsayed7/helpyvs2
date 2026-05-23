import { ArrowLeft, Bell, CheckCircle2, CalendarDays, MessageCircle, DollarSign, Star, AlertCircle } from 'lucide-react'
import { useState } from 'react'
import { useNav } from '../context/NavContext'
import { StatusBar } from '../components/shared'

const NOTIFS=[
  {id:1,type:'booking', icon:CalendarDays, color:'bg-blue-100 text-blue-500',   title:'New Booking Confirmed',       body:'Aisha Al Thani booked General Cleaning for May 30 at 12:00 PM.',time:'10:30 AM',  read:false},
  {id:2,type:'message', icon:MessageCircle,color:'bg-purple-100 text-purple-500',title:'New Message from Mohammed',   body:"Can you let me know when you're on the way?",                   time:'9:45 AM',   read:false},
  {id:3,type:'payment', icon:DollarSign,   color:'bg-green-100 text-green-500',  title:'Payment Received',            body:'You received 180.00 QR from Aisha Al Thani for General Cleaning.',time:'Yesterday', read:true},
  {id:4,type:'review',  icon:Star,         color:'bg-amber-100 text-amber-500',  title:'New 5-Star Review',           body:'Fatima Noor left you a 5-star review: "Excellent work!"',       time:'May 29',    read:true},
  {id:5,type:'booking', icon:CalendarDays, color:'bg-blue-100 text-blue-500',   title:'Upcoming Booking Reminder',   body:'You have a booking tomorrow at 9:00 AM with Sara Al Mannai.',   time:'May 28',    read:true},
  {id:6,type:'alert',   icon:AlertCircle,  color:'bg-red-100 text-red-500',     title:'Booking Cancelled',           body:'Hassan Al Kuwari cancelled the Office Cleaning booking.',         time:'May 27',    read:true},
  {id:7,type:'payment', icon:DollarSign,   color:'bg-green-100 text-green-500',  title:'Payout Processed',            body:'Your withdrawal of 1,500 QR has been processed to QNB bank.',   time:'May 26',    read:true},
]

export default function NotificationsPage(){
  const {goBack}=useNav()
  const [notifs,setNotifs]=useState(NOTIFS)
  const markAll=()=>setNotifs(n=>n.map(x=>({...x,read:true})))
  const unread=notifs.filter(n=>!n.read).length

  return(
    <div className="flex flex-col flex-1 bg-[#F4F6FF] overflow-hidden">
      <StatusBar/>
      <div className="flex items-center justify-between px-4 pt-2 pb-3">
        <div className="flex items-center gap-3">
          <button onClick={goBack} className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center"><ArrowLeft size={20} className="text-gray-600"/></button>
          <div><h1 className="text-[18px] font-bold text-gray-900">Notifications</h1>{unread>0&&<p className="text-[11px] text-brand-500 font-semibold">{unread} unread</p>}</div>
        </div>
        {unread>0&&<button onClick={markAll} className="text-brand-500 text-[12px] font-semibold">Mark all read</button>}
      </div>
      <div className="flex-1 overflow-y-auto px-4 pb-6">
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden divide-y divide-gray-50">
          {notifs.map(n=>(
            <button key={n.id} onClick={()=>setNotifs(ns=>ns.map(x=>x.id===n.id?{...x,read:true}:x))}
              className={`w-full flex items-start gap-3 p-4 text-left transition-colors ${n.read?'':'bg-blue-50/40'}`}>
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${n.color}`}>
                <n.icon size={18}/>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <p className={`text-[13px] ${n.read?'font-semibold text-gray-700':'font-bold text-gray-900'}`}>{n.title}</p>
                  <span className="text-[10px] text-gray-400 shrink-0">{n.time}</span>
                </div>
                <p className="text-[11px] text-gray-500 mt-0.5 leading-snug">{n.body}</p>
              </div>
              {!n.read&&<span className="w-2 h-2 rounded-full bg-brand-500 shrink-0 mt-2"/>}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
