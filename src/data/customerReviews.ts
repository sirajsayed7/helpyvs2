export interface CustomerReview {
  name: string
  service: string
  rating: number
  date: string
  comment: string
  avatar: string
  color: string
}

export const CUSTOMER_REVIEWS: CustomerReview[] = [
  { name:'Layla Hassan', service:'General Cleaning', rating:5, date:'May 25, 2024', comment:'The apartment looked spotless and fresh. Everything was completed carefully and right on time. I would happily book this service again.', avatar:'L', color:'bg-lime-500' },
  { name:'Omar Al Farsi', service:'Move-in / Move-out', rating:5, date:'May 22, 2024', comment:'Made moving into my new place stress-free. Everything was perfectly cleaned. Thank you!', avatar:'O', color:'bg-violet-400' },
  { name:'Nour Al Thani', service:'Deep Cleaning', rating:4, date:'May 20, 2024', comment:'A very thorough deep clean with great attention to the kitchen and bathrooms. The team was polite and professional throughout.', avatar:'N', color:'bg-sky-400' },
  { name:'Reem Al Sulaiti', service:'General Cleaning', rating:4, date:'May 18, 2024', comment:'Good job overall. The bathroom and kitchen were immaculate. Bedroom could use a bit more attention.', avatar:'R', color:'bg-pink-400' },
  { name:'Fatima Noor', service:'Move-in / Move-out', rating:5, date:'Jun 1, 2024', comment:'Excellent work! Everything was spotless and the job finished ahead of schedule. I will definitely book again.', avatar:'F', color:'bg-teal-400' },
  { name:'Ahmed Hassan', service:'General Cleaning', rating:5, date:'May 12, 2024', comment:'Punctual, organised and very professional. The whole home was left clean and tidy, exactly as requested.', avatar:'A', color:'bg-amber-400' },
  { name:'Sara Al Mannai', service:'Deep Cleaning', rating:5, date:'May 29, 2024', comment:'Outstanding attention to detail. The service went above and beyond every expectation. Five stars!', avatar:'S', color:'bg-sky-400' },
  { name:'Aisha Al Thani', service:'General Cleaning', rating:5, date:'May 30, 2024', comment:'Ahmed was incredibly professional and thorough. My apartment has never been cleaner. Highly recommend!', avatar:'A', color:'bg-rose-400' },
  { name:'Mohammed Khalid', service:'Deep Cleaning', rating:4, date:'May 31, 2024', comment:'Very good service, took extra care with the kitchen appliances. A little late but communicated well.', avatar:'M', color:'bg-amber-400' },
  { name:'Khalid Al Kuwari', service:'Sofa Cleaning', rating:5, date:'May 14, 2024', comment:'The team removed old coffee stains from our sofa and left the fabric looking fresh without any strong chemical smell.', avatar:'K', color:'bg-emerald-400' },
  { name:'Noora Al Marri', service:'Office Cleaning', rating:5, date:'May 10, 2024', comment:'Reliable and well organised. They cleaned our office after working hours and everything was ready before the team arrived.', avatar:'N', color:'bg-indigo-400' },
  { name:'Yousef Al Hajri', service:'Sofa Cleaning', rating:4, date:'May 6, 2024', comment:'Very careful with the upholstery and the sofa dried faster than expected. One small corner needed an extra pass.', avatar:'Y', color:'bg-cyan-500' },
]

export function findCustomerReview(name?: string, service?: string) {
  return CUSTOMER_REVIEWS.find(review =>
    review.name === name && (!service || review.service === service)
  )
}
