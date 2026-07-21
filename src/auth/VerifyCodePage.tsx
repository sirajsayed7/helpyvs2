import { ClipboardEvent, FormEvent, KeyboardEvent, useEffect, useRef, useState } from 'react'
import { ArrowLeft, CheckCircle2 } from 'lucide-react'
import { useNav } from '../context/NavContext'

const CODE_LENGTH = 6

export default function VerifyCodePage() {
  const { goBack, params, navigate } = useNav()
  const email = params?.email || 'your email address'
  const [code, setCode] = useState<string[]>(Array(CODE_LENGTH).fill(''))
  const [seconds, setSeconds] = useState(27)
  const [error, setError] = useState('')
  const [sent, setSent] = useState(false)
  const inputs = useRef<Array<HTMLInputElement | null>>([])

  useEffect(() => {
    if (seconds <= 0) return
    const timer = window.setInterval(() => setSeconds((value) => Math.max(0, value - 1)), 1000)
    return () => window.clearInterval(timer)
  }, [seconds])

  const updateDigit = (index: number, value: string) => {
    const digit = value.replace(/\D/g, '').slice(-1)
    setCode((current) => current.map((item, position) => (position === index ? digit : item)))
    setError('')
    if (digit && index < CODE_LENGTH - 1) inputs.current[index + 1]?.focus()
  }

  const handleKeyDown = (index: number, event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Backspace' && !code[index] && index > 0) inputs.current[index - 1]?.focus()
    if (event.key === 'ArrowLeft' && index > 0) inputs.current[index - 1]?.focus()
    if (event.key === 'ArrowRight' && index < CODE_LENGTH - 1) inputs.current[index + 1]?.focus()
  }

  const handlePaste = (event: ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault()
    const digits = event.clipboardData.getData('text').replace(/\D/g, '').slice(0, CODE_LENGTH).split('')
    if (!digits.length) return
    setCode(Array.from({ length: CODE_LENGTH }, (_, index) => digits[index] || ''))
    inputs.current[Math.min(digits.length, CODE_LENGTH) - 1]?.focus()
    setError('')
  }

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    navigate('choose-plan')
  }

  const resend = () => {
    if (seconds > 0) return
    setSeconds(27)
    setSent(true)
    setCode(Array(CODE_LENGTH).fill(''))
    inputs.current[0]?.focus()
    window.setTimeout(() => setSent(false), 2500)
  }

  return (
    <main className="relative h-full overflow-hidden bg-[#EBF5FF]">
      <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 430 932" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <linearGradient id="verifyTop" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#B9D9FA" stopOpacity="0.72" />
            <stop offset="100%" stopColor="#DDEEFF" stopOpacity="0.28" />
          </linearGradient>
          <linearGradient id="verifyWave" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.50" />
            <stop offset="100%" stopColor="#CDE4FB" stopOpacity="0.30" />
          </linearGradient>
        </defs>
        <path d="M0 0H430V42C356 65 320 116 252 160C174 211 95 225 0 196Z" fill="url(#verifyTop)" />
        <path d="M430 92C356 134 327 206 250 257C166 313 74 338 0 392V520C84 455 178 439 267 378C345 324 386 252 430 226Z" fill="url(#verifyWave)" />
        <path d="M0 494C84 436 172 448 251 498C330 548 381 526 430 487V655C352 704 287 674 210 628C132 581 66 594 0 643Z" fill="#D5E9FC" fillOpacity="0.34" />
        <path d="M0 800C91 844 163 846 235 817C315 785 366 787 430 818V932H0Z" fill="#FFFFFF" fillOpacity="0.36" />
      </svg>

      <div className="relative z-10 h-full overflow-y-auto px-5 pb-[max(28px,env(safe-area-inset-bottom))] pt-[max(16px,env(safe-area-inset-top))]">
        <div className="flex items-center justify-between">
          <button type="button" onClick={goBack} aria-label="Go back" className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/80 bg-white/70 text-slate-700 shadow-sm backdrop-blur-md transition active:scale-95">
            <ArrowLeft size={23} />
          </button>
          <div className="h-11 w-11" />
        </div>

        <div className="mt-2 flex justify-center">
          <img src="/brand/helpy-logo-transparent.png" alt="Helpy" className="h-14 w-28 object-contain" />
        </div>

        <div className="mt-12 px-1">
          <h1 className="text-[29px] font-extrabold tracking-tight text-slate-950">Verify Code</h1>
          <p className="mt-1 text-[14px] leading-6 text-slate-500">
            We’ve sent a verification code to <span className="font-bold text-blue-600">{email}</span>. Enter it below to continue.
          </p>
        </div>

        <form onSubmit={submit} className="mt-5 rounded-3xl border border-white bg-white/95 p-5 shadow-[0_18px_45px_rgba(54,101,145,0.13)] backdrop-blur-md">
          <span className="mb-3 block px-1 text-[12px] font-bold text-slate-800">6-digit verification code</span>
          <div className="flex w-full items-center gap-2">
            {code.map((digit, index) => (
              <input
                key={index}
                ref={(element) => { inputs.current[index] = element }}
                value={digit}
                onChange={(event) => updateDigit(index, event.target.value)}
                onKeyDown={(event) => handleKeyDown(index, event)}
                onPaste={handlePaste}
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={1}
                autoFocus={index === 0}
                aria-label={`Verification digit ${index + 1}`}
                className="h-14 w-0 min-w-0 flex-1 rounded-2xl border border-slate-200 bg-[#FBFDFF] text-center text-[20px] font-extrabold text-slate-900 outline-none transition focus:border-sky-300 focus:bg-white focus:ring-4 focus:ring-sky-100/70"
              />
            ))}
          </div>

          {error && <p role="alert" className="mt-3 rounded-xl border border-red-100 bg-red-50 px-3 py-2 text-[12px] font-medium text-red-600">{error}</p>}

          <button type="submit" className="mt-5 h-[52px] w-full rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 text-[16px] font-bold text-white shadow-[0_10px_24px_rgba(37,99,235,0.25)] transition active:scale-[0.99]">
            Continue
          </button>
        </form>

        <div className="mt-6 text-center">
          {sent && <p className="mb-2 flex items-center justify-center gap-1.5 text-[12px] font-bold text-emerald-600"><CheckCircle2 size={15} />A new code has been sent</p>}
          <p className="text-[13px] text-slate-600">Didn’t get a code?</p>
          <button type="button" onClick={resend} disabled={seconds > 0} className={`mt-1 text-[13px] font-bold ${seconds > 0 ? 'cursor-not-allowed text-slate-400' : 'text-blue-600'}`}>
            Resend code{seconds > 0 ? ` in 00:${String(seconds).padStart(2, '0')}` : ''}
          </button>
        </div>
      </div>
    </main>
  )
}
