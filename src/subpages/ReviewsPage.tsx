import { ArrowLeft, Star, ThumbsUp } from 'lucide-react'
import { useNav } from '../context/NavContext'
import { StatusBar } from '../components/shared'

const REVIEWS = [
  { name:'Aisha Al Thani',  service:'General Cleaning',   rating:5, date:'May 30, 2024', comment:'Ahmed was incredibly professional and thorough. My apartment has never been cleaner. Highly recommend!', avatar:'A', color:'bg-rose-400' },
  { name:'Fatima Noor',     service:'Move-in / Move-out', rating:5, date:'Jun 1, 2024',  comment:'Excellent work! Everything was spotless and he finished ahead of schedule. Will definitely book again.', avatar:'F', color:'bg-teal-400' },
  { name:'Mohammed Khalid', service:'Deep Cleaning',      rating:4, date:'May 31, 2024', comment:'Very good service, took extra care with the kitchen appliances. A little late but communicated well.', avatar:'M', color:'bg-amber-400' },
  { name:'Sara Al Mannai',  service:'Deep Cleaning',      rating:5, date:'May 29, 2024', comment:'Outstanding attention to detail. Ahmed goes above and beyond every single time. 5 stars!', avatar:'S', color:'bg-sky-400' },
  { name:'Omar Al Farsi',   service:'Move-in / Move-out', rating:5, date:'May 22, 2024', comment:'Made moving into my new place stress-free. Everything was perfectly cleaned. Thank you!', avatar:'O', color:'bg-violet-400' },
  { name:'Reem Al Sulaiti', service:'General Cleaning',   rating:4, date:'May 18, 2024', comment:'Good job overall. The bathroom and kitchen were immaculate. Bedroom could use a bit more attention.', avatar:'R', color:'bg-pink-400' },
]

export default function ReviewsPage() {
  const { goBack } = useNav()
  const avg = (REVIEWS.reduce((a,r) => a+r.rating, 0)/REVIEWS.length).toFixed(1)

  return (
    <div className="flex flex-col flex-1 bg-[#F4F6FF] overflow-hidden">
      <StatusBar />
      <div className="flex items-center gap-3 px-4 pt-2 pb-3">
        <button onClick={goBack} className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center">
          <ArrowLeft size={20} className="text-gray-600" />
        </button>
        <h1 className="text-[18px] font-bold text-gray-900">My Reviews</h1>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-6 space-y-4">
        {/* Summary */}
        <div className="bg-white rounded-2xl shadow-sm p-5 flex items-center gap-5">
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

        {/* Review cards */}
        {REVIEWS.map((r,i) => (
          <div key={i} className="bg-white rounded-2xl shadow-sm p-4">
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
      </div>
    </div>
  )
}
