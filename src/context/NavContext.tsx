import { createContext, useContext, useState, ReactNode } from 'react'

export type Screen =
  | 'home' | 'bookings' | 'messages' | 'earnings' | 'profile'
  | 'booking-detail' | 'chat' | 'calendar' | 'availability' | 'manage-services'
  | 'reviews' | 'new-booking' | 'withdraw' | 'all-transactions' | 'pending-payout'
  | 'personal-info' | 'business-info' | 'services-list' | 'documents' | 'bank-details'
  | 'notification-settings' | 'availability-settings' | 'privacy-security'
  | 'profile-guide' | 'performance' | 'ongoing-service' | 'completed-service' | 'offers'
  | 'offer-approval' | 'offer-payment' | 'offer-success' | 'completion-evidence' | 'marketing-video-request' | 'marketing-video-sent' | 'subscription'

interface NavState { screen: Screen; params?: any; history: { screen: Screen; params?: any }[] }
interface NavCtx {
  screen: Screen; params: any
  navigate: (s: Screen, p?: any) => void
  goBack: () => void
  canGoBack: boolean
  activeTab: string
  setActiveTab: (t: string) => void
  bookingTab: string
  setBookingTab: (t: string) => void
  bookingUpdates: Record<number, Record<string, any>>
  updateBooking: (id: number, changes: Record<string, any>) => void
  subscriptionPlan: 'Monthly' | '6 Months' | '1 Year'
  setSubscriptionPlan: (plan: 'Monthly' | '6 Months' | '1 Year') => void
}

const Ctx = createContext<NavCtx>(null as any)

export function NavProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<NavState>({ screen: 'home', history: [] })
  const [activeTab, setActiveTabState] = useState('home')
  const [bookingTab, setBookingTab] = useState('upcoming')
  const [bookingUpdates, setBookingUpdates] = useState<Record<number, Record<string, any>>>({})
  const [subscriptionPlan, setSubscriptionPlan] = useState<'Monthly' | '6 Months' | '1 Year'>('Monthly')

  const navigate = (screen: Screen, params?: any) =>
    setState(s => ({ screen, params, history: [...s.history, { screen: s.screen, params: s.params }] }))

  const goBack = () =>
    setState(s => {
      const history = [...s.history]
      const prev = history.pop()
      return prev ? { screen: prev.screen, params: prev.params, history } : s
    })

  const setActiveTab = (t: string) => {
    setActiveTabState(t)
    setState({ screen: t as Screen, params: undefined, history: [] })
  }

  const updateBooking = (id: number, changes: Record<string, any>) =>
    setBookingUpdates(current => ({ ...current, [id]: { ...current[id], ...changes } }))

  return (
    <Ctx.Provider value={{ screen: state.screen, params: state.params, navigate, goBack, canGoBack: state.history.length > 0, activeTab, setActiveTab, bookingTab, setBookingTab, bookingUpdates, updateBooking, subscriptionPlan, setSubscriptionPlan }}>
      {children}
    </Ctx.Provider>
  )
}

export const useNav = () => useContext(Ctx)
