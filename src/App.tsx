import { useEffect, useState } from 'react'
import { BellRing, Building2, CheckCircle2, FileBadge2, ShieldCheck, X } from 'lucide-react'
import { NavProvider, useNav } from './context/NavContext'
import { BottomNav } from './components/shared'
import OnboardingPage from './auth/OnboardingPage'
import AccountTypePage from './auth/AccountTypePage'
import SignUpPage from './auth/SignUpPage'
import LoginPage from './auth/LoginPage'
import VerifyCodePage from './auth/VerifyCodePage'
import ChoosePlanPage from './auth/ChoosePlanPage'
import PlanPaymentPage from './auth/PlanPaymentPage'

// Main pages
import HomePage     from './pages/HomePage'
import BookingsPage from './pages/BookingsPage'
import MessagesPage from './pages/MessagesPage'
import EarningsPage from './pages/EarningsPage'
import ProfilePage  from './pages/ProfilePage'

// Sub-pages
import BookingDetail      from './subpages/BookingDetail'
import ReceiptPage        from './subpages/ReceiptPage'
import ChatPage           from './subpages/ChatPage'
import CalendarPage       from './subpages/CalendarPage'
import AvailabilityPage   from './subpages/AvailabilityPage'
import ManageServicesPage from './subpages/ManageServicesPage'
import AddServicePage     from './subpages/AddServicePage'
import ReviewsPage        from './subpages/ReviewsPage'
import OffersPage         from './subpages/OffersPage'
import OfferApprovalPage  from './subpages/OfferApprovalPage'
import OfferPaymentPage   from './subpages/OfferPaymentPage'
import OfferSuccessPage   from './subpages/OfferSuccessPage'
import WithdrawPage       from './subpages/WithdrawPage'
import AllTransactionsPage from './subpages/AllTransactionsPage'
import PerformancePage    from './subpages/PerformancePage'
import {
  PersonalInfoPage, BusinessInfoPage, DocumentsPage,
  BankDetailsPage, NotificationSettingsPage,
  PrivacySecurityPage, ProfileGuidePage
} from './subpages/ProfileSubPages'
import NewBookingPage     from './subpages/NewBookingPage'
import OngoingServicePage from './subpages/OngoingServicePage'
import CompletionEvidencePage from './subpages/CompletionEvidencePage'
import MarketingVideoRequestPage from './subpages/MarketingVideoRequestPage'
import MarketingVideoSentPage from './subpages/MarketingVideoSentPage'
import SubscriptionPage from './subpages/SubscriptionPage'
import CompletedServicePage from './subpages/CompletedServicePage'
import NotificationsPage  from './subpages/NotificationsPage'
import ServicesListPage   from './subpages/ServicesListPage'
import PendingPayoutPage  from './subpages/PendingPayoutPage'

const TAB_SCREENS = ['home','bookings','messages','earnings','profile']
const AUTH_SCREENS = ['onboarding','account-type','sign-up','login','verify-code','choose-plan','plan-payment']

function AppShell() {
  const { screen, activeTab, setActiveTab } = useNav()
  const isSubPage = !TAB_SCREENS.includes(screen)
  const isAuthScreen = AUTH_SCREENS.includes(screen)
  const [showCrReminder, setShowCrReminder] = useState(false)
  const [crReminderDismissed, setCrReminderDismissed] = useState(false)
  const [crNumber, setCrNumber] = useState('')
  const [crSaved, setCrSaved] = useState(false)

  useEffect(() => {
    if (isAuthScreen || crReminderDismissed) return
    const accountType = localStorage.getItem('helpy_vendor_account_type')
    const savedCrNumber = localStorage.getItem('helpy_vendor_cr_number')?.trim()
    if (accountType === 'business' && !savedCrNumber) setShowCrReminder(true)
  }, [isAuthScreen, crReminderDismissed])

  const dismissCrReminder = () => {
    setShowCrReminder(false)
    setCrReminderDismissed(true)
  }

  const saveCrNumber = () => {
    const cleanedCrNumber = crNumber.trim()
    if (!cleanedCrNumber) return
    localStorage.setItem('helpy_vendor_cr_number', cleanedCrNumber)
    setCrSaved(true)
    window.setTimeout(() => {
      setShowCrReminder(false)
      setCrSaved(false)
    }, 900)
  }

  const renderScreen = () => {
    switch(screen) {
      case 'onboarding':            return <OnboardingPage/>
      case 'account-type':          return <AccountTypePage/>
      case 'sign-up':               return <SignUpPage/>
      case 'login':                 return <LoginPage/>
      case 'verify-code':           return <VerifyCodePage/>
      case 'choose-plan':           return <ChoosePlanPage/>
      case 'plan-payment':          return <PlanPaymentPage/>
      case 'home':                  return <HomePage/>
      case 'bookings':              return <BookingsPage/>
      case 'messages':              return <MessagesPage/>
      case 'earnings':              return <EarningsPage/>
      case 'profile':               return <ProfilePage/>
      case 'booking-detail':        return <BookingDetail/>
      case 'receipt':               return <ReceiptPage/>
      case 'chat':                  return <ChatPage/>
      case 'calendar':              return <CalendarPage/>
      case 'availability':          return <AvailabilityPage/>
      case 'availability-settings': return <AvailabilityPage/>
      case 'manage-services':       return <ManageServicesPage/>
      case 'add-service':           return <AddServicePage/>
      case 'services-list':         return <ServicesListPage/>
      case 'reviews':               return <ReviewsPage/>
      case 'offers':                return <OffersPage/>
      case 'offer-approval':        return <OfferApprovalPage/>
      case 'offer-payment':         return <OfferPaymentPage/>
      case 'offer-success':         return <OfferSuccessPage/>
      case 'withdraw':              return <WithdrawPage/>
      case 'all-transactions':      return <AllTransactionsPage/>
      case 'pending-payout':        return <PendingPayoutPage/>
      case 'performance':           return <PerformancePage/>
      case 'personal-info':         return <PersonalInfoPage/>
      case 'business-info':         return <BusinessInfoPage/>
      case 'documents':             return <DocumentsPage/>
      case 'bank-details':          return <BankDetailsPage/>
      case 'notification-settings': return <NotificationsPage/>
      case 'privacy-security':      return <PrivacySecurityPage/>
      case 'profile-guide':         return <ProfileGuidePage/>
      case 'new-booking':           return <NewBookingPage/>
      case 'ongoing-service':       return <OngoingServicePage/>
      case 'completion-evidence':   return <CompletionEvidencePage/>
      case 'marketing-video-request': return <MarketingVideoRequestPage/>
      case 'marketing-video-sent':  return <MarketingVideoSentPage/>
      case 'subscription':          return <SubscriptionPage/>
      case 'completed-service':     return <CompletedServicePage/>
      default:                      return <HomePage/>
    }
  }

  return (
    <div className="h-[100dvh] flex items-start justify-center overflow-hidden" style={{background:'#d0e8ff'}}>
      <div className="relative w-full max-w-[430px] h-[100dvh] min-h-0 flex flex-col overflow-hidden shadow-2xl" style={{background:'#EBF5FF'}}>
        {/* Page content — grows, scrolls internally */}
        <div className="flex-1 min-h-0 flex flex-col overflow-hidden">
          {renderScreen()}
        </div>
        {/* FROZEN bottom nav — always visible */}
        {!isAuthScreen && (
          <div className="shrink-0 relative z-50">
            <BottomNav
              active={activeTab}
              onChange={setActiveTab}
              msgBadge={3}
            />
          </div>
        )}

        {showCrReminder && !isAuthScreen && (
          <div className="absolute inset-0 z-[100] flex items-center justify-center bg-slate-950/40 px-5 backdrop-blur-[3px]" role="dialog" aria-modal="true" aria-labelledby="cr-reminder-title">
            <div className="relative w-full overflow-hidden rounded-[28px] border border-white bg-white shadow-[0_28px_80px_rgba(15,43,75,0.30)]">
              <div className="h-1.5 bg-gradient-to-r from-blue-600 to-cyan-500" />
              <div className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="relative flex h-[52px] w-[52px] items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white shadow-[0_10px_24px_rgba(37,99,235,0.25)]">
                    <Building2 size={24} />
                    <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-amber-400"><BellRing size={10} className="text-white" /></span>
                  </div>
                  <button type="button" onClick={dismissCrReminder} aria-label="Close reminder" className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-500 transition active:scale-95">
                    <X size={18} />
                  </button>
                </div>

                <div className="mt-4">
                  <p className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-blue-600">Business profile reminder</p>
                  <h2 id="cr-reminder-title" className="mt-1 text-[22px] font-extrabold tracking-tight text-slate-950">Add your CR number</h2>
                  <p className="mt-1.5 text-[13px] leading-5 text-slate-500">Complete your business details by adding the Commercial Registration number linked to your company.</p>
                </div>

                <div className="mt-4 flex items-start gap-2.5 rounded-2xl border border-blue-100 bg-blue-50/80 px-3.5 py-3">
                  <ShieldCheck size={17} className="mt-0.5 shrink-0 text-blue-600" />
                  <p className="text-[11px] leading-4 text-slate-600"><span className="font-bold text-slate-800">Why add it?</span> It helps verify your business profile and builds customer confidence.</p>
                </div>

                <label className="mt-4 block">
                  <span className="mb-1.5 block px-1 text-[12px] font-bold text-slate-800">Commercial Registration Number</span>
                  <div className="flex h-[54px] items-center rounded-2xl border border-slate-200 bg-[#F8FBFF] px-4 transition focus-within:border-sky-300 focus-within:bg-white focus-within:ring-4 focus-within:ring-sky-100/70">
                    <FileBadge2 size={19} className="mr-3 shrink-0 text-blue-600" />
                    <input autoFocus value={crNumber} onChange={(event) => setCrNumber(event.target.value.replace(/\D/g, ''))} onKeyDown={(event) => event.key === 'Enter' && saveCrNumber()} inputMode="numeric" placeholder="Enter your CR number" className="min-w-0 flex-1 bg-transparent text-[14px] font-semibold text-slate-900 outline-none placeholder:font-normal placeholder:text-slate-400" />
                  </div>
                </label>

                <button type="button" onClick={saveCrNumber} disabled={!crNumber.trim() || crSaved} className={`mt-5 flex h-[52px] w-full items-center justify-center gap-2 rounded-2xl text-[14px] font-bold text-white transition active:scale-[0.99] ${crSaved ? 'bg-green-500' : 'bg-gradient-to-r from-blue-600 to-cyan-500 shadow-[0_10px_24px_rgba(37,99,235,0.22)] disabled:cursor-not-allowed disabled:opacity-45'}`}>
                  {crSaved ? <><CheckCircle2 size={18} /> CR Number Saved</> : 'Save CR Number'}
                </button>
                <button type="button" onClick={dismissCrReminder} className="mt-2 h-11 w-full rounded-2xl text-[12px] font-bold text-slate-500 transition active:bg-slate-50">Remind me later</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default function App() {
  return (
    <NavProvider>
      <AppShell/>
    </NavProvider>
  )
}
