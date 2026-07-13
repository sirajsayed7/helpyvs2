import { useState } from 'react'
import { ArrowLeft, Check, ChevronDown, Star, ThumbsUp } from 'lucide-react'
import { useNav } from '../context/NavContext'
import { StatusBar } from '../components/shared'

const REVIEWS = [
  { name:'Aisha Al Thani',  service:'General Cleaning',   rating:5, date:'May 30, 2024', comment:'Ahmed was incredibly professional and thorough. My apartment has never been cleaner. Highly recommend!', avatar:'A', color:'bg-rose-400' },
  { name:'Fatima Noor',     service:'Move-in / Move-out', rating:5, date:'Jun 1, 2024',  comment:'Excellent work! Everything was spotless and he finished ahead of schedule. Will definitely book again.', avatar:'F', color:'bg-teal-400' },
  { name:'Mohammed Khalid', service:'Deep Cleaning',      rating:4, date:'May 31, 2024', comment:'Very good service, took extra care with the kitchen appliances. A little late but communicated well.', avatar:'M', color:'bg-amber-400' },
  { name:'Sara Al Mannai',  service:'Deep Cleaning',      rating:5, date:'May 29, 2024', comment:'Outstanding attention to detail. Ahmed goes above and beyond every single time. 5 stars!', avatar:'S', color:'bg-sky-400' },
  { name:'Omar Al Farsi',   service:'Move-in / Move-out', rating:5, date:'May 22, 2024', comment:'Made moving into my new place stress-free. Everything was perfectly cleaned. Thank you!', avatar:'O', color:'bg-violet-400' },
  { name:'Reem Al Sulaiti', service:'General Cleaning',   rating:4, date:'May 18, 2024', comment:'Good job overall. The bathroom and kitchen were immaculate. Bedroom could use a bit more attention.', avatar:'R', color:'bg-pink-400' },
  { name:'Khalid Al Kuwari', service:'Sofa Cleaning',      rating:5, date:'May 14, 2024', comment:'The team removed old coffee stains from our sofa and left the fabric looking fresh without any strong chemical smell.', avatar:'K', color:'bg-emerald-400' },
  { name:'Noora Al Marri',   service:'Office Cleaning',    rating:5, date:'May 10, 2024', comment:'Reliable and well organised. They cleaned our office after working hours and everything was ready before the team arrived.', avatar:'N', color:'bg-indigo-400' },
  { name:'Yousef Al Hajri',  service:'Sofa Cleaning',      rating:4, date:'May 6, 2024',  comment:'Very careful with the upholstery and the sofa dried faster than expected. One small corner needed an extra pass.', avatar:'Y', color:'bg-cyan-500' },
]

const SERVICES = [...new Set(REVIEWS.map(review => review.service))]

export default function ReviewsPage() {
  const { goBack } = useNav()
  const [ratingFilter, setRatingFilter] = useState<number | null>(null)
  const [serviceFilter, setServiceFilter] = useState('all')
  const [serviceMenuOpen, setServiceMenuOpen] = useState(false)
  const avg = (REVIEWS.reduce((a,r) => a+r.rating, 0)/REVIEWS.length).toFixed(1)
  const filteredReviews = REVIEWS.filter(review =>
    (ratingFilter === null || review.rating === ratingFilter) &&
    (serviceFilter === 'all' || review.service === serviceFilter)
  )

  return (
    <div className="flex flex-col flex-1 bg-[#F4F6FF] overflow-y-auto">
      <StatusBar />
      <div className="flex items-center gap-3 px-4 pt-2 pb-3">
        <button onClick={goBack} className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center">
          <ArrowLeft size={20} className="text-gray-600" />
        </button>
        <h1 className="text-[18px] font-bold text-gray-900">My Reviews</h1>
      </div>

      <div className="flex-1 overflow-visible px-4 pb-6 space-y-4">
        {/* Summary */}
        <div className="bg-white rounded-2xl shadow-sm px-5 py-3 flex items-center gap-5">
          <div className="text-center">
            <p className="text-[42px] font-bold text-gray-900 leading-none">{avg}</p>
            <div className="flex gap-0.5 mt-1 justify-center">
              {[1,2,3,4,5].map(i => <Star key={i} size={14} className="text-amber-400 fill-amber-400"/>)}
            </div>
            <p className="text-[11px] text-gray-400 mt-1">{REVIEWS.length} reviews</p>
          </div>
          <div className="flex-1 space-y-1.5">
            {[5,4,3,2,1].map(s => {
              const count = REVIEWS.filter(r => r.rating === s).length
              const pct = (count / REVIEWS.length) * 100
              return (
                <div key={s} className="flex items-center gap-2">
                  <span className="text-[11px] text-gray-500 w-3">{s}</span>
                  <Star size={10} className="text-amber-400 fill-amber-400"/>
                  <div className="flex-1 h-1.5 bg-gray-100 rounded-full">
                    <div className="h-full bg-amber-400 rounded-full" style={{width:`${pct}%`}}/>
                  </div>
                  <span className="text-[10px] text-gray-400 w-3">{count}</span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Rating filter */}
        <div>
          <div className="mb-2 flex items-center justify-between">
            <p className="text-[13px] font-bold text-gray-900">Filter reviews</p>
            <p className="text-[11px] text-gray-400">
              {filteredReviews.length} {filteredReviews.length === 1 ? 'review' : 'reviews'}
            </p>
          </div>
          <div className="relative mb-2">
            <button
              type="button"
              onClick={() => setServiceMenuOpen(open => !open)}
              aria-haspopup="listbox"
              aria-expanded={serviceMenuOpen}
              className="flex w-full items-center justify-between rounded-full bg-white py-2.5 pl-4 pr-3 text-left text-[12px] font-semibold text-gray-700 shadow-sm ring-1 ring-black/[0.03] transition focus:outline-none focus:ring-2 focus:ring-brand-200"
            >
              <span>{serviceFilter === 'all' ? 'All services' : serviceFilter}</span>
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#F4F6FF]">
                <ChevronDown
                  size={14}
                  className={`text-gray-500 transition-transform ${serviceMenuOpen ? 'rotate-180' : ''}`}
                />
              </span>
            </button>
            {serviceMenuOpen && (
              <div
                role="listbox"
                aria-label="Filter reviews by service"
                className="absolute left-0 right-0 top-full z-20 mt-2 overflow-hidden rounded-2xl border border-gray-100 bg-white p-1.5 shadow-[0_14px_40px_rgba(31,41,55,0.16)]"
              >
                {[{ value: 'all', label: 'All services' }, ...SERVICES.map(service => ({ value: service, label: service }))].map(option => {
                  const selected = serviceFilter === option.value
                  return (
                    <button
                      key={option.value}
                      type="button"
                      role="option"
                      aria-selected={selected}
                      onClick={() => {
                        setServiceFilter(option.value)
                        setServiceMenuOpen(false)
                      }}
                      className={`flex w-full items-center justify-between rounded-xl px-3.5 py-2.5 text-left text-[12px] transition-colors ${
                        selected
                          ? 'bg-brand-50 font-bold text-brand-600'
                          : 'font-medium text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      {option.label}
                      {selected && <Check size={15} strokeWidth={2.5} />}
                    </button>
                  )
                })}
              </div>
            )}
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1" role="group" aria-label="Filter reviews by star rating">
            <button
              type="button"
              onClick={() => setRatingFilter(null)}
              aria-pressed={ratingFilter === null}
              className={`shrink-0 rounded-full px-5 py-2 text-[12px] font-semibold transition-colors ${
                ratingFilter === null
                  ? 'bg-brand-500 text-white shadow-sm'
                  : 'bg-white text-gray-500 shadow-sm'
              }`}
            >
              All
            </button>
            {[5,4,3,2,1].map(stars => (
              <button
                key={stars}
                type="button"
                onClick={() => setRatingFilter(stars)}
                aria-pressed={ratingFilter === stars}
                className={`flex shrink-0 items-center gap-1 rounded-full px-4 py-2 text-[12px] font-semibold transition-colors ${
                  ratingFilter === stars
                    ? 'bg-brand-500 text-white shadow-sm'
                    : 'bg-white text-gray-500 shadow-sm'
                }`}
              >
                {stars}
                <Star size={12} className={ratingFilter === stars ? 'fill-white text-white' : 'fill-amber-400 text-amber-400'} />
              </button>
            ))}
          </div>
        </div>

        {/* Review cards */}
        <div className="-mt-1 space-y-4">
          {filteredReviews.map((r,i) => (
            <div key={i} className="bg-white rounded-2xl shadow-sm px-4 py-3">
            <div className="flex items-start gap-3">
              <div className={`w-10 h-10 rounded-full ${r.color} flex items-center justify-center text-white font-bold text-sm shrink-0`}>{r.avatar}</div>
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-[13px] font-bold text-gray-900">{r.name}</p>
                    <p className="text-[11px] text-brand-500 font-semibold">{r.service}</p>
                  </div>
                  <p className="text-[11px] text-gray-400">{r.date}</p>
                </div>
                <div className="flex gap-0.5 mt-1.5">
                  {[1,2,3,4,5].map(s => <Star key={s} size={12} className={s <= r.rating ? 'text-amber-400 fill-amber-400' : 'text-gray-200 fill-gray-200'}/>)}
                </div>
                <p className="text-[12px] text-gray-600 mt-2 leading-relaxed">{r.comment}</p>
                <button className="flex items-center gap-1.5 mt-2 text-gray-400 text-[11px]">
                  <ThumbsUp size={12}/> Helpful
                </button>
              </div>
            </div>
            </div>
          ))}
          {filteredReviews.length === 0 && (
            <div className="rounded-2xl bg-white px-5 py-10 text-center shadow-sm">
              <Star size={28} className="mx-auto text-gray-300" />
              <p className="mt-3 text-[13px] font-bold text-gray-700">No reviews match these filters</p>
              <button
                type="button"
                onClick={() => {
                  setRatingFilter(null)
                  setServiceFilter('all')
                }}
                className="mt-2 text-[12px] font-semibold text-brand-500"
              >
                Show all reviews
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
