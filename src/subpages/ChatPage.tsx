import { useState } from 'react'
import { ArrowLeft, Phone, Video, Send, Paperclip, Smile } from 'lucide-react'
import { useNav } from '../context/NavContext'
import { StatusBar } from '../components/shared'

const INITIAL_MESSAGES = [
  { id:1, from:'client', text:"Hi! I'll be at home. Please call me when you arrive.", time:'10:30 AM' },
  { id:2, from:'me', text:'Sure, I will call you 15 minutes before arrival!', time:'10:32 AM' },
  { id:3, from:'client', text:'Great, thank you! Also please bring extra cleaning cloths.', time:'10:35 AM' },
  { id:4, from:'me', text:'No problem, I always carry extra supplies.', time:'10:36 AM' },
  { id:5, from:'client', text:'Perfect! See you tomorrow at 12.', time:'10:37 AM' },
]

const QUICK = ['On my way','Running 10 mins late','Job completed','Can you confirm address?']

export default function ChatPage() {
  const { goBack, params } = useNav()
  const name = params?.name || 'Aisha Al Thani'
  const service = params?.service || 'General Cleaning'
  const [msgs, setMsgs] = useState(INITIAL_MESSAGES)
  const [text, setText] = useState('')

  const send = (t: string) => {
    if (!t.trim()) return
    setMsgs(m => [...m, { id: Date.now(), from: 'me', text: t.trim(), time: 'now' }])
    setText('')
  }

  return (
    <div className="flex flex-col flex-1 bg-[#F4F6FF] overflow-y-auto">
      <StatusBar />
      {/* Header */}
      <div className="bg-white shadow-sm px-4 pt-2 pb-3 flex items-center gap-3">
        <button onClick={goBack} className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center">
          <ArrowLeft size={19} className="text-gray-600" />
        </button>
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-300 to-rose-500 flex items-center justify-center text-white font-bold">
          {name[0]}
        </div>
        <div className="flex-1">
          <p className="text-[14px] font-bold text-gray-900">{name}</p>
          <p className="text-[11px] text-green-500 font-semibold">● Online · {service}</p>
        </div>
        <button className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center"><Phone size={17} className="text-brand-500" /></button>
        <button className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center"><Video size={17} className="text-brand-500" /></button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-visible px-4 py-4 space-y-3">
        <div className="text-center"><span className="text-[11px] text-gray-400 bg-white px-3 py-1 rounded-full shadow-sm">Today</span></div>
        {msgs.map(m => (
          <div key={m.id} className={`flex ${m.from === 'me' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[75%] px-4 py-2.5 rounded-2xl shadow-sm ${m.from === 'me' ? 'bg-brand-500 text-white rounded-br-sm' : 'bg-white text-gray-800 rounded-bl-sm'}`}>
              <p className="text-[13px] leading-snug">{m.text}</p>
              <p className={`text-[10px] mt-1 ${m.from === 'me' ? 'text-white/60' : 'text-gray-400'}`}>{m.time}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Quick replies */}
      <div className="px-3 pb-2 flex gap-2 overflow-x-auto">
        {QUICK.map(q => (
          <button key={q} onClick={() => send(q)} className="shrink-0 text-[11px] font-semibold text-brand-500 bg-blue-50 border border-blue-100 px-3 py-1.5 rounded-full whitespace-nowrap">
            {q}
          </button>
        ))}
      </div>

      {/* Input */}
      <div className="bg-white border-t border-gray-100 px-3 py-3 flex items-center gap-2">
        <button className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center"><Paperclip size={16} className="text-gray-400" /></button>
        <div className="flex-1 flex items-center bg-gray-100 rounded-2xl px-3 py-2 gap-2">
          <input className="flex-1 bg-transparent text-[13px] outline-none placeholder:text-gray-400" placeholder="Type a message..." value={text} onChange={e => setText(e.target.value)} onKeyDown={e => e.key === 'Enter' && send(text)} />
          <Smile size={16} className="text-gray-400 shrink-0" />
        </div>
        <button onClick={() => send(text)} className="w-9 h-9 rounded-xl bg-brand-500 flex items-center justify-center shadow-sm">
          <Send size={15} className="text-white" />
        </button>
      </div>
    </div>
  )
}
