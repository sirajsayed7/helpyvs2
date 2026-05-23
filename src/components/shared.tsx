import { Home, CalendarCheck, MessageCircle, Wallet, User } from 'lucide-react'

export function StatusBar() {
  return (
    <div className="flex items-center justify-between px-6 pt-4 pb-1 shrink-0">
      <span className="text-[13px] font-semibold text-gray-800">9:41</span>
      <div className="flex items-center gap-1.5">
        <svg width="17" height="12" viewBox="0 0 17 12" fill="none">
          <rect x="0"   y="5" width="3" height="7" rx="1" fill="#1e293b"/>
          <rect x="4.5" y="3" width="3" height="9" rx="1" fill="#1e293b"/>
          <rect x="9"   y="1" width="3" height="11" rx="1" fill="#1e293b"/>
          <rect x="13.5" y="0" width="3" height="12" rx="1" fill="#1e293b"/>
        </svg>
        <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
          <circle cx="8" cy="10.5" r="1.5" fill="#1e293b"/>
          <path d="M4.5,7 C5.8,5.7 7,5 8,5 C9,5 10.2,5.7 11.5,7" stroke="#1e293b" strokeWidth="1.4" strokeLinecap="round" fill="none"/>
          <path d="M1.5,4 C3.5,2 5.7,1 8,1 C10.3,1 12.5,2 14.5,4" stroke="#1e293b" strokeWidth="1.4" strokeLinecap="round" fill="none"/>
        </svg>
        <svg width="25" height="12" viewBox="0 0 25 12" fill="none">
          <rect x="0.5" y="0.5" width="21" height="11" rx="2.5" stroke="#1e293b" strokeWidth="1"/>
          <rect x="2" y="2" width="17" height="8" rx="1.5" fill="#1e293b"/>
          <path d="M22.5,4 L22.5,8" stroke="#1e293b" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      </div>
    </div>
  )
}

type Tab = 'home' | 'bookings' | 'messages' | 'earnings' | 'profile'

interface BottomNavProps {
  active: Tab
  onChange: (t: Tab) => void
  msgBadge?: number
}

const TABS: { id: Tab; label: string; Icon: React.ComponentType<any> }[] = [
  { id: 'home',     label: 'Home',     Icon: Home },
  { id: 'bookings', label: 'Bookings', Icon: CalendarCheck },
  { id: 'messages', label: 'Messages', Icon: MessageCircle },
  { id: 'earnings', label: 'Earnings', Icon: Wallet },
  { id: 'profile',  label: 'Profile',  Icon: User },
]

export function BottomNav({ active, onChange, msgBadge = 3 }: BottomNavProps) {
  return (
    <>
      <div className="shrink-0 bg-white/95 backdrop-blur-md border-t border-gray-100 flex items-center justify-around px-1 pt-3 pb-6 shadow-[0_-4px_24px_rgba(0,0,0,0.07)]">
        {TABS.map(({ id, label, Icon }) => {
          const isActive = active === id
          return (
            <button
              key={id}
              onClick={() => onChange(id)}
              className="flex flex-col items-center gap-0.5 min-w-[52px] relative"
            >
              <div className="relative">
                <Icon
                  size={22}
                  className={isActive ? 'text-brand-500' : 'text-gray-400'}
                  strokeWidth={isActive ? 2.4 : 1.8}
                />
                {id === 'messages' && msgBadge > 0 && (
                  <span className="absolute -top-1.5 -right-2 min-w-[16px] h-4 px-1 rounded-full bg-brand-500 text-white text-[9px] font-bold flex items-center justify-center">
                    {msgBadge}
                  </span>
                )}
              </div>
              <span className={`text-[10px] font-semibold ${isActive ? 'text-brand-500' : 'text-gray-400'}`}>
                {label}
              </span>
              {isActive && (
                <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-5 h-0.5 rounded-full bg-brand-500" />
              )}
            </button>
          )
        })}
      </div>
      <div className="h-1.5 bg-white/95 flex items-center justify-center pb-1">
        <div className="w-28 h-1 rounded-full bg-black/15" />
      </div>
    </>
  )
}

export function WavyBackground() {
  return (
    <div className="absolute top-0 left-0 right-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
      <svg viewBox="0 0 430 300" xmlns="http://www.w3.org/2000/svg" className="w-full" style={{ display: 'block' }}>
        <defs>
          <linearGradient id="heroGrad" x1="0" y1="0" x2="0.2" y2="1">
            <stop offset="0%"   stopColor="#93C5FD" stopOpacity="0.50"/>
            <stop offset="65%"  stopColor="#BAD9FF" stopOpacity="0.25"/>
            <stop offset="100%" stopColor="#EBF5FF" stopOpacity="0"/>
          </linearGradient>
          <linearGradient id="wave2Grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#60A5FA" stopOpacity="0.18"/>
            <stop offset="100%" stopColor="#BFDBFE" stopOpacity="0"/>
          </linearGradient>
        </defs>
        <path d="M0,0 L430,0 L430,200 C380,235 310,168 245,198 C180,228 115,178 55,205 C30,217 12,210 0,215 Z" fill="url(#heroGrad)"/>
        <path d="M0,0 L430,0 L430,155 C365,193 295,128 225,160 C158,190 88,140 25,168 L0,180 Z" fill="url(#wave2Grad)"/>
      </svg>
      <div className="absolute rounded-full" style={{ width:280,height:280,top:-90,right:-90, background:'radial-gradient(circle,rgba(147,197,253,0.32) 0%,transparent 70%)' }}/>
      <div className="absolute rounded-full" style={{ width:200,height:200,top:70,left:-70, background:'radial-gradient(circle,rgba(186,225,255,0.22) 0%,transparent 70%)' }}/>
    </div>
  )
}
