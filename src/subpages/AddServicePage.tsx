import { ChangeEvent, FormEvent, ReactNode, useRef, useState } from 'react'
import {
  ArrowLeft,
  Check,
  CheckCircle2,
  ChevronDown,
  ImagePlus,
  Loader2,
  UploadCloud,
  X,
} from 'lucide-react'
import { StatusBar } from '../components/shared'
import { useNav } from '../context/NavContext'
import { saveVendorService, uploadVendorMedia } from '../lib/marketplace'

const CATEGORIES = [
  'Home Services',
  'Car Services',
  'Laundry',
  'Salon & Spa',
  'Maintenance',
  'Digital',
  'Education',
  'Deliveries',
  'Travel',
]

const SERVICE_OPTIONS: Record<string, string[]> = {
  'Home Services': ['General Cleaning', 'Deep Cleaning', 'Move-in / Move-out', 'Sofa Cleaning', 'Office Cleaning'],
  'Car Services': ['Basic Wash', 'Premium Wash', 'Full Detail', 'Interior Cleaning'],
  Laundry: ['Wash & Fold', 'Dry Cleaning', 'Ironing', 'Bedding Laundry'],
  'Salon & Spa': ['Hair Styling', 'Facial Treatment', 'Manicure & Pedicure', 'Massage'],
  Maintenance: ['AC Service', 'Plumbing Visit', 'Electrical Check', 'General Repair'],
  Digital: ['Logo Design', 'Website Design', 'Social Media Design', 'Device Setup'],
  Education: ['Math Tutoring', 'English Tutoring', 'Exam Preparation', 'Homework Support'],
  Deliveries: ['Same-day Delivery', 'Document Courier', 'Scheduled Pickup'],
  Travel: ['Travel Package', 'Airport Transfer', 'Tour Booking', 'Hotel Booking'],
}

const DURATION_UNITS = ['Minutes', 'Hours', 'Days', 'Weeks']
const BOOKING_TYPES = ['Instant booking', 'Request approval', 'Request a quote']
const MAX_FILE_BYTES = 1024 * 1024

type FormState = {
  category: string
  preset: string
  nameEnglish: string
  nameArabic: string
  durationUnit: string
  duration: string
  price: string
  specialtyEnglish: string
  specialtyArabic: string
  bookingType: string
  descriptionEnglish: string
  descriptionArabic: string
}

const INITIAL_FORM: FormState = {
  category: 'Home Services',
  preset: '',
  nameEnglish: '',
  nameArabic: '',
  durationUnit: 'Hours',
  duration: '1',
  price: '',
  specialtyEnglish: '',
  specialtyArabic: '',
  bookingType: 'Instant booking',
  descriptionEnglish: '',
  descriptionArabic: '',
}

function SelectField({
  label,
  value,
  options,
  onChange,
}: {
  label: string
  value: string
  options: string[]
  onChange: (value: string) => void
}) {
  const [open, setOpen] = useState(false)
  return (
    <div className="relative">
      <span className="mb-1.5 block px-1 text-[12px] font-bold text-slate-800">{label}</span>
      <button
        type="button"
        onClick={() => setOpen(value => !value)}
        className={`flex h-12 w-full items-center justify-between rounded-2xl border bg-[#FBFDFF] px-4 text-left transition ${
          open ? 'border-sky-300 bg-white ring-4 ring-sky-100/70' : 'border-slate-200'
        }`}
      >
        <p className={`min-w-0 truncate text-[14px] ${value ? 'font-semibold text-slate-900' : 'text-slate-400'}`}>
          {value || `Select ${label.toLowerCase()}`}
        </p>
        <ChevronDown size={18} className={`shrink-0 text-gray-400 transition ${open ? 'rotate-180 text-brand-500' : ''}`} />
      </button>
      {open && (
        <>
          <button type="button" aria-label="Close options" onClick={() => setOpen(false)} className="fixed inset-0 z-30 cursor-default" />
          <div className="absolute left-0 right-0 top-full z-40 mt-2 max-h-56 overflow-y-auto rounded-2xl border border-blue-100 bg-white p-2 shadow-[0_18px_42px_rgba(15,23,42,0.18)]">
            {options.map(option => (
              <button
                type="button"
                key={option}
                onClick={() => {
                  onChange(option)
                  setOpen(false)
                }}
                className={`flex w-full items-center justify-between rounded-[14px] px-3 py-3 text-left text-[13px] font-bold ${
                  option === value ? 'bg-blue-50 text-brand-600' : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {option}
                {option === value && <Check size={16} />}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

function TextField({
  label,
  value,
  onChange,
  type = 'text',
  required = false,
  placeholder = '',
  suffix,
  dir,
}: {
  label: string
  value: string
  onChange: (value: string) => void
  type?: string
  required?: boolean
  placeholder?: string
  suffix?: string
  dir?: 'rtl' | 'ltr'
}) {
  return (
    <label className="block">
      <span className="mb-1.5 flex items-center gap-1.5 px-1 text-[12px] font-bold text-slate-800">
        {label}{!required && <span className="font-medium text-slate-400">(Optional)</span>}
      </span>
      <span className="flex h-12 items-center gap-2 rounded-2xl border border-slate-200 bg-[#FBFDFF] px-4 transition focus-within:border-sky-300 focus-within:bg-white focus-within:ring-4 focus-within:ring-sky-100/70">
        <input
          required={required}
          dir={dir}
          type={type}
          min={type === 'number' ? '0' : undefined}
          step={type === 'number' ? '0.01' : undefined}
          value={value}
          onChange={event => onChange(event.target.value)}
          placeholder={placeholder}
          className="min-w-0 flex-1 bg-transparent text-[14px] text-slate-900 outline-none placeholder:text-slate-400"
        />
        {suffix && <span className="text-[12px] font-bold text-gray-400">{suffix}</span>}
      </span>
    </label>
  )
}

function TextAreaField({
  label,
  value,
  onChange,
  placeholder,
  dir,
}: {
  label: string
  value: string
  onChange: (value: string) => void
  placeholder: string
  dir?: 'rtl' | 'ltr'
}) {
  return (
    <label className="block">
      <span className="mb-1.5 flex items-center gap-1.5 px-1 text-[12px] font-bold text-slate-800">
        {label}{label.includes('Arabic') && <span className="font-medium text-slate-400">(Optional)</span>}
      </span>
      <div className="rounded-2xl border border-slate-200 bg-[#FBFDFF] px-4 py-3 transition focus-within:border-sky-300 focus-within:bg-white focus-within:ring-4 focus-within:ring-sky-100/70">
        <textarea
          dir={dir}
          rows={4}
          maxLength={500}
          value={value}
          onChange={event => onChange(event.target.value)}
          placeholder={placeholder}
          className="w-full resize-none bg-transparent text-[13px] leading-5 text-slate-800 outline-none placeholder:text-slate-400"
        />
        <span className="block text-right text-[9px] font-semibold text-slate-300">{value.length}/500</span>
      </div>
    </label>
  )
}

function UploadField({
  title,
  help,
  file,
  preview,
  onSelect,
  onRemove,
  inputRef,
  children,
}: {
  title: string
  help: string
  file: File | null
  preview: string
  onSelect: (event: ChangeEvent<HTMLInputElement>) => void
  onRemove: () => void
  inputRef: React.RefObject<HTMLInputElement>
  children?: ReactNode
}) {
  return (
    <div>
      <input ref={inputRef} type="file" accept="image/png,image/jpeg,image/webp" onChange={onSelect} className="hidden" />
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="relative flex min-h-[126px] w-full items-center justify-center overflow-hidden rounded-3xl border-2 border-dashed border-blue-200 bg-[#FBFDFF] text-center"
      >
        {preview ? (
          <>
            <img src={preview} alt="" className="absolute inset-0 h-full w-full object-cover" />
            <span className="absolute inset-0 bg-slate-950/35" />
            <span className="relative rounded-full bg-white/95 px-4 py-2 text-[12px] font-bold text-brand-600">Replace image</span>
          </>
        ) : (
          <span className="flex flex-col items-center px-4">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-brand-500">
              {children || <UploadCloud size={21} />}
            </span>
            <span className="mt-2 text-[13px] font-bold text-gray-900">{title}</span>
            <span className="mt-0.5 text-[10px] font-semibold text-gray-400">PNG, JPG or WEBP</span>
          </span>
        )}
      </button>
      <div className="mt-2 flex items-start justify-between gap-3 px-1">
        <p className="text-[10px] leading-4 text-gray-400">{help}</p>
        {file && (
          <button type="button" onClick={onRemove} className="flex shrink-0 items-center gap-1 text-[10px] font-bold text-red-400">
            <X size={12} /> Remove
          </button>
        )}
      </div>
    </div>
  )
}

export default function AddServicePage() {
  const { goBack, navigate } = useNav()
  const [form, setForm] = useState<FormState>(INITIAL_FORM)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [bannerFile, setBannerFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState('')
  const [bannerPreview, setBannerPreview] = useState('')
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')
  const imageRef = useRef<HTMLInputElement>(null)
  const bannerRef = useRef<HTMLInputElement>(null)

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => setForm(current => ({ ...current, [key]: value }))

  const chooseFile = (kind: 'image' | 'banner') => (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    event.target.value = ''
    if (!file) return
    if (file.size > MAX_FILE_BYTES) {
      setError('Please choose an image smaller than 1 MB.')
      return
    }
    setError('')
    const preview = URL.createObjectURL(file)
    if (kind === 'image') {
      if (imagePreview) URL.revokeObjectURL(imagePreview)
      setImageFile(file)
      setImagePreview(preview)
    } else {
      if (bannerPreview) URL.revokeObjectURL(bannerPreview)
      setBannerFile(file)
      setBannerPreview(preview)
    }
  }

  const clearImage = (kind: 'image' | 'banner') => {
    if (kind === 'image') {
      if (imagePreview) URL.revokeObjectURL(imagePreview)
      setImageFile(null)
      setImagePreview('')
    } else {
      if (bannerPreview) URL.revokeObjectURL(bannerPreview)
      setBannerFile(null)
      setBannerPreview('')
    }
  }

  const submit = async (event: FormEvent) => {
    event.preventDefault()
    if (!form.nameEnglish.trim() || !form.duration || !form.price || Number(form.price) < 0) {
      setError('Complete the service name, duration, and price before continuing.')
      return
    }
    setSaving(true)
    setError('')
    try {
      const [imageUrl, bannerUrl] = await Promise.all([
        imageFile ? uploadVendorMedia(imageFile, 'service-images') : Promise.resolve(''),
        bannerFile ? uploadVendorMedia(bannerFile, 'service-banners') : Promise.resolve(''),
      ])
      const descriptionParts = [
        form.descriptionEnglish.trim(),
        form.specialtyEnglish.trim() ? `Speciality: ${form.specialtyEnglish.trim()}` : '',
        form.nameArabic.trim() ? `Arabic name: ${form.nameArabic.trim()}` : '',
        form.specialtyArabic.trim() ? `Arabic speciality: ${form.specialtyArabic.trim()}` : '',
        form.descriptionArabic.trim(),
      ].filter(Boolean)
      await saveVendorService({
        name: form.nameEnglish.trim(),
        description: descriptionParts.join('\n'),
        category: form.category,
        price: Number(form.price),
        duration: `${form.duration} ${form.durationUnit.toLowerCase()}`,
        image_url: bannerUrl || imageUrl || null,
        is_active: true,
      })
      setSaved(true)
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Unable to add this service')
    } finally {
      setSaving(false)
    }
  }

  if (saved) {
    return (
      <div className="flex flex-1 flex-col bg-[#F4F6FF]">
        <StatusBar />
        <div className="flex flex-1 flex-col items-center justify-center px-7 pb-12 text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
            <CheckCircle2 size={42} className="text-green-500" />
          </div>
          <h1 className="mt-5 text-[23px] font-bold text-gray-900">Service added successfully</h1>
          <p className="mt-2 max-w-[300px] text-[12px] leading-5 text-gray-500">
            <strong>{form.nameEnglish}</strong> is active and ready to appear in the Helpy customer marketplace.
          </p>
          <button onClick={() => navigate('manage-services')} className="mt-7 w-full rounded-2xl bg-brand-500 py-4 text-[14px] font-bold text-white shadow-lg shadow-blue-200">
            Back to Manage Services
          </button>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={submit} className="flex flex-1 flex-col overflow-hidden bg-[#EBF5FF]">
      <StatusBar />
      <div className="flex shrink-0 items-center gap-3 px-4 pb-3 pt-2">
        <button type="button" onClick={goBack} className="flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-sm">
          <ArrowLeft size={20} className="text-gray-600" />
        </button>
        <div>
          <h1 className="text-[19px] font-bold text-gray-900">Add Service</h1>
          <p className="text-[11px] text-gray-400">Create a customer-facing service</p>
        </div>
      </div>

      <div className="flex-1 space-y-4 overflow-y-auto px-4 pb-6">
        <section className="space-y-4 rounded-3xl border border-white bg-white/95 p-5 shadow-[0_18px_45px_rgba(54,101,145,0.10)] backdrop-blur-md">
          <div className="flex items-start gap-3">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[12px] font-black text-brand-600">1</span>
            <div>
              <p className="text-[14px] font-bold text-[#172033]">Service basics</p>
              <p className="mt-0.5 text-[10px] leading-4 text-[#8a96aa]">Choose a category and give customers a clear service name.</p>
            </div>
          </div>
          <SelectField
            label="Category"
            value={form.category}
            options={CATEGORIES}
            onChange={value => setForm(current => ({ ...current, category: value, preset: '' }))}
          />
          <SelectField
            label="Service"
            value={form.preset}
            options={[...(SERVICE_OPTIONS[form.category] || []), 'Other / Custom service']}
            onChange={value => setForm(current => ({
              ...current,
              preset: value,
              nameEnglish: value === 'Other / Custom service' ? '' : value,
            }))}
          />
          <TextField label="Name in English" required value={form.nameEnglish} onChange={value => update('nameEnglish', value)} placeholder="e.g. Logo Designer" />
          <TextField label="Name in Arabic" value={form.nameArabic} onChange={value => update('nameArabic', value)} placeholder="اسم الخدمة" dir="rtl" />
        </section>

        <section className="space-y-4 rounded-3xl border border-white bg-white/95 p-5 shadow-[0_18px_45px_rgba(54,101,145,0.10)] backdrop-blur-md">
          <div className="flex items-start gap-3">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-[12px] font-black text-amber-600">2</span>
            <div>
              <p className="text-[14px] font-bold text-[#172033]">Pricing &amp; duration</p>
              <p className="mt-0.5 text-[10px] leading-4 text-[#8a96aa]">Set the price, estimated time, and how bookings are confirmed.</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <SelectField label="Duration unit" value={form.durationUnit} options={DURATION_UNITS} onChange={value => update('durationUnit', value)} />
            <TextField label="Duration" required type="number" value={form.duration} onChange={value => update('duration', value)} placeholder="1" />
          </div>
          <TextField label="Price" required type="number" value={form.price} onChange={value => update('price', value)} placeholder="0.00" suffix="QR" />
          <SelectField label="Booking type" value={form.bookingType} options={BOOKING_TYPES} onChange={value => update('bookingType', value)} />
        </section>

        <section className="space-y-4 rounded-3xl border border-white bg-white/95 p-5 shadow-[0_18px_45px_rgba(54,101,145,0.10)] backdrop-blur-md">
          <div className="flex items-start gap-3">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-purple-50 text-[12px] font-black text-purple-600">3</span>
            <div>
              <p className="text-[14px] font-bold text-[#172033]">Service information</p>
              <p className="mt-0.5 text-[10px] leading-4 text-[#8a96aa]">Explain the speciality and exactly what customers receive.</p>
            </div>
          </div>
          <TextField label="Service speciality in English" value={form.specialtyEnglish} onChange={value => update('specialtyEnglish', value)} placeholder="e.g. Brand identity and logo design" />
          <TextField label="Service speciality in Arabic" value={form.specialtyArabic} onChange={value => update('specialtyArabic', value)} placeholder="تخصص الخدمة" dir="rtl" />
          <TextAreaField label="Description in English" value={form.descriptionEnglish} onChange={value => update('descriptionEnglish', value)} placeholder="Describe what is included, how the service works, and what the customer should expect." />
          <TextAreaField label="Description in Arabic" value={form.descriptionArabic} onChange={value => update('descriptionArabic', value)} placeholder="اكتب وصف الخدمة باللغة العربية" dir="rtl" />
        </section>

        <section className="space-y-4 rounded-3xl border border-white bg-white/95 p-5 shadow-[0_18px_45px_rgba(54,101,145,0.10)] backdrop-blur-md">
          <div className="flex items-start gap-3">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-[12px] font-black text-emerald-600">4</span>
            <div>
              <p className="text-[14px] font-bold text-[#172033]">Service media</p>
              <p className="mt-0.5 text-[10px] leading-4 text-[#8a96aa]">Add clean imagery that represents the service professionally.</p>
            </div>
          </div>
          <UploadField
            title="Add service image"
            help="Up to 1 MB. Recommended dimensions: 164 × 164 px."
            file={imageFile}
            preview={imagePreview}
            onSelect={chooseFile('image')}
            onRemove={() => clearImage('image')}
            inputRef={imageRef}
          >
            <ImagePlus size={21} />
          </UploadField>
          <UploadField
            title="Add service banner"
            help="Up to 1 MB. Recommended dimensions: 375 × 240 px."
            file={bannerFile}
            preview={bannerPreview}
            onSelect={chooseFile('banner')}
            onRemove={() => clearImage('banner')}
            inputRef={bannerRef}
          />
        </section>

        {error && <div className="rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-[11px] font-semibold text-red-600">{error}</div>}
      </div>

      <div className="shrink-0 border-t border-blue-100 bg-[#EBF5FF]/95 px-4 pb-3 pt-3 backdrop-blur">
        <button
          disabled={saving}
          className="flex h-[56px] w-full items-center justify-center gap-2 rounded-[18px] bg-gradient-to-r from-[#2868ef] to-[#10b6c6] text-[15px] font-bold text-white shadow-lg shadow-blue-200 disabled:opacity-60"
        >
          {saving ? <Loader2 size={18} className="animate-spin" /> : <UploadCloud size={18} />}
          {saving ? 'Adding service…' : 'Add Service'}
        </button>
      </div>
    </form>
  )
}
