import { NavProvider, useNav } from './context/NavContext'
import { BottomNav } from './components/shared'

// Main pages
import HomePage     from './pages/HomePage'
import BookingsPage from './pages/BookingsPage'
import MessagesPage from './pages/MessagesPage'
import EarningsPage from './pages/EarningsPage'
import ProfilePage  from './pages/ProfilePage'

// Sub-pages
import BookingDetail      from './subpages/BookingDetail'
import ChatPage           from './subpages/ChatPage'
import CalendarPage       from './subpages/CalendarPage'
import AvailabilityPage   from './subpages/AvailabilityPage'
import ManageServicesPage from './subpages/ManageServicesPage'
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
import CompletedServicePage from './subpages/CompletedServicePage'
import NotificationsPage  from './subpages/NotificationsPage'
import ServicesListPage   from './subpages/ServicesListPage'
import PendingPayoutPage  from './subpages/PendingPayoutPage'

const TAB_SCREENS = ['home','bookings','messages','earnings','profile']

function AppShell() {
  const { screen, activeTab, setActiveTab } = useNav()
  const isSubPage = !TAB_SCREENS.includes(screen)

  const renderScreen = () => {
    switch(screen) {
      case 'home':                  return <HomePage/>
      case 'bookings':              return <BookingsPage/>
      case 'messages':              return <MessagesPage/>
      case 'earnings':              return <EarningsPage/>
      case 'profile':               return <ProfilePage/>
      case 'booking-detail':        return <BookingDetail/>
      case 'chat':                  return <ChatPage/>
      case 'calendar':              return <CalendarPage/>
      case 'availability':          return <AvailabilityPage/>
      case 'availability-settings': return <AvailabilityPage/>
      case 'manage-services':       return <ManageServicesPage/>
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
      case 'completed-service':     return <CompletedServicePage/>
      default:                      return <HomePage/>
    }
  }

  return (
    <div className="min-h-screen flex items-start justify-center" style={{background:'#d0e8ff'}}>
      <div className="relative w-full max-w-[430px] min-h-screen flex flex-col overflow-hidden shadow-2xl" style={{background:'#EBF5FF'}}>
        {/* Page content — grows, scrolls internally */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {renderScreen()}
        </div>
        {/* FROZEN bottom nav — always visible */}
        <BottomNav
          active={activeTab}
          onChange={setActiveTab}
          msgBadge={3}
        />
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
