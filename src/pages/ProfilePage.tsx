import { Settings, ChevronRight, Star, CalendarDays, MapPin, User, Store, Briefcase, FileText, Building2, Bell, Clock3, Shield, PenLine, BadgeCheck } from 'lucide-react'
import { StatusBar } from '../components/shared'
import { useNav } from '../context/NavContext'

const ACC=[
  {Icon:User,     bg:'bg-blue-50',  color:'text-blue-500',  label:'Personal Information', sub:'Update your personal details',         screen:'personal-info'},
  {Icon:Store,    bg:'bg-green-50', color:'text-green-500', label:'Business Information', sub:'Manage your business details',          screen:'business-info'},
  {Icon:Briefcase,bg:'bg-purple-50',color:'text-purple-500',label:'Services',             sub:'Manage the services you offer',         screen:'services-list'},
  {Icon:FileText, bg:'bg-amber-50', color:'text-amber-500', label:'Documents',            sub:'Manage your documents and certificates',screen:'documents'},
  {Icon:Building2,bg:'bg-blue-50',  color:'text-blue-500',  label:'Bank Details',         sub:'Update your payout and bank information',screen:'bank-details'},
]
const PREF=[
  {Icon:Bell,  bg:'bg-blue-50',  color:'text-blue-500',  label:'Notification Settings',sub:'Manage your notification preferences',screen:'notification-settings'},
  {Icon:Clock3,bg:'bg-amber-50', color:'text-amber-500', label:'Availability',          sub:'Manage your working hours and days',  screen:'availability-settings'},
  {Icon:Shield,bg:'bg-blue-50',  color:'text-blue-500',  label:'Privacy & Security',    sub:'Manage your privacy and security',    screen:'privacy-security'},
]

export default function ProfilePage(){
  const {navigate}=useNav()
  return(
    <div className="flex flex-col flex-1 bg-[#F4F6FF] overflow-hidden">
      <StatusBar/>
      <div className="flex items-center justify-between px-5 pt-2 pb-3">
        <div><h1 className="text-[24px] font-bold text-gray-900">Profile</h1><p className="text-[12px] text-gray-400 mt-0.5">Manage your account and business profile</p></div>
        <button onClick={()=>navigate('notification-settings')} className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center"><Settings size={19} className="text-gray-500"/></button>
      </div>
      <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-4">
        {/* Profile card */}
        <div className="bg-white rounded-2xl shadow-sm p-4">
          <div className="flex items-start gap-4">
            <div className="relative shrink-0">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-300 to-emerald-600 flex items-center justify-center shadow-md"><User size={32} className="text-white"/></div>
              <button onClick={()=>navigate('personal-info')} className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-brand-500 flex items-center justify-center border-2 border-white"><PenLine size={11} className="text-white"/></button>
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <p className="text-[17px] font-bold text-gray-900">Ahmed Hassan</p>
                  {/* Real-looking verified badge */}
                  <div className="relative flex items-center justify-center w-[18px] h-[18px]">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <path d="M9 1L11.06 3.26L14.07 2.75L14.93 5.63L17.66 6.9L16.75 9.87L17.66 12.84L14.93 14.1L14.07 16.98L11.06 16.47L9 18.73L6.94 16.47L3.93 16.98L3.07 14.1L0.34 12.84L1.25 9.87L0.34 6.9L3.07 5.63L3.93 2.75L6.94 3.26L9 1Z" fill="#3B5BF6"/>
                      <path d="M6 9L8 11L12 7" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
                <button onClick={()=>navigate('personal-info')}><ChevronRight size={16} className="text-gray-300"/></button>
              </div>
              {/* Verified badge pill */}
              <div className="flex items-center gap-1.5 mt-1.5 bg-blue-50 rounded-full px-2.5 py-1 w-fit">
                <BadgeCheck size={13} className="text-brand-500" fill="#EBF5FF"/>
                <span className="text-[11px] font-semibold text-brand-500">Verified Service Provider</span>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <div className="flex items-center gap-1"><Star size={12} className="text-amber-400 fill-amber-400"/><span className="text-[12px] text-gray-600 font-semibold">4.8 (128 reviews)</span></div>
                <span className="text-gray-200">|</span>
                <div className="flex items-center gap-1"><CalendarDays size={12} className="text-gray-400"/><span className="text-[11px] text-gray-500">Since Jan 2024</span></div>
              </div>
              <div className="flex items-center gap-1 mt-1"><MapPin size={12} className="text-gray-400"/><span className="text-[11px] text-gray-500">Doha, Qatar</span></div>
            </div>
          </div>
          {/* Profile completion */}
          <button onClick={()=>navigate('profile-guide')} className="mt-4 w-full bg-blue-50 rounded-xl p-3 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center shrink-0"><Shield size={15} className="text-brand-500"/></div>
            <div className="flex-1 text-left"><p className="text-[12px] font-bold text-gray-800">Complete your profile</p><p className="text-[10px] text-gray-500">Increase trust and get more bookings</p></div>
            <div className="text-right"><p className="text-[13px] font-bold text-brand-500">90%</p><div className="w-20 h-1.5 bg-blue-200 rounded-full mt-1"><div className="h-full w-[90%] bg-brand-500 rounded-full"/></div></div>
          </button>
        </div>
        {/* Stats */}
        <div className="bg-white rounded-2xl shadow-sm p-4 grid grid-cols-4 gap-3 divide-x divide-gray-100">
          {[
            {Icon:Briefcase,bg:'bg-blue-50',  color:'text-blue-500',  val:'83',    label:'Completed',  screen:'completed-service'},
            {Icon:Star,     bg:'bg-amber-50', color:'text-amber-500', val:'4.8',   label:'Rating',     screen:'reviews'},
            {Icon:Settings, bg:'bg-purple-50',color:'text-purple-500',val:'98%',   label:'Response',   screen:'performance'},
            {Icon:Clock3,   bg:'bg-green-50', color:'text-green-500', val:'2+ Yrs',label:'Experience', screen:'performance'},
          ].map(s=>(
            <button key={s.label} onClick={()=>navigate(s.screen as any)} className="flex flex-col items-center gap-1 px-1">
              <div className={`w-8 h-8 rounded-lg ${s.bg} flex items-center justify-center`}><s.Icon size={15} className={s.color}/></div>
              <p className="text-[16px] font-bold text-gray-900 leading-tight">{s.val}</p>
              <p className="text-[9px] text-gray-400 text-center leading-tight">{s.label}</p>
            </button>
          ))}
        </div>
        {/* Account */}
        <div>
          <p className="text-[15px] font-bold text-gray-900 mb-2 px-0.5">Account</p>
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden divide-y divide-gray-50">
            {ACC.map(i=>(
              <button key={i.label} onClick={()=>navigate(i.screen as any)} className="w-full flex items-center gap-3 px-4 py-3.5 active:bg-gray-50">
                <div className={`w-9 h-9 rounded-xl ${i.bg} flex items-center justify-center shrink-0`}><i.Icon size={17} className={i.color}/></div>
                <div className="flex-1 text-left"><p className="text-[13px] font-semibold text-gray-800">{i.label}</p><p className="text-[11px] text-gray-400 mt-0.5">{i.sub}</p></div>
                <ChevronRight size={15} className="text-gray-300 shrink-0"/>
              </button>
            ))}
          </div>
        </div>
        {/* Preferences */}
        <div>
          <p className="text-[15px] font-bold text-gray-900 mb-2 px-0.5">Preferences</p>
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden divide-y divide-gray-50">
            {PREF.map(i=>(
              <button key={i.label} onClick={()=>navigate(i.screen as any)} className="w-full flex items-center gap-3 px-4 py-3.5 active:bg-gray-50">
                <div className={`w-9 h-9 rounded-xl ${i.bg} flex items-center justify-center shrink-0`}><i.Icon size={17} className={i.color}/></div>
                <div className="flex-1 text-left"><p className="text-[13px] font-semibold text-gray-800">{i.label}</p><p className="text-[11px] text-gray-400 mt-0.5">{i.sub}</p></div>
                <ChevronRight size={15} className="text-gray-300 shrink-0"/>
              </button>
            ))}
          </div>
        </div>
        {/* Help */}
        <button onClick={()=>navigate('profile-guide')} className="w-full bg-blue-50 rounded-2xl p-4 flex items-center gap-3 text-left">
          <div className="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center shrink-0 relative"><span className="text-2xl">📘</span><span className="absolute -top-1 -right-1 text-xs">✨</span></div>
          <div className="flex-1"><p className="text-[13px] font-bold text-gray-800">Need help with your profile?</p><p className="text-[11px] text-gray-500 mt-0.5 leading-snug">Follow our guide to make the most of your Helpy profile.</p></div>
          <span className="shrink-0 flex items-center gap-0.5 text-brand-500 text-[11px] font-semibold whitespace-nowrap">View Guide →</span>
        </button>
        {/* Sign out */}
        <button className="w-full bg-white rounded-2xl shadow-sm p-4 text-red-400 text-[14px] font-bold">Sign Out</button>
      </div>
    </div>
  )
}
