import { createContext, useContext, useState, ReactNode } from 'react'

export type Screen =
  | 'home' | 'bookings' | 'messages' | 'earnings' | 'profile'
  | 'booking-detail' | 'chat' | 'calendar' | 'availability' | 'manage-services'
  | 'reviews' | 'new-booking' | 'withdraw' | 'all-transactions' | 'pending-payout'
  | 'personal-info' | 'business-info' | 'services-list' | 'documents' | 'bank-details'
  | 'notification-settings' | 'availability-settings' | 'privacy-security'
  | 'profile-guide' | 'performance'

interface NavState { screen: Screen; params?: any; history: { screen: Screen; params?: any }[] }
interface NavCtx {
  screen: Screen; params: any
  navigate: (s: Screen, p?: any) => void
  goBack: () => void
  canGoBack: boolean
  activeTab: string
  setActiveTab: (t: string) => void
}

const Ctx = createContext<NavCtx>(null as any)

export function NavProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<NavState>({ screen: 'home', history: [] })
  const [activeTab, setActiveTabState] = useState('home')

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

  return (
    <Ctx.Provider value={{ screen: state.screen, params: state.params, navigate, goBack, canGoBack: state.history.length > 0, activeTab, setActiveTab }}>
      {children}
    </Ctx.Provider>
  )
}

export const useNav = () => useContext(Ctx)
