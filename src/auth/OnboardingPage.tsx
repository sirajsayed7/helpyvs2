import { useState } from 'react'
import { useNav } from '../context/NavContext'

const SLIDES = [
  {
    image: '/onboarding/get-jobs.jpeg',
    title: 'Get Jobs That Fit You',
    description: 'Receive job requests that match your skills and location. Accept tasks that fit your schedule and expertise.',
  },
  {
    image: '/onboarding/payments.jpeg',
    title: 'Secure & Easy Payments',
    description: 'Complete jobs and get paid seamlessly through our secure payment system, with transparent earnings tracking.',
  },
  {
    image: '/onboarding/work-your-way.jpeg',
    title: 'Work on Your Terms',
    description: 'Choose when and where you want to work. Set your availability and manage your services with ease.',
  },
]

export default function OnboardingPage() {
  const { navigate } = useNav()
  const [slide, setSlide] = useState(0)
  const current = SLIDES[slide]
  const isLast = slide === SLIDES.length - 1

  return (
    <main className="relative flex h-full min-h-0 flex-col overflow-hidden bg-[#E8F8FF]">
      <section className="relative h-[58%] shrink-0 overflow-hidden bg-[#E8F8FF]">
        <img
          key={current.image}
          src={current.image}
          alt=""
          className="h-full w-full object-cover object-top"
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#E8F8FF] to-transparent" />
      </section>

      <section className="relative -mt-7 flex min-h-0 flex-1 flex-col rounded-t-[34px] bg-white px-7 pb-[max(22px,env(safe-area-inset-bottom))] pt-7 shadow-[0_-8px_30px_rgba(25,73,108,0.05)]">
        <div className="flex justify-center gap-2" aria-label={`Slide ${slide + 1} of ${SLIDES.length}`}>
          {SLIDES.map((item, index) => (
            <button
              key={item.title}
              type="button"
              aria-label={`Open slide ${index + 1}`}
              onClick={() => setSlide(index)}
              className={`h-2.5 rounded-full transition-all ${index === slide ? 'w-8 bg-[#1484B8]' : 'w-2.5 bg-gray-300'}`}
            />
          ))}
        </div>

        <div className="mx-auto mt-7 max-w-[360px] text-center">
          <h1 className="text-[28px] font-extrabold leading-tight tracking-tight text-slate-950">{current.title}</h1>
          <p className="mt-4 text-[15px] leading-6 text-slate-600">{current.description}</p>
        </div>

        <div className="mt-auto pt-6">
          {isLast ? (
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => navigate('sign-up')}
                className="h-14 rounded-2xl bg-[#0AAAD6] text-[16px] font-bold text-white shadow-[0_8px_18px_rgba(10,170,214,0.22)] transition active:scale-[0.98]"
              >
                Sign Up
              </button>
              <button
                type="button"
                onClick={() => navigate('login')}
                className="h-14 rounded-2xl bg-[#187FB3] text-[16px] font-bold text-white shadow-[0_8px_18px_rgba(24,127,179,0.22)] transition active:scale-[0.98]"
              >
                Login
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => setSlide(SLIDES.length - 1)}
                className="h-14 w-[30%] rounded-2xl text-[16px] font-bold text-[#0AAAD6] transition active:bg-sky-50"
              >
                Skip
              </button>
              <button
                type="button"
                onClick={() => setSlide((value) => Math.min(value + 1, SLIDES.length - 1))}
                className="h-14 flex-1 rounded-2xl bg-[#187FB3] text-[16px] font-bold text-white shadow-[0_8px_18px_rgba(24,127,179,0.22)] transition active:scale-[0.98]"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
