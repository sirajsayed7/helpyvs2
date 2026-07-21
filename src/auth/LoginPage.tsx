import { FormEvent, useState } from 'react'
import { ArrowLeft } from 'lucide-react'
import { useNav } from '../context/NavContext'

export default function LoginPage() {
  const { goBack, navigate } = useNav()
  const [email, setEmail] = useState('')

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    navigate('verify-code', { email })
  }

  return (
    <main className="relative h-full overflow-hidden bg-[#EBF5FF]">
      <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 430 932" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <linearGradient id="loginTop" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#B9D9FA" stopOpacity="0.72" />
            <stop offset="100%" stopColor="#DDEEFF" stopOpacity="0.28" />
          </linearGradient>
          <linearGradient id="loginWave" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.50" />
            <stop offset="100%" stopColor="#CDE4FB" stopOpacity="0.30" />
          </linearGradient>
        </defs>
        <path d="M0 0H430V42C356 65 320 116 252 160C174 211 95 225 0 196Z" fill="url(#loginTop)" />
        <path d="M430 92C356 134 327 206 250 257C166 313 74 338 0 392V520C84 455 178 439 267 378C345 324 386 252 430 226Z" fill="url(#loginWave)" />
        <path d="M0 494C84 436 172 448 251 498C330 548 381 526 430 487V655C352 704 287 674 210 628C132 581 66 594 0 643Z" fill="#D5E9FC" fillOpacity="0.34" />
        <path d="M0 800C91 844 163 846 235 817C315 785 366 787 430 818V932H0Z" fill="#FFFFFF" fillOpacity="0.36" />
      </svg>

      <div className="relative z-10 h-full overflow-y-auto px-5 pb-[max(28px,env(safe-area-inset-bottom))] pt-[max(16px,env(safe-area-inset-top))]">
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={goBack}
            aria-label="Go back"
            className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/80 bg-white/70 text-slate-700 shadow-sm backdrop-blur-md transition active:scale-95"
          >
            <ArrowLeft size={23} />
          </button>
          <div className="h-11 w-11" />
        </div>

        <div className="mt-2 flex justify-center">
          <img src="/brand/helpy-logo-transparent.png" alt="Helpy" className="h-14 w-28 object-contain" />
        </div>

        <div className="mt-12 px-1">
          <h1 className="text-[29px] font-extrabold tracking-tight text-slate-950">Welcome Back</h1>
          <p className="mt-1 text-[14px] text-slate-500">Log in to manage your services and bookings.</p>
        </div>

        <form onSubmit={submit} className="mt-5 space-y-4 rounded-3xl border border-white bg-white/95 p-5 shadow-[0_18px_45px_rgba(54,101,145,0.13)] backdrop-blur-md">
          <label className="block">
            <span className="mb-1.5 block px-1 text-[12px] font-bold text-slate-800">Email Address</span>
            <div className="flex h-12 items-center rounded-2xl border border-slate-200 bg-[#FBFDFF] px-4 transition focus-within:border-sky-300 focus-within:bg-white focus-within:ring-4 focus-within:ring-sky-100/70">
              <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Enter your email address" autoComplete="email" className="w-full bg-transparent text-[14px] text-slate-900 outline-none placeholder:text-slate-400" />
            </div>
          </label>

          <button type="submit" className="h-[52px] w-full rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 text-[16px] font-bold text-white shadow-[0_10px_24px_rgba(37,99,235,0.25)] transition active:scale-[0.99]">
            Login
          </button>
        </form>

        <p className="mt-5 text-center text-[13px] text-slate-500">
          New to Helpy?{' '}
          <button type="button" onClick={() => navigate('sign-up')} className="font-bold text-blue-600">Create an account</button>
        </p>
      </div>
    </main>
  )
}
