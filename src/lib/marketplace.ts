import { createClient } from '@supabase/supabase-js'

export type VendorService = {
  id: string
  vendor_id: string
  name: string
  description: string
  category: string
  price: number
  duration: string
  image_url: string | null
  is_active: boolean
  bookings_count: number
}

export type DayAvailability = {
  day_of_week: number
  enabled: boolean
  start_time: string
  end_time: string
  time_blocks?: { start_time: string; end_time: string }[] | null
}

export type PromotionDraft = {
  promotionKind: 'service' | 'event' | 'banner'
  offerType?: 'discount' | 'fixed'
  title: string
  description: string
  target: string
  duration: string
  dealValue?: string
  dealLabel?: string
  promoFee?: string
  bannerCreativeMode?: 'upload' | 'request'
  bannerDesignBrief?: string
  ctaLabel?: string
}

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined
export const marketplaceConfigured = Boolean(url && anonKey)
export const supabase = marketplaceConfigured ? createClient(url!, anonKey!) : null

const SERVICE_CACHE_KEY = 'helpy.vendor.services.v1'
const AVAILABILITY_CACHE_KEY = 'helpy.vendor.availability.v1'
const AVAILABILITY_BLOCKS_CACHE_KEY = 'helpy.vendor.availability.blocks.v1'

export const DEFAULT_SERVICES: VendorService[] = [
  { id: 'demo-general', vendor_id: 'demo', name: 'General Cleaning', description: 'Regular home cleaning and maintenance.', category: 'Home', price: 150, duration: '2-3 hrs', image_url: null, is_active: true, bookings_count: 45 },
  { id: 'demo-deep', vendor_id: 'demo', name: 'Deep Cleaning', description: 'Detailed kitchen, bathroom, and living-area care.', category: 'Home', price: 280, duration: '4-6 hrs', image_url: null, is_active: true, bookings_count: 23 },
  { id: 'demo-move', vendor_id: 'demo', name: 'Move-in / Move-out', description: 'Complete cleaning for new or empty spaces.', category: 'Home', price: 350, duration: '5-7 hrs', image_url: null, is_active: true, bookings_count: 12 },
  { id: 'demo-office', vendor_id: 'demo', name: 'Office Cleaning', description: 'Professional workspace and office cleaning.', category: 'Home', price: 200, duration: '3-4 hrs', image_url: null, is_active: false, bookings_count: 3 },
]

export const DEFAULT_AVAILABILITY: DayAvailability[] = [
  { day_of_week: 1, enabled: true, start_time: '08:00', end_time: '18:00' },
  { day_of_week: 2, enabled: true, start_time: '08:00', end_time: '18:00' },
  { day_of_week: 3, enabled: true, start_time: '08:00', end_time: '18:00' },
  { day_of_week: 4, enabled: true, start_time: '08:00', end_time: '18:00' },
  { day_of_week: 5, enabled: true, start_time: '09:00', end_time: '16:00' },
  { day_of_week: 6, enabled: true, start_time: '10:00', end_time: '15:00' },
  { day_of_week: 0, enabled: false, start_time: '09:00', end_time: '17:00' },
]

const readCache = <T,>(key: string, fallback: T): T => {
  try {
    const value = localStorage.getItem(key)
    return value ? JSON.parse(value) : fallback
  } catch {
    return fallback
  }
}

const writeCache = (key: string, value: unknown) => localStorage.setItem(key, JSON.stringify(value))

let vendorPromise: Promise<string> | null = null

async function ensureVendor(): Promise<string> {
  if (!supabase) return 'demo'
  if (vendorPromise) return vendorPromise

  vendorPromise = (async () => {
    let { data: { session } } = await supabase.auth.getSession()
    if (!session) {
      const result = await supabase.auth.signInAnonymously()
      if (result.error || !result.data.user) throw result.error || new Error('Unable to start vendor session')
      session = result.data.session
    }

    const vendorId = session!.user.id
    const { error } = await supabase.from('vendors').upsert({
      id: vendorId,
      business_name: 'Ahmed Cleaning Services',
      category: 'Home Services',
      description: 'Professional cleaning services across Doha.',
      is_active: true,
    }, { onConflict: 'id' })
    if (error) throw error
    return vendorId
  })()

  return vendorPromise
}

async function seedVendorServices(vendorId: string) {
  if (!supabase) return
  const { count, error } = await supabase.from('services').select('*', { count: 'exact', head: true }).eq('vendor_id', vendorId)
  if (error || count) return
  await supabase.from('services').insert(DEFAULT_SERVICES.map(({ id: _id, vendor_id: _vendor, ...service }) => ({ ...service, vendor_id: vendorId })))
}

export async function listVendorServices(): Promise<VendorService[]> {
  if (!supabase) return readCache(SERVICE_CACHE_KEY, DEFAULT_SERVICES)
  const vendorId = await ensureVendor()
  await seedVendorServices(vendorId)
  const { data, error } = await supabase.from('services').select('*').eq('vendor_id', vendorId).order('created_at')
  if (error) throw error
  return (data || []) as VendorService[]
}

export async function saveVendorService(input: Partial<VendorService> & Pick<VendorService, 'name' | 'price' | 'duration'>): Promise<VendorService[]> {
  if (!supabase) {
    const current = readCache(SERVICE_CACHE_KEY, DEFAULT_SERVICES)
    const id = input.id || crypto.randomUUID()
    const existing = current.find(service => service.id === id)
    const nextService: VendorService = {
      id,
      vendor_id: 'demo',
      name: input.name,
      description: input.description || existing?.description || '',
      category: input.category || existing?.category || 'Home',
      price: Number(input.price),
      duration: input.duration,
      image_url: input.image_url ?? existing?.image_url ?? null,
      is_active: input.is_active ?? existing?.is_active ?? true,
      bookings_count: input.bookings_count ?? existing?.bookings_count ?? 0,
    }
    const next = existing ? current.map(service => service.id === id ? nextService : service) : [...current, nextService]
    writeCache(SERVICE_CACHE_KEY, next)
    return next
  }

  const vendorId = await ensureVendor()
  const payload = {
    ...(input.id && !input.id.startsWith('demo-') ? { id: input.id } : {}),
    vendor_id: vendorId,
    name: input.name,
    description: input.description || '',
    category: input.category || 'Home',
    price: Number(input.price),
    duration: input.duration,
    image_url: input.image_url || null,
    is_active: input.is_active ?? true,
  }
  const { error } = await supabase.from('services').upsert(payload)
  if (error) throw error
  return listVendorServices()
}

export async function uploadVendorMedia(file: File, folder = 'services'): Promise<string> {
  if (!supabase) return URL.createObjectURL(file)
  const vendorId = await ensureVendor()
  const extension = file.name.split('.').pop()?.toLowerCase() || 'jpg'
  const path = `${vendorId}/${folder}/${crypto.randomUUID()}.${extension}`
  const { error } = await supabase.storage.from('marketplace-media').upload(path, file, {
    contentType: file.type,
    upsert: false,
  })
  if (error) throw error
  return supabase.storage.from('marketplace-media').getPublicUrl(path).data.publicUrl
}

export async function removeVendorService(id: string): Promise<VendorService[]> {
  if (!supabase) {
    const next = readCache(SERVICE_CACHE_KEY, DEFAULT_SERVICES).filter(service => service.id !== id)
    writeCache(SERVICE_CACHE_KEY, next)
    return next
  }
  const vendorId = await ensureVendor()
  const { error } = await supabase.from('services').delete().eq('id', id).eq('vendor_id', vendorId)
  if (error) throw error
  return listVendorServices()
}

export async function listAvailability(): Promise<DayAvailability[]> {
  if (!supabase) return readCache(AVAILABILITY_CACHE_KEY, DEFAULT_AVAILABILITY)
  const vendorId = await ensureVendor()
  const extended = await supabase.from('vendor_availability').select('day_of_week,enabled,start_time,end_time,time_blocks').eq('vendor_id', vendorId)
  if (!extended.error) return extended.data?.length ? extended.data as DayAvailability[] : DEFAULT_AVAILABILITY

  const missingTimeBlocks = extended.error.message?.includes('time_blocks') || extended.error.code === 'PGRST204' || extended.error.code === '42703'
  if (!missingTimeBlocks) throw extended.error

  const legacy = await supabase.from('vendor_availability').select('day_of_week,enabled,start_time,end_time').eq('vendor_id', vendorId)
  if (legacy.error) throw legacy.error
  const cachedBlocks = readCache<Record<number, DayAvailability['time_blocks']>>(AVAILABILITY_BLOCKS_CACHE_KEY, {})
  return legacy.data?.length
    ? (legacy.data as DayAvailability[]).map(day => ({ ...day, time_blocks: cachedBlocks[day.day_of_week] || null }))
    : DEFAULT_AVAILABILITY
}

export async function saveAvailability(schedule: DayAvailability[]) {
  writeCache(AVAILABILITY_CACHE_KEY, schedule)
  writeCache(AVAILABILITY_BLOCKS_CACHE_KEY, Object.fromEntries(schedule.map(day => [day.day_of_week, day.time_blocks || null])))
  if (!supabase) {
    return
  }
  const vendorId = await ensureVendor()
  const { error } = await supabase.from('vendor_availability').upsert(schedule.map(day => ({ ...day, vendor_id: vendorId })), { onConflict: 'vendor_id,day_of_week' })
  if (!error) return

  const missingTimeBlocks = error.message?.includes('time_blocks') || error.code === 'PGRST204' || error.code === '42703'
  if (!missingTimeBlocks) throw error
  const legacySchedule = schedule.map(({ time_blocks: _timeBlocks, ...day }) => ({ ...day, vendor_id: vendorId }))
  const legacyResult = await supabase.from('vendor_availability').upsert(legacySchedule, { onConflict: 'vendor_id,day_of_week' })
  if (legacyResult.error) throw legacyResult.error
}

export async function publishPromotion(draft: PromotionDraft, bannerFile?: File | null) {
  if (!supabase) {
    const current = readCache<PromotionDraft[]>('helpy.vendor.promotions.v1', [])
    writeCache('helpy.vendor.promotions.v1', [{ ...draft }, ...current])
    return
  }

  const vendorId = await ensureVendor()
  let imageUrl: string | null = null
  if (bannerFile) {
    const extension = bannerFile.name.split('.').pop() || 'jpg'
    const path = `${vendorId}/${crypto.randomUUID()}.${extension}`
    const upload = await supabase.storage.from('marketplace-media').upload(path, bannerFile, { contentType: bannerFile.type, upsert: false })
    if (upload.error) throw upload.error
    imageUrl = supabase.storage.from('marketplace-media').getPublicUrl(path).data.publicUrl
  }

  const services = await listVendorServices()
  const linkedService = services.find(service => service.name === draft.target)
  const units = Number(draft.duration.split(' ')[0]) || 1
  const endsAt = new Date(Date.now() + units * (draft.promotionKind === 'banner' ? 7 : 1) * 86400000).toISOString()
  const { error } = await supabase.from('promotions').insert({
    vendor_id: vendorId,
    service_id: linkedService?.id || null,
    kind: draft.promotionKind,
    title: draft.title,
    description: draft.description,
    offer_type: draft.offerType || 'fixed',
    discount_percent: draft.offerType === 'discount' ? Number(draft.dealValue || 0) : null,
    offer_price: draft.offerType === 'fixed' ? Number(draft.dealValue || 0) : null,
    cta_label: draft.ctaLabel || 'Book Now',
    image_url: imageUrl,
    design_brief: draft.bannerDesignBrief || null,
    starts_at: new Date().toISOString(),
    ends_at: endsAt,
    status: draft.promotionKind === 'banner' ? 'pending_review' : 'active',
  })
  if (error) throw error
}

export function subscribeToVendorChanges(onChange: () => void) {
  if (!supabase) return () => undefined
  const channel = supabase.channel('vendor-marketplace-changes')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'services' }, onChange)
    .on('postgres_changes', { event: '*', schema: 'public', table: 'vendor_availability' }, onChange)
    .on('postgres_changes', { event: '*', schema: 'public', table: 'promotions' }, onChange)
    .subscribe()
  return () => { void supabase.removeChannel(channel) }
}
