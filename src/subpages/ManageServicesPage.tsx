import { FormEvent, useCallback, useEffect, useState } from 'react'
import { ArrowLeft, Cloud, Edit2, Loader2, Plus, Save, Trash2, ToggleLeft, ToggleRight, X } from 'lucide-react'
import { useNav } from '../context/NavContext'
import { StatusBar } from '../components/shared'
import {
  listVendorServices,
  marketplaceConfigured,
  removeVendorService,
  saveVendorService,
  subscribeToVendorChanges,
  VendorService,
} from '../lib/marketplace'

type ServiceForm = Pick<VendorService, 'name' | 'description' | 'category' | 'price' | 'duration'> & { id?: string }
const EMPTY_FORM: ServiceForm = { name: '', description: '', category: 'Home', price: 0, duration: '2-3 hrs' }

export default function ManageServicesPage() {
  const { goBack, navigate } = useNav()
  const [services, setServices] = useState<VendorService[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState<ServiceForm | null>(null)

  const refresh = useCallback(async () => {
    try {
      setError('')
      setServices(await listVendorServices())
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Unable to load services')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    void refresh()
    return subscribeToVendorChanges(refresh)
  }, [refresh])

  const submit = async (event: FormEvent) => {
    event.preventDefault()
    if (!form || !form.name.trim() || Number(form.price) < 0) return
    setSaving(true)
    try {
      setServices(await saveVendorService({ ...form, name: form.name.trim(), price: Number(form.price) }))
      setForm(null)
      setError('')
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Unable to save service')
    } finally {
      setSaving(false)
    }
  }

  const toggle = async (service: VendorService) => {
    try {
      setServices(await saveVendorService({ ...service, is_active: !service.is_active }))
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Unable to update service')
    }
  }

  const remove = async (id: string) => {
    try {
      setServices(await removeVendorService(id))
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Unable to remove service')
    }
  }

  return (
    <div className="flex flex-1 flex-col overflow-y-auto bg-[#F4F6FF]">
      <StatusBar />
      <div className="flex items-center justify-between px-4 pb-3 pt-2">
        <div className="flex items-center gap-3">
          <button onClick={goBack} className="flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-sm"><ArrowLeft size={20} className="text-gray-600" /></button>
          <div>
            <h1 className="text-[18px] font-bold text-gray-900">Manage Services</h1>
            <p className="text-[11px] text-gray-400">{services.filter(service => service.is_active).length} active services</p>
          </div>
        </div>
        <button onClick={() => navigate('add-service')} className="flex items-center gap-1.5 rounded-xl bg-brand-500 px-3 py-2 text-[12px] font-semibold text-white"><Plus size={14}/> Add</button>
      </div>

      <div className="flex-1 space-y-3 overflow-visible px-4 pb-6">
        <div className={`flex items-center gap-2 rounded-2xl px-3 py-2 text-[11px] font-semibold ${marketplaceConfigured ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>
          <Cloud size={14} />
          {marketplaceConfigured ? 'Live sync connected to the customer marketplace' : 'Demo mode — add Supabase keys to enable cross-app sync'}
        </div>

        {error && <div className="rounded-2xl bg-red-50 px-4 py-3 text-[11px] font-semibold text-red-600">{error}</div>}
        {loading && <div className="flex justify-center py-8"><Loader2 className="animate-spin text-brand-500" /></div>}

        {form && (
          <form onSubmit={submit} className="rounded-3xl border border-brand-100 bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div><p className="text-[15px] font-bold text-gray-900">{form.id ? 'Edit service' : 'Add service'}</p><p className="text-[11px] text-gray-400">Changes update the customer app</p></div>
              <button type="button" onClick={() => setForm(null)} className="flex h-8 w-8 items-center justify-center rounded-xl bg-gray-50 text-gray-500"><X size={16}/></button>
            </div>
            <div className="mt-4 space-y-3">
              <label className="block"><span className="text-[11px] font-bold text-gray-500">Service name</span><input required value={form.name} onChange={event => setForm({ ...form, name: event.target.value })} className="mt-1 w-full rounded-2xl border border-gray-100 bg-gray-50 px-4 py-3 text-[13px] font-semibold outline-none focus:border-brand-300" placeholder="e.g. Sofa Cleaning" /></label>
              <label className="block"><span className="text-[11px] font-bold text-gray-500">Description</span><textarea value={form.description} onChange={event => setForm({ ...form, description: event.target.value })} rows={3} className="mt-1 w-full resize-none rounded-2xl border border-gray-100 bg-gray-50 px-4 py-3 text-[12px] outline-none focus:border-brand-300" placeholder="What is included in this service?" /></label>
              <div className="grid grid-cols-2 gap-3">
                <label><span className="text-[11px] font-bold text-gray-500">Price (QR)</span><input required min="0" type="number" value={form.price} onChange={event => setForm({ ...form, price: Number(event.target.value) })} className="mt-1 w-full rounded-2xl border border-gray-100 bg-gray-50 px-4 py-3 text-[13px] font-bold outline-none focus:border-brand-300" /></label>
                <label><span className="text-[11px] font-bold text-gray-500">Duration</span><input required value={form.duration} onChange={event => setForm({ ...form, duration: event.target.value })} className="mt-1 w-full rounded-2xl border border-gray-100 bg-gray-50 px-4 py-3 text-[13px] font-semibold outline-none focus:border-brand-300" /></label>
              </div>
              <button disabled={saving} className="flex w-full items-center justify-center gap-2 rounded-2xl bg-brand-500 py-3.5 text-[13px] font-bold text-white disabled:opacity-60">{saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16}/>} {saving ? 'Saving…' : 'Save service'}</button>
            </div>
          </form>
        )}

        {services.map((service, index) => (
          <div key={service.id} className={`rounded-2xl bg-white p-4 shadow-sm transition-opacity ${service.is_active ? '' : 'opacity-65'}`}>
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${index % 3 === 0 ? 'bg-blue-100' : index % 3 === 1 ? 'bg-purple-100' : 'bg-teal-100'}`}><span className="text-lg">🧹</span></div>
                <div><p className="text-[14px] font-bold text-gray-900">{service.name}</p><span className="mt-0.5 inline-flex rounded-full bg-blue-50 px-2 py-0.5 text-[11px] font-semibold text-brand-600">{service.duration}</span></div>
              </div>
              <button onClick={() => void toggle(service)}>{service.is_active ? <ToggleRight size={28} className="text-brand-500"/> : <ToggleLeft size={28} className="text-gray-300"/>}</button>
            </div>
            {service.description && <p className="mt-3 text-[11px] leading-relaxed text-gray-500">{service.description}</p>}
            <div className="mt-3 flex items-center justify-between border-t border-gray-50 pt-3">
              <div className="flex items-center gap-4">
                <div><p className="text-[10px] text-gray-400">Price</p><p className="text-[14px] font-bold text-gray-900">{service.price} QR</p></div>
                <div><p className="text-[10px] text-gray-400">Bookings</p><p className="text-[14px] font-bold text-gray-900">{service.bookings_count}</p></div>
                <div><p className="text-[10px] text-gray-400">Status</p><p className={`text-[11px] font-bold ${service.is_active ? 'text-green-500' : 'text-gray-400'}`}>{service.is_active ? 'Active' : 'Paused'}</p></div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => setForm({ ...service })} className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50"><Edit2 size={14} className="text-brand-500"/></button>
                <button onClick={() => void remove(service.id)} className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-50"><Trash2 size={14} className="text-red-400"/></button>
              </div>
            </div>
          </div>
        ))}

        {!loading && services.length === 0 && <button onClick={() => navigate('add-service')} className="w-full rounded-3xl border border-dashed border-brand-200 bg-brand-50/60 py-8 text-[13px] font-bold text-brand-600">Add your first customer-facing service</button>}
      </div>
    </div>
  )
}
