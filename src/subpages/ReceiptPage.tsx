import { useState } from 'react'
import { jsPDF } from 'jspdf'
import { ArrowLeft, BadgeCheck, BriefcaseBusiness, CalendarDays, Check, CheckCircle2, CreditCard, Download, FileCheck2, Hash, MapPin, MessageSquareText, Quote, ShieldCheck, Star, UserRound } from 'lucide-react'
import { StatusBar } from '../components/shared'
import { useNav } from '../context/NavContext'
import { findCustomerReview } from '../data/customerReviews'

const money = (value: number) => value.toFixed(2)

export default function ReceiptPage() {
  const { goBack, params } = useNav()
  const booking = params || { id: 7, name: 'Layla Hassan', service: 'General Cleaning', date: 'May 25, 2024', time: '10:00 AM', location: 'The Pearl-Qatar', price: '180.00' }
  const [downloaded, setDownloaded] = useState(false)
  const serviceAmount = Number.parseFloat(String(booking.price || '180')) || 180
  const bookingId = String(booking.id || 7).padStart(4, '0')
  const receiptNumber = `HLP-${bookingId}-2024`
  const reference = `TXN-QA-${bookingId}82`
  const review = findCustomerReview(booking.name, booking.service)

  const downloadReceipt = () => {
    const pdf = new jsPDF({ unit: 'mm', format: 'a4' })
    const width = pdf.internal.pageSize.getWidth()
    pdf.setFillColor(37, 99, 235)
    pdf.rect(0, 0, width, 44, 'F')
    pdf.setFillColor(6, 182, 212)
    pdf.circle(width - 12, 2, 27, 'F')
    pdf.setTextColor(255, 255, 255)
    pdf.setFont('helvetica', 'bold')
    pdf.setFontSize(22)
    pdf.text('HELPY', 18, 18)
    pdf.setFontSize(10)
    pdf.setFont('helvetica', 'normal')
    pdf.text('Vendor payment receipt', 18, 27)
    pdf.setFont('helvetica', 'bold')
    pdf.text(receiptNumber, width - 18, 18, { align: 'right' })
    pdf.text('PAID', width - 18, 27, { align: 'right' })

    pdf.setTextColor(15, 23, 42)
    pdf.setFontSize(18)
    pdf.text('Payment received', 18, 59)
    pdf.setTextColor(22, 163, 74)
    pdf.setFontSize(24)
    pdf.text(`${money(serviceAmount)} QR`, width - 18, 59, { align: 'right' })
    pdf.setDrawColor(226, 232, 240)
    pdf.line(18, 69, width - 18, 69)

    const detail = (label: string, value: string, y: number) => {
      pdf.setTextColor(100, 116, 139)
      pdf.setFont('helvetica', 'normal')
      pdf.setFontSize(9)
      pdf.text(label, 18, y)
      pdf.setTextColor(30, 41, 59)
      pdf.setFont('helvetica', 'bold')
      pdf.setFontSize(11)
      pdf.text(value, 18, y + 6)
    }
    detail('CUSTOMER', booking.name || 'Customer', 81)
    detail('SERVICE', booking.service || 'Vendor service', 101)
    detail('COMPLETED ON', `${booking.date || 'May 25, 2024'} at ${booking.time || '10:00 AM'}`, 121)
    detail('LOCATION', booking.location || 'Doha, Qatar', 141)
    detail('TRANSACTION REFERENCE', reference, 161)

    pdf.setFillColor(248, 250, 252)
    pdf.roundedRect(18, 177, width - 36, 42, 4, 4, 'F')
    const line = (label: string, value: string, y: number, strong = false) => {
      pdf.setTextColor(strong ? 15 : 71, strong ? 23 : 85, strong ? 42 : 105)
      pdf.setFont('helvetica', strong ? 'bold' : 'normal')
      pdf.setFontSize(strong ? 11 : 10)
      pdf.text(label, 25, y)
      pdf.text(value, width - 25, y, { align: 'right' })
    }
    line('Service amount', `${money(serviceAmount)} QR`, 190)
    pdf.setDrawColor(226, 232, 240)
    pdf.line(25, 199, width - 25, 199)
    line('Total received', `${money(serviceAmount)} QR`, 211, true)
    pdf.setTextColor(100, 116, 139)
    pdf.setFont('helvetica', 'normal')
    pdf.setFontSize(9)
    pdf.text('Payment method: Card payment', 18, 244)
    pdf.text('Issued by Helpy Marketplace, Doha, Qatar', 18, 251)
    pdf.text('This receipt confirms successful service completion and settlement.', 18, 263)
    pdf.setDrawColor(37, 99, 235)
    pdf.line(18, 276, width - 18, 276)
    pdf.setTextColor(37, 99, 235)
    pdf.setFont('helvetica', 'bold')
    pdf.text('Thank you for providing services through Helpy.', width / 2, 284, { align: 'center' })
    pdf.save(`Helpy-Receipt-${receiptNumber}.pdf`)
    setDownloaded(true)
    window.setTimeout(() => setDownloaded(false), 3000)
  }

  const details = [
    { icon: UserRound, label: 'Customer', value: booking.name || 'Customer' },
    { icon: BriefcaseBusiness, label: 'Service', value: booking.service || 'Vendor service' },
    { icon: CalendarDays, label: 'Completed', value: `${booking.date || 'May 25, 2024'} · ${booking.time || '10:00 AM'}` },
    { icon: MapPin, label: 'Location', value: booking.location || 'Doha, Qatar' },
  ]

  return (
    <div className="flex flex-1 flex-col overflow-y-auto bg-[#EBF5FF]">
      <StatusBar />
      <header className="flex items-center gap-3 px-4 pb-3 pt-2">
        <button onClick={goBack} className="flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-sm" aria-label="Go back">
          <ArrowLeft size={20} className="text-gray-600" />
        </button>
        <div>
          <h1 className="text-[18px] font-bold text-gray-900">Receipt & Review</h1>
          <p className="text-[11px] text-gray-400">Receipt {receiptNumber}</p>
        </div>
      </header>

      <div className="flex-1 space-y-4 px-4 pb-6">
        <section className="rounded-3xl bg-gradient-to-br from-blue-600 via-blue-600 to-cyan-500 p-5 text-white shadow-[0_18px_42px_rgba(37,99,235,0.20)]">
          <div className="flex items-start justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20"><CheckCircle2 size={25} /></div>
            <span className="flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1.5 text-[10px] font-bold"><Check size={13} strokeWidth={3} /> Paid</span>
          </div>
          <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/70">Payment received</p>
          <p className="mt-1 text-[31px] font-extrabold tracking-tight">{money(serviceAmount)} <span className="text-[17px]">QR</span></p>
          <p className="mt-1 text-[11px] text-white/75">Completed on {booking.date || 'May 25, 2024'}</p>
        </section>

        <section className="rounded-3xl border border-white bg-white p-5 shadow-[0_14px_36px_rgba(54,101,145,0.10)]">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50"><img src="/brand/helpy-logo-transparent.png" alt="Helpy" className="h-7 w-8 object-contain" /></div>
              <div><p className="text-[14px] font-extrabold text-slate-900">Helpy</p><p className="text-[10px] text-slate-400">Vendor payment receipt</p></div>
            </div>
            <div className="text-right"><p className="text-[9px] font-bold uppercase tracking-[0.12em] text-slate-400">Receipt no.</p><p className="mt-0.5 text-[11px] font-extrabold text-blue-600">{receiptNumber}</p></div>
          </div>

          <div className="my-5 border-t border-dashed border-slate-200" />
          <div className="space-y-4">
            {details.map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#F1F7FF] text-blue-600"><Icon size={16} /></div>
                <div className="min-w-0 flex-1"><p className="text-[10px] text-slate-400">{label}</p><p className="truncate text-[12px] font-bold text-slate-800">{value}</p></div>
              </div>
            ))}
          </div>

          <div className="my-5 border-t border-dashed border-slate-200" />
          <p className="text-[13px] font-extrabold text-slate-900">Payment summary</p>
          <div className="mt-3 space-y-2.5">
            <div className="flex justify-between text-[12px]"><span className="text-slate-500">Service amount</span><span className="font-bold text-slate-800">{money(serviceAmount)} QR</span></div>
            <div className="h-px bg-slate-100" />
            <div className="flex items-end justify-between"><span className="text-[13px] font-extrabold text-slate-900">Total received</span><span className="text-[19px] font-extrabold text-green-600">{money(serviceAmount)} QR</span></div>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3 rounded-2xl bg-slate-50 p-3.5">
            <div className="flex items-start gap-2"><CreditCard size={15} className="mt-0.5 shrink-0 text-blue-600" /><div><p className="text-[9px] text-slate-400">Payment method</p><p className="text-[10px] font-bold text-slate-700">Card payment</p></div></div>
            <div className="flex items-start gap-2"><Hash size={15} className="mt-0.5 shrink-0 text-blue-600" /><div className="min-w-0"><p className="text-[9px] text-slate-400">Reference</p><p className="truncate text-[10px] font-bold text-slate-700">{reference}</p></div></div>
          </div>
        </section>

        <section className="overflow-hidden rounded-3xl border border-white bg-white shadow-[0_14px_36px_rgba(54,101,145,0.10)]">
          <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-50 text-amber-500"><MessageSquareText size={17} /></div>
              <div><p className="text-[13px] font-extrabold text-slate-900">Customer Review</p><p className="text-[10px] text-slate-400">Feedback for this completed service</p></div>
            </div>
            {review && <span className="flex items-center gap-1 rounded-full bg-green-50 px-2.5 py-1 text-[9px] font-bold text-green-600"><BadgeCheck size={12} /> Verified</span>}
          </div>

          {review ? (
            <div className="p-5">
              <div className="flex items-center gap-3">
                <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${review.color} text-[14px] font-extrabold text-white`}>{review.avatar}</div>
                <div className="min-w-0 flex-1">
                  <p className="text-[13px] font-extrabold text-slate-900">{review.name}</p>
                  <p className="text-[10px] text-slate-400">Reviewed on {review.date}</p>
                </div>
                <div className="flex items-center gap-1 rounded-xl bg-amber-50 px-2.5 py-1.5">
                  <Star size={13} className="fill-amber-400 text-amber-400" />
                  <span className="text-[12px] font-extrabold text-amber-600">{review.rating}.0</span>
                </div>
              </div>
              <div className="mt-4 flex gap-0.5">
                {[1,2,3,4,5].map(star => <Star key={star} size={15} className={star <= review.rating ? 'fill-amber-400 text-amber-400' : 'fill-slate-100 text-slate-200'} />)}
              </div>
              <div className="relative mt-3 rounded-2xl bg-[#F7FAFF] px-4 py-3.5">
                <Quote size={17} className="absolute right-3 top-3 fill-blue-100 text-blue-100" />
                <p className="pr-5 text-[12px] leading-[19px] text-slate-600">{review.comment}</p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center px-5 py-8 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-50"><Star size={21} className="text-slate-300" /></div>
              <p className="mt-3 text-[12px] font-bold text-slate-700">No customer review yet</p>
              <p className="mt-1 max-w-[250px] text-[10px] leading-4 text-slate-400">The customer has not submitted feedback for this completed service.</p>
            </div>
          )}
        </section>

        <div className="flex items-start gap-3 rounded-2xl border border-blue-100 bg-blue-50/80 p-4">
          <ShieldCheck size={19} className="mt-0.5 shrink-0 text-blue-600" />
          <div><p className="text-[11px] font-bold text-slate-800">Verified Helpy transaction</p><p className="mt-0.5 text-[10px] leading-4 text-slate-500">This receipt confirms that the service was completed and payment was settled.</p></div>
          <BadgeCheck size={17} className="ml-auto shrink-0 text-blue-600" />
        </div>

        <button onClick={downloadReceipt} className="flex h-[56px] w-full items-center justify-center gap-2 rounded-[18px] bg-gradient-to-r from-blue-600 to-cyan-500 text-[15px] font-bold text-white shadow-[0_12px_25px_rgba(37,99,235,0.24)] transition active:scale-[0.99]">
          {downloaded ? <FileCheck2 size={19} /> : <Download size={19} />}
          {downloaded ? 'Receipt Downloaded' : 'Download Receipt PDF'}
        </button>
      </div>
    </div>
  )
}
