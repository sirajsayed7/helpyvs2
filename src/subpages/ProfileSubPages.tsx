import { useState } from 'react'
import { ArrowLeft, Save, Bell, Shield, Clock3, Eye, EyeOff, BookOpen } from 'lucide-react'
import { useNav } from '../context/NavContext'
import { StatusBar } from '../components/shared'

function SubPageShell({ title, sub, children }: { title:string; sub?:string; children:React.ReactNode }) {
  const { goBack } = useNav()
  return (
    <div className="flex flex-col flex-1 bg-[#F4F6FF] overflow-hidden">
      <StatusBar />
      <div className="flex items-center gap-3 px-4 pt-2 pb-4">
        <button onClick={goBack} className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center">
          <ArrowLeft size={20} className="text-gray-600" />
        </button>
        <div>
          <h1 className="text-[18px] font-bold text-gray-900">{title}</h1>
          {sub && <p className="text-[11px] text-gray-400">{sub}</p>}
        </div>
      </div>
      <div className="flex-1 overflow-y-auto px-4 pb-6 space-y-4">{children}</div>
    </div>
  )
}

function Field({ label, value, type='text' }: { label:string; value:string; type?:string }) {
  const [v, setV] = useState(value)
  return (
    <div>
      <p className="text-[11px] font-semibold text-gray-400 mb-1">{label}</p>
      <input type={type} value={v} onChange={e => setV(e.target.value)}
        className="w-full bg-gray-50 rounded-xl px-4 py-3 text-[13px] font-semibold text-gray-800 outline-none border border-transparent focus:border-brand-500 transition-colors" />
    </div>
  )
}

export function PersonalInfoPage() {
  const [saved, setSaved] = useState(false)
  return (
    <SubPageShell title="Personal Information" sub="Update your personal details">
      <div className="bg-white rounded-2xl shadow-sm p-5 space-y-4">
        <Field label="Full Name" value="Ahmed Hassan" />
        <Field label="Email Address" value="ahmed.hassan@helpy.qa" type="email" />
        <Field label="Phone Number" value="+974 5512 3456" type="tel" />
        <Field label="Date of Birth" value="15 March 1992" />
        <Field label="Nationality" value="Qatari" />
      </div>
      <div className="bg-white rounded-2xl shadow-sm p-5 space-y-4">
        <p className="text-[14px] font-bold text-gray-800">Address</p>
        <Field label="Street Address" value="Al Waab Street, Villa 12" />
        <Field label="City" value="Doha" />
        <Field label="Country" value="Qatar" />
      </div>
      <button onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 2000) }}
        className={`w-full py-4 rounded-2xl text-white text-[14px] font-bold ${saved ? 'bg-green-500' : 'bg-brand-500'}`}>
        {saved ? '✓ Saved!' : 'Save Changes'}
      </button>
    </SubPageShell>
  )
}

export function BusinessInfoPage() {
  const [saved, setSaved] = useState(false)
  return (
    <SubPageShell title="Business Information" sub="Manage your business details">
      <div className="bg-white rounded-2xl shadow-sm p-5 space-y-4">
        <Field label="Business Name" value="Ahmed's Cleaning Services" />
        <Field label="Commercial Registration No." value="CR-20240115-QA" />
        <Field label="Tax ID" value="TAX-9987654321" />
        <Field label="Business Type" value="Sole Proprietorship" />
        <Field label="Years in Business" value="2 years" />
      </div>
      <div className="bg-white rounded-2xl shadow-sm p-5 space-y-4">
        <p className="text-[14px] font-bold text-gray-800">Service Area</p>
        <Field label="Primary Area" value="Doha, Qatar" />
        <Field label="Coverage Radius" value="25 km" />
      </div>
      <button onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 2000) }}
        className={`w-full py-4 rounded-2xl text-white text-[14px] font-bold ${saved ? 'bg-green-500' : 'bg-brand-500'}`}>
        {saved ? '✓ Saved!' : 'Save Changes'}
      </button>
    </SubPageShell>
  )
}

export function DocumentsPage() {
  const docs = [
    { name:'National ID',          status:'Verified',  date:'Jan 2024',  color:'text-green-500',  bg:'bg-green-50' },
    { name:'Business License',     status:'Verified',  date:'Jan 2024',  color:'text-green-500',  bg:'bg-green-50' },
    { name:'Health Certificate',   status:'Verified',  date:'Mar 2024',  color:'text-green-500',  bg:'bg-green-50' },
    { name:'Insurance Certificate',status:'Expiring',  date:'Dec 2024',  color:'text-amber-500',  bg:'bg-amber-50' },
    { name:'Police Clearance',     status:'Required',  date:'—',         color:'text-red-400',    bg:'bg-red-50'   },
  ]
  return (
    <SubPageShell title="Documents" sub="Manage your certificates">
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden divide-y divide-gray-50">
        {docs.map(d => (
          <div key={d.name} className="flex items-center gap-3 p-4">
            <div className={`w-10 h-10 rounded-xl ${d.bg} flex items-center justify-center shrink-0`}>
              <span className="text-lg">📄</span>
            </div>
            <div className="flex-1">
              <p className="text-[13px] font-bold text-gray-900">{d.name}</p>
              <p className="text-[11px] text-gray-400">{d.date}</p>
            </div>
            <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${d.bg} ${d.color}`}>{d.status}</span>
          </div>
        ))}
      </div>
      <button className="w-full py-4 rounded-2xl bg-brand-500 text-white text-[14px] font-bold">+ Upload New Document</button>
    </SubPageShell>
  )
}

export function BankDetailsPage() {
  const [saved, setSaved] = useState(false)
  return (
    <SubPageShell title="Bank Details" sub="Update payout information">
      <div className="bg-blue-50 rounded-2xl p-4 flex gap-3">
        <span className="text-xl">🔒</span>
        <p className="text-[12px] text-brand-500 leading-relaxed font-semibold">Your banking details are encrypted and secured. We never share your information.</p>
      </div>
      <div className="bg-white rounded-2xl shadow-sm p-5 space-y-4">
        <Field label="Bank Name" value="Qatar National Bank (QNB)" />
        <Field label="Account Holder Name" value="Ahmed Hassan" />
        <Field label="IBAN" value="QA57QNBA000000000000001234567" />
        <Field label="Account Number" value="•••• •••• 4521" />
        <Field label="Swift/BIC" value="QNBAQAQA" />
      </div>
      <button onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 2000) }}
        className={`w-full py-4 rounded-2xl text-white text-[14px] font-bold ${saved ? 'bg-green-500' : 'bg-brand-500'}`}>
        {saved ? '✓ Saved!' : 'Update Bank Details'}
      </button>
    </SubPageShell>
  )
}

export function NotificationSettingsPage() {
  const [settings, setSettings] = useState({
    newBooking:true, bookingReminder:true, payment:true, message:true,
    promotional:false, weeklyReport:true, cancellation:true,
  })
  const toggle = (k: keyof typeof settings) => setSettings(s => ({...s,[k]:!s[k]}))

  const items = [
    {key:'newBooking',     label:'New Booking',      sub:'When a new booking is made'},
    {key:'bookingReminder',label:'Booking Reminder', sub:'24h before each job'},
    {key:'payment',        label:'Payment Received',  sub:'When funds hit your wallet'},
    {key:'message',        label:'New Message',       sub:'Customer messages'},
    {key:'cancellation',   label:'Cancellation',      sub:'When a booking is cancelled'},
    {key:'weeklyReport',   label:'Weekly Report',     sub:'Your performance summary'},
    {key:'promotional',    label:'Promotional',       sub:'Offers and tips from Helpy'},
  ]

  return (
    <SubPageShell title="Notifications" sub="Manage your preferences">
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden divide-y divide-gray-50">
        {items.map(item => (
          <div key={item.key} className="flex items-center gap-3 px-4 py-3.5">
            <div className="flex-1">
              <p className="text-[13px] font-semibold text-gray-800">{item.label}</p>
              <p className="text-[11px] text-gray-400">{item.sub}</p>
            </div>
            <button onClick={() => toggle(item.key as keyof typeof settings)}
              className={`w-11 h-6 rounded-full relative transition-colors ${settings[item.key as keyof typeof settings] ? 'bg-brand-500' : 'bg-gray-200'}`}>
              <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-all ${settings[item.key as keyof typeof settings] ? 'left-6' : 'left-1'}`}/>
            </button>
          </div>
        ))}
      </div>
    </SubPageShell>
  )
}

export function PrivacySecurityPage() {
  const [show, setShow] = useState(false)
  const [twoFA, setTwoFA] = useState(true)
  const [profile, setProfile] = useState('public')

  return (
    <SubPageShell title="Privacy & Security" sub="Manage your account security">
      <div className="bg-white rounded-2xl shadow-sm p-5 space-y-4">
        <p className="text-[14px] font-bold text-gray-800">Change Password</p>
        <div>
          <p className="text-[11px] font-semibold text-gray-400 mb-1">Current Password</p>
          <div className="flex items-center bg-gray-50 rounded-xl px-4 py-3">
            <input type={show ? 'text' : 'password'} defaultValue="mypassword123"
              className="flex-1 bg-transparent text-[13px] outline-none" />
            <button onClick={() => setShow(v => !v)}>{show ? <EyeOff size={16} className="text-gray-400"/> : <Eye size={16} className="text-gray-400"/>}</button>
          </div>
        </div>
        <Field label="New Password" value="" type="password" />
        <Field label="Confirm New Password" value="" type="password" />
        <button className="w-full py-3 rounded-xl bg-brand-500 text-white text-[13px] font-bold">Update Password</button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden divide-y divide-gray-50">
        <div className="flex items-center gap-3 px-4 py-4">
          <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center"><Shield size={16} className="text-brand-500"/></div>
          <div className="flex-1">
            <p className="text-[13px] font-semibold text-gray-800">Two-Factor Authentication</p>
            <p className="text-[11px] text-gray-400">Extra security for your account</p>
          </div>
          <button onClick={() => setTwoFA(v => !v)} className={`w-11 h-6 rounded-full relative transition-colors ${twoFA ? 'bg-brand-500' : 'bg-gray-200'}`}>
            <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-all ${twoFA ? 'left-6' : 'left-1'}`}/>
          </button>
        </div>
        <div className="px-4 py-4">
          <p className="text-[13px] font-semibold text-gray-800 mb-2">Profile Visibility</p>
          <div className="flex gap-2">
            {['public','private'].map(v => (
              <button key={v} onClick={() => setProfile(v)}
                className={`flex-1 py-2 rounded-xl text-[12px] font-semibold capitalize transition-all ${profile===v ? 'bg-brand-500 text-white' : 'bg-gray-100 text-gray-500'}`}>
                {v}
              </button>
            ))}
          </div>
        </div>
      </div>

      <button className="w-full py-4 rounded-2xl bg-red-50 text-red-500 text-[14px] font-bold">Delete Account</button>
    </SubPageShell>
  )
}

export function ProfileGuidePage() {
  const { goBack } = useNav()
  const steps = [
    { done:true,  title:'Add a profile photo',        sub:'Profiles with photos get 3× more bookings',  emoji:'📸' },
    { done:true,  title:'Verify your identity',        sub:'Upload your National ID for trust badges',   emoji:'✅' },
    { done:true,  title:'Add your services',           sub:'List all the services you offer',            emoji:'🧹' },
    { done:true,  title:'Set your availability',       sub:'Tell clients when you are free',             emoji:'📅' },
    { done:false, title:'Upload insurance certificate',sub:'Increase trust with clients',                emoji:'🛡' },
    { done:false, title:'Get your first 5 reviews',    sub:'2 more to go! Complete more bookings',       emoji:'⭐' },
  ]
  return (
    <SubPageShell title="Profile Guide" sub="Maximise your Helpy profile">
      <div className="rounded-2xl p-5 text-center" style={{background:'linear-gradient(135deg,#3B5BF6,#2141E8)'}}>
        <p className="text-white text-[28px] font-bold">90%</p>
        <p className="text-white/80 text-[13px]">Profile complete</p>
        <div className="w-full h-2 bg-white/20 rounded-full mt-3">
          <div className="h-full bg-white rounded-full" style={{width:'90%'}}/>
        </div>
      </div>
      <div className="space-y-3">
        {steps.map((s,i) => (
          <div key={i} className={`bg-white rounded-2xl shadow-sm p-4 flex items-center gap-3 ${s.done ? '' : 'border border-blue-100'}`}>
            <span className="text-2xl">{s.emoji}</span>
            <div className="flex-1">
              <p className={`text-[13px] font-bold ${s.done ? 'text-gray-400 line-through' : 'text-gray-900'}`}>{s.title}</p>
              <p className="text-[11px] text-gray-400 mt-0.5">{s.sub}</p>
            </div>
            <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${s.done ? 'bg-green-100 text-green-600' : 'bg-blue-50 text-brand-500'}`}>
              {s.done ? '✓ Done' : 'To Do'}
            </span>
          </div>
        ))}
      </div>
    </SubPageShell>
  )
}
